import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, FormHelperText, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../styling/gallery.css';
import api from '../utils/api';
import moment from 'moment';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';


function AssetsTable() {
    const [assets, setAssets] = useState([]);
    const [filters, setFilters] = useState({ fileType: '', tags: '', date: '', size: null });

    console.log(filters)
            
    useEffect(() => {
          fetchAssets();
    }, [filters]);
      
    const fetchAssets = async () => {
      // api call
      console.log("fetch asets");
      
      (
        async () => {
          try {
            const query = {
              mimetype: filters.fileType,
              tags: filters.tags,
              uploadDate: filters.date,
              size: filters.size
            }
      
            const response = await api.get(`/dam/api/assets/search`, { params: query });
      
            console.log("response ===>", response.data);

            if(response) {
              setAssets(response.data.assetData);
            }
      
          } catch (error) {
            console.log(error);
          }
        }
      )();
    }

    const handleReset = () => {
      setFilters({
        fileType: '',
        tags: '',
        date: '',
        size: null
      })
    };

    const handleAssetDownload = async (event, asset) => {
      console.log("inside downloading....");

      (
        async () => {
          const response = await fetch(`/dam/api/assets/download/${asset.fileName}`, {
            method: 'GET'
          });

          if (!response.ok) {
            throw new Error('Download failed');
          }

          const blob = await response.blob();

          // Create a temporary URL for the blob
          const url = window.URL.createObjectURL(blob);

          // Create an anchor and trigger download
          const a = document.createElement('a');
          a.href = url;
          a.download = asset.fileName;
          document.body.appendChild(a);
          a.click();

          // Cleanup
          a.remove();
          window.URL.revokeObjectURL(url);
        }
      )();
    }

    console.log(assets);


    return (
        <div>
          <Container component={Paper}>

            <div>
              <Grid item xs={12}>
              <Typography style={{ marginBottom: '10px', fontSize: 17, padding: '20px' }}><b>Filter Assets</b></Typography>
              </Grid>
            </div>

            <div>
              <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item xs={4}>
                  <Typography sx={{ fontSize: 14 }}><b>File Type</b></Typography>
                  <TextField
                    id='type'
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

                <Grid item xs={4}>
                  <Typography sx={{ fontSize: 14 }}><b>Size</b></Typography>
                  <TextField
                    id='size'
                    name='size'
                    value={filters.size}
                    onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                    fullWidth
                    type='number'
                  />                  
                </Grid>
              </Grid>
            </div>

            <br/>

            <div>
               <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={handleReset}>
                      Reset
                    </Button>
                  </Box>
                </Grid>
            </div>
            <br/>
            

              
          </Container>


          <TableContainer component={Paper} style={{ marginTop: '50px' }}>
            <Table>
              <TableHead >
                <TableRow>
                  <TableCell style={{width:'10px', fontWeight:'bold'}}>Asset ID</TableCell>
                  <TableCell style={{width:'10px', fontWeight:'bold'}}>File Name</TableCell>
                  <TableCell style={{width:'10px', fontWeight:'bold'}}>Original Name</TableCell>
                  <TableCell style={{width:'10px', fontWeight:'bold'}}>File Type</TableCell>
                  <TableCell style={{width:'10px', fontWeight:'bold'}}>File Size</TableCell>
                  <TableCell style={{width:'10px', fontWeight:'bold'}}>Tags</TableCell>
                  <TableCell style={{width:'10px', fontWeight:'bold'}}>Upload Date</TableCell>
                  <TableCell style={{width:'10px', fontWeight:'bold'}}>Download</TableCell>
                </TableRow>
              </TableHead>
                    <TableBody>
                      {
                        assets && assets.length > 0 && assets.map((asset) => {
                          return (
                            <TableRow key={asset._id}>
                              <TableCell>{asset.assetId}</TableCell>
                              <TableCell>{asset.fileName}</TableCell>
                              <TableCell>{asset.originalName}</TableCell>
                              <TableCell>{asset.mimetype}</TableCell>
                              <TableCell>{asset.size}</TableCell>
                              <TableCell>{asset.tags}</TableCell>
                              <TableCell>{moment(asset.uploadDate).format('DD-MM-YYYY')}</TableCell>
                              <TableCell>
                                <IconButton
                                  onClick={(e) => handleAssetDownload(e, asset)}
                                >
                                  <DownloadForOfflineIcon/>
                                </IconButton>
                              </TableCell>
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

export default AssetsTable
