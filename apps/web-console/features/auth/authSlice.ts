// src/features/auth/authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/services/api';

interface User {
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    status: 'idle' | 'loading' | 'authenticated' | 'error';
    error: string | null;
}


export const fetchUserInfo = createAsyncThunk(
    'auth/fetchUserInfo',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/auth/me');
            return response.data as User;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Failed to fetch user');
        }
    }
);

const initialState: AuthState = {
    user: null,
    status: 'idle',
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
            state.status = action.payload ? 'authenticated' : 'idle';
        },
        logout(state) {
            state.user = null;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.status = 'authenticated';
                state.user = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.status = 'error';
                state.user = null;
                state.error = action.payload as string;
            });
    },
});

export const { setUser, logout } = authSlice.actions;
