import React, { useEffect, useState } from 'react';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';

import LoadingAnimation from 'src/components/LoadingAnimation';
import AppProvider from 'src/hooks';
import { Routes } from 'src/routes';
import theme from 'src/styles/theme';

import { ThemeProvider } from 'styled-components';
import {Platform} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {

    const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
    });

    const onAnimationFinish = () => {
        setAppIsReady (true);
    };

    useEffect (() => {
        if (fontsLoaded && !appIsReady) {
            const timeoutDuration = 20000;

            const timeoutId = setTimeout (() => {
                onAnimationFinish ();
            }, timeoutDuration);

            return () => {
                clearTimeout (timeoutId);
            };
        }
    }, [fontsLoaded, appIsReady]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== ImagePicker.PermissionStatus.GRANTED) {
                    alert('Sorry, we need camera roll permissions to let you choose the animal picture!');
                }
            }
        })();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <AppProvider>
                {appIsReady ? <Routes/> : <LoadingAnimation onAnimationFinish={onAnimationFinish}/>}
            </AppProvider>
        </ThemeProvider>
    );
}
