import React from 'react';
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
import LogoTuTurno from '../assets/img/LogoTuTurno.jpg';

const Alumnos = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            Bienvenido al Portal de Alumnos
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Esta es la página de acceso para alumnos. Aquí podrás encontrar toda la información relevante para tu formación académica.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ fontWeight: 'bold', fontSize: 18, background: 'linear-gradient(90deg, #222 60%, #4e4e4e 100%)', py: 1.5 }}
            >
              Volver al Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Alumnos; 