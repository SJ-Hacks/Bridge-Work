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


// Mock login userId (temporary for development)
if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', '66549b86d72f42a2f13e9c7d'); 
  // Replace with a real ObjectId that exists in your `users` collection
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
