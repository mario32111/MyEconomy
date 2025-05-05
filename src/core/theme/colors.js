import { createTheme } from '@mui/material/styles';

// Paleta de colores principal
export const colors = {
  primary: {
    main: '#2196F3',    // Azul principal
    light: '#64B5F6',
    dark: '#1976D2',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#FF4081',    // Rosa/Magenta
    light: '#FF79B0',
    dark: '#C60055',
    contrastText: '#FFFFFF'
  },
  success: {
    main: '#4CAF50',    // Verde
    light: '#81C784',
    dark: '#388E3C'
  },
  warning: {
    main: '#FFC107',    // Amarillo
    light: '#FFD54F',
    dark: '#FFA000'
  },
  error: {
    main: '#F44336',    // Rojo
    light: '#E57373',
    dark: '#D32F2F'
  },
  info: {
    main: '#00BCD4',    // Cyan
    light: '#4DD0E1',
    dark: '#0097A7'
  },
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  },
  background: {
    default: '#F5F5F5',
    paper: '#FFFFFF'
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#9E9E9E'
  }
};

// Configuración del tema
export const theme = createTheme({
  palette: colors,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500
    },
    body1: {
      fontSize: '1rem'
    },
    body2: {
      fontSize: '0.875rem'
    }
  },
  shape: {
    borderRadius: 8
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }
      }
    }
  }
});