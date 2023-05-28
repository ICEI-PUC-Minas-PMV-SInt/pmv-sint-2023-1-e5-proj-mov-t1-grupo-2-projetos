import theme from 'src/styles/theme';

export const GENDER_ITEMS = [
    {
        label: 'Female',
        value: 'FEMALE',
    },
    {
        label: 'Male',
        value: 'MALE',
    },
];

export const READY_TO_BE_ADOPTED = [
    {
        label: 'Yes',
        value: true,
    },
    {
        label: 'No',
        value: false,
    },
];


export const HEALTH_ITEMS = [
    {label: 'Vaccinated', value: 'vaccinated'},
    {label: 'Castrated', value: 'castrated'},
    {label: 'Wormed', value: 'wormed'},
];

export enum STEPS {
    FIRST_STEP = 0,
    SECOND_STEP = 1,
    THIRD_STEP = 2,
    FOURTH_STEP = 3
}

export const stepIndicatorCustomStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: theme.colors.purple_300,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: theme.colors.purple_300,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: theme.colors.purple_300,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: theme.colors.purple_300,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: theme.colors.purple_300,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: theme.colors.gray_300,
    labelSize: 13,
    currentStepLabelColor: theme.colors.purple_300,
    labelFontFamily: theme.fonts.Poppins_Regular
};
