import { AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from 'src/configs/api';
import { useTheme } from 'styled-components';

export interface Data {
    id: string;
    name: string;
    username: string;
    email: string;
    token: string;
    refreshToken: string;
    roles: string[];
}

interface AuthContextData {
    user: Data | null;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    snackbarProps: {
        isVisible: boolean
        message: string
        color: string
        onDismissSnackBar: () => void
    };
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData> ({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {

    const [data, setData] = useState<Data | null> (null);
    const [snackbarVisible, setSnackbarVisible] = useState (false);
    const [snackbarMessage, setSnackbarMessage] = useState ('');
    const [snackbarColor, setSnackbarColor] = useState ('');

    const {colors} = useTheme ();

    const signIn = useCallback (async (username, password) => {

        await api.post ('/auth/login', {username, password}, {
            headers: {'Content-Type': 'application/json'}
        }).then (async (response) => {
            const data:Data = response.data;
            setData (data);
            await SecureStore.setItemAsync ('data', JSON.stringify (data));
            await SecureStore.setItemAsync ('token', JSON.stringify (data.token));
            await SecureStore.setItemAsync ('refreshToken', JSON.stringify (data.refreshToken));

        }).catch ((error: AxiosError) => {
            if (error.response && error.response.status === 401) {
                setSnackbarMessage ("Invalid credentials. Please try again.");
                setSnackbarColor (colors.red_200);
                setSnackbarVisible (true);
            } else {
                setSnackbarMessage ('Unable to connect to server. Please try again later.');
                setSnackbarColor (colors.red_200);
                setSnackbarVisible (true);
            }
        });

    }, []);

    const onDismissSnackBar = () => setSnackbarVisible (false);

    const signOut = useCallback (async () => {
        setData (null);
        await SecureStore.deleteItemAsync ('data');
        await SecureStore.deleteItemAsync ('token');
        await SecureStore.deleteItemAsync ('refreshToken');
    }, []);

    useEffect (() => {
        const loadUserData = async () => {
            const storedData = await SecureStore.getItemAsync ('data');
            const storedToken = await SecureStore.getItemAsync ('token');
            if (storedData && storedToken) {
                const parsedData = JSON.parse (storedData);
                const parsedToken = JSON.parse(storedToken)
                api.defaults.headers.authorization = `Bearer ${parsedToken}`;
                setData (parsedData);
            }
        };
        loadUserData ();
    });

    const value = useMemo (() => ({
        user: data,
        signIn,
        signOut,
        snackbarProps: {
            isVisible: snackbarVisible,
            message: snackbarMessage,
            color: snackbarColor,
            onDismissSnackBar
        }
    }), [data, signIn, signOut, snackbarColor, snackbarMessage, snackbarVisible]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = (): AuthContextData => {
    return useContext (AuthContext);
};

export { AuthProvider, useAuth };
