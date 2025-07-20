import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import axios from 'axios';

const Prescriptions = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Medication Name');
  const [sortBy, setSortBy] = useState('Newest');

  useEffect(() => {
    axios.get('http://localhost:5000/api/prescriptions').then((res) => setData(res.data));
  }, []);

  const calculateHours = (start, end) => {
    if (!start || !end) return 'Invalid';

    const [sm, sd, sy] = start.split('/').map(Number);
    const [em, ed, ey] = end.split('/').map(Number);

    if (isNaN(sm) || isNaN(sd) || isNaN(sy) || isNaN(em) || isNaN(ed) || isNaN(ey)) {
      return 'Invalid';
    }

    const startDate = new Date(sy, sm - 1, sd);
    const endDate = new Date(ey, em - 1, ed);
    const diffInMs = endDate - startDate;
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    return hours >= 0 ? hours : 'Invalid';
  };

  const filteredAndSortedData = [...data]
    .filter((item) => {
      const value = search.toLowerCase();
      if (filter === 'Medication Name') {
        return item.name.toLowerCase().includes(value);
      } else if (filter === 'Doctor') {
        return item.doctor.toLowerCase().includes(value);
      } else if (filter === 'Date') {
        return item.startDate.includes(value) || item.endDate.includes(value);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'Newest') {
        return new Date(b.startDate) - new Date(a.startDate);
      } else if (sortBy === 'Oldest') {
        return new Date(a.startDate) - new Date(b.startDate);
      } else if (sortBy === 'A-Z') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'Z-A') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  return (
    <Box sx={{  minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign={{ xs: 'center', sm: 'left' }}
        >
          My Prescriptions
        </Typography>
        <Typography color="text.secondary" mb={3} textAlign={{ xs: 'center', sm: 'left' }}>
          Manage your medications and prescriptions
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
          <TextField
            fullWidth
            placeholder="Search medications or doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { backgroundColor: 'white', borderRadius: 2 },
            }}
          />
          <TextField
            select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              width: { xs: '100%', sm: 180 },
              backgroundColor: 'white',
              borderRadius: 2,
            }}
          >
            <MenuItem value="Medication Name">Medication Name</MenuItem>
            <MenuItem value="Doctor">Doctor</MenuItem>
            <MenuItem value="Date">Date</MenuItem>
          </TextField>
          <TextField
            select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              width: { xs: '100%', sm: 180 },
              backgroundColor: 'white',
              borderRadius: 2,
            }}
          >
            <MenuItem value="Newest">Newest First</MenuItem>
            <MenuItem value="Oldest">Oldest First</MenuItem>
            <MenuItem value="A-Z">Name A–Z</MenuItem>
            <MenuItem value="Z-A">Name Z–A</MenuItem>
          </TextField>
        </Stack>

        {filteredAndSortedData.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="300px"
            textAlign="center"
          >
            <Typography variant="h6" color="text.secondary">
              No prescriptions found.
            </Typography>
          </Box>
        ) : (
          filteredAndSortedData.map((item, idx) => (
            <Paper
              key={idx}
              elevation={2}
              sx={{
                mb: 3,
                p: 3,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={2}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <LocalPharmacyIcon fontSize="medium" />
                  <Box>
                    <Typography fontWeight="bold">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.dosage} • {item.frequency}
                    </Typography>
                  </Box>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip label="Expired" variant="outlined" />
                  <Chip label={`${item.refills} refills left`} color="success" />
                </Stack>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <PersonIcon fontSize="small" />
                <Typography variant="body2">
                  Prescribed by:&nbsp;
                  <Typography component="span" fontWeight="bold">
                    Dr. {item.doctor}
                  </Typography>
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <CalendarMonthIcon fontSize="small" />
                <Typography variant="body2">
                  Duration:&nbsp;
                  <Typography component="span" fontWeight="medium">
                    {item.startDate} - {item.endDate}
                  </Typography>
                  &nbsp;(
                  <Typography component="span" fontWeight="medium">
                    {calculateHours(item.startDate, item.endDate)} hours
                  </Typography>
                  )
                </Typography>
              </Box>

              <Box
                sx={{
                  mt: 1,
                  p: 1.5,
                  backgroundColor: '#f0faf4',
                  borderRadius: 2,
                }}
              >
                <Typography fontWeight={500} variant="body2" gutterBottom>
                  Instructions:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.instructions}
                </Typography>
              </Box>
            </Paper>
          ))
        )}
      </Container>
    </Box>
  );
};

export default Prescriptions;
