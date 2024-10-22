import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Container, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { theme } from '../../colors'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const Calculadora = () => {
  const [meta, setMeta] = useState('');
  const [montoDeseado, setMontoDeseado] = useState('');
  const [plazo, setPlazo] = useState('');
  const [resultadoMensual, setResultadoMensual] = useState(null);
  const [progresoDatos, setProgresoDatos] = useState(null);

  const handleCalculate = () => {
    const total = parseFloat(montoDeseado);
    const time = parseInt(plazo);

    if (!isNaN(total) && !isNaN(time) && time > 0) {
      const monthlySavings = total / time;
      setResultadoMensual(monthlySavings);

      // Crear datos para el gráfico de progreso
      const ahorroProgreso = Array.from({ length: time }, (_, i) => (i + 1) * monthlySavings);
      const labels = Array.from({ length: time }, (_, i) => `Mes ${i + 1}`);

      const dataset = labels.map((month, index) => ({
        id: index,
        month: month,
        savings: ahorroProgreso[index],
      }));

      setProgresoDatos(dataset);
    } else {
      alert("Por favor, ingresa valores válidos.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ marginTop: '20px', padding: '0 16px' }}>
        <Typography variant="h4" color="text.primary" gutterBottom align="center">
          Calculadora de Metas Financieras
        </Typography>

        <TextField
          label="Meta (Ej. Comprar una casa)"
          variant="outlined"
          fullWidth
          value={meta}
          onChange={(e) => setMeta(e.target.value)}
          style={{ marginBottom: '20px' }}
        />

        <TextField
          label="Monto Deseado"
          variant="outlined"
          type="number"
          fullWidth
          value={montoDeseado}
          onChange={(e) => setMontoDeseado(e.target.value)}
          style={{ marginBottom: '20px' }}
        />

        <TextField
          label="Plazo (en meses)"
          variant="outlined"
          select
          fullWidth
          value={plazo}
          onChange={(e) => setPlazo(e.target.value)}
          style={{ marginBottom: '20px' }}
        >
          <MenuItem value={6}>6 meses</MenuItem>
          <MenuItem value={12}>1 año</MenuItem>
          <MenuItem value={24}>2 años</MenuItem>
          <MenuItem value={36}>3 años</MenuItem>
          <MenuItem value={60}>5 años</MenuItem>
        </TextField>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCalculate}
          fullWidth
          style={{ marginBottom: '20px' }}
        >
          Calcular
        </Button>

        {resultadoMensual !== null && (
          <>
            <Typography variant="h6" color="text.primary" gutterBottom align="center">
              Necesitas ahorrar: ${resultadoMensual.toFixed(2)} mensualmente
            </Typography>

            <Box style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Progreso de Ahorro
              </Typography>

              {progresoDatos && progresoDatos.length > 0 && (
                <LineChart
                  width={600} // Puedes usar un ancho porcentual si prefieres
                  height={400}
                  dataset={progresoDatos}
                  series={[
                    { 
                      curve: 'linear', 
                      dataKey: 'savings',
                      label: 'Ahorros acumulados',
                      color: '#0F2532', // Color del gráfico
                    },
                  ]}
                  xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                  yAxis={[{ label: 'Ahorros ($)' }]}
                  sx={{
                    [`.${axisClasses.left} .${axisClasses.label}`]: {
                      transform: 'translate(-20px, 0)',
                    },
                    maxWidth: '100%', // Asegúrate de que el gráfico se adapte al contenedor
                  }}
                />
              )}
            </Box>

            <Box style={{ marginTop: '20px' }}>
              <Typography variant="h6" color="text.primary">
                Consejos Adicionales:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                - Reduce gastos innecesarios como suscripciones que no usas.
                <br />
                - Aumenta tus ingresos buscando un trabajo freelance o una fuente secundaria.
                <br />
                - Considera abrir una cuenta de ahorros con intereses más altos.
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Calculadora;
