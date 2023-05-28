import React, {useEffect, useState} from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomIcon, {IconType} from 'src/components/CustomIcon';
import GenericModal from 'src/components/GenericModal';
import {PasswordInput} from 'src/components/PasswordInput';
import {api} from 'src/configs/api';
import {useTheme} from 'styled-components';

interface ChangePasswordProps {
    isVisible: boolean;
    handleShow: () => void;
}

const ChangePasswordModal = ({isVisible, handleShow}: ChangePasswordProps) => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('red');
    const [saving, setSaving] = useState(false);

    const {colors} = useTheme();

    const callApiToChangePassword = (password: string) => {
        setSaving(true)
        return api.post('/user/change-password', {
            newPassword: password
        });
    };

    const onDismissSnackBar = () => setSnackbarVisible(false);

    const handleDismissKeyboardAndSnackBar = () => {
        Keyboard.dismiss();
        onDismissSnackBar();
    };

    useEffect(() => {
        setDisableSaveButton(!password || !confirmPassword);
    }, [confirmPassword, password]);


    const handleSave = async () => {
        if (password !== confirmPassword) {
            setSnackbarMessage('Passwords do not match. Please try again.');
            setSnackbarColor(colors.red_200);
            setSnackbarVisible(true);
        } else {
            await callApiToChangePassword(password).then(() => {
                setSnackbarMessage('Password changed successfully.');
                setSnackbarColor(colors.green_200);
                setSnackbarVisible(true);
                cleanUpFields()
            }).catch(() => {
                setSnackbarMessage('An error occurred while changing the password');
                setSnackbarColor(colors.red_200);
                setSnackbarVisible(true);
            }).finally(() => setSaving(false));
        }
    };

    useEffect(() => {
        if (!isVisible) {
            setSnackbarVisible(false);
            setSnackbarMessage('');
            setSnackbarColor(colors.red_200);
            cleanUpFields()
        }
    }, [colors.red_200, isVisible]);

    const cleanUpFields = () => {
        setPassword('');
        setConfirmPassword('');
    }

    return (
        <GenericModal
            leftButtonTitle={'Cancel'}
            leftButtonOnPress={handleShow}
            onRequestClose={handleShow}
            rightButtonOnPress={handleSave}
            rightButtonTitle={'Save'}
            visible={isVisible}
            title={'Change your password'}
            customIcon={<CustomIcon iconType={IconType.Feather} name={'lock'} isActive size={RFValue(24)}/>}
            rightButtonDisabled={disableSaveButton}
            loading={saving}>
            <TouchableOpacity activeOpacity={1} onPress={handleDismissKeyboardAndSnackBar} style={{flex: 1}}>
                <PasswordInput
                    placeholder="New password"
                    value={password}
                    onChangeText={setPassword}
                    accessibilityLabel="Password"
                    accessibilityHint="Enter your password"
                    showLockIcon={false}
                    showRevealIcon
                    style={{width: 290}}
                />

                <PasswordInput
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    accessibilityLabel="Confirm password"
                    accessibilityHint="Confirm your password"
                    showLockIcon={false}
                    showRevealIcon
                    style={{width: 290}}
                />

                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={onDismissSnackBar}
                    style={{backgroundColor: snackbarColor}}
                    duration={Snackbar.DURATION_SHORT}>
                    {snackbarMessage}
                </Snackbar>
            </TouchableOpacity>
        </GenericModal>
    );
};

export default ChangePasswordModal;