import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Paper,
  Fade,
  CircularProgress,
  Chip,
  Stack,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  DialogActions,
  Tooltip,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Warning,
  Search,
  Person,
  School,
  Info,
  Error,
  CheckCircle,
  Close,
  RestartAlt,
  TrendingUp,
  Dashboard,
  ArrowForward,
  BarChart,
  Timeline,
  Assessment
} from '@mui/icons-material';
import AdminLayout from './AdminLayout';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler
} from 'chart.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

const GestionCruces = ({ darkMode, setDarkMode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [estadisticasGenerales, setEstadisticasGenerales] = useState(null);
  const [busquedaCurso, setBusquedaCurso] = useState('');
  const [busquedaProfesor, setBusquedaProfesor] = useState('');
  const [cicloSeleccionado, setCicloSeleccionado] = useState('241');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogData, setDialogData] = useState(null);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showBusqueda, setShowBusqueda] = useState(false);
  const [showResultados, setShowResultados] = useState(false);
  const [showCrucesPorProfesor, setShowCrucesPorProfesor] = useState(false);
  const [showCrucesPorCurso, setShowCrucesPorCurso] = useState(false);
  
  // Nuevos estados para tops y sugerencias
  const [topProfesores, setTopProfesores] = useState([]);
  const [topCursos, setTopCursos] = useState([]);
  const [sugerenciasCursos, setSugerenciasCursos] = useState([]);
  const [sugerenciasProfesores, setSugerenciasProfesores] = useState([]);
  const [showSugerenciasCursos, setShowSugerenciasCursos] = useState(false);
  const [showSugerenciasProfesores, setShowSugerenciasProfesores] = useState(false);
  const [topHistorico, setTopHistorico] = useState(false);
  const [loadingTops, setLoadingTops] = useState(false);

  // 1. Estados para filtro y datos de cruces por profesor
  const [tipoFiltro, setTipoFiltro] = useState('Todos'); // 'Todos', 'Crítico', 'Peligroso', 'Teórico'
  const [crucesPorCiclo, setCrucesPorCiclo] = useState([]); // [{ciclo, total_cruces}]
  const [rankingProfesor, setRankingProfesor] = useState(null);
  const [loadingRanking, setLoadingRanking] = useState(false);

  // 1. Nuevo estado para saber si el nombre de profesor es válido
  const [profesorValido, setProfesorValido] = useState(false);

  // 1. Nuevo estado para la lista de profesores y el filtro
  const [profesores, setProfesores] = useState([]);
  const [filtroProfesor, setFiltroProfesor] = useState('');
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    cargarEstadisticasGenerales();
    cargarTops();
  }, [cicloSeleccionado, topHistorico]);

  // Efecto para cerrar sugerencias cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.sugerencias-container')) {
        setShowSugerenciasCursos(false);
        setShowSugerenciasProfesores(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cargarEstadisticasGenerales = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/estadisticas-cruces');
      setEstadisticasGenerales(response.data);
    } catch (err) {
      setError('Error al cargar las estadísticas de cruces');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const cargarTops = async () => {
    setLoadingTops(true);
    try {
      // Cargar top profesores
      const responseProfesores = await axios.get('/api/top-profesores-cruces', {
        params: {
          ciclo: cicloSeleccionado,
          historico: topHistorico,
          limit: 20
        }
      });
      setTopProfesores(responseProfesores.data.profesores);

      // Cargar top cursos
      const responseCursos = await axios.get('/api/top-cursos-cruces', {
        params: {
          ciclo: cicloSeleccionado,
          historico: topHistorico,
          limit: 20
        }
      });
      setTopCursos(responseCursos.data.cursos);
    } catch (err) {
      console.error('Error al cargar tops:', err);
    } finally {
      setLoadingTops(false);
    }
  };

  const buscarSugerenciasCursos = async (prefijo) => {
    if (prefijo.length < 2) {
      setSugerenciasCursos([]);
      setShowSugerenciasCursos(false);
      return;
    }
    
    try {
      const response = await axios.get('/api/sugerir-cursos-cruces', {
        params: { prefijo, limit: 10 }
      });
      setSugerenciasCursos(response.data.cursos);
      setShowSugerenciasCursos(true);
    } catch (err) {
      console.error('Error al buscar sugerencias de cursos:', err);
    }
  };

  const buscarSugerenciasProfesores = async (prefijo) => {
    if (prefijo.length < 2) {
      setSugerenciasProfesores([]);
      setShowSugerenciasProfesores(false);
      return;
    }
    
    try {
      const response = await axios.get('/api/sugerir-profesores', {
        params: { prefijo, limit: 10 }
      });
      setSugerenciasProfesores(response.data.profesores);
      setShowSugerenciasProfesores(true);
    } catch (err) {
      console.error('Error al buscar sugerencias de profesores:', err);
    }
  };

  const buscarPorCurso = async () => {
    if (!busquedaCurso || !cicloSeleccionado) {
      setError('Por favor ingrese el código/nombre del curso y seleccione un ciclo');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/cruces-avanzados-por-curso', {
        params: {
          curso: busquedaCurso,
          ciclo: cicloSeleccionado
        }
      });
      setDialogType('curso');
      setDialogData(response.data);
      setDialogOpen(true);
    } catch (err) {
      setError('Error al buscar cruces por curso');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const buscarPorProfesor = async () => {
    if (!busquedaProfesor || !profesorValido) {
      setError('Por favor seleccione un nombre válido de la lista de profesores');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/cruces-por-profesor', {
        params: {
          profesor: busquedaProfesor
        }
      });
      setDialogType('profesor');
      setDialogData(response.data);
      setDialogOpen(true);
    } catch (err) {
      setError('Error al buscar cruces por profesor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Datos para gráficos
  const chartData = {
    labels: ['Críticos', 'Peligrosos', 'Teóricos'],
    datasets: [
      {
        data: [
          estadisticasGenerales?.cruces_actuales?.cruces_criticos || 0,
          estadisticasGenerales?.cruces_actuales?.cruces_peligrosos || 0,
          estadisticasGenerales?.cruces_actuales?.cruces_teoricos || 0
        ],
        backgroundColor: [
          '#f44336',
          '#ff9800',
          '#4caf50'
        ],
        borderWidth: 2,
        borderColor: darkMode ? '#1e1e1e' : '#ffffff'
      }
    ]
  };

  const evolutionData = {
    labels: ['2024-1', '2024-2', '2025-1', '2025-2'],
    datasets: [
      {
        label: 'Total Cruces',
        data: [estadisticasGenerales?.cruces_actuales?.total_cruces || 0, 0, 0, 0],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Cruces Críticos',
        data: [estadisticasGenerales?.cruces_actuales?.cruces_criticos || 0, 0, 0, 0],
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: darkMode ? '#e3f2fd' : '#37474f',
          font: { size: 12 }
        }
      }
    }
  };

  // 2. Función para cargar cruces por ciclo del profesor
  const cargarCrucesPorCiclo = async (profesor) => {
    if (!profesor) return;
    try {
      const response = await axios.get('/api/cruces-por-profesor', {
        params: { profesor, relativo: '' }
      });
      // Agrupar por ciclo
      const agrupado = {};
      response.data.cruces.forEach(c => {
        const ciclo = c.relativo_profesor;
        if (!agrupado[ciclo]) agrupado[ciclo] = 0;
        agrupado[ciclo]++;
      });
      setCrucesPorCiclo(Object.entries(agrupado).map(([ciclo, total_cruces]) => ({ ciclo, total_cruces })));
    } catch (err) {
      setCrucesPorCiclo([]);
    }
  };

  // 3. Función para cargar ranking del profesor
  const cargarRankingProfesor = async (profesor, ciclo, historico) => {
    if (!profesor) return;
    setLoadingRanking(true);
    try {
      const response = await axios.get('/api/top-profesores-cruces', {
        params: { ciclo, historico, limit: 100 }
      });
      const idx = response.data.profesores.findIndex(p => (p.nombre_profesor || p.nombre) === profesor);
      setRankingProfesor(idx >= 0 ? idx + 1 : null);
    } catch (err) {
      setRankingProfesor(null);
    } finally {
      setLoadingRanking(false);
    }
  };

  // 4. Efecto para cargar cruces por ciclo y ranking al buscar profesor
  useEffect(() => {
    if (dialogType === 'profesor' && dialogData && dialogData.profesor_buscado) {
      cargarCrucesPorCiclo(dialogData.profesor_buscado);
      cargarRankingProfesor(dialogData.profesor_buscado, cicloSeleccionado, topHistorico);
    }
    // eslint-disable-next-line
  }, [dialogType, dialogData, cicloSeleccionado, topHistorico]);

  // 5. Filtro de tabla de cruces por tipo
  const crucesFiltrados = dialogData && dialogData.cruces
    ? dialogData.cruces.filter(c => tipoFiltro === 'Todos' || c.tipo_cruce_clasificado === tipoFiltro)
    : [];

  // 2. Cargar todos los profesores al montar la pantalla de Cruces por Profesor
  useEffect(() => {
    if (showCrucesPorProfesor) {
      axios.get('/api/todos-profesores').then(res => {
        setProfesores(res.data.profesores);
      });
    }
  }, [showCrucesPorProfesor]);

  // 3. Filtrar profesores por nombre
  const profesoresFiltrados = filtroProfesor.length > 0
    ? profesores.filter(p => p.nombre.toLowerCase().includes(filtroProfesor.toLowerCase()))
    : profesores;

  if (loading && !estadisticasGenerales) {
    return (
      <AdminLayout user={null}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          background: darkMode ? '#121212' : '#f8f9fa'
        }}>
          <CircularProgress size={60} sx={{ color: darkMode ? '#42a5f5' : '#1976d2' }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw', background: darkMode ? '#121212' : '#f8f9fa', transition: 'background 0.7s' }}>
      <AdminLayout user={null}>
        <Box
          sx={{
            flexGrow: 1,
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: darkMode ? '#121212' : '#f8f9fa',
            p: { xs: 2, sm: 4 },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 1400, mt: 4 }}>
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
                Gestión de Cruces
              </Typography>
            </Stack>

            {/* Botones de navegación principal */}
            {showDashboard && (
              <Fade in timeout={800}>
                <Grid container spacing={3} mb={4}>
                  <Grid item xs={12} md={4}>
                    <Card
                      elevation={0}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        background: darkMode ? '#1e1e1e' : '#ffffff',
                        border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                        boxShadow: darkMode ? '0 8px 32px rgba(66, 165, 245, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: darkMode ? '0 12px 40px rgba(66, 165, 245, 0.3)' : '0 12px 40px rgba(0, 0, 0, 0.12)',
                        },
                      }}
                      onClick={() => {
                        setShowDashboard(false);
                        setShowBusqueda(true);
                        setShowCrucesPorProfesor(false);
                        setShowCrucesPorCurso(false);
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Search sx={{ fontSize: 40, color: darkMode ? '#42a5f5' : '#1976d2' }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2', mb: 1 }}>
                            Búsqueda Avanzada
                          </Typography>
                          <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                            Buscar cruces específicos por curso o profesor
                          </Typography>
                        </Box>
                        <ArrowForward sx={{ ml: 'auto', color: darkMode ? '#42a5f5' : '#1976d2' }} />
                      </Stack>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Card
                      elevation={0}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        background: darkMode ? '#1e1e1e' : '#ffffff',
                        border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                        boxShadow: darkMode ? '0 8px 32px rgba(66, 165, 245, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: darkMode ? '0 12px 40px rgba(66, 165, 245, 0.3)' : '0 12px 40px rgba(0, 0, 0, 0.12)',
                        },
                      }}
                      onClick={() => {
                        setShowDashboard(false);
                        setShowBusqueda(false);
                        setShowCrucesPorProfesor(true);
                        setShowCrucesPorCurso(false);
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Person sx={{ fontSize: 40, color: darkMode ? '#42a5f5' : '#1976d2' }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2', mb: 1 }}>
                            Cruces por Profesor
                          </Typography>
                          <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                            Analizar cruces específicos de un profesor
                          </Typography>
                        </Box>
                        <ArrowForward sx={{ ml: 'auto', color: darkMode ? '#42a5f5' : '#1976d2' }} />
                      </Stack>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Card
                      elevation={0}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        background: darkMode ? '#1e1e1e' : '#ffffff',
                        border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                        boxShadow: darkMode ? '0 8px 32px rgba(66, 165, 245, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: darkMode ? '0 12px 40px rgba(66, 165, 245, 0.3)' : '0 12px 40px rgba(0, 0, 0, 0.12)',
                        },
                      }}
                      onClick={() => {
                        setShowDashboard(false);
                        setShowBusqueda(false);
                        setShowCrucesPorProfesor(false);
                        setShowCrucesPorCurso(true);
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <School sx={{ fontSize: 40, color: darkMode ? '#42a5f5' : '#1976d2' }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2', mb: 1 }}>
                            Cruces por Curso
                          </Typography>
                          <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                            Analizar cruces específicos de un curso
                          </Typography>
                        </Box>
                        <ArrowForward sx={{ ml: 'auto', color: darkMode ? '#42a5f5' : '#1976d2' }} />
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>
              </Fade>
            )}

            {/* Botón de regreso al dashboard */}
            {!showDashboard && (
              <Box sx={{ mb: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowDashboard(true);
                    setShowBusqueda(false);
                    setShowCrucesPorProfesor(false);
                    setShowCrucesPorCurso(false);
                    setShowResultados(false);
                  }}
                  startIcon={<Dashboard />}
                  sx={{
                    color: darkMode ? '#42a5f5' : '#1976d2',
                    borderColor: darkMode ? '#42a5f5' : '#1976d2',
                    borderRadius: 3,
                    px: 3,
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
                  Volver al Dashboard
                </Button>
              </Box>
            )}

            {/* Dashboard principal */}
            {showDashboard && (
              <Fade in timeout={800}>
                <Box>
                  {/* Controles del dashboard */}
                  <Card
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      background: darkMode ? '#1e1e1e' : '#ffffff',
                      border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                      boxShadow: darkMode ? '0 8px 32px rgba(66, 165, 245, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                      mb: 4,
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" flexWrap="wrap">
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          color: darkMode ? '#42a5f5' : '#1976d2', 
                          fontWeight: 'bold'
                        }}
                      >
                        Dashboard de Cruces
                      </Typography>
                      
                      <Stack direction="row" spacing={2} alignItems="center">
                        <FormControl fullWidth>
                          <InputLabel sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>Ciclo</InputLabel>
                          <Select
                            value={cicloSeleccionado}
                            onChange={(e) => setCicloSeleccionado(e.target.value)}
                            sx={{
                              borderRadius: 3,
                              background: darkMode ? '#1e1e1e' : '#f8f9fa',
                              border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                              '& .MuiOutlinedInput-notchedOutline': { borderColor: darkMode ? '#42a5f5' : '#1976d2' }
                            }}
                          >
                            <MenuItem value="241">2024-1</MenuItem>
                            <MenuItem value="242">2024-2</MenuItem>
                            <MenuItem value="251">2025-1</MenuItem>
                            <MenuItem value="252">2025-2</MenuItem>
                          </Select>
                        </FormControl>
                        
                        <Button
                          variant={topHistorico ? "contained" : "outlined"}
                          onClick={() => setTopHistorico(!topHistorico)}
                          startIcon={<Timeline />}
                          sx={{
                            color: darkMode ? '#e3f2fd' : '#37474f',
                            borderColor: darkMode ? '#42a5f5' : '#1976d2',
                            '&.MuiButton-contained': { backgroundColor: darkMode ? '#42a5f5' : '#1976d2', color: '#ffffff' }
                          }}
                        >
                          {topHistorico ? 'Histórico' : 'Actual'}
                        </Button>
                      </Stack>
                    </Stack>
                  </Card>

                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                      <CircularProgress size={60} sx={{ color: darkMode ? '#42a5f5' : '#1976d2' }} />
                    </Box>
                  ) : (
                    <Grid container spacing={3}>
                      {/* Estadísticas generales */}
                      <Grid item xs={12} md={3}>
                        <Card
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            background: darkMode ? '#2d2d2d' : '#f8f9fa',
                            border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h4" sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2', mb: 1 }}>
                            {estadisticasGenerales?.cruces_actuales?.total_cruces || 0}
                          </Typography>
                          <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                            Total de Cruces
                          </Typography>
                        </Card>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Card
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            background: darkMode ? '#2d2d2d' : '#f8f9fa',
                            border: darkMode ? '2px solid #f44336' : '2px solid #ffebee',
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f44336', mb: 1 }}>
                            {estadisticasGenerales?.cruces_actuales?.cruces_criticos || 0}
                          </Typography>
                          <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                            Cruces Críticos
                          </Typography>
                        </Card>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Card
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            background: darkMode ? '#2d2d2d' : '#f8f9fa',
                            border: darkMode ? '2px solid #ff9800' : '2px solid #fff3e0',
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800', mb: 1 }}>
                            {estadisticasGenerales?.cruces_actuales?.cruces_peligrosos || 0}
                          </Typography>
                          <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                            Cruces Peligrosos
                          </Typography>
                        </Card>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Card
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            background: darkMode ? '#2d2d2d' : '#f8f9fa',
                            border: darkMode ? '2px solid #4caf50' : '2px solid #e8f5e8',
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50', mb: 1 }}>
                            {estadisticasGenerales?.cruces_actuales?.cruces_teoricos || 0}
                          </Typography>
                          <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                            Cruces Teóricos
                          </Typography>
                        </Card>
                      </Grid>

                      {/* Diagrama circular de tipos de cruces */}
                      <Grid item xs={12} md={6}>
                        <Card
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            background: darkMode ? '#2d2d2d' : '#f8f9fa',
                            border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                            height: 400,
                          }}
                        >
                          <Typography variant="h6" sx={{ mb: 2, color: darkMode ? '#42a5f5' : '#1976d2', fontWeight: 'bold', textAlign: 'center' }}>
                            Distribución de Tipos de Cruces
                          </Typography>
                          <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Doughnut 
                              data={chartData} 
                              options={{
                                ...chartOptions,
                                plugins: {
                                  ...chartOptions.plugins,
                                  legend: {
                                    position: 'bottom',
                                    labels: {
                                      color: darkMode ? '#e3f2fd' : '#37474f',
                                      font: { size: 12 }
                                    }
                                  }
                                }
                              }}
                            />
                          </Box>
                        </Card>
                      </Grid>

                      {/* Gráfico de evolución */}
                      <Grid item xs={12} md={6}>
                        <Card
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            background: darkMode ? '#2d2d2d' : '#f8f9fa',
                            border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                            height: 400,
                          }}
                        >
                          <Typography variant="h6" sx={{ mb: 2, color: darkMode ? '#42a5f5' : '#1976d2', fontWeight: 'bold', textAlign: 'center' }}>
                            Evolución de Cruces
                          </Typography>
                          <Box sx={{ height: 300 }}>
                            <Line 
                              data={evolutionData} 
                              options={{
                                ...chartOptions,
                                scales: {
                                  x: {
                                    ticks: { color: darkMode ? '#e3f2fd' : '#37474f' },
                                    grid: { color: darkMode ? '#424242' : '#e0e0e0' }
                                  },
                                  y: {
                                    ticks: { color: darkMode ? '#e3f2fd' : '#37474f' },
                                    grid: { color: darkMode ? '#424242' : '#e0e0e0' }
                                  }
                                }
                              }}
                            />
                          </Box>
                        </Card>
                      </Grid>

                      {/* Top 20 Profesores con más cruces */}
                      <Grid item xs={12} md={6}>
                        <Card
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            background: darkMode ? '#2d2d2d' : '#f8f9fa',
                            border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                            height: 500,
                          }}
                        >
                          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6" sx={{ color: darkMode ? '#42a5f5' : '#1976d2', fontWeight: 'bold' }}>
                              Top 20 Profesores con más Cruces
                            </Typography>
                            {loadingTops && <CircularProgress size={20} />}
                          </Stack>
                          
                          <Box sx={{ height: 400, overflowY: 'auto' }}>
                            {topProfesores.length > 0 ? (
                              <TableContainer>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 'bold' }}>Profesor</TableCell>
                                      <TableCell sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 'bold' }}>Total</TableCell>
                                      <TableCell sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 'bold' }}>Críticos</TableCell>
                                      <TableCell sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 'bold' }}>Peligrosos</TableCell>
                                      <TableCell sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 'bold' }}>Teóricos</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {topProfesores.map((profesor, index) => (
                                      <TableRow key={profesor.codprofesor} hover>
                                        <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#37474f' }}>
                                          <Stack direction="row" alignItems="center" spacing={1}>
                                            <Chip 
                                              label={index + 1} 
                                              size="small" 
                                              sx={{ 
                                                backgroundColor: index < 3 ? '#f44336' : '#ff9800',
                                                color: '#fff',
                                                fontWeight: 'bold'
                                              }} 
                                            />
                                            <Typography variant="body2">{profesor.nombre_profesor || profesor.nombre}</Typography>
                                          </Stack>
                                        </TableCell>
                                        <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#37474f', fontWeight: 'bold' }}>
                                          {profesor.total_cruces}
                                        </TableCell>
                                        <TableCell>
                                          <Chip 
                                            label={profesor.criticos} 
                                            size="small" 
                                            sx={{ backgroundColor: '#f44336', color: '#fff' }} 
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Chip 
                                            label={profesor.peligrosos} 
                                            size="small" 
                                            sx={{ backgroundColor: '#ff9800', color: '#fff' }} 
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Chip 
                                            label={profesor.teoricos} 
                                            size="small" 
                                            sx={{ backgroundColor: '#1976d2', color: '#fff' }} 
                                          />
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            ) : (
                              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                                  No hay datos disponibles
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Card>
                      </Grid>

                      {/* Top 20 Cursos con más cruces */}
                      <Grid item xs={12} md={6}>
                        <Card
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            background: darkMode ? '#2d2d2d' : '#f8f9fa',
                            border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                            height: 500,
                          }}
                        >
                          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6" sx={{ color: darkMode ? '#42a5f5' : '#1976d2', fontWeight: 'bold' }}>
                              Top 20 Cursos con más Cruces
                            </Typography>
                            {loadingTops && <CircularProgress size={20} />}
                          </Stack>
                          
                          <Box sx={{ height: 400, overflowY: 'auto' }}>
                            {topCursos.length > 0 ? (
                              <TableContainer>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 'bold' }}>Curso</TableCell>
                                      <TableCell sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 'bold' }}>Total</TableCell>
                                      <TableCell sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 'bold' }}>Críticos</TableCell>
                                      <TableCell sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 'bold' }}>Secciones</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {topCursos.map((curso, index) => (
                                      <TableRow key={curso.codigo} hover>
                                        <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#37474f' }}>
                                          <Stack direction="row" alignItems="center" spacing={1}>
                                            <Chip 
                                              label={index + 1} 
                                              size="small" 
                                              sx={{ 
                                                backgroundColor: index < 3 ? '#f44336' : '#ff9800',
                                                color: '#fff',
                                                fontWeight: 'bold'
                                              }} 
                                            />
                                            <Box>
                                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                {curso.codigo || curso.curso_original}
                                              </Typography>
                                              <Typography variant="caption" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                                                {curso.nombre || curso.nombre_curso_original}
                                              </Typography>
                                            </Box>
                                          </Stack>
                                        </TableCell>
                                        <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#37474f', fontWeight: 'bold' }}>
                                          {curso.total_cruces}
                                        </TableCell>
                                        <TableCell>
                                          <Chip 
                                            label={curso.cruces_criticos} 
                                            size="small" 
                                            sx={{ backgroundColor: '#f44336', color: '#fff' }} 
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Chip 
                                            label={curso.total_secciones} 
                                            size="small" 
                                            sx={{ backgroundColor: '#4caf50', color: '#fff' }} 
                                          />
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            ) : (
                              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                                  No hay datos disponibles
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  )}
                </Box>
              </Fade>
            )}

            {/* Búsqueda avanzada */}
            {showBusqueda && (
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
                    Búsqueda Avanzada de Cruces
                  </Typography>

                  <Stack spacing={3}>
                    <Box sx={{ position: 'relative' }}>
                      <TextField
                        label="Código del Curso"
                        variant="outlined"
                        value={busquedaCurso}
                        onChange={(e) => {
                          setBusquedaCurso(e.target.value.toUpperCase());
                          buscarSugerenciasCursos(e.target.value);
                        }}
                        onFocus={() => {
                          if (busquedaCurso.length >= 2) {
                            buscarSugerenciasCursos(busquedaCurso);
                          }
                        }}
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
                      
                      {/* Sugerencias de cursos */}
                      {showSugerenciasCursos && sugerenciasCursos.length > 0 && (
                        <Paper
                          elevation={8}
                          className="sugerencias-container"
                          sx={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            zIndex: 1000,
                            maxHeight: 200,
                            overflowY: 'auto',
                            background: darkMode ? '#2d2d2d' : '#ffffff',
                            border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                            borderRadius: 2,
                          }}
                        >
                          <List dense>
                            {sugerenciasCursos.map((curso) => (
                              <ListItem
                                key={curso.codigo}
                                button
                                onClick={() => {
                                  setBusquedaCurso(curso.codigo);
                                  setShowSugerenciasCursos(false);
                                }}
                                sx={{
                                  '&:hover': {
                                    background: darkMode ? '#424242' : '#f5f5f5',
                                  },
                                }}
                              >
                                <ListItemText
                                  primary={
                                    <Typography variant="body2" sx={{ color: darkMode ? '#e3f2fd' : '#37474f', fontWeight: 'bold' }}>
                                      {curso.codigo}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography variant="caption" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                                      {curso.nombre}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      )}
                    </Box>

                    <Box sx={{ position: 'relative' }}>
                      <TextField
                        label="Nombre del Profesor"
                        variant="outlined"
                        value={busquedaProfesor}
                        onChange={(e) => {
                          setBusquedaProfesor(e.target.value);
                          if (e.target.value.length > 0) {
                            buscarSugerenciasProfesores(e.target.value);
                          } else {
                            setSugerenciasProfesores([]);
                            setShowSugerenciasProfesores(false);
                          }
                          // Validar si el nombre coincide exactamente con una sugerencia
                          setProfesorValido(sugerenciasProfesores.some(p => p.nombre === e.target.value));
                        }}
                        onFocus={() => {
                          if (busquedaProfesor.length > 0) {
                            buscarSugerenciasProfesores(busquedaProfesor);
                          }
                        }}
                        onBlur={() => {
                          setTimeout(() => setShowSugerenciasProfesores(false), 120);
                        }}
                        error={busquedaProfesor.length > 0 && !profesorValido}
                        helperText={busquedaProfesor.length > 0 && !profesorValido ? 'Seleccione un nombre válido de la lista' : ''}
                        placeholder="Ej: Juan García"
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
                      
                      {/* Sugerencias de profesores */}
                      {showSugerenciasProfesores && sugerenciasProfesores.length > 0 && (
                        <Paper
                          elevation={8}
                          className="sugerencias-container"
                          sx={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            zIndex: 1000,
                            maxHeight: 200,
                            overflowY: 'auto',
                            background: darkMode ? '#2d2d2d' : '#ffffff',
                            border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                            borderRadius: 2,
                          }}
                        >
                          <List dense>
                            {sugerenciasProfesores.map((profesor) => (
                              <ListItem
                                key={profesor.codprofesor}
                                button
                                onClick={() => {
                                  setBusquedaProfesor(profesor.nombre);
                                  setShowSugerenciasProfesores(false);
                                  setProfesorValido(true);
                                }}
                                sx={{
                                  '&:hover': {
                                    background: darkMode ? '#424242' : '#f5f5f5',
                                  },
                                  cursor: 'pointer',
                                }}
                              >
                                <ListItemText
                                  primary={
                                    <Typography variant="body2" sx={{ color: darkMode ? '#e3f2fd' : '#37474f' }}>
                                      {profesor.nombre}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      )}
                    </Box>

                    <Button
                      variant="contained"
                      onClick={buscarPorCurso}
                      disabled={(!busquedaCurso && !busquedaProfesor) || loading}
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
                      {loading ? 'Buscando...' : 'Buscar Cruces'}
                    </Button>
                  </Stack>
                </Card>
              </Fade>
            )}

            {/* Pantalla de Cruces por Profesor */}
            {showCrucesPorProfesor && (
              <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto', mt: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, color: darkMode ? '#42a5f5' : '#1976d2', fontWeight: 'bold', textAlign: 'left' }}>
                  Profesores
                </Typography>
                <TextField
                  label="Filtrar por nombre"
                  variant="outlined"
                  value={filtroProfesor}
                  onChange={e => setFiltroProfesor(e.target.value)}
                  placeholder="Ej: Juan García"
                  sx={{ mb: 2, width: 320 }}
                />
                <TableContainer sx={{ maxHeight: 600, borderRadius: 3, boxShadow: darkMode ? '0 8px 32px rgba(66, 165, 245, 0.08)' : '0 8px 32px rgba(0,0,0,0.06)' }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Código</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {profesoresFiltrados.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} align="center">No hay profesores registrados</TableCell>
                        </TableRow>
                      ) : (
                        profesoresFiltrados.map((prof) => (
                          <TableRow key={prof.codprofesor} hover>
                            <TableCell>{prof.nombre}</TableCell>
                            <TableCell>{prof.codprofesor}</TableCell>
                            <TableCell>
                              <IconButton onClick={() => navigate(`/gestion-cruces/profesor/${prof.codprofesor}`)}>
                                <ArrowForward sx={{ color: darkMode ? '#42a5f5' : '#1976d2' }} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* Pantalla de Cruces por Curso */}
            {showCrucesPorCurso && (
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
                    Análisis de Cruces por Curso
                  </Typography>

                  <Stack spacing={3}>
                    <Box sx={{ position: 'relative' }}>
                      <TextField
                        label="Código del Curso"
                        variant="outlined"
                        value={busquedaCurso}
                        onChange={(e) => {
                          setBusquedaCurso(e.target.value.toUpperCase());
                          buscarSugerenciasCursos(e.target.value);
                        }}
                        onFocus={() => {
                          if (busquedaCurso.length >= 2) {
                            buscarSugerenciasCursos(busquedaCurso);
                          }
                        }}
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
                      
                      {/* Sugerencias de cursos */}
                      {showSugerenciasCursos && sugerenciasCursos.length > 0 && (
                        <Paper
                          elevation={8}
                          className="sugerencias-container"
                          sx={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            zIndex: 1000,
                            maxHeight: 200,
                            overflowY: 'auto',
                            background: darkMode ? '#2d2d2d' : '#ffffff',
                            border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                            borderRadius: 2,
                          }}
                        >
                          <List dense>
                            {sugerenciasCursos.map((curso) => (
                              <ListItem
                                key={curso.codigo}
                                button
                                onClick={() => {
                                  setBusquedaCurso(curso.codigo);
                                  setShowSugerenciasCursos(false);
                                }}
                                sx={{
                                  '&:hover': {
                                    background: darkMode ? '#424242' : '#f5f5f5',
                                  },
                                }}
                              >
                                <ListItemText
                                  primary={
                                    <Typography variant="body2" sx={{ color: darkMode ? '#e3f2fd' : '#37474f', fontWeight: 'bold' }}>
                                      {curso.codigo}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography variant="caption" sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>
                                      {curso.nombre}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      )}
                    </Box>

                    <FormControl fullWidth>
                      <InputLabel sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>Ciclo</InputLabel>
                      <Select
                        value={cicloSeleccionado}
                        onChange={(e) => setCicloSeleccionado(e.target.value)}
                        sx={{
                          borderRadius: 3,
                          background: darkMode ? '#1e1e1e' : '#f8f9fa',
                          border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: darkMode ? '#42a5f5' : '#1976d2' }
                        }}
                      >
                        <MenuItem value="241">2024-1</MenuItem>
                        <MenuItem value="242">2024-2</MenuItem>
                        <MenuItem value="251">2025-1</MenuItem>
                        <MenuItem value="252">2025-2</MenuItem>
                      </Select>
                    </FormControl>

                    <Button
                      variant="contained"
                      onClick={buscarPorCurso}
                      disabled={!busquedaCurso || loading}
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <School />}
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
                      {loading ? 'Analizando...' : 'Analizar Cruces del Curso'}
                    </Button>
                  </Stack>
                </Card>
              </Fade>
            )}

            {/* Diálogo de resultados */}
            <Dialog 
              open={dialogOpen} 
              onClose={() => setDialogOpen(false)}
              maxWidth="xl"
              fullWidth
            >
              <DialogTitle sx={{ 
                background: darkMode ? '#1e1e1e' : '#ffffff',
                color: darkMode ? '#42a5f5' : '#1976d2',
                fontWeight: 'bold'
              }}>
                {dialogType === 'curso' ? 'Cruces del Curso' : 'Cruces del Profesor'}
                <IconButton
                  onClick={() => setDialogOpen(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <Close />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ background: darkMode ? '#1e1e1e' : '#ffffff' }}>
                {dialogData && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: darkMode ? '#e3f2fd' : '#37474f' }}>
                      {dialogType === 'curso' 
                        ? `Curso: ${dialogData.curso_buscado} - Total de cruces: ${dialogData.total_cruces}`
                        : `Profesor: ${dialogData.profesor_buscado} - Total de cruces: ${dialogData.total_cruces}`
                      }
                    </Typography>
                    
                    {/* Filtro de tipo de cruce */}
                    <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ color: darkMode ? '#90caf9' : '#37474f', fontWeight: 600 }}>Filtrar por tipo de cruce:</Typography>
                      {['Todos', 'Crítico', 'Peligroso', 'Teórico'].map(tipo => (
                        <Chip
                          key={tipo}
                          label={tipo}
                          color={tipoFiltro === tipo ? (tipo === 'Crítico' ? 'error' : tipo === 'Peligroso' ? 'warning' : tipo === 'Teórico' ? 'primary' : 'default') : 'default'}
                          variant={tipoFiltro === tipo ? 'filled' : 'outlined'}
                          onClick={() => setTipoFiltro(tipo)}
                          sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                        />
                      ))}
                    </Box>

                    {/* Tabla de cruces filtrada */}
                    {dialogType === 'curso' && (
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow sx={{ background: darkMode ? '#2d2d2d' : '#f8f9fa' }}>
                              <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Curso</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Sección</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Profesor</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Día</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Hora</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Curso Cruce</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Sección Cruce</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Profesor Cruce</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Tipo Cruce</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Horas Cruce</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {crucesFiltrados.map((cruce, idx) => (
                              <TableRow key={idx} sx={{ '&:nth-of-type(odd)': { background: darkMode ? '#2d2d2d' : '#f8f9fa' } }}>
                                <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#37474f' }}>{cruce.curso_original}</TableCell>
                                <TableCell>
                                  <Chip label={cruce.seccion_original} size="small" sx={{ background: darkMode ? 'rgba(66, 165, 245, 0.2)' : '#e3f2fd', color: darkMode ? '#42a5f5' : '#1976d2' }} />
                                </TableCell>
                                <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#37474f' }}>{cruce.profesor_original}</TableCell>
                                <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#37474f' }}>{cruce.dia}</TableCell>
                                <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#37474f' }}>{`${cruce.hora_inicio_original} - ${cruce.hora_fin_original}`}</TableCell>
                                <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#37474f' }}>{cruce.curso_cruce}</TableCell>
                                <TableCell>
                                  <Chip label={cruce.seccion_cruce} size="small" sx={{ background: darkMode ? 'rgba(66, 165, 245, 0.2)' : '#e3f2fd', color: darkMode ? '#42a5f5' : '#1976d2' }} />
                                </TableCell>
                                <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#37474f' }}>{cruce.profesor_cruce}</TableCell>
                                <TableCell>
                                  <Chip label={cruce.tipo_cruce_clasificado} size="small" color={cruce.tipo_cruce_clasificado === 'Crítico' ? 'error' : cruce.tipo_cruce_clasificado === 'Peligroso' ? 'warning' : 'primary'} sx={{ fontWeight: 'bold' }} />
                                </TableCell>
                                <TableCell sx={{ color: darkMode ? '#e3f2fd' : '#37474f' }}>{cruce.horas_cruce}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}

                    {/* Gráfico de cruces por ciclo */}
                    {crucesPorCiclo.length > 0 && (
                      <Box sx={{ mt: 4 }}>
                        <Typography variant="subtitle1" sx={{ color: darkMode ? '#90caf9' : '#37474f', fontWeight: 600, mb: 1 }}>Cruces por ciclo</Typography>
                        <Bar
                          data={{
                            labels: crucesPorCiclo.map(c => c.ciclo),
                            datasets: [{
                              label: 'Total de Cruces',
                              data: crucesPorCiclo.map(c => c.total_cruces),
                              backgroundColor: '#42a5f5',
                            }]
                          }}
                          options={{
                            responsive: true,
                            plugins: { legend: { display: false } },
                            scales: { y: { beginAtZero: true } }
                          }}
                          height={200}
                        />
                      </Box>
                    )}

                    {/* Ranking del profesor en el top */}
                    <Box sx={{ mt: 4, mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ color: darkMode ? '#90caf9' : '#37474f', fontWeight: 600 }}>
                        Ranking en el Top Profesores (Ciclo {topHistorico ? 'Histórico' : cicloSeleccionado}):
                      </Typography>
                      {loadingRanking ? (
                        <CircularProgress size={20} />
                      ) : rankingProfesor ? (
                        <Chip label={`#${rankingProfesor}`} color="primary" sx={{ fontWeight: 'bold', fontSize: 18, ml: 2 }} />
                      ) : (
                        <Typography variant="body2" sx={{ color: '#f44336', ml: 2 }}>No aparece en el top</Typography>
                      )}
                    </Box>

                    {/* Selector de ciclo/histórico */}
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>Ciclo</InputLabel>
                        <Select
                          value={cicloSeleccionado}
                          onChange={(e) => setCicloSeleccionado(e.target.value)}
                          sx={{ color: darkMode ? '#e3f2fd' : '#37474f', '& .MuiOutlinedInput-notchedOutline': { borderColor: darkMode ? '#42a5f5' : '#1976d2' } }}
                        >
                          <MenuItem value="241">2024-1</MenuItem>
                          <MenuItem value="242">2024-2</MenuItem>
                          <MenuItem value="251">2025-1</MenuItem>
                          <MenuItem value="252">2025-2</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                        variant={topHistorico ? "contained" : "outlined"}
                        onClick={() => setTopHistorico(!topHistorico)}
                        startIcon={<Timeline />}
                        sx={{ color: darkMode ? '#e3f2fd' : '#37474f', borderColor: darkMode ? '#42a5f5' : '#1976d2', '&.MuiButton-contained': { backgroundColor: darkMode ? '#42a5f5' : '#1976d2', color: '#ffffff' } }}
                      >
                        {topHistorico ? 'Histórico' : 'Actual'}
                      </Button>
                    </Stack>
                  </Box>
                )}
              </DialogContent>
              <DialogActions sx={{ background: darkMode ? '#1e1e1e' : '#ffffff' }}>
                <Button onClick={() => setDialogOpen(false)} sx={{ color: darkMode ? '#42a5f5' : '#1976d2' }}>
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        </Box>
      </AdminLayout>
    </Box>
  );
};

export default GestionCruces; 