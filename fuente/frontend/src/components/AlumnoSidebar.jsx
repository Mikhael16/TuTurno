import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  useMediaQuery,
  IconButton,
  Switch,
  FormControlLabel,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  School,
  Star,
  CompareArrows,
  CalendarMonth,
  History,
  Brightness4,
  Brightness7,
  Logout,
} from '@mui/icons-material';
import LogoTuTurno from '../assets/img/LogoTuTurno.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const sidebarWidth = 200;

const navigationItems = [
  { text: 'Simulación', icon: <School />, path: '/alumnos' },
  { text: 'Historial', icon: <History />, path: '/historial' },
  { text: 'Calendario', icon: <CalendarMonth />, path: '/calendario' },
  { text: 'Favoritos', icon: <Star />, path: '/favoritos' },
  { text: 'Comparar', icon: <CompareArrows />, path: '/comparar' },
];

const preferenceItems = [
  { text: 'Favoritos', icon: <Star /> },
  { text: 'Comparar', icon: <CompareArrows /> },
];

const AlumnoSidebar = ({ user, periodo, darkMode, setDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setDarkMode(false);
    localStorage.removeItem('darkMode');
    navigate('/');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: sidebarWidth,
          boxSizing: 'border-box',
          background: darkMode ? '#1a1a1a' : '#ffffff',
          borderRight: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
          px: 2,
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '100vh',
          boxShadow: darkMode ? '2px 0 16px rgba(66, 165, 245, 0.2)' : '2px 0 16px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
        },
      }}
      anchor="left"
    >
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        {/* Logo y título */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, px: 1 }}>
          <Avatar 
            src={LogoTuTurno} 
            sx={{ 
              width: 40, 
              height: 40, 
              mr: 1.5, 
              boxShadow: darkMode ? '0 2px 8px rgba(66, 165, 245, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd'
            }} 
          />
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 'bold', 
              color: darkMode ? '#42a5f5' : '#1976d2', 
              letterSpacing: 0.5,
              fontSize: '1rem'
            }}
          >
            TuTurno
          </Typography>
        </Box>

        {/* Elementos del menú principal */}
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: darkMode ? '#90caf9' : '#546e7a', 
            mb: 2, 
            ml: 1, 
            fontWeight: 'bold', 
            fontSize: 14,
            textTransform: 'uppercase',
            letterSpacing: 1
          }}
        >
          Navegación
        </Typography>
        <List sx={{ mb: 4 }}>
          {navigationItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  background: darkMode ? '#2d2d2d' : 'transparent',
                  '&:hover': {
                    background: darkMode ? 'rgba(66, 165, 245, 0.15)' : 'rgba(25, 118, 210, 0.08)',
                    transform: 'translateX(8px)',
                    '& .MuiListItemIcon-root': {
                      color: darkMode ? '#42a5f5' : '#1976d2',
                    },
                    '& .MuiListItemText-primary': {
                      color: darkMode ? '#42a5f5' : '#1976d2',
                      fontWeight: 'bold',
                    },
                  },
                  '&.active': {
                    background: darkMode ? 'rgba(66, 165, 245, 0.2)' : 'rgba(25, 118, 210, 0.12)',
                    borderLeft: darkMode ? '4px solid #42a5f5' : '4px solid #1976d2',
                    '& .MuiListItemIcon-root': {
                      color: darkMode ? '#42a5f5' : '#1976d2',
                    },
                    '& .MuiListItemText-primary': {
                      color: darkMode ? '#42a5f5' : '#1976d2',
                      fontWeight: 'bold',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: darkMode ? '#90caf9' : '#546e7a',
                    transition: 'all 0.3s ease',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: darkMode ? '#e3f2fd' : '#37474f',
                      transition: 'all 0.3s ease',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Separador */}
        <Divider sx={{ my: 3, borderColor: darkMode ? '#42a5f5' : '#e3f2fd' }} />

        {/* Elementos de preferencias */}
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: darkMode ? '#90caf9' : '#546e7a', 
            mb: 2, 
            ml: 1, 
            fontWeight: 'bold', 
            fontSize: 14,
            textTransform: 'uppercase',
            letterSpacing: 1
          }}
        >
          Preferencias
        </Typography>
        <List>
          {preferenceItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                sx={{
                  borderRadius: 3,
                  py: 2,
                  px: 3,
                  color: darkMode ? '#90caf9' : '#546e7a',
                  fontSize: 16,
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  background: darkMode ? '#2d2d2d' : 'transparent',
                  '&:hover': {
                    background: darkMode ? '#3d3d3d' : '#f5f5f5',
                    color: darkMode ? '#42a5f5' : '#1976d2',
                    transform: 'translateX(4px)',
                    boxShadow: darkMode ? '0 4px 12px rgba(66, 165, 245, 0.3)' : '0 4px 12px rgba(25, 118, 210, 0.15)',
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: 'inherit', 
                    fontSize: 24,
                    minWidth: 40,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: 16, 
                    fontWeight: 'inherit',
                    letterSpacing: 0.3
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Sección inferior con toggle de modo oscuro y cerrar sesión */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Toggle de modo oscuro */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              p: 2,
              borderRadius: 3,
              background: darkMode ? '#2d2d2d' : '#f5f5f5',
              color: darkMode ? '#42a5f5' : '#1976d2',
              border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: darkMode ? '#3d3d3d' : '#e3f2fd',
                transform: 'scale(1.1)',
                boxShadow: darkMode ? '0 4px 12px rgba(66, 165, 245, 0.4)' : '0 4px 12px rgba(25, 118, 210, 0.2)',
              },
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {/* Botón Cerrar Sesión */}
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 3,
            py: 1.5,
            px: 3,
            color: darkMode ? '#ff6b6b' : '#f44336',
            fontSize: 16,
            fontWeight: 600,
            transition: 'all 0.3s ease',
            border: darkMode ? '2px solid #ff6b6b' : '2px solid #f44336',
            background: darkMode ? '#2d2d2d' : 'transparent',
            '&:hover': {
              background: darkMode ? '#3d3d3d' : '#ffebee',
              color: darkMode ? '#ff8a80' : '#d32f2f',
              transform: 'translateX(4px)',
              boxShadow: darkMode ? '0 4px 12px rgba(255, 107, 107, 0.3)' : '0 4px 12px rgba(244, 67, 54, 0.15)',
            },
          }}
        >
          <ListItemIcon 
            sx={{ 
              color: 'inherit', 
              fontSize: 24,
              minWidth: 40,
              transition: 'all 0.3s ease',
            }}
          >
            <Logout />
          </ListItemIcon>
          <ListItemText 
            primary="Cerrar Sesión" 
            primaryTypographyProps={{ 
              fontSize: 16, 
              fontWeight: 'inherit',
              letterSpacing: 0.3
            }} 
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default AlumnoSidebar; 