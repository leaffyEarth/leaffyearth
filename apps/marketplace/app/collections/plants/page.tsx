import PlantCollectionCatalogCard from "../../../components/elements/plantCatalogCards.tsx/collectionCatalogCard";
import HomeHeroSection from "../../../components/layout/heros/homeHeroSection";
import PlantCollectionHeroSection from "../../../components/layout/heros/plantCollectionHeroSection";
import { catalogPlantSeries, PlantsCatalogReponse } from "../../../types/plants.types";
import { api } from "../../../utils/api";
import { Box, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';



const fetchPlants = async () => {
    try {
        const plants = await api.get<PlantsCatalogReponse>(`plants/collection`);

        return plants.data;
    } catch (err) {
        console.error("error in fetching indoor plants", err);
        return null;
    }
}

export default async function PlantCollections() {

    const plants = await fetchPlants()

    if (!plants || !plants.data) {
        return <div>No plants available</div>;
    }

    console.log("plants", plants.data)

    return (
        <main>
            <PlantCollectionHeroSection />

            <Stack
                spacing={4}
                sx={{
                    maxWidth: '1680px',
                    px: 1,
                    margin: 'auto',
                    width: '100%',
                    py: 10
                }}
            >
                <Box>
                    <Typography variant="h4">
                        Plants
                    </Typography>
                    <Typography variant="subtitle1">
                        Plants make for the best house companions, suitable for all your moods and every aesthetic. Ugaoo, an online website for decorative plants, offers a wide variety of plants so that you can buy plants online from the comfort of your home!
                    </Typography>
                </Box>


                <Grid sx={{ flexGrow: 1 }} container spacing={4}>

                    {
                        plants.data?.map((plant: catalogPlantSeries) => (
                            <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={plant._id}>
                                <PlantCollectionCatalogCard Plant={plant} />
                            </Grid>
                        ))
                    }
                </Grid>



            </Stack>

        </main>
    );
}
