import { Box, Stack, Typography } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { useEffect, useState } from 'react';
import DeleteImageDialog from '@/app/dashboard/planters/[slug]/upload-image/components/deleteImageDialog';
import { generateRandomString } from '@/utils/generateRandomString';
import { Planter } from '@/types/planters.types';



const EditablePlanterImageCarousel = ({ planter, onChange }: { planter: Planter, onChange: () => void; }) => {
    const [selectedImage, setSelectedImage] = useState<string>(planter.images[0])
    const [page, setPage] = useState<number>(0)


    return (
        <Box
            sx={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px'
            }}
        >

            <Stack
                key={generateRandomString(4)}
                direction="row"
                spacing={2}
                // width='500px'
                overflow='auto'
            >
                <ChevronLeftOutlinedIcon
                    sx={{ alignSelf: 'center' }}
                    onClick={() => setPage((p) => {
                        if (p != 0) return p - 1
                        else return Math.floor(planter.images.length / 4)
                    }
                    )}
                />
                {
                    planter?.images?.filter((fruit, index) => {
                        let startIndex = page * 4
                        let endIndex = startIndex + 4
                        const arraySize = planter?.images?.length

                        if (startIndex > arraySize - 1) {
                            setPage(0)
                        }
                        return (
                            index >= startIndex && index < endIndex
                        )


                    })?.map((imageUrl, index) => {
                        return (
                            <Box
                                key={imageUrl}
                                sx={{
                                    overflow: 'hidden',
                                    width: '100px',
                                    minWidth: '100px',
                                    aspectRatio: '4/5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={
                                    () => {
                                        setSelectedImage(imageUrl)
                                    }
                                }
                            >
                                <img
                                    src={imageUrl}
                                    style={{
                                        width: '140px',
                                    }}
                                />
                            </Box>
                        )
                    })
                }

                {
                    planter.images.length == 0 &&
                    <Typography variant='subtitle1' >
                        No Images
                    </Typography>
                }

                <ChevronRightOutlinedIcon
                    sx={{ alignSelf: 'center' }}
                    onClick={() => setPage((p) => p + 1)}
                />

            </Stack>

            <Stack>
                {selectedImage &&
                    <Box sx={{ alignSelf: 'flex-end' }} >
                        <DeleteImageDialog planterDetails={planter} imageUrl={selectedImage} onCreated={onChange} />
                    </Box>
                }
                <Box
                    sx={{
                        overflow: 'hidden',
                        width: '100%',
                        maxHeight: '700px',
                        aspectRatio: '4/5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <img
                        src={selectedImage}
                        style={{
                            height: '100%'
                        }}
                    />
                </Box>
            </Stack>


        </Box>
    )
}


export default EditablePlanterImageCarousel;