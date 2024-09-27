import { createTheme } from '@mui/material/styles';

// Definición de colores
const colors = {
  AzulMarino: "#0F2532",
  Blanco: "#EAf0f1",
  AzulGris: "#4C6773",
  GrisClaro: "#849499",
  GrisOscuro: "#7F8B94",
  Negro: "#000000"
};

// Creación del tema con los colores definidos
const theme = createTheme({
  palette: {
    primary: {
      main: colors.AzulMarino,
    },
    secondary: {
      main: colors.GrisClaro,
    },
    background: {
      default: colors.Blanco,
    },
    text: {
      primary: colors.GrisOscuro,
      secondary: colors.AzulGris,
    },
  },
});

// Exportar el tema
export { theme, colors };
