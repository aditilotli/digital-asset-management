import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

function Dashboard() {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="80vh" 
      bgcolor="#f0f0f0"
      style={{ marginTop: '30px' }}
    >
      <Paper
        // align='center'
        elevation={6} 
          sx={{ 
            padding: 5,
            maxWidth: 600,
            width: '90%',
            textAlign: 'center',
            borderRadius: 3,
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            marginTop: '30px'
          }}
      >
        <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold', color: '#212121' }}>Welcome to the Digital Asset Management Page</Typography>
        <Typography variant='body1' sx={{ marginTop: 2, color: '#616161' }}>
          Use the tabs above to upload files or search/filter the assets
        </Typography>
      </Paper>
    </Box>
    
  )
}

export default Dashboard;
