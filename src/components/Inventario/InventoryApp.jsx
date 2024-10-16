import React, { useState } from 'react';
import ProductForm from './ProductForm';
import CategoryForm from './CategoryForm';
import ProductList from './ProductList';
import Filter from './Filter';
import { Container, Typography, ThemeProvider, Grow, Slide } from '@mui/material';
import { theme } from '../colors';

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
        <Grow in={true} timeout={1000}>
          <Typography variant="h4" gutterBottom>
            Sistema Gestor de Inventario
          </Typography>
        </Grow>

        <Grow in={true} timeout={1000}>
          <Slide direction="left" in={true} timeout={1000}>
            <div>
              <CategoryForm addCategory={addCategory} />
            </div>
          </Slide>
        </Grow>

        <Grow in={true} timeout={1000}>
          <Slide direction="left" in={true} timeout={1000}>
            <div>
              <ProductForm categories={categories} addProduct={addProduct} />
            </div>
          </Slide>
        </Grow>

        <Grow in={true} timeout={1000}>
          <Slide direction="left" in={true} timeout={1000}>
            <div>
              <Filter filter={filter} setFilter={setFilter} />
            </div>
          </Slide>
        </Grow>

        <Grow in={true} timeout={1000}>
          <Slide direction="left" in={true} timeout={1000}>
            <div>
              <ProductList products={filteredProducts} />
            </div>
          </Slide>
        </Grow>
      </Container>
    </ThemeProvider>
  );
};

export default InventoryApp;
