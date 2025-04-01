"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
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
  Autocomplete,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { planterCategoryEnum } from "@leaffyearth/utils";
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

  const [loading, setLoading] = useState<boolean>();

  const [planterFamilyNames, setPlanterFamilyNames] = useState<string[]>([]);
  const [planterNameError, setPlanterNameError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [dimensionErrors, setDimensionErrors] = useState<Partial<Dimensions>>(
    {},
  );
  const [planterSeriesError, setPlanterSeriesError] = useState<string>("");

  // useEffect(() => {
  //   getAllPlanterFamilies();
  // }, []);

  // const getAllPlanterFamilies = async () => {
  //   try {
  //     const { data } = await api.get("/planters/series");
  //     const familyNames = data.map((item: any) => item._id);
  //     setPlanterFamilyNames(familyNames);
  //   } catch (err) {
  //     console.error("Failed to fetch planter families", err);
  //   }
  // };

  const handleInputChangeName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    const isValid =
      value === "" || /^[A-Za-z]+( [A-Za-z]+)?$/.test(value.trim());
    if (!isValid) {
      setPlanterNameError("Planter Name must contain exactly one space");
    } else {
      setPlanterNameError("");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChangePlanterSeries = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    const isValid =
      !/\s{2,}/.test(value.trim()) &&
      !/^planter\b/i.test(value.trim()) &&
      !/\bplanter\b/i.test(value.trim()) &&
      /^[a-z\s]*$/.test(value.trim());
    if (!isValid) {
      setPlanterSeriesError(
        'Planter Series must not contain continuous spaces, the word "planter" as a prefix or separate word, or any special characters',
      );
    } else {
      setPlanterSeriesError("");
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
      !formData.color.hex ||
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
      setLoading(true);
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
          width: parseInt(formData.dimensions.width, 0),
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
      setLoading(false);

      router.push("/dashboard/planters");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              label="Planter Name"
              variant="standard"
              value={formData.name}
              onChange={handleInputChangeName}
              error={!!planterNameError}
              helperText={planterNameError}
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
              <InputLabel>Planter Category</InputLabel>
              <Select
                name="planterCategory"
                label="Planter Category"
                value={formData.planterCategory}
                onChange={handlePlanterCategoryChange}
                sx={{
                  width: "300px",
                  "& .MuiInputBase-input": {
                    fontSize: 18,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: 18,
                  },
                }}
              >
                {Object.values(planterCategoryEnum).map(
                  (planterSeriesEnumValue) => (
                    <MenuItem
                      key={planterSeriesEnumValue}
                      value={planterSeriesEnumValue}
                    >
                      {planterSeriesEnumValue}
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>

            {/* PLANTER SERIES */}
            <Autocomplete
              freeSolo
              options={planterFamilyNames}
              value={formData.planterSeries}
              onInputChange={(event, newInputValue) => {
                setFormData((prev) => ({
                  ...prev,
                  planterSeries: newInputValue,
                }));
              }}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: 25,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 18,
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Planter Series"
                  variant="standard"
                  required
                  onChange={handleInputChangePlanterSeries}
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: 18,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 18,
                    },
                  }}
                  error={!!planterSeriesError}
                  helperText={planterSeriesError}
                />
              )}
            />

            {/* PRICE */}
            <TextField
              name="price"
              label="Price"
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
                label="Size"
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
                sx={{ display: "flex", gap: "12px", alignItems: "center" }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  name="name"
                  label="Color Name"
                  variant="outlined"
                  value={formData.color.name}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const isValid = /^[A-Za-z\s]*$/.test(value);
                    if (!isValid) {
                      setError(
                        "Color Name must only contain letters and spaces",
                      );
                    } else {
                      setError(undefined);
                    }
                    setFormData((prev) => ({
                      ...prev,
                      color: {
                        ...prev.color,
                        [name]: value,
                      },
                    }));
                  }}
                  required
                  error={!!error}
                  helperText={error}
                  sx={{
                    width: "150px",
                  }}
                />
                <TextField
                  name="hex"
                  label="Hex Code"
                  variant="outlined"
                  type="color"
                  value={formData.color.hex}
                  onChange={handleColorChange}
                  required
                  sx={{
                  width: "150px",
                  }}
                />
                {/* <Box
                  sx={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: formData.color.hex,
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                  }}
                /> */}
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
                  error={!!dimensionErrors.height}
                  helperText={dimensionErrors.height}
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
                  error={!!dimensionErrors.length}
                  helperText={dimensionErrors.length}
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

            {/* SUBMIT BUTTON */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                width: "400px",
                height: "60px",
                alignSelf: "flex-end",
                mb: "24px",
              }}
            >
              {loading ? "Submitting" : "Submit"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
