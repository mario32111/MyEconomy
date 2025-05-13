// src/features/IA/ChatIA/components/MessageList.jsx
import React from 'react';
import { Box, Avatar, Typography, Paper } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

const MessageList = ({ messages }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {messages.length === 0 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100%',
          opacity: 0.7
        }}>
          <Typography variant="body1">
            Haz una pregunta sobre tus finanzas para comenzar
          </Typography>
        </Box>
      )}
      
      {messages.map((message, index) => (
        <Box 
          key={index}
          sx={{ 
            display: 'flex',
            gap: 2,
            alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%'
          }}
        >
          {message.role === 'assistant' && (
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <SmartToyIcon />
            </Avatar>
          )}
          
          <Paper 
            elevation={1}
            sx={{ 
              p: 2,
              borderRadius: 2,
              backgroundColor: message.role === 'user' ? 'primary.light' : 'white',
              color: message.role === 'user' ? 'white' : 'text.primary'
            }}
          >
            <Typography 
              variant="body1"
              sx={{ 
                whiteSpace: 'pre-wrap',
                '& a': {
                  color: 'primary.main',
                  textDecoration: 'underline'
                }
              }}
            >
              {message.content}
            </Typography>
          </Paper>
          
          {message.role === 'user' && (
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <PersonIcon />
            </Avatar>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MessageList;