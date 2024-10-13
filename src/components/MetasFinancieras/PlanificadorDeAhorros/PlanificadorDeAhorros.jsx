import React, { useState } from 'react';
import { TextField, Button, Typography, Container, MenuItem, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart'; // Gráfica de líneas de Material UI
import { theme } from '../../colors'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const PlanificadorAhorros = () => {
  const [cantidad, setCantidad] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState('');
  const [transferencias, setTransferencias] = useState([]);
  const [totalAhorrado, setTotalAhorrado] = useState(0);

  const handlePlanificar = () => {
    const amount = parseFloat(cantidad);
    
    if (!isNaN(amount) && amount > 0 && frecuencia && tipoCuenta) {
      const nuevaTransferencia = {
        cantidad: amount,
        frecuencia: frecuencia,
        cuenta: tipoCuenta,
        fecha: new Date().toLocaleDateString(),
      };

      setTransferencias([...transferencias, nuevaTransferencia]);
      setTotalAhorrado(totalAhorrado + amount); // Actualizar el total ahorrado
      alert(`Planificación establecida: $${amount.toFixed(2)} cada ${frecuencia} a la cuenta ${tipoCuenta}.`);
    } else {
      alert("Por favor, ingresa valores válidos.");
    }
  };

  // Datos para el gráfico de progreso (simulado)
  const data = transferencias.map((transferencia, index) => ({
    x: index + 1,
    y: transferencia.cantidad * (index + 1),
  }));

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Planificador de Ahorros Automático
        </Typography>

        {/* Entrada de cantidad */}
        <TextField
          label="Cantidad a Ahorrar"
          variant="outlined"
          type="number"
          fullWidth
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          style={{ marginBottom: '20px' }}
        />

        {/* Frecuencia de transferencia */}
        <TextField
          label="Frecuencia"
          variant="outlined"
          select
          fullWidth
          value={frecuencia}
          onChange={(e) => setFrecuencia(e.target.value)}
          style={{ marginBottom: '20px' }}
        >
          <MenuItem value="Diario">Diario</MenuItem>
          <MenuItem value="Semanal">Semanal</MenuItem>
          <MenuItem value="Mensual">Mensual</MenuItem>
        </TextField>

        {/* Tipo de cuenta */}
        <TextField
          label="Tipo de Cuenta"
          variant="outlined"
          select
          fullWidth
          value={tipoCuenta}
          onChange={(e) => setTipoCuenta(e.target.value)}
          style={{ marginBottom: '20px' }}
        >
          <MenuItem value="Ahorros">Ahorros</MenuItem>
          <MenuItem value="Inversión">Inversión</MenuItem>
          <MenuItem value="Fondo de Emergencia">Fondo de Emergencia</MenuItem>
        </TextField>

        {/* Botón de planificación */}
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlanificar}
          fullWidth
          style={{ marginBottom: '20px' }}
        >
          Establecer Plan
        </Button>

        {/* Resumen de transferencias programadas */}
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>Resumen de Transferencias</Typography>
          {transferencias.length > 0 ? (
            <ul>
              {transferencias.map((transferencia, index) => (
                <li key={index}>
                  {`${transferencia.fecha}: $${transferencia.cantidad.toFixed(2)} - ${transferencia.frecuencia} - Cuenta: ${transferencia.cuenta}`}
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No hay transferencias programadas.</Typography>
          )}
        </Paper>

        {/* Gráfico de progreso */}
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>Progreso de Ahorros</Typography>
          <LineChart
            xAxis={[{ label: 'Meses', dataKey: 'x' }]}
            series={[{ label: 'Ahorros', dataKey: 'y' }]}
            dataset={data} 
            width={500}
            height={300}
          />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default PlanificadorAhorros;
