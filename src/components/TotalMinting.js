import { Card, CardContent, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { getTokenHolders } from "../utils/blockscout"
import { chains } from "../config/chains"

export const TotalMinting = () => {
  const [tokenHoldersByChain, setTokenHoldersByChain] = useState({})

  useEffect(() => {
    const getTokenHoldersFromAllChains = async () => {
      for (const [key, data] of Object.entries(chains)) {
        const tokenHolders = await getTokenHolders(data.url, data.address)
        tokenHoldersByChain[key] = tokenHolders
        setTokenHoldersByChain({...tokenHoldersByChain})
      }
    }

    getTokenHoldersFromAllChains()
  }, [])

  const getTotalMinting = () => {
    let totalMinting = 0
    for (const [chain, data] of Object.entries(tokenHoldersByChain)) {
      const total = data.reduce((sum, current) => sum += parseInt(current.value), 0)
      totalMinting += total
    }
    return totalMinting
  }

  const getTotalHolders = () => {
    let totalHolders = 0
    for (const [chain, data] of Object.entries(tokenHoldersByChain)) {
      totalHolders += data.length
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
      {/* {JSON.stringify(tokenHoldersByChain)} */}
    </React.Fragment>
  )
}