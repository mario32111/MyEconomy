import React, { useState } from 'react';
import { Box, TextField, IconButton, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const MessageInput = ({ onSendMessage, isLoading, onClearChat }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ 
        p: 2, 
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      <Tooltip title="Limpiar conversación">
        <IconButton 
          onClick={onClearChat}
          disabled={isLoading}
          color="error"
          size="small"
        >
          <DeleteSweepIcon />
        </IconButton>
      </Tooltip>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Escribe tu pregunta..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isLoading}
        size="small"
        autoComplete="off"
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: 4
          }
        }}
      />
      
      <IconButton 
        type="submit" 
        color="primary" 
        disabled={!message.trim() || isLoading}
        sx={{ 
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          '&.Mui-disabled': {
            backgroundColor: 'action.disabledBackground',
            color: 'action.disabled'
          }
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;