// LiveSupport.js
import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors'; // Importa el tema desde el archivo que has configurado

const LiveSupport = () => {
  const [messages, setMessages] = useState([
    { text: "Hola, ¿en qué puedo ayudarte?", sender: "support" }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Agregar el mensaje del usuario
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");

      // Simular una respuesta automática del soporte
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "Gracias por tu mensaje, un momento mientras reviso tu consulta.", sender: "support" }
        ]);
      }, 1000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          my: 4,
          p: 2,
          bgcolor: 'background.default',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          Soporte en Vivo
        </Typography>
        <Paper elevation={3} sx={{ height: 300, overflow: 'auto', p: 2, mb: 2 }}>
          <List>
            {messages.map((message, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={message.text}
                  primaryTypographyProps={{
                    align: message.sender === "user" ? "right" : "left",
                    color: message.sender === "user" ? "primary" : "text.primary",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Escribe tu mensaje..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LiveSupport;
