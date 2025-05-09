import React from 'react';
import {
  Box,
  Container,
  Typography,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Stack
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../shared/routes/routes';
// Importar nuestros componentes personalizados
import { Button } from '../../../shared/components/UI/Button';
import { Card } from '../../../shared/components/UI/Card';

const plans = [
  {
    title: "Plan Gratuito",
    price: "0",
    period: "mes",
    features: [
      { included: true, text: "Control de gastos básico" },
      { included: true, text: "Hasta 2 cuentas" },
      { included: true, text: "Reportes mensuales" },
      { included: false, text: "Asistente IA" },
      { included: false, text: "Inversiones" },
      { included: false, text: "Soporte prioritario" }
    ],
    buttonText: "Comenzar Gratis",
    buttonVariant: "outlined"
  },
  {
    title: "Plan Pro",
    price: "9.99",
    period: "mes",
    features: [
      { included: true, text: "Control de gastos avanzado" },
      { included: true, text: "Cuentas ilimitadas" },
      { included: true, text: "Reportes detallados" },
      { included: true, text: "Asistente IA básico" },
      { included: true, text: "Seguimiento de inversiones" },
      { included: false, text: "Soporte prioritario" }
    ],
    buttonText: "Obtener Pro",
    buttonVariant: "contained",
    recommended: true
  },
  {
    title: "Plan Premium",
    price: "19.99",
    period: "mes",
    features: [
      { included: true, text: "Todo lo incluido en Pro" },
      { included: true, text: "Asistente IA avanzado" },
      { included: true, text: "Análisis predictivo" },
      { included: true, text: "Asesoría personalizada" },
      { included: true, text: "Inversiones automáticas" },
      { included: true, text: "Soporte prioritario 24/7" }
    ],
    buttonText: "Obtener Premium",
    buttonVariant: "contained"
  }
];

const PricingCard = ({ plan, delay }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {/* Usar nuestro Card personalizado */}
      <Card
        interactive
        rounded={plan.recommended}
        elevation={plan.recommended ? 4 : 2}
        sx={{
          height: '100%',
          position: 'relative',
          ...(plan.recommended && {
            border: `2px solid ${theme.palette.primary.main}`,
            boxShadow: `0 8px 24px ${theme.palette.primary.main}25`
          })
        }}
      >
        {plan.recommended && (
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              right: -30,
              transform: 'rotate(45deg)',
              bgcolor: 'primary.main',
              color: 'white',
              px: 4,
              py: 0.5,
            }}
          >
            Recomendado
          </Box>
        )}

        <CardHeader
          title={plan.title}
          titleTypographyProps={{ align: 'center', variant: 'h5' }}
          sx={{
            bgcolor: plan.recommended ? 'primary.light' : 'background.default'
          }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              mb: 2,
            }}
          >
            <Typography component="h2" variant="h3" color="text.primary">
              ${plan.price}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              /{plan.period}
            </Typography>
          </Box>

          <List>
            {plan.features.map((feature, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon>
                  {feature.included ? (
                    <Check sx={{ color: 'success.main' }} />
                  ) : (
                    <Close sx={{ color: 'error.main' }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={feature.text} />
              </ListItem>
            ))}
          </List>

          {/* Usar nuestro Button personalizado */}
          <Button
            fullWidth
            variant={plan.buttonVariant}
            color="primary"
            rounded
            onClick={() => navigate(ROUTES.AUTH.SIGNUP)}
            sx={{ mt: 2 }}
          >
            {plan.buttonText}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const PricingSection = () => {
  return (
    <Box
      sx={{
        py: 10,
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" sx={{ mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Planes y Precios
            </Typography>
          </motion.div>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            component="p"
          >
            Elige el plan que mejor se adapte a tus necesidades
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)'
            },
            gap: 4
          }}
        >
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.title}
              plan={plan}
              delay={index * 0.2}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default PricingSection;