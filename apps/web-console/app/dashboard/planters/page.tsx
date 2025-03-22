'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useThemeToggle } from '@/ThemeContext';
import { api } from '@/services/api';
import { PlantersResponseData } from '@/types/response.types';
import { useRouter } from 'next/navigation';
import { Planter } from '@/types/planters.types';
import PlantersProductInCatalog from '@/components/productCatalogView/PlantersProductInCatalogView';



export default function PlantersPage() {
  const router = useRouter();
  const [planters, setPlanters] = useState<Planter[]>([])
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState<number>(1);  // 1-based page
  const [pageSize] = useState<number>(10);       // items per page
  const [total, setTotal] = useState<number>(0); // total items


  // userEffect

  useEffect(() => {
    fetchPlanters();
  }, [page]);


  // functions

  async function fetchPlanters() {
    try {
      const response = await api.get<PlantersResponseData>(
        `/planters?page=${page}&limit=${pageSize}`,
      );

      setPlanters(response.data.data)
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
          Planter Products
        </Typography>

        <Button variant="contained" onClick={() => router.push('planters/add')}>
          Add Planter
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}


      <Grid sx={{ flexGrow: 1 }} container spacing={2}>

        {
          planters?.map((planter: Planter) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={planter._id}>
              <PlantersProductInCatalog Planter={planter} key={planter._id} onChange={fetchPlanters} />
            </Grid>
          ))
        }
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 5 }}>
        <Pagination
          page={page}
          count={Math.ceil(total / pageSize)}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => setPage(value)}
          color="primary"
        />
      </Box>

    </Box>
  );
}
