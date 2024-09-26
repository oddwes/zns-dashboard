import axios from "axios"
import dayjs from "dayjs"

export const getCounters = async (chainUrl, address) => {
  try {
    return await axios.get(
      `https://${chainUrl}/api/v2/tokens/${address}/counters`
    )
  } catch (error) {
    console.log(error)
  }
}

export const getTokenHolders = async (chain, address) => {
  const OFFSET = 10000
  const apiCall = async (page, result = []) => {
    try {
      const response = await axios.post(
        `https://${chain}/api?module=token&action=getTokenHolders&contractaddress=${address}&page=${page}&offset=${OFFSET}`
      )
      const data = response.data.result
      result.push(...data)
      if(data.length === OFFSET) {
        return apiCall(page + 1, result)
      } else {
        return result
      }
    } catch (error) {
      console.log(error)
    }
  }
  return await apiCall(1)
}

export const getMinting = async (chain, address) => {
  const cutOff = dayjs().subtract(24, 'hours')
  const apiCall = async (items = [], nextPageParams = {}) => {
    try {
      const response = await axios.get(
        `https://${chain}/api/v2/tokens/${address}/transfers`,
        nextPageParams
      )
      const data = response.data
      for(let item of data.items) {
        if(dayjs(item.timestamp) >= cutOff) {
          items.push(item)
        } else {
          break
        }
      }
      if(items.length === data.items.length) {
        return apiCall(items, data.nextPageParams)
      } else {
        return items
      }
    } catch (error) {
      console.log(error)
    }
  }
  return await apiCall()
}