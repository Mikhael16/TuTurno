import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Avatar,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoTuTurno from '../assets/img/LogoTuTurno.jpg';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post('http://localhost:8000/token', formData);
      localStorage.setItem('token', response.data.access_token);
      // Obtener datos del usuario para redirigir según rol
      const userRes = await axios.get('http://localhost:8000/usuarios/me', {
        headers: { Authorization: `Bearer ${response.data.access_token}` },
      });
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error de login:', error);
      alert('Error en el inicio de sesión');
    }
  };

  const handleAlumnoAccess = () => {
    navigate('/alumnos');
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      // Enviar el token al backend
      const response = await axios.post('http://localhost:8000/api/login-google', { token: credential });
      if (response.data && response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        window.location.href = '/dashboard';
      } else {
        alert('No se pudo iniciar sesión con Google.');
      }
    } catch (error) {
      alert('Error al iniciar sesión con Google.');
    }
  };

  const handleGoogleError = () => {
    alert('Error al autenticar con Google.');
  };

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
        component="main"
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
          <Avatar src={LogoTuTurno} sx={{ width: 110, height: 110, mb: 2, bgcolor: 'transparent' }} />
          <Typography component="h1" variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#222' }}>
            TuTurno
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ color: '#555', mb: 2, fontWeight: 500 }}>
            ¡Bienvenido! Gestiona tus turnos y actividades de manera sencilla y eficiente.
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: '#555', mb: 2 }}>
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ backgroundColor: '#fff', borderRadius: 1, fontSize: 18 }}
              InputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ backgroundColor: '#fff', borderRadius: 1, fontSize: 18 }}
              InputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontWeight: 'bold', fontSize: 18, background: 'linear-gradient(90deg, #222 60%, #4e4e4e 100%)', py: 1.5 }}
            >
              Iniciar Sesión
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleAlumnoAccess}
                  sx={{ fontWeight: 'bold', borderColor: '#222', color: '#222', fontSize: 18, py: 1.5, ':hover': { borderColor: '#4e4e4e', color: '#4e4e4e' } }}
                >
                  Acceso Alumnos
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="text"
                  onClick={() => navigate('/reset-password')}
                  sx={{ fontWeight: 'bold', color: '#666', fontSize: 16, py: 1, ':hover': { color: '#222', background: 'rgba(34,34,34,0.04)' } }}
                >
                  ¿Olvidaste tu contraseña?
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              width="100%"
              shape="pill"
              text="signin_with"
              logo_alignment="left"
              theme="outline"
              ux_mode="popup"
              prompt="select_account"
              // Solo emails permitidos se validan en backend
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 