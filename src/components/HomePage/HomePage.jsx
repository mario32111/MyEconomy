import React from 'react';
import { Box, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors'; // Importa el tema desde el archivo que has configurado

const HomePage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ padding: { xs: '10px', md: '20px' }, backgroundColor: theme.palette.background.default }}>
                {/* Bienvenida */}
                <Typography variant="h4" color="primary" gutterBottom>
                    Hola, [Nombre de Usuario]
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Aquí tienes un resumen de tu estado financiero esta semana.
                </Typography>

                {/* Resumen Financiero */}
                <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" color="primary">
                                    Saldo Total
                                </Typography>
                                <Typography variant="h4" color="text.primary">
                                    $10,000
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" color="primary">
                                    Progreso en Metas Financieras
                                </Typography>
                                <Typography variant="h4" color="text.primary">
                                    70%
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" color="primary">
                                    Ahorros Mensuales
                                </Typography>
                                <Typography variant="h4" color="text.primary">
                                    $1,500
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

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
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Sección de Notificaciones */}
                <Box sx={{ marginTop: '30px' }}>
                    <Typography variant="h5" color="primary" gutterBottom>
                        Notificaciones
                    </Typography>
                    <Card sx={{ marginBottom: '20px' }}>
                        <CardContent>
                            <Typography variant="body1" color="text.primary">
                                Recuerda pagar tu suscripción a [servicio] en 3 días.
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Sección de Cursos */}
                <Box sx={{ marginTop: '30px' }}>
                    <Typography variant="h5" color="primary" gutterBottom>
                        Últimos Cursos
                    </Typography>
                    <Card>
                        <CardContent>
                            <Typography variant="body1" color="text.primary">
                                Nuevo curso disponible: Aprende a invertir desde cero.
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default HomePage;
