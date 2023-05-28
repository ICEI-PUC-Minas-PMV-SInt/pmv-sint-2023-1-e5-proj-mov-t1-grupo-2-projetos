import {IVolunteers} from "src/screens/Volunteers/types";
import NewSchedules from "src/screens/ShelterVisit/NewSchedules/StepOneNewSchedules";
import {ShelterVisitProps} from "src/screens/ShelterVisit/types";

export const ScreenName = {
    HOME: 'home',
    ANIMALS: 'animals',
    VOLUNTEERS: 'volunteers',
    ADOPTERS: 'adopters',
    SHELTER_VISIT: 'shelterVisit',
    PROCESSES: 'processes',
    REGISTER: 'register',
    LOGIN: 'login',
    NEW_VOLUNTEERS: 'newVolunteers',
    STEP_ONE_NEW_VOLUNTEERS: 'stepOneNewVolunteers',
    STEP_TWO_VOLUNTEERS: 'stepTwoNewVolunteers',
    STEP_ONE_NEW_SCHEDULES: 'stepOneNewSchedules',
    STEP_TWO_NEW_SCHEDULES: 'stepTwoNewSchedules'
};


export type RootStackParamList = {
    home: undefined;
    animals: undefined;
    volunteers: undefined;
    adopters: undefined;
    shelterVisit: undefined;
    processes: undefined;
    register: undefined;
    newVolunteers: undefined;
    stepOneNewVolunteers: IVolunteers;
    stepTwoNewVolunteers: IVolunteers;
    StepOneNewSchedules: ShelterVisitProps;
    StepTwoNewSchedules: ShelterVisitProps;
}
