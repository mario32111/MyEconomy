import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../colors'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const RecordatoriosSeguimiento = () => {
  const [tipoRecordatorio, setTipoRecordatorio] = useState('');
  const [fechaRecordatorio, setFechaRecordatorio] = useState('');
  const [horaRecordatorio, setHoraRecordatorio] = useState('');
  const [recordatorios, setRecordatorios] = useState([]);

  const handleGuardarRecordatorio = () => {
    if (tipoRecordatorio && fechaRecordatorio && horaRecordatorio) {
      const nuevoRecordatorio = {
        tipo: tipoRecordatorio,
        fecha: fechaRecordatorio,
        hora: horaRecordatorio,
      };
      setRecordatorios([...recordatorios, nuevoRecordatorio]);
      setTipoRecordatorio('');
      setFechaRecordatorio('');
      setHoraRecordatorio('');
      alert(`Recordatorio guardado: ${tipoRecordatorio} para el ${fechaRecordatorio} a las ${horaRecordatorio}.`);
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Recordatorios y Seguimiento
        </Typography>
        
        {/* Entrada para el tipo de recordatorio */}
        <TextField
          label="Tipo de Recordatorio"
          variant="outlined"
          fullWidth
          value={tipoRecordatorio}
          onChange={(e) => setTipoRecordatorio(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        
        {/* Entrada para la fecha */}
        <TextField
          label="Fecha (YYYY-MM-DD)"
          variant="outlined"
          type="date"
          fullWidth
          value={fechaRecordatorio}
          onChange={(e) => setFechaRecordatorio(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        
        {/* Entrada para la hora */}
        <TextField
          label="Hora (HH:MM)"
          variant="outlined"
          type="time"
          fullWidth
          value={horaRecordatorio}
          onChange={(e) => setHoraRecordatorio(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        
        {/* Botón para guardar el recordatorio */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGuardarRecordatorio}
          fullWidth
        >
          Guardar Recordatorio
        </Button>

        {/* Título para la lista de recordatorios */}
        <Typography variant="h5" color="text.secondary" style={{ marginTop: '20px' }}>
          Lista de Recordatorios:
        </Typography>

        {/* Mapeo de recordatorios para mostrar en la lista */}
        {recordatorios.map((recordatorio, index) => (
          <Typography key={index} variant="body1" color="text.primary">
            {recordatorio.tipo} - {recordatorio.fecha} a las {recordatorio.hora}
          </Typography>
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default RecordatoriosSeguimiento;
