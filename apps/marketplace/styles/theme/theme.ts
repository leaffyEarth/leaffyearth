// styles/theme.ts
import { createTheme } from '@mui/material/styles';
import { montserrat, belanosima } from '../fonts';

const theme = createTheme({
    palette: {
        primary: {
            main: '#397B57',
        },
        secondary: {
            main: '#1D3E37',
        },
        background: {
            default: '#F8FFF4',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },

    typography: {
        fontFamily: montserrat.style.fontFamily,

        h1: {
            fontFamily: belanosima.style.fontFamily,
        },
        h2: {
            fontFamily: belanosima.style.fontFamily,
        },
        h3: {
            fontFamily: belanosima.style.fontFamily,
        },
        h4: {
            fontFamily: belanosima.style.fontFamily,
        },
        h5: {
            fontFamily: belanosima.style.fontFamily,
        },
        h6: {
            fontFamily: belanosima.style.fontFamily,
        },
    },
    

    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    position: 'relative',
                    color: 'inherit',
                    textDecoration: 'none',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        bottom: 8,
                        height: '2px',
                        width: 0,
                        backgroundColor: 'currentColor',
                        transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                        width: '100%',
                    },
                    '&:hover': {
                        backgroundColor: '#F8FFF4',
                    },
                },
            },
        },
    },
});

export default theme;
