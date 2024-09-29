import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors'; // Asegúrate de que la ruta al tema sea correcta
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
} from '@mui/material';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState([]); // Almacena todas las conversaciones
  const [currentConversationIndex, setCurrentConversationIndex] = useState(null); // Conversación activa

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = { sender: 'user', text: input };

    // Si no hay conversación activa, crea una nueva
    if (currentConversationIndex === null) {
      const newConversation = { messages: [newMessage] };
      setConversations([...conversations, newConversation]);
      setCurrentConversationIndex(conversations.length); // Indica la nueva conversación
    } else {
      // Asegúrate de que la conversación actual esté definida antes de agregar un mensaje
      if (conversations[currentConversationIndex]) {
        const updatedConversations = [...conversations];
        updatedConversations[currentConversationIndex].messages.push(newMessage);
        setConversations(updatedConversations);
      }
    }

    // Simulación de respuesta de IA
    const aiMessage = { sender: 'ai', text: `Respuesta de IA para: ${input}` };
    if (conversations[currentConversationIndex]) {
      const updatedConversations = [...conversations];
      updatedConversations[currentConversationIndex].messages.push(aiMessage);
      setConversations(updatedConversations);
    }

    setInput('');
  };

  const handleNewConversation = () => {
    setCurrentConversationIndex(conversations.length); // Cambiar a una nueva conversación
    setConversations([...conversations, { messages: [] }]); // Agregar nueva conversación vacía
  };

  const handleSelectConversation = (index) => {
    setCurrentConversationIndex(index); // Cambiar a la conversación seleccionada
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '95vh',
          padding: 2,
          backgroundColor: theme.palette.background.default,
        }}
      >
{/*         <AppBar position="static" sx={{ borderTopLeftRadius: '12px',borderTopRightRadius: '12px' }}>
          <Toolbar >
            <Typography variant="h6">Chat con IA</Typography>
          </Toolbar>
        </AppBar> */}

        <Box sx={{ flex: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, overflow: 'hidden' }}>
          <Paper
            elevation={3}
            sx={{
              flex: { xs: 'none', md: '1' },
              overflow: 'auto',
              padding: 2,
              marginRight: { xs: 0, md: 2 },
              marginBottom: { xs: 2, md: 0 },
              maxWidth: { md: 300 }, // Limitamos el ancho del historial en pantallas medianas
            }}
          >
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              Historial de Conversaciones
            </Typography>
            <List>
              {conversations.map((conversation, index) => (
                <ListItem button key={index} onClick={() => handleSelectConversation(index)}>
                  <ListItemText primary={`Conversación ${index + 1} (${conversation.messages.length} mensajes)`} />
                </ListItem>
              ))}
              <Divider />
              <ListItem button onClick={handleNewConversation}>
                <ListItemText primary="Nueva Conversación" />
              </ListItem>
            </List>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              flex: 1,
              overflow: 'auto',
              padding: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              {currentConversationIndex === null
                ? 'Iniciar una Nueva Conversación'
                : 'Conversación Actual'}
            </Typography>
            <List>
              {currentConversationIndex !== null &&
                conversations[currentConversationIndex]?.messages?.map((msg, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText
                        primary={msg.text}
                        sx={{
                          color: msg.sender === 'user' ? theme.palette.text.primary : theme.palette.text.secondary,
                          textAlign: msg.sender === 'user' ? 'right' : 'left',
                        }}
                      />
                    </ListItem>
                    {index < conversations[currentConversationIndex].messages.length - 1 && <Divider />}
                  </div>
                ))}
            </List>
          </Paper>
        </Box>

        <Box sx={{ display: 'flex', marginTop: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Escribe un mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ flex: 1, marginRight: 1 }}
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage}>
            Enviar
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ChatComponent;
