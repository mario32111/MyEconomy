import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Send, Save, Delete } from '@mui/icons-material';
import { Button, Card, Input } from '../../shared/components/UI';

const UIExample = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Componentes UI
      </Typography>

      <Stack spacing={3}>
        <Card 
          title="Botones" 
          subheader="Ejemplos de variantes de botones"
        >
          <Stack direction="row" spacing={2}>
            <Button startIcon={<Send />}>
              Enviar
            </Button>
            <Button variant="outlined" startIcon={<Save />}>
              Guardar
            </Button>
            <Button color="error" startIcon={<Delete />}>
              Eliminar
            </Button>
          </Stack>
        </Card>

        <Card 
          title="Campos de entrada" 
          subheader="Ejemplos de campos de texto"
        >
          <Stack spacing={2}>
            <Input
              label="Campo básico"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              label="Campo con error"
              error
              helperText="Este campo es requerido"
            />
            <Input
              label="Campo multilinea"
              multiline
              rows={3}
            />
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
};

export default UIExample;