import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CssBaseline, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { theme, colors } from '../../colors'; // Importar el tema y los colores
import Background from '../../Background/Background';
import Slide from '@mui/material/Slide';
import { useNavigation } from '../../../hooks/useNavigation'; // Importa el hook de navegación

const ForgotPassword = () => {
  const { changePath } = useNavigation(); // Usa el hook de navegación

  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(true); // Estado para el control de la animación

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    // Aquí iría la lógica para enviar la solicitud de recuperación de contraseña a un backend o servicio
    changePath('/password-reset-sent'); // Ruta a la que se navega después de enviar el formulario
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Background />
        <CssBaseline />
        <Slide in={checked} timeout={500}>
          <Box
            sx={{
              marginTop: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: colors.Blanco,
              padding: 3,
              borderRadius: 2,
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: colors.AzulGris }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="textPrimary">
              Recuperar Contraseña
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ style: { color: colors.GrisOscuro } }} // Color de la etiqueta
                sx={{
                  '& .MuiInputBase-input': { color: colors.GrisOscuro }, // Color del texto
                }}
              />
              <Button
                onClick={() => changePath('/new-password')} // Regresa al login
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: colors.AzulMarino,
                  '&:hover': {
                    backgroundColor: colors.AzulGris,
                  },
                }}
              >
                Enviar codigo de autenticacion
              </Button>
              <Button
                fullWidth
                variant="text"
                onClick={() => changePath('/loggin')} // Regresa al login
                sx={{ mt: 1, color: colors.GrisOscuro }}
              >
                Regresar al Inicio de Sesión
              </Button>
            </Box>
          </Box>
        </Slide>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
