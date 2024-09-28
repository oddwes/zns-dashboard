import React, { useEffect, useState } from "react"
import { getTokenHolders } from "../utils/blockscout"
import { chains } from "../config/chains"
import { Card, CardContent, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2'
import { Item } from "./Item"

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
    return Object.keys(tokenHoldersByChain).map((chain) => (
      <Grid size={3}>
        <Item>
          <Typography gutterBottom sx={{ fontSize: 14 }}>
            {chain}
          </Typography>
          {tokenHoldersByChain[chain].slice(0, 100).map((holder) => (
            <Typography component="div">
                {holder.address}: {holder.value}
            </Typography>
          ))}
        </Item>
      </Grid>
    ))
  }

  return (
    <Grid container p={1} spacing={1}>
      {topHolders()}
    </Grid>
  )
}