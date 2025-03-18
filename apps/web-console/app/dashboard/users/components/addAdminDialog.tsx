"use client";

import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "@/services/api";

interface AddAdminDialogProps {
    onCreated?: () => void;
}

export default function AddAdminDialog({ onCreated }: AddAdminDialogProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const [role, setRole] = useState<string>("admin"); // default to 'admin' or 'manager', etc.

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setError(null);
            setLoading(true);

            await api.post("/users", {
                email,
                displayName,
                role,
            });

            setLoading(false);
            if (onCreated) onCreated();

            // Reset fields and close dialog
            setEmail("");
            setDisplayName("");
            setRole("admin");
            setOpen(false);
        } catch (err: any) {
            setLoading(false);
            setError(err?.message || "Failed to create user");
        }
    };

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Add Admin
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Add New User
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpen(false)}
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

                <DialogContent dividers>
                    {error && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}

                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        label="Display Name"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            label="Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value="owner">Owner</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="manager">Manager</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions sx={{ m: 0, p: 2 }}>
                    <Button variant="text" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={loading}
                    >
                        { loading ? 'Creating' : 'Create' }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
