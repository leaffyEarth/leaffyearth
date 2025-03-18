import { Button, Typography } from "@mui/material";


export default function AddToCartButton() {
    return (
        <Button variant="contained"
            sx={{
                width: '80%',
                alignSelf: 'center',
                m: 1,
                borderRadius: '15px',
            }}
        >

            <Typography variant="subtitle2">
                Add To Cart
            </Typography>
        </Button>
    )
}