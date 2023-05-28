import React, {useContext, useEffect, useState} from "react";
import {Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View} from "react-native";
import {ParamListBase, useNavigation, useRoute} from "@react-navigation/native";
import * as Yup from "yup";
import Background from "src/components/Background";
import Header from "src/components/Header";
import StepIndicator from "react-native-step-indicator";
import Button from "src/components/Button";
import {useTheme} from "styled-components";
import {api} from "src/configs/api";
import {
    Divider,
    DropdownWrapper,
    HourAndMinuteInput,
    HourAndMinuteLabel,
    HourAndMinuteWrapper
} from "src/screens/Volunteers/NewVolunteers/StepTwoNewVolunteers/styles";
import Dropdown, {IItems} from "src/components/Dropdown";
import SimpleInput from "src/components/SimpleInput";
import DateTimePicker from "@react-native-community/datetimepicker";

import {StepIndicatorShelterVisitContext} from "src/hooks/stepIndicator";
import {ScreenName} from "src/routes/types";
import {ShelterVisitProps} from "src/screens/ShelterVisit/types";
import {RFValue} from "react-native-responsive-fontsize";
import {StepIndicatorStyles} from "src/screens/Volunteers/NewVolunteers/StepOneNewVolunteers/types";
import {DrawerNavigationProp} from "@react-navigation/drawer";

type INavigation = DrawerNavigationProp<ParamListBase, 'stepTwoNewSchedules'>
const StepTwoNewSchedules = () => {
    const ios = Platform.OS === 'ios';
    const {colors} = useTheme();
    const navigation = useNavigation<INavigation>();
    const route = useRoute();
    const savedVisit = route.params as ShelterVisitProps;
    const {currentStep, setCurrentStep} = useContext(StepIndicatorShelterVisitContext);

    const [loading, setLoading] = useState(false);
    const [inputValues, setInputValues] = useState<ShelterVisitProps>(savedVisit || {});
    const [animalsItems, setAnimalsItems] = useState<IItems>();

    const handleInputChange = (name: string, value: any) => {
        setInputValues((prevState) => ({...prevState, [name]: value}));
    };

    const padNumbers = (input: number) => {
        if (input === null || input === undefined) {
            return '';
        }
        const inputValue = input.toString();
        return inputValue.length === 1 ? `0${inputValue}` : inputValue;
    };

    const handleSave = async () => {
        try {
            const newScheduleSchema = Yup.lazy(() =>
                Yup.object().shape({
                    animalId: Yup.number().required('Select at least 1 Animal')
                }).concat(
                    Yup.object().shape({
                        date: Yup.string().max(60).required('Day is required')
                    })
                ).concat(
                    Yup.object().shape({
                        hour: Yup.number().lessThan(25).required('Hour is required')
                    })
                ).concat(
                    Yup.object().shape({
                        minute: Yup.number().max(60).required('Minute is required')
                    }))
            )

            await newScheduleSchema.validate(inputValues);

            setLoading(true);

            if (inputValues.id) {
                await api.put(`/shelter-visits/${inputValues.id}`, {...inputValues});
            } else {
                await api.post('/shelter-visits', {...inputValues});
            }

            Alert.alert('Saved successfully');
            setCurrentStep(0);
            navigation.navigate(ScreenName.SHELTER_VISIT);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Error', error.message);
            } else {
                console.log(error);
                Alert.alert('Error', 'Unable to register');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleStepBack = () => {
        setCurrentStep(0);
        navigation.goBack();
    };

    const DateTimePickerWrapper = ({label, stateName}) => {
        const [showDatePicker, setShowDatePicker] = useState(false);

        const showDatePickerHandler = () => {
            setShowDatePicker(true);
        };

        const handleDateChange = (event, selectedDate: Date) => {
            if (selectedDate) {
                handleInputChange(stateName, selectedDate);
            }
        };

        return (
            <>
                <TouchableOpacity onPress={showDatePickerHandler}>
                    <View pointerEvents="none">
                        <SimpleInput
                            key={stateName}
                            label={label}
                            value={inputValues[stateName]?.toISOString().substring(0, 10) || ''}
                            editable={false}
                        />
                    </View>
                </TouchableOpacity>
                {showDatePicker && (
                    <View>
                        <DateTimePicker
                            key={stateName}
                            value={inputValues[stateName] || new Date()}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            minimumDate={new Date()}
                            onChange={handleDateChange}
                        />
                    </View>
                )}
            </>
        );
    };

    useEffect(() => {
        const fetchAvailableAnimals = async () => {
            try {
                const result = await api.get('/animals/names-ids');
                setAnimalsItems(result.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAvailableAnimals();
    }, []);

    return (
        <Background
            style={{height: "80%"}}
            headerChildren={
                <Header title="Shelter visit"/>
            }
        >
            <KeyboardAvoidingView
                behavior={ios ? "position" : undefined}
                keyboardVerticalOffset={ios ? 20 : 0}
            >
                <ScrollView
                    style={{
                        height: ios ? '88%' : '89%',
                        marginBottom: ios ? -30 : 10,
                    }}
                >
                    <View style={{marginBottom: ios ? RFValue(20) : RFValue(30)}}>
                        <StepIndicator
                            customStyles={StepIndicatorStyles}
                            currentPosition={currentStep}
                            labels={['Basic Info', 'Schedule visit']}
                            stepCount={2}
                        />
                    </View>

                    <View>
                        <DropdownWrapper style={ios && {zIndex: 3}}>
                            <Dropdown
                                zIndex={3 * 1000}
                                zIndexInverse={(1 + 1) * 1000}
                                items={animalsItems ?? [{}]}
                                label="Animal Name"
                                placeholder=""
                                onSelectItem={(item) => handleInputChange('animalId', "value" in item ? item.value : item)}
                                value={inputValues.animalId}
                                searchable={false}
                                mode="BADGE"
                                listMode={ios ? 'SCROLLVIEW' : 'MODAL'}
                                badgeColors={colors.purple_200}
                                badgeDotColors={colors.purple_300}
                                badgeTextStyle={{color: colors.purple_300}}
                            />
                        </DropdownWrapper>

                        <DateTimePickerWrapper label={'Day'} stateName={'date'}/>

                        <View style={{flexDirection: 'row', width: '100%', marginLeft: RFValue(18)}}>
                            <View style={{flexDirection: 'column', marginTop: RFValue(10)}}>
                                <HourAndMinuteLabel>Visit hour</HourAndMinuteLabel>
                                <View style={{flexDirection: 'row', marginTop: RFValue(6)}}>
                                    <HourAndMinuteWrapper>
                                        <HourAndMinuteInput
                                            key='startTimeHour'
                                            keyboardType="numeric"
                                            maxLength={2}
                                            onChangeText={(value) => handleInputChange('hour', value)}
                                            value={padNumbers(inputValues?.hour)}
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
                                            onChangeText={(value) => handleInputChange('minute', value)}
                                            value={padNumbers(inputValues?.minute)}
                                        />
                                    </HourAndMinuteWrapper>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={{flexDirection: 'row', position: 'absolute', bottom: 0, width: '100%'}}>
                <Button
                    text="Back"
                    onPress={handleStepBack}
                    loading={loading}
                    style={{position: 'relative'}}
                    isTwoButtons
                    isLeftButton
                />
                <Button
                    text="Save"
                    onPress={handleSave}
                    loading={loading}
                    style={{position: 'relative'}}
                    isTwoButtons
                />
            </View>
        </Background>
    );
};

export default StepTwoNewSchedules;
