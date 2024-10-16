import React, { useState } from 'react';
import { Box, Typography, Grid, Button, TextField, List, ListItem, ListItemText, FormControl, Select, MenuItem } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors'; // Importa el tema desde tu archivo de configuración
import { Slide } from '@mui/material';

const ShoppingSimulator = () => {
    const [checked, setChecked] = useState(true); // Estado para el control de la animación
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [taxRate, setTaxRate] = useState(0);

    // Función para agregar productos personalizados al carrito
    const addToCart = () => {
        if (productName && productPrice) {
            const price = parseFloat(productPrice);
            const taxAmount = (price * taxRate) / 100;
            const totalPrice = price + taxAmount;
            const product = { id: cart.length + 1, name: productName, price: totalPrice, basePrice: price, taxRate: taxRate };

            setCart([...cart, product]);
            setTotal(total + totalPrice);
            setProductName('');
            setProductPrice('');
            setTaxRate(0);
        }
    };

    // Función para eliminar productos del carrito
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item, index) => index !== productId);
        const removedProduct = cart[productId];
        setCart(updatedCart);
        setTotal(total - removedProduct.price);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    padding: { xs: '10px', md: '20px' },
                    marginTop: '30px',
                    width: '100%',
                    maxWidth: '800px',
                    margin: '0 auto',
                }}
            >
                <Typography variant="h5" color="primary" gutterBottom>
                    Simulador de Compras
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Slide in={checked} timeout={500}>
                            <Box>
                                <Typography variant="h6" color="secondary" gutterBottom>
                                    Ingresar Detalles del Producto
                                </Typography>
                                <TextField
                                    label="Nombre del Producto"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Precio del Producto"
                                    type="number"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <FormControl fullWidth margin="normal">
                                    <Select
                                        value={taxRate}
                                        onChange={(e) => setTaxRate(e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value={0}>Sin Impuesto</MenuItem>
                                        <MenuItem value={5}>IVA 5%</MenuItem>
                                        <MenuItem value={10}>IVA 10%</MenuItem>
                                        <MenuItem value={16}>IVA 16%</MenuItem>
                                    </Select>
                                </FormControl>
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
                                                    primary={`${item.name} (Impuesto: ${item.taxRate}%)`}
                                                    secondary={`Precio: $${item.basePrice} + Impuesto: $${(item.basePrice * item.taxRate / 100).toFixed(2)} = $${item.price.toFixed(2)}`}
                                                />
                                                <Button
                                                    size="small"
                                                    color="secondary"
                                                    onClick={() => removeFromCart(index)}
                                                >
                                                    Eliminar
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
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default ShoppingSimulator;
