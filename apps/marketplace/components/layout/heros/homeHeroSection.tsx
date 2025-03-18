import theme from '../../../styles/theme/theme';
import { Box } from '@mui/material';
import Image from 'next/image'

// icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function HomeHeroSection() {


    return (
        <section>
            <Box
                aria-label='hero-section'
                sx={{
                    width: '100%',
                    height:'500px',
                    py: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: theme.palette.primary.main,
                    // backgroundColor: '#1D3E37',
                }}
            >
                
            </Box>
        </section>
    );
}
