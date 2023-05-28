import axios, {AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {REACT_APP_API_URL} from '@env';

const api = axios.create({
    baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use(
    async (config: AxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        const token = await SecureStore.getItemAsync('token');
        if (token && !config.url?.endsWith('login')) {
            const parsedToken = JSON.parse(token);
            config.headers = {
                ...config.headers,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${parsedToken}`
            };
        }
        return config as InternalAxiosRequestConfig;
    },
    (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = await SecureStore.getItemAsync('refreshToken');
                if (refreshToken) {
                    const parsedRefreshToken = JSON.parse(refreshToken);
                    const response = await api.post('/auth/refresh-token', {parsedRefreshToken}, {
                        headers: {'Content-Type': 'application/json'},
                    });
                    const {token, refreshToken: newRefreshToken} = response.data;
                    await SecureStore.setItemAsync('token', token);
                    await SecureStore.setItemAsync('refreshToken', newRefreshToken);
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                    }
                    return api(originalRequest);
                } else {
                    await SecureStore.deleteItemAsync('token');
                    await SecureStore.deleteItemAsync('refreshToken');
                }
            } catch (error) {
                console.error(error);
                await SecureStore.deleteItemAsync('token');
                await SecureStore.deleteItemAsync('refreshToken');
            }
        }
        return Promise.reject(error);
    }
);
/*
if (process.env.NODE_ENV !== 'production') {
    api.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2));
        return request;
    });

    api.interceptors.response.use(response => {
        console.log('Response:', JSON.stringify(response, null, 2));
        return response;
    });
}*/

export {api};