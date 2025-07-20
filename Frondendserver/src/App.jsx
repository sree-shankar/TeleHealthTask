import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyAppointments from './components/MyAppointments';
import ScheduleAppointment from './components/ScheduleAppointment';
import MyPrescriptions from './components/MyPrescriptions';
import VideoCall from './components/VideoCall';
import { Box } from '@mui/material';

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false); // Sidebar visibility

  const handleDrawerToggle = () => {
    setMobileOpen(prev => !prev); // Toggle sidebar open/close
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Header onMenuClick={handleDrawerToggle} />
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            mt: { xs: 7, sm: 8 },
            width: { sm: `calc(100% - 240px)` },
            backgroundColor: '#f5f5f5',
            height: '100vh',
            // overflowY: 'auto',
          }}
        >
          <Routes>
            <Route path="/appointments" element={<MyAppointments />} />
            <Route path="/schedule" element={<ScheduleAppointment />} />
            <Route path="/prescriptions" element={<MyPrescriptions />} />
            <Route path="/video-call" element={<VideoCall />} />
            <Route path="*" element={<Navigate to="/appointments" replace />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
