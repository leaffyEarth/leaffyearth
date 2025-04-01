import { Box, Stack } from "@mui/material";
import { PlantResponseData } from "@leaffyearth/utils/src/types/response.types";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { useState } from "react";
import PlantDetailPage from "@/app/dashboard/plants/[slug]/page";

const PlantImageCarousel = ({ plant }: { plant: PlantResponseData }) => {
  const [selectedImage, setSelectedImage] = useState<string>(plant.images[0]);
  const [page, setPage] = useState<number>(0);

  return (
    <Box
      sx={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
      }}
    >
      {plant.images.length != 0 ? (
        <Box
          sx={{
            overflow: "hidden",
            width: "100%",
            maxHeight: "700px",
            aspectRatio: "4/5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={selectedImage}
            style={{
              height: "100%",
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            overflow: "hidden",
            width: "100%",
            maxHeight: "700px",
            aspectRatio: "4/5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No Images
        </Box>
      )}

      <Stack
        direction="row"
        spacing={2}
        // width='500px'
        overflow="auto"
      >
        <ChevronLeftOutlinedIcon
          sx={{ alignSelf: "center" }}
          onClick={() =>
            setPage((p) => {
              if (p != 0) return p - 1;
              else return Math.floor(plant.images.length / 4);
            })
          }
        />
        {plant?.images
          ?.filter((fruit, index) => {
            const startIndex = page * 4;
            const endIndex = startIndex + 4;
            const arraySize = plant?.images?.length;

            if (startIndex > arraySize - 1) {
              setPage(0);
            }
            return index >= startIndex && index < endIndex;
          })
          ?.map((imageUrl, index) => {
            return (
              <Box
                key={imageUrl}
                sx={{
                  overflow: "hidden",
                  width: "100px",
                  minWidth: "100px",
                  aspectRatio: "4/5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedImage(imageUrl);
                }}
              >
                <img
                  src={imageUrl}
                  style={{
                    width: "140px",
                  }}
                />
              </Box>
            );
          })}

        <ChevronRightOutlinedIcon
          sx={{ alignSelf: "center" }}
          onClick={() => setPage((p) => p + 1)}
        />
      </Stack>
    </Box>
  );
};

export default PlantImageCarousel;
