// src/components/PlanterVariantSection.tsx

"use client";

import { AvailablePlanterVariant } from '@/types/plants.types';
import { PlantResponseData } from '@/types/response.types';
import {
    Button,
    Stack,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Grid,
    SelectChangeEvent,
} from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import {
    fetchAvailablePlanterVariants,
    addPlanterVariant,
    deletePlanterVariant,
    uploadPlanterVariantImage,
    updatePlanterVariant as apiUpdatePlanterVariant,
} from "./planterVariantsApi";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { plantCategoryEnum } from '@/enums/planters-series.enum';

interface PlanterVariantSectionProps {
    PlantDetails: PlantResponseData;
    OnChange: () => void;
}

interface UpdatePlanterVariant {
    images?: string[]; // Optional: Only include if updating images
}
interface CreatePlanterVariant {
    planterSku: string;
    // Additional fields can be added here if needed
}


export default function PlanterVariantSection({ PlantDetails, OnChange }: PlanterVariantSectionProps) {
    const [availableVariants, setAvailableVariants] = useState<AvailablePlanterVariant[]>([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedPlanter, setSelectedPlanter] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    // Fetch available planter variants on component mount
    useEffect(() => {
        const getAvailableVariants = async () => {
            try {
                const data = await fetchAvailablePlanterVariants();
                setAvailableVariants(data);
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to fetch planter variants.");
            }
        };

        getAvailableVariants();
    }, []);

    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        // Reset form fields
        setSelectedCategory("");
        setSelectedPlanter("");
        setError("");
    };

    const handleAddPlanterVariant = async () => {
        if (!selectedPlanter) {
            setError("Please select a planter variant to add.");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const data: CreatePlanterVariant = {
                planterSku: selectedPlanter[3],
            };
            await addPlanterVariant(PlantDetails._id, data);
            OnChange(); // Refresh parent component data
            handleCloseAddDialog();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add planter variant.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePlanterVariant = async (planterSku: string) => {
        if (!confirm("Are you sure you want to delete this planter variant?")) return;

        try {
            await deletePlanterVariant(PlantDetails._id, planterSku);
            OnChange(); // Refresh parent component data
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to delete planter variant.");
        }
    };

    const handleUploadImage = async (planterSku: string, file: File) => {
        try {
            await uploadPlanterVariantImage(PlantDetails._id, planterSku, file);
            OnChange(); // Refresh parent component data
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to upload image.");
        }
    };

    const handleDeleteImage = async (planterSku: string, imageUrl: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        try {
            // Fetch the current variant's images
            const variant = PlantDetails.planterVariants.find(v => v.planterSku === planterSku);
            if (!variant) throw new Error("Planter variant not found.");

            // Remove the selected image
            const updatedImages = variant.images.filter(img => img !== imageUrl);

            const data: UpdatePlanterVariant = {
                images: updatedImages,
            };

            await apiUpdatePlanterVariant(PlantDetails._id, planterSku, data);
            OnChange(); // Refresh parent component data
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to delete image.");
        }
    };

    // Filter availableVariants based on selectedCategory
    const filteredPlanters = selectedCategory
        ? availableVariants.filter(v => v.planterCategory === selectedCategory)
        : [];

    console.log(filteredPlanters);


    // Get unique series from availableVariants for dropdown
    const uniqueSeries = Array.from(new Set(availableVariants.map(v => v.planterCategory)));


    return (
        <Stack spacing={3}>
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" fontWeight={600}>Planter Variants</Typography>
                <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
                    Add Planter Variant
                </Button>
            </Stack>

            {/* Display Existing Planter Variants */}
            {PlantDetails?.planterVariants?.length === 0 ? (
                <Typography variant="h6" textAlign="center" color="text.secondary" py={6}>
                    No variants selected
                </Typography>
            ) : (
                <Grid container spacing={3} sx={{ pb: "24px", pr: "24px" }}>
                    {PlantDetails?.planterVariants?.map((variant) => (
                        <Grid item xs={12} sm={6} md={4} key={variant.planterSku}>
                            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                                {variant.images.length > 0 && (
                                    <CardMedia component="img" height="180" image={variant.images[0]} alt={variant.planterSku} />
                                )}
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight={600}>SKU: {variant.planterSku}</Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "space-between" }}>
                                    <Button size="small" startIcon={<UploadIcon />} onClick={() => {
                                        const fileInput = document.createElement("input");
                                        fileInput.type = "file";
                                        fileInput.accept = "image/*";
                                        fileInput.onchange = () => {
                                            if (fileInput.files && fileInput.files[0]) {
                                                handleUploadImage(variant.planterSku, fileInput.files[0]);
                                            }
                                        };
                                        fileInput.click();
                                    }}>
                                        Upload Image
                                    </Button>
                                    <IconButton color="error" onClick={() => handleDeletePlanterVariant(variant.planterSku)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Add Planter Variant Dialog */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog} fullWidth maxWidth="sm">
                <DialogTitle>Add New Planter Variant</DialogTitle>
                <DialogContent>
                    <Stack spacing={3} mt={1}>
                        {/* Select Category */}
                        <FormControl fullWidth>
                            <InputLabel id="series-label">Planter Category</InputLabel>
                            <Select
                                labelId="series-label"
                                value={selectedCategory}
                                label="Planter Category"
                                onChange={(e: SelectChangeEvent<string>) => {
                                    setSelectedCategory(e.target.value as string);
                                    setSelectedPlanter("");
                                    setError("");
                                }}
                            >
                                {uniqueSeries.map((series, idx) => (
                                    <MenuItem key={idx} value={series}>
                                        {series}
                                    </MenuItem>
                                ))}
                                {/* {Object.values(plantCategoryEnum).map((series) => (
                                    <MenuItem key={series} value={series}>
                                        {series}
                                    </MenuItem>
                                ))} */}
                            </Select>
                        </FormControl>

                        {/* Select Planter Name */}
                        <FormControl fullWidth disabled={!selectedCategory}>
                            <InputLabel id="planter-label">Planter Name</InputLabel>
                            <Select
                                labelId="planter-label"
                                value={selectedPlanter}
                                label="Planter Name"
                                onChange={(e: SelectChangeEvent<string>) => {
                                    setSelectedPlanter(e.target.value as string);
                                    setError("");
                                }}
                                renderValue={(selected) => {
                                    const [category, series, color] = selected as unknown as string[];
                                    return `${series} - ${color}`;
                                }}
                            >
                                {filteredPlanters?.map((planter, idx) => (
                                    <MenuItem key={idx} value={[planter.planterCategory, planter.planterSeries, planter.color.name, planter.sku]}>
                                        {planter.planterSeries} - {planter.color.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddPlanterVariant}
                        variant="contained"
                        color="primary"
                        disabled={!selectedPlanter || loading}
                    >
                        {loading ? "Adding..." : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    )
}
