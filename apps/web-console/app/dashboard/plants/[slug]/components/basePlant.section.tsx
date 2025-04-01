"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { api } from "@/services/api";
import { PlantResponseData } from "@leaffyearth/utils/src/types/response.types";
import PlantImageCarousel from "@/components/plantImageCarousel/plantImageCarousel";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useRouter } from "next/navigation";
import {
  PlantType,
  PlantIdealLocationType,
  PlantLightExporeType,
  PlantMaintenanceType,
  PlantWateringType,
  PlantTagsType,
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
  type: string[];
  lightExposure: string;
  idealLocation: string[];
  maintenance: string;
  watering: string;
  tags: string[];
}

export default function PlantDetailSection({
  PlantDetails,
  OnChange,
}: {
  PlantDetails: PlantResponseData;
  OnChange: () => void;
}) {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [plantNameError, setPlantNameError] = useState<string>();
  const [plantSeriesError, setPlantSeriesError] = useState<string>();
  const [priceError, setPriceError] = useState<string>();
  const [dimensionErrors, setDimensionErrors] = useState({
    height: "",
    length: "",
    width: "",
  });
  const [plantFamilyNames, setPlantFamilyNames] = useState<string[]>([]);

  // The main form data
  const [formData, setFormData] = useState<FormData>({
    plantName: PlantDetails.name || "",
    plantSeries: PlantDetails.plantSeries || "",
    description: PlantDetails.description || "",
    price: PlantDetails.price?.toString() || "",
    size: PlantDetails.size || "",
    dimensions: {
      height: PlantDetails.dimensions?.height?.toString() || "",
      length: PlantDetails.dimensions?.length?.toString() || "",
      width: PlantDetails.dimensions?.width?.toString() || "",
    },
    type: PlantDetails.type || [],
    lightExposure: PlantDetails.lightExposure || "",
    idealLocation: PlantDetails.idealLocation || [],
    maintenance: PlantDetails.maintenance || "",
    watering: PlantDetails.watering || "",
    tags: PlantDetails.tags || [],
  });

  // Fetch all families once
  useEffect(() => {
    getAllPlantFamilies();
  }, []);

  // 2) Functions

  const getAllPlantFamilies = async () => {
    try {
      // example endpoint that returns: [{ _id: 'MonsteraSeries', totalCount: 3 }, ...]
      const { data } = await api.get(`/plants/series`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const familyNames = data.map((item: any) => item._id); // or item.name
      setPlantFamilyNames(familyNames);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Failed to fetch plant families", error);
    }
  };

  // For standard text changes (non-Autocomplete)
  const handleInputChangePlantName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    const isValid =
      value === "" || /^[A-Za-z]+( [A-Za-z]+)?$/.test(value.trim());
    if (!isValid) {
      setPlantNameError("Plant Name must contain exactly one space");
    } else {
      setPlantNameError("");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChangePlantSeries = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    const isValid =
      !/\s{2,}/.test(value.trim()) &&
      !/^plant\b/i.test(value.trim()) &&
      !/\bplant\b/i.test(value.trim()) &&
      /^[a-z\s]*$/.test(value.trim());
    if (!isValid) {
      setPlantSeriesError(
        'Plant Series must not contain continuous spaces or the word "plant" as a prefix or separate word or contain any special characters',
      );
    } else {
      setPlantSeriesError("");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChangePrice = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    const isValid = value === "" || /^[0-9]+$/.test(value);
    if (!isValid) {
      setPriceError("Price must be a number and should not contain any spaces");
    } else {
      setPriceError("");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDimensionsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isValid = /^[0-9]*$/.test(value);
    if (!isValid) {
      setDimensionErrors((prev) => ({
        ...prev,
        [name]: "Dimension must be a number and should not contain any spaces",
      }));
    } else {
      setDimensionErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setFormData((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [name]: value,
      },
    }));
  };

  // For <Select> changes
  const handleSizeChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      size: e.target.value,
    }));
  };

  // const handleDimensionsChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     dimensions: {
  //       ...prev.dimensions,
  //       [name]: value,
  //     },
  //   }));
  // };

  // const handleTypeChange = (e: SelectChangeEvent<string>) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     type: e.target.value,
  //   }));
  // };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePlantSeriesInputChange = (event: any, newValue: string) => {
    setFormData((prev) => ({
      ...prev,
      plantSeries: newValue,
    }));
  };

  const handleLightExposureChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      lightExposure: e.target.value,
    }));
  };

  // const handleIdealLocationChange = (e: SelectChangeEvent<string>) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     idealLocation: e.target.value,
  //   }));
  // };

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

  const handleTagsChange = (e: SelectChangeEvent<string[]>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      tags: typeof value === "string" ? value.split(",") : value,
    }));
  };

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
      setError("");
      setLoading(true);
      await api.patch(`plants/${PlantDetails?._id}`, {
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
      await OnChange();
      setEditable(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message || "Failed to save plant");
    } finally {
      setLoading(false);
    }
  };

  // 4) Render
  return (
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
        sx={{ flexWrap: "wrap", mb: "24px" }}
      >
        {/* Left side: image carousel and "upload-image" button */}
        <Stack spacing={2} sx={{ width: "40%" }}>
          {PlantDetails && <PlantImageCarousel plant={PlantDetails} />}
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push(`${PlantDetails?._id}/upload-image`)}
            sx={{
              width: { xs: "100%", sm: "80%" },
              height: "50px",
              alignSelf: { xs: "center", sm: "flex-end" },
              ml: "200px",
            }}
          >
            Add or Edit Image
          </Button>
        </Stack>

        {/* Right side: form fields */}
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
            label="Plant Name"
            variant="standard"
            value={formData.plantName}
            onChange={handleInputChangePlantName}
            error={!!plantNameError}
            helperText={plantNameError}
            disabled={!editable}
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

          {/* PLANT SERIES - Autocomplete */}
          {editable ? (
            <Autocomplete
              freeSolo
              options={plantFamilyNames} // array of strings
              value={formData.plantSeries}
              onInputChange={handlePlantSeriesInputChange} // user is typing a new string
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Plant Series"
                  onChange={handleInputChangePlantSeries}
                  variant="standard"
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: 25,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 18,
                    },
                  }}
                  required
                  error={!!plantSeriesError}
                  helperText={plantSeriesError}
                />
              )}
            />
          ) : (
            <TextField
              name="plantSeries"
              disabled={!editable}
              variant="standard"
              label="Plant Series"
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: 25,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 18,
                },
              }}
              value={formData.plantSeries}
              required
              onChange={handleInputChangePlantSeries}
              error={!!plantSeriesError}
              helperText={plantSeriesError}
            />
          )}

          {/* PRICE */}
          <TextField
            name="price"
            label="Price"
            disabled={!editable}
            value={formData.price}
            onChange={handleInputChangePrice}
            error={!!priceError}
            helperText={priceError}
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

          <Stack
            spacing={6}
            direction="row"
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            {/* SIZE SELECT */}
            <FormControl required>
              <InputLabel>Size</InputLabel>
              <Select
                label="Size"
                value={formData.size}
                disabled={!editable}
                onChange={handleSizeChange}
                sx={{
                  width: "200px",
                }}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
                <MenuItem value="extra-large">Extra Large</MenuItem>
              </Select>
            </FormControl>

            {/* TYPE SELECT */}
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                multiple
                disabled={!editable}
                value={formData.type}
                onChange={(e) => {
                  const value = e.target.value as string[];
                  setFormData((prev) => ({
                    ...prev,
                    type: value,
                  }));
                }}
                renderValue={(selected) => selected.join(", ")}
                sx={{ width: "200px" }}
              >
                {Object.values(PlantType).map((val) => (
                  <MenuItem key={val} value={val}>
                    {formData.type.includes(val) ? "✓ " : ""}
                    {val}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack
            spacing={6}
            direction="row"
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            {/* LIGHT EXPOSURE SELECT */}
            <FormControl>
              <InputLabel>Light Exposure</InputLabel>
              <Select
                label="LightExposure"
                value={formData.lightExposure}
                disabled={!editable}
                onChange={handleLightExposureChange}
                sx={{
                  width: "200px",
                }}
              >
                {Object.values(PlantLightExporeType).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* IDEAL LOCATION SELECT */}
            <FormControl>
              <InputLabel>Ideal Location</InputLabel>
              <Select
                label="Ideal Location"
                multiple
                value={formData.idealLocation}
                disabled={!editable}
                onChange={(e) => {
                  const value = e.target.value as string[];
                  setFormData((prev) => ({
                    ...prev,
                    idealLocation: value,
                  }));
                }}
                renderValue={(selected) => selected.join(", ")}
                sx={{ width: "200px" }}
              >
                {Object.values(PlantIdealLocationType).map((val) => (
                  <MenuItem key={val} value={val}>
                    {formData.idealLocation.includes(val) ? "✓ " : ""}
                    {val}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack
            spacing={6}
            direction="row"
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            {/* MAINTENANCE SELECT */}
            <FormControl>
              <InputLabel>Maintenance</InputLabel>
              <Select
                label="Maintenance"
                value={formData.maintenance}
                disabled={!editable}
                onChange={handleMaintenanceChange}
                sx={{
                  width: "200px",
                }}
              >
                {Object.values(PlantMaintenanceType).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* WATERING SELECT */}
            <FormControl>
              <InputLabel>Watering</InputLabel>
              <Select
                label="Watering"
                value={formData.watering}
                disabled={!editable}
                onChange={handleWateringChange}
                sx={{
                  width: "200px",
                }}
              >
                {Object.values(PlantWateringType).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {/* TAGS */}
          <FormControl>
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              label="Tags"
              value={formData.tags}
              disabled={!editable}
              onChange={handleTagsChange}
              sx={{ width: "200px" }}
              renderValue={(selected) => selected.join(", ")}
            >
              {Object.values(PlantTagsType).map((tagValue) => (
                <MenuItem key={tagValue} value={tagValue}>
                  <ListItemText primary={tagValue} />
                </MenuItem>
              ))}
            </Select>
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
                error={!!dimensionErrors.height}
                helperText={dimensionErrors.height}
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
                error={!!dimensionErrors.length}
                helperText={dimensionErrors.length}
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
                error={!!dimensionErrors.width}
                helperText={dimensionErrors.width}
              />
            </Box>
          </Box>

          {error && (
            <Typography variant="subtitle1" color="error">
              {error}
            </Typography>
          )}

          {/* Editable Action Buttons */}
          {editable && (
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignSelf: "flex-end", mb: "24px" }}
            >
              <Button
                variant="text"
                color="primary"
                onClick={() => setEditable(false)}
                sx={{ width: "200px", height: "60px", alignSelf: "flex-end" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
                sx={{ width: "200px", height: "60px", alignSelf: "flex-end" }}
              >
                {loading ? "Submitting" : "Submit"}
              </Button>
            </Stack>
          )}

          {/* Non-editable Button */}
          {!editable && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditable(true)}
              disabled={loading}
              sx={{
                width: "400px",
                height: "60px",
                alignSelf: "flex-end",
                mb: "24px",
              }}
            >
              Edit
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
