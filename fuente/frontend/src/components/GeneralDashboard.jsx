import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack
} from '@mui/material';
import {
  School,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const departamentos = [
  { codigo: 'CCBB', nombre: 'Ciencias Básicas', color: '#1976d2' },
  { codigo: 'SITE', nombre: 'Sistemas y Telemática', color: '#388e3c' },
  { codigo: 'GEPR', nombre: 'Gestión de la Producción', color: '#f57c00' },
  { codigo: 'TECN', nombre: 'Tecnología', color: '#7b1fa2' },
  { codigo: 'HUCS', nombre: 'Humanidades y Ciencias Sociales', color: '#c2185b' },
  { codigo: 'SOFT', nombre: 'Software', color: '#0288d1' }
];

const GeneralDashboard = ({ user }) => {
  const navigate = useNavigate();

  const handleDepartamentoClick = (departamento) => {
    navigate(`/cursos-departamento/${departamento.codigo}`);
  };

  return (
    <AdminLayout user={user}>
      <Box sx={{ p: { xs: 2, sm: 4 }, background: '#f9f8f6', minHeight: '100vh' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#222', mb: 4 }}>
          Departamentos Académicos
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {departamentos.map((departamento, idx) => (
            <Paper
              key={departamento.codigo}
              elevation={0}
              sx={{
                borderRadius: 4,
                p: 3,
                background: '#fff',
                boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.07)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: `2px solid ${departamento.color}20`,
                '&:hover': {
                  boxShadow: `0 8px 24px 0 ${departamento.color}30`,
                  background: `${departamento.color}05`,
                  borderColor: departamento.color,
                  transform: 'translateY(-2px)',
                },
              }}
              onClick={() => handleDepartamentoClick(departamento)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 3,
                      background: `${departamento.color}15`,
                      color: departamento.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <School />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#222', mb: 0.5 }}>
                      {departamento.nombre}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                      Código: {departamento.codigo}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    background: departamento.color,
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    px: 3,
                    '&:hover': {
                      background: departamento.color,
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  Ver Cursos
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default GeneralDashboard; 