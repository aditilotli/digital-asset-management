import logo from './logo.svg';
import './App.css';
import { Container, Paper, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import UploadForm from './components/UploadForm';
import Gallery from './components/Gallery';
import { useState } from 'react';
import Dashboard from './components/Dashboard';

function App() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (e, newTabValue) => {
    console.log("Tab value ==>", newTabValue);
    console.log("Tab Name ====>", e.target.value);
    setTab(newTabValue);
  }

  return (
    <Container>
      {/* <Toolbar>
        <Typography variant='h6'>Digital Asset Management System</Typography>
      </Toolbar> */}

      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label='Dashboard'></Tab>
        <Tab label='Upload Assets'></Tab>
        <Tab label='Filter & View Assets'></Tab>
      </Tabs>

      <Container>
        {
          tab === 0 && <Dashboard/>
        }

        {
          tab === 1 && 
            <Paper>
              <UploadForm/>
            </Paper>
        }

        {
          tab === 2 && <Gallery/>
        }
      </Container>

    </Container>
  );
}

export default App;
