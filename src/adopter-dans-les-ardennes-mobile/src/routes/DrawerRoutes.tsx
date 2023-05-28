import SideMenu from '../components/SideMenu';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import { AppRoutes } from 'src/routes/AppRoutes';

const SCREEN_WIDTH = Dimensions.get ('window').width;

const {Navigator, Screen} = createDrawerNavigator ();

const DrawerRoutes = () => {


    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                drawerPosition: 'right',
                drawerStyle: {
                    width: SCREEN_WIDTH / 1.15
                },
                drawerType: 'back'
            }}
            drawerContent={() => <SideMenu/>}
            initialRouteName="AppRoutes">
            <Screen name="AppRoutes" component={AppRoutes}/>
        </Navigator>
    );
};

export default DrawerRoutes;
