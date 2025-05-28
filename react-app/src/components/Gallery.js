import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../styling/gallery.css';

const assetsArr = [
  {
    _id: 1,
    originalName: 'aadi',
    fileType: 'image'
  }
]

function Gallery() {
  const [assets, setAssets] = useState([]);
  const [filters, setFilters] = useState({ fileType: '', tags: '', date: '' });

  useEffect(() => {
    fetchAssets();
  }, [filters]);

  const fetchAssets = () => {
    // api call
  }

  return (
    <div>
      <Paper className='paper'>
        <Typography style={{ marginBottom: '10px', fontSize: 17 }}><b>Filter Assets</b></Typography>

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: 14 }}><b>File Type</b></Typography>
            <TextField
              id='type'
              label='Type'
              name='type'
              value={filters.fileType}
              onChange={(e) => setFilters({ ...filters, fileType: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: 14 }}><b>Tags</b></Typography>
            <TextField
              id='tags'
              label='Tags'
              name='tags'
              value={filters.tags}
              onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: 14 }}><b>Date</b></Typography>
            <TextField
              id='uploadDate'
              name='uploadDate'
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              fullWidth
              type='date'

            />
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper} style={{ marginTop: '50px' }}>
        <Table>
          <TableHead >
            <TableRow>
              <TableCell style={{width:'10px', fontWeight:'bold'}}>ID</TableCell>
              <TableCell style={{width:'10px', fontWeight:'bold'}}>Name</TableCell>
              <TableCell style={{width:'10px', fontWeight:'bold'}}>File Type</TableCell>
              <TableCell style={{width:'10px', fontWeight:'bold'}}>Tags</TableCell>
              <TableCell style={{width:'10px', fontWeight:'bold'}}>Upload Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              assetsArr.map((asset) => {
                return (
                  <TableRow key={asset._id}>
                    <TableCell>{asset._id}</TableCell>
                    <TableCell>{asset.originalName} ({asset.fileType})</TableCell>
                    
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>


    </div>
  )
}

export default Gallery
