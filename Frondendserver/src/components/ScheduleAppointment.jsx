import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ScheduleAppointment = () => {
  const [form, setForm] = useState({
    doctor: '',
    date: '',
    time: '',
    type: 'Video Call',
    reason: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: '' }); // Clear error on change
  };

  const handleTypeChange = (e, newType) => {
    if (newType !== null) setForm({ ...form, type: newType });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.doctor) newErrors.doctor = 'Doctor is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.time) newErrors.time = 'Time is required';
    if (!form.reason) newErrors.reason = 'Reason is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);
  try {
    await axios.post('http://localhost:5000/api/appointments', form);

    // Simulate 5-second delay before navigating
    setTimeout(() => {
      setLoading(false);
      navigate('/appointments');
    }, 4000);

  } catch (err) {
    setLoading(false);
    alert('Something went wrong. Please try again.');
  }
};


  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 4, sm: 6 }, position: 'relative' }}>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}

      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3 }}>
          <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
            Schedule Appointment
          </Typography>
          <Typography align="center" color="text.secondary" mb={4}>
            Book your next healthcare appointment
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <TextField
              required
              select
              label="Select Doctor"
              value={form.doctor}
              onChange={handleChange('doctor')}
              fullWidth
              error={!!errors.doctor}
              helperText={errors.doctor}
              disabled={loading}
            >
              <MenuItem value="">Choose your healthcare provider</MenuItem>
              <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
              <MenuItem value="Dr. Hari">Dr. Hari</MenuItem>
              <MenuItem value="Dr. Manu">Dr. Manu</MenuItem>
              <MenuItem value="Dr. Sri">Dr. Sri</MenuItem>
              <MenuItem value="Dr. Vishnu">Dr. Vishnu</MenuItem>
              <MenuItem value="Dr. Pant">Dr. Pant</MenuItem>
            </TextField>

            <TextField
              required
              type="date"
              label="Preferred Date"
              InputLabelProps={{ shrink: true }}
              value={form.date}
              onChange={handleChange('date')}
              fullWidth
              error={!!errors.date}
              helperText={errors.date}
              disabled={loading}
            />

            <TextField
              required
              type="time"
              label="Preferred Time"
              InputLabelProps={{ shrink: true }}
              value={form.time}
              onChange={handleChange('time')}
              fullWidth
              error={!!errors.time}
              helperText={errors.time}
              disabled={loading}
            />

            <Box>
              <Typography fontWeight={500} mb={1}>
                Appointment Type *
              </Typography>
              <ToggleButtonGroup
                value={form.type}
                exclusive
                onChange={handleTypeChange}
                fullWidth
                orientation={isMobile ? 'vertical' : 'horizontal'}
              >
                <ToggleButton value="Video Call" sx={{ flex: 1 }} disabled={loading}>
                  <VideoCallIcon sx={{ mr: 1 }} />
                  Video Call
                </ToggleButton>
                <ToggleButton value="In-Person" sx={{ flex: 1 }} disabled={loading}>
                  <LocationOnIcon sx={{ mr: 1 }} />
                  In-Person
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <TextField
              required
              multiline
              minRows={3}
              label="Reason for Visit"
              placeholder="Please describe the reason for your appointment..."
              value={form.reason}
              onChange={handleChange('reason')}
              fullWidth
              error={!!errors.reason}
              helperText={errors.reason}
              disabled={loading}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              startIcon={<CalendarMonthIcon />}
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 600,
                background: 'linear-gradient(to right, #1e3c72, #2a5298)',
              }}
            >
              Schedule Appointment
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ScheduleAppointment;
