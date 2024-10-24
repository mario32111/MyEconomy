import React, { useState } from 'react';
import { Box, Typography, Grid, Button, TextField, List, ListItem, ListItemText, FormControl, Select, MenuItem } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors';
import { Slide } from '@mui/material';

const ShoppingSimulator = () => {
    const [checked, setChecked] = useState(true);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [store, setStore] = useState('');
    const [cashPrice, setCashPrice] = useState('');
    const [weeks, setWeeks] = useState('');
    const [weeklyPayment, setWeeklyPayment] = useState('');
    const [history, setHistory] = useState([]);

    // Función para calcular el total a crédito y las estadísticas
    const calculateStats = () => {
        const cash = parseFloat(cashPrice);
        const creditTotal = parseFloat(weeks) * parseFloat(weeklyPayment);
        const increase = creditTotal - cash;
        const increasePercentage = ((increase / cash) * 100).toFixed(2);

        return {
            creditTotal,
            increase,
            increasePercentage,
        };
    };

    // Agregar producto al carrito con estadísticas
    const addToCart = () => {
        if (store && cashPrice && weeks && weeklyPayment) {
            const { creditTotal, increase, increasePercentage } = calculateStats();
            const product = {
                id: cart.length + 1,
                store,
                cashPrice: parseFloat(cashPrice),
                creditTotal,
                weeks: parseInt(weeks),
                weeklyPayment: parseFloat(weeklyPayment),
                increase,
                increasePercentage,
                version: 1
            };

            setCart([...cart, product]);
            setTotal(total + creditTotal);
            setStore('');
            setCashPrice('');
            setWeeks('');
            setWeeklyPayment('');
        }
    };

    // Editar un producto del carrito
    const editCartItem = (productId) => {
        const product = cart[productId];
        setStore(product.store);
        setCashPrice(product.cashPrice.toString());
        setWeeks(product.weeks.toString());
        setWeeklyPayment(product.weeklyPayment.toString());
        
        // Guardar la versión previa en el historial
        setHistory([...history, { ...product, version: product.version }]);
    };

    // Actualizar producto modificado en el carrito
    const updateCartItem = (productId) => {
        const updatedCart = cart.map((item, index) => {
            if (index === productId) {
                const { creditTotal, increase, increasePercentage } = calculateStats();
                return {
                    ...item,
                    store,
                    cashPrice: parseFloat(cashPrice),
                    weeks: parseInt(weeks),
                    weeklyPayment: parseFloat(weeklyPayment),
                    creditTotal,
                    increase,
                    increasePercentage,
                    version: item.version + 1 // Incrementar la versión del producto
                };
            }
            return item;
        });
        
        setCart(updatedCart);
        setTotal(updatedCart.reduce((acc, item) => acc + item.creditTotal, 0));
        setStore('');
        setCashPrice('');
        setWeeks('');
        setWeeklyPayment('');
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ padding: '20px', marginTop: '30px', maxWidth: '800px', margin: '0 auto' }}>
                <Typography variant="h5" color="primary" gutterBottom>
<<<<<<< HEAD
                    Simulador de Intereses a Meses
=======
                    Simulador de Interes de Banco
>>>>>>> f80835a3f1c9d349f14172cc57036c85ca9951d8
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Slide in={checked} timeout={500}>
                            <Box>
                                <Typography variant="h6" color="secondary" gutterBottom>
                                    Ingresar Detalles del Producto
                                </Typography>
                                <FormControl fullWidth margin="normal">
<<<<<<< HEAD
                                    <Select value={store} onChange={(e) => setStore(e.target.value)} displayEmpty>
                                        <MenuItem value="">Seleccionar Tienda</MenuItem>
                                        <MenuItem value="Elektra">Elektra</MenuItem>
                                        <MenuItem value="Coppel">Coppel</MenuItem>
                                        <MenuItem value="Liverpool">Liverpool</MenuItem>
=======
                                    <Select
                                        value={taxRate}
                                        onChange={(e) => setTaxRate(e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value={0}>personalizar</MenuItem>
                                        <MenuItem value={0}>Sin Impuesto</MenuItem>
                                        <MenuItem value={5}>IVA 5%</MenuItem>
                                        <MenuItem value={10}>IVA 10%</MenuItem>
                                        <MenuItem value={16}>IVA 16%</MenuItem>
>>>>>>> f80835a3f1c9d349f14172cc57036c85ca9951d8
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Precio al Contado"
                                    type="number"
                                    value={cashPrice}
                                    onChange={(e) => setCashPrice(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Número de Semanas"
                                    type="number"
                                    value={weeks}
                                    onChange={(e) => setWeeks(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Pago Semanal"
                                    type="number"
                                    value={weeklyPayment}
                                    onChange={(e) => setWeeklyPayment(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={addToCart}
                                    fullWidth
                                    sx={{ marginTop: '10px' }}
                                >
                                    Agregar al Carrito
                                </Button>
                            </Box>
                        </Slide>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Slide in={checked} direction="up" timeout={500}>
                            <Box>
                                <Typography variant="h6" color="secondary" gutterBottom>
                                    Carrito de Compras
                                </Typography>
                                <List>
                                    {cart.length === 0 ? (
                                        <Typography variant="body1" color="text.secondary">
                                            El carrito está vacío.
                                        </Typography>
                                    ) : (
                                        cart.map((item, index) => (
                                            <ListItem key={index} divider>
                                                <ListItemText
                                                    primary={`${item.store}: $${item.cashPrice.toFixed(2)} al contado (Versión: ${item.version})`}
                                                    secondary={`A crédito: $${item.creditTotal.toFixed(2)} | Aumento: ${item.increasePercentage}% | Diferencia: $${item.increase.toFixed(2)}`}
                                                />
                                                <Button
                                                    size="small"
                                                    color="secondary"
                                                    onClick={() => editCartItem(index)}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => updateCartItem(index)}
                                                    disabled={store === '' || cashPrice === '' || weeks === '' || weeklyPayment === ''}
                                                >
                                                    Actualizar
                                                </Button>
                                            </ListItem>
                                        ))
                                    )}
                                </List>
                                <Typography variant="h6" color="primary" sx={{ marginTop: '20px' }}>
                                    Total: ${total.toFixed(2)}
                                </Typography>
                            </Box>
                        </Slide>
                    </Grid>

                    <Grid item xs={12}>
                        <Slide in={checked} direction="up" timeout={500}>
                            <Box>
                                <Typography variant="h6" color="secondary" gutterBottom>
                                    Historial de Modificaciones
                                </Typography>
                                <List>
                                    {history.length === 0 ? (
                                        <Typography variant="body1" color="text.secondary">
                                            No hay historial.
                                        </Typography>
                                    ) : (
                                        history.map((item, index) => (
                                            <ListItem key={index} divider>
                                                <ListItemText
                                                    primary={`${item.store}: $${item.cashPrice.toFixed(2)} al contado (Versión: ${item.version})`}
                                                    secondary={`A crédito: $${item.creditTotal.toFixed(2)} | Aumento: ${item.increasePercentage}% | Diferencia: $${item.increase.toFixed(2)}`}
                                                />
                                            </ListItem>
                                        ))
                                    )}
                                </List>
                            </Box>
                        </Slide>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default ShoppingSimulator;
