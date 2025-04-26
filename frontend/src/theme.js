import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#213448', // Dark Blue
      },
      secondary: {
        main: '#547792', // Mid Blue-Grey
      },
      background: {
        default: '#EDF6FF', // Fresh Light Blue Background
      },
      info: {
        main: '#94B4C1', // Light Blue
      },
    },
    typography: {
      fontFamily: [
        'Roboto',
        'sans-serif',
      ].join(','),
    },
  });


export default theme;

