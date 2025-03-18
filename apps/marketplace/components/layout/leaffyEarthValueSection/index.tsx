import theme from '../../../styles/theme/theme';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image'

// icons



export function ValueTags({ imageUrl, tagText }: { imageUrl: string, tagText: string }) {
    return (
        <Stack
            sx={{
                gap: '12px',
                alignItems: 'center',
                m:'15px'
                // justifyContent:'center'
            }}
        >
            <Image
                src={imageUrl}
                alt={`${tagText} tag `}
                width={100}
                height={100}
            />

            <Typography variant='body1' sx={{ fontWeight: '400', textAlign: 'center', color: 'black' }}>
                {tagText}
            </Typography>

        </Stack>

    )
}

export default function LeaffyEarthValueSection() {


    return (
        <section
            style={{
                // backgroundColor: theme.palette.secondary.main,
                backgroundColor: '#EFF7EA'
            }}
        >
            <Stack
                direction='row'
                // useFlexGap
                sx={{
                    // must have for sections
                    maxWidth: '1680px',
                    px: 1,
                    margin: 'auto',
                    width: '100%',
                    py: 12,
                    justifyContent: 'center',
                    gap: { sm: 2, md: 5, lg: 10, xl: 15} ,
                    flexWrap: 'wrap',
                }}
            >

                    <ValueTags imageUrl='https://leaffystorage.blob.core.windows.net/public/fastDeliver.png' tagText='Fast Delivery' />
                    <ValueTags imageUrl='https://leaffystorage.blob.core.windows.net/public/easyReturn.png' tagText='Easy Return' />
                    <ValueTags imageUrl='https://leaffystorage.blob.core.windows.net/public/bestPrices.png' tagText='Best Price' />
                    <ValueTags imageUrl='https://leaffystorage.blob.core.windows.net/public/unrivaledQuality.png' tagText='Unrivaled Quality' />
                    <ValueTags imageUrl='https://leaffystorage.blob.core.windows.net/public/exclusivePlants.png' tagText='Exclusive Plants' />

                </Stack>
        </section>
    );
}
