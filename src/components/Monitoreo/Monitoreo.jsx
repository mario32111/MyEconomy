import React, { useState } from 'react';
import GraficaIngresos from './GraficaIngresos/GraficaIngresos';
import GraficaGastos from './GraficaGastos/GraficaGastos';
import GraficaAhorros from './GraficaAhorros/GraficaAhorros';
import GraficaDeudas from './GraficaDeudas/GraficaDeudas';
import GraficaPresupuesto from './GraficaPresupuesto/GraficaPresupuesto';
import ResumenFinanciero from './ResumenFinanciero/ResumenFinanciero';
import MetasFinancieras from './MetasFinancieras/MetasFinancieras';
import EducacionFinanciera from './EducacionFinanciera/EducacionFinanciera';
import { Grow, Box, AppBar, Toolbar, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import { theme } from '../colors'; // Importa tu tema
import { ThemeProvider } from '@mui/material/styles';
import './Monitoreo.css';

const components = {
    GraficaGastos,
    GraficaIngresos,
    GraficaAhorros,
    GraficaDeudas,
    GraficaPresupuesto,
    ResumenFinanciero,
    MetasFinancieras,
    EducacionFinanciera
};

export default function Monitoreo() {
    const [selectedComponent, setSelectedComponent] = useState('GraficaGastos'); // Componente por defecto

    // Maneja el cambio de la gráfica seleccionada
    const handleComponentChange = (event) => {
        setSelectedComponent(event.target.value);
    };

    // Extraer el componente basado en la selección actual
    const SelectedComponent = components[selectedComponent];

    return (
        <ThemeProvider theme={theme}> {/* Aplica el tema aquí */}
            <Box display="flex" justifyContent="center" flexDirection="column">
                {/* Menú de selección de gráficas como formulario integrado */}
                <Box display="flex" justifyContent="center">
                    <Paper elevation={3} style={{ padding: '16px', width: '100%', maxWidth: '400px' }}> {/* Se establece un ancho máximo para el formulario */}
                        <Typography variant="h6" align="center" style={{ marginBottom: '16px', color: theme.palette.text.primary }}>
                            Selecciona una Gráfica
                        </Typography>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Gráficas</InputLabel>
                            <Select
                                value={selectedComponent}
                                onChange={handleComponentChange}
                                label="Gráficas"
                            >
                                {Object.keys(components).map((key) => (
                                    <MenuItem key={key} value={key}>
                                        {key.replace('Grafica', '')} {/* Muestra solo el nombre de la gráfica */}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>
                </Box>

                {/* Renderiza la gráfica seleccionada centrada y responsiva */}
                <Box display="flex" justifyContent="center" alignItems="center" marginTop={2} style={{ minHeight: '60vh' }}>
                    <Grow in={true} timeout={1000}>
                        <div style={{ minWidth: '300px', width: '100%' }}> {/* Limita el ancho máximo para responsividad */}
                            <SelectedComponent />
                        </div>
                    </Grow>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
