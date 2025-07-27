import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Avatar,
  useMediaQuery,
  Alert,
  CircularProgress,
  IconButton,
  Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import LogoTuTurno from '../assets/img/LogoTuTurno.jpg';

const ActualizarUsuario = () => {
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
        setFormData(prev => ({ ...prev, email: response.data.email }));
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        navigate('/');
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('El email es requerido');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('El email debe ser válido');
      return false;
    }
    if (!formData.currentPassword.trim()) {
      setError('La contraseña actual es requerida');
      return false;
    }
    if (formData.newPassword && formData.newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      setError('Las nuevas contraseñas no coinciden');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const updateData = {
        email: formData.email,
        current_password: formData.currentPassword,
        new_password: formData.newPassword || null,
        confirm_new_password: formData.confirmNewPassword || null
      };

      const response = await axios.put('http://localhost:8000/api/actualizar-usuario', updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess('Datos actualizados exitosamente');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }));
      
      // Actualizar datos del usuario en el estado
      setUserData(response.data);

    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError('Error al actualizar los datos. Intente nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (loadingUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
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
        component="main"
        maxWidth={isMobile ? 'xs' : 'sm'}
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
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            width: '100%',
            maxWidth: 500,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#fff',
            position: 'relative',
          }}
        >
          {/* Botón de regreso */}
          <IconButton
            onClick={handleBackToDashboard}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              color: '#666',
              '&:hover': { color: '#222' }
            }}
          >
            <ArrowBack />
          </IconButton>

          <Avatar src={LogoTuTurno} sx={{ width: 100, height: 100, mb: 2, bgcolor: 'transparent' }} />
          <Typography component="h1" variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#222' }}>
            Actualizar Datos
          </Typography>
          <Typography variant="body1" align="center" sx={{ color: '#555', mb: 3 }}>
            Actualice su información personal
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              sx={{ backgroundColor: '#fff', borderRadius: 1, fontSize: 16 }}
              InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ style: { fontSize: 16 } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="currentPassword"
              label="Contraseña Actual"
              type="password"
              id="currentPassword"
              autoComplete="current-password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              sx={{ backgroundColor: '#fff', borderRadius: 1, fontSize: 16 }}
              InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ style: { fontSize: 16 } }}
            />
            
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Cambiar Contraseña (Opcional)
              </Typography>
            </Divider>
            
            <TextField
              margin="normal"
              fullWidth
              name="newPassword"
              label="Nueva Contraseña"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              value={formData.newPassword}
              onChange={handleInputChange}
              sx={{ backgroundColor: '#fff', borderRadius: 1, fontSize: 16 }}
              InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ style: { fontSize: 16 } }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="confirmNewPassword"
              label="Confirmar Nueva Contraseña"
              type="password"
              id="confirmNewPassword"
              autoComplete="new-password"
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
              sx={{ backgroundColor: '#fff', borderRadius: 1, fontSize: 16 }}
              InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ style: { fontSize: 16 } }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                mt: 3, 
                mb: 2, 
                fontWeight: 'bold', 
                fontSize: 18, 
                background: 'linear-gradient(90deg, #222 60%, #4e4e4e 100%)', 
                py: 1.5,
                '&:disabled': {
                  background: '#ccc'
                }
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#fff' }} />
              ) : (
                'Actualizar Datos'
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ActualizarUsuario; 