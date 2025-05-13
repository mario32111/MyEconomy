import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import styles from './ExpenseTracker.module.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EventIcon from '@mui/icons-material/Event';
import CategoryIcon from '@mui/icons-material/Category';
import CloseIcon from '@mui/icons-material/Close';
import NotesIcon from '@mui/icons-material/Notes';
import DescriptionIcon from '@mui/icons-material/Description';

const TransactionModal = ({ 
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
    notes: '',
    type: 'expense'
  });

  const [errors, setErrors] = useState({});

  // Inicializar el formulario cuando se abre el modal
  useEffect(() => {
    if (transaction) {
      // Para transacción existente, usar la fecha de la transacción
      const transactionDate = new Date(transaction.date);
      // Ajustar la zona horaria para evitar problemas con UTC
      transactionDate.setMinutes(transactionDate.getMinutes() + transactionDate.getTimezoneOffset());

      setFormData({
        id: transaction.id,
        description: transaction.description || '',
        amount: Math.abs(transaction.amount).toString() || '',
        category: transaction.category || '',
        date: format(transactionDate, 'yyyy-MM-dd'),
        notes: transaction.notes || '',
        type: transaction.amount < 0 ? 'expense' : 'income'
      });
    } else {
      // Para nueva transacción, usar la fecha seleccionada
      // Ajustar la zona horaria para evitar problemas con UTC
      const adjustedDate = new Date(selectedDate);
      adjustedDate.setMinutes(adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset());

      setFormData({
        description: '',
        amount: '',
        category: '',
        date: format(adjustedDate, 'yyyy-MM-dd'),
        notes: '',
        type: 'expense'
      });
    }
  }, [transaction, selectedDate]);

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

  const handleTypeChange = (type) => {
    setFormData({
      ...formData,
      type
    });
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

  const handleSubmit = () => {
    if (!validate()) return;

    // Preparar datos para guardar
    // Crear una fecha correcta que no se desplace por zona horaria
    const selectedDate = new Date(formData.date);
    // Ajustar para que se guarde con la fecha correcta
    selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());

    const transactionData = {
      ...formData,
      amount: formData.type === 'expense' 
        ? -Math.abs(parseFloat(formData.amount)) 
        : Math.abs(parseFloat(formData.amount)),
      date: selectedDate
    };

    onSave(transactionData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {transaction ? 'Editar Transacción' : 'Nueva Transacción'}
          </h2>
          <button 
            className={styles.modalClose} 
            onClick={onClose}
            aria-label="Cerrar"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Tipo de transacción */}
          <div className={styles.formGroup}>
            <div className={styles.segmentedControl}>
              <button 
                className={`${styles.segmentButton} ${formData.type === 'expense' ? styles.segmentActive : ''}`}
                onClick={() => handleTypeChange('expense')}
              >
                <RemoveIcon style={{ marginRight: '4px' }} />
                Gasto
              </button>
              <button 
                className={`${styles.segmentButton} ${formData.type === 'income' ? styles.segmentActive : ''}`}
                onClick={() => handleTypeChange('income')}
              >
                <AddIcon style={{ marginRight: '4px' }} />
                Ingreso
              </button>
            </div>
          </div>

          {/* Descripción */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Descripción <span className={styles.requiredField}>*</span>
            </label>
            <div className={styles.inputWithIcon}>
              <input
                type="text"
                className={styles.formInput}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="¿En qué gastaste?"
              />
              <div className={styles.inputIcon}>
                <DescriptionIcon />
              </div>
            </div>
            {errors.description && (
              <div className={styles.errorText}>{errors.description}</div>
            )}
          </div>

          {/* Monto y Fecha */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Monto <span className={styles.requiredField}>*</span>
              </label>
              <div className={styles.inputWithIcon}>
                <input
                  type="number"
                  className={styles.formInput}
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                <div className={styles.inputIcon}>
                  <AttachMoneyIcon />
                </div>
              </div>
              {errors.amount && (
                <div className={styles.errorText}>{errors.amount}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Fecha <span className={styles.requiredField}>*</span>
              </label>
              <div className={styles.inputWithIcon}>
                <input
                  type="date"
                  className={styles.formInput}
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
                <div className={styles.inputIcon}>
                  <EventIcon />
                </div>
              </div>
              {errors.date && (
                <div className={styles.errorText}>{errors.date}</div>
              )}
            </div>
          </div>

          {/* Categoría */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Categoría <span className={styles.requiredField}>*</span>
            </label>
            <div className={styles.inputWithIcon}>
              <select
                className={styles.formSelect}
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className={styles.inputIcon}>
                <CategoryIcon />
              </div>
            </div>
            {errors.category && (
              <div className={styles.errorText}>{errors.category}</div>
            )}
          </div>

          {/* Notas */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Notas (opcional)
            </label>
            <div className={styles.inputWithIcon}>
              <textarea
                className={styles.formTextarea}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Agrega detalles adicionales..."
              ></textarea>
              <div className={styles.inputIcon} style={{ top: '12px' }}>
                <NotesIcon />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button 
            className={styles.buttonCancel}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className={styles.buttonSave}
            onClick={handleSubmit}
          >
            {transaction ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
