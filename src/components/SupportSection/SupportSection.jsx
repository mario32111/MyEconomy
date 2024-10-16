// SupportSection.js
import React, { useState } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Box, TextField, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors'; // Importa el tema desde el archivo que has configurado
import LiveSupport from './LiveSupport'; // Asegúrate de importar el componente LiveSupport
import Slide from '@mui/material/Slide'; // Importa Grow de Material UI


const SupportMenu = () => {
  const [checked, setChecked] = useState(true); // Estado para el control de la animación

  const [showLiveSupport, setShowLiveSupport] = useState(false);

  const handleToggleLiveSupport = () => {
    setShowLiveSupport(!showLiveSupport);
  };

  return (
    <ThemeProvider theme={theme}>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Centro de Soporte
        </Typography>
        <Slide in={checked} timeout={500}>
          {/* Preguntas Frecuentes */}
          <Box>
            <Typography variant="h6" gutterBottom color="text.primary">
              Preguntas Frecuentes
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                <Typography>¿Cómo registro una cuenta nueva?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Puedes registrar una cuenta nueva desde la pantalla principal de inicio de sesión haciendo clic en "Crear cuenta".
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content">
                <Typography>¿Cómo protejo mi cuenta?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Recomendamos habilitar la autenticación de dos factores (2FA) en la configuración de seguridad para mayor protección.
                </Typography>
              </AccordionDetails>
            </Accordion>

          </Box>

        </Slide>


        {/* Chat en Vivo / Botón de Contacto */}
        <Slide in={checked} timeout={500}>
          <Box>
            <Typography variant="h6" gutterBottom color="text.primary" sx={{ mt: 3 }}>
              Soporte en Vivo
            </Typography>
            <Button variant="contained" color="primary" fullWidth onClick={handleToggleLiveSupport}>
              {showLiveSupport ? "Cerrar Chat en Vivo" : "Iniciar Chat en Vivo"}
            </Button>
          </Box>
        </Slide>


        {/* Mostrar LiveSupport si showLiveSupport es true */}
        {showLiveSupport && <LiveSupport />}

        {/* Formulario de Reporte de Problemas */}
        <Slide in={checked} timeout={500}>
          <Box>
            <Typography variant="h6" gutterBottom color="text.primary" sx={{ mt: 3 }}>
              Reporte de Problemas
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  label="Descripción del problema"
                  variant="outlined"
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Correo electrónico de contacto"
                  variant="outlined"
                  type="email"
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary">
                  Enviar
                </Button>
              </Box>
            </Paper>
          </Box>
        </Slide>

      </Container>
    </ThemeProvider>
  );
};

export default SupportMenu;
