import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { theme, colors } from '../../colors';  // Importar el tema y colores desde theme.js

const plans = [
  {
    title: 'Pago Anual',
    price: '99',
    description: 'Ahorras $129 comparando el plan mensual',
    buttonText: 'Escoger este',
    recommended: true,
  },
  {
    title: 'Pago Mensual',
    price: '15',
    description: 'Es el plan más accesible',
    buttonText: 'Escoger este',
  },
  {
    title: 'Único Pago',
    price: '300',
    description: 'Acceso de por vida a nuestra plataforma',
    buttonText: 'Escoger este',
    permanent: true,
  }
];

const PricingCards = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.background.default, py: 5 }}>
        <Grid container spacing={3} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  textAlign: 'center',
                  boxShadow: 3,
                  backgroundColor: plan.permanent ? colors.Negro : colors.Blanco,
                  color: plan.permanent ? colors.Blanco : theme.palette.text.primary,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '350px',
                  width: '100%',
                  maxWidth: '280px',
                  mx: 'auto',
                  overflow: 'visible'
                }}
              >
                {plan.recommended && (
                  <Typography
                    variant="subtitle2"
                    sx={{
                      backgroundColor: colors.AzulMarino,  // Color de fondo más destacado
                      color: colors.Blanco,  // Texto en blanco
                      py: 0.5,
                      px: 2,
                      borderRadius: '15px',  // Bordes redondeados
                      position: 'absolute',
                      top: -10,
                      left: 75,  // Ajuste para que esté en la esquina izquierda
                      zIndex: 1,
                      fontSize: '0.75rem',  // Ajuste del tamaño de fuente
                      fontWeight: 'bold',  // Texto en negrita
                      textTransform: 'uppercase',  // Todo en mayúsculas para estilo de etiqueta
                    }}
                  >
                    Recomendado
                  </Typography>
                )}
                {plan.permanent && (
                  <Typography
                    variant="subtitle2"
                    sx={{
                      backgroundColor: colors.AzulMarino,  // Fondo rojo para resaltar
                      color: colors.Blanco,  // Texto en blanco
                      py: 0.5,
                      px: 2,
                      borderRadius: '15px',  // Bordes redondeados
                      position: 'absolute',
                      top: -10,
                      left: 75,  // Ajuste para que esté en la esquina izquierda
                      zIndex: 1,
                      fontSize: '0.75rem',  // Ajuste del tamaño de fuente
                      fontWeight: 'bold',  // Texto en negrita
                      textTransform: 'uppercase',  // Todo en mayúsculas
                    }}
                  >
                    Permanente
                  </Typography>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {plan.title}
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight: 'bold', mt: 2 }}>
                    ${plan.price}
                  </Typography>
                  <Typography sx={{ mt: 2, color: theme.palette.text.secondary }}>
                    {plan.description}
                  </Typography>
                </CardContent>
                <Button
                  variant="outlined"
                  sx={{
                    mt: 3,
                    borderColor: plan.permanent ? colors.Blanco : colors.AzulMarino,
                    color: plan.permanent ? colors.Blanco : colors.AzulMarino,
                    width: '70%',
                    margin: '0 auto',
                    '&:hover': {
                      backgroundColor: plan.permanent ? colors.Blanco : colors.AzulMarino,
                      color: plan.permanent ? colors.Negro : colors.Blanco,
                    },
                    mb: 3,
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default PricingCards;
