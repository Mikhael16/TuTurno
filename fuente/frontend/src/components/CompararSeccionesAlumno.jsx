import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Fade,
  Card,
  Chip,
  CircularProgress,
  Modal,
  Backdrop
} from '@mui/material';
import {
  Search,
  RestartAlt,
} from '@mui/icons-material';
import AlumnoSidebar from './AlumnoSidebar';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const sidebarWidth = 240;

// Dummy data para test
const dummySecciones = [
  { seccion: '01', profesor: 'Prof. García', tipo: 'T', porcentaje: '-' },
  { seccion: '02', profesor: 'Prof. Pérez', tipo: 'T', porcentaje: '-' },
  { seccion: '03', profesor: 'Prof. López', tipo: 'T', porcentaje: '-' },
];

const CompararSeccionesAlumno = ({ darkMode, setDarkMode, curso: propCurso, ciclo: propCiclo }) => {
  const location = useLocation();
  const initialCurso = location.state?.curso || propCurso || '';
  const initialCiclo = location.state?.ciclo || propCiclo || '';
  const [curso, setCurso] = useState(initialCurso);
  const [ciclo, setCiclo] = useState(initialCiclo);
  const [nota, setNota] = useState('');
  const [showResultados, setShowResultados] = useState(!!(initialCurso && initialCiclo));
  const [secciones, setSecciones] = useState([]);
  const [cursosSugeridos, setCursosSugeridos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingPrediccion, setLoadingPrediccion] = useState(false);
  const [showPrediccionLoading, setShowPrediccionLoading] = useState(false);

  useEffect(() => {
    if (initialCurso && initialCiclo) {
      handleComparar();
    }
    // eslint-disable-next-line
  }, []);

  // Autocompletar cursos (igual que SimulacionAlumno)
  const handleCodigoCursoChange = async (e) => {
    const value = e.target.value.toUpperCase();
    setCurso(value);
    setError('');
    if (value.length >= 2) {
      try {
        const res = await axios.get('http://localhost:8000/api/sugerir-cursos', {
          params: { prefijo: value }
        });
        setCursosSugeridos(res.data);
      } catch (err) {
        setCursosSugeridos([]);
      }
    } else {
      setCursosSugeridos([]);
    }
  };

  // Función para predecir probabilidad para un profesor específico
  const predecirProbabilidad = async (codigo_curso, nombre_profesor, promedio) => {
    try {
      const response = await axios.get('/api/prediccion-probabilidad-alumno', {
        params: {
          codigo_curso: codigo_curso,
          nombre_profesor: nombre_profesor,
          promedio: promedio
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error al predecir para ${nombre_profesor}:`, error);
      return null;
    }
  };

  // Buscar secciones y profesores con predicciones
  const handleComparar = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        codigo_curso: curso,
        ciclo: ciclo
      };
      
      const res = await axios.get('http://localhost:8000/api/comparar-secciones', {
        params: params
      });
      
      if (res.data && res.data.length > 0) {
        let seccionesConPrediccion = res.data;
        
        // Si hay nota ingresada, hacer predicciones para cada profesor
        if (nota && nota.trim() !== '') {
          setShowPrediccionLoading(true);
          setLoadingPrediccion(true);
          
          // Hacer predicciones para cada sección
          const predicciones = await Promise.all(
            seccionesConPrediccion.map(async (seccion) => {
              const prediccion = await predecirProbabilidad(
                seccion.codigo_curso,
                seccion.nombre_profesor,
                parseFloat(nota)
              );
              
              if (prediccion) {
                return {
                  ...seccion,
                  porcentaje: prediccion.probabilidad,
                  nivel_probabilidad: prediccion.nivel,
                  color_probabilidad: prediccion.color,
                  prediccion_realizada: true
                };
              } else {
                return {
                  ...seccion,
                  porcentaje: '-',
                  nivel_probabilidad: 'N/A',
                  color_probabilidad: 'default',
                  prediccion_realizada: false
                };
              }
            })
          );
          
          seccionesConPrediccion = predicciones;
          setLoadingPrediccion(false);
          setShowPrediccionLoading(false);
        }
        
        setSecciones(seccionesConPrediccion);
        setShowResultados(true);
        
        // Guardar comparación en el historial
        const probabilidades = seccionesConPrediccion
          .filter(s => s.porcentaje !== '-')
          .map(s => s.porcentaje);
        const mejorProbabilidad = probabilidades.length > 0 ? Math.max(...probabilidades) : 0;
        
        const comparacion = {
          curso: curso,
          ciclo: ciclo,
          nota: nota || null,
          secciones: seccionesConPrediccion.length,
          mejorProbabilidad: mejorProbabilidad,
          prediccionesRealizadas: nota && nota.trim() !== '',
          fecha: new Date().toISOString()
        };
        
        const comparacionesGuardadas = JSON.parse(localStorage.getItem('comparaciones_guardadas') || '[]');
        // Evitar duplicados
        const existe = comparacionesGuardadas.some(c => c.curso === curso && c.ciclo === ciclo);
        if (!existe) {
          comparacionesGuardadas.push(comparacion);
          localStorage.setItem('comparaciones_guardadas', JSON.stringify(comparacionesGuardadas));
        }
      } else {
        setSecciones([]);
        setShowResultados(true);
        setError('No se encontraron secciones para ese curso y ciclo.');
      }
    } catch (err) {
      setError('Error al buscar secciones.');
      setSecciones([]);
      setShowResultados(true);
      setLoadingPrediccion(false);
      setShowPrediccionLoading(false);
    }
    setLoading(false);
  };

  // Datos para la gráfica
  const chartData = {
    labels: secciones.map(s => `Sec ${s.seccion}`),
    datasets: [
      {
        label: 'Probabilidad de éxito',
        data: secciones.map(s => s.porcentaje === '-' ? 0 : s.porcentaje),
        backgroundColor: secciones.map(s => {
          if (s.porcentaje === '-') return '#cccccc';
          if (s.color_probabilidad === 'success') return '#4caf50';
          if (s.color_probabilidad === 'warning') return '#ff9800';
          if (s.color_probabilidad === 'info') return '#2196f3';
          return '#f44336';
        }),
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#546e7a',
          font: { size: 14, weight: 'bold' },
        },
        grid: { color: '#e3f2fd' },
      },
      x: {
        ticks: {
          color: '#546e7a',
          font: { size: 14, weight: 'bold' },
        },
        grid: { color: '#e3f2fd' },
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw', background: darkMode ? '#121212' : '#f8f9fa', transition: 'background 0.7s' }}>
      <AlumnoSidebar user={null} periodo={"2024-2"} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Box
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          width: `calc(100vw - ${sidebarWidth}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: darkMode ? '#121212' : '#f8f9fa',
          p: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 1200, mt: 4 }}>
          <Stack direction="row" spacing={4} alignItems="center" mb={4}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 'bold', 
                color: darkMode ? '#42a5f5' : '#1976d2', 
                flex: 1,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              Comparación de Secciones
            </Typography>
          </Stack>

          {!showResultados && (
            <Fade in timeout={800}>
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: darkMode ? '#1e1e1e' : '#ffffff',
                  border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                  boxShadow: darkMode ? '0 8px 32px rgba(66, 165, 245, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                  mb: 4,
                }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 3, 
                    color: darkMode ? '#42a5f5' : '#1976d2', 
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  Ingresa los datos para comparar secciones
                </Typography>

                <Stack spacing={3}>
                  <TextField
                    label="Código del Curso"
                    variant="outlined"
                    value={curso}
                    onChange={handleCodigoCursoChange}
                    placeholder="Ej: MAT101"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        background: darkMode ? '#1e1e1e' : '#f8f9fa',
                        border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: darkMode ? '#64b5f6' : '#42a5f5',
                          boxShadow: darkMode ? '0 0 0 4px rgba(66, 165, 245, 0.2)' : '0 0 0 4px rgba(66, 165, 245, 0.1)',
                        },
                        '&.Mui-focused': {
                          borderColor: darkMode ? '#42a5f5' : '#1976d2',
                          boxShadow: darkMode ? '0 0 0 4px rgba(66, 165, 245, 0.2)' : '0 0 0 4px rgba(25, 118, 210, 0.1)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: darkMode ? '#90caf9' : '#546e7a',
                        fontWeight: 600,
                      },
                      '& .MuiInputBase-input': {
                        color: darkMode ? '#e3f2fd' : '#37474f',
                      },
                    }}
                  />

                  <TextField
                    label="Promedio Ponderado (Opcional)"
                    variant="outlined"
                    value={nota}
                    onChange={e => setNota(e.target.value.replace(/[^0-9.]/g, ''))}
                    placeholder="Ej: 12.5"
                    helperText="Ingresa tu promedio para calcular probabilidades de inscripción"
                    inputProps={{ maxLength: 5 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        background: darkMode ? '#1e1e1e' : '#f8f9fa',
                        border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: darkMode ? '#64b5f6' : '#42a5f5',
                          boxShadow: darkMode ? '0 0 0 4px rgba(66, 165, 245, 0.2)' : '0 0 0 4px rgba(66, 165, 245, 0.1)',
                        },
                        '&.Mui-focused': {
                          borderColor: darkMode ? '#42a5f5' : '#1976d2',
                          boxShadow: darkMode ? '0 0 0 4px rgba(66, 165, 245, 0.2)' : '0 0 0 4px rgba(25, 118, 210, 0.1)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: darkMode ? '#90caf9' : '#546e7a',
                        fontWeight: 600,
                      },
                      '& .MuiInputBase-input': {
                        color: darkMode ? '#e3f2fd' : '#37474f',
                      },
                      '& .MuiFormHelperText-root': {
                        color: darkMode ? '#90caf9' : '#546e7a',
                        fontSize: '0.75rem',
                      },
                    }}
                  />

                  <TextField
                    label="Ciclo"
                    variant="outlined"
                    value={ciclo}
                    onChange={(e) => setCiclo(e.target.value)}
                    placeholder="Ej: 2024-2"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        background: darkMode ? '#1e1e1e' : '#f8f9fa',
                        border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: darkMode ? '#64b5f6' : '#42a5f5',
                          boxShadow: darkMode ? '0 0 0 4px rgba(66, 165, 245, 0.2)' : '0 0 0 4px rgba(66, 165, 245, 0.1)',
                        },
                        '&.Mui-focused': {
                          borderColor: darkMode ? '#42a5f5' : '#1976d2',
                          boxShadow: darkMode ? '0 0 0 4px rgba(66, 165, 245, 0.2)' : '0 0 0 4px rgba(25, 118, 210, 0.1)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: darkMode ? '#90caf9' : '#546e7a',
                        fontWeight: 600,
                      },
                      '& .MuiInputBase-input': {
                        color: darkMode ? '#e3f2fd' : '#37474f',
                      },
                    }}
                  />

                  <Button
                    variant="contained"
                    onClick={handleComparar}
                    disabled={!curso || !ciclo || loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
                    sx={{
                      fontSize: 16,
                      borderRadius: 3,
                      background: darkMode ? '#42a5f5' : '#1976d2',
                      color: '#ffffff',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: darkMode ? '#388e3c' : '#1565c0',
                        transform: 'scale(1.02)',
                        boxShadow: darkMode ? '0 8px 24px rgba(76, 175, 80, 0.3)' : '0 8px 24px rgba(25, 118, 210, 0.3)',
                      },
                    }}
                  >
                    {loading ? 'Buscando...' : nota && nota.trim() !== '' ? 'Comparar con Predicciones' : 'Comparar Secciones'}
                  </Button>
                </Stack>
              </Card>
            </Fade>
          )}

          {showResultados && (
            <>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: darkMode ? '#90caf9' : '#546e7a', 
                  mb: 3, 
                  fontWeight: 600,
                  textAlign: 'center'
                }}
              >
                Resultados de comparación
              </Typography>
              
              {error && (
                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 3,
                    background: darkMode ? '#ffebee' : '#ffebee',
                    border: darkMode ? '2px solid #f44336' : '2px solid #f44336',
                    textAlign: 'center',
                  }}
                >
                  <Typography color="error" sx={{ fontWeight: 600 }}>
                    {error}
                  </Typography>
                </Card>
              )}

              <Card
                elevation={0}
                sx={{
                  mb: 4,
                  borderRadius: 4,
                  background: darkMode ? '#1e1e1e' : '#ffffff',
                  border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                  boxShadow: darkMode ? '0 8px 32px rgba(66, 165, 245, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                }}
              >
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: darkMode ? '#42a5f5' : '#e3f2fd' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Código</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Sección</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Profesor</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Aula</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Día</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Hora inicio</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Hora fin</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Probabilidad (%)</TableCell>
                        {nota && nota.trim() !== '' && (
                          <>
                            <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Método</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Estado</TableCell>
                          </>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {secciones.map((s, idx) => (
                        <TableRow 
                          key={idx}
                          sx={{
                            '&:nth-of-type(odd)': { background: darkMode ? '#2d2d2d' : '#f8f9fa' },
                            '&:hover': { background: darkMode ? '#42a5f5' : '#e3f2fd' },
                            transition: 'background 0.3s ease',
                          }}
                        >
                          <TableCell sx={{ fontWeight: 600, color: darkMode ? '#42a5f5' : '#1976d2' }}>{s.codigo_curso}</TableCell>
                          <TableCell sx={{ fontWeight: 600, color: darkMode ? '#e3f2fd' : '#546e7a' }}>{s.nombre_curso}</TableCell>
                          <TableCell>
                            <Chip 
                              label={s.seccion} 
                              size="small" 
                              sx={{ 
                                background: darkMode ? 'rgba(66, 165, 245, 0.2)' : '#e3f2fd', 
                                color: darkMode ? '#42a5f5' : '#1976d2', 
                                fontWeight: 'bold' 
                              }} 
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, color: darkMode ? '#e3f2fd' : '#546e7a' }}>{s.nombre_profesor}</TableCell>
                          <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#546e7a' }}>{s.aula}</TableCell>
                          <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#546e7a' }}>{s.dia}</TableCell>
                          <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#546e7a' }}>{s.hora_inicio}</TableCell>
                          <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#546e7a' }}>{s.hora_fin}</TableCell>
                          <TableCell>
                            <Chip 
                              label={s.porcentaje === '-' ? 'N/A' : `${s.porcentaje}%`} 
                              size="small" 
                              color={s.porcentaje === '-' ? 'default' : 
                                     s.color_probabilidad === 'success' ? 'success' : 
                                     s.color_probabilidad === 'warning' ? 'warning' : 
                                     s.color_probabilidad === 'info' ? 'info' : 'error'}
                              sx={{ fontWeight: 'bold' }} 
                            />
                            {s.nivel_probabilidad && s.nivel_probabilidad !== 'N/A' && (
                              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                                {s.nivel_probabilidad}
                              </Typography>
                            )}
                          </TableCell>
                          {nota && nota.trim() !== '' && (
                            <>
                              <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#546e7a' }}>
                                {s.prediccion_realizada ? 'Modelo IA' : 'N/A'}
                              </TableCell>
                              <TableCell>
                                {s.prediccion_realizada && (
                                  <Chip
                                    label="Predicción Realizada"
                                    size="small"
                                    color="primary"
                                    sx={{ fontSize: '0.7rem' }}
                                  />
                                )}
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>

              {secciones.length > 0 && (
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: darkMode ? '#1e1e1e' : '#ffffff',
                    border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                    boxShadow: darkMode ? '0 8px 32px rgba(66, 165, 245, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                    mb: 4,
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3, 
                      color: darkMode ? '#42a5f5' : '#1976d2', 
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                  >
                    Gráfica de Probabilidades
                    {nota && nota.trim() !== '' && (
                      <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a', mt: 1, fontWeight: 'normal' }}>
                        Basada en tu promedio de {nota} usando modelo predictivo
                      </Typography>
                    )}
                  </Typography>
                  <Box sx={{ height: 400 }}>
                    <Bar 
                      data={chartData} 
                      options={{
                        ...chartOptions,
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                              color: darkMode ? '#90caf9' : '#546e7a',
                              font: { size: 14, weight: 'bold' },
                            },
                            grid: { color: darkMode ? '#42a5f5' : '#e3f2fd' },
                          },
                          x: {
                            ticks: {
                              color: darkMode ? '#90caf9' : '#546e7a',
                              font: { size: 14, weight: 'bold' },
                            },
                            grid: { color: darkMode ? '#42a5f5' : '#e3f2fd' },
                          },
                        },
                        plugins: {
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                const seccion = secciones[context.dataIndex];
                                let label = `Probabilidad: ${context.parsed.y}%`;
                                if (nota && nota.trim() !== '' && seccion) {
                                  label += ` | Nivel: ${seccion.nivel_probabilidad || 'N/A'}`;
                                  label += ` | Modelo: IA`;
                                }
                                return label;
                              }
                            }
                          }
                        }
                      }}
                    />
                  </Box>
                </Card>
              )}

              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowResultados(false);
                    setSecciones([]);
                    setError('');
                  }}
                  startIcon={<RestartAlt />}
                  sx={{
                    color: darkMode ? '#42a5f5' : '#1976d2',
                    borderColor: darkMode ? '#42a5f5' : '#1976d2',
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    background: darkMode ? '#1e1e1e' : '#ffffff',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: darkMode ? '#388e3c' : '#e3f2fd',
                      borderColor: darkMode ? '#64b5f6' : '#1976d2',
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  Nueva Comparación
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* Modal de carga de predicción */}
      <Modal
        open={showPrediccionLoading}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showPrediccionLoading}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 400 },
              bgcolor: darkMode ? '#1e1e1e' : '#ffffff',
              borderRadius: 4,
              boxShadow: darkMode ? '0 24px 48px rgba(66, 165, 245, 0.3)' : '0 24px 48px rgba(0, 0, 0, 0.2)',
              p: 4,
              textAlign: 'center',
              border: darkMode ? '2px solid #42a5f5' : 'none',
            }}
          >
            <CircularProgress size={80} sx={{ color: darkMode ? '#42a5f5' : '#1976d2', mb: 3 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2', mb: 2 }}>
              Prediciendo...
            </Typography>
            <Typography variant="body1" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
              Calculando probabilidades de éxito para cada profesor
            </Typography>
            {loadingPrediccion && (
              <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a', mt: 1, fontStyle: 'italic' }}>
                Usando modelo de inteligencia artificial
              </Typography>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default CompararSeccionesAlumno; 