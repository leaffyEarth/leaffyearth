'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack
} from '@mui/material';
import { api } from '@/services/api';
import { PlantResponseData } from '@/types/response.types';
import EditablePlantImageCarousel from '@/components/plantImageCarousel/editablePlantImageCarousel';

interface PlantParams {
  slug: string;
}

interface PlantDetailPageProps {
  params: Promise<PlantParams>;
}



export default function PlantDetailPage({ params }: PlantDetailPageProps) {
  // Plant details
  const [plantId, setPlantId] = useState<string | null>(null);
  const [plantDetails, setPlantDetails] = useState<PlantResponseData | null>(null);

  // Multi-file upload
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    getPlantProp();
  }, []);


  useEffect(() => {
    if (plantId) {
      getPlantDetails();
    }
  }, [plantId]);


  const getPlantProp = async (): Promise<void> => {
    const { slug } = await params;
    setPlantId(slug.toUpperCase());
  };


  const getPlantDetails = async (): Promise<void> => {
    if (!plantId) return;

    try {
      const response = await api.get<PlantResponseData>(`/plants/${plantId}`);
      setPlantDetails(response.data);
    } catch (error) {
      console.error('Error fetching plant details:', error);
    }
  };



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);

      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };


  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };



  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles(files);

      // Generate preview URLs
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };


  const handleImageUpload = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!selectedFiles.length || !plantId) return;

    setLoading(true);

    try {

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);

        await api.post(`/plants/${plantId}/upload-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      await getPlantDetails();

      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const openFileDialog = (): void => {
    document.getElementById('input-file-upload')?.click();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '36px',
        pb: 5
      }}
    >

      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          {plantDetails?.name} ({plantDetails?.sku})
        </Typography>
      </Box>

      <Stack
        spacing={5}
        direction="row"
        useFlexGap
        sx={{ flexWrap: 'wrap' }}
      >
        <Box
          sx={{
            width: '40%'
          }}
        >
          {plantDetails && <EditablePlantImageCarousel plant={plantDetails} onChange={getPlantDetails} />}
        </Box>

        <Box
          component="form"
          onSubmit={handleImageUpload}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >

          <input
            id="input-file-upload"
            type="file"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />


          <Box
            onClick={openFileDialog}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            sx={{
              border: '2px dashed #ccc',
              borderRadius: '4px',
              padding: '24px',
              textAlign: 'center',
              cursor: 'pointer',
              ...(dragActive && {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderColor: 'primary.main',
              }),
            }}
          >
            <Typography variant="body1" sx={{ mb: 1 }}>
              Drag & drop your images here
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or click to browse
            </Typography>
          </Box>


          {previewUrls.length > 0 && (
            <Box mt={2}>
              <Stack direction='row' spacing={2} flexWrap="wrap">
                {previewUrls.map((url, index) => (
                  <Box
                    key={url}
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >

                    <Box
                      component="img"
                      src={url}
                      alt={`preview-${index}`}
                      sx={{
                        width: '150px',
                        borderRadius: '4px',
                        marginTop: 1,
                        objectFit: 'cover',
                      }}
                    />
                    <Typography variant="caption" gutterBottom>
                      {selectedFiles[index]?.name}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}


          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!selectedFiles.length || loading}
            sx={{
              alignSelf: 'flex-end',
              width: '150px',
              height: '50px',
            }}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
        </Box>

      </Stack>





    </Box>
  );
}
