import theme from "../../../styles/theme/theme";
import { Plant } from "../../../types/plants.types";
import { Box, Button, Typography, useTheme } from "@mui/material";
import AddToCartButton from "../Buttons/addToCartButton";


export default function PlantHomeCatalogCards({ Plant }: { Plant?: Plant }) {

    if (!Plant) {
        return <div>No Plant Found</div>
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                aspectRatio: '4/5',
                // width: '100%',
                // height: '100%',
                gap: '6px',
                position: 'relative',
                mx: '15px'
            }}
        >


            <Box
                className="productImageContainer"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100px',
                    minWidth: '50px',
                    height: '100%',
                    overflow: 'hidden',
                    backgroundColor: theme.palette.secondary.light,
                    borderRadius: '15px'
                }}
            // onClick={() => router.push(`/dashboard/plants/${Plant._id}`.toLowerCase())}
            >
                {
                    Plant.images.length != 0 &&
                    <img
                        src={Plant.images[0]}
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
                <Typography variant="subtitle1">
                    {Plant.name}
                </Typography>


                <Typography variant="subtitle1" color='primary' sx={{ fontWeight: 'bold' }}>
                    ₹ {Plant.price}
                </Typography>

                <AddToCartButton />

            </Box>

        </Box>
    )
}