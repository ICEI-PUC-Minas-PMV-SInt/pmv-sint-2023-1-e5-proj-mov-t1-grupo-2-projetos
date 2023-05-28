import React, {useContext, useState} from 'react';
import {Alert, Platform, ScrollView, View} from 'react-native';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import * as Yup from 'yup';
import Background from 'src/components/Background';
import Header from 'src/components/Header';
import StepIndicator from 'react-native-step-indicator';
import SimpleInput from 'src/components/SimpleInput';
import Button from 'src/components/Button';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ScreenName} from 'src/routes/types';
import {StepIndicatorShelterVisitContext} from "src/hooks/stepIndicator";
import {ShelterVisitProps} from "src/screens/ShelterVisit/types";
import {StepIndicatorStyles} from "src/screens/Volunteers/NewVolunteers/StepOneNewVolunteers/types";

type INavigation = DrawerNavigationProp<ParamListBase, 'stepOneNewSchedules'>;

const StepOneNewSchedules = () => {

    const {currentStep, setCurrentStep} = useContext(StepIndicatorShelterVisitContext);

    const ios = Platform.OS === 'ios';

    const route = useRoute();
    const navigation = useNavigation<INavigation>();

    const savedVisit = route.params as ShelterVisitProps;

    const [inputValues, setInputValues] = useState(savedVisit || {} as ShelterVisitProps);

    const handleInputChange = (name, value) => {
        setInputValues((prevState) => ({...prevState, [name]: value}));
    };

    const handleContinue = async () => {
        try {
            const newSchedulesSchema = Yup.lazy(() =>
                Yup.object().shape({
                    name: Yup.string().required('Name is required')
                }).concat(
                    Yup.object().shape({
                        phone: Yup.string().required('Phone is required')
                    })
                ).concat(
                    Yup.object().shape({
                        email: Yup.string().email('Invalid e-mail').required('Email is required')
                    })
                ))
            await newSchedulesSchema.validate(inputValues);
            setCurrentStep(1);
            navigation.navigate(ScreenName.STEP_TWO_NEW_SCHEDULES, inputValues);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Error', error.message);
            }
        }
    };

    return (
        <Background style={{height: '80%'}} headerChildren={<Header title="Shelter visit"/>}>
            <ScrollView style={{height: '85%'}}>
                <View style={{marginBottom: ios ? 100 : 160}}>
                    <StepIndicator
                        customStyles={StepIndicatorStyles}
                        currentPosition={currentStep}
                        labels={['Basic Info', 'Schedule visit']}
                        stepCount={2}
                    />

                    <SimpleInput
                        label="Name"
                        value={inputValues?.name}
                        keyboardType="name"
                        maxLength={40}
                        onChangeText={(value) => handleInputChange('name', value)}
                        returnKeyType="close"
                    />

                    <SimpleInput
                        label="Phone"
                        value={inputValues?.phone}
                        keyboardType="numeric"
                        maxLength={20}
                        onChangeText={(value) => handleInputChange('phone', value)}
                        returnKeyType="close"
                    />

                    <SimpleInput
                        label="Email"
                        value={inputValues?.email}
                        keyboardType="email"
                        maxLength={40}
                        onChangeText={(value) => handleInputChange('email', value)}
                        returnKeyType="close"
                    />
                </View>
            </ScrollView>

            <View style={{flexDirection: 'row', position: 'absolute', bottom: 0, width: '100%'}}>
                <Button
                    text="Back"
                    onPress={navigation.goBack}
                    style={{position: 'relative'}}
                    isTwoButtons
                    isLeftButton
                />
                <Button
                    text="Continue"
                    onPress={handleContinue}
                    style={{position: 'relative'}}
                    isTwoButtons
                />
            </View>
        </Background>
    );
};

export default StepOneNewSchedules;
