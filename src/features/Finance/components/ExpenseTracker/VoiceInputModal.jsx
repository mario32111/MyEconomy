import React, { useState, useEffect } from 'react';
import styles from './ExpenseTracker.module.css';

const VoiceInputModal = ({ isOpen, onClose, onSave, categories }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState(null);
  
  // Simulación de reconocimiento de voz
  useEffect(() => {
    if (!isListening) return;
    
    // Simulamos el reconocimiento de voz
    const timer = setTimeout(() => {
      setTranscript('Compra de supermercado por 120 pesos en categoría comida');
      setIsListening(false);
      
      // Simulamos el análisis del texto
      setParsedData({
        description: 'Compra de supermercado',
        amount: 120,
        category: 'Comida',
        date: new Date().toISOString().split('T')[0]
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isListening]);
  
  const startListening = () => {
    setError(null);
    setTranscript('');
    setParsedData(null);
    setIsListening(true);
  };
  
  const stopListening = () => {
    setIsListening(false);
  };
  
  const handleSave = async () => {
    if (!parsedData) return;
    
    try {
      await onSave({
        description: parsedData.description,
        amount: -parsedData.amount, // Negativo para gastos
        date: parsedData.date,
        category: parsedData.category,
        notes: `Agregado por voz: "${transcript}"`
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving voice transaction:', error);
      setError('Error al guardar la transacción. Intenta de nuevo.');
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Agregar por Voz</h2>
          <button className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className={styles.modalBody}>
          {error && (
            <div className={styles.errorContainer} style={{ marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <button
              onClick={isListening ? stopListening : startListening}
              className={`${styles.button} ${isListening ? styles.buttonGreen : styles.buttonBlue}`}
              style={{ 
                width: '5rem', 
                height: '5rem', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
              }}
            >
              {isListening ? (
                <span style={{ fontSize: '1.5rem' }}>■</span>
              ) : (
                <span style={{ fontSize: '1.5rem' }}>🎤</span>
              )}
            </button>
            <p style={{ marginTop: '1rem', color: '#6b7280' }}>
              {isListening 
                ? 'Escuchando... Habla ahora' 
                : 'Presiona para comenzar a hablar'}
            </p>
          </div>
          
          {transcript && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Texto reconocido:
              </h3>
              <div 
                style={{ 
                  padding: '1rem', 
                  backgroundColor: '#f3f4f6', 
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              >
                {transcript}
              </div>
            </div>
          )}
          
          {parsedData && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Información detectada:
              </h3>
              <div 
                style={{ 
                  padding: '1rem', 
                  backgroundColor: '#f3f4f6', 
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              >
                <p><strong>Descripción:</strong> {parsedData.description}</p>
                <p><strong>Monto:</strong> ${parsedData.amount.toFixed(2)}</p>
                <p><strong>Categoría:</strong> {parsedData.category}</p>
                <p><strong>Fecha:</strong> {parsedData.date}</p>
              </div>
            </div>
          )}
          
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.button}
              style={{ backgroundColor: '#f3f4f6', color: '#4b5563' }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className={`${styles.button} ${styles.buttonBlue}`}
              disabled={!parsedData || isListening}
            >
              Guardar Transacción
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInputModal;