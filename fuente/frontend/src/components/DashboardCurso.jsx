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
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  LinearProgress,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  School,
  ArrowBack,
  Book,
  Code,
  Science,
  Computer,
  Engineering,
  Psychology,
  TrendingUp,
  People,
  Schedule,
  Assessment,
  Timeline,
  BarChart,
  PieChart,
  ShowChart
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Configurar axios para usar la URL base
axios.defaults.baseURL = 'http://localhost:8000';

const DashboardCurso = () => {
  const [curso, setCurso] = useState(null);
  const [prerequisitos, setPrerequisitos] = useState([]);
  const [cursosPosteriores, setCursosPosteriores] = useState([]);
  const [profesoresHistoricos, setProfesoresHistoricos] = useState([]);
  const [estadisticasSecciones, setEstadisticasSecciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [carreraSeleccionada, setCarreraSeleccionada] = useState('i1'); // Por defecto Industrial
  const { cursoCodigo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [profesoresSeleccionados, setProfesoresSeleccionados] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [vacantes, setVacantes] = useState('');
  const [resultadosPrediccion, setResultadosPrediccion] = useState([]);
  const [loadingPrediccion, setLoadingPrediccion] = useState(false);

  const departamento = location.state?.departamento;

  useEffect(() => {
    if (cursoCodigo) {
      cargarDashboardCurso();
    }
  }, [cursoCodigo]);

  const cargarDashboardCurso = async () => {
    setLoading(true);
    setError('');
    try {
      // Cargar información del curso
      const responseCurso = await axios.get(`/api/curso/${cursoCodigo}`);
      setCurso(responseCurso.data);

      // Cargar prerequisitos
      const responsePrerequisitos = await axios.get(`/api/prerequisitos-curso/${cursoCodigo}`, { params: { carrera: carreraSeleccionada } });
      setPrerequisitos(responsePrerequisitos.data);

      // Cargar cursos posteriores
      const responseCursosPosteriores = await axios.get(`/api/cursos-posteriores/${cursoCodigo}`);
      setCursosPosteriores(responseCursosPosteriores.data);

      // Cargar profesores históricos
      const responseProfesores = await axios.get(`/api/profesores-historicos/${cursoCodigo}`);
      setProfesoresHistoricos(responseProfesores.data);

      // Cargar estadísticas de secciones
      const responseEstadisticas = await axios.get(`/api/estadisticas-secciones/${cursoCodigo}`);
      setEstadisticasSecciones(responseEstadisticas.data);


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

  const cargarPrerequisitos = async (carrera) => {
    try {
      const responsePrerequisitos = await axios.get(`/api/prerequisitos-curso/${cursoCodigo}`, { 
        params: { carrera: carrera } 
      });
      setPrerequisitos(responsePrerequisitos.data);
    } catch (err) {
      console.error('Error al cargar prerrequisitos:', err);
      setPrerequisitos([]);
    }
  };

  const handleCarreraChange = (event) => {
    const nuevaCarrera = event.target.value;
    setCarreraSeleccionada(nuevaCarrera);
    cargarPrerequisitos(nuevaCarrera);
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

  const getDepartamentoColor = (codigo) => {
    const colores = {
      'CCBB': '#1976d2',
      'SITE': '#388e3c',
      'GEPR': '#f57c00',
      'TECN': '#7b1fa2',
      'HUCS': '#c2185b',
      'SOFT': '#0288d1'
    };
    return colores[codigo] || '#1976d2';
  };

  // Datos para gráficas
  const chartDataSecciones = {
    labels: estadisticasSecciones.map(s => s.ciclo).reverse(),
    datasets: [
      {
        label: 'Total de Secciones',
        data: estadisticasSecciones.map(s => s.total_secciones).reverse(),
        borderColor: getDepartamentoColor(curso?.departamento),
        backgroundColor: `${getDepartamentoColor(curso?.departamento)}20`,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Total de Profesores',
        data: estadisticasSecciones.map(s => s.total_profesores).reverse(),
        borderColor: '#ff9800',
        backgroundColor: '#ff980020',
        fill: false,
        tension: 0.4,
      }
    ],
  };



  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Manejar selección de profesores
  const handleToggleProfesor = (nombre) => {
    setResultadosPrediccion([]);
    setProfesoresSeleccionados((prev) =>
      prev.includes(nombre)
        ? prev.filter((n) => n !== nombre)
        : [...prev, nombre]
    );
  };

  // Lanzar diálogo para ingresar vacantes
  const handleAbrirDialogo = () => {
    setResultadosPrediccion([]);
    setOpenDialog(true);
  };

  // Ejecutar predicción para todos los profesores seleccionados
  const handlePredecirMatriculados = async () => {
    setLoadingPrediccion(true);
    setResultadosPrediccion([]);
    try {
      const promesas = profesoresSeleccionados.map(async (nombre_profesor) => {
        const response = await axios.get('/api/prediccion-matriculados-finales', {
          params: {
            codigo_curso: cursoCodigo,
            nombre_profesor,
            num_vacantes: vacantes,
          },
        });
        return {
          profesor: nombre_profesor,
          ...response.data,
        };
      });
      const resultados = await Promise.all(promesas);
      setResultadosPrediccion(resultados);
    } catch (err) {
      setResultadosPrediccion([]);
    }
    setLoadingPrediccion(false);
    setOpenDialog(false);
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
              border: `2px solid ${getDepartamentoColor(curso.departamento)}`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                onClick={handleVolver}
                sx={{
                  color: getDepartamentoColor(curso.departamento),
                  '&:hover': {
                    background: `${getDepartamentoColor(curso.departamento)}15`,
                  },
                }}
              >
                <ArrowBack />
              </IconButton>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  background: `${getDepartamentoColor(curso.departamento)}15`,
                  color: getDepartamentoColor(curso.departamento),
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
                      background: getDepartamentoColor(curso.departamento),
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                  <Chip
                    label={curso.nombre_departamento}
                    variant="outlined"
                    sx={{
                      borderColor: getDepartamentoColor(curso.departamento),
                      color: getDepartamentoColor(curso.departamento),
                    }}
                  />
                  {curso.creditos && (
                    <Chip
                      label={`${curso.creditos} créditos`}
                      variant="outlined"
                      sx={{
                        borderColor: getDepartamentoColor(curso.departamento),
                        color: getDepartamentoColor(curso.departamento),
                      }}
                    />
                  )}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Fade>

        {/* Información del Curso */}
        <Fade in timeout={1000}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${getDepartamentoColor(curso.departamento)}30`,
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 2 }}>
                    Información del Curso
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Horas Teoría:</Typography>
                      <Typography variant="body2" fontWeight="bold">{curso.horas_teoria || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Horas Práctica:</Typography>
                      <Typography variant="body2" fontWeight="bold">{curso.horas_practica || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Horas Totales:</Typography>
                      <Typography variant="body2" fontWeight="bold">{curso.horas_total || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Ciclo Sistemas:</Typography>
                      <Typography variant="body2" fontWeight="bold">{curso.ciclo_sistemas || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Ciclo Industrial:</Typography>
                      <Typography variant="body2" fontWeight="bold">{curso.ciclo_industrial || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Ciclo Software:</Typography>
                      <Typography variant="body2" fontWeight="bold">{curso.ciclo_software || 'N/A'}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${getDepartamentoColor(curso.departamento)}30`,
                }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      Prerrequisitos
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Carrera</InputLabel>
                      <Select
                        value={carreraSeleccionada}
                        label="Carrera"
                        onChange={handleCarreraChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            background: 'rgba(255, 255, 255, 0.8)',
                          },
                        }}
                      >
                        <MenuItem value="i1">Industrial (i1)</MenuItem>
                        <MenuItem value="i2">Sistemas (i2)</MenuItem>
                        <MenuItem value="i3">Software (i3)</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  
                  {prerequisitos.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No se encontraron prerrequisitos para este curso en la carrera seleccionada.
                    </Typography>
                  ) : (
                    <List dense>
                      {prerequisitos.map((prereq, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Book sx={{ color: getDepartamentoColor(curso.departamento) }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                  {prereq.carrera === 'I1' ? 'Ingeniería Industrial' : 
                                   prereq.carrera === 'I2' ? 'Ingeniería de Sistemas' : 
                                   prereq.carrera === 'I3' ? 'Ingeniería de Software' : 
                                   prereq.carrera || 'General'}
                                </Typography>
                                <Chip 
                                  label={prereq.carrera} 
                                  size="small" 
                                  variant="outlined"
                                  sx={{
                                    borderColor: getDepartamentoColor(curso.departamento),
                                    color: getDepartamentoColor(curso.departamento),
                                    fontSize: '0.7rem'
                                  }}
                                />
                              </Stack>
                            }
                            secondary={
                              prereq.prerequisitos.length > 0 ? (
                                <Stack spacing={1} sx={{ mt: 1 }}>
                                  {prereq.prerequisitos.map((p, idx) => (
                                    <Chip
                                      key={idx}
                                      label={`${p.codigo} - ${p.nombre}`}
                                      size="small"
                                      sx={{
                                        background: `${getDepartamentoColor(curso.departamento)}15`,
                                        color: getDepartamentoColor(curso.departamento),
                                        fontWeight: 500,
                                        fontSize: '0.75rem'
                                      }}
                                    />
                                  ))}
                                </Stack>
                              ) : (
                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                  Sin prerrequisitos específicos
                                </Typography>
                              )
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Fade>

        {/* Cursos Posteriores */}
        {cursosPosteriores.length > 0 && (
          <Fade in timeout={1200}>
            <Card
              elevation={0}
              sx={{
                mb: 4,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${getDepartamentoColor(curso.departamento)}30`,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 2 }}>
                  Cursos que Abre
                </Typography>
                <Grid container spacing={2}>
                  {cursosPosteriores.map((cursoPost, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          background: `${getDepartamentoColor(curso.departamento)}10`,
                          border: `1px solid ${getDepartamentoColor(curso.departamento)}30`,
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold" color="#2c3e50">
                          {cursoPost.codigo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {cursoPost.nombre}
                        </Typography>
                        <Chip
                          label={cursoPost.carrera}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: getDepartamentoColor(curso.departamento),
                            color: getDepartamentoColor(curso.departamento),
                          }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        )}

        {/* Profesores Históricos con selección múltiple */}
        {profesoresHistoricos.length > 0 && (
          <Fade in timeout={1400}>
            <Card
              elevation={0}
              sx={{
                mb: 4,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${getDepartamentoColor(curso.departamento)}30`,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 2 }}>
                  Profesores Históricos
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Profesor</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Ciclo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Veces Dictado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {profesoresHistoricos.slice(0, 10).map((prof, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Checkbox
                              checked={profesoresSeleccionados.includes(prof.nombre)}
                              onChange={() => handleToggleProfesor(prof.nombre)}
                            />
                          </TableCell>
                          <TableCell>{prof.nombre}</TableCell>
                          <TableCell>{prof.ciclo}</TableCell>
                          <TableCell>
                            <Chip
                              label={prof.veces_dictado}
                              size="small"
                              sx={{
                                background: getDepartamentoColor(curso.departamento),
                                color: 'white',
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, fontWeight: 'bold' }}
                  disabled={profesoresSeleccionados.length === 0}
                  onClick={handleAbrirDialogo}
                >
                  Proceder con predicción de matriculados finales
                </Button>
              </CardContent>
            </Card>
          </Fade>
        )}

        {/* Gráfica Comparativa de Secciones */}
        {estadisticasSecciones.length > 0 && (
          <Fade in timeout={1600}>
            <Card
              elevation={0}
              sx={{
                mb: 4,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${getDepartamentoColor(curso.departamento)}30`,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 3 }}>
                  Evolución de Secciones por Ciclo
                </Typography>
                <Box sx={{ height: 400 }}>
                  <Line data={chartDataSecciones} options={chartOptions} />
                </Box>
              </CardContent>
            </Card>
          </Fade>
        )}



        {/* Diálogo para ingresar vacantes */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Ingrese la cantidad de vacantes</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Vacantes"
              type="number"
              fullWidth
              value={vacantes}
              onChange={e => setVacantes(e.target.value)}
              inputProps={{ min: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button
              onClick={handlePredecirMatriculados}
              disabled={!vacantes || isNaN(Number(vacantes)) || Number(vacantes) <= 0 || loadingPrediccion}
              variant="contained"
              color="primary"
            >
              {loadingPrediccion ? 'Calculando...' : 'Predecir'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Resultados de la predicción */}
        {resultadosPrediccion.length > 0 && (
          <Card sx={{ mt: 3, borderRadius: 3, background: '#f8f9fa', p: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Resultados de la predicción de matriculados
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Profesor</TableCell>
                      <TableCell>Predicción</TableCell>
                      <TableCell>Vacantes</TableCell>
                      <TableCell>Ocupación (%)</TableCell>
                      <TableCell>Nivel</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resultadosPrediccion.map((res, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{res.profesor}</TableCell>
                        <TableCell>{res.prediccion}</TableCell>
                        <TableCell>{res.vacantes}</TableCell>
                        <TableCell>{res.porcentaje_ocupacion}</TableCell>
                        <TableCell>
                          <Chip label={res.nivel_ocupacion} color={res.color} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
      </Box>
    </AdminLayout>
  );
};

export default DashboardCurso; 