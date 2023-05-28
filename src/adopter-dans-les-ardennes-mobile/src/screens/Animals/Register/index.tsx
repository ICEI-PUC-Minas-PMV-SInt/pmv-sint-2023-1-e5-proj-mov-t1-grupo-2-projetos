import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import {subYears} from 'date-fns';
import {RFValue} from 'react-native-responsive-fontsize';
import StepIndicator from 'react-native-step-indicator';
import Avatar from 'src/components/Avatar';

import {ImagePickerAsset} from 'expo-image-picker';


import Background from 'src/components/Background';
import Button from 'src/components/Button';
import Dropdown from 'src/components/Dropdown';
import Header from 'src/components/Header';
import SimpleInput from 'src/components/SimpleInput';

import {Content} from 'src/screens/Animals/Register/styles';

import {useTheme} from 'styled-components';
import * as Yup from 'yup';
import {DropdownWrapper} from '../List/styles';

import {GENDER_ITEMS, HEALTH_ITEMS, READY_TO_BE_ADOPTED, stepIndicatorCustomStyles, STEPS} from '../Register/types';
import {api} from "src/configs/api";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ScreenName} from "src/routes/types";
import {IAnimals} from "src/screens/Animals/List/types";

enum DIRECTION {
    LEFT,
    RIGHT
}

export const NewAnimal = () => {

    const ios = Platform.OS === 'ios';
    const {colors} = useTheme();

    const navigation = useNavigation()
    const route = useRoute();
    const savedAnimals = route.params as IAnimals;

    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(STEPS.FIRST_STEP);
    const [inputValues, setInputValues] = useState<IAnimals>({} as IAnimals)
    const [selectHealth, setSelectHealth] = useState<string[]>([]);

    const healthStatuses = ['vaccinated', 'castrated', 'wormed'];

    useEffect(() => {
        if (savedAnimals) {
            initializeInputValues()
        }
    }, []);

    const initializeInputValues = () => {
        setInputValues(savedAnimals)
        setSelectHealth(healthStatuses.filter(status => savedAnimals[status]));
    }

    const handleInputChange = useCallback((name, value) => {
        setInputValues((prevState) => ({...prevState, [name]: value}))
    }, []);


    const handleSelectHealth = (items: { label: string, value: string }[]) => {
        const values = items.map(item => item.value);
        setSelectHealth(values);
    };

    useEffect(() => {
        const healthStatusObject = {};

        healthStatuses.forEach(status => {
            healthStatusObject[status] = selectHealth?.includes(status);
        });

        setInputValues(prevState => ({...prevState, ...healthStatusObject}));
    }, [selectHealth]);

    const handleOnImageSelected = (image: ImagePickerAsset) => {
        handleInputChange('imageBase64', image.base64)
        handleInputChange('imageUrl', image.uri)
    }

    const basicInfoStepSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        breed: Yup.string().required('Breed is required'),
        gender: Yup.string().required('Gender is required'),
    });

    const arrivalStepSchema = Yup.object().shape({
        age: Yup.date().typeError('It must be a number').required('Anniversary Date is required'),
        arrivalDate: Yup.date().typeError('Arrival date must be a valid date').required('Arrival date is required'),
        electronicChip: Yup.string(),
    });

    const medicalStepSchema = Yup.object().shape({
        vaccinated: Yup.boolean(),
        castrated: Yup.boolean(),
        wormed: Yup.boolean(),
    });

    const additionalStepSchema = Yup.object().shape({
        isAvailable: Yup.boolean().typeError('Please select if the animal is ready').required('Please select if the animal is ready')
    });

    const handleContinue = async (direction: DIRECTION) => {

        if (direction === DIRECTION.LEFT) {
            setCurrentStep(currentStep - 1);
        } else {

            try {
                await stepConfig(currentStep)?.schema.validate(inputValues)
                setCurrentStep(currentStep + 1);
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    return Alert.alert('erro', error.message);
                }
            }
        }
    }

    const stepConfig = useCallback((step: number) => {

            switch (step) {
                case STEPS.FIRST_STEP :
                    return {
                        schema: basicInfoStepSchema,
                    };
                case  STEPS.SECOND_STEP :
                    return {
                        schema: arrivalStepSchema,
                    };
                case STEPS.THIRD_STEP :
                    return {
                        schema: medicalStepSchema,
                    };
                case STEPS.FOURTH_STEP :
                    return {
                        schema: additionalStepSchema,
                    };
            }
        },
        [basicInfoStepSchema, arrivalStepSchema, medicalStepSchema, additionalStepSchema],
    );

    const handleSave = async () => {

        try {
            await additionalStepSchema.validate(inputValues)

            setLoading(true)
            api.post('/animals', inputValues)
                .catch((error) => {
                    console.error(error);
                }).finally(() => {
                Alert.alert('Saved successfully');
                navigation.navigate(ScreenName.ANIMALS)
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('erro', error.message);
            }
        }
    };

    const renderSimpleInput = (label, stateName, props) => (
        <SimpleInput
            label={label}
            value={inputValues[stateName]}
            onChangeText={(value) => handleInputChange(stateName, value)}
            {...props}
        />
    );

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
                            value={
                                typeof inputValues[stateName] === 'string'
                                    ? inputValues[stateName].substring(0, 10)
                                    : inputValues[stateName] instanceof Date
                                        ? inputValues[stateName].toISOString().substring(0, 10)
                                        : ''
                            }
                            editable={false}
                        />
                    </View>
                </TouchableOpacity>
                {showDatePicker && (
                    <View>
                        <DateTimePicker
                            key={stateName}
                            value={inputValues[stateName] ?? new Date()}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            maximumDate={new Date()}
                            minimumDate={subYears(new Date(), 25)}
                            onChange={handleDateChange}
                        />
                    </View>
                )}
            </>
        );
    };

    const renderMultiInput = (label, stateName, props) => (
        <SimpleInput
            label={label}
            multiline
            numberOfLines={6}
            value={inputValues[stateName]}
            style={{height: `${RFValue(106)}px`, textAlignVertical: 'top'}}
            onChangeText={(value) => handleInputChange(stateName, value)}
            {...props}
        />
    );

    const renderDropdown = (zIndex, label, items, value, stateName) => (
        <DropdownWrapper style={ios && {zIndex}} width={90}>
            <Dropdown
                zIndex={zIndex * 1000}
                zIndexInverse={(zIndex + 10) * 1000}
                items={items}
                label={label}
                placeholder=""
                onSelectItem={(item) => handleInputChange(stateName, item.value)}
                value={value}
                searchable={false}
            />
        </DropdownWrapper>
    );
    const renderMultiDropdown = (zIndex, label, items) => (
        <DropdownWrapper style={ios && {zIndex}} width={90}>
            <Dropdown
                zIndex={zIndex * 1000}
                zIndexInverse={(zIndex + 1) * 1000}
                items={items}
                label={label}
                placeholder=""
                onSelectItem={handleSelectHealth}
                value={selectHealth}
                searchable={false}
                multiple
                mode="BADGE"
                badgeColors={colors.purple_200}
                badgeDotColors={colors.purple_300}
                badgeTextStyle={{color: colors.purple_300}}
            />
        </DropdownWrapper>
    );

    const renderBasicInfoForm = () => {
        return (
            <View style={{marginBottom: ios ? RFValue(80) : RFValue(30)}}>
                {renderSimpleInput('Name', 'name', {keyboardType: 'name', maxLength: 20})}
                {renderSimpleInput('Breed', 'breed', {keyboardType: 'name', maxLength: 20})}
                {renderDropdown(1, 'Gender', GENDER_ITEMS, inputValues.gender, 'gender')}
            </View>
        );
    };

    const renderArrivalForm = () => {
        return (
            <View style={{marginBottom: ios ? RFValue(80) : RFValue(30)}}>
                <DateTimePickerWrapper label='Anniversary Date' stateName='age'/>
                {renderSimpleInput('Electronic Chip', 'electronicChip', {
                    keyboardType: 'name',
                    maxLength: 20
                })}
                <DateTimePickerWrapper label='Arrival Date' stateName='arrivalDate'/>
            </View>
        );
    };

    const renderMedicalForm = () => {

        return (
            <View style={{marginBottom: ios ? RFValue(80) : RFValue(30)}}>
                {renderMultiDropdown(1, 'Health', HEALTH_ITEMS)}
                {renderMultiInput('Illness', 'illness', {keyboardType: 'name'})}
            </View>
        );
    };

    const renderAdditionalForm = () => {

        return (
            <View style={{marginBottom: ios ? RFValue(80) : RFValue(30)}}>
                {renderDropdown(2, 'Ready to be adopted', READY_TO_BE_ADOPTED, inputValues.isAvailable, 'isAvailable')}
                {renderMultiInput('Notes', 'notes', {keyboardType: 'name'})}
            </View>
        );
    };

    return (
        <Background style={{height: '79%', paddingTop: 1}}
                    headerChildren={
                        <Header title="Animals"/>
                    }>
            <Content>
                <KeyboardAvoidingView behavior={ios ? 'position' : 'height'} keyboardVerticalOffset={ios ? 150 : 0}>
                    <ScrollView>
                        <View style={{marginBottom: RFValue(30)}}>
                            <StepIndicator
                                customStyles={stepIndicatorCustomStyles}
                                currentPosition={currentStep}
                                labels={['Basic Info', 'Arrival', 'Medical', 'Additional']}
                                stepCount={4}
                            />
                        </View>
                        <View style={{marginRight: RFValue(10)}}>
                            <Avatar imageURI={inputValues.imageUrl} onImageSelected={handleOnImageSelected}/>
                        </View>
                        {currentStep === STEPS.FIRST_STEP && renderBasicInfoForm()}
                        {currentStep === STEPS.SECOND_STEP && renderArrivalForm()}
                        {currentStep === STEPS.THIRD_STEP && renderMedicalForm()}
                        {currentStep === STEPS.FOURTH_STEP && renderAdditionalForm()}
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={{flexDirection: 'row'}}>
                    <Button
                        text="Back"
                        onPress={() => currentStep === STEPS.FIRST_STEP ? navigation.goBack() : handleContinue(DIRECTION.LEFT)}
                        loading={loading}
                        style={{position: 'relative'}}
                        isTwoButtons={true}
                        isLeftButton={true}
                    />
                    <Button
                        text={currentStep === STEPS.FOURTH_STEP ? 'Save' : 'Continue'}
                        onPress={() => currentStep === STEPS.FOURTH_STEP ? handleSave() : handleContinue(DIRECTION.RIGHT)}
                        loading={loading}
                        style={{position: 'relative'}}
                        isTwoButtons={true}
                    />
                </View>
            </Content>
        </Background>
    );

};


export default NewAnimal;