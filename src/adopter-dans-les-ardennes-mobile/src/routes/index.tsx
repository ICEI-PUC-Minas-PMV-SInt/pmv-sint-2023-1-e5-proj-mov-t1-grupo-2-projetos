import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from 'src/hooks/Auth/auth';
import AuthRoutes from 'src/routes/auth.routes';
import DrawerRoutes from 'src/routes/DrawerRoutes';

export function Routes() {
    const {user} = useAuth ();

    return (
        <NavigationContainer>
            {user ? <DrawerRoutes/> : <AuthRoutes/>}
        </NavigationContainer>
    );
}