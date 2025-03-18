"use client"

import { api } from "@/services/api";
import { Plant, PlantTagsType } from "@/types/plants.types";
import { PlantResponseData, PlantsResponseData } from "@/types/response.types";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2';
import PlantProductInCatalog from '@/components/productCatalogView/PlantProductInCatalogView';


export default function TopInteriorPlants() {

    const router = useRouter();

    const [plants, setPlants] = useState<Plant[]>([])


    useEffect(() => {
        fetchTopInteriorPlants()
    }, [])

    // functions

    const fetchTopInteriorPlants = async () => {
        try {
            const response = await api.get(`/plants?tags=${PlantTagsType.TOP_INDOOR}`)
            setPlants(response.data.data)
        } catch (error) {
            console.error("error fetching the top interior plants", error)
        }
    }


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "36px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: 'space-between'
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                    Plant : Top Indoor
                </Typography>

                <Button variant="contained" onClick={() => router.push('plants/add')}>
                    Add Plant
                </Button>
            </Box>


            <Grid sx={{ flexGrow: 1 }} container spacing={2}>

                {
                    plants?.map((plant: Plant) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={plant._id}>
                            <PlantProductInCatalog Plant={plant} key={plant._id} onChange={fetchTopInteriorPlants} />
                        </Grid>
                    ))
                }
            </Grid>

        </Box>
    )
}