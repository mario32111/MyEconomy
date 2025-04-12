import React, { useState } from 'react';
import { Box, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { FaUserCog, FaLock, FaBell, FaLanguage, FaShieldAlt } from 'react-icons/fa';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { theme } from '../colors'; // Importa el tema desde el archivo que has configurado
import Slide from '@mui/material/Slide'; // Importa Grow de Material UI


const settings = [
    {
        icon: <FaUserCog size={24} />,
        title: 'Cuenta',
        description: 'Configura los detalles de tu cuenta y perfil personal.',
        options: [
            { label: 'Actualizar perfil', subOptions: ['Cambiar foto de perfil', 'Editar nombre de usuario'] },
            { label: 'Administrar suscripciones' },
            { label: 'Eliminar cuenta' },
        ],
    },
    {
        icon: <FaLock size={24} />,
        title: 'Seguridad',
        description: 'Administra la privacidad y configuración de seguridad.',
        options: [
            { label: 'Cambiar contraseña' },
            { label: 'Verificación en dos pasos' },
            { label: 'Historial de dispositivos' },
        ],
    },
    {
        icon: <FaBell size={24} />,
        title: 'Notificaciones',
        description: 'Personaliza las alertas y notificaciones que recibes.',
        options: [
            { label: 'Notificaciones por correo' },
            { label: 'Alertas en la aplicación', subOptions: ['Finanzas', 'Promociones', 'Actualizaciones'] },
        ],
    },
    {
        icon: <FaLanguage size={24} />,
        title: 'Idioma',
        description: 'Cambia el idioma de la aplicación.',
        options: [
            { label: 'Seleccionar idioma' },
        ],
    },
    {
        icon: <FaShieldAlt size={24} />,
        title: 'Protección',
        description: 'Configura medidas adicionales de protección.',
        options: [
            { label: 'Configurar PIN' },
            { label: 'Reconocimiento facial' },
        ],
    },
];

const SettingsSection = () => {
    const [checked, setChecked] = useState(true); // Estado para el control de la animación

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    padding: { xs: '10px', md: '20px' },
                    marginTop: '30px',
                    width: '100%',
                    maxWidth: '800px', // Limita el ancho máximo para pantallas grandes
                    minWidth: '280px', // Limita el ancho máximo para pantallas grandes
                    margin: '0 auto', // Centra la sección en pantallas grandes
                }}
            >
                <Typography variant="h5" color="primary" gutterBottom>
                    Ajustes
                </Typography>
                <Grid container spacing={2}>
                    {settings.map((setting, index) => (
                        <Grid item xs={12} key={index}>
                            <Slide in={checked} timeout={500}>
                                <Box>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${index}-content`}
                                            id={`panel${index}-header`}
                                            sx={{
                                                flexDirection: { xs: 'row', sm: 'row' }, // Mantiene el ícono y el texto en una sola línea
                                                alignItems: 'center',
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    marginRight: '10px',
                                                    minWidth: 'unset', // Ajusta el tamaño del icono en pantallas pequeñas
                                                }}
                                            >
                                                {setting.icon}
                                            </ListItemIcon>
                                            <Box>
                                                <Typography variant="h6" color="text.primary">
                                                    {setting.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                                                    {setting.description}
                                                </Typography>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <List>
                                                {setting.options.map((option, optionIndex) => (
                                                    <React.Fragment key={optionIndex}>
                                                        <ListItem button>
                                                            <ListItemText primary={option.label} />
                                                        </ListItem>
                                                        {option.subOptions && (
                                                            <List component="div" disablePadding sx={{ paddingLeft: '20px' }}>
                                                                {option.subOptions.map((subOption, subOptionIndex) => (
                                                                    <ListItem button key={subOptionIndex}>
                                                                        <ListItemText primary={subOption} />
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </List>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Slide>


                        </Grid>
                    ))}
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default SettingsSection;
