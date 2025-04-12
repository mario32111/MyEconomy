// src/components/Inventario/CategoryForm.js
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, ThemeProvider } from '@mui/material';
import { theme } from '../colors'; // Importa el tema desde el archivo que has configurado

const CategoryForm = ({ addCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(categoryName);
    setCategoryName('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6">Agregar Categoría</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre de la categoría"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Agregar Categoría
          </Button>
        </form>
      </Paper>
    </ThemeProvider>
  );
};

export default CategoryForm;
