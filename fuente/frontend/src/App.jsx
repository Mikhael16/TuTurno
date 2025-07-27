import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Alumnos from './components/Alumnos';
import GeneralDashboard from './components/GeneralDashboard';
import CursosPorDepartamento from './components/CursosPorDepartamento';
import DetalleCurso from './components/DetalleCurso';
import DashboardCurso from './components/DashboardCurso';
import GestionCruces from './components/GestionCruces';
import SimulacionAlumno from './components/SimulacionAlumno';
import FavoritosAlumno from './components/FavoritosAlumno';
import CompararSeccionesAlumno from './components/CompararSeccionesAlumno';
import CalendarioAlumno from './components/CalendarioAlumno';
import HistorialAlumno from './components/HistorialAlumno';
import CrearUsuario from './components/CrearUsuario';
import ActualizarUsuario from './components/ActualizarUsuario';
import ResetPassword from './components/ResetPassword';
import GestionCrucesProfesor from './components/GestionCrucesProfesor';
import Reportes from './components/Reportes';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: darkMode ? '#181824' : '#f7ede1',
        paper: darkMode ? '#23263a' : '#fff',
      },
    },
    typography: {
      fontFamily: 'Montserrat, Roboto, Arial',
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/usuarios/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          console.log('Usuario autenticado:', response.data);
        } catch (error) {
          setUser(null);
          console.error('Error obteniendo usuario:', error);
        }
      } else {
        setUser(null);
        console.log('No hay token');
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  console.log('Render App, user:', user);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={
            user && user.rol === 'administrador' ? <GeneralDashboard user={user} /> : <Navigate to="/" replace />
          } />
          <Route path="/cursos-departamento/:departamentoCodigo" element={
            user && user.rol === 'administrador' ? <CursosPorDepartamento /> : <Navigate to="/" replace />
          } />
          <Route path="/curso-detalle/:cursoCodigo" element={
            user && user.rol === 'administrador' ? <DetalleCurso /> : <Navigate to="/" replace />
          } />
          <Route path="/dashboard-curso/:cursoCodigo" element={
            user && user.rol === 'administrador' ? <DashboardCurso /> : <Navigate to="/" replace />
          } />
          <Route path="/gestion-cruces" element={
            user && user.rol === 'administrador' ? <GestionCruces /> : <Navigate to="/" replace />
          } />
          <Route path="/gestion-cruces/profesor/:codprofesor" element={
            user && user.rol === 'administrador' ? <GestionCrucesProfesor darkMode={darkMode} setDarkMode={setDarkMode} /> : <Navigate to="/" replace />
          } />
          <Route path="/dashboard" element={
            user && user.rol === 'administrador' ? <GeneralDashboard user={user} /> : <Dashboard />
          } />
          <Route path="/alumnos" element={<SimulacionAlumno user={user} periodo={"2024-2"} darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/favoritos" element={<FavoritosAlumno darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/comparar" element={<CompararSeccionesAlumno darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/calendario" element={<CalendarioAlumno darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/historial" element={<HistorialAlumno darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/crear-usuario" element={<CrearUsuario />} />
          <Route path="/actualizar-usuario" element={<ActualizarUsuario />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reportes" element={
            user && user.rol === 'administrador' ? <Reportes user={user} onVolver={() => window.history.back()} /> : <Navigate to="/" replace />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
