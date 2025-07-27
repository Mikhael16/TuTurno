import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  ListItemButton,
  Chip,
  Fade,
  CircularProgress,
  Paper,
  Grid,
  Button,
  IconButton,
  Stack,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  School,
  ArrowBack,
  Book,
  Science,
  Computer,
  Engineering,
  Psychology,
  Code,
  Search,
  Clear
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';

// Configurar axios para usar la URL base
axios.defaults.baseURL = 'http://localhost:8000';

const departamentos = [
  { codigo: 'CCBB', nombre: 'Ciencias Básicas', icon: <Science />, color: '#1976d2' },
  { codigo: 'SITE', nombre: 'Sistemas y Telemática', icon: <Computer />, color: '#388e3c' },
  { codigo: 'GEPR', nombre: 'Gestión de la Producción', icon: <Engineering />, color: '#f57c00' },
  { codigo: 'TECN', nombre: 'Tecnología', icon: <Engineering />, color: '#7b1fa2' },
  { codigo: 'HUCS', nombre: 'Humanidades y Ciencias Sociales', icon: <Psychology />, color: '#c2185b' },
  { codigo: 'SOFT', nombre: 'Software', icon: <Code />, color: '#0288d1' }
];

const CursosPorDepartamento = () => {
  const [cursos, setCursos] = useState([]);
  const [cursosFiltrados, setCursosFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const { departamentoCodigo } = useParams();
  const navigate = useNavigate();

  const departamentoActual = departamentos.find(d => d.codigo === departamentoCodigo);

  useEffect(() => {
    if (departamentoCodigo) {
      cargarCursos();
    }
  }, [departamentoCodigo]);

  useEffect(() => {
    filtrarCursos();
  }, [busqueda, cursos]);

  const cargarCursos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/cursos-departamento/${departamentoCodigo}`);
      setCursos(response.data);
    } catch (err) {
      setError('Error al cargar los cursos del departamento');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtrarCursos = () => {
    if (!busqueda.trim()) {
      setCursosFiltrados(cursos);
      return;
    }

    const terminoBusqueda = busqueda.toLowerCase().trim();
    const filtrados = cursos.filter(curso => 
      curso.codigo.toLowerCase().includes(terminoBusqueda) ||
      curso.nombre.toLowerCase().includes(terminoBusqueda)
    );
    setCursosFiltrados(filtrados);
  };

  const handleCursoClick = (curso) => {
    // Crear un objeto serializable del departamento sin elementos JSX
    const departamentoSerializable = {
      codigo: departamentoActual.codigo,
      nombre: departamentoActual.nombre,
      color: departamentoActual.color
    };
    
    navigate(`/dashboard-curso/${curso.codigo}`, { 
      state: { curso, departamento: departamentoSerializable } 
    });
  };

  const handleVolver = () => {
    navigate('/admin');
  };

  const limpiarBusqueda = () => {
    setBusqueda('');
  };

  if (!departamentoActual) {
    return (
      <AdminLayout user={null}>
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Departamento no encontrado
          </Typography>
          <Button onClick={handleVolver} sx={{ mt: 2 }}>
            Volver al Dashboard
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
              border: `2px solid ${departamentoActual.color}`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                onClick={handleVolver}
                sx={{
                  color: departamentoActual.color,
                  '&:hover': {
                    background: `${departamentoActual.color}15`,
                  },
                }}
              >
                <ArrowBack />
              </IconButton>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  background: `${departamentoActual.color}15`,
                  color: departamentoActual.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {departamentoActual.icon}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 0.5 }}>
                  {departamentoActual.nombre}
                </Typography>
                <Typography variant="body1" sx={{ color: '#7f8c8d', fontWeight: 500 }}>
                  Código: {departamentoActual.codigo}
                </Typography>
              </Box>
              <Chip
                label={`${cursosFiltrados.length} de ${cursos.length} cursos`}
                color="primary"
                sx={{ 
                  background: departamentoActual.color,
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            </Stack>
          </Paper>
        </Fade>

        {/* Buscador */}
        <Fade in timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: `2px solid ${departamentoActual.color}30`,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 2 }}>
              Buscar Cursos
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar por código o nombre del curso..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: departamentoActual.color }} />
                  </InputAdornment>
                ),
                endAdornment: busqueda && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={limpiarBusqueda}
                      size="small"
                      sx={{ color: departamentoActual.color }}
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: `${departamentoActual.color}40`,
                    },
                    '&:hover fieldset': {
                      borderColor: departamentoActual.color,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: departamentoActual.color,
                    },
                  },
                },
              }}
            />
            {busqueda && (
              <Typography variant="body2" sx={{ color: '#7f8c8d', mt: 1, fontStyle: 'italic' }}>
                Mostrando {cursosFiltrados.length} resultados para "{busqueda}"
              </Typography>
            )}
          </Paper>
        </Fade>

        {/* Contenido */}
        <Fade in timeout={1200}>
          <Box>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress size={60} sx={{ color: departamentoActual.color }} />
              </Box>
            ) : error ? (
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 4,
                  border: '2px solid #e74c3c',
                }}
              >
                <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
                <Button
                  variant="contained"
                  onClick={cargarCursos}
                  sx={{ background: departamentoActual.color }}
                >
                  Reintentar
                </Button>
              </Card>
            ) : cursosFiltrados.length === 0 ? (
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 4,
                  border: `2px solid ${departamentoActual.color}`,
                }}
              >
                <Search sx={{ fontSize: 64, color: departamentoActual.color, mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#7f8c8d', mb: 1 }}>
                  {busqueda ? 'No se encontraron cursos' : 'No hay cursos disponibles'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#95a5a6' }}>
                  {busqueda 
                    ? `No hay cursos que coincidan con "${busqueda}"`
                    : 'Este departamento aún no tiene cursos registrados.'
                  }
                </Typography>
                {busqueda && (
                  <Button
                    variant="outlined"
                    onClick={limpiarBusqueda}
                    sx={{ 
                      mt: 2, 
                      borderColor: departamentoActual.color,
                      color: departamentoActual.color,
                      '&:hover': {
                        borderColor: departamentoActual.color,
                        background: `${departamentoActual.color}10`,
                      }
                    }}
                  >
                    Limpiar búsqueda
                  </Button>
                )}
              </Card>
            ) : (
              <Grid container spacing={3}>
                {cursosFiltrados.map((curso, index) => (
                  <Grid item xs={12} sm={6} md={4} key={curso.codigo}>
                    <Fade in timeout={800 + index * 100}>
                      <Card
                        elevation={0}
                        sx={{
                          height: '100%',
                          background: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: 3,
                          border: `2px solid ${departamentoActual.color}30`,
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 24px ${departamentoActual.color}30`,
                            borderColor: departamentoActual.color,
                          },
                        }}
                      >
                        <ListItemButton
                          onClick={() => handleCursoClick(curso)}
                          sx={{
                            height: '100%',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            p: 3,
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%', mb: 2 }}>
                            <Box
                              sx={{
                                p: 1,
                                borderRadius: 2,
                                background: `${departamentoActual.color}15`,
                                color: departamentoActual.color,
                              }}
                            >
                              <School />
                            </Box>
                            <Chip
                              label={curso.codigo}
                              size="small"
                              sx={{
                                background: departamentoActual.color,
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                              }}
                            />
                          </Stack>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 'bold',
                              color: '#2c3e50',
                              mb: 1,
                              lineHeight: 1.3,
                              textAlign: 'left',
                            }}
                          >
                            {curso.nombre}
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                            {curso.ciclo && (
                              <Chip
                                label={`Ciclo ${curso.ciclo}`}
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderColor: departamentoActual.color,
                                  color: departamentoActual.color,
                                  fontSize: '0.7rem',
                                }}
                              />
                            )}
                            {curso.creditos && (
                              <Chip
                                label={`${curso.creditos} créditos`}
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderColor: departamentoActual.color,
                                  color: departamentoActual.color,
                                  fontSize: '0.7rem',
                                }}
                              />
                            )}
                          </Stack>
                        </ListItemButton>
                      </Card>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Fade>
      </Box>
    </AdminLayout>
  );
};

export default CursosPorDepartamento;
