import React, { useState, useRef } from 'react';
import { Box, Typography, Grid, TextField, Button, Paper, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, InputAdornment, Modal, Fade, Backdrop, List, ListItem, ListItemText, Card } from '@mui/material';
import AlumnoSidebar from './AlumnoSidebar';
import axios from 'axios';
import { Search } from '@mui/icons-material';
import HorarioSemanal from './HorarioSemanal';
import html2canvas from 'html2canvas';

const sidebarWidth = 240;

const CalendarioAlumno = ({ darkMode, setDarkMode }) => {
  const [ciclo, setCiclo] = useState('');
  const [nota, setNota] = useState('');
  const [cursos, setCursos] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [loadingCursos, setLoadingCursos] = useState(false);
  const [loadingHorario, setLoadingHorario] = useState(false);
  const [mostrarBuscadorCursos, setMostrarBuscadorCursos] = useState(false);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [filtroCurso, setFiltroCurso] = useState('');
  const [mensajeGuardado, setMensajeGuardado] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [errorCursos, setErrorCursos] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [mostrarHorario, setMostrarHorario] = useState(false);
  const [bloquesHorario, setBloquesHorario] = useState([]);
  const [cursosGuardados, setCursosGuardados] = useState([]);
  const [informacionHorario, setInformacionHorario] = useState({});
  const horarioRef = useRef(null);

  // Estados para optimización integrada
  const [horarioOptimizado, setHorarioOptimizado] = useState(null);
  const [probabilidadMedia, setProbabilidadMedia] = useState(0);
  const [crucesOptimizados, setCrucesOptimizados] = useState({});
  const [mostrarHorarioOptimizado, setMostrarHorarioOptimizado] = useState(false);
  const [errorOptimizacion, setErrorOptimizacion] = useState('');
  const [detalleErrorOptimizacion, setDetalleErrorOptimizacion] = useState(null);

  // Buscar cursos válidos solo al hacer clic en 'Buscar Cursos'
  const handleBuscarCursos = async () => {
    setLoadingCursos(true);
    setBusquedaRealizada(true);
    setErrorCursos('');
    try {
      const res = await axios.get(`/api/cursos?periodo=${ciclo}`);
      let data = res.data;
      if (!Array.isArray(data) || !data.every(c => c.codigo && c.nombre)) {
        setCursos([]);
        setErrorCursos('La respuesta del servidor no es válida.');
        setMostrarBuscadorCursos(true);
      } else if (data.length === 0) {
        setCursos([]);
        setErrorCursos('No se encontraron cursos para el periodo ingresado.');
        setMostrarBuscadorCursos(true);
      } else {
        setCursos(data);
        setMostrarBuscadorCursos(true);
      }
    } catch (err) {
      setCursos([]);
      setErrorCursos('Error al consultar los cursos.');
      setMostrarBuscadorCursos(true);
    } finally {
      setLoadingCursos(false);
    }
  };

  const handleGuardarSeleccion = () => {
    const horarioConFecha = {
      cursos: cursosSeleccionados,
      ciclo: ciclo,
      fecha: new Date().toISOString()
    };
    localStorage.setItem('cursos_guardados_calendario', JSON.stringify([horarioConFecha]));
    setMensajeGuardado('¡Cursos guardados exitosamente!');
    setCursosGuardados([...cursosSeleccionados]);
    setOpenModal(true);
    setGuardando(false);
  };

  // Función integrada que automáticamente optimiza el horario
  const handleMostrarHorario = async () => {
    setMostrarHorario(false);
    setBloquesHorario([]);
    setErrorOptimizacion('');
    setDetalleErrorOptimizacion(null);
    setLoadingHorario(true);
    
    const horariosGuardados = JSON.parse(localStorage.getItem('cursos_guardados_calendario') || '[]');
    if (!horariosGuardados.length) return;
    
    // Obtener el horario más reciente
    const horarioActual = horariosGuardados[0];
    if (!horarioActual.cursos || !horarioActual.cursos.length) return;
    
    try {
      // Usar el endpoint de optimización automáticamente
      const codigos = horarioActual.cursos.map(c => c.codigo);
      const res = await axios.post('/api/optimizar-horario', {
        codigos_cursos: codigos,
        periodo: horarioActual.ciclo || ciclo,
        nota_alumno: parseFloat(nota)
      });

      if (res.data.success) {
        // Procesar la respuesta optimizada para el componente HorarioSemanal
        const horarioOptimizado = res.data.horario_optimizado;
        const bloquesProcesados = [];
        
        // Convertir horario optimizado a formato de bloques para HorarioSemanal
        horarioOptimizado.forEach(seccion => {
          seccion.horarios.forEach(horario => {
            bloquesProcesados.push({
              codigo_curso: seccion.codigo_curso,
              nombre_curso: seccion.nombre_curso,
              seccion: seccion.seccion,
              profesor: seccion.profesor,
              dia: horario.dia,
              hora_inicio: horario.hora_inicio,
              hora_fin: horario.hora_fin,
              tipoclase: horario.tipo,
              aula: horario.aula,
              // Información adicional de probabilidades
              probabilidad: seccion.probabilidad,
              resultado_probabilidad: `${seccion.probabilidad}%`,
              color_probabilidad: seccion.probabilidad >= 80 ? 'success' : 
                                  seccion.probabilidad >= 60 ? 'info' : 
                                  seccion.probabilidad >= 40 ? 'warning' : 'error',
              turno_estimado: '',
              profesor_demanda: '',
              cruces: {}
            });
          });
        });
        
        setBloquesHorario(bloquesProcesados);
        setMostrarHorario(true);
        setMostrarHorarioOptimizado(true);
        
        // Guardar información adicional para mostrar en el modal
        setInformacionHorario({
          resumen: {
            promedio_probabilidad: res.data.probabilidad_media,
            total_secciones: res.data.total_secciones,
            secciones_sin_cruces_criticos: res.data.total_secciones,
            secciones_con_cruces_criticos: 0
          },
          secciones: horarioOptimizado,
          nota_alumno: parseFloat(nota),
          periodo: horarioActual.ciclo || ciclo
        });
        
        // Guardar información de optimización
        setProbabilidadMedia(res.data.probabilidad_media);
        setCrucesOptimizados(res.data.cruces);
        setHorarioOptimizado(horarioOptimizado);
        
      }
    } catch (error) {
      setMostrarHorario(false);
      setMostrarHorarioOptimizado(false);
      
      if (error.response && error.response.status === 400) {
        setErrorOptimizacion('No se pudo encontrar un horario válido sin cruces críticos.');
        setDetalleErrorOptimizacion(error.response.data.detail || null);
      } else {
        setErrorOptimizacion('Error al optimizar el horario. Verifique que todos los cursos tengan secciones disponibles.');
        setDetalleErrorOptimizacion(null);
      }
    } finally {
      setLoadingHorario(false);
    }
  };

  // Reset buscador de cursos si cambian los parámetros
  React.useEffect(() => {
    setMostrarBuscadorCursos(false);
    setCursos([]);
    setCursosSeleccionados([]);
    setBusquedaRealizada(false);
    setFiltroCurso('');
  }, [ciclo, nota]);

  const puedeBuscarCursos = ciclo && nota;

  // Filtro de cursos
  const cursosFiltrados = Array.isArray(cursos)
    ? cursos.filter(c =>
        c.codigo.toLowerCase().includes(filtroCurso.toLowerCase()) ||
        c.nombre.toLowerCase().includes(filtroCurso.toLowerCase())
      )
    : [];

  // Selección de cursos
  const handleToggleCurso = (curso) => {
    const existe = cursosSeleccionados.some(c => c.codigo === curso.codigo);
    if (existe) {
      setCursosSeleccionados(cursosSeleccionados.filter(c => c.codigo !== curso.codigo));
    } else {
      setCursosSeleccionados([...cursosSeleccionados, curso]);
    }
  };

  const isCursoSeleccionado = (codigo) => cursosSeleccionados.some(c => c.codigo === codigo);

  const handleExport = () => {
    if (horarioRef.current) {
      html2canvas(horarioRef.current, { backgroundColor: '#ffffff' }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'horario.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh', 
        width: '100vw', 
        background: darkMode ? '#121212' : '#f8f9fa',
        transition: 'background 0.7s',
      }}
    >
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
        {/* Contenido principal centrado */}
        <Box sx={{ width: '100%', maxWidth: 1200, mt: 4 }}>
          {/* Header */}
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 'bold', 
              color: darkMode ? '#42a5f5' : '#1976d2', 
              mb: 6, 
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Calendario Semanal
          </Typography>

          {/* Error de optimización de horario */}
          {errorOptimizacion && (
            <Box sx={{ mt: 2, mb: 4, p: 3, borderRadius: 3, background: '#ffebee', border: '2px solid #f44336', textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
              <Typography variant="h6" color="error" sx={{ fontWeight: 'bold', mb: 2 }}>
                {errorOptimizacion}
              </Typography>
              {detalleErrorOptimizacion && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ color: '#d32f2f', fontWeight: 500 }}>
                    Detalles del cruce:
                  </Typography>
                  <pre style={{ textAlign: 'left', background: '#fff', color: '#b71c1c', padding: 12, borderRadius: 6, marginTop: 8, fontSize: 15, overflowX: 'auto' }}>
                    {typeof detalleErrorOptimizacion === 'string' ? detalleErrorOptimizacion : JSON.stringify(detalleErrorOptimizacion, null, 2)}
                  </pre>
                </Box>
              )}
            </Box>
          )}

          {/* Formulario principal */}
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
              Configura tu horario semanal
            </Typography>

            <Grid container spacing={3} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Ciclo o periodo"
                  variant="outlined"
                  value={ciclo}
                  onChange={e => setCiclo(e.target.value.replace(/[^0-9]/g, ''))}
                  inputProps={{ maxLength: 3 }}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      background: darkMode ? '#1e1e1e' : '#f8f9fa',
                      border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: darkMode ? '#42a5f5' : '#42a5f5',
                        boxShadow: darkMode ? '0 0 0 4px rgba(66, 165, 245, 0.1)' : '0 0 0 4px rgba(66, 165, 245, 0.1)',
                      },
                      '&.Mui-focused': {
                        borderColor: darkMode ? '#42a5f5' : '#1976d2',
                        boxShadow: darkMode ? '0 0 0 4px rgba(66, 165, 245, 0.1)' : '0 0 0 4px rgba(25, 118, 210, 0.1)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: darkMode ? '#42a5f5' : '#546e7a',
                      fontWeight: 600,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Nota"
                  variant="outlined"
                  value={nota}
                  onChange={e => setNota(e.target.value.replace(/[^0-9.]/g, ''))}
                  inputProps={{ maxLength: 5 }}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      background: darkMode ? '#1e1e1e' : '#f8f9fa',
                      border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: darkMode ? '#42a5f5' : '#42a5f5',
                        boxShadow: darkMode ? '0 0 0 4px rgba(66, 165, 245, 0.1)' : '0 0 0 4px rgba(66, 165, 245, 0.1)',
                      },
                      '&.Mui-focused': {
                        borderColor: darkMode ? '#42a5f5' : '#1976d2',
                        boxShadow: darkMode ? '0 0 0 4px rgba(66, 165, 245, 0.1)' : '0 0 0 4px rgba(25, 118, 210, 0.1)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: darkMode ? '#42a5f5' : '#546e7a',
                      fontWeight: 600,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {puedeBuscarCursos && !mostrarBuscadorCursos && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBuscarCursos}
                    disabled={loadingCursos}
                    sx={{
                      width: '100%',
                      height: 56,
                      fontWeight: 'bold',
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
                    {loadingCursos ? <CircularProgress size={28} color="inherit" /> : 'Buscar Cursos'}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Card>

          {/* Buscador de cursos */}
          {mostrarBuscadorCursos && (
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
                Selecciona los cursos para tu horario
              </Typography>

              <TextField
                label="Filtrar cursos"
                variant="outlined"
                value={filtroCurso}
                onChange={e => setFiltroCurso(e.target.value)}
                fullWidth
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    background: darkMode ? '#1e1e1e' : '#f8f9fa',
                    border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: darkMode ? '#42a5f5' : '#42a5f5',
                      boxShadow: darkMode ? '0 0 0 4px rgba(66, 165, 245, 0.1)' : '0 0 0 4px rgba(66, 165, 245, 0.1)',
                    },
                    '&.Mui-focused': {
                      borderColor: darkMode ? '#42a5f5' : '#1976d2',
                      boxShadow: darkMode ? '0 0 0 4px rgba(66, 165, 245, 0.1)' : '0 0 0 4px rgba(25, 118, 210, 0.1)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: darkMode ? '#42a5f5' : '#546e7a',
                    fontWeight: 600,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              <TableContainer 
                component={Paper} 
                sx={{ 
                  background: darkMode ? '#1e1e1e' : '#ffffff', 
                  borderRadius: 3, 
                  border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                  boxShadow: darkMode ? '0 4px 12px rgba(66, 165, 245, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: darkMode ? '#42a5f5' : '#e3f2fd' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Seleccionar</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Código</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#1976d2', fontSize: 16 }}>Nombre</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cursosFiltrados.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ color: darkMode ? '#ffffff' : '#546e7a', py: 4 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            No hay cursos para mostrar.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      cursosFiltrados.map((curso) => (
                        <TableRow 
                          key={curso.codigo} 
                          hover 
                          selected={isCursoSeleccionado(curso.codigo)}
                          sx={{
                            '&:nth-of-type(odd)': { background: darkMode ? '#42a5f5' : '#f8f9fa' },
                            '&:hover': { background: darkMode ? '#388e3c' : '#e3f2fd' },
                            transition: 'background 0.3s ease',
                          }}
                        >
                          <TableCell>
                            <Checkbox
                              checked={isCursoSeleccionado(curso.codigo)}
                              onChange={() => handleToggleCurso(curso)}
                              sx={{ 
                                color: darkMode ? '#ffffff' : '#1976d2',
                                '&.Mui-checked': {
                                  color: darkMode ? '#ffffff' : '#1976d2',
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, color: darkMode ? '#ffffff' : '#1976d2' }}>{curso.codigo}</TableCell>
                          <TableCell sx={{ color: darkMode ? '#ffffff' : '#546e7a' }}>{curso.nombre}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {cursosSeleccionados.length > 0 && (
                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGuardarSeleccion}
                    disabled={guardando}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      borderRadius: 3,
                      px: 4,
                      py: 2,
                      background: darkMode ? '#388e3c' : '#4caf50',
                      color: '#ffffff',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: darkMode ? '#388e3c' : '#388e3c',
                        transform: 'scale(1.02)',
                        boxShadow: darkMode ? '0 8px 24px rgba(76, 175, 80, 0.3)' : '0 8px 24px rgba(76, 175, 80, 0.3)',
                      },
                    }}
                  >
                    Guardar Selección
                  </Button>
                  
                  {mensajeGuardado && (
                    <>
                      <Typography 
                        sx={{ 
                          mt: 2, 
                          color: mensajeGuardado.startsWith('¡') ? darkMode ? '#42a5f5' : '#2e7d32' : darkMode ? '#42a5f5' : '#d32f2f', 
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}
                      >
                        {mensajeGuardado}
                      </Typography>
                      {mensajeGuardado.startsWith('¡') && cursosGuardados.length > 0 && (
                        <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleMostrarHorario}
                            disabled={loadingHorario}
                            startIcon={loadingHorario ? <CircularProgress size={20} color="inherit" /> : null}
                            sx={{
                              fontWeight: 'bold',
                              fontSize: 16,
                              borderRadius: 3,
                              px: 4,
                              py: 2,
                              background: darkMode ? '#42a5f5' : '#1976d2',
                              color: '#ffffff',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                background: darkMode ? '#388e3c' : '#1565c0',
                                transform: 'scale(1.02)',
                                boxShadow: darkMode ? '0 8px 24px rgba(76, 175, 80, 0.3)' : '0 8px 24px rgba(25, 118, 210, 0.3)',
                              },
                              '&:disabled': {
                                background: darkMode ? '#666666' : '#cccccc',
                                color: darkMode ? '#999999' : '#666666',
                              },
                            }}
                          >
                            {loadingHorario ? 'Optimizando...' : 'Mostrar Horario Optimizado'}
                          </Button>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              )}
            </Card>
          )}

          {/* Modal para mostrar cursos guardados */}
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 400 }}
          >
            <Fade in={openModal}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: { xs: '90%', sm: 500 },
                  bgcolor: darkMode ? '#1e1e1e' : '#ffffff',
                  border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                  boxShadow: darkMode ? '0 24px 48px rgba(66, 165, 245, 0.2)' : '0 24px 48px rgba(0, 0, 0, 0.15)',
                  p: 4,
                  borderRadius: 4,
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
                  Cursos Guardados
                </Typography>
                <List>
                  {cursosSeleccionados.map((curso, idx) => (
                    <ListItem key={idx} sx={{ p: 1 }}>
                      <ListItemText 
                        primary={`${curso.codigo} - ${curso.nombre}`}
                        primaryTypographyProps={{ 
                          fontWeight: 600, 
                          color: darkMode ? '#42a5f5' : '#1976d2',
                          fontSize: 16
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button 
                    onClick={() => setOpenModal(false)} 
                    sx={{
                      color: darkMode ? '#42a5f5' : '#1976d2',
                      fontWeight: 'bold',
                      borderRadius: 3,
                      px: 4,
                      py: 1,
                      background: darkMode ? '#1e1e1e' : '#ffffff',
                      border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: darkMode ? '#388e3c' : '#e3f2fd',
                        borderColor: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    Cerrar
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>

          {/* Mostrar horario */}
          {mostrarHorario && (
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
                Horario Optimizado
              </Typography>
              
              {/* Resumen de probabilidades y cruces */}
              {(informacionHorario.resumen || mostrarHorarioOptimizado) && (
                <Box sx={{ mb: 3, p: 3, borderRadius: 3, background: darkMode ? '#2d2d2d' : '#f8f9fa' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      color: darkMode ? '#42a5f5' : '#1976d2', 
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                  >
                    Horario Optimizado
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, background: darkMode ? '#1e1e1e' : '#ffffff' }}>
                        <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                          {mostrarHorarioOptimizado ? probabilidadMedia : informacionHorario.resumen?.promedio_probabilidad || 0}%
                        </Typography>
                        <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                          Probabilidad Promedio
                        </Typography>
                      </Box>
                    </Grid>
                    
                    {mostrarHorarioOptimizado && (
                      <>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, background: darkMode ? '#1e1e1e' : '#ffffff' }}>
                            <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 'bold' }}>
                              {crucesOptimizados.teorico || 0}h
                            </Typography>
                            <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                              Cruces Teóricos
                            </Typography>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, background: darkMode ? '#1e1e1e' : '#ffffff' }}>
                            <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                              {crucesOptimizados.peligroso || 0}h
                            </Typography>
                            <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                              Cruces Peligrosos
                            </Typography>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, background: darkMode ? '#1e1e1e' : '#ffffff' }}>
                            <Typography variant="h4" sx={{ color: '#f44336', fontWeight: 'bold' }}>
                              {crucesOptimizados.critico || 0}h
                            </Typography>
                            <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                              Cruces Críticos
                            </Typography>
                          </Box>
                        </Grid>
                      </>
                    )}
                  </Grid>
                  
                  {/* Información adicional */}
                  <Box sx={{ mt: 3, p: 2, borderRadius: 2, background: darkMode ? '#1e1e1e' : '#ffffff' }}>
                    <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a', textAlign: 'center' }}>
                      <strong>Nota del alumno:</strong> {nota} | 
                      <strong> Periodo:</strong> {ciclo}
                      {mostrarHorarioOptimizado && (
                        <span> | <strong>Optimizado:</strong> Sí</span>
                      )}
                    </Typography>
                    <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a', textAlign: 'center', mt: 1 }}>
                      💡 Haz clic en cualquier bloque del horario para ver detalles de probabilidades y cruces
                    </Typography>
                  </Box>
                </Box>
              )}
              
              <div ref={horarioRef}>
                <HorarioSemanal bloques={bloquesHorario} darkMode={darkMode} />
              </div>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={handleExport}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    borderRadius: 3,
                    px: 4,
                    py: 2,
                    background: darkMode ? '#388e3c' : '#1976d2',
                    color: '#ffffff',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: darkMode ? '#388e3c' : '#1565c0',
                      transform: 'scale(1.02)',
                      boxShadow: darkMode ? '0 8px 24px rgba(76, 175, 80, 0.3)' : '0 8px 24px rgba(25, 118, 210, 0.3)',
                    },
                  }}
                >
                  Exportar Horario
                </Button>
              </Box>
            </Card>
          )}

          {errorCursos && mostrarBuscadorCursos && (
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                background: darkMode ? '#ffebee' : '#ffebee',
                border: darkMode ? '2px solid #f44336' : '2px solid #f44336',
                textAlign: 'center',
              }}
            >
              <Typography color="error" sx={{ fontWeight: 600 }}>
                {errorCursos}
              </Typography>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarioAlumno;