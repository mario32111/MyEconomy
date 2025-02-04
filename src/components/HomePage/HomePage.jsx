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
    Tab,
    IconButton
} from '@mui/material';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { theme } from '../colors';

const HomePage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [totalLoan, setTotalLoan] = useState(0);
    const [budget, setBudget] = useState(1000); 
    const [amountLeft, setAmountLeft] = useState(1000);
    const [transactionData, setTransactionData] = useState({ amount: '', category: '', type: 'Gasto', description: '', phone: '' });
    const [selectedTab, setSelectedTab] = useState(0);
    const [editingIndex, setEditingIndex] = useState(null);


    const COLORS = ['#4B0082', '#8A2BE2', '#5D3FD3', '#4682B4', '#1E90FF', '#4169E1', '#6A5ACD', '#00BFFF'];

    // Datos para la gráfica (incluyendo préstamos)
    const data = transactions.reduce((acc, item) => {
        const existingCategory = acc.find(d => d.name === item.type === 'Préstamo' ? 'Préstamo' : item.category);
        if (existingCategory) {
            existingCategory.value += item.amount;
        } else {
            acc.push({ name: item.type === 'Préstamo' ? 'Préstamo' : item.category, value: item.amount });
        }
        return acc;
    }, []);

    const handleOpenModal = (index = null) => {
        if (index !== null) {
            setEditingIndex(index);
            setTransactionData(transactions[index]);
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setTransactionData({ amount: '', category: '', type: 'Gasto', description: '', phone: '' });
        setEditingIndex(null);
    };

    const handleAddTransaction = () => {
        const amount = parseFloat(transactionData.amount);

        let updatedTransactions = [...transactions];
        let updatedSpent = totalSpent;
        let updatedLoan = totalLoan;

        if (editingIndex !== null) {
            // Editando transacción existente
            const prevTransaction = updatedTransactions[editingIndex];
            if (prevTransaction.type === 'Gasto') {
                updatedSpent -= prevTransaction.amount;
            } else {
                updatedLoan -= prevTransaction.amount;
            }
            updatedTransactions[editingIndex] = { ...transactionData, amount };
        } else {
            // Agregando nueva transacción
            updatedTransactions.push({ ...transactionData, amount });
        }

        if (transactionData.type === 'Gasto') {
            updatedSpent += amount;
        } else {
            updatedLoan += amount;
        }

        setTransactions(updatedTransactions);
        setTotalSpent(updatedSpent);
        setTotalLoan(updatedLoan);
        setAmountLeft(budget - (updatedSpent + updatedLoan));
        handleCloseModal();
    };

    const handleDeleteTransaction = (index) => {
        const transactionToDelete = transactions[index];
        let updatedSpent = totalSpent;
        let updatedLoan = totalLoan;

        if (transactionToDelete.type === 'Gasto') {
            updatedSpent -= transactionToDelete.amount;
        } else {
            updatedLoan -= transactionToDelete.amount;
        }

        const updatedTransactions = transactions.filter((_, i) => i !== index);

        setTransactions(updatedTransactions);
        setTotalSpent(updatedSpent);
        setTotalLoan(updatedLoan);
        setAmountLeft(budget - (updatedSpent + updatedLoan));
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        setTransactionData({ ...transactionData, type: newValue === 0 ? 'Gasto' : 'Préstamo' });
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ padding: '20px', backgroundColor: theme.palette.background.default, maxWidth: '1000px', margin: '0 auto' }}>
                <Typography variant="h4" color="primary" gutterBottom>Resumen de Gastos</Typography>
                <Typography variant="h6" color="textSecondary" sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
                    Presupuesto Diario: ${budget.toFixed(2)} | 
                    <span style={{ color: 'red' }}>Gastos: ${totalSpent.toFixed(2)}</span> | 
                    <span style={{ color: '#FF69B4' }}>Préstamos: ${totalLoan.toFixed(2)}</span> | 
                    <span style={{ color: 'green' }}>Disponible: ${amountLeft.toFixed(2)}</span>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', position: 'relative' }}>
                    <PieChart width={450} height={450}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={100}
                            outerRadius={180}
                            cornerRadius={10}
                            paddingAngle={5}
                            startAngle={90}
                            endAngle={450}
                            label={({ value }) => `$${value}`}
                            labelLine={true}
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
                        <Typography variant="subtitle1" sx={{ color: '#FF69B4' }}>Préstamos: ${totalLoan.toFixed(2)}</Typography>
                    </Box>
                </Box>
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>Agregar Gasto o Préstamo</Button>
                </Box>
                <List sx={{ marginTop: '20px' }}>
                    {transactions.map((item, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <>
                                    <IconButton edge="end" color="primary" onClick={() => handleOpenModal(index)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" color="secondary" onClick={() => handleDeleteTransaction(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemText
                                primary={`${item.category || 'Préstamo'} (${item.type}): $${item.amount.toFixed(2)} - ${item.description || 'Sin descripción'} ${item.type === 'Préstamo' ? `(${item.phone})` : ''}`}
                            />
                        </ListItem>
                    ))}
                </List>
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>{editingIndex !== null ? 'Editar Transacción' : 'Agregar Gasto o Préstamo'}</DialogTitle>
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
                        {transactionData.type === 'Gasto' && (
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Categoría</InputLabel>
                                <Select
                                    value={transactionData.category}
                                    onChange={(e) => setTransactionData({ ...transactionData, category: e.target.value })}
                                >
                                    <MenuItem value="Restaurante">Restaurante</MenuItem>
                                    <MenuItem value="Transporte">Transporte</MenuItem>
                                    <MenuItem value="Renta">Renta</MenuItem>
                                    <MenuItem value="Servicios">Servicios</MenuItem>
                                    <MenuItem value="Entretenimiento">Entretenimiento</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                        <TextField
                            label={transactionData.type === 'Gasto' ? 'Descripción' : 'Nombre'}
                            fullWidth
                            margin="dense"
                            value={transactionData.description}
                            onChange={(e) => setTransactionData({ ...transactionData, description: e.target.value })}
                        />
                        {transactionData.type === 'Préstamo' && (
                            <TextField
                                label="Teléfono"
                                fullWidth
                                margin="dense"
                                value={transactionData.phone}
                                onChange={(e) => setTransactionData({ ...transactionData, phone: e.target.value })}
                            />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="secondary">Cancelar</Button>
                        <Button onClick={handleAddTransaction} color="primary">{editingIndex !== null ? 'Actualizar' : 'Agregar'}</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
};
export default HomePage;