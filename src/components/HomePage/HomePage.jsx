import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    Card,
    CardContent,
    Grow,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { theme } from '../colors'; // Importa el tema desde el archivo que has configurado

const HomePage = () => {
    const [checked, setChecked] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [transactionData, setTransactionData] = useState({
        date: '',
        type: '',
        description: '',
        amount: ''
    });
    //esto no va acarriba es lo de la tabla o historial
    const [transactions, setTransactions] = useState([
        { date: '03/08/2024', type: 'Gasto', description: 'Suministros de oficina', amount: 250 },
        { date: '04/08/2024', type: 'Ingreso', description: 'Ventas tienda en línea', amount: 150 },
        { date: '05/08/2024', type: 'Gasto', description: 'Servicios públicos oficina', amount: 350 },
        { date: '06/08/2024', type: 'Gasto', description: 'Suministros', amount: 25 },
    ]);

    const navigate = useNavigate();

    const functionsMap = {
        'ChatAI': '/chatai',
        'Control de Servicios': '/control',
        'Cursos': '/cursos',
        'Metas Financieras': '/metas-financieras',
        'Monitoreo': '/monitoreo',
        'Comparación de Tasas de Interés': '/comparacion-tasas',
        'Sistema de Ahorro': '/presupuesto',
        'Inventario': '/inventario',
        'Presupuesto': '/presupuesto',
        'Simulador de Interes': '/simulador-compras',
        'Soporte': '/soporte',
    };

    const handleButtonClick = (path) => {
        navigate(path);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setTransactionData({ date: '', type: '', description: '', amount: '' }); // Resetea el formulario al cerrar
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransactionData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Agregar la nueva transacción al estado
        setTransactions((prevTransactions) => [
            ...prevTransactions,
            {
                date: transactionData.date,
                type: transactionData.type,
                description: transactionData.description,
                amount: parseFloat(transactionData.amount) // Asegúrate de convertir el monto a número
            }
        ]);
        handleCloseModal();
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ padding: { xs: '10px', md: '20px' }, backgroundColor: theme.palette.background.default }}>
                <Slide direction="right" in={checked} timeout={500}>
                    <Typography variant="h4" color="primary" gutterBottom>
                        Hola, [Nombre de Usuario]
                    </Typography>
                </Slide>

                {/* Tabla de Resumen de Transacciones */}
                <Slide direction="right" in={checked} timeout={500}>
                    <Box sx={{ marginTop: '30px' }}>
                        <Typography variant="h5" color="primary" gutterBottom>
                            Resumen financiero de la semana
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Fecha</TableCell>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell>Descripción</TableCell>
                                        <TableCell align="right">Monto</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.map((transaction, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{transaction.date}</TableCell>
                                            <TableCell>{transaction.type}</TableCell>
                                            <TableCell>{transaction.description}</TableCell>
                                            <TableCell align="right">${transaction.amount.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ marginTop: '20px', textAlign: 'center',}}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleButtonClick('/monitoreo')}
                            >
                                Ver más detalles
                            </Button>
                            <Button
                                sx={{ marginLeft: '12px' }}
                                variant="contained"
                                color="primary"
                                onClick={handleOpenModal}
                            >
                                Registrar nueva transacción
                            </Button>
                        </Box>
                    </Box>
                </Slide>

                {/* Acceso Rápido a Funciones */}
                <Box sx={{ marginTop: '30px' }}>
                    <Typography variant="h5" color="primary" gutterBottom>
                        Acceso Rápido
                    </Typography>
                    <Grid container spacing={2}>
                        {Object.keys(functionsMap).map((funcion, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Grow in={true} timeout={index * 250 + 500}>
                                    <Button
                                        variant="contained"
                                        color={index % 2 === 0 ? 'primary' : 'secondary'}
                                        fullWidth
                                        sx={{
                                            fontSize: { xs: '0.8rem', md: '1rem' },
                                            padding: { xs: '8px', md: '12px' }
                                        }}
                                        onClick={() => handleButtonClick(functionsMap[funcion])}
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

                {/* Modal para Registrar Nueva Transacción */}
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>Registrar Nueva Transacción</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="date"
                                label="Fecha"
                                type="date"
                                fullWidth
                                variant="outlined"
                                value={transactionData.date}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="type"
                                label="Tipo (Ingreso/Gasto)"
                                fullWidth
                                variant="outlined"
                                value={transactionData.type}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="description"
                                label="Descripción"
                                fullWidth
                                variant="outlined"
                                value={transactionData.description}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="amount"
                                label="Monto"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={transactionData.amount}
                                onChange={handleChange}
                            />
                            <DialogActions>
                                <Button onClick={handleCloseModal} color="secondary">
                                    Cancelar
                                </Button>
                                <Button type="submit" color="primary">
                                    Registrar
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
};

export default HomePage;
