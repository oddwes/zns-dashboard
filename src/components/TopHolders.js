import React, { useEffect, useState } from "react"
import { getTokenHolders } from "../utils/blockscout"
import { chains } from "../config/chains"
import { Card, CardContent, Typography } from "@mui/material"

export const TopHolders = () => {
  const [tokenHoldersByChain, setTokenHoldersByChain] = useState({})

  useEffect(() => {
    const getTokenHoldersByChain = async () => {
      for (const [chain, data] of Object.entries(chains)) {
        const tokenHolders = await getTokenHolders(data.url, data.address)
        tokenHoldersByChain[chain] = tokenHolders
        setTokenHoldersByChain({...tokenHoldersByChain})

      }
    }
    getTokenHoldersByChain()
  }, [])

  const topHolders = () => {
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
      {topHolders()}
    </React.Fragment>
  )
}