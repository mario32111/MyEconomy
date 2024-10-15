// InventoryApp.js
import React, { useState } from 'react';
import ProductForm from './ProductForm';
import CategoryForm from './CategoryForm';
import ProductList from './ProductList';
import Filter from './Filter';
import { Container, Typography, ThemeProvider } from '@mui/material';
import { theme } from '../colors'; // Importa el tema desde el archivo que has configurado

const InventoryApp = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Sistema Gestor de Inventario
        </Typography>
        <CategoryForm addCategory={addCategory} />
        <ProductForm categories={categories} addProduct={addProduct} />
        <Filter filter={filter} setFilter={setFilter} />
        <ProductList products={filteredProducts} />
      </Container>
    </ThemeProvider>
  );
};

export default InventoryApp;
