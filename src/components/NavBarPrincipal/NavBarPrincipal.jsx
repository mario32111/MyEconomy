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
    Menu,
    MenuItem,
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
    Menu as MenuIcon,
    ChevronRight,
    Inventory2,
    LocalAtm,
    ShoppingCart,
    AccountCircle,
} from '@mui/icons-material';

import { colors } from '../colors';
import logoBlanco from '../../assets/img/logos/logoBlanco.png';
import { useNavigation } from '../../hooks/useNavigation';

const drawerWidth = 240;

const NavBarPrincipal = ({ children, footer }) => {
    const [selectedItem, setSelectedItem] = useState('ChatAI');
    const { changePath } = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMenuItemClick = (item) => {
        setSelectedItem(item.text);
        changePath(item.path);
    };

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleUserMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const handlePerfil = () => {
        // Aquí puedes manejar la lógica para cerrar sesión
        changePath(menuItems[12].path);
        setSelectedItem(menuItems[12].text);
        handleUserMenuClose();
    };

    const handleAjustes = () => {
        // Aquí puedes manejar la lógica para cerrar sesión
        changePath(menuItems[12].path);
        setSelectedItem(menuItems[12].text);
        handleUserMenuClose();
    };

    const handleLogout = () => {
        // Aquí puedes manejar la lógica para cerrar sesión
        changePath(menuItems[13].path);
        handleUserMenuClose();
    };

    
    const handleHome = () => {
        // Aquí puedes manejar la lógica para cerrar sesión
        setSelectedItem(menuItems[0].text);
        changePath(menuItems[0].path);
        handleUserMenuClose();
    };

    const menuItems = [
        { text: 'Inicio', icon: <Home />, path: '/Home' },
        { text: 'ChatAI', icon: <Chat />, path: '/chatai' },
        { text: 'Control de servicios', icon: <Build />, path: '/control' },
        { text: 'Cursos', icon: <School />, path: '/cursos' },
        { text: 'Metas financieras', icon: <TrendingUp />, path: '/metas-financieras' },
        { text: 'Monitoreo', icon: <MonitorHeart />, path: '/monitoreo' },
        { text: 'Comparacion de tasas de interes', icon: <Percent />, path: '/comparacion-tasas' },
        { text: 'Sistema de ahorro', icon: <Savings />, path: '/sistema-ahorro' },
        { text: 'Inventario', icon: <Inventory2 />, path: '/inventario' },
        { text: 'Presupuesto', icon: <LocalAtm />, path: '/presupuesto' },
        { text: 'Simulador de compras', icon: <ShoppingCart />, path: '/simulador-compras' },
        { text: 'Soporte', icon: <SupportAgent />, path: '/soporte' },
        { text: 'Ajustes', icon: <Settings />, path: '/ajustes' },
        { text: 'Cerrar sesion', icon: <Home />, path: '/' },
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
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        {!isMobile && (
                            <>
                                <img
                                    onClick={handleHome}
                                    src={logoBlanco}
                                    alt="Logo"
                                    style={{ height: '40px', marginRight: '10px', cursor: 'pointer' }}
                                />
                                <Typography onClick={handleHome} variant="h6" sx={{ color: colors.Blanco, cursor: 'pointer' }}>
                                    MyEconomy
                                </Typography>
                                <ChevronRight onClick={handleHome} sx={{ color: colors.Blanco, marginLeft: 1 }} />
                            </>
                        )}
                    </Box>
                    <Typography variant="h6" noWrap component="div" sx={{ color: colors.Blanco, flexGrow: 1 }}>
                        {selectedItem}
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={handleUserMenuOpen}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleUserMenuClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handlePerfil}>
                            <ListItemIcon><AccountCircle /></ListItemIcon>
                            <ListItemText primary="Perfil" />
                        </MenuItem>
                        <MenuItem onClick={handleAjustes}>
                            <ListItemIcon><Settings /></ListItemIcon>
                            <ListItemText primary="Ajustes" />
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon><AccountCircle /></ListItemIcon>
                            <ListItemText primary="Cerrar sesión" />
                        </MenuItem>
                    </Menu>
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
                    padding: 0,
                    marginTop: 5,
                    backgroundColor: colors.Blanco,
                    color: theme.palette.text.primary,
                }}
            >
                <Toolbar />
                {children}
                {footer}
            </Box>

        </Box>
    );
};

export default NavBarPrincipal;
