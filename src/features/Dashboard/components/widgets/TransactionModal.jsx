import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { addTransaction } from '../../../../shared/services/financeService';

// Categorías predefinidas
const categories = [
  'Alimentación',
  'Transporte',
  'Vivienda',
  'Entretenimiento',
  'Salud',
  'Educación',
  'Ropa',
  'Servicios',
  'Otros'
];

const TransactionModal = ({ open, onClose, onTransactionAdded, userId }) => {
  // Obtener fecha actual en formato YYYY-MM-DD
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: formattedToday,
    type: 'gasto'
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'El monto es requerido';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Ingrese un monto válido mayor a cero';
    }
    
    if (!formData.category) {
      newErrors.category = 'Seleccione una categoría';
    }
    
    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validate()) return;
    
    setLoading(true);
    try {
      // Preparar datos para guardar
      const transactionData = {
        ...formData,
        date: formData.date,
        amount: formData.type === 'gasto' ? -Math.abs(parseFloat(formData.amount)) : Math.abs(parseFloat(formData.amount)),
        user_id: userId
      };
      
      console.log('Guardando transacción con fecha:', transactionData.date);
      
      await addTransaction(transactionData);
      onTransactionAdded();
      
      // Resetear formulario
      setFormData({
        description: '',
        amount: '',
        category: '',
        date: formattedToday,
        type: 'gasto'
      });
    } catch (error) {
      console.error('Error al agregar transacción:', error);
      setErrors({ 
        submit: `Error al guardar la transacción: ${error.message || 'Intente nuevamente.'}` 
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Nueva Transacción
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Tipo</InputLabel>
              <Select
                labelId="type-label"
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="Tipo"
              >
                <MenuItem value="gasto">Gasto</MenuItem>
                <MenuItem value="ingreso">Ingreso</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Monto"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              error={!!errors.amount}
              helperText={errors.amount}
              InputProps={{
                startAdornment: <Box component="span" mr={0.5}>$</Box>
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              error={!!errors.date}
              helperText={errors.date}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel id="category-label">Categoría</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={formData.category}
                onChange={handleChange}
                label="Categoría"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
            </FormControl>
          </Grid>
          
          {errors.submit && (
            <Grid item xs={12}>
              <Typography color="error" variant="body2">
                {errors.submit}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionModal;