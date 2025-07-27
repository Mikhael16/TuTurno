import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Stack,
  Modal,
  Fade,
  Backdrop,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import {
  Star,
  Search,
} from '@mui/icons-material';
import AlumnoSidebar from './AlumnoSidebar';
import { useNavigate } from 'react-router-dom';

const sidebarWidth = 240;

const FavoritosAlumno = ({ darkMode, setDarkMode }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [selectedFav, setSelectedFav] = useState(null);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favoritos_prediccion') || '[]');
    setFavoritos(favs);
  }, []);

  const favoritosFiltrados = favoritos.filter(fav =>
    fav.curso.toLowerCase().includes(filtro.toLowerCase()) ||
    fav.profesor.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw', background: darkMode ? '#121212' : '#ffffff', transition: 'background 0.7s' }}>
      <AlumnoSidebar user={null} periodo={"2024-2"} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Box
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          width: `calc(100vw - ${sidebarWidth}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: darkMode ? '#121212' : '#ffffff',
          p: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 900, mt: 4 }}>
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
              Tus Favoritos
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Filtrar por curso o profesor"
              value={filtro}
              onChange={e => setFiltro(e.target.value)}
              InputProps={{
                startAdornment: (
                  <IconButton size="small" disabled>
                    <Search sx={{ color: darkMode ? '#42a5f5' : '#1976d2' }} />
                  </IconButton>
                ),
                style: { 
                  background: darkMode ? '#1e1e1e' : '#f8f9fa', 
                  borderRadius: 12,
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
                }
              }}
              sx={{ 
                width: 320,
                '& .MuiInputLabel-root': {
                  color: darkMode ? '#90caf9' : '#546e7a',
                },
                '& .MuiInputBase-input': {
                  color: darkMode ? '#e3f2fd' : '#37474f',
                },
              }}
            />
          </Stack>

          <Typography 
            variant="h6" 
            sx={{ 
              color: darkMode ? '#90caf9' : '#546e7a', 
              mb: 4, 
              fontWeight: 600,
              textAlign: 'center'
            }}
          >
            Cursos guardados en tus predicciones
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {favoritosFiltrados.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  borderRadius: 4,
                  background: darkMode ? '#1e1e1e' : '#f8f9fa',
                  border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                  textAlign: 'center',
                  boxShadow: darkMode ? '0 4px 12px rgba(66, 165, 245, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Star sx={{ fontSize: 64, color: darkMode ? '#42a5f5' : '#e3f2fd', mb: 2 }} />
                <Typography sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontSize: 18, fontWeight: 600 }}>
                  No tienes favoritos guardados.
                </Typography>
                <Typography sx={{ color: darkMode ? '#90caf9' : '#9e9e9e', mt: 1 }}>
                  Realiza predicciones en la sección de Simulación para guardar tus favoritos aquí.
                </Typography>
              </Paper>
            ) : (
              favoritosFiltrados.map((fav, idx) => (
                <Card
                  key={idx}
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    background: darkMode ? '#1e1e1e' : '#ffffff',
                    border: darkMode ? '2px solid #42a5f5' : '2px solid #e3f2fd',
                    boxShadow: darkMode ? '0 4px 12px rgba(66, 165, 245, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: darkMode ? '0 8px 24px rgba(66, 165, 245, 0.3)' : '0 8px 24px rgba(0, 0, 0, 0.1)',
                      borderColor: darkMode ? '#64b5f6' : '#1976d2',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          background: darkMode ? 'rgba(66, 165, 245, 0.2)' : 'rgba(25, 118, 210, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Star sx={{ color: darkMode ? '#42a5f5' : '#1976d2', fontSize: 28 }} />
                      </Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 'bold', 
                          color: darkMode ? '#42a5f5' : '#1976d2',
                          flex: 1
                        }}
                      >
                        {fav.curso}
                      </Typography>
                      <Chip
                        label={fav.resultado === 'Sí' ? 'Alta probabilidad' : 'Baja probabilidad'}
                        color={fav.resultado === 'Sí' ? 'success' : 'warning'}
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    </Stack>

                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
                      <Box sx={{ p: 2, background: darkMode ? '#2d2d2d' : '#f8f9fa', borderRadius: 3, border: darkMode ? '1px solid #42a5f5' : '1px solid #e3f2fd' }}>
                        <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 600, mb: 0.5 }}>
                          Sección
                        </Typography>
                        <Typography variant="body1" sx={{ color: darkMode ? '#42a5f5' : '#1976d2', fontWeight: 'bold' }}>
                          {fav.seccion}
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2, background: darkMode ? '#2d2d2d' : '#f8f9fa', borderRadius: 3, border: darkMode ? '1px solid #42a5f5' : '1px solid #e3f2fd' }}>
                        <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 600, mb: 0.5 }}>
                          Profesor
                        </Typography>
                        <Typography variant="body1" sx={{ color: darkMode ? '#42a5f5' : '#1976d2', fontWeight: 'bold' }}>
                          {fav.profesor}
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2, background: darkMode ? '#2d2d2d' : '#f8f9fa', borderRadius: 3, border: darkMode ? '1px solid #42a5f5' : '1px solid #e3f2fd' }}>
                        <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 600, mb: 0.5 }}>
                          Promedio
                        </Typography>
                        <Typography variant="body1" sx={{ color: darkMode ? '#42a5f5' : '#1976d2', fontWeight: 'bold' }}>
                          {fav.nota}
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2, background: darkMode ? '#2d2d2d' : '#f8f9fa', borderRadius: 3, border: darkMode ? '1px solid #42a5f5' : '1px solid #e3f2fd' }}>
                        <Typography variant="body2" sx={{ color: darkMode ? '#90caf9' : '#546e7a', fontWeight: 600, mb: 0.5 }}>
                          Ciclo
                        </Typography>
                        <Typography variant="body1" sx={{ color: darkMode ? '#42a5f5' : '#1976d2', fontWeight: 'bold' }}>
                          {fav.ciclo}
                        </Typography>
                      </Box>
                    </Box>

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        sx={{
                          fontWeight: 'bold',
                          color: '#1976d2',
                          borderColor: '#e3f2fd',
                          borderRadius: 3,
                          px: 3,
                          py: 1,
                          background: '#f8f9fa',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: '#e3f2fd',
                            borderColor: '#1976d2',
                            transform: 'scale(1.02)',
                            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                          },
                        }}
                        onClick={() => setOpenModal(true)}
                      >
                        Comparar
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          fontWeight: 'bold',
                          background: '#1976d2',
                          color: '#ffffff',
                          borderRadius: 3,
                          px: 3,
                          py: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: '#1565c0',
                            transform: 'scale(1.02)',
                            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                          },
                        }}
                      >
                        Ver Detalles
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>

          {favoritosFiltrados.length > 0 && (
            <Box sx={{ mt: 6, display: 'flex', gap: 3, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                sx={{
                  fontWeight: 'bold',
                  color: '#1976d2',
                  borderColor: '#e3f2fd',
                  borderRadius: 3,
                  px: 4,
                  py: 2,
                  background: '#f8f9fa',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: '#e3f2fd',
                    borderColor: '#1976d2',
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                  },
                }}
                onClick={() => setOpenModal(true)}
              >
                Comparar Favoritos
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontWeight: 'bold',
                  background: '#4caf50',
                  color: '#ffffff',
                  borderRadius: 3,
                  px: 4,
                  py: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: '#388e3c',
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                  },
                }}
              >
                Exportar Lista
              </Button>
            </Box>
          )}
        </Box>
      </Box>

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
              bgcolor: '#ffffff',
              border: '2px solid #e3f2fd',
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.15)',
              p: 4,
              borderRadius: 4,
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3, 
                color: '#1976d2', 
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Selecciona un curso favorito para comparar
            </Typography>
            <List>
              {favoritosFiltrados.length === 0 ? (
                <ListItem>
                  <ListItemText 
                    primary="No tienes favoritos guardados." 
                    sx={{ textAlign: 'center', color: '#546e7a' }}
                  />
                </ListItem>
              ) : (
                favoritosFiltrados.map((fav, idx) => (
                  <React.Fragment key={idx}>
                    <ListItemButton
                      onClick={() => {
                        setOpenModal(false);
                        navigate('/comparar', { 
                          state: { 
                            curso: fav.curso, 
                            ciclo: fav.ciclo || fav.periodo || '2024-2', 
                            nota: fav.nota || '' 
                          } 
                        });
                      }}
                      sx={{
                        borderRadius: 3,
                        mb: 1,
                        background: '#f8f9fa',
                        border: '2px solid #e3f2fd',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: '#e3f2fd',
                          borderColor: '#1976d2',
                          transform: 'translateX(4px)',
                          boxShadow: '0 4px 12px rgba(25, 118, 210, 0.15)',
                        },
                      }}
                    >
                      <ListItemText 
                        primary={`${fav.curso} (${fav.codigo || fav.curso})`} 
                        secondary={
                          fav.ciclo 
                            ? `Ciclo: ${fav.ciclo} | Nota: ${fav.nota || 'N/A'}` 
                            : fav.periodo 
                              ? `Periodo: ${fav.periodo} | Nota: ${fav.nota || 'N/A'}` 
                              : `Nota: ${fav.nota || 'N/A'}`
                        }
                        primaryTypographyProps={{ fontWeight: 'bold', color: '#1976d2' }}
                        secondaryTypographyProps={{ color: '#546e7a' }}
                      />
                    </ListItemButton>
                    {idx < favoritosFiltrados.length - 1 && <Divider sx={{ my: 1, borderColor: '#e3f2fd' }} />}
                  </React.Fragment>
                ))
              )}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                onClick={() => setOpenModal(false)}
                sx={{
                  color: '#1976d2',
                  fontWeight: 'bold',
                  borderRadius: 3,
                  px: 4,
                  py: 1,
                  background: '#f8f9fa',
                  border: '2px solid #e3f2fd',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: '#e3f2fd',
                    borderColor: '#1976d2',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default FavoritosAlumno; 