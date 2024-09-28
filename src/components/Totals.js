import { Card, CardContent, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { getCounters, getTokenHolders } from "../utils/blockscout"
import { chains } from "../config/chains"
import Grid from '@mui/material/Grid2'
import { Item } from "./Item"

export const TotalMinting = () => {
  const [countersByChain, setCountersByChain] = useState({})

  useEffect(() => {
    const getCountersByChain = async () => {
      for (const [chain, data] of Object.entries(chains)) {
        const counters = await getCounters(data.url, data.address)
        countersByChain[chain] = counters.data

        setCountersByChain({...countersByChain})
      }
    }
    getCountersByChain()
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

  return (
    <Grid container p={1} spacing={1}>
      <Grid size={1}>
        <Item>
          <Typography gutterBottom sx={{ fontSize: 14 }}>
            Total Minting
          </Typography>
          <Typography variant="h5" component="div">
            {getTotalMinting()}
          </Typography>
        </Item>
      </Grid>
      <Grid size={1}>
        <Item>
          <Typography gutterBottom sx={{ fontSize: 14 }}>
            Total Holders
          </Typography>
          <Typography variant="h5" component="div">
            {getTotalHolders()}
          </Typography>
        </Item>
      </Grid>
    </Grid>
  )
}