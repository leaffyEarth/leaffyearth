"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { api } from "@/services/api";
import { useRouter } from 'next/navigation';
import { plantCategoryEnum } from "@leaffyearth/utils";
// Define the type for form state
interface Dimensions {
  height: string;
  length: string;
  width: string;
}

interface Color {
  hex: string;
  name: string;
}

interface FormData {
  name?: string;
  planterCategory: string;
  planterSeries: string;
  price: string;
  color: Color;
  description: string;
  size: string;
  dimensions: Dimensions;
}

export default function AddPlanterPage() {
  const theme = useTheme();
  const router = useRouter();


  const [formData, setFormData] = useState<FormData>({
    name: "",
    planterCategory: "",
    planterSeries: "",
    price: "",
    description: "",
    size: "",
    color: {
      hex: "",
      name: "",
    },
    dimensions: {
      height: "",
      length: "",
      width: "",
    },
  });
  const [error, setError] = useState<string>();

  const [loading, setLoading] = useState<boolean>()



  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handlePlanterCategoryChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      planterCategory: e.target.value,
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


  const handleSizeChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      size: e.target.value,
    }));
  };


  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      color: {
        ...prev.color,
        [e.target.name]: e.target.value,
      },
    }));
  };


  const handleSubmit = async () => {
    if (
      !formData.name?.trim() ||
      !formData.planterCategory.trim() ||
      !formData.planterSeries.trim() ||
      !formData.price.trim() ||
      !formData.description.trim() ||
      !formData.size.trim() ||
      !formData.color.hex.trim() ||
      !formData.color.name.trim() ||
      !formData.dimensions.height.trim() ||
      !formData.dimensions.length.trim() ||
      !formData.dimensions.width.trim()
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      setError(undefined);
      setLoading(true)
      await api.post("planters", {
        name: formData.name,
        planterCategory: formData.planterCategory,
        planterSeries: formData.planterSeries,
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
      setFormData({
        name: "",
        planterCategory: "",
        planterSeries: "",
        price: "",
        description: "",
        color: { hex: "", name: "" },
        size: "",
        dimensions: { height: "", length: "", width: "" },
      });
      setLoading(false)

      router.push('/dashboard/planters')
    } catch (err: any) {
      setError(err?.message || "Failed to save plant");
      setLoading(false)

    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "36px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          Add Planter
        </Typography>
      </Box>

      <Box>
        <Stack spacing={5} direction="row" useFlexGap sx={{ flexWrap: "wrap" }}>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: "36px",
            }}
          >

            {/* NAME */}
            <TextField
              name="name"
              placeholder="Planter Name"
              variant="standard"
              value={formData.name}
              onChange={handleInputChange}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: 25,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 18,
                },
              }}
            />

            {/* PLANTER CATEGORY */}
            <FormControl required>
              <InputLabel
                sx={{
                  fontSize: 25,
                }}
              >
                Planter Category
              </InputLabel>
              <Select
                name="planterCategory"
                label="Planter Category"
                value={formData.planterCategory}
                onChange={handlePlanterCategoryChange}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: 25,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: 18,
                  },
                }}
              >
                {Object.values(plantCategoryEnum).map((planterSeriesEnumValue) => (
                  <MenuItem key={planterSeriesEnumValue} value={planterSeriesEnumValue}>
                    {planterSeriesEnumValue}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* PLANTER SERIES */}
            <TextField
              name="planterSeries"
              placeholder="Planter Series"
              variant="standard"
              value={formData.planterSeries}
              onChange={handleInputChange}
              required
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: 25,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 18,
                },
              }}
            />

            {/* PRICE */}
            <TextField
              name="price"
              label="Price"
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
            <Box>
              <InputLabel sx={{ mb: "12px" }}>Color</InputLabel>
              <Box
                component="form"
                sx={{ display: "flex", gap: "12px" }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  name="hex"
                  label="Hex Code"
                  variant="outlined"
                  value={formData.color.hex}
                  onChange={handleColorChange}
                  required
                  sx={{
                    width: "150px",
                  }}
                />
                <TextField
                  name="name"
                  label="Color Name"
                  variant="outlined"
                  value={formData.color.name}
                  onChange={handleColorChange}
                  required
                  sx={{
                    width: "150px",
                  }}
                />
              </Box>
            </Box>

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

            {/* SUBMIT BUTTON */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ width: "400px", height: "60px", alignSelf: 'flex-end' }}
            >
              {loading ? 'Submitting' : 'Submit'}
            </Button>


          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
