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
    ListItemText,
    Tabs,
    Tab
} from '@mui/material';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors';

const HomePage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [totalLoan, setTotalLoan] = useState(0);
    const [budget, setBudget] = useState(1000);
    const [amountLeft, setAmountLeft] = useState(1000);
    const [transactionData, setTransactionData] = useState({ amount: '', category: '', type: 'Gasto', description: '' });
    const [selectedTab, setSelectedTab] = useState(0);

    // Colores para las categorías en el gráfico de pastel, con más tonos de azul oscuro
    const COLORS = ['#4B0082', '#8A2BE2', '#5D3FD3', '#4682B4', '#1E90FF', '#4169E1', '#6A5ACD', '#00BFFF', '#DB7093'];

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
        setTransactionData({ amount: '', category: '', type: 'Gasto', description: '' });
    };

    const handleAddTransaction = () => {
        const amount = parseFloat(transactionData.amount);
        const newTransaction = {
            ...transactionData,
            amount
        };

        // Actualizar transacciones y el total según el tipo de transacción
        setTransactions([...transactions, newTransaction]);

        if (transactionData.type === 'Gasto') {
            setTotalSpent(totalSpent + amount);
            setAmountLeft(budget - (totalSpent + amount + totalLoan));
        } else {
            setTotalLoan(totalLoan + amount);
            setAmountLeft(budget - (totalSpent + totalLoan + amount));
        }

        handleCloseModal();
    };

    const handleDeleteLast = () => {
        const lastTransaction = transactions.pop();
        if (lastTransaction.type === 'Gasto') {
            setTotalSpent(totalSpent - lastTransaction.amount);
            setAmountLeft(budget - (totalSpent - lastTransaction.amount + totalLoan));
        } else {
            setTotalLoan(totalLoan - lastTransaction.amount);
            setAmountLeft(budget - (totalSpent + totalLoan - lastTransaction.amount));
        }
        setTransactions([...transactions]);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        setTransactionData({ ...transactionData, type: newValue === 0 ? 'Gasto' : 'Préstamo' });
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ padding: '20px', backgroundColor: theme.palette.background.default, maxWidth: '800px', margin: '0 auto' }}>
                <Typography variant="h4" color="primary" gutterBottom>Resumen de Gastos</Typography>

                <Typography variant="h6" color="textSecondary">
                    Presupuesto Diario: ${budget.toFixed(2)} | Gastos: ${totalSpent.toFixed(2)} | Préstamos: ${totalLoan.toFixed(2)} | Disponible: ${amountLeft.toFixed(2)}
                </Typography>

                {/* Gráfica de Pastel */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', position: 'relative' }}>
                    <PieChart width={350} height={350}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={140}
                            cornerRadius={10} // Bordes redondeados
                            paddingAngle={4}
                            startAngle={90}
                            endAngle={450}
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                    <Box sx={{ position: 'absolute', top: 'calc(50% - 40px)', textAlign: 'center' }}>
                        <Typography variant="h5" color="success.main">${amountLeft.toFixed(2)}</Typography>
                        <Typography variant="subtitle1" color="error.main">Gastos: ${totalSpent.toFixed(2)}</Typography>
                        <Typography variant="subtitle1" color="secondary.main">Préstamos: ${totalLoan.toFixed(2)}</Typography>
                    </Box>
                </Box>

                {/* Botones y Formulario de Agregar Transacción */}
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button variant="contained" color="primary" onClick={handleOpenModal}>Agregar Gasto o Préstamo</Button>
                    <Button variant="contained" color="secondary" sx={{ marginLeft: '10px' }} onClick={handleDeleteLast}>
                        Eliminar Último
                    </Button>
                </Box>

                {/* Lista de Categorías */}
                <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
                    {transactions.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`${item.category} (${item.type}): $${item.amount.toFixed(2)} - ${item.description || 'Sin descripción'}`} />
                        </ListItem>
                    ))}
                </List>

                {/* Modal para Agregar Nueva Transacción */}
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>Agregar Gasto o Préstamo</DialogTitle>
                    <DialogContent>
                        <Tabs value={selectedTab} onChange={handleTabChange} centered>
                            <Tab label="Agregar Gasto" />
                            <Tab label="Agregar Préstamo" />
                        </Tabs>
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
                        <TextField
                            label="Descripción (opcional)"
                            type="text"
                            fullWidth
                            margin="dense"
                            value={transactionData.description}
                            onChange={(e) => setTransactionData({ ...transactionData, description: e.target.value })}
                        />
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