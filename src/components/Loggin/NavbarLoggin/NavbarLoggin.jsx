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
import logoAzul from '../../../assets/img/logos/logoAzul.png'; // Logo azul
import logoBlanco from '../../../assets/img/logos/logoBlanco.png'; // Logo blanco
import { useNavigation } from '../../../hooks/useNavigation'; // Importa AppRoutes y el hook de navegación
import Slide from '@mui/material/Slide'; // Importa Grow de Material UI

const Navbar = () => {
    const { changePath } = useNavigation(); // Usa el hook de navegación
    const [checked, setChecked] = useState(true); // Estado para el control de la animación

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
        console.log(index)
        if (index === 'login') {
            changePath('/loggin');
        }
        if (index === 'signup') {
            changePath('/sign-up');
        }
    };

    const handleLogoClick = () => {
        changePath('/'); // Cambia el path al hacer clic en el logo o en el texto
    };

    const drawerItems = (
        <Box
            sx={{ width: 250, backgroundColor: colors.AzulMarino, height: '100%' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Inicio', 'Servicios', 'Contacto'].map((text) => (
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
            <Slide in={checked} timeout={500}>
                <AppBar position="fixed" sx={{ backgroundColor: scrolled ? colors.AzulMarino : colors.Blanco, transition: 'background-color 0.3s ease', width: '100%', zIndex: 1300 }}>
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
                                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                                    {drawerItems}
                                </Drawer>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }} onClick={handleLogoClick}>
                                <img
                                    src={scrolled ? logoBlanco : logoAzul} // Cambia el logo según el estado
                                    alt="Logo"
                                    style={{ height: '40px', marginRight: '10px', cursor: 'pointer' }} // Añadir cursor de puntero
                                />
                                <Typography variant="h6" sx={{ color: scrolled ? colors.Blanco : colors.AzulMarino, cursor: 'pointer' }} onClick={handleLogoClick}>
                                    MyEconomy
                                </Typography>
                            </Box>
                        )}

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                            {['Inicio', 'Servicios', 'Contacto'].map((text, index) => (
                                <Button
                                    key={text}
                                    sx={{
                                        color: scrolled ? colors.Blanco : colors.AzulMarino,
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
                                    color: scrolled ? colors.Blanco : colors.AzulMarino,
                                    borderColor: colors.Blanco,
                                    '&:hover': {
                                        borderColor: colors.AzulMarino,
                                        color: colors.AzulMarino,
                                        backgroundColor: colors.Blanco,
                                    },
                                }}
                                onClick={() => handleButtonClick('login')}
                            >
                                Iniciar Sesión
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: colors.Blanco,
                                    color: colors.AzulMarino,
                                    '&:hover': {
                                        backgroundColor: colors.BlancoTransparente,
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
                                        color: colors.Blanco,
                                        borderColor: colors.Blanco,
                                        '&:hover': {
                                            borderColor: colors.Blanco,
                                            backgroundColor: colors.BlancoTransparente,
                                        },
                                    }}
                                    onClick={() => handleButtonClick('login')}
                                >
                                    Iniciar Sesión
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: colors.Blanco,
                                        color: colors.AzulMarino,
                                        '&:hover': {
                                            backgroundColor: colors.BlancoTransparenteHover,
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
            </Slide>

            {/* Añadir un margen superior para evitar que el contenido quede oculto detrás del navbar */}
            <Box sx={{ mt: 8 }} /> {/* Ajusta la altura según el tamaño de tu AppBar */}
        </ThemeProvider>
    );
};

export default Navbar;
