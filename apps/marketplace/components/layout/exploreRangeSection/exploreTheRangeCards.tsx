import theme from '../../../styles/theme/theme';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image'



export default function ExploreTheRangeElements({ Range, imageURL, redirectURL }: { Range: string, imageURL: string, redirectURL: string }) {
    return (
        <Stack
            spacing={2}
            sx={{
                position: 'relative',
                aspectRatio: '6/7',
                width: '200px',
                minWidth: '200px',
                mt: 6,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '12px',
                alignSelf: 'center',
                backgroundColor: theme.palette.primary.main,
            }}
        >
            <Image
                src={imageURL}
                alt={Range}
                width={180}
                height={230}
                style={{
                    position: 'absolute',
                    top: '-60px'
                }}
            />
            <Typography variant='body1'
                color='white'
                sx={{
                    position: 'absolute',
                    bottom: '20px',
                    textAlign: 'center'
                }}
            >
                {Range}
            </Typography>
        </Stack>
    )
}