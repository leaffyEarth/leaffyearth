"use client";

import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  useTheme,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import DropdownMenu from "@/components/menu/dropdownMenu";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
// icons
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "@/services/api";
import { PlantResponseData } from "@leaffyearth/utils/src/types/response.types";

interface DeletePlantImageDialogProps {
  plantDetails: PlantResponseData;
  imageUrl?: string;
  onCreated?: () => void;
}

export default function ThumbnailDialog({
  plantDetails,
  imageUrl,
  onCreated,
}: DeletePlantImageDialogProps) {
  const theme = useTheme();

  let imageName: string = "";

  if (imageUrl) {
    const segments = imageUrl.split("/");
    imageName = segments[segments.length - 1];
  }

  const [Apiloading, setApiLoading] = React.useState<boolean>(false);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  // functions

  const handleThumbnailChangeAction = async () => {
    try {
      setApiLoading(true);

      await api.patch(`/plants/${plantDetails._id}`, {
        thumbnail: imageUrl,
      });

      setApiLoading(false);
      if (onCreated) onCreated();

      setModalOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("error while deleting the user, error: ", err);
      setModalOpen(false);
      setApiLoading(false);
    }
  };

  return (
    <>
      <Button variant="text" onClick={() => setModalOpen(true)}>
        Create Thumbnail
      </Button>

      {/* modals */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Add `&quot`{plantDetails.name}`&quot` thumbnail
          <IconButton
            aria-label="close"
            onClick={() => setModalOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          Are you sure you want to add `&quot`{imageName}`&quot` as Thumbnail
        </DialogContent>

        <DialogActions sx={{ m: 0, p: 2 }}>
          <Button
            variant="text"
            onClick={() => setModalOpen(false)}
            sx={{ color: "black" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleThumbnailChangeAction}
            variant="contained"
            disabled={Apiloading}
          >
            {Apiloading ? "Editing..." : "Edit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
