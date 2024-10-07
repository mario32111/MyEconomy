import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    CssBaseline,
    Box,
    useTheme,
    useMediaQuery, // Importa el hook para consultas de medios
} from '@mui/material';
import { Menu, Inbox, CalendarToday, Archive, Settings, ChevronRight } from '@mui/icons-material';
import { colors } from '../colors'; // Importa el archivo de tema
import logoBlanco from '../../assets/img/logos/logoBlanco.png'; // Logo blanco

const drawerWidth = 240;

const NavBarPrincipal = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const theme = useTheme(); // Utiliza el tema importado
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Consulta para detectar vista móvil

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const menuItems = [
        { text: 'Inicio', icon: <Inbox /> },
        { text: 'Calendario', icon: <CalendarToday /> },
        { text: 'Cursos en los que te has inscrito', icon: <Inbox /> },
        { text: 'Clases archivadas', icon: <Archive /> },
        { text: 'Ajustes', icon: <Settings /> },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* Barra superior */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    backgroundColor: colors.AzulMarino,
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ marginRight: 2 }}
                    >
                        <Menu />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={logoBlanco} // Cambia el logo según el estado
                            alt="Logo"
                            style={{ height: '40px', marginRight: '10px', cursor: 'pointer' }} // Añadir cursor de puntero
                        />
                        {!isMobile && ( // Condicional para ocultar el texto en vista móvil
                            <Typography variant="h6" sx={{ color: colors.Blanco, cursor: 'pointer' }}>
                                MyEconomy
                            </Typography>
                        )}
                        <ChevronRight sx={{ color: colors.Blanco, marginLeft: 1 }} />
                    </Box>
                    <Typography variant="h6" noWrap component="div" sx={{ color: colors.Blanco }}>
                        Monitoreo
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Cajón lateral */}
            <Drawer
                variant="temporary"
                open={isDrawerOpen}
                onClose={handleDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: colors.Blanco,
                    },
                }}
            >
                <Toolbar />
                <Divider />
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem button key={index}>
                            <ListItemIcon sx={{ color: theme.palette.text.secondary }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{ color: theme.palette.text.primary }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};

export default NavBarPrincipal;
