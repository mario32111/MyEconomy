import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import ChatInterface from './components/ChatInterface';
import { useAuth } from '../../../shared/hooks/useAuth';

const ChatIAPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (

        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Inicia sesión para acceder al Asistente IA
            </Typography>
            <Typography variant="body1">
              Necesitas iniciar sesión para utilizar el asistente financiero con IA.
            </Typography>
          </Paper>
        </Container>
    );
  }

  return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Asistente Financiero IA
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Consulta sobre tus finanzas personales y recibe consejos personalizados basados en tus datos.
          </Typography>
        </Box>
        
        <ChatInterface />
        
        <Box sx={{ mt: 4 }}>
          <Paper sx={{ p: 2, backgroundColor: '#fff8e1' }}>
            <Typography variant="subtitle2" gutterBottom>
              💡 Sugerencias de preguntas:
            </Typography>
            <Typography variant="body2">
              • "¿Cuáles son mis principales gastos este mes?"<br />
              • "¿Cómo puedo ahorrar más dinero?"<br />
              • "¿Estoy cumpliendo con mi presupuesto?"<br />
              • "¿Cuánto tiempo me tomará alcanzar mi meta de ahorro?"
            </Typography>
          </Paper>
        </Box>
      </Container>

  );
};

export default ChatIAPage;