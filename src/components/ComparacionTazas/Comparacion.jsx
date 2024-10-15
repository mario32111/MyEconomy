// src/components/Inventario/InterestRateComparison.js
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Select, MenuItem, ThemeProvider } from '@mui/material';
import { theme } from '../colors'; // Importa el tema desde el archivo que has configurado

const InterestRateComparison = () => {
  // Datos ficticios para mostrar en la tabla
  const initialData = [
    { institution: 'Banco A', product: 'Cuenta de Ahorro', rate: 3.5 },
    { institution: 'Banco B', product: 'Préstamo Personal', rate: 12.4 },
    { institution: 'Banco C', product: 'Tarjeta de Crédito', rate: 25.0 },
    { institution: 'Banco D', product: 'Depósito a Plazo Fijo', rate: 7.1 },
  ];

  const [data, setData] = useState(initialData);
  const [sortField, setSortField] = useState('rate');
  const [sortOrder, setSortOrder] = useState('asc');

  // Función para manejar la ordenación de la tabla
  const handleSortChange = (field) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);

    const sortedData = [...data].sort((a, b) => {
      if (order === 'asc') {
        return a[field] - b[field];
      } else {
        return b[field] - a[field];
      }
    });

    setData(sortedData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Comparación de Tasas de Interés</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Compara las tasas de interés de diferentes instituciones y productos financieros.
        </Typography>
        <Select
          value={sortField}
          onChange={(e) => handleSortChange(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="rate">Tasa de Interés</MenuItem>
          <MenuItem value="institution">Institución</MenuItem>
          <MenuItem value="product">Producto</MenuItem>
        </Select>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Institución</Typography></TableCell>
                <TableCell><Typography variant="h6">Producto</Typography></TableCell>
                <TableCell><Typography variant="h6" onClick={() => handleSortChange('rate')} style={{ cursor: 'pointer' }}>
                  Tasa de Interés {sortOrder === 'asc' ? '↑' : '↓'}
                </Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.institution}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>{row.rate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </ThemeProvider>
  );
};

export default InterestRateComparison;
