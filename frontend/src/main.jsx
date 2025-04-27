import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // import your custom theme
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import { Provider } from 'react-redux'
import store from './store';
import { UserProvider } from './context/UserContext';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </UserProvider>
    </Provider>
  </React.StrictMode>,
);
