import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors'; // Importa el tema desde tu archivo configurado

const HomePage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [budget, setBudget] = useState(1000); // Presupuesto diario inicial
    const [amountLeft, setAmountLeft] = useState(1000); // Presupuesto diario inicial
    const [transactionData, setTransactionData] = useState({ amount: '', category: '', type: '' });

    // Colores para las categorías en el gráfico de pastel
    const COLORS = ['#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FF6361'];
    
    // Actualización de la gráfica con los datos de transacciones
    const data = transactions.reduce((acc, item) => {
        const existingCategory = acc.find(d => d.name === item.category);
        if (existingCategory) {
            existingCategory.value += item.amount;
        } else {
            acc.push({ name: item.category, value: item.amount });
        }
        return acc;
    }, []);
    
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setTransactionData({ amount: '', category: '', type: '' });
    };

    const handleAddTransaction = () => {
        const amount = parseFloat(transactionData.amount);
        const newTransaction = {
            amount,
            category: transactionData.category,
            type: transactionData.type
        };

        // Actualizar transacciones y el total
        setTransactions([...transactions, newTransaction]);
        setTotalSpent(totalSpent + amount);
        setAmountLeft(budget - (totalSpent + amount));
        handleCloseModal();
    };

    const handleDeleteLast = () => {
        const lastTransaction = transactions.pop();
        setTotalSpent(totalSpent - lastTransaction.amount);
        setAmountLeft(budget - (totalSpent - lastTransaction.amount));
        setTransactions([...transactions]);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ padding: '20px', backgroundColor: theme.palette.background.default, maxWidth: '800px', margin: '0 auto' }}>
                <Typography variant="h4" color="primary" gutterBottom>Resumen de Gastos</Typography>

                <Typography variant="h6" color="textSecondary">
                    Presupuesto Diario: ${budget.toFixed(2)} | Gastos: ${totalSpent.toFixed(2)} | Disponible: ${amountLeft.toFixed(2)}
                </Typography>

                {/* Gráfica de Pastel */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                    <PieChart width={400} height={400}>
                        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                    <Box sx={{ position: 'absolute', top: 'calc(50% - 40px)', textAlign: 'center' }}>
                        <Typography variant="h5" color="success.main">${amountLeft.toFixed(2)}</Typography>
                        <Typography variant="subtitle1" color="error.main">Gastos: ${totalSpent.toFixed(2)}</Typography>
                    </Box>
                </Box>

                {/* Botones y Formulario de Agregar Transacción */}
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button variant="contained" color="primary" onClick={handleOpenModal}>Agregar Gasto</Button>
                    <Button variant="contained" color="secondary" sx={{ marginLeft: '10px' }} onClick={handleDeleteLast}>
                        Eliminar Último Gasto
                    </Button>
                </Box>

                {/* Lista de Categorías */}
                <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
                    {data.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`${item.name}: $${item.value.toFixed(2)}`} />
                        </ListItem>
                    ))}
                </List>

                {/* Modal para Agregar Nueva Transacción */}
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>Agregar Gasto</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Monto"
                            type="number"
                            fullWidth
                            margin="dense"
                            value={transactionData.amount}
                            onChange={(e) => setTransactionData({ ...transactionData, amount: e.target.value })}
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                value={transactionData.category}
                                onChange={(e) => setTransactionData({ ...transactionData, category: e.target.value })}
                            >
                                <MenuItem value="Restaurante">Restaurante</MenuItem>
                                <MenuItem value="Servicios">Servicios</MenuItem>
                                <MenuItem value="Transporte">Transporte</MenuItem>
                                <MenuItem value="Entretenimiento">Entretenimiento</MenuItem>
                                <MenuItem value="Regalos">Regalos</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Tipo</InputLabel>
                            <Select
                                value={transactionData.type}
                                onChange={(e) => setTransactionData({ ...transactionData, type: e.target.value })}
                            >
                                <MenuItem value="Gasto">Gasto</MenuItem>
                                <MenuItem value="Préstamo">Préstamo</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="secondary">Cancelar</Button>
                        <Button onClick={handleAddTransaction} color="primary">Agregar</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
};

export default HomePage;