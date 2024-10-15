// src/components/Inventario/Filter.js
import React from 'react';
import { TextField, ThemeProvider } from '@mui/material';
import { theme } from '../colors'; // Importa el tema desde el archivo que has configurado

const Filter = ({ filter, setFilter }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        label="Filtrar Productos"
        fullWidth
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 2 }}
      />
    </ThemeProvider>
  );
};

export default Filter;
