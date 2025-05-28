import { Paper, Typography } from '@mui/material'
import React from 'react'

function Dashboard() {
  return (
    <Paper>
      <Typography variant='h4'>Welcome to the Digital Asset Management Page</Typography>
      <Typography variant='body1' sx={{ mt: 2 }}>
        Use the tabs above to upload files or search/filter the assets
      </Typography>
    </Paper>
  )
}

export default Dashboard
