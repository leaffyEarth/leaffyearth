'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { api } from '@/services/api';
import { PlantResponseData } from '@/types/response.types';
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useRouter } from 'next/navigation';
import PlantersImageCarousel from '@/components/plantersImageCarousel/planterImageCarousel';




interface Dimensions {
    height: string;
    length: string;
    width: string;
}

interface FormData {
    planterName: string;
    price: string;
    color: string;
    description: string;
    size: string;
    dimensions: Dimensions;
}


export default function PlantersDetailPage(props: { params: Promise<{ slug: string }> }) {
    const router = useRouter();

    const [planterId, setPlanterId] = useState<string | null>(null)
    const [planterDetails, setPlanterDetails] = useState<PlantResponseData | null>(null)

    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const [editable, setEditable] = useState<boolean>(false)

    const [formData, setFormData] = useState<FormData>({
        planterName: "",
        price: "",
        description: "",
        size: "",
        color: "",
        dimensions: {
            height: "",
            length: "",
            width: "",
        },
    });


    useEffect(() => {
        getPlanterProp()
    }, [])

    useEffect(() => {
        if (planterId) getPlanterDetails()
    }, [planterId])


    // function

    const getPlanterProp = async () => {
        const params = await props.params;
        setPlanterId(params.slug.toUpperCase())
    }

    const getPlanterDetails = async () => {
        try {
            const planterDetails = await api.get(`/planters/${planterId}`)
            setPlanterDetails(planterDetails.data)
            setFormData({
                planterName: planterDetails.data.name,
                description: planterDetails.data.description,
                price: planterDetails.data.price.toString(),
                size: planterDetails.data.size,
                color: planterDetails.data.color,
                dimensions: {
                    height: planterDetails.data.dimensions.height.toString(),
                    length: planterDetails.data.dimensions.length.toString(),
                    width: planterDetails.data.dimensions.width.toString(),
                }
            })
        } catch (error) {
            console.log("error in fetching the plant", error)
        }

    }


    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSizeChange = (e: SelectChangeEvent<string>) => {
        setFormData((prev) => ({
            ...prev,
            size: e.target.value,
        }));
    };

    const handleDimensionsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            dimensions: {
                ...prev.dimensions,
                [name]: value,
            },
        }));
    };

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            color: e.target.value,
        }));
    };


    const handleSubmit = async () => {
        if (
            !formData.planterName.trim() ||
            !formData.price.trim() ||
            !formData.description.trim() ||
            !formData.size.trim() ||
            !formData.color.trim() ||
            !formData.dimensions.height.trim() ||
            !formData.dimensions.length.trim() ||
            !formData.dimensions.width.trim()
        ) {
            setError("Please fill out all required fields.");
            return;
        }

        try {
            setError("");
            setLoading(true)
            await api.patch(`planters/${planterDetails?._id}`, {
                price: parseInt(formData.price, 0),
                description: formData.description,
                size: formData.size,
                color: formData.color,
                dimensions: {
                    height: parseInt(formData.dimensions.height, 0),
                    length: parseInt(formData.dimensions.length, 0),
                    width: parseInt(formData.dimensions.width, 0)
                },
            });
            getPlanterDetails()
            setEditable(false)
            setLoading(false)

        } catch (err: any) {
            setError(err?.message || "Failed to save plant");
            setLoading(false)
        }
    };



    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "36px",
                }}
            >

                <Stack
                    spacing={5}
                    direction="row"
                    useFlexGap
                    sx={{ flexWrap: 'wrap', mb: '24px' }}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            width: '40%',
                        }}
                    >
                        {planterDetails && <PlantersImageCarousel planter={planterDetails} />}

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => router.push(`${planterDetails?._id}/upload-image`)}

                            sx={{ width: "200px", height: "50px", alignSelf: 'flex-end', }}
                        >
                            Edit
                        </Button>
                    </Stack>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "36px",
                        }}
                    >
                        {/* PLANTER NAME */}
                        <TextField
                            name="planterName"
                            placeholder="Planter Name"
                            disabled={!editable}
                            variant="standard"
                            value={formData.planterName}
                            // onChange={handleInputChange}
                            required
                            sx={{
                                "& .MuiInputBase-input": {
                                    fontSize: 45,
                                },
                                "& .MuiInputLabel-root": {
                                    fontSize: 45,
                                },
                            }}
                        />

                        {/* PRICE */}
                        <TextField
                            name="price"
                            label="Price"
                            disabled={!editable}
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CurrencyRupeeIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="filled"
                            sx={{
                                width: "150px",
                                "& .MuiInputBase-input": {
                                    fontSize: 20,
                                },
                                "& .MuiInputLabel-root": {
                                    fontSize: 15,
                                },
                            }}
                        />

                        {/* DESCRIPTION */}
                        <TextField
                            name="description"
                            placeholder="Provide a detailed description..."
                            multiline
                            disabled={!editable}
                            rows={4}
                            variant="outlined"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />

                        {/* SIZE SELECT */}
                        <FormControl required>
                            <InputLabel>Size</InputLabel>
                            <Select
                                label='Size'
                                value={formData.size}
                                disabled={!editable}
                                onChange={handleSizeChange}
                                sx={{
                                    width: "200px",
                                }}
                            >
                                <MenuItem value={"small"}>Small</MenuItem>
                                <MenuItem value={"medium"}>Medium</MenuItem>
                                <MenuItem value={"large"}>Large</MenuItem>
                                <MenuItem value={"extra-large"}>Extra Large</MenuItem>
                            </Select>
                        </FormControl>

                        {/* COLOR */}
                        <FormControl required>
                            <TextField
                                name="Color"
                                label="Color"
                                disabled={!editable}
                                variant="outlined"
                                value={formData.color}
                                onChange={handleColorChange}
                                required
                                sx={{
                                    width: "200px",
                                }}
                            />
                        </FormControl>

                        {/* DIMENSIONS */}
                        <Box>
                            <InputLabel sx={{ mb: "12px" }}>Dimensions</InputLabel>
                            <Box
                                component="form"
                                sx={{ display: "flex", gap: "12px" }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    name="height"
                                    label="Height (cm)"
                                    variant="outlined"
                                    disabled={!editable}
                                    value={formData.dimensions.height}
                                    onChange={handleDimensionsChange}
                                    required
                                    sx={{
                                        width: "150px",
                                    }}
                                />
                                <TextField
                                    name="length"
                                    label="Length (cm)"
                                    variant="outlined"
                                    disabled={!editable}
                                    value={formData.dimensions.length}
                                    onChange={handleDimensionsChange}
                                    required
                                    sx={{
                                        width: "150px",
                                    }}
                                />
                                <TextField
                                    name="width"
                                    label="Width (cm)"
                                    variant="outlined"
                                    disabled={!editable}
                                    value={formData.dimensions.width}
                                    onChange={handleDimensionsChange}
                                    required
                                    sx={{
                                        width: "150px",
                                    }}
                                />
                            </Box>
                        </Box>


                        {error && (
                            <Typography variant="subtitle1" color="error">
                                {error}
                            </Typography>
                        )}


                        {editable && <Stack direction="row" spacing={2} sx={{ alignSelf: 'flex-end', mb: '24px' }}>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => setEditable(false)}
                                sx={{ width: "200px", height: "60px", alignSelf: 'flex-end' }}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={loading}
                                sx={{ width: "200px", height: "60px", alignSelf: 'flex-end' }}
                            >
                                {loading ? 'Submitting' : 'Submit'}
                            </Button>
                        </Stack>}

                        {!editable &&
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setEditable(true)}
                                disabled={loading}
                                sx={{ width: "400px", height: "60px", alignSelf: 'flex-end', mb: '24px' }}
                            >
                                Edit
                            </Button>
                        }

                    </Box>
                </Stack >
            </Box >
        </>
    );
}
