import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Grid,
  Fade,
  Badge
} from '@mui/material';
import AlumnoSidebar from './AlumnoSidebar';
import {
  School,
  CompareArrows,
  CalendarMonth,
  Star,
  Delete,
  Visibility,
  Download,
  History,
  TrendingUp,
  Schedule,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const sidebarWidth = 240;

const HistorialAlumno = ({ darkMode, setDarkMode }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [historialData, setHistorialData] = useState({
    predicciones: [],
    comparaciones: [],
    horarios: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = () => {
    // Cargar todas las predicciones (no solo favoritos)
    const predicciones = JSON.parse(localStorage.getItem('todas_predicciones') || '[]');
    
    // Cargar comparaciones (nueva funcionalidad)
    const comparaciones = JSON.parse(localStorage.getItem('comparaciones_guardadas') || '[]');
    
    // Cargar horarios (nueva estructura)
    const horariosRaw = JSON.parse(localStorage.getItem('cursos_guardados_calendario') || '[]');
    const horarios = Array.isArray(horariosRaw) && horariosRaw.length > 0 && horariosRaw[0].cursos 
      ? horariosRaw // Nueva estructura
      : horariosRaw.map(h => ({ cursos: [h], fecha: new Date().toISOString() })); // Estructura antigua
    
    setHistorialData({
      predicciones: predicciones.map(p => ({ ...p, tipo: 'prediccion', fecha: p.fecha || new Date().toISOString() })),
      comparaciones: comparaciones.map(c => ({ ...c, tipo: 'comparacion', fecha: c.fecha || new Date().toISOString() })),
      horarios: horarios.map(h => ({ ...h, tipo: 'horario', fecha: h.fecha || new Date().toISOString() }))
    });
  };

  const eliminarItem = (tipo, index) => {
    const nuevaData = { ...historialData };
    nuevaData[tipo].splice(index, 1);
    setHistorialData(nuevaData);
    
    // Actualizar localStorage
    if (tipo === 'predicciones') {
      localStorage.setItem('todas_predicciones', JSON.stringify(nuevaData.predicciones));
    } else if (tipo === 'comparaciones') {
      localStorage.setItem('comparaciones_guardadas', JSON.stringify(nuevaData.comparaciones));
    } else if (tipo === 'horarios') {
      // Para horarios, guardamos solo el primer elemento (el más reciente)
      localStorage.setItem('cursos_guardados_calendario', JSON.stringify(nuevaData.horarios));
    }
  };

  const limpiarHistorial = (tipo) => {
    const nuevaData = { ...historialData };
    nuevaData[tipo] = [];
    setHistorialData(nuevaData);
    
    // Limpiar localStorage
    if (tipo === 'predicciones') {
      localStorage.removeItem('todas_predicciones');
    } else if (tipo === 'comparaciones') {
      localStorage.removeItem('comparaciones_guardadas');
    } else if (tipo === 'horarios') {
      localStorage.removeItem('cursos_guardados_calendario');
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getIconoTipo = (tipo) => {
    switch (tipo) {
      case 'prediccion':
        return <School />;
      case 'comparacion':
        return <CompareArrows />;
      case 'horario':
        return <CalendarMonth />;
      default:
        return <History />;
    }
  };

  const getColorTipo = (tipo) => {
    switch (tipo) {
      case 'prediccion':
        return '#1976d2';
      case 'comparacion':
        return '#4caf50';
      case 'horario':
        return '#ff9800';
      default:
        return '#9e9e9e';
    }
  };

  const getTituloTipo = (tipo) => {
    switch (tipo) {
      case 'prediccion':
        return 'Predicción de Inscripción';
      case 'comparacion':
        return 'Comparación de Secciones';
      case 'horario':
        return 'Horario Semanal';
      default:
        return 'Actividad';
    }
  };

  const renderPredicciones = () => (
    <Box>
      {historialData.predicciones.length === 0 ? (
        <Card
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            background: darkMode ? '#1e1e1e' : '#f8f9fa',
            border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
            textAlign: 'center',
            boxShadow: darkMode ? '0 4px 12px rgba(66, 165, 245, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          <School sx={{ fontSize: 48, color: darkMode ? '#42a5f5' : '#e3f2fd', mb: 1.5 }} />
          <Typography sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontSize: 16, fontWeight: 600 }}>
            No hay predicciones en tu historial
          </Typography>
          <Typography sx={{ color: darkMode ? '#90caf9' : '#9e9e9e', mt: 0.5, fontSize: '0.875rem' }}>
            Realiza predicciones en la sección de Simulación para verlas aquí.
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={1.5}>
          {historialData.predicciones.map((pred, index) => (
            <Grid xs={12} md={6} lg={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 2,
                  background: darkMode ? '#1e1e1e' : '#ffffff',
                  border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                  boxShadow: darkMode ? '0 2px 8px rgba(66, 165, 245, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: darkMode ? '0 4px 16px rgba(66, 165, 245, 0.3)' : '0 4px 16px rgba(0, 0, 0, 0.1)',
                    borderColor: darkMode ? '#64b5f6' : '#1976d2',
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        background: darkMode ? 'rgba(66, 165, 245, 0.2)' : 'rgba(25, 118, 210, 0.1)',
                        color: darkMode ? '#42a5f5' : '#1976d2',
                      }}
                    >
                      <School />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 'bold', 
                          color: darkMode ? '#e3f2fd' : '#37474f',
                          fontSize: '0.875rem'
                        }}
                      >
                        {pred.curso} - {pred.seccion}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: darkMode ? '#90caf9' : '#546e7a',
                          fontSize: '0.75rem'
                        }}
                      >
                        {pred.profesor}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => eliminarItem('predicciones', index)}
                      sx={{
                        color: darkMode ? '#ff6b6b' : '#f44336',
                        '&:hover': {
                          background: darkMode ? 'rgba(255, 107, 107, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: darkMode ? '#90caf9' : '#546e7a',
                        fontSize: '0.75rem'
                      }}
                    >
                      Promedio: {pred.nota}
                    </Typography>
                    <Chip
                      label={pred.resultado === 'Sí' ? 'Alta probabilidad' : pred.resultado === 'Pendiente' ? 'Pendiente' : 'Baja probabilidad'}
                      color={pred.resultado === 'Sí' ? 'success' : pred.resultado === 'Pendiente' ? 'default' : 'warning'}
                      size="small"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </Stack>
                  
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: darkMode ? '#90caf9' : '#9e9e9e',
                      fontSize: '0.7rem'
                    }}
                  >
                    {formatearFecha(pred.fecha)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {historialData.predicciones.length > 0 && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => limpiarHistorial('predicciones')}
            sx={{
              color: darkMode ? '#ff6b6b' : '#f44336',
              borderColor: darkMode ? '#ff6b6b' : '#f44336',
              '&:hover': {
                background: darkMode ? 'rgba(255, 107, 107, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                borderColor: darkMode ? '#ff8a80' : '#d32f2f',
              },
            }}
          >
            Limpiar Historial
          </Button>
        </Box>
      )}
    </Box>
  );

  const renderComparaciones = () => (
    <Box>
      {historialData.comparaciones.length === 0 ? (
        <Card
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            background: darkMode ? '#1e1e1e' : '#f8f9fa',
            border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
            textAlign: 'center',
            boxShadow: darkMode ? '0 4px 12px rgba(66, 165, 245, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          <CompareArrows sx={{ fontSize: 48, color: darkMode ? '#42a5f5' : '#e3f2fd', mb: 1.5 }} />
          <Typography sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontSize: 16, fontWeight: 600 }}>
            No hay comparaciones en tu historial
          </Typography>
          <Typography sx={{ color: darkMode ? '#90caf9' : '#9e9e9e', mt: 0.5, fontSize: '0.875rem' }}>
            Realiza comparaciones de secciones para verlas aquí.
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={1.5}>
          {historialData.comparaciones.map((comp, index) => (
            <Grid xs={12} md={6} lg={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 2,
                  background: darkMode ? '#1e1e1e' : '#ffffff',
                  border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                  boxShadow: darkMode ? '0 2px 8px rgba(66, 165, 245, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: darkMode ? '0 4px 16px rgba(66, 165, 245, 0.3)' : '0 4px 16px rgba(0, 0, 0, 0.1)',
                    borderColor: darkMode ? '#64b5f6' : '#4caf50',
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        background: darkMode ? 'rgba(66, 165, 245, 0.2)' : 'rgba(76, 175, 80, 0.1)',
                        color: darkMode ? '#42a5f5' : '#4caf50',
                      }}
                    >
                      <CompareArrows />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 'bold', 
                          color: darkMode ? '#e3f2fd' : '#37474f',
                          fontSize: '0.875rem'
                        }}
                      >
                        {comp.curso}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: darkMode ? '#90caf9' : '#546e7a',
                          fontSize: '0.75rem'
                        }}
                      >
                        {comp.ciclo || 'N/A'}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${comp.secciones || 0} secciones`}
                      color="success"
                      size="small"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </Stack>

                  <Stack spacing={1} mb={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: darkMode ? '#90caf9' : '#546e7a', 
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      >
                        Secciones analizadas:
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: darkMode ? '#42a5f5' : '#4caf50', 
                          fontWeight: 'bold',
                          fontSize: '0.75rem'
                        }}
                      >
                        {comp.secciones || 0}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: darkMode ? '#90caf9' : '#546e7a', 
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      >
                        Mejor probabilidad:
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: darkMode ? '#42a5f5' : '#4caf50', 
                          fontWeight: 'bold',
                          fontSize: '0.75rem'
                        }}
                      >
                        {comp.mejorProbabilidad || 'N/A'}%
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: darkMode ? '#90caf9' : '#9e9e9e',
                      fontSize: '0.7rem'
                    }}
                  >
                    {formatearFecha(comp.fecha)}
                  </Typography>

                  <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => navigate('/comparar', { 
                        state: { 
                          curso: comp.curso, 
                          ciclo: comp.ciclo 
                        } 
                      })}
                      sx={{
                        color: darkMode ? '#42a5f5' : '#4caf50',
                        '&:hover': { 
                          background: darkMode ? 'rgba(66, 165, 245, 0.1)' : 'rgba(76, 175, 80, 0.1)' 
                        },
                      }}
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => eliminarItem('comparaciones', index)}
                      sx={{
                        color: darkMode ? '#ff6b6b' : '#f44336',
                        '&:hover': { 
                          background: darkMode ? 'rgba(255, 107, 107, 0.1)' : 'rgba(244, 67, 54, 0.1)' 
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {historialData.comparaciones.length > 0 && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => limpiarHistorial('comparaciones')}
            sx={{
              color: darkMode ? '#ff6b6b' : '#f44336',
              borderColor: darkMode ? '#ff6b6b' : '#f44336',
              '&:hover': {
                background: darkMode ? 'rgba(255, 107, 107, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                borderColor: darkMode ? '#ff8a80' : '#d32f2f',
              },
            }}
          >
            Limpiar Historial
          </Button>
        </Box>
      )}
    </Box>
  );

  const renderHorarios = () => (
    <Box>
      {historialData.horarios.length === 0 ? (
        <Card
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            background: darkMode ? '#1e1e1e' : '#f8f9fa',
            border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
            textAlign: 'center',
            boxShadow: darkMode ? '0 4px 12px rgba(66, 165, 245, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          <CalendarMonth sx={{ fontSize: 48, color: darkMode ? '#42a5f5' : '#e3f2fd', mb: 1.5 }} />
          <Typography sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontSize: 16, fontWeight: 600 }}>
            No hay horarios en tu historial
          </Typography>
          <Typography sx={{ color: darkMode ? '#90caf9' : '#9e9e9e', mt: 0.5, fontSize: '0.875rem' }}>
            Crea horarios semanales para verlos aquí.
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={1.5}>
          {historialData.horarios.map((horario, index) => (
            <Grid xs={12} md={6} lg={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 2,
                  background: darkMode ? '#1e1e1e' : '#ffffff',
                  border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                  boxShadow: darkMode ? '0 2px 8px rgba(66, 165, 245, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: darkMode ? '0 4px 16px rgba(66, 165, 245, 0.3)' : '0 4px 16px rgba(0, 0, 0, 0.1)',
                    borderColor: darkMode ? '#64b5f6' : '#ff9800',
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        background: darkMode ? 'rgba(66, 165, 245, 0.2)' : 'rgba(255, 152, 0, 0.1)',
                        color: darkMode ? '#42a5f5' : '#ff9800',
                      }}
                    >
                      <CalendarMonth />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 'bold', 
                          color: darkMode ? '#e3f2fd' : '#37474f',
                          fontSize: '0.875rem'
                        }}
                      >
                        Horario Semanal
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: darkMode ? '#90caf9' : '#546e7a',
                          fontSize: '0.75rem'
                        }}
                      >
                        {horario.ciclo || 'N/A'}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${horario.cursos?.length || 0} cursos`}
                      color="warning"
                      size="small"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </Stack>

                  <Stack spacing={1} mb={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: darkMode ? '#90caf9' : '#546e7a', 
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      >
                        Cursos:
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: darkMode ? '#42a5f5' : '#ff9800', 
                          fontWeight: 'bold',
                          fontSize: '0.75rem'
                        }}
                      >
                        {horario.cursos?.length || 0}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: darkMode ? '#90caf9' : '#546e7a', 
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      >
                        Estado:
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: darkMode ? '#42a5f5' : '#ff9800', 
                          fontWeight: 'bold',
                          fontSize: '0.75rem'
                        }}
                      >
                        Guardado
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Lista de cursos */}
                  {horario.cursos && horario.cursos.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: darkMode ? '#90caf9' : '#546e7a', 
                          fontWeight: 600, 
                          mb: 1,
                          fontSize: '0.75rem'
                        }}
                      >
                        Cursos incluidos:
                      </Typography>
                      <Stack spacing={0.5}>
                        {horario.cursos.slice(0, 3).map((curso, idx) => (
                          <Typography 
                            key={idx} 
                            variant="body2" 
                            sx={{ 
                              color: darkMode ? '#42a5f5' : '#ff9800', 
                              fontSize: '0.75rem' 
                            }}
                          >
                            • {curso.codigo} - {curso.nombre}
                          </Typography>
                        ))}
                        {horario.cursos.length > 3 && (
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: darkMode ? '#90caf9' : '#9e9e9e', 
                              fontSize: '0.75rem' 
                            }}
                          >
                            ... y {horario.cursos.length - 3} más
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  )}

                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: darkMode ? '#90caf9' : '#9e9e9e',
                      fontSize: '0.7rem'
                    }}
                  >
                    {formatearFecha(horario.fecha)}
                  </Typography>

                  <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => navigate('/calendario')}
                      sx={{
                        color: darkMode ? '#42a5f5' : '#ff9800',
                        '&:hover': { 
                          background: darkMode ? 'rgba(66, 165, 245, 0.1)' : 'rgba(255, 152, 0, 0.1)' 
                        },
                      }}
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        color: darkMode ? '#4caf50' : '#4caf50',
                        '&:hover': { 
                          background: darkMode ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.1)' 
                        },
                      }}
                    >
                      <Download fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => eliminarItem('horarios', index)}
                      sx={{
                        color: darkMode ? '#ff6b6b' : '#f44336',
                        '&:hover': { 
                          background: darkMode ? 'rgba(255, 107, 107, 0.1)' : 'rgba(244, 67, 54, 0.1)' 
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {historialData.horarios.length > 0 && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => limpiarHistorial('horarios')}
            sx={{
              color: darkMode ? '#ff6b6b' : '#f44336',
              borderColor: darkMode ? '#ff6b6b' : '#f44336',
              '&:hover': {
                background: darkMode ? 'rgba(255, 107, 107, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                borderColor: darkMode ? '#ff8a80' : '#d32f2f',
              },
            }}
          >
            Limpiar Historial
          </Button>
        </Box>
      )}
    </Box>
  );

  const tabs = [
    {
      label: `Predicciones (${historialData.predicciones.length})`,
      icon: <School />,
      content: renderPredicciones(),
      color: '#1976d2'
    },
    {
      label: `Comparaciones (${historialData.comparaciones.length})`,
      icon: <CompareArrows />,
      content: renderComparaciones(),
      color: '#4caf50'
    },
    {
      label: `Horarios (${historialData.horarios.length})`,
      icon: <CalendarMonth />,
      content: renderHorarios(),
      color: '#ff9800'
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        background: darkMode ? '#121212' : '#ffffff',
        transition: 'background 0.7s',
      }}
    >
      {/* Sidebar */}
      <AlumnoSidebar user={null} periodo={null} darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Contenido principal */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          width: `calc(100vw - ${sidebarWidth}px)`,
          display: 'flex',
          flexDirection: 'column',
          background: darkMode ? '#121212' : '#ffffff',
          p: { xs: 2, sm: 3 },
          position: 'relative',
        }}
      >
        {/* Header */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold', 
                color: darkMode ? '#42a5f5' : '#1976d2', 
                mb: 1,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
              }}
            >
              Historial de Actividades
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: darkMode ? '#90caf9' : '#546e7a', 
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Revisa todas tus predicciones, comparaciones y horarios guardados
            </Typography>
          </Box>
        </Fade>

        {/* Tabs */}
        <Fade in timeout={1200}>
          <Paper
            elevation={0}
            sx={{
              mb: 3,
              borderRadius: 3,
              background: darkMode ? '#1e1e1e' : '#ffffff',
              border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
              boxShadow: darkMode ? '0 4px 16px rgba(66, 165, 245, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                '& .MuiTab-root': {
                  color: darkMode ? '#90caf9' : '#546e7a',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  minHeight: 56,
                  '&.Mui-selected': {
                    color: darkMode ? '#42a5f5' : '#1976d2',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: darkMode ? '#42a5f5' : '#1976d2',
                  height: 3,
                },
              }}
            >
              <Tab 
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <School />
                    <span>Predicciones ({historialData.predicciones.length})</span>
                  </Stack>
                } 
              />
              <Tab 
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CompareArrows />
                    <span>Comparaciones ({historialData.comparaciones.length})</span>
                  </Stack>
                } 
              />
              <Tab 
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CalendarMonth />
                    <span>Horarios ({historialData.horarios.length})</span>
                  </Stack>
                } 
              />
            </Tabs>
          </Paper>
        </Fade>

        {/* Contenido de las tabs */}
        <Fade in timeout={300}>
          <Box>
            {tabs[activeTab]?.content}
          </Box>
        </Fade>

        {/* Botones de acción */}
        {historialData[tabs[activeTab]?.label?.toLowerCase().split(' ')[0] || 'predicciones'].length > 0 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => limpiarHistorial(tabs[activeTab]?.label?.toLowerCase().split(' ')[0] || 'predicciones')}
              sx={{
                fontWeight: 'bold',
                color: '#f44336',
                borderColor: '#f44336',
                borderRadius: 2,
                px: 3,
                py: 1.5,
                fontSize: '0.875rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#ffebee',
                  borderColor: '#d32f2f',
                  transform: 'scale(1.02)',
                },
              }}
            >
              Limpiar Historial
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HistorialAlumno; 