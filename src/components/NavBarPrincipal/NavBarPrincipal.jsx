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
    Popover,
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
    AccountCircle,
    Notifications,
    ThumbUp, // Ícono para 'like'
    Announcement, // Ícono para notificaciones de lanzamiento
    Comment, // Ícono para respuestas a comentarios
    ChevronRight,
    Inventory2, // Ensure you have the correct import for Inventory2
    LocalAtm,
    ShoppingCart,
} from '@mui/icons-material';
import Slide from '@mui/material/Slide'; // Importa Grow de Material UI


import { colors } from '../colors';
import logoBlanco from '../../assets/img/logos/logoBlanco.png';
import { useNavigation } from '../../hooks/useNavigation';

const drawerWidth = 240;

const NavBarPrincipal = ({ children, footer }) => {
    const [selectedItem, setSelectedItem] = useState('ChatAI');
    const { changePath } = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
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

    const handleNotificationMenuOpen = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleNotificationMenuClose = () => {
        setNotificationAnchorEl(null);
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

    // Agregar iconos a las notificaciones
    const notifications = [
        { id: 1, text: 'A Marcel Solera y 4 personas más les gustó tu comentario en el Curso de JavaScript Desde Cero.', date: 'Hace 6 días', type: 'like', icon: <ThumbUp /> },
        { id: 2, text: 'Hemos lanzado: Curso de Agentes A1', date: 'Hace 8 días', type: 'new', icon: <Announcement /> },
        { id: 3, text: 'Nicolas Anicelle respondió a tu comentario en el Curso de JavaScript Desde Cero.', date: 'Hace 13 días', type: 'reply', comment: 'jajaja', icon: <Comment /> },
        { id: 4, text: 'Hemos lanzado: Curso de Product Marketing', date: 'Hace 15 días', type: 'new', icon: <Announcement /> },
        { id: 5, text: 'Hemos lanzado: Curso de Inglés Básico A1 para Principiantes', date: 'Hace 22 días', type: 'new', icon: <Announcement /> },
    ];
    const [checked, setChecked] = useState(true); // Estado para el control de la animación

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Slide in={checked} timeout={500}>

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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {!isMobile && (
                                <>
                                    <img
                                        onClick={() => changePath('/Home')}
                                        src={logoBlanco}
                                        alt="Logo"
                                        style={{ height: '40px', marginRight: '10px', cursor: 'pointer' }}
                                    />
                                    <Typography onClick={() => changePath('/Home')} variant="h6" sx={{ color: colors.Blanco, cursor: 'pointer' }}>
                                        MyEconomy
                                    </Typography>
                                    <ChevronRight onClick={() => changePath('/Home')} sx={{ color: colors.Blanco, marginLeft: 1 }} />
                                </>
                            )}
                        </Box>
                        <Typography variant="h6" noWrap component="div" sx={{ color: colors.Blanco, flexGrow: 1 }}>
                            {selectedItem}
                        </Typography>
                        <IconButton
                            color="inherit"
                            onClick={handleNotificationMenuOpen}
                        >
                            <Notifications />
                        </IconButton>
                        <Popover
                            anchorEl={notificationAnchorEl}
                            open={Boolean(notificationAnchorEl)}
                            onClose={handleNotificationMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            sx={{ padding: 1 }}
                        >
                            <Box sx={{ width: 300 }}>
                                <List>
                                    {notifications.map((notification) => (
                                        <ListItem key={notification.id} sx={{ borderBottom: '1px solid #ccc', padding: 1 }}>
                                            <ListItemIcon>
                                                {notification.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={notification.text}
                                                secondary={notification.date}
                                            />
                                            {notification.comment && (
                                                <Typography variant="body2" color="textSecondary">
                                                    {notification.comment}
                                                </Typography>
                                            )}
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Popover>
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
                            <MenuItem onClick={
                                () => {
                                    handleUserMenuClose();
                                    changePath('/Ajustes');
                                }
                            }>
                                <ListItemText primary="Perfil" />
                            </MenuItem>
                            <MenuItem onClick={
                                () => {
                                    handleUserMenuClose();
                                    changePath('/Ajustes');
                                }
                            }>
                                <ListItemText primary="Ajustes" />
                            </MenuItem>
                            <MenuItem onClick={
                                () => {
                                    handleUserMenuClose();
                                    changePath('/');
                                }
                            }>
                                <ListItemText primary="Cerrar sesión" />
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Slide>

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
                    bgcolor: theme.palette.background.default,
                    marginLeft: isDrawerOpen ? `${drawerWidth}px` : '0',
                    transition: 'margin 0.3s ease-in-out',
                }}
            >
                <Toolbar />
                {children}
                {/*                 {footer}
 */}            </Box>
        </Box>


    );
};

export default NavBarPrincipal;
