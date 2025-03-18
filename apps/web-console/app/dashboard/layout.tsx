'use client';

import React, { useState } from 'react';
import { Box, Toolbar, IconButton, Typography, Drawer, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '@/components/sidebar/homepageSidebar';



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const drawerWidth = 281;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <SideBar onLinkClick={() => setMobileOpen(false)} />
    );

    return (
        <Box sx={{ display: 'flex', height: '100%', backgroundColor: theme.palette.background.default }}>

            <Box
                position="fixed"
                sx={{
                    // zIndex: theme.zIndex.drawer + 1,
                    ml: { lg: `${drawerWidth}px` },
                    width: { lg: `calc(100% - ${drawerWidth}px)` },
                    height: '70px',
                    backgroundColor: 'white'
                }}
            >
                <Toolbar>
                    {!isDesktop && (
                        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" component="div" noWrap >
                        Dashboard
                    </Typography>
                </Toolbar>
            </Box>

            {isDesktop && (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            )}

            {!isDesktop && (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        [`& .MuiDrawer-paper`]: {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            )}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    paddingTop: 8,
                    width: { lg: `calc(100% - ${drawerWidth}px)` },
                    maxWidth: '1600px',
                    mx: 'auto'
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
