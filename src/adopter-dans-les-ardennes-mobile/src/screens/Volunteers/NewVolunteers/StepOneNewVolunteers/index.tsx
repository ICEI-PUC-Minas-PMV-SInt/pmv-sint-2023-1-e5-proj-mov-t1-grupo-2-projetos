import React, {useContext, useEffect, useState} from "react";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View
} from "react-native";

import * as Yup from "yup";
import StepIndicator from 'react-native-step-indicator';

import {useNavigation, useRoute} from "@react-navigation/native";
import {StepIndicatorVolunteersContext} from "src/hooks/stepIndicator";

import Background from "src/components/Background";
import Header from "src/components/Header";
import Avatar from "src/components/Avatar";
import Button from "src/components/Button";
import SimpleInput from "src/components/SimpleInput";

import {
    StepIndicatorLabels,
    StepIndicatorStyles
} from "src/screens/Volunteers/NewVolunteers/StepOneNewVolunteers/types";
import {ScreenName} from "src/routes/types";

import {
    Content,
} from "./styles";
import {RFValue} from "react-native-responsive-fontsize";
import {ImagePickerAsset} from "expo-image-picker";
import {IVolunteers} from "src/screens/Volunteers/types";


export const StepOneNewVolunteers = () => {
    const [inputValues, setInputValues] = useState({} as IVolunteers);

    const {currentStep, setCurrentStep} = useContext(StepIndicatorVolunteersContext);

    const ios = Platform.OS === 'ios';

    const navigation = useNavigation()

    const route = useRoute();

    const savedVolunteer = route.params as IVolunteers;

    useEffect(() => {
        if (savedVolunteer) {
            setInputValues(prevInputValues => {
                return {...prevInputValues, ...savedVolunteer};
            });
        }
    }, [savedVolunteer]);

    const handleInputChange = (name, value) => {
        setInputValues((prevState) => ({...prevState, [name]: value}));
    };

    const handleOnImageSelected = (image: ImagePickerAsset) => {
        handleInputChange('imageBase64', image.base64)
        handleInputChange('imageUrl', image.uri)
    }

    async function handleContinue() {
        try {

            const newVolunteersSchema = Yup.lazy(() =>
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
                ).concat(
                    Yup.object().shape({
                        address: Yup.string().required('Address is required')
                    })
                ))
            const data = {...inputValues};

            await newVolunteersSchema.validate(data);
            setCurrentStep(1)
            navigation.navigate(ScreenName.STEP_TWO_VOLUNTEERS, data)

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('erro', error.message);
            }
        }
    }


    return (
        <Background
            style={{height: "80%"}}
            headerChildren={
                <Header title="Volunteers"/>
            }>

            <Content>
                <KeyboardAvoidingView
                    behavior={ios ? "position" : undefined}
                    keyboardVerticalOffset={ios ? 20 : 0}
                >
                    <View style={{marginBottom: 30}}>
                        <StepIndicator
                            customStyles={StepIndicatorStyles}
                            currentPosition={currentStep}
                            labels={StepIndicatorLabels}
                            stepCount={2}
                        />
                    </View>

                    <View style={{width: 64, height: 64}}>
                        <Avatar imageURI={inputValues?.imageUrl} onImageSelected={handleOnImageSelected}/>
                    </View>

                    <ScrollView style={{height: '75%'}}>
                        <View style={{marginBottom: ios ? RFValue(80) : RFValue(30)}}>
                            <SimpleInput
                                label='Name'
                                value={inputValues?.name}
                                keyboardType='name'
                                maxLength={40}
                                onChangeText={(value) => handleInputChange('name', value)}
                                returnKeyType="close"

                            />

                            <SimpleInput
                                label='Phone'
                                value={inputValues?.phone}
                                keyboardType='numeric'
                                maxLength={20}
                                onChangeText={(value) => handleInputChange('phone', value)}
                                returnKeyType="close"
                            />

                            <SimpleInput
                                label='Email'
                                value={inputValues?.email}
                                keyboardType='email'
                                maxLength={40}
                                onChangeText={(value) => handleInputChange('email', value)}
                                returnKeyType="close"
                            />


                            <SimpleInput
                                label='Address'
                                value={inputValues?.address}
                                keyboardType='address'
                                maxLength={50}
                                onChangeText={(value) => handleInputChange('address', value)}
                                returnKeyType="close"
                                onSubmitEditing={Keyboard.dismiss}
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Button
                                text="Back" onPress={navigation.goBack}
                                style={{position: 'relative'}}
                                isTwoButtons={true}
                                isLeftButton={true}
                            />
                            <Button
                                text="Continue" onPress={handleContinue}
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

export default StepOneNewVolunteers;