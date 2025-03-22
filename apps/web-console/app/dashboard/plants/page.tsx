'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Pagination, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useThemeToggle } from '@/ThemeContext';
import { api } from '@/services/api';
import { Plant } from '@/types/plants.types';
import { PlantsResponseData } from '@/types/response.types';
import { useRouter } from 'next/navigation';
import DeletePlantDialog from './components/deletePlantDialog';
import PlantProductInCatalog from '@/components/productCatalogView/PlantProductInCatalogView';


export default function PlantPage() {
  const router = useRouter();
  const [plants, setPlants] = useState<Plant[]>([])
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState<number>(1);  // 1-based page
  const [pageSize] = useState<number>(10);       // items per page
  const [total, setTotal] = useState<number>(0); // total items


  // userEffect

  useEffect(() => {
    fetchPlants();
  }, [page]);


  // functions

  async function fetchPlants() {
    try {
      const response = await api.get<PlantsResponseData>(
        `/plants?page=${page}&limit=${pageSize}`,
      );

      setPlants(response.data.data)
      setTotal(response.data.total);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch users");
    }
  }



  return (
    <Box
      key={'plantProducts'}
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
          Plant Products
        </Typography>

        <Button variant="contained" onClick={() => router.push('plants/add')}>
          Add Plant
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Stack
        spacing={2}
        direction='row'
      >

        <Button color='secondary' variant="contained" onClick={() => router.push('plants/top-interior')}
          sx={{
            width: '200px',
            color: 'white',
            borderRadius: '20px',
            boxShadow: 'none'
          }}
        >
          Best interior Plants
        </Button>

        <Button color='secondary' variant="contained" onClick={() => router.push('plants/catalog')}
          sx={{
            width: '150px',
            color: 'white',
            borderRadius: '20px',
            boxShadow: 'none'
          }}
        >
          catalog View
        </Button>
      </Stack>



      <Grid sx={{ flexGrow: 1 }} container spacing={2}>

        {
          plants?.map((plant: Plant) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={plant._id}>
              <PlantProductInCatalog Plant={plant} key={plant._id} onChange={fetchPlants} />
            </Grid>
          ))
        }
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 5 }}>
        <Pagination
          page={page}                         // current page
          count={Math.ceil(total / pageSize)} // total pages
          onChange={(event: React.ChangeEvent<unknown>, value: number) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}
