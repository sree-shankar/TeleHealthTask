import React, { useRef, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import { useLocation } from 'react-router-dom';

const VideoCall = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

  const { state } = useLocation();
  const appointment = state || {};

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleCamera = async () => {
    if (cameraOn) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        if (videoRef.current) videoRef.current.srcObject = null;
      }
      setCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraOn(true);
      } catch (err) {
        alert('Unable to access camera');
      }
    }
  };

  return (
    <Box sx={{  minHeight: '100vh', py: 4 }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 3, px: 2 }}>
          <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="bold">
            Video Call
          </Typography>
          <Typography variant="subtitle1">Connect with your healthcare provider</Typography>
        </Box>

        <Paper elevation={3} sx={{ borderRadius: 3, p: isMobile ? 2 : 3 }}>
          {/* Header */}
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <VideocamIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Video Call Setup
            </Typography>
          </Box>

          {/* Camera Preview */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: isMobile ? 180 : 250,
              borderRadius: 2,
              backgroundColor: '#f5f5f5',
              mb: 2,
              overflow: 'hidden',
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
            {!cameraOn && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <VideocamOffIcon fontSize="large" color="disabled" />
                <Typography variant="body2" color="text.secondary">
                  Camera preview
                </Typography>
              </Box>
            )}
          </Box>

          {/* Controls */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mb: 2,
              flexWrap: 'wrap',
            }}
          >
            <IconButton
              sx={{
                backgroundColor: '#0D47A1',
                color: 'white',
                '&:hover': { backgroundColor: '#1565C0' },
              }}
              onClick={toggleCamera}
            >

              {cameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: '#0D47A1',
                color: 'white',
                '&:hover': { backgroundColor: '#1565C0' },
              }}
            >
              <MicIcon />
            </IconButton>
          </Box>

          {/* Appointment Info */}
          <Box
            sx={{
              backgroundColor: '#f5fefb',
              p: 2,
              borderRadius: 2,
              mb: 2,
              textAlign: isMobile ? 'left' : 'left',
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Upcoming Appointment
            </Typography>
            <Typography variant="body2">
              {appointment.doctor || 'Doctor Unknown'}
            </Typography>
            <Typography variant="body2">
              {appointment.date || 'Date not set'} at {appointment.time || 'Time not set'}
            </Typography>
            <Typography variant="body2">
              Reason: {appointment.reason || 'N/A'}
            </Typography>
          </Box>

          {/* Start Call Button */}
          <Button
            fullWidth
            variant="contained"
            startIcon={<VideocamIcon />}
            sx={{
              background: 'linear-gradient(to right, #1565C0, #26C6DA)',
              textTransform: 'none',
              color: 'white',
              fontWeight: 500,
              py: 1.2,
              borderRadius: 2,
              fontSize: isMobile ? '0.875rem' : '1rem',
            }}
              onClick={toggleCamera}
          >
            Start Video Call
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default VideoCall;
