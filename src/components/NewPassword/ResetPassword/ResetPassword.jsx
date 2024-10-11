import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CssBaseline, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { theme, colors } from '../../colors'; // Importar el tema y los colores
import Background from '../../Background/Background';
import Slide from '@mui/material/Slide';
import { useNavigation } from '../../../hooks/useNavigation'; // Importa el hook de navegación

const ResetPassword = () => {
  const { changePath } = useNavigation(); // Usa el hook de navegación

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(true); // Estado para el control de la animación

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword === confirmPassword) {
      console.log('Nueva Contraseña:', newPassword);
      // Aquí iría la lógica para enviar la nueva contraseña a un backend o servicio
      changePath('/loggin'); // Ruta a la que se navega después de cambiar la contraseña
    } else {
      console.log('Las contraseñas no coinciden');
      // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario
    }
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
              Cambiar Contraseña
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="Nueva Contraseña"
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                InputLabelProps={{ style: { color: colors.GrisOscuro } }} // Color de la etiqueta
                sx={{
                  '& .MuiInputBase-input': { color: colors.GrisOscuro }, // Color del texto
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputLabelProps={{ style: { color: colors.GrisOscuro } }} // Color de la etiqueta
                sx={{
                  '& .MuiInputBase-input': { color: colors.GrisOscuro }, // Color del texto
                }}
              />
              <Button
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
                Cambiar Contraseña
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

export default ResetPassword;
