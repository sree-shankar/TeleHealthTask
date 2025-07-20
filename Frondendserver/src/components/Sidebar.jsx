import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MedicationIcon from '@mui/icons-material/Medication';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const drawerWidth = 240;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const links = [
    { name: 'My Appointments', path: '/appointments', icon: <CalendarMonthIcon /> },
    { name: 'Schedule Appointment', path: '/schedule', icon: <AddCircleIcon /> },
    { name: 'My Prescriptions', path: '/prescriptions', icon: <MedicationIcon /> },
    { name: 'Video Call', path: '/video-call', icon: <VideoCallIcon /> },
  ];

  const drawerContent = (
    <Box sx={{ px: 2, py: 3 }}>
      <Typography variant="h6" fontWeight="bold" align="center" mb={0.5}>
        HealthPortal
      </Typography>
      <Typography
        variant="caption"
        align="center"
        display="block"
        color="rgba(255,255,255,0.7)"
        mb={2}
      >
        Patient Portal
      </Typography>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 2 }} />

      <List disablePadding>
        {links.map((link) => (
          <ListItem key={link.name} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={NavLink}
              to={link.path}
              onClick={isMobile ? handleDrawerToggle : undefined}
              sx={{
                color: 'inherit',
                px: 1,
                py: 1.2,
                borderRadius: 1.5,
                '&.active': {
                  backgroundColor: 'white',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>{link.icon}</ListItemIcon>
              <ListItemText primary={link.name} primaryTypographyProps={{ fontSize: '0.95rem' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#0D47A1',
            color: 'white',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            backgroundColor: '#0D47A1',
            color: 'white',
            boxSizing: 'border-box',
            borderRight: 0,
          },
        }}
        open
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
