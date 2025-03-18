"use client"

// icon
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';


export default function MenuDrawer() {
    const [menuPopperOpen, setMenuPopperOpen] = useState<boolean>(false)


    return (
        <>
            <MenuIcon
                fontSize='large'
                onClick={() => setMenuPopperOpen(true)}
                sx={{
                    display: {
                        xs: 'block',
                        sm: 'block',
                        md: 'none',
                        lg: 'none',
                    },
                }}
            />

            
        </>
    )

}