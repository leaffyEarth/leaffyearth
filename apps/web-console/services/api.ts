// src/services/api.ts
import axios from "axios";
import { parseCookies } from "nookies"; 

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_BASE_URL,
  withCredentials: true,
});

// api.interceptors.request.use(
//   (config: any) => {
//       const cookies = parseCookies();
//       const token = cookies.token;

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     return config;
//   },
//   (error: any) => Promise.reject(error),
// );
