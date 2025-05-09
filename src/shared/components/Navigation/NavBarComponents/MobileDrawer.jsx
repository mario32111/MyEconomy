// src/shared/components/Navigation/NavBarComponents/MobileDrawer.jsx
import React from 'react';
import { 
  Drawer, List, ListItem, ListItemIcon, ListItemText, Box, IconButton,
  Collapse, ListItemButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MonitorIcon from '@mui/icons-material/Monitor';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SupportIcon from '@mui/icons-material/Support';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CalculateIcon from '@mui/icons-material/Calculate';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ForumIcon from '@mui/icons-material/Forum';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth'; // Importar desde hooks/useAuth

// Estructura de menú con categorías y subcategorías
const menuStructure = [
  { 
    text: 'Dashboard', 
    icon: <DashboardIcon />, 
    path: '/dashboard',
    requiresAuth: true
  },
  { 
    text: 'Finance', 
    icon: <AccountBalanceWalletIcon />, 
    requiresAuth: true,
    subItems: [
      { text: 'Expense Tracker', path: '/finance/expense-tracker', icon: <BarChartIcon /> },
      { text: 'Financial Goals', path: '/finance/financial-goals', icon: <TimelineIcon /> },
      { text: 'Planner Tool', path: '/finance/planner-tool', icon: <AssignmentIcon /> },
      { text: 'Rate Scout', path: '/finance/rate-scout', icon: <CompareArrowsIcon /> },
      { text: 'Simulator', path: '/finance/simulator', icon: <CalculateIcon /> },
      { text: 'Custom Calculator', path: '/finance/custom-calculator', icon: <CalculateIcon /> }
    ]
  },
  { 
    text: 'IA', 
    icon: <SmartToyIcon />, 
    requiresAuth: true,
    subItems: [
      { text: 'Chat IA', path: '/ia/chat-ia', icon: <ChatIcon /> },
      { text: 'Debt Simulator', path: '/ia/debt-simulator', icon: <AccountBalanceIcon /> },
      { text: 'Recovery Planner', path: '/ia/recovery-planner', icon: <SettingsBackupRestoreIcon /> }
    ]
  },
  { 
    text: 'Monitoring', 
    icon: <MonitorIcon />, 
    requiresAuth: true,
    subItems: [
      { text: 'Finance Hub', path: '/monitoring/finance-hub', icon: <AssessmentIcon /> }
    ]
  },
  { 
    text: 'Education', 
    icon: <SchoolIcon />, 
    requiresAuth: true,
    subItems: [
      { text: 'Course List', path: '/education/course-list', icon: <MenuBookIcon /> },
      { text: 'Progress', path: '/education/progress', icon: <TimelineIcon /> }
    ]
  },
  { 
    text: 'Shopping', 
    icon: <ShoppingCartIcon />, 
    path: '/shopping',
    requiresAuth: true
  },
  { 
    text: 'Support', 
    icon: <SupportIcon />, 
    requiresAuth: true,
    subItems: [
      { text: 'FAQ', path: '/support/faq', icon: <LiveHelpIcon /> },
      { text: 'Live Chat', path: '/support/live-chat', icon: <ForumIcon /> }
    ]
  },
  { 
    text: 'Login', 
    icon: <LoginIcon />, 
    path: '/login',
    requiresAuth: false,
    hideWhenAuth: true
  },
  { 
    text: 'Sign Up', 
    icon: <PersonAddIcon />, 
    path: '/signup',
    requiresAuth: false,
    hideWhenAuth: true
  }
];

const MobileDrawer = () => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState({});
  const { user, isAuthenticated } = useAuth(); // Usar el hook personalizado

  // Para depuración
  console.log("Auth state in MobileDrawer:", { isAuthenticated, user });

  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(isOpen);
  };

  const handleExpandClick = (itemText) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemText]: !prev[itemText]
    }));
  };

  // Filtrar elementos del menú según el estado de autenticación
  const filteredMenuItems = menuStructure.filter(item => {
    if (isAuthenticated) {
      return !item.hideWhenAuth;
    } else {
      return !item.requiresAuth;
    }
  });

  const drawerList = () => (
    <Box
      sx={{ width: 280 }}
      role="presentation"
    >
      <List>
        {filteredMenuItems.map((item) => (
          <React.Fragment key={item.text}>
            {item.subItems ? (
              // Elemento con submenú
              <>
                <ListItemButton onClick={() => handleExpandClick(item.text)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {expandedItems[item.text] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={expandedItems[item.text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem
                        button
                        key={subItem.text}
                        component={RouterLink}
                        to={subItem.path}
                        selected={location.pathname === subItem.path}
                        onClick={toggleDrawer(false)}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              // Elemento sin submenú
              <ListItem
                button
                component={RouterLink}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {drawerList()}
      </Drawer>
    </>
  );
};

export default MobileDrawer;