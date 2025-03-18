'use client';

import React from 'react';
import { Button } from '@mui/material';
import { useThemeToggle } from '@/ThemeContext';

export default function AuthLoadingPage() {
    const { mode, toggleTheme } = useThemeToggle();

    return (
        <>
            Auth Loading
        </>
    );
}
