// src/styles/ThemeContext.tsx
'use client';

import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from './theme';

interface ThemeContextProps {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeToggleContext = createContext<ThemeContextProps>({
    mode: 'light',
    toggleTheme: () => { },
});

export function useThemeToggle() {
    return useContext(ThemeToggleContext);
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
    // you could initialize from localStorage if you want user preference persistence
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = mode === 'light' ? createAppTheme('light') : createAppTheme('dark');

    return (
        <ThemeToggleContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeToggleContext.Provider>
    );
}
