import React, { useEffect, useState } from "react"
import { getMinting } from "../utils/blockscout"
import { chains } from "../config/chains"
import { Box, CardHeader, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2'
import { Item } from "./Item"

export const MintingActivity = () => {
  const [mintingActivityByChain, setMintingActivityByChain] = useState({})

  useEffect(() => {
    const getMintingActivityByChain = async () => {
      for (const [chain, data] of Object.entries(chains)) {
        const minting = await getMinting(data.url, data.address)
        mintingActivityByChain[chain] = minting

        setMintingActivityByChain({...mintingActivityByChain})
      }
    }
    getMintingActivityByChain()
  }, [])

  const mintingActivity = () => {
    return Object.keys(mintingActivityByChain).map((key) => (
      <Grid size={1} style={{minWidth:'100px'}}>
        <Item>
          <Typography gutterBottom sx={{ fontSize: 14 }}>
            {key}
          </Typography>
          <Typography component="div">
              {mintingActivityByChain[key].length}
          </Typography>
        </Item>
      </Grid>
    ))
  }

  return(
    <Box style={{backgroundColor:'#16181B',color:'#868B95'}}>
      <CardHeader title='Minting Activity' />
      <Grid container p={1} spacing={1}>
        {mintingActivity()}
      </Grid>
    </Box>
  )
}