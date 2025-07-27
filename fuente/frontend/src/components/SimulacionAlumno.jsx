import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Fade,
  Avatar,
  Modal,
  Backdrop,
  Grow,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  IconButton
} from '@mui/material';
import AlumnoSidebar from './AlumnoSidebar';
import axios from 'axios';
import LogoTuTurno from '../assets/img/LogoTuTurno.jpg';
import Termometro from '../assets/img/pngwing.com (1).png';
import {
  Brightness4,
  Brightness7,
  StarBorder,
  Star,
} from '@mui/icons-material';

const sidebarWidth = 200;

const SimulacionAlumno = ({ user, periodo, darkMode, setDarkMode }) => {
  const [nota, setNota] = useState('');
  const [codigoCurso, setCodigoCurso] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [profesores, setProfesores] = useState([]);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cursosSugeridos, setCursosSugeridos] = useState([]);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [todasPredicciones, setTodasPredicciones] = useState([]);
  
  // Estados para la confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPredictionLoading, setShowPredictionLoading] = useState(false);
  const [showPredictionComplete, setShowPredictionComplete] = useState(false);

  // Cargar todas las predicciones al inicio
  useEffect(() => {
    const predicciones = JSON.parse(localStorage.getItem('todas_predicciones') || '[]');
    setTodasPredicciones(predicciones);
  }, []);

  // Autocompletar cursos (ahora consultando al backend)
  const handleCodigoCursoChange = async (e) => {
    const value = e.target.value.toUpperCase();
    setCodigoCurso(value);
    setProfesorSeleccionado('');
    setProfesores([]);
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

  const handleBuscar = async () => {
    setLoading(true);
    setError('');
    setProfesores([]);
    setProfesorSeleccionado('');
    try {
      // Llamada al backend para obtener profesor-sección
      const res = await axios.get('http://localhost:8000/api/profesores-seccion', {
        params: {
          codigo_curso: codigoCurso,
          ciclo: ciclo
        }
      });
      if (res.data && res.data.length > 0) {
        setProfesores(res.data);
      } else {
        setError('No se encontraron profesores para ese curso y ciclo.');
      }
    } catch (err) {
      setError('Error al buscar profesores.');
    }
    setLoading(false);
  };

  // Función para guardar favorito en localStorage
  const handleAddFavorite = () => {
    if (!resultData) return;
    const favs = JSON.parse(localStorage.getItem('favoritos_prediccion') || '[]');
    // Evitar duplicados por curso, sección y profesor
    const exists = favs.some(f => f.curso === resultData.curso && f.seccion === resultData.seccion && f.profesor === resultData.profesor && f.ciclo === ciclo);
    if (!exists) {
      favs.push({ 
        ...resultData, 
        ciclo, 
        nota,
        fecha: new Date().toISOString()
      });
      localStorage.setItem('favoritos_prediccion', JSON.stringify(favs));
      setIsFavorite(true);
    }
  };

  const handlePredecir = async () => {
    if (!profesorSeleccionado) {
      setError('Por favor seleccione un profesor.');
      return;
    }

    // Mostrar confirmación primero
    setShowConfirmation(true);
  };

  const handleConfirmarPrediccion = async () => {
    setShowConfirmation(false);
    setShowPredictionLoading(true);
    
    try {
      // Extraer el nombre del profesor del objeto o string
      const nombreProfesor = typeof profesorSeleccionado === 'string' 
        ? profesorSeleccionado.split(' - ')[0] 
        : profesorSeleccionado.nombre_profesor;
      
      const seccion = typeof profesorSeleccionado === 'string' 
        ? profesorSeleccionado.split(' - ')[1] 
        : profesorSeleccionado.seccion;

      // Llamar al nuevo endpoint de predicción de probabilidad de alumno
      const response = await axios.get('/api/prediccion-probabilidad-alumno', {
        params: {
          codigo_curso: codigoCurso,
          nombre_profesor: nombreProfesor,
          promedio: parseFloat(nota)
        }
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      const resultado = response.data;

      setResultData(resultado);
      setShowResult(true);
      setShowPredictionLoading(false);
      setShowPredictionComplete(true);

      // Guardar predicción en todas las predicciones
      const nuevaPrediccion = {
        ...resultado,
        ciclo,
        nota: parseFloat(nota),
        seccion: seccion,
        fecha: new Date().toISOString()
      };

      const prediccionesActualizadas = [nuevaPrediccion, ...todasPredicciones];
      setTodasPredicciones(prediccionesActualizadas);
      localStorage.setItem('todas_predicciones', JSON.stringify(prediccionesActualizadas));

    } catch (error) {
      console.error('Error en predicción:', error);
      setError('Error al realizar la predicción. Por favor, inténtalo de nuevo.');
      setShowPredictionLoading(false);
    }
  };

  const handleCancelarPrediccion = () => {
    setShowConfirmation(false);
  };

  const handleCerrarPrediccionCompleta = () => {
    setShowPredictionComplete(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        background: darkMode ? '#f8f9fa' : '#ffffff',
        transition: 'background 0.7s',
      }}
    >
      {/* Sidebar y contenido principal */}
      <AlumnoSidebar user={user} periodo={periodo} darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Contenido principal centrado */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          width: `calc(100vw - ${sidebarWidth}px)`,
          display: 'flex',
          background: darkMode ? '#121212' : '#ffffff',
          p: { xs: 1, sm: 2 },
          position: 'relative',
        }}
      >
        {/* Columna izquierda - Formulario */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pr: { md: 2 },
          }}
        >
          {/* Contenido principal centrado */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 600,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '80vh',
            }}
          >
            {/* Título principal */}
            <Fade in timeout={800}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: darkMode ? '#42a5f5' : '#1976d2', 
                  mb: 4, 
                  textAlign: 'center',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                }}
              >
                Simulación de Inscripción
              </Typography>
            </Fade>

            {/* Formulario principal */}
            <Fade in timeout={1200}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  width: '100%',
                  maxWidth: 600,
                  background: darkMode ? '#1e1e1e' : '#ffffff',
                  border: darkMode ? `2px solid #42a5f5` : `2px solid #e3f2fd`,
                  boxShadow: darkMode ? '0 8px 32px rgba(66, 165, 245, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                }}
              >
                {/* Campos del formulario */}
                <Stack spacing={2.5}>
                  {/* Campo Nota */}
                  <TextField
                    label="Promedio ponderado"
                    variant="outlined"
                    value={nota}
                    onChange={e => setNota(e.target.value.replace(/[^0-9.]/g, ''))}
                    inputProps={{ maxLength: 5 }}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        background: darkMode ? '#2d2d2d' : '#f8f9fa',
                        border: darkMode ? `2px solid #42a5f5` : `2px solid #e3f2fd`,
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

                  {/* Campo Código de Curso */}
                  <TextField
                    label="Código del curso"
                    variant="outlined"
                    value={codigoCurso}
                    onChange={handleCodigoCursoChange}
                    fullWidth
                    autoComplete="off"
                    placeholder="Ej: MAT101"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        background: darkMode ? '#2d2d2d' : '#f8f9fa',
                        border: darkMode ? `2px solid #42a5f5` : `2px solid #e3f2fd`,
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

                  {/* Sugerencias de cursos */}
                  {cursosSugeridos.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {cursosSugeridos.map(c => (
                        <Button
                          key={c}
                          variant="outlined"
                          size="small"
                          sx={{
                            borderRadius: 3,
                            color: darkMode ? '#1976d2' : '#1976d2',
                            borderColor: darkMode ? '#e3f2fd' : '#e3f2fd',
                            background: darkMode ? '#f8f9fa' : '#f8f9fa',
                            fontWeight: 600,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: darkMode ? '#e3f2fd' : '#e3f2fd',
                              borderColor: darkMode ? '#1976d2' : '#1976d2',
                              color: darkMode ? '#1976d2' : '#1976d2',
                              transform: 'scale(1.05)',
                              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                            },
                          }}
                          onClick={() => {
                            setCodigoCurso(c);
                            setCursosSugeridos([]);
                          }}
                        >
                          {c}
                        </Button>
                      ))}
                    </Box>
                  )}

                  {/* Campo Ciclo */}
                  <TextField
                    label="Ciclo"
                    variant="outlined"
                    value={ciclo}
                    onChange={e => setCiclo(e.target.value)}
                    fullWidth
                    placeholder="Ej: 2024-1"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        background: darkMode ? '#2d2d2d' : '#f8f9fa',
                        border: darkMode ? `2px solid #42a5f5` : `2px solid #e3f2fd`,
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

                  {/* Botón Buscar */}
                  <Button
                    variant="contained"
                    onClick={handleBuscar}
                    disabled={loading || !codigoCurso || !ciclo}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      borderRadius: 3,
                      py: 1.5,
                      background: darkMode ? '#42a5f5' : '#1976d2',
                      color: '#ffffff',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: darkMode ? '#64b5f6' : '#1565c0',
                        transform: 'scale(1.02)',
                        boxShadow: darkMode ? '0 8px 24px rgba(66, 165, 245, 0.4)' : '0 8px 24px rgba(25, 118, 210, 0.3)',
                      },
                      '&:disabled': {
                        background: darkMode ? '#424242' : '#bdbdbd',
                        color: darkMode ? '#757575' : '#757575',
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: '#ffffff' }} />
                    ) : (
                      'Buscar Profesor'
                    )}
                  </Button>

                  {/* Mensaje de error */}
                  {error && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#f44336', 
                        textAlign: 'center',
                        fontWeight: 600,
                        p: 1,
                        borderRadius: 2,
                        background: '#ffebee',
                        border: '1px solid #ffcdd2'
                      }}
                    >
                      {error}
                    </Typography>
                  )}

                  {/* Selector de Profesor */}
                  {profesores.length > 0 && (
                    <FormControl fullWidth>
                      <InputLabel sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 600 }}>
                        Selecciona un profesor
                      </InputLabel>
                      <Select
                        value={profesorSeleccionado}
                        onChange={(e) => setProfesorSeleccionado(e.target.value)}
                        sx={{
                          borderRadius: 3,
                          background: darkMode ? '#2d2d2d' : '#f8f9fa',
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
                          '& .MuiSelect-icon': {
                            color: darkMode ? '#90caf9' : '#546e7a',
                          },
                          '& .MuiSelect-select': {
                            color: darkMode ? '#e3f2fd' : '#37474f',
                          },
                        }}
                      >
                        {profesores.map((profesor, index) => (
                          <MenuItem key={index} value={profesor}>
                            {typeof profesor === 'string' ? profesor : `${profesor.nombre_profesor} - ${profesor.seccion}`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {/* Botón Predecir */}
                  {profesorSeleccionado && (
                    <Button
                      variant="contained"
                      onClick={handlePredecir}
                      disabled={loadingPrediction}
                      sx={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        borderRadius: 3,
                        py: 1.5,
                        background: darkMode ? '#4caf50' : '#4caf50',
                        color: '#ffffff',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: darkMode ? '#66bb6a' : '#388e3c',
                          transform: 'scale(1.02)',
                          boxShadow: darkMode ? '0 8px 24px rgba(76, 175, 80, 0.4)' : '0 8px 24px rgba(76, 175, 80, 0.3)',
                        },
                      }}
                    >
                      {loadingPrediction ? (
                        <CircularProgress size={24} sx={{ color: '#ffffff' }} />
                      ) : (
                        'Realizar Predicción'
                      )}
                    </Button>
                  )}
                </Stack>
              </Paper>
            </Fade>

            {/* Tabla de resultados */}
            {todasPredicciones.length > 0 && (
              <Fade in timeout={1500}>
                <Paper
                  elevation={0}
                  sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: 3,
                    width: '100%',
                    maxWidth: 800,
                    background: darkMode ? '#1e1e1e' : '#ffffff',
                    border: darkMode ? `2px solid #42a5f5` : `2px solid #e3f2fd`,
                    boxShadow: darkMode ? '0 4px 16px rgba(66, 165, 245, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: darkMode ? '#42a5f5' : '#1976d2', 
                      mb: 2,
                      fontSize: '1.1rem'
                    }}
                  >
                    Historial de Predicciones
                  </Typography>
                  
                  <Box sx={{ overflowX: 'auto' }}>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: darkMode ? '#90caf9' : '#37474f' }}>Curso</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: darkMode ? '#90caf9' : '#37474f' }}>Sección</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: darkMode ? '#90caf9' : '#37474f' }}>Profesor</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: darkMode ? '#90caf9' : '#37474f' }}>Promedio</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: darkMode ? '#90caf9' : '#37474f' }}>Resultado</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: darkMode ? '#90caf9' : '#37474f' }}>Probabilidad</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: darkMode ? '#90caf9' : '#37474f' }}>Fecha</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: darkMode ? '#90caf9' : '#37474f' }}>Acciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {todasPredicciones.slice(0, 10).map((pred, index) => (
                            <TableRow 
                              key={index}
                              sx={{ 
                                '&:hover': { 
                                  background: darkMode ? '#2d2d2d' : '#f8f9fa' 
                                } 
                              }}
                            >
                              <TableCell sx={{ fontSize: '0.8rem', color: darkMode ? '#e3f2fd' : '#37474f' }}>{pred.curso}</TableCell>
                              <TableCell sx={{ fontSize: '0.8rem', color: darkMode ? '#e3f2fd' : '#37474f' }}>{pred.seccion}</TableCell>
                              <TableCell sx={{ fontSize: '0.8rem', color: darkMode ? '#e3f2fd' : '#37474f' }}>{pred.profesor}</TableCell>
                              <TableCell sx={{ fontSize: '0.8rem', color: darkMode ? '#e3f2fd' : '#37474f' }}>{pred.nota}</TableCell>
                              <TableCell>
                                <Chip
                                  label={pred.resultado === 'Alta probabilidad' ? 'Alta probabilidad' : 
                                         pred.resultado === 'Probabilidad media' ? 'Probabilidad media' : 
                                         pred.resultado === 'Baja probabilidad' ? 'Baja probabilidad' : 
                                         pred.resultado || 'Pendiente'}
                                  color={pred.color === 'success' ? 'success' : 
                                         pred.color === 'warning' ? 'warning' : 
                                         pred.color === 'error' ? 'error' : 'default'}
                                  size="small"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', color: darkMode ? '#90caf9' : '#666' }}>
                                {pred.probabilidad ? `${pred.probabilidad}%` : '-'}
                              </TableCell>
                              <TableCell sx={{ fontSize: '0.75rem', color: darkMode ? '#90caf9' : '#666' }}>
                                {new Date(pred.fecha).toLocaleDateString('es-ES', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    const favoritos = JSON.parse(localStorage.getItem('favoritos_prediccion') || '[]');
                                    const existe = favoritos.some(f => 
                                      f.curso === pred.curso && 
                                      f.seccion === pred.seccion && 
                                      f.profesor === pred.profesor && 
                                      f.ciclo === pred.ciclo
                                    );
                                    
                                    if (!existe) {
                                      favoritos.push(pred);
                                      localStorage.setItem('favoritos_prediccion', JSON.stringify(favoritos));
                                    }
                                  }}
                                  sx={{ color: darkMode ? '#42a5f5' : '#1976d2' }}
                                >
                                  <StarBorder sx={{ fontSize: '1rem' }} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  
                  {todasPredicciones.length > 10 && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: darkMode ? '#90caf9' : '#666', 
                        mt: 1, 
                        textAlign: 'center',
                        fontSize: '0.75rem'
                      }}
                    >
                      Mostrando las 10 predicciones más recientes. 
                      Ve al historial para ver todas.
                    </Typography>
                  )}
                </Paper>
              </Fade>
            )}
          </Box>
        </Box>

        {/* Columna derecha - Termómetro de probabilidad */}
        <Box
          sx={{
            width: { xs: 0, md: 300 },
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pl: 2,
            position: 'relative',
          }}
        >
          <Fade in timeout={2000}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                background: darkMode ? '#1e1e1e' : '#ffffff',
                border: darkMode ? `2px solid #42a5f5` : `2px solid #e3f2fd`,
                boxShadow: darkMode ? '0 8px 32px rgba(66, 165, 245, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                textAlign: 'center',
                position: 'sticky',
                top: 20,
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: darkMode ? '#42a5f5' : '#1976d2', 
                  mb: 3,
                  fontSize: '1.2rem'
                }}
              >
                Guía de Probabilidad
              </Typography>
              
              {/* Termómetro */}
              <Box sx={{ mb: 3, position: 'relative' }}>
                <img 
                  src={Termometro} 
                  alt="Termómetro de probabilidad" 
                  style={{ 
                    width: '120px', 
                    height: 'auto',
                    filter: darkMode ? 'brightness(0.9) contrast(1.1)' : 'none'
                  }} 
                />
              </Box>
              
              {/* Rangos de probabilidad */}
              <Stack spacing={2} sx={{ textAlign: 'left' }}>
                {/* Rango Verde - Alta probabilidad */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box 
                    sx={{ 
                      width: 20, 
                      height: 20, 
                      borderRadius: '50%', 
                      background: '#4caf50',
                      border: '2px solid #2e7d32'
                    }} 
                  />
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: '#2e7d32',
                        fontSize: '0.9rem'
                      }}
                    >
                      100% - 70%
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: darkMode ? '#90caf9' : '#546e7a',
                        fontSize: '0.75rem',
                        lineHeight: 1.2
                      }}
                    >
                      Seguramente sí llegarás a la sección buscada
                    </Typography>
                  </Box>
                </Box>
                
                {/* Rango Amarillo - Probabilidad media */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box 
                    sx={{ 
                      width: 20, 
                      height: 20, 
                      borderRadius: '50%', 
                      background: '#ff9800',
                      border: '2px solid #f57c00'
                    }} 
                  />
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: '#f57c00',
                        fontSize: '0.9rem'
                      }}
                    >
                      70% - 50%
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: darkMode ? '#90caf9' : '#546e7a',
                        fontSize: '0.75rem',
                        lineHeight: 1.2
                      }}
                    >
                      Con complicaciones, no es seguro que vayas a llegar pero no es nulo
                    </Typography>
                  </Box>
                </Box>
                
                {/* Rango Rojo - Baja probabilidad */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box 
                    sx={{ 
                      width: 20, 
                      height: 20, 
                      borderRadius: '50%', 
                      background: '#f44336',
                      border: '2px solid #d32f2f'
                    }} 
                  />
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: '#d32f2f',
                        fontSize: '0.9rem'
                      }}
                    >
                      - 50%
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: darkMode ? '#90caf9' : '#546e7a',
                        fontSize: '0.75rem',
                        lineHeight: 1.2
                      }}
                    >
                      Tu probabilidad es baja, aún no es nula totalmente pero es muy recomendable buscar otras secciones
                    </Typography>
                  </Box>
                </Box>
              </Stack>
              
              {/* Información adicional */}
              <Box sx={{ mt: 3, p: 2, borderRadius: 2, background: darkMode ? '#2d2d2d' : '#f8f9fa' }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: darkMode ? '#90caf9' : '#546e7a',
                    fontSize: '0.7rem',
                    fontStyle: 'italic',
                    lineHeight: 1.3
                  }}
                >
                  Esta guía te ayuda a interpretar los resultados de probabilidad de éxito en tus cursos
                </Typography>
              </Box>
            </Paper>
          </Fade>
        </Box>
      </Box>

      {/* Modal de confirmación inicial */}
      <Modal
        open={showConfirmation}
        onClose={handleCancelarPrediccion}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showConfirmation}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 500 },
              bgcolor: darkMode ? '#1e1e1e' : '#ffffff',
              borderRadius: 4,
              boxShadow: darkMode ? '0 24px 48px rgba(66, 165, 245, 0.3)' : '0 24px 48px rgba(0, 0, 0, 0.2)',
              p: 4,
              textAlign: 'center',
              border: darkMode ? '2px solid #42a5f5' : 'none',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2', mb: 3 }}>
              Confirmar Predicción
            </Typography>
            <Typography variant="body1" sx={{ color: darkMode ? '#90caf9' : '#546e7a', mb: 4, fontSize: '1.1rem' }}>
              Se procederá a realizar la predicción y se guardará en su historial.
            </Typography>
            <Stack direction="row" spacing={3} justifyContent="center">
              <Button
                variant="contained"
                onClick={handleConfirmarPrediccion}
                sx={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  background: darkMode ? '#42a5f5' : '#1976d2',
                  color: '#ffffff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: darkMode ? '#64b5f6' : '#1565c0',
                    transform: 'scale(1.02)',
                    boxShadow: darkMode ? '0 8px 24px rgba(66, 165, 245, 0.4)' : '0 8px 24px rgba(25, 118, 210, 0.3)',
                  },
                }}
              >
                Aceptar
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancelarPrediccion}
                sx={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  color: darkMode ? '#ff6b6b' : '#f44336',
                  borderColor: darkMode ? '#ff6b6b' : '#f44336',
                  background: darkMode ? '#1e1e1e' : '#ffffff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: darkMode ? 'rgba(255, 107, 107, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                    borderColor: darkMode ? '#ff8a80' : '#d32f2f',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                Cancelar
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>

      {/* Modal de carga de predicción */}
      <Modal
        open={showPredictionLoading}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showPredictionLoading}>
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
              Procesando tu solicitud de inscripción
            </Typography>
          </Box>
        </Fade>
      </Modal>

      {/* Modal de predicción completada */}
      <Modal
        open={showPredictionComplete}
        onClose={handleCerrarPrediccionCompleta}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showPredictionComplete}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 500 },
              bgcolor: darkMode ? '#1e1e1e' : '#ffffff',
              borderRadius: 4,
              boxShadow: darkMode ? '0 24px 48px rgba(66, 165, 245, 0.3)' : '0 24px 48px rgba(0, 0, 0, 0.2)',
              p: 4,
              textAlign: 'center',
              border: darkMode ? '2px solid #42a5f5' : 'none',
            }}
          >
            <Box sx={{ mb: 3, p: 2, borderRadius: 3, background: darkMode ? '#1b5e20' : '#e8f5e8', border: '2px solid #4caf50' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: darkMode ? '#81c784' : '#2e7d32', mb: 1 }}>
                ¡Predicción Realizada!
              </Typography>
              <Typography variant="h6" sx={{ color: darkMode ? '#a5d6a7' : '#388e3c', fontWeight: 600 }}>
                Probabilidad de éxito calculada
              </Typography>
            </Box>
            
            {resultData && (
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: darkMode ? '#42a5f5' : '#1976d2', mb: 2, fontWeight: 'bold' }}>
                  Probabilidad de éxito en el curso:
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                  <Chip
                    label={`${resultData.probabilidad}%`}
                    color={resultData.color === 'success' ? 'success' : 
                           resultData.color === 'warning' ? 'warning' : 
                           resultData.color === 'info' ? 'info' : 'error'}
                    sx={{ 
                      fontWeight: 'bold', 
                      fontSize: '1.5rem',
                      padding: '12px 24px',
                      height: 'auto',
                      '& .MuiChip-label': {
                        padding: '8px 16px'
                      }
                    }}
                  />
                </Box>
                
                <Typography variant="body1" sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 600, mb: 1 }}>
                  Nivel: {resultData.nivel}
                </Typography>
                
                <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontStyle: 'italic' }}>
                  Basado en tu promedio ({resultData.promedio}) y el profesor {resultData.profesor}
                </Typography>
              </Box>
            )}
            
            <Typography variant="body1" sx={{ color: darkMode ? '#90caf9' : '#546e7a', mb: 3 }}>
              Se ha registrado tu predicción para la sección seleccionada.
            </Typography>
            <Button
              variant="contained"
              onClick={handleCerrarPrediccionCompleta}
              sx={{
                fontWeight: 'bold',
                fontSize: 16,
                borderRadius: 3,
                px: 4,
                py: 1.5,
                background: darkMode ? '#42a5f5' : '#1976d2',
                color: '#ffffff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: darkMode ? '#64b5f6' : '#1565c0',
                  transform: 'scale(1.02)',
                  boxShadow: darkMode ? '0 8px 24px rgba(66, 165, 245, 0.4)' : '0 8px 24px rgba(25, 118, 210, 0.3)',
                },
              }}
            >
              Aceptar
            </Button>
          </Box>
        </Fade>
      </Modal>

      {/* Termómetro móvil - Solo visible en pantallas pequeñas */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          width: '100%',
          maxWidth: 600,
          mt: 3,
        }}
      >
        <Fade in timeout={2500}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              background: darkMode ? '#1e1e1e' : '#ffffff',
              border: darkMode ? `2px solid #42a5f5` : `2px solid #e3f2fd`,
              boxShadow: darkMode ? '0 8px 32px rgba(66, 165, 245, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold', 
                color: darkMode ? '#42a5f5' : '#1976d2', 
                mb: 3,
                fontSize: '1.1rem'
              }}
            >
              Guía de Probabilidad
            </Typography>
            
            {/* Termómetro móvil */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
              <img 
                src={Termometro} 
                alt="Termómetro de probabilidad" 
                style={{ 
                  width: '100px', 
                  height: 'auto',
                  filter: darkMode ? 'brightness(0.9) contrast(1.1)' : 'none'
                }} 
              />
            </Box>
            
            {/* Rangos de probabilidad móvil */}
            <Stack spacing={1.5} sx={{ textAlign: 'left' }}>
              {/* Rango Verde - Alta probabilidad */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box 
                  sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    background: '#4caf50',
                    border: '2px solid #2e7d32',
                    mt: 0.5
                  }} 
                />
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#2e7d32',
                      fontSize: '0.85rem'
                    }}
                  >
                    100% - 70%
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: darkMode ? '#90caf9' : '#546e7a',
                      fontSize: '0.7rem',
                      lineHeight: 1.2
                    }}
                  >
                    Seguramente sí llegarás a la sección buscada
                  </Typography>
                </Box>
              </Box>
              
              {/* Rango Amarillo - Probabilidad media */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box 
                  sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    background: '#ff9800',
                    border: '2px solid #f57c00',
                    mt: 0.5
                  }} 
                />
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#f57c00',
                      fontSize: '0.85rem'
                    }}
                  >
                    70% - 50%
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: darkMode ? '#90caf9' : '#546e7a',
                      fontSize: '0.7rem',
                      lineHeight: 1.2
                    }}
                  >
                    Con complicaciones, no es seguro que vayas a llegar pero no es nulo
                  </Typography>
                </Box>
              </Box>
              
              {/* Rango Rojo - Baja probabilidad */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box 
                  sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    background: '#f44336',
                    border: '2px solid #d32f2f',
                    mt: 0.5
                  }} 
                />
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#d32f2f',
                      fontSize: '0.85rem'
                    }}
                  >
                    - 50%
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: darkMode ? '#90caf9' : '#546e7a',
                      fontSize: '0.7rem',
                      lineHeight: 1.2
                    }}
                  >
                    Tu probabilidad es baja, aún no es nula totalmente pero es muy recomendable buscar otras secciones
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
};

export default SimulacionAlumno;