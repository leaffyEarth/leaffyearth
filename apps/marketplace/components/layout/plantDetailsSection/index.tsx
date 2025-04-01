"use client";

import { useState, useMemo, useEffect } from "react";
import { Box, Stack, Typography, Button, IconButton, Link } from "@mui/material";
import Image from "next/image";
import { catalogInPlant, catalogPlantSeries, GroupedPlanterSeries, GroupedPlanterSeries_planterName, GroupedPlanterSeries_variant, PlantPlanterVarients_colorType, PlantPlanterVarientsType, PlantVarient } from "../../../types/plants.types";
import { capitalizeWords } from "../../../utils/wordFormatting";
import ProductImageCarousel from "../../elements/productImageCarousal";
import { groupPlanterVariants } from "./functions/GroupedSeriesPlanters";
import theme from "../../../styles/theme/theme";
import { decryptVariant, encryptVariant } from "../../../functions/encryptVariant";
import { useRouter, useSearchParams } from 'next/navigation';


interface PlantDetailsProps {
    plantSeries: catalogPlantSeries;
    variant: PlantVarient;
    plantPlanterVarients: PlantPlanterVarientsType[]
}



export default function PlantDetailsSection({ plantSeries, variant, plantPlanterVarients }: PlantDetailsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const validSizes = ["small", "medium", "large", "extra-large"] as const;

    // main
    // const [plantVariant, setPlantVariant] = useState<catalogInPlant>()
    const [selectedPlanter, setSelectedPlanter] = useState<GroupedPlanterSeries_variant>()
    const [selectedSize, setSelectedSize] = useState(
        variant.size || plantSeries.plants[0]?.size
    );
    const [quantity, setQuantity] = useState(1);

    const [selectedPlanterSku, setSelectedPlanterSku] = useState<string | null>(
        variant.planterSku || null
    );

    const [selectedPlanterSeries, setSelectedPlanterSeries] = useState<GroupedPlanterSeries | null>(null)
    const [selectedPlanterName, setSelectedPlanterName] = useState<GroupedPlanterSeries_planterName>()
    const [selectedPlanterColor, setSelectedPlanterColor] = useState<GroupedPlanterSeries_variant>()



    const encString = encryptVariant('small', 'random')

    decryptVariant(encString)
    let groupedPlantSeries: GroupedPlanterSeries[] = []

    // validation size
    if (!selectedSize) {
        return (
            <Box
                sx={{
                    height: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h3">No valid sizes found</Typography>
            </Box>
        );
    }

    // validation size
    if (!validSizes.includes(selectedSize)) {
        return (
            <Box
                sx={{
                    height: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h3">Page Not Found: 404</Typography>
            </Box>
        );
    }

    const plantVariant = useMemo(() => {
        const plant__v = plantSeries.plants.find((plant) => plant.size === selectedSize);
        if (plant__v && selectedPlanter) {
            plant__v.images = [...selectedPlanter.images, ...plant__v.images]
            plant__v.images = [...new Set(plant__v.images)];
        }
        return plant__v
    }, [plantSeries.plants, selectedSize, selectedPlanter]);



    // validation varient
    if (!plantVariant) {
        return (
            <Box
                sx={{
                    height: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h3">No matching plant variant found</Typography>
            </Box>
        );
    }

    if (plantVariant?.planterVariants) {
        groupedPlantSeries = groupPlanterVariants(plantVariant?.planterVariants, plantPlanterVarients)
    }



    useEffect(() => {
        if (selectedPlanterSku) {

            if (plantVariant.planterVariants.map((variant) => variant.planterSku).includes(selectedPlanterSku)) {

                const DefaultPanterVarient = plantPlanterVarients.find((planter) => planter.planterSku === selectedPlanterSku)
                if (DefaultPanterVarient) {
                    const plantGroupedSeries = groupedPlantSeries?.find((planterSeries) => planterSeries.planterSeries === DefaultPanterVarient.planterSeries)
                    if (plantGroupedSeries) {
                        setSelectedPlanterSeries(plantGroupedSeries)
                        const planterName = plantGroupedSeries.planters?.find((planter) => planter.planterName === DefaultPanterVarient.planterName)
                        if (planterName) {
                            setSelectedPlanterName(planterName)
                            const planterColor = planterName.variant?.find((planter) => planter.color === DefaultPanterVarient.color)
                            if (planterColor) {
                                setSelectedPlanterColor(planterColor);
                                setSelectedPlanter(planterColor)
                            }

                        }
                    }
                }

            } else {
                setSelectedPlanterSku(null)
            }
        }
    }, [])




    // functions 

    const handleAddToCart = () => {
        console.log(`Add ${quantity} item(s) of size ${selectedSize} to cart!`);
    };

    return (
        <section>
            <Stack
                direction={"row"}
                useFlexGap
                spacing={1}
                sx={{
                    flexWrap: 'wrap',
                    maxWidth: "1680px",
                    px: 1,
                    margin: "auto",
                    width: "100%",
                    py: 8,
                    justifyContent: { sm: "flex-start", md: "flex-start", lg: "center", xl: "center" },
                }}
            >
                <Box sx={{ width: { sm: "100%", md: "47%", lg: "47%", xl: "47%" }, }}>
                    <ProductImageCarousel product={plantVariant} />
                </Box>

                <Stack spacing={3} sx={{ flexGrow: 1, maxWidth: { sm: "100%", md: "47%", lg: "47%", xl: "47%" }, alignSelf: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 400 }}>
                        {capitalizeWords(plantSeries._id)}
                    </Typography>

                    <Typography>{plantVariant.description}</Typography>

                    {selectedPlanter ?
                        <Typography variant="h4" color="green" sx={{ py: 2 }}>
                            price: ${plantVariant.price + selectedPlanter?.price}
                        </Typography>
                        :
                        <Typography variant="h4" color="green" sx={{ py: 2 }}>
                            price: ${plantVariant.price}
                        </Typography>
                    }

                    {/* Size selection buttons */}
                    <Stack spacing={1} >
                        <Typography> Sizes </Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            useFlexGap
                            sx={{
                                flexWrap: 'wrap',
                            }}
                        >

                            {validSizes.map((size) => {
                                const isAvailable = plantSeries.plants.some((p) => p.size === size);
                                if (!isAvailable) return null;

                                return (
                                    <Button
                                        key={size}
                                        variant={selectedSize === size ? "contained" : "outlined"}
                                        onClick={() => {
                                            setSelectedSize(size);
                                            setSelectedPlanterSeries(null)
                                            setSelectedPlanterName(undefined)
                                            setSelectedPlanterColor(undefined)
                                            setSelectedPlanter(undefined)
                                            setQuantity(1); // Optional: reset quantity on size change

                                            const currentPath = window.location.pathname;
                                            const currentParams = new URLSearchParams(searchParams.toString());
                                            currentParams.set('size', size);
                                            router.push(`${currentPath}?${currentParams.toString()}`);
                                        }}
                                    >
                                        {capitalizeWords(size)}
                                    </Button>
                                );
                            })}
                        </Stack>

                    </Stack>

                    <Stack spacing={1}>
                        <Typography sx={{ py: '10px' }}> Planter Variants </Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            useFlexGap
                            sx={{
                                flexWrap: 'wrap',
                            }}
                        >
                            {groupedPlantSeries?.map((PlantSeries) => {

                                return (
                                    <Button
                                        key={PlantSeries.planterSeries}
                                        variant={selectedPlanterSeries?.planterSeries === PlantSeries.planterSeries ? "contained" : "outlined"}
                                        onClick={() => {
                                            setSelectedPlanterSeries(PlantSeries);
                                            setSelectedPlanterName(undefined)
                                            setSelectedPlanterColor(undefined)
                                            setSelectedPlanter(undefined)
                                            setQuantity(1); // Optional: reset quantity on size change
                                        }}
                                    >
                                        {capitalizeWords(PlantSeries.planterSeries)}
                                    </Button>
                                );
                            })}
                        </Stack>

                        <Stack direction="row" spacing={1}>
                            {selectedPlanterSeries?.planters?.map((planters) => {

                                let planterThumbnail = 'https://leaffystorage.blob.core.windows.net/public/placeholder-planter-thumbnail.png'
                                if (planters?.variant[0]?.thumbnail && planters?.variant[0]?.thumbnail != 'picture') {
                                    planterThumbnail = planters?.variant[0]?.thumbnail
                                }

                                return (
                                    <Stack
                                        useFlexGap
                                        key={planters.planterName}
                                        // variant={selectedPlanterName?.planterName === planters.planterName ? "contained" : "outlined"}
                                        onClick={() => {
                                            setSelectedPlanterName(planters)
                                            setSelectedPlanterColor(planters?.variant[0])
                                            setSelectedPlanter(planters?.variant[0])
                                            setQuantity(1);

                                            const currentPath = window.location.pathname;
                                            console.log("current params", searchParams.toString())
                                            const currentParams = new URLSearchParams(searchParams.toString());
                                            currentParams.set('planterSku', planters?.variant[0].planterSku);
                                            router.push(`${currentPath}?${currentParams.toString()}`);
                                        }}
                                        sx={{
                                            border: selectedPlanterName?.planterName === planters.planterName ? '1px solid' : 'none',
                                            flexWrap: 'wrap',
                                            borderBottom: '1px solid',
                                            borderTop: '1px solid',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '155px',
                                            p: '5px',
                                            borderColor: theme.palette.primary.light,
                                            borderRadius: '5px'
                                        }}
                                    >
                                        <Image
                                            alt='planter thumbnail'
                                            src={planterThumbnail}
                                            width={85}
                                            height={100}
                                        />

                                        {capitalizeWords(planters.planterName)}
                                    </Stack>
                                );
                            })}
                        </Stack>



                    </Stack>
                    <Box>

                        {selectedPlanterName && <Typography sx={{ py: '10px' }}> Planter Color - {selectedPlanter?.color.name} </Typography>}
                        <Stack
                            direction="row"
                            spacing={1}
                            useFlexGap
                            sx={{
                                flexWrap: 'wrap',
                            }}
                        >
                            {selectedPlanterName?.variant?.map((variant) => {

                                return (
                                    <Button
                                        key={variant.planterSku}
                                        variant={selectedPlanterColor?.color?.name === variant.color.name ? "contained" : "outlined"}
                                        onClick={() => {
                                            setSelectedPlanterColor(variant)
                                            setSelectedPlanter(variant)
                                            setQuantity(1);

                                            const currentPath = window.location.pathname;
                                            console.log("current params", searchParams.toString())
                                            const currentParams = new URLSearchParams(searchParams.toString());
                                            currentParams.set('planterSku', variant.planterSku);
                                            router.push(`${currentPath}?${currentParams.toString()}`);
                                        }}
                                        sx={{
                                            backgroundColor: variant.color.hex,
                                            minWidth: '35px',
                                            Width: '35px',
                                            minHeight: '35px',
                                            height: '35px',
                                            borderRadius: '50%'
                                        }}
                                    >
                                    </Button>

                                );
                            })}
                        </Stack>
                    </Box>

                    <Stack direction="column" spacing={2} width="100%" sx={{ py: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button
                                variant="outlined"
                                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                            >
                                -
                            </Button>
                            <Typography sx={{ minWidth: '15px' }} textAlign='center' >{quantity}</Typography>
                            <Button variant="outlined" onClick={() => setQuantity((q) => q + 1)}>
                                +
                            </Button>
                            <Button variant="contained" color="primary" sx={{ width: '100%' }} onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                        </Stack>
                        <Link href={'/checkouts'}>
                            <Button variant="contained" color="secondary" sx={{ height: '50px', width: "100%" }}>
                                Buy Now
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Stack>
        </section>
    );
}
