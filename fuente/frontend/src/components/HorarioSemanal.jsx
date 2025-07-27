import React, { useState } from 'react';
import { Box, Modal, Fade, Backdrop, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const horas = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];
const dias = [
  { code: 'LU', label: 'Lunes' },
  { code: 'MA', label: 'Martes' },
  { code: 'MI', label: 'Miércoles' },
  { code: 'JU', label: 'Jueves' },
  { code: 'VI', label: 'Viernes' },
  { code: 'SA', label: 'Sábado' }
];

const colores = [
  '#2E7D32', '#1565C0', '#D32F2F', '#F57C00', '#6A1B9A', '#00695C', '#C62828', '#AD1457'
];

function getPos(hora) {
  return horas.indexOf(hora);
}

function getColor(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colores[Math.abs(hash) % colores.length];
}

function horaLabel(hora) {
  const h = parseInt(hora.split(':')[0], 10);
  if (h === 0) return '12 am';
  if (h < 12) return `${h} am`;
  if (h === 12) return '12 pm';
  return `${h - 12} pm`;
}

export default function HorarioSemanal({ bloques, darkMode }) {
  const [openModal, setOpenModal] = useState(false);
  const [bloqueActivo, setBloqueActivo] = useState(null);

  const getClasesEnCelda = (dia, h) =>
    bloques.filter(
      b => b.dia === dia && b.hora_inicio.slice(0, 5) === h
    );

  const isOverlapped = (dia, i) =>
    bloques.some(
      b =>
        b.dia === dia &&
        getPos(b.hora_inicio.slice(0, 5)) < i &&
        getPos(b.hora_fin.slice(0, 5)) > i
    );

  return (
    <Box sx={{ overflowX: 'auto', width: '100%' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', background: darkMode ? '#1e1e2f' : '#fff' }}>
        <thead>
          <tr>
            <th style={{ width: 60, fontWeight: 600, color: darkMode ? '#ccc' : '#888', background: darkMode ? '#23263a' : '#faf9f6' }}>Hora</th>
            {dias.map(d => (
              <th key={d.code} style={{ fontWeight: 600, color: darkMode ? '#ccc' : '#888', background: darkMode ? '#23263a' : '#faf9f6' }}>{d.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horas.slice(0, -1).map((h, i) => (
            <tr key={h}>
              <td style={{ border: darkMode ? '1px solid #23263a' : '1px solid #eee', width: 60, textAlign: 'center', fontWeight: 500, color: darkMode ? '#ccc' : '#888', background: darkMode ? '#23263a' : '#faf9f6' }}>{horaLabel(h)}</td>
              {dias.map((dia) => {
                const clasesCelda = getClasesEnCelda(dia.code, h);
                if (clasesCelda.length > 0) {
                  const rowSpan = getPos(clasesCelda[0].hora_fin.slice(0, 5)) - getPos(clasesCelda[0].hora_inicio.slice(0, 5));
                  return (
                    <td
                      key={dia.code}
                      rowSpan={rowSpan}
                      style={{
                        padding: '2px',
                        border: darkMode ? '1px solid #23263a' : '1px solid #eee',
                        minWidth: 120,
                        background: darkMode ? '#1e1e2f' : '#fff',
                        verticalAlign: 'top',
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', gap: '2px' }}>
                        {clasesCelda.map((clase, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              background: getColor(clase.codigo_curso),
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: '11px',
                              borderRadius: '4px',
                              boxShadow: '0 1px 4px 0 rgba(0,0,0,0.1)',
                              cursor: 'pointer',
                              flex: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              p: '4px 2px',
                              textAlign: 'center',
                              transition: 'transform 0.2s, box-shadow 0.2s, filter 0.2s',
                              ':hover': {
                                transform: 'scale(1.03)',
                                boxShadow: darkMode ? '0 4px 20px 0 rgba(255, 255, 255, 0.3)' : '0 4px 12px 0 rgba(0,0,0,0.15)',
                                filter: darkMode ? 'brightness(1.2)' : 'none',
                              },
                            }}
                            onClick={() => { setBloqueActivo(clase); setOpenModal(true); }}
                          >
                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{clase.codigo_curso} - {clase.seccion} ({clase.tipoclase})</Typography>
                            <Typography variant="caption">{clase.profesor}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </td>
                  );
                }
                if (isOverlapped(dia.code, i)) return null;
                return <td key={dia.code} style={{ border: darkMode ? '1px solid #23263a' : '1px solid #eee', minWidth: 120, background: darkMode ? '#1e1e2f' : '#fff' }}></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 400 }}
      >
        <Fade in={openModal}>
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: { xs: '90%', sm: 500, md: 600 }, 
            bgcolor: darkMode ? '#23263a' : '#fff', 
            border: '2px solid #1976d2', 
            boxShadow: 24, 
            p: 4, 
            borderRadius: 4,
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            {bloqueActivo && (
              <>
                <Typography variant="h6" sx={{ mb: 2, color: darkMode ? '#ffe082' : '#1976d2', fontWeight: 'bold' }}>
                  {bloqueActivo.nombre_curso} ({bloqueActivo.codigo_curso} - {bloqueActivo.seccion})
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Profesor" 
                      secondary={bloqueActivo.profesor} 
                      primaryTypographyProps={{ fontWeight: 'bold', color: darkMode ? '#e3f2fd' : '#37474f' }}
                      secondaryTypographyProps={{ color: darkMode ? '#90caf9' : '#546e7a' }}
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemText 
                      primary="Tipo de clase" 
                      secondary={bloqueActivo.tipoclase} 
                      primaryTypographyProps={{ fontWeight: 'bold', color: darkMode ? '#e3f2fd' : '#37474f' }}
                      secondaryTypographyProps={{ color: darkMode ? '#90caf9' : '#546e7a' }}
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemText 
                      primary="Horario" 
                      secondary={bloqueActivo.hora_inicio && bloqueActivo.hora_fin ? 
                        `${bloqueActivo.hora_inicio.slice(0,5)} - ${bloqueActivo.hora_fin.slice(0,5)}` : ''} 
                      primaryTypographyProps={{ fontWeight: 'bold', color: darkMode ? '#e3f2fd' : '#37474f' }}
                      secondaryTypographyProps={{ color: darkMode ? '#90caf9' : '#546e7a' }}
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemText 
                      primary="Aula" 
                      secondary={bloqueActivo.aula || 'No especificada'} 
                      primaryTypographyProps={{ fontWeight: 'bold', color: darkMode ? '#e3f2fd' : '#37474f' }}
                      secondaryTypographyProps={{ color: darkMode ? '#90caf9' : '#546e7a' }}
                    />
                  </ListItem>
                  
                  {/* Información de probabilidades */}
                  {bloqueActivo.probabilidad && (
                    <>
                      <ListItem>
                        <ListItemText 
                          primary="Probabilidad de Matrícula" 
                          secondary={`${bloqueActivo.probabilidad}%`} 
                          primaryTypographyProps={{ fontWeight: 'bold', color: darkMode ? '#e3f2fd' : '#37474f' }}
                          secondaryTypographyProps={{ 
                            color: bloqueActivo.color_probabilidad === 'success' ? '#4caf50' : 
                                   bloqueActivo.color_probabilidad === 'warning' ? '#ff9800' : '#f44336',
                            fontWeight: 'bold',
                            fontSize: '1.1rem'
                          }}
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemText 
                          primary="Estado" 
                          secondary={bloqueActivo.resultado_probabilidad} 
                          primaryTypographyProps={{ fontWeight: 'bold', color: darkMode ? '#e3f2fd' : '#37474f' }}
                          secondaryTypographyProps={{ 
                            color: bloqueActivo.color_probabilidad === 'success' ? '#4caf50' : 
                                   bloqueActivo.color_probabilidad === 'warning' ? '#ff9800' : '#f44336',
                            fontWeight: 'bold'
                          }}
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemText 
                          primary="Turno Estimado" 
                          secondary={bloqueActivo.turno_estimado} 
                          primaryTypographyProps={{ fontWeight: 'bold', color: darkMode ? '#e3f2fd' : '#37474f' }}
                          secondaryTypographyProps={{ color: darkMode ? '#90caf9' : '#546e7a' }}
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemText 
                          primary="Demanda del Profesor" 
                          secondary={bloqueActivo.profesor_demanda} 
                          primaryTypographyProps={{ fontWeight: 'bold', color: darkMode ? '#e3f2fd' : '#37474f' }}
                          secondaryTypographyProps={{ 
                            color: bloqueActivo.profesor_demanda === 'Baja demanda' ? '#4caf50' : 
                                   bloqueActivo.profesor_demanda === 'Alta demanda' ? '#f44336' : '#ff9800',
                            fontWeight: 'bold'
                          }}
                        />
                      </ListItem>
                    </>
                  )}
                  
                  {/* Información de cruces */}
                  {bloqueActivo.cruces && (
                    <>
                      <ListItem>
                        <ListItemText 
                          primary="Análisis de Cruces" 
                          primaryTypographyProps={{ 
                            fontWeight: 'bold', 
                            color: darkMode ? '#e3f2fd' : '#37474f',
                            mb: 1
                          }}
                        />
                      </ListItem>
                      
                      <ListItem sx={{ pl: 4 }}>
                        <ListItemText 
                          primary="Cruces Teóricos" 
                          secondary={`${bloqueActivo.cruces.teoricos} cruces`} 
                          primaryTypographyProps={{ fontWeight: 'bold', color: '#4caf50' }}
                          secondaryTypographyProps={{ color: darkMode ? '#90caf9' : '#546e7a' }}
                        />
                      </ListItem>
                      
                      <ListItem sx={{ pl: 4 }}>
                        <ListItemText 
                          primary="Cruces Peligrosos" 
                          secondary={`${bloqueActivo.cruces.peligrosos} cruces`} 
                          primaryTypographyProps={{ fontWeight: 'bold', color: '#ff9800' }}
                          secondaryTypographyProps={{ color: darkMode ? '#90caf9' : '#546e7a' }}
                        />
                      </ListItem>
                      
                      <ListItem sx={{ pl: 4 }}>
                        <ListItemText 
                          primary="Cruces Críticos" 
                          secondary={`${bloqueActivo.cruces.criticos} cruces`} 
                          primaryTypographyProps={{ fontWeight: 'bold', color: '#f44336' }}
                          secondaryTypographyProps={{ color: darkMode ? '#90caf9' : '#546e7a' }}
                        />
                      </ListItem>
                      
                      <ListItem sx={{ pl: 4 }}>
                        <ListItemText 
                          primary="Total de Cruces" 
                          secondary={`${bloqueActivo.cruces.total} cruces`} 
                          primaryTypographyProps={{ fontWeight: 'bold', color: darkMode ? '#e3f2fd' : '#37474f' }}
                          secondaryTypographyProps={{ color: darkMode ? '#90caf9' : '#546e7a' }}
                        />
                      </ListItem>
                    </>
                  )}
                </List>
                
                <Button 
                  onClick={() => setOpenModal(false)} 
                  sx={{ 
                    mt: 2, 
                    color: darkMode ? '#ffe082' : '#1976d2', 
                    fontWeight: 'bold',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    background: darkMode ? '#1e1e2f' : '#f5f5f5',
                    '&:hover': {
                      background: darkMode ? '#2d2d3f' : '#e0e0e0'
                    }
                  }}
                >
                  Cerrar
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
} 