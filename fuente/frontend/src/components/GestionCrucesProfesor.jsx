import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Paper, Select, MenuItem, FormControl, InputLabel, Button, CircularProgress, Stack
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Timeline } from '@mui/icons-material';
import axios from 'axios';

const tiposCruce = ['Todos', 'Crítico', 'Peligroso', 'Teórico'];

const GestionCrucesProfesor = ({ darkMode, setDarkMode }) => {
  const { codprofesor } = useParams();
  const [profesor, setProfesor] = useState(null);
  const [ciclo, setCiclo] = useState('241');
  const [historico, setHistorico] = useState(false);
  const [cruces, setCruces] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [ranking, setRanking] = useState(null);
  const [loadingRanking, setLoadingRanking] = useState(false);
  const [crucesPorCiclo, setCrucesPorCiclo] = useState([]);

  useEffect(() => {
    axios.get('/api/todos-profesores').then(res => {
      const prof = res.data.profesores.find(p => String(p.codprofesor) === String(codprofesor));
      setProfesor(prof);
    });
  }, [codprofesor]);

  useEffect(() => {
    if (!profesor) return;
    setLoading(true);
    axios.get('/api/cruces-por-profesor', {
      params: { profesor: profesor.nombre, relativo: historico ? '' : ciclo }
    }).then(res => {
      setCruces(res.data.cruces || []);
      // Agrupar cruces por ciclo para el gráfico
      const agrupado = {};
      (res.data.cruces || []).forEach(c => {
        const ciclo = c.relativo_profesor;
        if (!agrupado[ciclo]) agrupado[ciclo] = 0;
        agrupado[ciclo]++;
      });
      setCrucesPorCiclo(Object.entries(agrupado).map(([ciclo, total_cruces]) => ({ ciclo, total_cruces })));
      setLoading(false);
    });
    setLoadingRanking(true);
    axios.get('/api/top-profesores-cruces', {
      params: { ciclo, historico, limit: 100 }
    }).then(res => {
      const idx = res.data.profesores.findIndex(p => String(p.codprofesor) === String(codprofesor));
      setRanking(idx >= 0 ? idx + 1 : null);
      setLoadingRanking(false);
    });
  }, [profesor, ciclo, historico, codprofesor]);

  const crucesFiltrados = tipoFiltro === 'Todos' ? cruces : cruces.filter(c => c.tipo_cruce_clasificado === tipoFiltro);

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: darkMode ? '#181c2a' : '#f4f6fa', p: 0, m: 0 }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', pt: 4, pb: 8 }}>
        <Typography variant="h3" sx={{ mb: 2, color: darkMode ? '#42a5f5' : '#1976d2', fontWeight: 'bold', textAlign: 'center' }}>
          Cruces de {profesor ? profesor.nombre : '...'}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: darkMode ? '#90caf9' : '#546e7a' }}>Ciclo</InputLabel>
            <Select
              value={ciclo}
              onChange={e => setCiclo(e.target.value)}
              disabled={historico}
              sx={{ color: darkMode ? '#e3f2fd' : '#37474f', '& .MuiOutlinedInput-notchedOutline': { borderColor: darkMode ? '#42a5f5' : '#1976d2' } }}
            >
              <MenuItem value="241">2024-1</MenuItem>
              <MenuItem value="242">2024-2</MenuItem>
              <MenuItem value="251">2025-1</MenuItem>
              <MenuItem value="252">2025-2</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant={historico ? 'contained' : 'outlined'}
            onClick={() => setHistorico(!historico)}
            startIcon={<Timeline />}
            sx={{ color: darkMode ? '#e3f2fd' : '#37474f', borderColor: darkMode ? '#42a5f5' : '#1976d2', '&.MuiButton-contained': { backgroundColor: darkMode ? '#42a5f5' : '#1976d2', color: '#ffffff' } }}
          >
            {historico ? 'Histórico' : 'Actual'}
          </Button>
        </Stack>
        {/* Filtro de tipo de cruce */}
        <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="subtitle1" sx={{ color: darkMode ? '#90caf9' : '#37474f', fontWeight: 600 }}>Filtrar por tipo de cruce:</Typography>
          {tiposCruce.map(tipo => (
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
        {/* Tabla de cruces */}
        <Paper sx={{ mb: 4, borderRadius: 3, boxShadow: darkMode ? '0 8px 32px rgba(66, 165, 245, 0.08)' : '0 8px 32px rgba(0,0,0,0.06)' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ background: darkMode ? '#2d2d2d' : '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Curso</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Sección</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Día</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Hora</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Curso Cruce</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Profesor Cruce</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Tipo Cruce</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: darkMode ? '#42a5f5' : '#1976d2' }}>Horas Cruce</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={8} align="center"><CircularProgress /></TableCell></TableRow>
                ) : crucesFiltrados.length === 0 ? (
                  <TableRow><TableCell colSpan={8} align="center">No hay cruces para mostrar</TableCell></TableRow>
                ) : (
                  crucesFiltrados.map((cruce, idx) => (
                    <TableRow key={idx} sx={{ '&:nth-of-type(odd)': { background: darkMode ? '#2d2d2d' : '#f8f9fa' } }}>
                      <TableCell>{cruce.nombre_curso_profesor}</TableCell>
                      <TableCell>{cruce.seccion_profesor}</TableCell>
                      <TableCell>{cruce.dia}</TableCell>
                      <TableCell>{`${cruce.hora_inicio_profesor} - ${cruce.hora_fin_profesor}`}</TableCell>
                      <TableCell>{cruce.nombre_curso_interes}</TableCell>
                      <TableCell>{cruce.profesor_interes}</TableCell>
                      <TableCell>
                        <Chip label={cruce.tipo_cruce_clasificado} size="small" color={cruce.tipo_cruce_clasificado === 'Crítico' ? 'error' : cruce.tipo_cruce_clasificado === 'Peligroso' ? 'warning' : 'primary'} sx={{ fontWeight: 'bold' }} />
                      </TableCell>
                      <TableCell>{cruce.horas_cruce}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* Gráfico de cruces por ciclo */}
        {crucesPorCiclo.length > 0 && (
          <Box sx={{ mt: 4, maxWidth: 700, mx: 'auto' }}>
            <Typography variant="subtitle1" sx={{ color: darkMode ? '#90caf9' : '#37474f', fontWeight: 600, mb: 1, textAlign: 'center' }}>Cruces por ciclo</Typography>
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
        <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
          <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 4, background: darkMode ? '#23263a' : '#fff' }}>
            <Typography variant="subtitle2" sx={{ color: darkMode ? '#90caf9' : '#37474f', fontWeight: 600 }}>
              Ranking en el Top Profesores ({historico ? 'Histórico' : ciclo}):
            </Typography>
            {loadingRanking ? (
              <CircularProgress size={20} />
            ) : ranking ? (
              <Chip label={`#${ranking}`} color="primary" sx={{ fontWeight: 'bold', fontSize: 18, ml: 2 }} />
            ) : (
              <Typography variant="body2" sx={{ color: '#f44336', ml: 2 }}>No aparece en el top</Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default GestionCrucesProfesor; 