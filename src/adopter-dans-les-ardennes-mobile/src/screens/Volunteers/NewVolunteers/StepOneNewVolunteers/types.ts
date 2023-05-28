import theme from "src/styles/theme";

export const StepIndicatorStyles = {
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

export const StepIndicatorLabels = ['Basic Info', 'Additional'];