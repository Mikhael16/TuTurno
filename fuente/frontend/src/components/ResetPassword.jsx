import React, { useState } from 'react';
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
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import LogoTuTurno from '../assets/img/LogoTuTurno.jpg';

const steps = ['Ingresar Email', 'Verificar PIN', 'Nueva Contraseña'];

const ResetPassword = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBackToLogin = () => {
    navigate('/');
  };

  const handleRequestPin = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/solicitar-reset-password', {
        email: email.trim()
      });

      setSuccess('Se ha enviado un código de verificación a tu correo electrónico');
      setActiveStep(1);
    } catch (error) {
      console.error('Error al solicitar PIN:', error);
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError('Error al enviar el código de verificación. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleValidatePin = async () => {
    if (!pin.trim() || pin.length !== 6) {
      setError('Por favor ingresa un PIN válido de 6 dígitos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/validar-pin', {
        email: email.trim(),
        pin: pin.trim()
      });

      setSuccess('PIN válido');
      setActiveStep(2);
    } catch (error) {
      console.error('Error al validar PIN:', error);
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError('Error al validar el PIN. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim() || newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/reset-password', {
        email: email.trim(),
        pin: pin.trim(),
        new_password: newPassword,
        confirm_password: confirmPassword
      });

      setSuccess('Contraseña restablecida exitosamente');
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error al restablecer contraseña:', error);
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError('Error al restablecer la contraseña. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" sx={{ mt: 1, width: '100%' }}>
            <Typography variant="body1" sx={{ color: '#555', mb: 3, textAlign: 'center' }}>
              Ingresa tu dirección de correo electrónico para recibir un código de verificación
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ backgroundColor: '#fff', borderRadius: 1, fontSize: 16 }}
              InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ style: { fontSize: 16 } }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleRequestPin}
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
                'Enviar Código de Verificación'
              )}
            </Button>
          </Box>
        );

      case 1:
        return (
          <Box component="form" sx={{ mt: 1, width: '100%' }}>
            <Typography variant="body1" sx={{ color: '#555', mb: 3, textAlign: 'center' }}>
              Revisa tu correo electrónico e ingresa el código de 6 dígitos que recibiste
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="pin"
              label="Código de Verificación"
              name="pin"
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: 24, letterSpacing: 4 } }}
              sx={{ backgroundColor: '#fff', borderRadius: 1 }}
              InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ style: { fontSize: 16 } }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleValidatePin}
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
                'Verificar Código'
              )}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => setActiveStep(0)}
              sx={{ fontWeight: 'bold', color: '#666', fontSize: 16, py: 1 }}
            >
              Cambiar Email
            </Button>
          </Box>
        );

      case 2:
        return (
          <Box component="form" sx={{ mt: 1, width: '100%' }}>
            <Typography variant="body1" sx={{ color: '#555', mb: 3, textAlign: 'center' }}>
              Ingresa tu nueva contraseña
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="Nueva Contraseña"
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ backgroundColor: '#fff', borderRadius: 1, fontSize: 16 }}
              InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ style: { fontSize: 16 } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Nueva Contraseña"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ backgroundColor: '#fff', borderRadius: 1, fontSize: 16 }}
              InputProps={{ style: { fontSize: 16 } }}
              InputLabelProps={{ style: { fontSize: 16 } }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleResetPassword}
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
                'Restablecer Contraseña'
              )}
            </Button>
          </Box>
        );

      default:
        return null;
    }
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
            onClick={handleBackToLogin}
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
            Restablecer Contraseña
          </Typography>

          {/* Stepper */}
          <Box sx={{ width: '100%', mb: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

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

          {renderStepContent(activeStep)}
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword; 