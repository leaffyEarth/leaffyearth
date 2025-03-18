// app/authLoading/layout.tsx
'use client';

import React, { useEffect } from 'react';
import { fetchUserInfo } from '@/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useTheme } from '@mui/material';

export default function AuthLoadingLayout({ children }: { children: React.ReactNode }) {
    const theme = useTheme()
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user, status } = useAppSelector((state) => state.auth);

    useEffect(() => {
        // dispatch(fetchUserInfo());
        const timer = setTimeout(() => {
            dispatch(fetchUserInfo());
        }, 3000);

        return () => clearTimeout(timer);

    }, [dispatch, router]);

    useEffect(() => {

        if (status === "authenticated") {
            router.push('/dashboard');
        } else if (status == "error") {
            router.push('/auth/login');
        }

    }, [status]);


    if (status === 'loading' || status === 'idle') {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: theme.palette.background.default
                }}
            >
                <img src="gif/loading.gif" alt="Loading..." style={{ height: '80px' }} />
            </div>
        )
    }

    return <div>{children}</div>;
}
