import theme from '../../../styles/theme/theme';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image'
import Grid from '@mui/material/Grid2';

// icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { api } from '../../../utils/api';
import PlantCatalogCards from '../../elements/plantCatalogCards.tsx/plantHomeCatalogCards';
import { PlantsReponse } from '../../../types/plants.types';
import Carousel from '../../elements/carousals/PlantCatalogCarousel';


const fetchTrendyIndoorPlants = async () => {
    try {
        const plants = await api.get<PlantsReponse>(`/plants?tags=${encodeURI('Top Indoor')}`);

        return plants.data;
    } catch (err) {
        console.error("error in fetching indoor plants", err);
        return null;
    }
}

export default async function IndoorPlantSection() {

    const plants = await fetchTrendyIndoorPlants()

    const firstPlant = plants?.data?.[0];
    console.log('My secret is firstPlant:', firstPlant)

    if (!plants || !plants.data) {
        return <div>No plants available</div>;
    }

    return (
        <section>
            <Stack
                spacing={10}
                sx={{
                    maxWidth: '1680px',
                    px: 1,
                    margin: 'auto',
                    width: '100%',

                    py: 12,
                    justifyContent: 'center',
                }}
            >


                <Typography variant='h2' sx={{ fontWeight: '400', textAlign: 'center' }}>
                    Elevate Your Space With Greenery
                </Typography>


                <Stack
                    spacing={5}
                >

                    <Carousel plants={plants.data} />
                    {/* <Button variant="contained" sx={{ width: '150px', alignSelf: 'center' }}>
                        VIEW All
                    </Button> */}

                    <Button variant="contained"
                        sx={{
                            width: '150px',
                            alignSelf: 'center',
                            background: 'none',
                            // background: theme.palette.secondary.main,
                            color: theme.palette.secondary.main,
                            m: 1,
                            borderRadius: '15px',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            borderColor: theme.palette.secondary.main,
                        }}
                    >
                        VIEW All
                    </Button>

                </Stack>


            </Stack>
        </section>
    );
}
