// src/styles/createAppTheme.ts
import { createTheme, ThemeOptions, Theme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { grey, green, purple, red, blue } from '@mui/material/colors';


const DarkBackground = ["#1C1C1C", "#212121"]
const LightBackground = ["#FAFAFA", "#FFFFFF"]
const greens = ["#43a047", "#4caf50", "#c8e6c9", "e8f5e9"]


const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
        },
      },
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          minHeight: 56,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#388e3c',
          },
          '&.Mui-selected': {
            backgroundColor: '#388e3c',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#388e3c',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '50px',
          paddingLeft: '10px'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontSize: '24px'
        },
        primary: {
          fontSize: '14px',
        },
        secondary: {
          fontSize: '12px',
          color: '#757575',
        },
      }
    }
  },
};


const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  // primary: {
  //   main: '#2e7d32',
  // },
  // secondary: {
  //   main: '#4caf50',
  // },
  primary: {
    main: '#2e7d32',
    light: '#c8e6c9',
  },
  secondary: {
    main: '#4caf50',
    light: '#e8f5e9'
  },
  background: {
    default: '#fffff',
    paper: 'white',
    // paper: '#2e7d32',
  },
  success: {
    main: green[600],
  },
  error: {
    main: red[600],
  },
  info: {
    main: blue[600],
  },
  warning: {
    main: purple[600],
  },
};

const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: {
    main: '#2e7d32',
  },
  secondary: {
    main: '#4caf50',
    light: '#388e3c',
  },
  background: {
    default: '#1C1C1C',
    paper: '#388e3c',
  },
  success: {
    main: green.A400,
  },
  error: {
    main: red.A400,
  },
  info: {
    main: blue.A200,
  },
  warning: {
    main: purple.A200,
  },
};


export function createAppTheme(mode: 'light' | 'dark'): Theme {
  const palette = mode === 'light' ? lightPalette : darkPalette;

  const themeOptions = deepmerge(baseThemeOptions, {
    palette,
  });

  return createTheme(themeOptions);
}
