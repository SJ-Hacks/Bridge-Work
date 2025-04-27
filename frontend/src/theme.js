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
      default: '#EDF6FF', // Your fresh light blue background
    },
    info: {
      main: '#94B4C1',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    body2: {
        fontSize: '1rem', // Make body2 (used in cards) bigger
      },
  },
});

export default theme;
