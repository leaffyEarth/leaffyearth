"use client";

import { api } from "@/services/api";
import {
  catalogPlantResponse,
  Plant,
  PlantsCatalogReponse,
} from "@/types/plants.types";
import { PlantResponseData} from "@leaffyearth/utils/src/types/response.types";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import PlantProductInCatalog from "@/components/productCatalogView/PlantProductInCatalogView";
import CatalogPlantsCard from "@/components/productCatalogView/catalogPlantsCard";

export default function PlantsCatalogView() {
  const router = useRouter();

  const [plants, setPlants] = useState<catalogPlantResponse[]>([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  // functions

  const fetchPlants = async () => {
    try {
      const plants = await api.get<PlantsCatalogReponse>(`plants/collection`);
      setPlants(plants?.data.data);
      return plants.data;
    } catch (err) {
      console.error("error in fetching indoor plants", err);
      return null;
    }
  };

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
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          Plant : Catalog View
        </Typography>
      </Box>

      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        {plants?.map((plant: catalogPlantResponse) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={plant._id}>
            <CatalogPlantsCard plant={plant} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
