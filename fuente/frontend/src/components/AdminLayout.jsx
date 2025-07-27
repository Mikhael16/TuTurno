import React, { useState } from 'react';
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
  Button,
  Collapse,
  Divider,
  useMediaQuery,
  IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  ExpandLess,
  ExpandMore,
  School,
  MenuBook,
  Logout,
  Person,
  Dashboard,
  People,
  Add,
  Settings,
  Warning,
} from '@mui/icons-material';
import LogoTuTurno from '../assets/img/LogoTuTurno.jpg';
import { useNavigate, useLocation } from 'react-router-dom';

const sidebarWidth = 260;

const sidebarItems = [
  { text: 'General', icon: <Dashboard />, action: 'general', path: '/admin' },
  { 
    text: 'Gestión de Usuarios', 
    icon: <People />, 
    action: 'usuarios',
    subItems: [
      { text: 'Crear Usuario Administrador', icon: <Add />, action: 'crear-usuario', path: '/crear-usuario' },
      { text: 'Actualizar Datos Sesión Actual', icon: <Settings />, action: 'actualizar-usuario', path: '/actualizar-usuario' }
    ]
  },
  { text: 'Gestión de Cruces', icon: <Warning />, action: 'gestion-cruces', path: '/gestion-cruces' },
  { text: 'Reportes', icon: <MenuBook />, action: 'reportes' },
  { text: 'Carga de la matrícula', icon: <MenuBook />, action: 'carga-matricula' },
];

const AdminLayout = ({ children, user }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expandedUsuarios, setExpandedUsuarios] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSidebarItemClick = (action, path) => {
    switch (action) {
      case 'crear-usuario':
        window.location.href = '/crear-usuario';
        break;
      case 'actualizar-usuario':
        window.location.href = '/actualizar-usuario';
        break;
      case 'gestion-cruces':
        navigate('/gestion-cruces');
        break;
      case 'usuarios':
        setExpandedUsuarios(!expandedUsuarios);
        break;
      case 'general':
        navigate('/admin');
        break;
      case 'reportes':
        navigate('/reportes');
        break;
      default:
        // Para otros items del sidebar
        console.log(`Acción: ${action}`);
        break;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'rgb(247, 237, 225)' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: sidebarWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, rgb(247, 237, 225) 80%, #fff 100%)',
            borderRight: 'none',
            px: 2,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
        anchor="left"
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar src={LogoTuTurno} sx={{ width: 48, height: 48, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#222' }}>
              TuTurno
            </Typography>
          </Box>
          <List>
            {sidebarItems.map((item, idx) => (
              <React.Fragment key={item.text}>
                <ListItem disablePadding>
                  <ListItemButton
                    selected={isActiveRoute(item.path)}
                    onClick={() => handleSidebarItemClick(item.action, item.path)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      background: isActiveRoute(item.path) ? 'rgba(34,34,34,0.08)' : 'none',
                      '&:hover': {
                        background: 'rgba(34,34,34,0.12)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: '#222' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActiveRoute(item.path) ? 'bold' : 500 }} />
                    {item.subItems && (
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleSidebarItemClick(item.action); }}>
                        {expandedUsuarios ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    )}
                  </ListItemButton>
                </ListItem>
                {item.subItems && (
                  <Collapse in={expandedUsuarios} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItem key={subItem.text} disablePadding>
                          <ListItemButton
                            sx={{
                              pl: 4,
                              borderRadius: 2,
                              mb: 0.5,
                              background: isActiveRoute(subItem.path) ? 'rgba(34,34,34,0.08)' : 'none',
                              '&:hover': {
                                background: 'rgba(34,34,34,0.08)',
                              },
                            }}
                            onClick={() => handleSidebarItemClick(subItem.action, subItem.path)}
                          >
                            <ListItemIcon sx={{ color: '#666', minWidth: 36 }}>{subItem.icon}</ListItemIcon>
                            <ListItemText 
                              primary={subItem.text} 
                              primaryTypographyProps={{ 
                                fontSize: '0.875rem',
                                fontWeight: isActiveRoute(subItem.path) ? 'bold' : 400 
                              }} 
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: '#222' }}>{user?.email?.[0]?.toUpperCase() || 'U'}</Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#222' }}>{user?.email}</Typography>
              <Typography variant="caption" sx={{ color: '#555' }}>{user?.username}</Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{ width: '100%', fontWeight: 'bold', borderColor: '#222', color: '#222', ':hover': { borderColor: '#4e4e4e', color: '#4e4e4e', background: 'rgba(34,34,34,0.04)' } }}
          >
            Salir de la Sesión
          </Button>
        </Box>
      </Drawer>
      
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout; 