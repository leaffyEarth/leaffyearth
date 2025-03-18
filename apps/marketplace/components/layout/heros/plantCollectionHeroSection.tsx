import theme from '../../../styles/theme/theme';
import { Box } from '@mui/material';
import Image from 'next/image'

// icons

export default function PlantCollectionHeroSection() {


    return (
        <section>
            <Box
                aria-label='hero-section'
                sx={{
                    width: '100%',
                    height:'400px',
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
