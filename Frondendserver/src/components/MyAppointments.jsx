import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Container,
  Stack,
  Select,
  MenuItem,
  FormControl,
  Grid,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterListIcon from '@mui/icons-material/FilterList';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments')
      .then(res => setAppointments(res.data))
      .catch(err => console.error('Error fetching appointments:', err));
  }, []);

  const filteredAppointments = filter === 'All'
    ? appointments
    : appointments.filter(a => a.status === filter);

  return (
    <Box sx={{  minHeight: '100vh', py: { xs: 2, sm: 3 } }}>
      <Container maxWidth="md">
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center" mb={3} spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" fontWeight="bold" fontSize={{ xs: '1.5rem', sm: '2rem' }}>
              My Appointments
            </Typography>
            <Typography variant="subtitle1" fontSize={{ xs: '0.9rem', sm: '1rem' }}>
              Manage your healthcare appointments
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="filter-label">
               Filter
              </InputLabel>
              <Select
                labelId="filter-label"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                sx={{ backgroundColor: 'white', borderRadius: 2 }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Upcoming">Upcoming</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Appointment Cards */}
        {filteredAppointments.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              mt: 8,
              py: 5,
             
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="text.secondary">
              No appointments found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try changing your filter or schedule a new appointment.
            </Typography>
          </Box>
        ) : (
          filteredAppointments.map((appt) => (
            <Paper
              key={appt.id}
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
                position: 'relative',
              }}
            >
              {/* Status Chip */}
              <Chip
                label={appt.status}
                color={appt.status === 'Upcoming' ? 'primary' : 'success'}
                size="small"
                sx={{ position: 'absolute', top: 16, right: 16 }}
              />

              {/* Doctor & Specialty */}
              <Typography variant="h6" fontWeight="bold">{appt.doctor}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Family Medicine</Typography>

              {/* Date, Time, Type */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={1}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <CalendarTodayIcon fontSize="small" />
                  <Typography variant="body2">{appt.date}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2">{appt.time}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  {appt.type === 'Video Call'
                    ? <VideoCallIcon fontSize="small" />
                    : <LocationOnIcon fontSize="small" />}
                  <Typography variant="body2">{appt.type}</Typography>
                </Box>
              </Stack>

              {/* Reason */}
              <Typography mt={1}>
                <strong>Reason for visit:</strong> {appt.reason}
              </Typography>

              {/* Action Buttons */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1}
                mt={2}
                useFlexGap
                flexWrap="wrap"
              >
                {appt.type === 'Video Call' && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<VideoCallIcon />}
                    onClick={() => navigate('/video-call', { state: appt })}
                  >
                    Join Video Call
                  </Button>
                )}
                <Button
                  variant="contained"
                  size="small"
                  sx={{ backgroundColor: '#FFEB00', color: 'black' }}
                   onClick={() => navigate('/schedule', { state: appt })}
                >
                  Reschedule
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ backgroundColor: '#FFEB00', color: 'black' }}
                >
                  Cancel
                </Button>
              </Stack>
            </Paper>
          ))
        )}
      </Container>
    </Box>
  );
};

export default MyAppointments;
