import { Card, CardContent, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { getCounters, getTokenHolders } from "../utils/blockscout"
import { chains } from "../config/chains"

export const TotalMinting = () => {
  const [countersByChain, setCountersByChain] = useState({})
  const [tokenHoldersByChain, setTokenHoldersByChain] = useState({})

  useEffect(() => {
    const getCountersByChain = async () => {
      for (const [chain, data] of Object.entries(chains)) {
        const counters = await getCounters(data.url, data.address)
        countersByChain[chain] = counters.data

        setCountersByChain({...countersByChain})
      }
    }
    getCountersByChain()

    const getTokenHoldersByChain = async () => {
      for (const [chain, data] of Object.entries(chains)) {
        const tokenHolders = await getTokenHolders(data.url, data.address)
        tokenHoldersByChain[chain] = tokenHolders
        setTokenHoldersByChain({...tokenHoldersByChain})

      }
    }
    getTokenHoldersByChain()
  }, [])

  const getTotalMinting = () => {
    let totalHolders = 0
    for (const [chain, data] of Object.entries(countersByChain)) {
      totalHolders += parseInt(data.transfers_count)
    }
    return totalHolders
  }

  const getTotalHolders = () => {
    let totalHolders = 0
    for (const [chain, data] of Object.entries(countersByChain)) {
      totalHolders += parseInt(data.token_holders_count)
    }
    return totalHolders
  }

  const getTopHolders = () => {
    return Object.entries(tokenHoldersByChain).map((item) => (
      <Card variant="outlined">
        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              {item[0]}
            </Typography>
            {item[1].slice(0, 100).map((holder) => (
              <Typography component="div">
                  {holder.address}: {holder.value}
              </Typography>
            ))}
        </CardContent>
      </Card>
    ))
  }

  return (
    <React.Fragment>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Total Minting
          </Typography>
          <Typography variant="h5" component="div">
            {getTotalMinting()}
          </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Total Holders
          </Typography>
          <Typography variant="h5" component="div">
            {getTotalHolders()}
          </Typography>
        </CardContent>
      </Card>
      {getTopHolders()}
    </React.Fragment>
  )
}