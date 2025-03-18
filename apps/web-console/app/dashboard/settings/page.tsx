'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useThemeToggle } from '@/ThemeContext';

export default function SettingsPage() {
    const { mode, toggleTheme } = useThemeToggle();

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "36px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                        SettingsPage
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
