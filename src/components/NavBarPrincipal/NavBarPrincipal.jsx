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
    useMediaQuery,
} from '@mui/material';
import {
    Home,
    Chat,
    Build,
    School,
    TrendingUp,
    MonitorHeart,
    SupportAgent,
    Percent,
    Savings,
    Settings,
    Menu,
    ChevronRight,
} from '@mui/icons-material';

import { colors } from '../colors';
import logoBlanco from '../../assets/img/logos/logoBlanco.png';
import { useNavigation } from '../../hooks/useNavigation';

const drawerWidth = 240;

const NavBarPrincipal = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState('Inicio'); // Establecer "Inicio" como valor predeterminado
    const { changePath } = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMenuItemClick = (item) => {
        setSelectedItem(item.text); // Cambia el texto del encabezado
        changePath(item.path); // Cambia la ruta
    };

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const menuItems = [
        { text: 'Inicio', icon: <Home />, path: '/' },
        { text: 'ChatAI', icon: <Chat />, path: '/chatai' },
        { text: 'Control de servicios', icon: <Build />, path: '/control' },
        { text: 'Cursos', icon: <School />, path: '/cursos' },
        { text: 'Metas financieras', icon: <TrendingUp />, path: '/metas-financieras' },
        { text: 'Monitoreo', icon: <MonitorHeart />, path: '/monitoreo' },
        { text: 'Soporte', icon: <SupportAgent />, path: '/soporte' },
        { text: 'Comparacion de tasas de interes', icon: <Percent />, path: '/comparacion-tasas' },
        { text: 'Sistema de ahorro', icon: <Savings />, path: '/sistema-ahorro' },
        { text: 'Ajustes', icon: <Settings />, path: '/ajustes' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
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
                            src={logoBlanco}
                            alt="Logo"
                            style={{ height: '40px', marginRight: '10px', cursor: 'pointer' }}
                        />
                        {!isMobile && (
                            <Typography variant="h6" sx={{ color: colors.Blanco, cursor: 'pointer' }}>
                                MyEconomy
                            </Typography>
                        )}
                        <ChevronRight sx={{ color: colors.Blanco, marginLeft: 1 }} />
                    </Box>
                    <Typography variant="h6" noWrap component="div" sx={{ color: colors.Blanco }}>
                        {selectedItem} {/* Mostrar el texto seleccionado aquí */}
                    </Typography>
                </Toolbar>
            </AppBar>

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
                        <ListItem button key={index} onClick={() => handleMenuItemClick(item)}>
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
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: 3,
                    marginTop: 8,
                    backgroundColor: colors.Blanco,
                    color: theme.palette.text.primary,
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default NavBarPrincipal;
