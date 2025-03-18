import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/features/auth/authSlice';
import { alertsSlice } from '@/features/alerts/alertsSlice';
import { setupInterceptors } from '@/services/apiSetup';
// import { usersSlice } from '../features/users/usersSlice';

export const store = configureStore(
    {
        reducer: {
            auth: authSlice.reducer,
            alert: alertsSlice.reducer
            // users: usersSlice.reducer,
        },
    });
setupInterceptors(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
