import React, { useEffect, useState } from "react"
import { getMinting } from "../utils/blockscout"
import { chains } from "../config/chains"
import { Card, CardContent, Typography } from "@mui/material"

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
      <Card variant="outlined">
        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              {key}
            </Typography>
            <Typography component="div">
                {mintingActivityByChain[key].length}
            </Typography>
        </CardContent>
      </Card>
    ))
  }

  return(
    <React.Fragment>
      {mintingActivity()}
    </React.Fragment>
  )
}