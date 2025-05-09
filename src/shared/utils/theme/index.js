import { createTheme } from '@mui/material/styles';
import colors from './colors';
import typography from './typography';
import spacing from './spacing';

const theme = createTheme({
  palette: colors,
  typography: typography,
  spacing: spacing.base,
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: `${spacing(1)} ${spacing(2)}`
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
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.paper,
          color: colors.text.primary
        }
      }
    }
  }
});
export default theme;