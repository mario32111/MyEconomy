
import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { theme, colors } from '../../colors'; // Importa el tema y los colores
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logoBlanco from '../../../assets/img/logos/logoBlanco.png'; // Logo blanco

function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [scrolled, setScrolled] = useState(false); // Estado para manejar el desplazamiento

    const isMobile = useMediaQuery('(max-width:600px)');

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    const drawerItems = (
        <Box
            sx={{ width: 250, backgroundColor: colors.AzulMarino, height: '100%' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Inicio', 'Servicios', 'Inicio', 'Servicios', 'Contacto'].map((text) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} sx={{ color: colors.Blanco }} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    // Efecto para manejar el desplazamiento
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0); // Cambia el estado basado en la posición de desplazamiento
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" sx={{ backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.5)' : colors.AzulMarino, transition: 'background-color 0.3s ease', width: '100%', zIndex: 1300 }}>
                <Toolbar>
                    {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="left"
                                open={drawerOpen}
                                onClose={toggleDrawer(false)}
                                sx={{ backgroundColor: 'transparent' }} // Cambia el color aquí
                            >
                                {drawerItems}
                            </Drawer>

                        </>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <img
                                src={scrolled ? logoBlanco : logoBlanco} // Cambia el logo según el estado
                                alt="Logo"
                                style={{ height: '40px', marginRight: '10px' }} // Ajusta el tamaño
                            />
                            <Typography variant="h6" sx={{ color: scrolled ? colors.Blanco : colors.Blanco }}>
                                MyEconomy
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        {['Inicio', 'Servicios', 'Contacto'].map((text, index) => (
                            <Button
                                key={text}
                                sx={{
                                    color: scrolled ? colors.Blanco : colors.Blanco,
                                    fontWeight: activeButton === index ? 'bold' : 'normal',
                                    textDecoration: activeButton === index ? 'underline' : 'none',
                                    '&:hover': {
                                        fontWeight: 'bold',
                                    },
                                }}
                                onClick={() => handleButtonClick(index)}
                            >
                                {text}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        <Button
                            variant="outlined"
                            sx={{
                                color: scrolled ? colors.Blanco : colors.Blanco,
                                borderColor: scrolled ? colors.Blanco : colors.Blanco,
                                '&:hover': {
                                    borderColor: scrolled ? colors.Blanco : colors.Blanco,
                                    color: scrolled ? colors.Blanco : colors.Blanco,
                                    backgroundColor: scrolled ? colors.GrisOscuro : colors.GrisOscuro,
                                },
                            }}
                            onClick={() => handleButtonClick('login')}
                        >
                            Iniciar Sesión
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: scrolled ? colors.AzulMarino : colors.Blanco,
                                color: scrolled ? colors.Blanco : colors.AzulMarino,
                                '&:hover': {
                                    backgroundColor: scrolled ? colors.AzulMarino : colors.BlancoTransparente,
                                },
                            }}
                            onClick={() => handleButtonClick('signup')}
                        >
                            Crear Cuenta
                        </Button>
                    </Box>

                    {isMobile && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, padding: 2 }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    color: scrolled ? colors.Blanco : colors.Blanco, // Mantén el color blanco en ambas situaciones
                                    borderColor: scrolled ? colors.Blanco : colors.Blanco, // Mantén el borde blanco
                                    '&:hover': {
                                        borderColor: scrolled ? colors.Blanco : colors.Blanco,
                                        backgroundColor: scrolled ? colors.BlancoTransparente : colors.BlancoTransparenteHover, // Cambia el color de fondo en hover
                                    },
                                }}
                                onClick={() => handleButtonClick('login')}
                            >
                                Iniciar Sesión
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: scrolled ? colors.Blanco : colors.AzulMarino, // Mantén el fondo azul marino
                                    color: scrolled ? colors.Blanco : colors.Blanco, // Texto blanco si se ha desplazado, azul marino si no
                                    '&:hover': {
                                        backgroundColor: scrolled ? colors.Blanco : colors.BlancoTransparenteHover,
                                    },
                                }}
                                onClick={() => handleButtonClick('signup')}
                            >
                                Crear Cuenta
                            </Button>
                        </Box>
                    )}

                </Toolbar>
            </AppBar>
            {/* Añadir un margen superior para evitar que el contenido quede oculto detrás del navbar */}
            <Box sx={{ mt: 8 }} /> {/* Ajusta la altura según el tamaño de tu AppBar */}
        </ThemeProvider>
    );
};

export default Navbar;
