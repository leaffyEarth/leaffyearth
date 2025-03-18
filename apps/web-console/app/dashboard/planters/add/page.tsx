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

// Define the type for form state
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

export default function AddPlanterPage() {
  const theme = useTheme();
  const router = useRouter();


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
      setError(undefined);
      setLoading(true)
      await api.post("planters", {
        name: formData.planterName,
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
        planterName: "",
        price: "",
        description: "",
        color: "",
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
            {/* PLANTER NAME */}
            <TextField
              name="planterName"
              placeholder="Planter Name"
              variant="standard"
              value={formData.planterName}
              onChange={handleInputChange}
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
            <FormControl required>
              <TextField
                name="Color"
                label="Color"
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
