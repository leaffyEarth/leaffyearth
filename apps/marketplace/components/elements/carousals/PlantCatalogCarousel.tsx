'use client';

import { useState } from 'react';
import {
    Box,
    IconButton,
    Stack,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Plant } from '../../../types/plants.types';
import PlantHomeCatalogCards from '../plantCatalogCards.tsx/plantHomeCatalogCards';

interface CarouselProps {
    plants: Plant[];
}

export default function Carousel({ plants }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));

    
    let cardsToShow = 3;
    let cardWidth = 300;

    if (isXs) {
        cardsToShow = 1;
        cardWidth = 280;
    } else if (isSm) {
        cardsToShow = 2;
        cardWidth = 280;
    } else if (isMd) {
        cardsToShow = 3;
        cardWidth = 280;
    } else if (isLg) {
        cardsToShow = 4;
        cardWidth = 350;
    }

    const containerWidth = cardsToShow * cardWidth;

    function handleNext() {
        if (currentIndex + cardsToShow < plants.length) {
            setCurrentIndex((prev) => prev + 1);
        }
    }

    function handlePrev() {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
        >

            <ArrowBackIosNewIcon
                onClick={handlePrev}
                sx={{
                    display: plants.length < 5 ? 'none' : 'block',
                    color: currentIndex === 0 ? 'grey' : 'black',
                    cursor: currentIndex === 0 ? 'default' : 'pointer',
                }}
            />
            <Box sx={{ width: containerWidth, overflow: 'hidden' }}>
                <Box
                    sx={{
                        display: 'flex',
                        transition: 'transform 0.5s ease',
                        transform: `translateX(-${currentIndex * cardWidth}px)`,
                    }}
                >
                    {plants.map((plant) => (
                        <Box
                            key={plant._id}
                            sx={{
                                width: cardWidth,
                                flexShrink: 0,
                            }}
                        >
                            <PlantHomeCatalogCards Plant={plant} />
                        </Box>
                    ))}
                </Box>
            </Box>

            <ArrowForwardIosIcon
                onClick={handleNext}
                sx={{
                    display: plants.length < 5 ? 'none' : 'block',
                    color: currentIndex + cardsToShow >= plants.length ? 'grey' : 'black',
                    cursor: currentIndex + cardsToShow >= plants.length ? 'default' : 'pointer',
                }}
            />
        </Box>
    );
}
