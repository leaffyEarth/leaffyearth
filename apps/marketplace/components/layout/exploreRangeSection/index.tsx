import theme from '../../../styles/theme/theme';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image'
import ExploreTheRangeElements from './exploreTheRangeCards';




export default function ExploreTheRage() {


    return (
        <section>
            <Stack
                sx={{
                    // must have for sections
                    maxWidth: '1680px',
                    px: 1,
                    margin: 'auto',
                    width: '100%',

                    py: 12,
                    justifyContent: 'center',
                }}
            >

                <Typography variant='h2' sx={{ fontWeight: '400', textAlign: 'center' }}>
                    Explore the Collection
                </Typography>


                <Stack
                    spacing={8}
                    direction="row"
                    useFlexGap
                    sx={{ flexWrap: 'wrap', mt: 5, mb: 2, justifyContent: 'center' }}
                >
                    

                    <ExploreTheRangeElements Range='Best Selling' imageURL='https://leaffystorage.blob.core.windows.net/public/zzplant-gb.png' redirectURL='/collection/best_selling' />
                    <ExploreTheRangeElements Range='Large Size Plants' imageURL='https://leaffystorage.blob.core.windows.net/public/palm-removebg-preview.png' redirectURL='/collection/large_plants' />
                    <ExploreTheRangeElements Range='Easy to Maintain' imageURL='https://leaffystorage.blob.core.windows.net/public/snakePlants-removebg-preview.png' redirectURL='/collection/easy_to_maintain' />
                    <ExploreTheRangeElements Range='Ceremic Planters' imageURL='https://leaffystorage.blob.core.windows.net/public/ceramicPot-removebg-preview.png' redirectURL='/collection/ceremic_plant' />


                </Stack>

            </Stack>
        </section>
    );
}
