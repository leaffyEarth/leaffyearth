'use client';

import React from 'react';
import { Button } from '@mui/material';
import { useThemeToggle } from '@/ThemeContext';

export default function PottersLayout({ children }: { children: React.ReactNode }) {
    const { mode, toggleTheme } = useThemeToggle();

    return (
        <>
            {children}
        </>
    );
}
