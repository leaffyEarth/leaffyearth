"use client";

import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    useTheme,
    Box,
} from "@mui/material";

// icons
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { api } from "@/services/api";
import { Planter } from "@/types/planters.types";

interface DeletePlanterImageDialogProps {
    planterDetails: Planter;
    onChange?: () => void;
}

export default function DeletePlanterDialog({
    planterDetails,
    onChange,
}: DeletePlanterImageDialogProps) {
    const theme = useTheme();

    const [apiLoading, setApiLoading] = React.useState<boolean>(false);

    // Handle Menu open/close
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Handle Delete Confirmation Dialog open/close
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    const handleOpenDeleteDialog = () => {
        handleMenuClose(); // Close the Menu first
        setModalOpen(true); // Then open the dialog
    };

    const handleCloseDeleteDialog = () => {
        setModalOpen(false);
    };

    
    // Functions
    const handleUserDeleteAction = async () => {
        try {
            setApiLoading(true);
            await api.delete(`/planters/${planterDetails._id}`);

            setApiLoading(false);
            if (onChange) onChange();

            setModalOpen(false);
        } catch (err: any) {
            console.error("error while deleting the Planters, error: ", err);
            setModalOpen(false);
            setApiLoading(false);
        }
    };

    return (
        <Box >
            <IconButton
                onClick={handleMenuOpen}
                sx={{
                    position: "absolute",
                    bottom: '10px',
                    right: 0,
                }}
            >
                <MoreVertIcon />
            </IconButton>

            {/* MENU */}
            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: { width: 120 }, // optional styling
                }}
            >
                <MenuItem onClick={handleOpenDeleteDialog}>Delete</MenuItem>
            </Menu>

            {/* DELETE CONFIRMATION DIALOG */}
            <Dialog
                open={modalOpen}
                onClose={handleCloseDeleteDialog}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Delete Planters
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDeleteDialog}
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
                    Are you sure you want to remove &quot;{planterDetails.name}&quot;?
                </DialogContent>

                <DialogActions sx={{ m: 0, p: 2 }}>
                    <Button variant="text" onClick={handleCloseDeleteDialog} sx={{ color: "black" }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUserDeleteAction}
                        variant="contained"
                        color="error"
                        disabled={apiLoading}
                    >
                        {apiLoading ? "Deleting" : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
