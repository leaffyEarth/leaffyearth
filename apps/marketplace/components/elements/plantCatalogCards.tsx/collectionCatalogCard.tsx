import theme from "../../../styles/theme/theme";
import { catalogPlantSeries, Plant } from "../../../types/plants.types";
import { Box, Button, Typography, useTheme } from "@mui/material";
import AddToCartButton from "../Buttons/addToCartButton";
import Link from "next/link";
import { capitalizeWords } from "../../../utils/wordFormatting";


export default function PlantCollectionCatalogCard({ Plant }: { Plant?: catalogPlantSeries }) {

    if (!Plant) {
        return <div>No Plant Found</div>
    }


    let plantDetailPath = Plant._id.replace(/\s+/g, '-');

    let thumbnail = ''
    let price = 0

    if (Plant.plants.length !== 0) {
        Plant.plants.forEach(plantSku => {

            if (plantSku.size == 'extra-large') {
                if (plantSku.thumbnail) thumbnail = plantSku.thumbnail
                else if (plantSku.images.length !== 0) thumbnail = plantSku.images[0]
            } else if (plantSku.size == 'large' && !thumbnail) {
                if (plantSku.thumbnail) thumbnail = plantSku.thumbnail
                else if (plantSku.images.length !== 0) thumbnail = plantSku.images[0]
            } else if (plantSku.size == 'medium' && !thumbnail) {
                if (plantSku.thumbnail) thumbnail = plantSku.thumbnail
                else if (plantSku.images.length !== 0) thumbnail = plantSku.images[0]
            } else if (plantSku.size == 'small' && !thumbnail) {
                if (plantSku.thumbnail) thumbnail = plantSku.thumbnail
                else if (plantSku.images.length !== 0) thumbnail = plantSku.images[0]
            }

            if (plantSku.size == 'small') {
                price = plantSku.price
            } else if (plantSku.size == 'medium' && !price) {
                price = plantSku.price
            } else if (plantSku.size == 'large' && !price) {
                price = plantSku.price
            } else if (plantSku.size == 'extra-large' && !price) {
                price = plantSku.price
            }

        });
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                position: 'relative',
            }}
        >

            <Link href={`/plants/${plantDetailPath}`}>
                <Box
                    className="productImageContainer"
                    sx={{
                        aspectRatio: '4/5',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        backgroundColor: theme.palette.secondary.light,
                        borderRadius: '15px'
                    }}
                >
                    {
                        thumbnail &&
                        <img
                            src={thumbnail}
                            style={{
                                height: '100%'
                            }}
                        />
                    }

                </Box>

                <Box
                    className="productDetailsContainer"
                    sx={{
                        display: "flex",
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1px'
                    }}
                >
                    <Typography variant="h6">
                        {capitalizeWords(Plant._id)}
                    </Typography>


                    <Typography variant="subtitle1" color='primary' sx={{ fontWeight: 'bold' }}>
                        ₹ {price}
                    </Typography>

                </Box>


            </Link>

            <AddToCartButton />

        </Box>
    )
}