import { Box, Typography } from "@mui/material";

export default function Error404Component() {
    return (
        <Box
            sx={{
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Typography variant='h3'>
                Page Not Found: 404
            </Typography>
        </Box>
    )
}