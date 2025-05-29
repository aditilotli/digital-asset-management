import { Alert, Backdrop, Box, Button, CircularProgress, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react';
import '../styling/uploadForm.css';
import axios from 'axios';
import api from '../utils/api';

function UploadForm() {
    const [file, setFile] = useState(null);
    const [tags, setTags] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState(null);
    const [snackOpen, setSnackOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [snackError, setSnackError] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'video/mp4', 'video/webm', 'application/pdf'];
            
            if (!allowedTypes.includes(file.type)) {
                alert('Please upload only an image, video, or PDF file.');
                e.target.value = '';
                return;
            }
            setFile(file);
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        if(!file) return;

        // api call
         (
            async () => {
                let response = null;
                try {
                    const formData = new FormData();

                    formData.append('file', file);
                    formData.append('tags', tags);

                    response = await api.post(`/dam/api/assets/upload`, formData);

                    if(response) {
                        setMessage(response.data.message);
                        setSnackError(false);
                        setSnackOpen(true);
                    }

                } catch (error) {
                    console.log(error);

                    setMessage('');
                    setSnackError(true);
                    setSnackOpen(true);
                }
            }
        )();

        setUploading(true);

        setTimeout(()=>{
            setUploading(false);
            if( fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            
        }, 3000);

        setFile(null);
        setTags('');
    }

    const handleSnackClose = () => {
        setSnackOpen(false);
        setMessage(null);
        setSnackError(null);
        setFile(null);
        setTags('');
    }

  return (
    <Box display="flex" justifyContent="center" mt={6}>
        <Paper
            elevation={4}
            sx={{
            padding: 4,
            width: '100%',
            maxWidth: 700,
            backgroundColor: '#ffffff',
            borderRadius: 3
            }}
        >
            <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 600, color: '#212121', textAlign: 'center' }}
            >
                Upload Digital Asset
            </Typography>


            <form onSubmit={handleUpload}>
                <>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type='file'
                                required
                                onChange={(e) => handleFileChange(e)}
                                inputProps={{ accept: '.png, .jpg, .jpeg, .gif, .mp4, .webm, .pdf' }}
                                inputRef={fileInputRef}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                // type='text'
                                label='Tags (comma separated)'
                                
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}></Grid>
                        <Grid item xs={12} sm={12}></Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                color='primary'
                                type='submit'
                                variant='contained'
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>

                    {/* <Typography>
                        {uploading && <Typography>Uploading....</Typography>}
                        {message && <Typography>{message}</Typography>}
                    </Typography> */}

                    {snackOpen && (message || snackError) && (
                        <Snackbar
                            open={snackOpen}
                            autoHideDuration={2000}
                            onClose={handleSnackClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            style={{ marginTop: '50px' }}
                        >
                            {message ? (
                            <Alert severity="success" onClose={handleSnackClose}>
                                {message}
                            </Alert>
                            ) : (
                            <Alert severity="error" onClose={handleSnackClose}>
                                File Uploaded Failed!
                            </Alert>
                            )}
                        </Snackbar>
                    )}


                    {/* use snacbar and backdrop */}
                    <Backdrop open={uploading}>
                        <CircularProgress color='inherit'></CircularProgress>
                    </Backdrop>

                    
                </>
            </form>
        </Paper>
    </Box>
    
  )
}

export default UploadForm
