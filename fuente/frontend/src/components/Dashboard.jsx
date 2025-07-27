import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Avatar,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoTuTurno from '../assets/img/LogoTuTurno.jpg';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        const response = await axios.get('http://localhost:8000/usuarios/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!userData) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isMobile
          ? 'rgb(247, 237, 225)'
          : 'linear-gradient(90deg, rgb(247, 237, 225) 60%, #f5f5f5 100%)',
      }}
    >
      <Container
        maxWidth={isMobile ? 'xs' : 'md'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 6 },
            borderRadius: 4,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            width: { xs: '100%', sm: 420, md: 520 },
            maxWidth: '100%',
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#fff',
          }}
        >
          <Avatar src={LogoTuTurno} sx={{ width: 90, height: 90, mb: 2, bgcolor: 'transparent' }} />
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#222' }}>
            Bienvenido, {userData.username}
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Rol: {userData.rol}
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{ fontWeight: 'bold', fontSize: 18, background: 'linear-gradient(90deg, #222 60%, #4e4e4e 100%)', py: 1.5 }}
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard; 