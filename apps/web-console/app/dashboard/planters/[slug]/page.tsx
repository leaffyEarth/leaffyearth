"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "@/services/api";
import { PlantResponseData } from "@leaffyearth/utils/src/types/response.types";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useRouter } from "next/navigation";
import PlantersImageCarousel from "@/components/plantersImageCarousel/planterImageCarousel";
import { planterCategoryEnum } from "@leaffyearth/utils";

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
  name: string;
  planterCategory: string;
  planterSeries: string;
  price: string;
  color: Color;
  description: string;
  size: string;
  dimensions: Dimensions;
}

export default function PlantersDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();

  const [planterId, setPlanterId] = useState<string | null>(null);
  const [planterDetails, setPlanterDetails] =
    useState<PlantResponseData | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [planterNameError, setPlanterNameError] = useState<string>("");
  const [planterSeriesError, setPlanterSeriesError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [dimensionErrors, setDimensionErrors] = useState<
    Record<string, string>
  >({
    height: "",
    length: "",
    width: "",
  });

  const [editable, setEditable] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: "", // Ensure name is always a string
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

  useEffect(() => {
    getPlanterProp();
  }, []);

  useEffect(() => {
    if (planterId) getPlanterDetails();
  }, [planterId]);

  // function

  const getPlanterProp = async () => {
    const params = await props.params;
    setPlanterId(params.slug.toUpperCase());
  };

  const getPlanterDetails = async () => {
    try {
      const planterDetails = await api.get(`/planters/${planterId}`);
      setPlanterDetails(planterDetails.data);
      setFormData({
        name: planterDetails.data.name,
        planterCategory: planterDetails.data.planterCategory,
        planterSeries: planterDetails.data.planterSeries,
        description: planterDetails.data.description,
        price: planterDetails.data.price.toString(),
        size: planterDetails.data.size,
        color: planterDetails.data.color,
        dimensions: {
          height: planterDetails.data.dimensions.height.toString(),
          length: planterDetails.data.dimensions.length.toString(),
          width: planterDetails.data.dimensions.width.toString(),
        },
      });
    } catch (error) {
      console.log("error in fetching the plant", error);
    }
  };

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

  const handleSizeChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      size: e.target.value,
    }));
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
      !formData.name.trim() ||
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
      setError("");
      setLoading(true);
      await api.patch(`planters/${planterDetails?._id}`, {
        name: formData.name,
        planterCategoryEnum: formData.planterSeries,
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
      getPlanterDetails();
      setEditable(false);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message || "Failed to save plant");
      setLoading(false);
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
          sx={{ flexWrap: "wrap", mb: "24px" }}
        >
          <Stack
            spacing={2}
            sx={{
              width: "40%",
            }}
          >
            {planterDetails && (
              <PlantersImageCarousel planter={planterDetails} />
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push(`${planterDetails?._id}/upload-image`)}
              sx={{ width: "200px", height: "50px", alignSelf: "flex-end" }}
            >
              Add or Edit Image
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
            {/* NAME */}
            <TextField
              name="name"
              label="Planter Name"
              variant="standard"
              value={formData.name}
              disabled={!editable}
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
                disabled={!editable}
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
            <TextField
              name="planterSeries"
              placeholder="Planter Series"
              disabled={!editable}
              variant="standard"
              value={formData.planterSeries}
              onChange={handleInputChangePlanterSeries}
              required
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

            {/* PRICE */}
            <TextField
              name="price"
              label="Price"
              value={formData.price}
              disabled={!editable}
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
                  disabled={!editable}
                  value={formData.color.name}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const isValid = /^[A-Za-z\s]*$/.test(value);
                    if (!isValid) {
                      setError(
                        "Color Name must only contain letters and spaces",
                      );
                    } else {
                      setError("");
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
                  disabled={!editable}
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
    </>
  );
}
