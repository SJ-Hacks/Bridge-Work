import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#213448', // Your primary color
    },
    secondary: {
      main: '#547792', // Your secondary color
    },
    background: {
      default: '#FFFFFF', // White
    },
    info: {
      main: '#94B4C1',
    },
    complimentary: {
      main: '#ECEFCA',
    },
    lightGrey: {
      main: '#e0e0e0',
    },
    backgroundLight: {
      main: '#f9fafb',
    }
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    body2: {
        fontSize: '1rem', // Make body2 (used in cards) bigger
      },
  },
});

export default theme;
