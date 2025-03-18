"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
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
import Autocomplete from "@mui/material/Autocomplete";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import {
  PlantIdealLocationType,
  PlantLightExporeType,
  PlantMaintenanceType,
  PlantType,
  PlantWateringType,
} from "@/enums/plants.enum";

interface Dimensions {
  height: string;
  length: string;
  width: string;
}

interface FormData {
  plantName: string;
  plantSeries: string; 
  price: string;
  description: string;
  size: string;
  dimensions: Dimensions;
  type: string | null;
  lightExposure: string | null;
  idealLocation: string | null;
  maintenance: string | null;
  watering: string | null;
  tags: string[];
}

export default function AddPlantPage() {
  const theme = useTheme();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    plantName: "",
    plantSeries: "",
    price: "",
    description: "",
    size: "",
    dimensions: {
      height: "",
      length: "",
      width: "",
    },
    type: null,
    lightExposure: null,
    idealLocation: null,
    maintenance: null,
    watering: null,
    tags: [],
  });
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const [plantFamilyNames, setPlantFamilyNames] = useState<string[]>([]);

  useEffect(() => {
    getAllPlantFamilies();
  }, []);

  const getAllPlantFamilies = async () => {
    try {
      const { data } = await api.get("/plants/series");
      const familyNames = data.map((item: any) => item._id); 
      setPlantFamilyNames(familyNames); 
    } catch (err) {
      console.error("Failed to fetch plant families", err);
    }
  };

  // -----------------------------
  // 3) Handlers
  // -----------------------------
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

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };

  const handleLightExposureChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      lightExposure: e.target.value,
    }));
  };

  const handleIdealLocationChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      idealLocation: e.target.value,
    }));
  };

  const handleMaintenanceChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      maintenance: e.target.value,
    }));
  };

  const handleWateringChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      watering: e.target.value,
    }));
  };

  // <-- changes: handle submit
  const handleSubmit = async () => {
    if (
      !formData.plantName.trim() ||
      !formData.price.trim() ||
      !formData.description.trim() ||
      !formData.size.trim() ||
      !formData.dimensions.height.trim() ||
      !formData.dimensions.length.trim() ||
      !formData.dimensions.width.trim()
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      setError(undefined);
      setLoading(true);
      await api.post("plants", {
        name: formData.plantName,
        plantSeries: formData.plantSeries,
        price: parseInt(formData.price, 10),
        description: formData.description,
        size: formData.size,
        dimensions: {
          height: parseInt(formData.dimensions.height, 10),
          length: parseInt(formData.dimensions.length, 10),
          width: parseInt(formData.dimensions.width, 10),
        },
        type: formData.type,
        lightExposure: formData.lightExposure,
        idealLocation: formData.idealLocation,
        maintenance: formData.maintenance,
        watering: formData.watering,
        tags: formData.tags,
      });
      setFormData({
        plantName: "",
        plantSeries: "",
        price: "",
        description: "",
        size: "",
        dimensions: { height: "", length: "", width: "" },
        type: null,
        lightExposure: null,
        idealLocation: null,
        maintenance: null,
        watering: null,
        tags: [],
      });
      setLoading(false);
      router.push("/dashboard/plants");
    } catch (err: any) {
      setError(err?.message || "Failed to save plant");
      setLoading(false);
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
          Add Plant
        </Typography>
      </Box>

      <Box>
        <Stack spacing={5} direction="row" useFlexGap sx={{ flexWrap: "wrap" }}>
          {/* 
            Potentially an area for an image or placeholder,
            as in your existing commented-out code.
          */}

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: "36px",
            }}
          >
            {/* PLANT NAME */}
            <TextField
              name="plantName"
              placeholder="Plant Name"
              variant="standard"
              value={formData.plantName}
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

            
            <Autocomplete
              freeSolo
              options={plantFamilyNames}
              value={formData.plantSeries}
              onInputChange={(event, newInputValue) => {
                // triggered as user types
                setFormData((prev) => ({
                  ...prev,
                  plantSeries: newInputValue,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Plant Series"
                  variant="standard"
                  required
                />
              )}
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

            {/* SELECT FIELDS */}
            <Stack spacing={6} direction="row" useFlexGap sx={{ flexWrap: "wrap" }}>
              {/* SIZE SELECT */}
              <FormControl required>
                <InputLabel>Size</InputLabel>
                <Select
                  label="Size"
                  value={formData.size}
                  onChange={handleSizeChange}
                  sx={{ width: "200px" }}
                >
                  <MenuItem value="small">Small</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="large">Large</MenuItem>
                  <MenuItem value="extra-large">Extra Large</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  value={formData.type ?? ""}
                  onChange={handleTypeChange}
                  sx={{ width: "200px" }}
                >
                  {Object.values(PlantType).map((plantEnumValue) => (
                    <MenuItem key={plantEnumValue} value={plantEnumValue}>
                      {plantEnumValue}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel>Light Exposure</InputLabel>
                <Select
                  label="lightExposure"
                  value={formData.lightExposure ?? ""}
                  onChange={handleLightExposureChange}
                  sx={{ width: "200px" }}
                >
                  {Object.values(PlantLightExporeType).map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel>Ideal Location</InputLabel>
                <Select
                  label="Ideal Location"
                  value={formData.idealLocation ?? ""}
                  onChange={handleIdealLocationChange}
                  sx={{ width: "200px" }}
                >
                  {Object.values(PlantIdealLocationType).map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel>Maintenance</InputLabel>
                <Select
                  label="Maintenance"
                  value={formData.maintenance ?? ""}
                  onChange={handleMaintenanceChange}
                  sx={{ width: "200px" }}
                >
                  {Object.values(PlantMaintenanceType).map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel>Watering</InputLabel>
                <Select
                  label="Watering"
                  value={formData.watering ?? ""}
                  onChange={handleWateringChange}
                  sx={{ width: "200px" }}
                >
                  {Object.values(PlantWateringType).map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

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
                  sx={{ width: "150px" }}
                />
                <TextField
                  name="length"
                  label="Length (cm)"
                  variant="outlined"
                  value={formData.dimensions.length}
                  onChange={handleDimensionsChange}
                  required
                  sx={{ width: "150px" }}
                />
                <TextField
                  name="width"
                  label="Width (cm)"
                  variant="outlined"
                  value={formData.dimensions.width}
                  onChange={handleDimensionsChange}
                  required
                  sx={{ width: "150px" }}
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
              sx={{ width: "400px", height: "60px", alignSelf: "flex-end" }}
            >
              {loading ? "Submitting" : "Submit"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
