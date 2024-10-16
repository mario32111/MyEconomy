import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Card, CardContent, Grow, Slide } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors'; // Importa el tema desde el archivo que has configurado


const HomePage = () => {
    const [checked, setChecked] = useState(true); // Estado para el control de la animación

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ padding: { xs: '10px', md: '20px' }, backgroundColor: theme.palette.background.default }}>
                {/* Bienvenida */}
                <Slide direction="right" in={checked} timeout={500}>

                    <Typography variant="h4" color="primary" gutterBottom>
                        Hola, [Nombre de Usuario]
                    </Typography>
                </Slide>
                <Slide direction="right" in={checked} timeout={500}>
                    <Typography variant="subtitle1" color="text.secondary">
                        Aquí tienes un resumen de tu estado financiero esta semana.
                    </Typography>
                </Slide>

                {/* Acceso Rápido a Funciones */}
                <Box sx={{ marginTop: '30px' }}>
                    <Typography variant="h5" color="primary" gutterBottom>
                        Acceso Rápido
                    </Typography>
                    <Grid container spacing={2}>
                        {[
                            'ChatAI', 'Control de Servicios', 'Cursos', 'Metas Financieras',
                            'Monitoreo', 'Comparación de Tasas de Interés', 'Sistema de Ahorro',
                            'Inventario', 'Presupuesto', 'Simulador de Compras', 'Soporte'
                        ].map((funcion, index) => (
                            <Grid
                                item
                                xs={12} // Toma todo el ancho en pantallas muy pequeñas
                                sm={6} // Toma la mitad del ancho en pantallas pequeñas
                                md={4} // Toma un tercio del ancho en pantallas medianas
                                lg={3} // Toma un cuarto del ancho en pantallas grandes
                                key={index}
                            >
                                <Grow
                                    in={true}
                                    timeout={index * 250 + 500} // Ajusta el delay para cada botón
                                >
                                    <Button
                                        variant="contained"
                                        color={index % 2 === 0 ? 'primary' : 'secondary'}
                                        fullWidth
                                        sx={{
                                            fontSize: { xs: '0.8rem', md: '1rem' },
                                            padding: { xs: '8px', md: '12px' }
                                        }}
                                    >
                                        {funcion}
                                    </Button>
                                </Grow>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Sección de Notificaciones */}
                <Box sx={{ marginTop: '30px' }}>
                    <Slide direction="right" in={checked} timeout={500}>
                        <Typography variant="h5" color="primary" gutterBottom>
                            Notificaciones
                        </Typography>
                    </Slide>
                    <Slide direction="right" in={checked} timeout={500}>
                        <Card sx={{ marginBottom: '20px' }}>
                            <CardContent>
                                <Typography variant="body1" color="text.primary">
                                    Recuerda pagar tu suscripción a [servicio] en 3 días.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Slide>

                </Box>

                {/* Sección de Cursos */}
                <Box sx={{ marginTop: '30px' }}>
                    <Slide direction="right" in={checked} timeout={500}>
                        <Typography variant="h5" color="primary" gutterBottom>
                            Últimos Cursos
                        </Typography>
                    </Slide>
                    <Slide direction="right" in={checked} timeout={500}>
                        <Card>
                            <CardContent>
                                <Typography variant="body1" color="text.primary">
                                    Nuevo curso disponible: Aprende a invertir desde cero.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Slide>

                </Box>
            </Box>
        </ThemeProvider >
    );
};

export default HomePage;
