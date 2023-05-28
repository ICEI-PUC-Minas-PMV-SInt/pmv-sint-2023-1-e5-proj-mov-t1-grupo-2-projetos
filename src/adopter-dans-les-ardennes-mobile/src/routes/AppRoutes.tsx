import {createStackNavigator} from '@react-navigation/stack';
import {ScreenName} from 'src/routes/types';

import Animals from 'src/screens/Animals/List';
import Home from 'src/screens/Home';
import volunteers from "src/screens/Volunteers";
import {StepOneNewVolunteers} from "src/screens/Volunteers/NewVolunteers/StepOneNewVolunteers";
import StepTwoNewVolunteers from "src/screens/Volunteers/NewVolunteers/StepTwoNewVolunteers";
import Register from "src/screens/Animals/Register";
import ShelterVisit from "src/screens/ShelterVisit";
import StepOneNewSchedules from "src/screens/ShelterVisit/NewSchedules/StepOneNewSchedules";
import StepTwoNewSchedules from "src/screens/ShelterVisit/NewSchedules/StepTwoNewSchedules";

const {Navigator, Screen} = createStackNavigator();

export function AppRoutes() {

    return (
        <Navigator
            screenOptions={() => ({
                headerShown: false,
                gestureEnabled: true
            })}
            initialRouteName="Home">
            <Screen name={ScreenName.HOME} component={Home}/>
            <Screen name={ScreenName.ANIMALS} component={Animals}/>
            <Screen name={ScreenName.REGISTER} component={Register}/>
            <Screen name={ScreenName.VOLUNTEERS} component={volunteers}/>
            <Screen name={ScreenName.STEP_ONE_NEW_VOLUNTEERS} component={StepOneNewVolunteers}/>
            <Screen name={ScreenName.STEP_TWO_VOLUNTEERS} component={StepTwoNewVolunteers}/>
            <Screen name={ScreenName.SHELTER_VISIT} component={ShelterVisit}/>
            <Screen name={ScreenName.STEP_ONE_NEW_SCHEDULES} component={StepOneNewSchedules}/>
            <Screen name={ScreenName.STEP_TWO_NEW_SCHEDULES} component={StepTwoNewSchedules}/>
        </Navigator>
    );
}
