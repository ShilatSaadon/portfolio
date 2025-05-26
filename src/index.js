import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define a custom Material UI theme for the entire app
const myTheme = createTheme({
  palette: {
    primary: {
      light: '#f6a5c0',
      main: '#f48fb1',
      dark: '#aa647b',
      contrastText: '#3e2723'
    },
    secondary:{
      // main: '#442C2E',
      light: '#f9c8d9',
       main: '#f8bbd0',
       dark: '#ad8291',
      contrastText: '#3e2723'
    },
    text: {
      primary: '#3e2723', // צבע הטקסט הראשי באפליקציה (זה ישפיע על הפונט ב-TextFields)
      secondary: '#6d4c41', // צבע טקסט משני (לדוגמה, עבור תיאורים)
     
    },
    divider: '#3e2723',
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
