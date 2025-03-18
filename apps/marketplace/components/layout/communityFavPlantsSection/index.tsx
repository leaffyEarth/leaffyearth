import theme from '../../../styles/theme/theme';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image'

// icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function CommunityFavorate() {


    return (
        <section>
            <Stack
                sx={{
                    // must have for sections
                    maxWidth: '1680px',
                    px: 1,
                    margin: 'auto',
                    width: '100%',

                    py: 15,
                    justifyContent: 'center',
                }}
            >

                <Typography variant='h2' sx={{ fontWeight: '400', textAlign: 'center' }}>
                    Community Favorites
                </Typography>



            </Stack>
        </section>
    );
}
