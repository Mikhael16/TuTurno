import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Fade,
  CircularProgress,
  Paper,
  Grid,
  Button,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  School,
  ArrowBack,
  Book,
  Code,
  Science,
  Computer,
  Engineering,
  Psychology
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AdminLayout from './AdminLayout';

// Configurar axios para usar la URL base
axios.defaults.baseURL = 'http://localhost:8000';

const DetalleCurso = () => {
  const [curso, setCurso] = useState(null);
  const [secciones, setSecciones] = useState([]);
  const [prerequisitos, setPrerequisitos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { cursoCodigo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const departamento = location.state?.departamento;

  useEffect(() => {
    if (cursoCodigo) {
      cargarDetalleCurso();
    }
  }, [cursoCodigo]);

  const cargarDetalleCurso = async () => {
    setLoading(true);
    setError('');
    try {
      // Cargar información del curso
      const responseCurso = await axios.get(`/api/curso/${cursoCodigo}`);
      setCurso(responseCurso.data);

      // Cargar secciones del curso
      const responseSecciones = await axios.get(`/api/secciones-curso/${cursoCodigo}`);
      setSecciones(responseSecciones.data);

      // Cargar prerequisitos
      const responsePrerequisitos = await axios.get(`/api/prerequisitos-curso/${cursoCodigo}`);
      setPrerequisitos(responsePrerequisitos.data);
    } catch (err) {
      setError('Error al cargar la información del curso');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVolver = () => {
    if (departamento) {
      navigate(`/cursos-departamento/${departamento.codigo}`);
    } else {
      navigate('/admin');
    }
  };

  const getDepartamentoIcon = (codigo) => {
    const iconos = {
      'CCBB': <Science />,
      'SITE': <Computer />,
      'GEPR': <Engineering />,
      'TECN': <Engineering />,
      'HUCS': <Psychology />,
      'SOFT': <Code />
    };
    return iconos[codigo] || <School />;
  };

  if (loading) {
    return (
      <AdminLayout user={null}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
          <CircularProgress size={60} />
        </Box>
      </AdminLayout>
    );
  }

  if (error || !curso) {
    return (
      <AdminLayout user={null}>
        <Box sx={{ 
          p: 4, 
          textAlign: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
          <Typography variant="h5" color="error" sx={{ mb: 2 }}>
            {error || 'Curso no encontrado'}
          </Typography>
          <Button onClick={handleVolver} variant="contained">
            Volver
          </Button>
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout user={null}>
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        p: { xs: 2, sm: 4 }
      }}>
        {/* Header */}
        <Fade in timeout={800}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: `2px solid ${departamento?.color || '#1976d2'}`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                onClick={handleVolver}
                sx={{
                  color: departamento?.color || '#1976d2',
                  '&:hover': {
                    background: `${departamento?.color || '#1976d2'}15`,
                  },
                }}
              >
                <ArrowBack />
              </IconButton>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  background: `${departamento?.color || '#1976d2'}15`,
                  color: departamento?.color || '#1976d2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {getDepartamentoIcon(curso.departamento)}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 0.5 }}>
                  {curso.nombre}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip
                    label={curso.codigo}
                    color="primary"
                    sx={{ 
                      background: departamento?.color || '#1976d2',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                  {departamento && (
                    <Chip
                      label={departamento.nombre}
                      variant="outlined"
                      sx={{
                        borderColor: departamento.color,
                        color: departamento.color,
                      }}
                    />
                  )}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Fade>

        {/* Información del Curso */}
        <Fade in timeout={1200}>
          <Grid container spacing={3}>
            {/* Información General */}
            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 3,
                  border: `2px solid ${departamento?.color || '#1976d2'}30`,
                  height: '100%',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#2c3e50' }}>
                    Información General
                  </Typography>
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ color: departamento?.color || '#1976d2' }}>
                        <Book />
                      </ListItemIcon>
                      <ListItemText
                        primary="Nombre del Curso"
                        secondary={curso.nombre}
                        primaryTypographyProps={{ fontWeight: 'bold', fontSize: '0.9rem' }}
                        secondaryTypographyProps={{ fontSize: '1rem' }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ color: departamento?.color || '#1976d2' }}>
                        <Code />
                      </ListItemIcon>
                      <ListItemText
                        primary="Código"
                        secondary={curso.codigo}
                        primaryTypographyProps={{ fontWeight: 'bold', fontSize: '0.9rem' }}
                        secondaryTypographyProps={{ fontSize: '1rem' }}
                      />
                    </ListItem>
                    {curso.ciclo && (
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ color: departamento?.color || '#1976d2' }}>
                          <School />
                        </ListItemIcon>
                        <ListItemText
                          primary="Ciclo"
                          secondary={`Ciclo ${curso.ciclo}`}
                          primaryTypographyProps={{ fontWeight: 'bold', fontSize: '0.9rem' }}
                          secondaryTypographyProps={{ fontSize: '1rem' }}
                        />
                      </ListItem>
                    )}
                    {curso.creditos && (
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ color: departamento?.color || '#1976d2' }}>
                          <School />
                        </ListItemIcon>
                        <ListItemText
                          primary="Créditos"
                          secondary={`${curso.creditos} créditos`}
                          primaryTypographyProps={{ fontWeight: 'bold', fontSize: '0.9rem' }}
                          secondaryTypographyProps={{ fontSize: '1rem' }}
                        />
                      </ListItem>
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Secciones Disponibles */}
            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 3,
                  border: `2px solid ${departamento?.color || '#1976d2'}30`,
                  height: '100%',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#2c3e50' }}>
                    Secciones Disponibles ({secciones.length})
                  </Typography>
                  {secciones.length === 0 ? (
                    <Typography variant="body2" sx={{ color: '#7f8c8d', fontStyle: 'italic' }}>
                      No hay secciones disponibles para este curso.
                    </Typography>
                  ) : (
                    <List>
                      {secciones.slice(0, 5).map((seccion, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ color: departamento?.color || '#1976d2' }}>
                            <School />
                          </ListItemIcon>
                          <ListItemText
                            primary={`Sección ${seccion.seccion}`}
                            secondary={seccion.nombre_profesor || 'Profesor por asignar'}
                            primaryTypographyProps={{ fontWeight: 'bold', fontSize: '0.9rem' }}
                            secondaryTypographyProps={{ fontSize: '0.85rem' }}
                          />
                        </ListItem>
                      ))}
                      {secciones.length > 5 && (
                        <ListItem sx={{ px: 0 }}>
                          <ListItemText
                            primary={`Y ${secciones.length - 5} secciones más...`}
                            primaryTypographyProps={{ 
                              fontSize: '0.8rem', 
                              color: '#7f8c8d',
                              fontStyle: 'italic'
                            }}
                          />
                        </ListItem>
                      )}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Prerequisitos */}
            {prerequisitos.length > 0 && (
              <Grid item xs={12}>
                <Card
                  elevation={0}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 3,
                    border: `2px solid ${departamento?.color || '#1976d2'}30`,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#2c3e50' }}>
                      Prerequisitos
                    </Typography>
                    <Grid container spacing={2}>
                      {prerequisitos.map((prereq, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Chip
                            label={`${prereq.codigo_prerequisito} - ${prereq.nombre_prerequisito}`}
                            variant="outlined"
                            sx={{
                              borderColor: departamento?.color || '#1976d2',
                              color: departamento?.color || '#1976d2',
                              width: '100%',
                              height: 'auto',
                              '& .MuiChip-label': {
                                whiteSpace: 'normal',
                                textAlign: 'center',
                                lineHeight: 1.2,
                              },
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Fade>
      </Box>
    </AdminLayout>
  );
};

export default DetalleCurso; 