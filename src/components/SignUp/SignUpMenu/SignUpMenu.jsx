import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CssBaseline, Avatar, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { theme, colors } from '../../colors'; // Importar el tema y los colores
import Background from '../../Background/Background';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }
    console.log('Nombre:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    // Aquí iría la lógica para registrar la cuenta con un backend o servicio
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Background />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: colors.Blanco, // Color de fondo
            padding: 3,
            borderRadius: 2,
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: colors.AzulGris }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="textPrimary">
            Crear Cuenta
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ style: { color: colors.GrisOscuro } }} // Color de la etiqueta
              sx={{
                '& .MuiInputBase-input': { color: colors.GrisOscuro }, // Color del texto
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: colors.GrisOscuro } }} // Color de la etiqueta
              sx={{
                '& .MuiInputBase-input': { color: colors.GrisOscuro }, // Color del texto
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              autoComplete="new-password"
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
                backgroundColor: colors.AzulMarino, // Color del botón
                '&:hover': {
                  backgroundColor: colors.AzulGris, // Color al hacer hover
                },
              }}
            >
              Registrarse
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" sx={{ color: colors.GrisOscuro }}>
                  {"¿Ya tienes una cuenta? Iniciar sesión"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
