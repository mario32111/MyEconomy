// src/features/Finance/components/ExpenseTracker/EnhancedTransactionModal.jsx
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Grid,
  IconButton,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';

// Import global UI components
import Input from '../../../../shared/components/UI/Input/Input';
import Button from '../../../../shared/components/UI/Button/Button';

const EnhancedTransactionModal = ({ 
  isOpen, 
  onClose, 
  transaction, 
  categories, 
  onSave,
  selectedDate 
}) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Initialize form with transaction data if editing
  useEffect(() => {
    if (transaction) {
      setFormData({
        id: transaction.id,
        description: transaction.description || '',
        amount: Math.abs(transaction.amount).toString() || '',
        category: transaction.category || '',
        date: format(new Date(transaction.date), 'yyyy-MM-dd'),
        notes: transaction.notes || '',
        type: transaction.amount < 0 ? 'expense' : 'income'
      });
    } else {
      // New transaction - set default values
      setFormData({
        description: '',
        amount: '',
        category: '',
        date: format(selectedDate || new Date(), 'yyyy-MM-dd'),
        notes: '',
        type: 'expense' // Default to expense
      });
    }
  }, [transaction, selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.amount) {
      newErrors.amount = 'El monto es requerido';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Ingresa un monto válido mayor a cero';
    }

    if (!formData.category) {
      newErrors.category = 'Selecciona una categoría';
    }

    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Prepare data for saving
      const saveData = {
        ...formData,
        amount: parseFloat(formData.amount) * (formData.type === 'expense' ? -1 : 1),
        date: new Date(formData.date)
      };

      await onSave(saveData);
      onClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
      setErrors({ submit: 'Error al guardar la transacción' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        {transaction ? 'Editar Transacción' : 'Nueva Transacción'}
        <IconButton 
          edge="end" 
          color="inherit" 
          onClick={onClose} 
          disabled={loading}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                placeholder="Ej. Compra de supermercado"
                required
                fullWidth
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label="Monto"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                error={!!errors.amount}
                helperText={errors.amount}
                placeholder="0.00"
                required
                fullWidth
                startAdornment="$"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel>Tipo</InputLabel>
                <Select
                  name="type"
                  value={formData.type || 'expense'}
                  onChange={handleChange}
                  label="Tipo"
                >
                  <MenuItem value="expense">Gasto</MenuItem>
                  <MenuItem value="income">Ingreso</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Categoría"
                >
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.name}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            bgcolor: category.color,
                            mr: 1
                          }} 
                        />
                        {category.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label="Fecha"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                error={!!errors.date}
                helperText={errors.date}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Input
                label="Notas (opcional)"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Detalles adicionales..."
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onClose}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          loading={loading}
          type="submit"
        >
          {transaction ? 'Actualizar' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnhancedTransactionModal;
