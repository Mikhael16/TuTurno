import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Stack, 
  Typography, 
  Paper, 
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SchoolIcon from '@mui/icons-material/School';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WarningIcon from '@mui/icons-material/Warning';
import DownloadIcon from '@mui/icons-material/Download';
import AdminLayout from './AdminLayout';
import axios from 'axios';

const departamentos = [
  { codigo: 'CCBB', nombre: 'Ciencias Básicas' },
  { codigo: 'SITE', nombre: 'Sistemas y Telemática' },
  { codigo: 'GEPR', nombre: 'Gestión de la Producción' },
  { codigo: 'TECN', nombre: 'Tecnología' },
  { codigo: 'HUCS', nombre: 'Humanidades y Ciencias Sociales' },
  { codigo: 'SOFT', nombre: 'Software' }
];

const carreras = [
  { codigo: 'I1', nombre: 'Ingeniería Industrial' },
  { codigo: 'I2', nombre: 'Ingeniería de Sistemas' },
  { codigo: 'I3', nombre: 'Ingeniería de Software' }
];

const Reportes = ({ onVolver, user }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCiclo, setOpenDialogCiclo] = useState(false);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
  const [carreraSeleccionada, setCarreraSeleccionada] = useState('');
  const [vacantes, setVacantes] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingCiclo, setLoadingCiclo] = useState(false);
  const [error, setError] = useState('');
  const [errorCiclo, setErrorCiclo] = useState('');
  const [successCiclo, setSuccessCiclo] = useState('');
  const [datosReporte, setDatosReporte] = useState([]);
  const [datosReporteCiclo, setDatosReporteCiclo] = useState([]);

  const handleDescargarPronosticoDepartamento = () => {
    setOpenDialog(true);
    setError('');
    setDatosReporte([]);
  };

  const handleDescargarPronosticoCiclo = () => {
    setOpenDialogCiclo(true);
    setErrorCiclo('');
    setSuccessCiclo('');
    setDatosReporteCiclo([]);
  };

  const handleGenerarReporte = async () => {
    if (!departamentoSeleccionado || !vacantes) {
      setError('Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/reporte-pronostico-departamento', {
        departamento: departamentoSeleccionado,
        vacantes_por_seccion: parseInt(vacantes)
      });

      if (response.data.success) {
        setDatosReporte(response.data.datos);
        generarExcel(response.data.datos);
        setOpenDialog(false);
      } else {
        setError(response.data.error || 'Error al generar el reporte');
      }
    } catch (err) {
      setError('Error al generar el reporte. Verifique la conexión.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerarReporteCiclo = async () => {
    if (!carreraSeleccionada || !vacantes) {
      setErrorCiclo('Por favor complete todos los campos');
      return;
    }

    setLoadingCiclo(true);
    setErrorCiclo('');
    setSuccessCiclo('');

    try {
      const response = await axios.post('/api/reporte-pronostico-ciclo-relativo', {
        carrera: carreraSeleccionada,
        vacantes_por_seccion: parseInt(vacantes)
      });

      if (response.data.success) {
        setDatosReporteCiclo(response.data.datos);
        setSuccessCiclo(`✅ Datos generados exitosamente: ${response.data.total_cursos} cursos, ${response.data.total_secciones} secciones`);
        console.log('Datos recibidos:', response.data.datos);
      } else {
        setErrorCiclo(response.data.error || 'Error al generar el reporte');
      }
    } catch (err) {
      setErrorCiclo('Error al generar el reporte. Verifique la conexión.');
      console.error('Error:', err);
    } finally {
      setLoadingCiclo(false);
    }
  };

  const generarExcel = (datos) => {
    // Importar xlsx dinámicamente
    import('xlsx').then(XLSX => {
      // Crear el workbook
      const wb = XLSX.utils.book_new();
      
      // Preparar los datos para el Excel
      const excelData = [];
      
      // Agrupar por curso
      const cursosAgrupados = {};
      datos.forEach(item => {
        if (!cursosAgrupados[item.nombre_curso]) {
          cursosAgrupados[item.nombre_curso] = [];
        }
        cursosAgrupados[item.nombre_curso].push(item);
      });

      // Crear filas para el Excel
      Object.keys(cursosAgrupados).forEach(nombreCurso => {
        const secciones = cursosAgrupados[nombreCurso];
        
        secciones.forEach((seccion, index) => {
          excelData.push({
            'Nombre del Curso': index === 0 ? nombreCurso : '', // Solo en la primera fila
            'Sección': seccion.seccion,
            'Profesor Teoría': seccion.profesor_teoria,
            'Matriculados Pronosticados': seccion.matriculados_pronosticados
          });
        });
      });

      // Crear la hoja
      const ws = XLSX.utils.json_to_sheet(excelData);
      
      // Combinar celdas para nombres de cursos
      let filaActual = 1;
      Object.keys(cursosAgrupados).forEach(nombreCurso => {
        const secciones = cursosAgrupados[nombreCurso];
        if (secciones.length > 1) {
          ws['!merges'] = ws['!merges'] || [];
          ws['!merges'].push({
            s: { r: filaActual - 1, c: 0 },
            e: { r: filaActual + secciones.length - 2, c: 0 }
          });
        }
        filaActual += secciones.length;
      });

      // Agregar la hoja al workbook
      const departamento = departamentos.find(d => d.codigo === departamentoSeleccionado);
      const nombreArchivo = `Pronostico_${departamento?.nombre}_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, nombreArchivo);
    });
  };

  const generarExcelCiclo = (datos, carrera) => {
    console.log('Iniciando generación de Excel ciclo relativo...');
    console.log('Datos recibidos:', datos);
    console.log('Carrera:', carrera);
    
    // Importar xlsx dinámicamente
    import('xlsx').then(XLSX => {
      console.log('Librería XLSX cargada correctamente');
      
      try {
        // Crear el workbook
        const wb = XLSX.utils.book_new();
        console.log('Workbook creado');
        
        // Preparar los datos para el Excel - versión simplificada
        const excelData = datos.map(item => ({
          'Ciclo': item.ciclo,
          'Código del Curso': item.codigo_curso,
          'Nombre del Curso': item.nombre_curso,
          'Sección': item.seccion,
          'Profesor Teoría': item.profesor_teoria,
          'Matriculados Pronosticados': item.matriculados_pronosticados
        }));
        
        console.log('Datos preparados para Excel:', excelData);

        // Crear la hoja
        const ws = XLSX.utils.json_to_sheet(excelData);
        console.log('Worksheet creado');

        // Agregar la hoja al workbook
        const carreraNombre = carreras.find(c => c.codigo === carrera)?.nombre || carrera;
        // Acortar el nombre de la hoja para que no exceda 31 caracteres
        const nombreHoja = `Pronostico ${carrera}`;
        XLSX.utils.book_append_sheet(wb, ws, nombreHoja);
        console.log('Hoja agregada al workbook');

        // Descargar el archivo
        const nombreArchivo = `Pronostico_Ciclo_${carrera}_${new Date().toISOString().split('T')[0]}.xlsx`;
        console.log('Descargando archivo:', nombreArchivo);
        
        XLSX.writeFile(wb, nombreArchivo);
        console.log('Archivo descargado exitosamente');
        
        // Mostrar mensaje de éxito
        alert(`✅ Archivo descargado: ${nombreArchivo}`);
        
      } catch (error) {
        console.error('Error al generar Excel:', error);
        alert(`❌ Error al generar el archivo Excel: ${error.message}`);
      }
    }).catch(error => {
      console.error('Error al cargar librería XLSX:', error);
      alert('❌ Error al cargar la librería para generar Excel. Verifique su conexión a internet.');
    });
  };

  return (
    <AdminLayout user={user}>
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6, p: 3 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2', textAlign: 'center' }}>
            Reportes y Descargas
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
            Pronóstico de Demanda
          </Typography>
          <Stack direction="column" spacing={2} mb={4}>
            <Button variant="contained" color="primary" startIcon={<SchoolIcon />} size="large" fullWidth>
              Descargar pronóstico por curso
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<ApartmentIcon />} 
              size="large" 
              fullWidth
              onClick={handleDescargarPronosticoDepartamento}
            >
              Descargar pronóstico por departamento
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<DateRangeIcon />} 
              size="large" 
              fullWidth
              onClick={handleDescargarPronosticoCiclo}
            >
              Descargar pronóstico por ciclo relativo
            </Button>
            <Button variant="contained" color="primary" startIcon={<GroupWorkIcon />} size="large" fullWidth>
              Descargar pronóstico por carrera
            </Button>
          </Stack>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 2, color: '#d32f2f' }}>
            Cruces Críticos
          </Typography>
          <Stack direction="column" spacing={2} mb={4}>
            <Button variant="outlined" color="error" startIcon={<WarningIcon />} size="large" fullWidth>
              Descargar cruces críticos por docente
            </Button>
            <Button variant="outlined" color="error" startIcon={<WarningIcon />} size="large" fullWidth>
              Descargar cruces críticos por curso
            </Button>
          </Stack>
          <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon />} size="large" fullWidth onClick={onVolver}>
            Volver
          </Button>
        </Paper>
      </Box>

      {/* Dialog para reporte por departamento */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Generar Reporte por Departamento
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Departamento</InputLabel>
              <Select
                value={departamentoSeleccionado}
                onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
                label="Departamento"
              >
                {departamentos.map((dept) => (
                  <MenuItem key={dept.codigo} value={dept.codigo}>
                    {dept.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Vacantes por sección"
              type="number"
              value={vacantes}
              onChange={(e) => setVacantes(e.target.value)}
              sx={{ mb: 3 }}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {datosReporte.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Vista previa del reporte:
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Curso</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Sección</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Profesor Teoría</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Matriculados</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {datosReporte.slice(0, 10).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.nombre_curso}</TableCell>
                          <TableCell>{item.seccion}</TableCell>
                          <TableCell>{item.profesor_teoria}</TableCell>
                          <TableCell>{item.matriculados_pronosticados}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {datosReporte.length > 10 && (
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    Mostrando 10 de {datosReporte.length} registros...
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button 
            onClick={handleGenerarReporte} 
            variant="contained" 
            startIcon={loading ? <CircularProgress size={20} /> : <DownloadIcon />}
            disabled={loading || !departamentoSeleccionado || !vacantes}
          >
            {loading ? 'Generando...' : 'Generar y Descargar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para reporte por ciclo relativo */}
      <Dialog open={openDialogCiclo} onClose={() => setOpenDialogCiclo(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Generar Reporte por Ciclo Relativo
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Carrera Profesional</InputLabel>
              <Select
                value={carreraSeleccionada}
                onChange={(e) => setCarreraSeleccionada(e.target.value)}
                label="Carrera Profesional"
              >
                {carreras.map((carrera) => (
                  <MenuItem key={carrera.codigo} value={carrera.codigo}>
                    {carrera.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Vacantes por sección"
              type="number"
              value={vacantes}
              onChange={(e) => setVacantes(e.target.value)}
              sx={{ mb: 3 }}
            />

            {errorCiclo && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorCiclo}
              </Alert>
            )}

            {successCiclo && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successCiclo}
              </Alert>
            )}

            {datosReporteCiclo.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Vista previa del reporte:
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Ciclo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Curso</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Sección</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Profesor Teoría</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Matriculados</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {datosReporteCiclo.slice(0, 10).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.ciclo}</TableCell>
                          <TableCell>{item.nombre_curso}</TableCell>
                          <TableCell>{item.seccion}</TableCell>
                          <TableCell>{item.profesor_teoria}</TableCell>
                          <TableCell>{item.matriculados_pronosticados}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {datosReporteCiclo.length > 10 && (
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    Mostrando 10 de {datosReporteCiclo.length} registros...
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogCiclo(false)}>Cancelar</Button>
          <Button 
            onClick={handleGenerarReporteCiclo} 
            variant="contained" 
            startIcon={loadingCiclo ? <CircularProgress size={20} /> : <DownloadIcon />}
            disabled={loadingCiclo || !carreraSeleccionada || !vacantes || datosReporteCiclo.length > 0}
          >
            {loadingCiclo ? 'Generando...' : 'Generar datos'}
          </Button>
          <Button
            onClick={() => {
              console.log('Descargando Excel ciclo relativo', datosReporteCiclo, carreraSeleccionada);
              if (datosReporteCiclo.length > 0) {
                generarExcelCiclo(datosReporteCiclo, carreraSeleccionada);
              } else {
                alert('No hay datos para descargar');
              }
            }}
            variant="contained"
            color="success"
            startIcon={<DownloadIcon />}
            disabled={datosReporteCiclo.length === 0}
          >
            DESCARGAR PRONOSTICO POR CICLO RELATIVO
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default Reportes; 