import { Card, CardContent, Paper } from "@mui/material"

export const Item = ({ children }) => {
  return (
    <Paper elevation={5} style={{backgroundColor:'#1A2027',color:'#868B95',overflow:'hidden'}}>
      <CardContent style={{maxHeight: 250,overflowY:'scroll'}}>
        {children}
      </CardContent>
    </Paper>
  )
}