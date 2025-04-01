import { catalogPlantResponse } from "@/types/plants.types";
import { Box, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CatalogPlantsCard({
  plant,
}: {
  plant: catalogPlantResponse;
}) {
  const theme = useTheme();
  const router = useRouter();

  let thumbnail = "";

  if (plant.plants.length != 0) {
    if (plant.plants[0].thumbnail) {
      thumbnail = plant.plants[0].thumbnail;
    } else if (plant.plants[0].images.length != 0) {
      thumbnail = plant.plants[0].images[0];
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        aspectRatio: "3/4",
        gap: "6px",
        position: "relative",
      }}
    >
      <Box
        className="productImageContainer"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100px",
          minWidth: "50px",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          backgroundColor: theme.palette.secondary.light,
          borderRadius: "15px",
        }}
        // onClick={() => router.push(`/dashboard/plants/${plant._id}`.toLowerCase())}
      >
        {thumbnail && (
          <img
            src={thumbnail}
            style={{
              height: "100%",
            }}
          />
        )}
      </Box>

      <Box
        className="productDetailsContainer"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1px",
        }}
      >
        <Typography variant="subtitle1">{plant._id}</Typography>

        <Typography
          variant="subtitle1"
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          {/* ₹ {Plant.price} */}
        </Typography>
      </Box>
    </Box>
  );
}
