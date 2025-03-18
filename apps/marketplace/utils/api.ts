// src/services/api.ts

import axios, { AxiosError } from 'axios';


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER_BASE_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
});