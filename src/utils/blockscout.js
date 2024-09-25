import axios from "axios"

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