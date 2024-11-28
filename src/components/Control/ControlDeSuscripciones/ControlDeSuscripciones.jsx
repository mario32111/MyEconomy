import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,  // Importa Grid para el layout responsivo
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { Grow, Slide } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../colors';

const servicesInitial = [
  {
    name: 'Internet',
    type: 'Básico',
    active: true,
    autoRenew: true,
    paymentMethod: 'Tarjeta de Crédito',
    paymentFrequency: 'Mensual',
    paymentAmount: '$500'
  },
  {
    name: 'Netflix',
    type: 'Digital',
    active: true,
    autoRenew: true,
    paymentMethod: 'PayPal',
    paymentFrequency: 'Mensual',
    paymentAmount: '$150'
  },
];

const ControlDeSuscripciones = () => {
  const [checked, setChecked] = useState(true); // Estado para el control de la animación
  const [services, setServices] = useState(servicesInitial);
  const [openModal, setOpenModal] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    type: 'Básico',
    active: true,
    autoRenew: true,
    paymentMethod: '',
    paymentFrequency: '',
    paymentAmount: '',
  });

  const handleToggleService = (index) => {
    const updatedServices = [...services];
    updatedServices[index].active = !updatedServices[index].active;
    setServices(updatedServices);
  };

  const handleToggleAutoRenew = (index) => {
    const updatedServices = [...services];
    updatedServices[index].autoRenew = !updatedServices[index].autoRenew;
    setServices(updatedServices);
  };

  const handleDeleteService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleAddService = () => {
    setServices([...services, newService]);
    setNewService({ name: '', type: 'Básico', active: true, autoRenew: true, paymentMethod: '', paymentFrequency: '', paymentAmount: '' });
    setOpenModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Control de Suscripciones
        </Typography>

        <List>
          {services.map((service, index) => (
            <Box key={index}>
              <ListItem>
                <Grow
                  in={true}
                  timeout={index * 250 + 500} // Ajusta el delay para cada botón
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={8}>
                      <ListItemText
                        primary={service.name}
                        secondary={`Tipo: ${service.type} | Método de Pago: ${service.paymentMethod} | Frecuencia: ${service.paymentFrequency} | Monto: ${service.paymentAmount}`}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={service.active}
                            onChange={() => handleToggleService(index)}
                            color="primary"
                          />
                        }
                        label={service.active ? 'Activo' : 'Inactivo'}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={service.autoRenew}
                            onChange={() => handleToggleAutoRenew(index)}
                            color="primary"
                          />
                        }
                        label="Renovación Automática"
                      />
                      <IconButton onClick={() => handleDeleteService(index)} color="error">
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grow>

              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>

        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
          style={{ marginTop: '16px' }}
          fullWidth  // Hace el botón responsivo
        >
          Agregar Nuevo Servicio
        </Button>

        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 400 },  // Responsive width
              bgcolor: 'background.paper',
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <Typography variant="h6" component="h2">
              Agregar Servicio
            </Typography>
            <TextField
              label="Nombre del Servicio"
              fullWidth
              margin="normal"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            />
            <TextField
              label="Método de Pago"
              fullWidth
              margin="normal"
              value={newService.paymentMethod}
              onChange={(e) => setNewService({ ...newService, paymentMethod: e.target.value })}
            />
            <TextField
              label="Frecuencia de Pago"
              fullWidth
              margin="normal"
              value={newService.paymentFrequency}
              onChange={(e) => setNewService({ ...newService, paymentFrequency: e.target.value })}
            />
            <TextField
              label="Monto de Pago"
              fullWidth
              margin="normal"
              value={newService.paymentAmount}
              onChange={(e) => setNewService({ ...newService, paymentAmount: e.target.value })}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={newService.autoRenew}
                  onChange={(e) => setNewService({ ...newService, autoRenew: e.target.checked })}
                />
              }
              label="Renovación Automática"
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleAddService}>
              Agregar
            </Button>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default ControlDeSuscripciones;
