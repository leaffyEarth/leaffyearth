"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import PlantDetailSection from "./components/basePlant.section";
import PlanterVarientSection from "./components/planterVariant.section";
import { PlantResponseData } from "@/types/response.types";
import Error404Component from "@/components/404";
import { Typography } from "@mui/material";



export default function PlantDetailPage(props: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [plantId, setPlantId] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [plantDetails, setPlantDetails] = useState<PlantResponseData | null>(null);


  // 1) Plant Families for Autocomplete

  useEffect(() => {
    getPlantProp();
  }, []);

  useEffect(() => {
    if (plantId) getPlantDetails();
  }, [plantId]);




  // 2) Functions

  const getPlantProp = async () => {
    const params = await props.params;
    setPlantId(params.slug.toUpperCase());
  };

  const getPlantDetails = async () => {
    try {

      setPageLoading(true)
      const { data } = await api.get(`/plants/${plantId}`);
      setPlantDetails(data)
      setPageLoading(false)

    } catch (err) {
      console.log("error in fetching the plant", err);
    }
  };

  if (pageLoading) {
    return (
      <Typography variant="h5">
        Loading...
      </Typography>
    )
  }

  if (!plantDetails) {
    return (
      <Error404Component />
    )
  }


  return (
    <>
      <PlantDetailSection PlantDetails={plantDetails} OnChange={getPlantDetails} />
      <PlanterVarientSection PlantDetails={plantDetails} OnChange={getPlantDetails} />
    </>
  );
}
