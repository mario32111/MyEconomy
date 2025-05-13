// src/features/Education/components/CourseList/CourseFilters.jsx
import React from 'react';
import { Grid, TextField, MenuItem, InputAdornment } from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';

const CourseFilters = ({ filters, onFilterChange, onSearchChange }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Buscar cursos"
          name="search"
          value={filters.search}
          onChange={(e) => {
            onSearchChange(e);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      
      <Grid item xs={6} sm={3} md={2}>
        <TextField
          select
          fullWidth
          label="Categoría"
          name="category"
          value={filters.category}
          onChange={onFilterChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterList />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="all">Todas</MenuItem>
          <MenuItem value="conceptos básicos">Conceptos Básicos</MenuItem>
          <MenuItem value="ahorro">Ahorro</MenuItem>
          <MenuItem value="inversión">Inversión</MenuItem>
        </TextField>
      </Grid>
      
      <Grid item xs={6} sm={3} md={2}>
        <TextField
          select
          fullWidth
          label="Nivel"
          name="level"
          value={filters.level}
          onChange={onFilterChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterList />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="principiante">Principiante</MenuItem>
          <MenuItem value="intermedio">Intermedio</MenuItem>
          <MenuItem value="avanzado">Avanzado</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default CourseFilters;