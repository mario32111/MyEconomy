import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Card, CardContent, CardActions, List, ListItem, ListItemText } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors'; // Importa el tema desde el archivo que has configurado

// Datos de productos simulados
const products = [
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 150 },
    { id: 3, name: 'Producto 3', price: 200 },
    { id: 4, name: 'Producto 4', price: 250 },
];

const ShoppingSimulator = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    // Función para agregar productos al carrito
    const addToCart = (product) => {
        setCart([...cart, product]);
        setTotal(total + product.price);
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
                        <Typography variant="h6" color="secondary" gutterBottom>
                            Productos Disponibles
                        </Typography>
                        {products.map((product) => (
                            <Card key={product.id} sx={{ marginBottom: '10px' }}>
                                <CardContent>
                                    <Typography variant="h6" color="text.primary">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Precio: ${product.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => addToCart(product)}
                                    >
                                        Agregar al Carrito
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                                            primary={item.name}
                                            secondary={`$${item.price}`}
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
                            Total: ${total}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default ShoppingSimulator;
