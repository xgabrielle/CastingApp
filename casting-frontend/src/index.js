import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './index.css'

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#6366f1" },   // indigo
        secondary: { main: "#10b981" }, // emerald
        background: { default: "#f6f7fb", paper: "#ffffff" }
    },
    shape: { borderRadius: 12 },
    typography: {
        fontFamily:
            'Roboto, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif'
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

