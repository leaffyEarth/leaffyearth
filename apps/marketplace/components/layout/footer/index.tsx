import theme from "../../../styles/theme/theme";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";


export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer style={{ backgroundColor: theme.palette.primary.main }} >
            <Stack
                spacing={1}
                sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 2
                }}
            >
                <Typography variant="subtitle1" color="white" sx={{ alignSelf: 'center' }}>
                    Follow Us On
                </Typography>

                <Stack
                    spacing={3}
                    direction='row'
                >


                    <Image
                        src='https://leaffystorage.blob.core.windows.net/public/facebook.png'
                        alt='facebook'
                        width={40}
                        height={40}
                    />

                    <Image
                        src='https://leaffystorage.blob.core.windows.net/public/insta.png'
                        alt='instagram'
                        width={40}
                        height={40}
                    />

                    <Image
                        src='https://leaffystorage.blob.core.windows.net/public/pintrest.png'
                        alt='pintrest'
                        width={40}
                        height={40}
                    />
                </Stack>



            </Stack>
            <Stack
                direction='row'
                spacing={9}
                useFlexGap
                sx={{
                    flexWrap: 'wrap',
                    maxWidth: '1680px',
                    px: 1,
                    margin: 'auto',
                    width: '100%',
                    py: 15,
                    pb: 10
                }}
            >

                <Stack
                    sx={{
                        maxWidth: '365px'
                    }}
                >
                    <Typography variant="h5" color="white" sx={{ mb: '15px' }}>
                        Get In Touch
                    </Typography>

                    <Typography variant="subtitle1" color="white" sx={{ mb: '15px', lineHeight: '20px' }}>
                        Address: 1115, LeaffyEarth Corporation, Jabalpur, Madhya Pradesh 481661
                    </Typography>

                    <Typography variant="subtitle1" color="white">
                        Email : support@leaffyearth.com
                    </Typography>

                    <Typography variant="subtitle1" color="white">
                        Call : 09685507362
                    </Typography>

                </Stack>


                <Stack
                    sx={{
                        maxWidth: '365px'
                    }}
                >
                    <Typography variant="h5" color="white" sx={{ mb: '15px' }}>
                        About Us
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        Our Journey
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        Career
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        Contact Us
                    </Typography>
                </Stack>


                <Stack
                    sx={{
                        maxWidth: '365px'
                    }}
                >
                    <Typography variant="h5" color="white" sx={{ mb: '15px' }}>
                        Shop
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        All plants
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        Large Size plants
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        Low Light Plants
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        Air Purifing plants
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        Pots and Planters
                    </Typography>
                </Stack>


                <Stack
                    sx={{
                        maxWidth: '365px'
                    }}
                >
                    <Typography variant="h5" color="white" sx={{ mb: '15px' }}>
                        Get Help
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        FAQ
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        Shipping & Delivery
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        Refunds & Returns
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        Privacy Policy
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        Terms & Conditions
                    </Typography>
                </Stack>



            </Stack>

            <Divider />

            <Stack
                sx={{
                    // backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    px: 2,
                    py: 2,
                }}
            >

                <Typography variant="body2" color="white">
                    All rights reserved © {currentYear}, LeaffyEarth.
                </Typography>
            </Stack>

        </footer >
    )
}