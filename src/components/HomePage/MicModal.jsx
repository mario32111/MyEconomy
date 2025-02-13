import React, { useState, useRef, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Tabs,
    Tab,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors';

const RealTimeAudioToText = ({ openModal, handleCloseModal }) => {
    const [isListening, setIsListening] = useState(false);
    const [finalTranscription, setFinalTranscription] = useState("");
    const [interimTranscription, setInterimTranscription] = useState("");
    const [detectedCategories, setDetectedCategories] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [transactionData, setTransactionData] = useState({
        amount: "",
        category: "",
        description: "",
        phone: "",
        type: "Gasto", // Puede ser "Gasto" o "Préstamo"
    });
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
        const fragments = text.split(",").map((fragment) => fragment.trim());
        const matches = [];
        fragments.forEach((fragment) => {
            const categoryRegex = /(?:\$?(\d+(?:\.\d{1,2})?)\s*(?:pesos|))\s*(?:en|para|de)\s*([\w\s]+)(?:\s+(porque|ya que|por|debido a)\s+(.+))?/gi;
            let match;
    
            while ((match = categoryRegex.exec(fragment)) !== null) {
                const [, amount, rawCategory, , rawDescription] = match;
                let detectedCategory = predefinedCategories.find((category) =>
                    rawCategory.toLowerCase().includes(category.toLowerCase())
                );
                if (!detectedCategory) {
                    detectedCategory = "Otra";
                }
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

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        setTransactionData({
            ...transactionData,
            type: newValue === 0 ? "Gasto" : "Préstamo",
        });
    };

    const handleAddTransaction = () => {
        // Aquí puedes agregar la lógica para guardar la transacción
        console.log("Transacción agregada:", transactionData);
        handleCloseModal();
    };

    return (
        <ThemeProvider theme={theme}>
            <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
                <DialogTitle>
                    {selectedTab === 0 ? 'Agregar Gasto' : 'Agregar Préstamo'}
                </DialogTitle>
                <DialogContent>
                    <Tabs value={selectedTab} onChange={handleTabChange} centered>
                        <Tab label="Agregar Gasto" />
                        <Tab label="Agregar Préstamo" />
                    </Tabs>
                    <Box sx={{ marginTop: 2 }}>
                        <TextField
                            label="Monto"
                            type="number"
                            fullWidth
                            margin="dense"
                            value={transactionData.amount}
                            onChange={(e) => setTransactionData({ ...transactionData, amount: e.target.value })}
                        />
                        {selectedTab === 0 && (
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Categoría</InputLabel>
                                <Select
                                    value={transactionData.category}
                                    onChange={(e) => setTransactionData({ ...transactionData, category: e.target.value })}
                                >
                                    <MenuItem value="Restaurante">Restaurante</MenuItem>
                                    <MenuItem value="Transporte">Transporte</MenuItem>
                                    <MenuItem value="Renta">Renta</MenuItem>
                                    <MenuItem value="Servicios">Servicios</MenuItem>
                                    <MenuItem value="Entretenimiento">Entretenimiento</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                        <TextField
                            label={selectedTab === 0 ? 'Descripción' : 'Nombre'}
                            fullWidth
                            margin="dense"
                            value={transactionData.description}
                            onChange={(e) => setTransactionData({ ...transactionData, description: e.target.value })}
                        />
                        {selectedTab === 1 && (
                            <TextField
                                label="Teléfono"
                                fullWidth
                                margin="dense"
                                value={transactionData.phone}
                                onChange={(e) => setTransactionData({ ...transactionData, phone: e.target.value })}
                            />
                        )}
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Transcripción en Tiempo Real
                        </Typography>
                        <Box
                            sx={{
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                backgroundColor: '#ffffff',
                                textAlign: 'left',
                                minHeight: '100px',
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">Cancelar</Button>
                    <Button onClick={handleAddTransaction} color="primary">Agregar</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

export default RealTimeAudioToText;