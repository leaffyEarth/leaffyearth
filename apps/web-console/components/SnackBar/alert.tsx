'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeAlert } from '@/features/alerts/alertsSlice';
import { Snackbar, Alert } from '@mui/material';

export default function GlobalSnackbar() {
    const dispatch = useAppDispatch();
    const { alerts } = useAppSelector((state) => state.alert);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(alerts.length > 0);
    }, [alerts]);

    const currentAlert = alerts[0];

    const handleClose = () => {
        setOpen(false);
        dispatch(removeAlert());
    };

    if (!currentAlert) return null;

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={handleClose}
                severity={currentAlert.severity}
                variant="filled"
            >
                {currentAlert.message}
            </Alert>
        </Snackbar>
    );
}
