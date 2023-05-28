import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ScreenName } from 'src/routes/types';
import Login from 'src/screens/Login';

const {Navigator, Screen} = createStackNavigator ();

const AuthRoutes = () => {
    return (
        <Navigator screenOptions={({headerShown: false})} initialRouteName={ScreenName.LOGIN}>
            <Screen
                name={ScreenName.LOGIN}
                component={Login}
            />
        </Navigator>
    );
};

export default AuthRoutes;
