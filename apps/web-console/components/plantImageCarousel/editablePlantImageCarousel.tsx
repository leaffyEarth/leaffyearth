import { Box, Stack, Typography } from "@mui/material";
import { PlantResponseData } from "@leaffyearth/utils/src/types/response.types";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { useEffect, useState } from "react";
import DeleteImageDialog from "@/app/dashboard/plants/[slug]/upload-image/components/deleteImageDialog";
import { generateRandomString } from "@/utils/generateRandomString";
import ThumbnailDialog from "@/app/dashboard/plants/[slug]/upload-image/components/thumbnailDialog";
import StarIcon from "@mui/icons-material/Star";

const EditablePlantImageCarousel = ({
  plant,
  onChange,
}: {
  plant: PlantResponseData;
  onChange: () => void;
}) => {
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
      <Stack
        key={generateRandomString(4)}
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

        {plant.images.length == 0 && (
          <Typography variant="subtitle1">No Images</Typography>
        )}

        <ChevronRightOutlinedIcon
          sx={{ alignSelf: "center" }}
          onClick={() => setPage((p) => p + 1)}
        />
      </Stack>

      <Stack>
        {selectedImage && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignSelf: "flex-end",
              justifyContent: "center",
              color: "green",
            }}
          >
            <DeleteImageDialog
              plantDetails={plant}
              imageUrl={selectedImage}
              onCreated={onChange}
            />
            {plant.thumbnail !== selectedImage ? (
              <ThumbnailDialog
                plantDetails={plant}
                imageUrl={selectedImage}
                onCreated={onChange}
              />
            ) : (
              <StarIcon />
            )}
          </Stack>
        )}
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
      </Stack>
    </Box>
  );
};

export default EditablePlantImageCarousel;
