"use client";

import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";

// icons
import CloseIcon from "@mui/icons-material/Close";
import { api } from "@/services/api";
import { Planter } from "@/types/planters.types";

interface DeletePlanterImageDialogProps {
  planterDetails: Planter;
  imageUrl?: string;
  onCreated?: () => void;
}

export default function DeleteImageDialog({
  planterDetails,
  imageUrl,
  onCreated,
}: DeletePlanterImageDialogProps) {
  const theme = useTheme();

  let imageName: string = "";

  if (imageUrl) {
    const segments = imageUrl.split("/");
    imageName = segments[segments.length - 1];
  }

  const [Apiloading, setApiLoading] = React.useState<boolean>(false);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  // functions

  const handleUserDeleteAction = async () => {
    try {
      setApiLoading(true);

      await api.delete(`/planters/${planterDetails._id}/images/${imageName}`);

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
        Delete
      </Button>

      {/* modals */}
      {/* delete Planters Image modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Delete `&quot`{planterDetails.sku}`&quot` Image
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
          Are you sure you want to remove `&quot`{imageName}`&quot` image
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
            onClick={handleUserDeleteAction}
            variant="contained"
            color="error"
            disabled={Apiloading}
          >
            {Apiloading ? "Deleting" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
