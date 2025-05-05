import React, { useState, useEffect, useRef } from 'react';
import styles from './ExpenseTracker.module.css';
import { format } from 'date-fns';

const TransactionModal = ({ isOpen, onClose, transaction, categories, onSave, selectedDate }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    notes: ''
  });

  const modalRef = useRef(null);

  useEffect(() => {
    if (transaction) {
      setFormData({
        id: transaction.id,
        description: transaction.description || '',
        amount: Math.abs(transaction.amount).toString() || '',
        type: transaction.amount < 0 ? 'expense' : 'income',
        category: transaction.category || '',
        date: transaction.date ? format(new Date(transaction.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
        notes: transaction.notes || ''
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        type: 'expense',
        category: '',
        date: format(selectedDate || new Date(), 'yyyy-MM-dd'),
        notes: ''
      });
    }
  }, [transaction, selectedDate]);

  // Cerrar modal al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!formData.description || !formData.amount || !formData.category) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    // Convertir monto a número y aplicar signo según tipo
    const amount = parseFloat(formData.amount);
    if (isNaN(amount)) {
      alert('Por favor ingresa un monto válido');
      return;
    }

    // Crear objeto de transacción
    const transactionData = {
      ...formData,
      amount: formData.type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      date: new Date(formData.date).toISOString()
    };

    // Guardar transacción
    if (transaction) {
      onSave(transactionData);
    } else {
      onSave(transactionData);
    }

    // Cerrar modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {transaction ? 'Editar Transacción' : 'Nueva Transacción'}
            <span className={styles.modalDate}>
              {format(selectedDate || new Date(), 'dd MMM yyyy')}
            </span>
          </h2>
          <button className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Tipo de Transacción</label>
              <div className={styles.segmentedControl}>
                <button
                  type="button"
                  className={`${styles.segmentButton} ${formData.type === 'expense' ? styles.segmentActive : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
                >
                  Gasto
                </button>
                <button
                  type="button"
                  className={`${styles.segmentButton} ${formData.type === 'income' ? styles.segmentActive : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
                >
                  Ingreso
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="description">
                Descripción <span className={styles.requiredField}>*</span>
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Ej. Compra de supermercado"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="amount">
                Monto <span className={styles.requiredField}>*</span>
              </label>
              <div className={styles.inputWithIcon}>
                <span className={styles.inputIcon}>$</span>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="category">
                Categoría <span className={styles.requiredField}>*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.formSelect}
                required
              >
                <option value="" disabled>Selecciona una categoría</option>
                {categories
                  .filter(cat => formData.type === 'expense' ? !cat.isIncome : cat.isIncome)
                  .map(category => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="date">
                Fecha <span className={styles.requiredField}>*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="notes">
                Notas
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className={styles.formTextarea}
                placeholder="Detalles adicionales..."
                rows="3"
              />
            </div>

            <div className={styles.modalFooter}>
              <button type="button" className={styles.buttonCancel} onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className={styles.buttonSave}>
                {transaction ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;