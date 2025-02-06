// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul primário
    },
    secondary: {
      main: '#dc004e', // Rosa secundário
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;