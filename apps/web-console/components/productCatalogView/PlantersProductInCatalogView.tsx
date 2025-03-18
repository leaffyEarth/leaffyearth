import DeletePlanterDialog from "@/app/dashboard/planters/components/deletePlanterDialog";
import DeletePlantDialog from "@/app/dashboard/plants/components/deletePlantDialog";
import { Planter } from "@/types/planters.types";
import { Box, Typography, useTheme } from "@mui/material";
import { useRouter } from 'next/navigation';


export default function PlantersProductInCatalog({ Planter, onChange }: { Planter: Planter, onChange: () => void; }) {
    const router = useRouter();

    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                aspectRatio: '3/4',
                width: '100%',
                height: '100%',
                gap: '6px',
                position: 'relative'
            }}
        >

            <DeletePlanterDialog planterDetails={Planter} onChange={onChange} />


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
                onClick={() => router.push(`/dashboard/planters/${Planter._id}`.toLowerCase())}
            >
                {
                    Planter.images.length != 0 &&
                    <img
                        src={Planter.images[0]}
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
                    {Planter.name}
                </Typography>


                <Typography variant="subtitle1" color='primary' sx={{ fontWeight: 'bold' }}>
                    ₹ {Planter.price}
                </Typography>
            </Box>

        </Box>
    )
}