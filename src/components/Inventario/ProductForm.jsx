// ProductForm.js
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, ThemeProvider } from '@mui/material';
import { theme } from '../colors'; // Importa el tema desde el archivo que has configurado

const ProductForm = ({ categories, addProduct }) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ nombre: productName, categoria: category, stock });
    setProductName('');
    setCategory('');
    setStock(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6">Agregar Producto</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre del producto"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Categoría"
            fullWidth
            select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            SelectProps={{
              native: true,
            }}
            required
            sx={{ mb: 2 }}
          >
            <option value="" disabled>Selecciona una categoría</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </TextField>
          <TextField
            label="Stock"
            type="number"
            fullWidth
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Agregar Producto
          </Button>
        </form>
      </Paper>
    </ThemeProvider>
  );
};

export default ProductForm;
