import React, { useState, useRef, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors';

const RealTimeAudioToText = () => {
    const [isListening, setIsListening] = useState(false);
    const [finalTranscription, setFinalTranscription] = useState("");
    const [interimTranscription, setInterimTranscription] = useState("");
    const [detectedCategories, setDetectedCategories] = useState([]);
    const recognitionRef = useRef(null);
    useEffect(() => {
        if ("webkitSpeechRecognition" in window && !recognitionRef.current) {
            const SpeechRecognition = window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = "es-ES";
            recognitionRef.current.onresult = (event) => {
                let interim = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        const processedText = processSpokenText(event.results[i][0].transcript);
                        setFinalTranscription((prev) => prev + processedText + " ");
                        const categories = extractCategories(processedText);
                        if (categories.length > 0) {
                            setDetectedCategories((prev) => [...prev, ...categories]);
                        }
                    } else {
                        interim += processSpokenText(event.results[i][0].transcript);
                    }
                }
                setInterimTranscription(interim);
            };
            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                setIsListening(false);
            };
            recognitionRef.current.onend = () => {
                if (isListening) {
                    try {
                        recognitionRef.current.start();
                    } catch (error) {
                        console.error("Failed to restart recognition:", error);
                    }
                }
            };
        } else if (!("webkitSpeechRecognition" in window)) {
            alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
        }
    }, [isListening]);
    const processSpokenText = (text) => {
        const replacements = {
            uno: "1", dos: "2", tres: "3", cuatro: "4", cinco: "5", seis: "6", siete: "7", ocho: "8", nueve: "9", cero: "0", coma: ",", punto: ".", "punto y coma": ";",
        };
        return text
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .map((word) => replacements[word] || word)
            .join(" ");
    };
    const extractCategories = (text) => {
        const predefinedCategories = [
            "Restaurante",
            "Transporte",
            "Renta",
            "Servicios",
            "Entretenimiento",
            "Préstamo"
        ];
        // Dividir el texto por comas y procesar cada fragmento
        const fragments = text.split(",").map((fragment) => fragment.trim());
        const matches = [];
        fragments.forEach((fragment) => {
            const categoryRegex = /(?:\$?(\d+(?:\.\d{1,2})?)\s*(?:pesos|))\s*(?:en|para|de)\s*([\w\s]+)(?:\s+(porque|ya que|por|debido a)\s+(.+))?/gi;
            let match;
    
            // Intentar encontrar coincidencias en cada fragmento
            while ((match = categoryRegex.exec(fragment)) !== null) {
                const [, amount, rawCategory, , rawDescription] = match;
                let detectedCategory = predefinedCategories.find((category) =>
                    rawCategory.toLowerCase().includes(category.toLowerCase())
                );
                if (!detectedCategory) {
                    detectedCategory = "Otra";
                }
                // Descripción: incluir el texto completo sin monto ni categoría detectada
                const description = fragment
                    .replace(new RegExp(`\\$?${amount}`, "g"), "")
                    .replace(new RegExp(detectedCategory, "i"), "")
                    .trim();
                matches.push({
                    amount: parseFloat(amount),
                    category: detectedCategory,
                    description: description || "Sin descripción",
                });
            }
        });
        return matches.length > 0 ? matches : [];
    };
    const toggleListening = () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
            setFinalTranscription((prev) => prev.trimEnd() + ".");
        } else {
            try {
                recognitionRef.current.start();
                setFinalTranscription("");
                setInterimTranscription("");
                setDetectedCategories([]);
            } catch (error) {
                console.error("Failed to start recognition:", error);
            }
        }
        setIsListening(!isListening);
    };
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    padding: '20px',
                    marginTop: '30px',
                    maxWidth: '600px',
                    margin: '0 auto',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '90vh',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
                }}
            >
                <Typography variant="h5" color="primary" gutterBottom>
                    Audio a Texto
                </Typography>
                <Box
                    sx={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff',
                        textAlign: 'left',
                        minHeight: '300px',
                        width: '100%',
                        overflowY: 'auto',
                        fontFamily: 'monospace',
                        fontSize: '16px',
                        lineHeight: '1.5',
                        position: 'relative'
                    }}
                >
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        component="pre"
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                        }}
                    >
                        {finalTranscription + interimTranscription}
                    </Typography>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: isListening ? '#4caf50' : '#ccc',
                            animation: isListening ? 'blink 1s infinite' : 'none',
                            '@keyframes blink': {
                                '0%': { opacity: 1 },
                                '50%': { opacity: 0.5 },
                                '100%': { opacity: 1 }
                            }
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        marginTop: '20px',
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#e8f5e9',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <Typography variant="h6" color="primary" gutterBottom>
                        Categorías Detectadas
                    </Typography>
                    {detectedCategories.length > 0 ? (
                        <Box
                            component="table"
                            sx={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                textAlign: 'left',
                                backgroundColor: '#fff',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Monto</th>
                                    <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Categoría</th>
                                    <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detectedCategories.map((category, index) => (
                                    <tr key={index}>
                                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>${category.amount.toFixed(2)}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{category.category}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{category.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Box>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No se han detectado categorías aún.
                        </Typography>
                    )}
                </Box>
                <Button
                    variant="contained"
                    color={isListening ? "secondary" : "primary"}
                    onClick={toggleListening}
                    sx={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        backgroundColor: isListening ? '#ff4d4d' : '#4caf50',
                        color: '#fff',
                        fontSize: '16px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '20px'
                    }}
                >
                    {isListening ? "Parar" : "Inicio"}
                </Button>
            </Box>
        </ThemeProvider>
    );
};
export default RealTimeAudioToText;