'use client';

import React, { ReactNode } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import GoogleSignInButton from '@/components/button/googleSIgninButton';


export default function LoginPage(): ReactNode {
    const theme = useTheme();

    const handleGoogleLogin = () => {
        window.location.href = process.env.NEXT_PUBLIC_API_SERVER_BASE_URL + '/auth/google';
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
                width: '100%',
                overflow: 'auto',
            }}
        >

            <Box
                sx={{
                    width: { xs: '0px', sm: '0px', md: '0px', lg: '60%' },
                    display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
                    height: '100%',
                    backgroundColor: "#11220E",
                    minWidth: '600px',
                    overflow: 'hidden'
                }}
            >
                <img
                    src="/image/loginBackground.jpg"  // e.g. your new image
                    alt="Background Image"
                    style={{ width: '100%' }}
                />
            </Box>

            <Box
                sx={{
                    width: { xs: '100%', sm: '100%', md: '100%', lg: '40%' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minWidth: '400px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '48px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                        }}
                    >
                        <img src="/image/leaffyIconLogo.png" alt="Example" style={{ height: '75px' }} />
                        <Typography variant="h6" gutterBottom whiteSpace='now' color='grey'>
                            Log-in to Admin console
                        </Typography>
                    </Box>

                    <GoogleSignInButton sx={{ px: '85px', py: '15px' }} onClick={handleGoogleLogin} />

                </Box>
            </Box>
        </Box >
    );
}
