// src/services/apiSetup.ts
import { AxiosError } from 'axios';
import type { AppDispatch } from '@/store';
import { showAlert } from '@/features/alerts/alertsSlice';
import { api } from './api';

export function setupInterceptors(dispatch: AppDispatch) {
  api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      // Example error handling:
      if (!error.response) {
        dispatch(showAlert({ message: 'Unknown error occurred', severity: 'error' }));
        return Promise.reject(error);
      }

      if (error.response.status >= 400) {
        const message =
          (error.response.data as any)?.message ||
          error.message ||
          'Something went wrong';

        dispatch(showAlert({ message, severity: 'error' }));
      }

      if (error.response?.status === 401) {
        dispatch(showAlert({ message: 'Unauthorized Action', severity: 'error' }));
        window.location.href = '/auth/login';
      }

      return Promise.reject(error);
    },
  );
}
