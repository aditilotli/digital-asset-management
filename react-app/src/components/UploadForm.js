import { Alert, Backdrop, Button, CircularProgress, Container, Grid, Snackbar, TextField, Typography } from '@mui/material'
import React, { use, useMemo, useState } from 'react';
import '../styling/uploadForm.css';
import axios from 'axios';
import api from '../utils/api';

function UploadForm() {
    const [file, setFile] = useState(null);
    const [tags, setTags] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [snackOpen, setSnackOpen] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();

        if(!file) return;

        // api call
         (
            async () => {
                try {
                    const formData = new FormData();

                    formData.append('file', file);
                    formData.append('tags', tags);

                    const response = await api.post(`/dam/api/assets/upload`, formData);

                } catch (error) {
                    console.log(error)
                }
            }
        )();
        


        setUploading(true);

        setTimeout(()=>{setUploading(false)
            
        }, 3000);
    }

    useMemo(()=>{
        if(!uploading){
            setMessage("completed")
            setSnackOpen(true)
        }
            
    }, [uploading]);

    const handleSnackClose = () => {
        setSnackOpen(false);
        setMessage(null)
    }

  return (
    <form onSubmit={handleUpload}>
        <Container className='container'>
            <Grid container spacing={3}>
                <Grid item sx={6}>
                    <TextField
                        type='file'
                        required
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </Grid>
                <Grid item sx={6}>
                    <TextField
                        // type='text'
                        label='Tags (comma separated)'
                        
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </Grid>

                <Grid item sx={8}></Grid>
                <Grid item sx={4}>
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

            <Snackbar
                open={snackOpen}
                autoHideDuration={2000}
                onClose={handleSnackClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
                style={{ marginTop: '50px' }}
            >
                {
                    message ? 
                        <Alert severity='success'>{message}</Alert>
                        :
                            <Alert severity='error'>Upload Failed</Alert>
                }
            </Snackbar>


            {/* use snacbar and backdrop */}
            <Backdrop open={uploading}>
                <CircularProgress color='inherit'></CircularProgress>
            </Backdrop>

            
        </Container>
    </form>
  )
}

export default UploadForm
