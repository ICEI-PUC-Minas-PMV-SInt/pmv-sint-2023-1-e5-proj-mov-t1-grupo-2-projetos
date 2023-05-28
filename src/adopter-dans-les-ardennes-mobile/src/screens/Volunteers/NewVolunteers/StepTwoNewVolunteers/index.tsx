import React, {useContext, useEffect, useReducer} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, View} from "react-native";
import StepIndicator from "react-native-step-indicator";
import {RFValue} from "react-native-responsive-fontsize";

import * as Yup from "yup";

import {api} from "src/configs/api";

import Avatar from "src/components/Avatar";
import Button from "src/components/Button";
import Background from "src/components/Background";
import Header from "src/components/Header";
import Dropdown from "src/components/Dropdown";
import SimpleInput from "src/components/SimpleInput";

import {useTheme} from "styled-components";
import {StepIndicatorVolunteersContext} from "src/hooks/stepIndicator";

import {
    StepIndicatorLabels,
    StepIndicatorStyles
} from "src/screens/Volunteers/NewVolunteers/StepOneNewVolunteers/types";

import {
    Content,
    Divider,
    DropdownWrapper,
    HourAndMinuteInput,
    HourAndMinuteLabel,
    HourAndMinuteWrapper
} from "./styles";
import {ScreenName} from "src/routes/types";
import {ImagePickerAsset} from "expo-image-picker";
import {IVolunteers} from "src/screens/Volunteers/types";

const statusItems = [
    {
        label: "Available",
        value: true,
    },
    {
        label: "Unavailable",
        value: false,
    },
];

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const initialState = {
    days: daysOfWeek.map((day) => ({label: day, value: day.toUpperCase()})),
    inputValues: {} as IVolunteers,
    selectDays: undefined,
    loading: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DAYS':
            return {...state, days: action.value};
        case 'SET_INPUT_VALUES':
            return {...state, inputValues: action.value};
        case 'SET_SELECT_DAYS':
            return {...state, selectDays: action.value};
        case 'SET_LOADING':
            return {...state, loading: action.value};
        default:
            throw new Error();
    }
};


const StepTwoNewVolunteers = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {colors} = useTheme();

    const navigation = useNavigation();
    const route = useRoute();

    const {currentStep, setCurrentStep} = useContext(StepIndicatorVolunteersContext);

    const savedVolunteer = route.params as IVolunteers;

    const ios = Platform.OS === 'ios';

    useEffect(() => {
        if (savedVolunteer) {
            dispatch({type: 'SET_INPUT_VALUES', value: {...state.inputValues, ...savedVolunteer}});
        }
    }, [savedVolunteer]);

    const handleSelectDays = (items: [{ label: string, value: string }]) => {
        const values = items.map(item => item.value);
        handleInputChange('days', values)
    };

    const handleInputChange = (name, value) => {
        dispatch({type: 'SET_INPUT_VALUES', value: {...state.inputValues, [name]: value}});
    };
    const handleOnImageSelected = (image: ImagePickerAsset) => {
        handleInputChange('imageBase64', image.base64)
        handleInputChange('imageUrl', image.uri)
    }

    async function handleSave() {
        try {

            const newVolunteersSchema = Yup.lazy(() =>
                Yup.object().shape({
                    days: Yup.array().min(1, 'Select at least 1 day'),
                })
                    .concat(
                        Yup.object().shape({
                            startTimeHour: Yup.number().max(24, 'Please enter a valid start hour (0-24)').required('Start hour is required'),
                        }),
                    )
                    .concat(
                        Yup.object().shape({
                            startTimeMinute: Yup.number().max(60, 'Please enter a valid start minute (0-60)').required('Start minute is required'),
                        }),
                    )
                    .concat(
                        Yup.object().shape({
                            endTimeHour: Yup.number().max(24, 'Please enter a valid end hour (0-24)').required('End hour is required'),
                        }),
                    )
                    .concat(
                        Yup.object().shape({
                            endTimeMinute: Yup.number().max(60, 'Please enter a valid end minute (0-60)').required('End minute is required'),
                        }),
                    )
                    .concat(
                        Yup.object().shape({
                            active: Yup.boolean().required('Status is required'),
                        }),
                    ),
            );

            const data = {...state.inputValues};

            await newVolunteersSchema.validate(data);

            dispatch({type: 'SET_LOADING', value: true})
            await api.post('/volunteers', state.inputValues).then(() => {
                Alert.alert('Saved successfully');
                setCurrentStep(0)
                navigation.navigate(ScreenName.VOLUNTEERS)
            }).catch((error) => {
                console.log(error)
                Alert.alert('Error', 'Unable to register');
            }).finally(
                () => dispatch({type: 'SET_LOADING', value: false})
            );

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('erro', error.message);
            }
        }
    }

    const handleStepBack = () => {
        setCurrentStep(0)
        navigation.goBack()
    }

    const padNumbers = (input: number) => {
        if (input === null || input === undefined) {
            return '';
        }

        const inputValue = input.toString();
        return inputValue.length === 1 ? `0${inputValue}` : inputValue;
    };

    return (
        <Background
            style={{height: "80%"}}
            headerChildren={
                <Header title="Volunteers"/>
            }
        >

            <Content>
                <KeyboardAvoidingView
                    behavior={ios ? "position" : undefined}
                    keyboardVerticalOffset={ios ? 208 : 0}
                >
                    <View style={{marginBottom: 30}}>
                        <StepIndicator
                            customStyles={StepIndicatorStyles}
                            currentPosition={currentStep}
                            labels={StepIndicatorLabels}
                            stepCount={2}
                        />
                    </View>


                    <ScrollView
                        style={{
                            height: ios ? '88%' : '89%',
                            marginBottom: ios ? -30 : 10,

                        }}>

                        <View style={{width: 64, height: 64}}>
                            <Avatar imageURI={state.inputValues?.imageUrl} onImageSelected={handleOnImageSelected}/>
                        </View>
                        <View style={{marginBottom: ios ? RFValue(20) : RFValue(30)}}>
                            <DropdownWrapper style={ios && {zIndex: 3}}>
                                <Dropdown
                                    zIndex={3 * 1000}
                                    zIndexInverse={(1 + 1) * 1000}
                                    items={state.days}
                                    label="Days available"
                                    placeholder=""
                                    onSelectItem={handleSelectDays}
                                    value={state.inputValues.days}
                                    setItems={(value) => dispatch({type: 'SET_DAYS', value})}
                                    searchable={false}
                                    multiple
                                    mode="BADGE"
                                    listMode={ios ? 'SCROLLVIEW' : 'MODAL'}
                                    badgeColors={colors.purple_200}
                                    badgeDotColors={colors.purple_300}
                                    badgeTextStyle={{color: colors.purple_300}}
                                />
                            </DropdownWrapper>

                            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-start', marginLeft: RFValue(18), marginTop: RFValue(8)}}>
                                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                    <HourAndMinuteLabel>Start work time</HourAndMinuteLabel>
                                    <View style={{flexDirection: 'row'}}>
                                        <HourAndMinuteWrapper>
                                            <HourAndMinuteInput
                                                key='startTimeHour'
                                                keyboardType="numeric"
                                                maxLength={2}
                                                onChangeText={(value) => handleInputChange('startTimeHour', value)}
                                                value={padNumbers(state.inputValues?.startTimeHour)}
                                            />
                                        </HourAndMinuteWrapper>
                                        <View style={{alignSelf: 'center'}}>
                                            <Divider>:</Divider>
                                        </View>
                                        <HourAndMinuteWrapper>
                                            <HourAndMinuteInput
                                                key='startTimeMinute'
                                                keyboardType="numeric"
                                                maxLength={2}
                                                onChangeText={(value) => handleInputChange('startTimeMinute', value)}
                                                value={padNumbers(state.inputValues?.startTimeMinute)}
                                            />
                                        </HourAndMinuteWrapper>

                                    </View>
                                </View>
                                <View style={{flexDirection: 'column', alignItems: 'center',marginLeft: RFValue(20)}}>
                                    <HourAndMinuteLabel>Finish work time</HourAndMinuteLabel>
                                    <View style={{flexDirection: 'row'}}>
                                        <HourAndMinuteWrapper >
                                            <HourAndMinuteInput
                                                key='endTimeHour'
                                                keyboardType="numeric"
                                                maxLength={2}
                                                onChangeText={(value) => handleInputChange('endTimeHour', value)}
                                                value={padNumbers(state.inputValues?.endTimeHour)}
                                            />
                                        </HourAndMinuteWrapper>
                                        <View style={{alignSelf: 'center'}}>
                                            <Divider>:</Divider>
                                        </View>
                                        <HourAndMinuteWrapper>
                                            <HourAndMinuteInput
                                                key='endTimeMinute'
                                                keyboardType="numeric"
                                                maxLength={2}
                                                onChangeText={(value) => handleInputChange('endTimeMinute', value)}
                                                value={padNumbers(state.inputValues?.endTimeMinute)}
                                            />
                                        </HourAndMinuteWrapper>
                                    </View>
                                </View>
                            </View>

                            <DropdownWrapper style={ios && {zIndex: 2}}>
                                <Dropdown
                                    zIndex={2 * 1000}
                                    zIndexInverse={(2 + 1) * 1000}
                                    items={statusItems}
                                    label="Status"
                                    placeholder=""
                                    onSelectItem={(item) => handleInputChange('active', item.value)}
                                    value={state.inputValues.active}
                                    searchable={false}
                                />
                            </DropdownWrapper>

                            <SimpleInput
                                label="Notes"
                                value={state.inputValues?.notes}
                                onChangeText={(value) => handleInputChange('notes', value)}
                                multiline
                                numberOfLines={8}
                                style={{height: `${RFValue(106)}px`, textAlignVertical: 'top'}}
                                onSubmitEditing={Keyboard.dismiss}
                            />
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Button
                                text="Back" onPress={handleStepBack}
                                loading={state.loading}
                                style={{position: 'relative'}}
                                isTwoButtons={true}
                                isLeftButton={true}
                            />
                            <Button
                                text="Save" onPress={handleSave}
                                loading={state.loading}
                                style={{position: 'relative'}}
                                isTwoButtons={true}
                            />

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Content>
        </Background>
    );
}

export default StepTwoNewVolunteers;