import React, { useState, useRef, useEffect } from 'react';
import styles from './ExpenseTracker.module.css';

const VoiceInputModal = ({ isOpen, onClose, onSave, categories }) => {
  const [isListening, setIsListening] = useState(false);
  const [finalTranscription, setFinalTranscription] = useState('');
  const [interimTranscription, setInterimTranscription] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  
  // Configuración del reconocimiento de voz
  useEffect(() => {
    if ("webkitSpeechRecognition" in window && !recognitionRef.current) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "es-ES";
      
      recognitionRef.current.onresult = (event) => {
        let interim = "";
        let final = "";
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const processedText = processSpokenText(event.results[i][0].transcript);
            final += processedText + " ";
            
            // Extraer información de la transcripción
            const extractedData = extractTransactionData(processedText);
            if (extractedData) {
              setParsedData(extractedData);
            }
          } else {
            interim += processSpokenText(event.results[i][0].transcript);
          }
        }
        
        if (final) {
          setFinalTranscription((prev) => prev + final);
        }
        setInterimTranscription(interim);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setError("Error en el reconocimiento de voz. Intenta de nuevo.");
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          try {
            recognitionRef.current.start();
          } catch (error) {
            console.error("Failed to restart recognition:", error);
            setIsListening(false);
            setError("Error al reiniciar el reconocimiento de voz.");
          }
        }
      };
    } else if (!("webkitSpeechRecognition" in window)) {
      setError("El reconocimiento de voz no es compatible con este navegador. Por favor, usa Google Chrome.");
    }
  }, [isListening]);
  
  // Procesar texto hablado
  const processSpokenText = (text) => {
    const replacements = {
      uno: "1", dos: "2", tres: "3", cuatro: "4", cinco: "5", 
      seis: "6", siete: "7", ocho: "8", nueve: "9", cero: "0", 
      coma: ",", punto: ".", "punto y coma": ";",
    };
    
    return text
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .map((word) => replacements[word] || word)
      .join(" ");
  };
  
  // Extraer datos de transacción del texto
  const extractTransactionData = (text) => {
    const predefinedCategories = [
      "Restaurante", "Transporte", "Renta", "Servicios", 
      "Entretenimiento", "Comida", "Supermercado"
    ];
    
    // Buscar patrones como "120 pesos en comida" o "compra de supermercado por 120 pesos"
    const categoryRegex = /(?:\$?(\d+(?:\.\d{1,2})?)\s*(?:pesos|))\s*(?:en|para|de)\s*([\w\s]+)(?:\s+(porque|ya que|por|debido a)\s+(.+))?/gi;
    const purchaseRegex = /(?:compra|gasto|pago)\s+(?:de|en|por)\s+([\w\s]+)\s+(?:por|de)\s+\$?(\d+(?:\.\d{1,2})?)\s*(?:pesos|)/gi;
    
    let match;
    
    // Intentar con el primer patrón
    while ((match = categoryRegex.exec(text)) !== null) {
      const [, amount, rawCategory] = match;
      let detectedCategory = predefinedCategories.find((category) =>
        rawCategory.toLowerCase().includes(category.toLowerCase())
      ) || "Otra";
      
      return {
        description: `Gasto en ${rawCategory.trim()}`,
        amount: parseFloat(amount),
        category: detectedCategory,
        date: new Date().toISOString().split('T')[0]
      };
    }
    
    // Intentar con el segundo patrón
    while ((match = purchaseRegex.exec(text)) !== null) {
      const [, description, amount] = match;
      let detectedCategory = predefinedCategories.find((category) =>
        description.toLowerCase().includes(category.toLowerCase())
      ) || "Otra";
      
      return {
        description: description.trim(),
        amount: parseFloat(amount),
        category: detectedCategory,
        date: new Date().toISOString().split('T')[0]
      };
    }
    
    return null;
  };
  
  const startListening = () => {
    if (!recognitionRef.current) return;
    
    setError(null);
    setFinalTranscription('');
    setInterimTranscription('');
    setParsedData(null);
    
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error("Failed to start recognition:", error);
      setError("Error al iniciar el reconocimiento de voz.");
    }
  };
  
  const stopListening = () => {
    if (!recognitionRef.current) return;
    
    recognitionRef.current.stop();
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
        notes: `Agregado por voz: "${finalTranscription.trim()}"`
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving voice transaction:', error);
      setError('Error al guardar la transacción. Intenta de nuevo.');
    }
  };
  
  if (!isOpen) return null;
  
  const transcript = finalTranscription + interimTranscription;
  
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
                margin: '0 auto',
                backgroundColor: isListening ? '#ff4d4d' : '#4caf50',
                color: '#fff',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
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
                  fontSize: '0.875rem',
                  position: 'relative'
                }}
              >
                {transcript}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: isListening ? '#4caf50' : '#ccc',
                    animation: isListening ? 'blink 1s infinite' : 'none',
                  }}
                />
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