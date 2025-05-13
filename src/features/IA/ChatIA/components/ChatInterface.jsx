// src/features/IA/ChatIA/components/ChatInterface.jsx
import React, { useEffect, useRef } from 'react'; // Eliminamos useState si no se usa
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ThinkingProcess from './ThinkingProcess';
import useAIChat from '../hooks/useAIChat';
import { useAuth } from '../../../../shared/hooks/useAuth';

const ChatInterface = () => {
  const { user } = useAuth();
  const { 
    messages, 
    isLoading, 
    thinking,
    sendMessage, 
    clearChat 
  } = useAIChat(user?.id);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (content) => {
    if (content.trim() === '') return;
    sendMessage(content);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        height: '80vh', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        p: 2, 
        backgroundColor: 'primary.main', 
        color: 'white'
      }}>
        <Typography variant="h6">Asistente Financiero IA</Typography>
      </Box>
      
      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto', 
        p: 2,
        backgroundColor: '#f5f5f5'
      }}>
        <MessageList messages={messages} />
        {thinking && <ThinkingProcess thinking={thinking} />}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>
      
      <MessageInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading}
        onClearChat={clearChat}
      />
    </Paper>
  );
};

export default ChatInterface;