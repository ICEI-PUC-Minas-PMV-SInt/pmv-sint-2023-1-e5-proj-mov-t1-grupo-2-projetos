import React, {useState} from 'react';
import {
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';

import Button from 'src/components/Button';
import CustomIcon, {IconType} from 'src/components/CustomIcon';
import {PasswordInput} from 'src/components/PasswordInput';

import {useAuth} from 'src/hooks/Auth/auth';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import LogoImg from '../../assets/logo.svg';


import {
    Container,
    InputContainer,
    Separator,
    StyledInput,
    LogoWrapper,
    BindingWrapper,
    ForgotPasswordText,
} from 'src/screens/Login/styles';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    const {signIn, snackbarProps} = useAuth();
    const insets = useSafeAreaInsets();

    const handleLogin = async () => {
        setLoading(true);
        await signIn(username, password).finally(() => setLoading(false));
    };

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <>
                <Container>
                    <BindingWrapper>
                        <LogoWrapper>
                            <LogoImg width={RFValue(300)} height={RFValue(212.8)}/>
                        </LogoWrapper>
                        <InputContainer isFocused={usernameFocused}>

                            <CustomIcon
                                iconType={IconType.Feather}
                                name="mail"
                                size={RFValue(20)}
                                isActive={username.trim() !== ''}
                                paddingLeft={RFValue(10)}
                                paddingRight={RFValue(10)}
                            />

                            <Separator/>
                            <StyledInput
                                underlineColorAndroid="transparent"
                                placeholder="Username"
                                value={username}
                                onChangeText={setUsername}
                                onFocus={() => setUsernameFocused(true)}
                                onBlur={() => setUsernameFocused(false)}
                                accessibilityLabel="Username"
                                accessibilityHint="Enter your username"
                                accessibilityRole="text"
                                autoCapitalize="none"
                            />
                        </InputContainer>
                        <PasswordInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            accessibilityLabel="Password"
                            accessibilityHint="Enter your password"
                            showLockIcon
                            showRevealIcon
                        />

                        <TouchableOpacity>
                            <ForgotPasswordText>
                                Forgot Password
                            </ForgotPasswordText>
                        </TouchableOpacity>

                    </BindingWrapper>

                    <Button onPress={handleLogin} text="Login" loading={loading}/>

                    <View
                        style={{height: RFValue(50)}}
                        accessibilityElementsHidden={true}
                        importantForAccessibility="no-hide-descendants"

                    />

                </Container>
                {snackbarProps.isVisible &&
                    <View style={{width: '94%', position: 'absolute', bottom: insets.bottom + 50, alignSelf: 'center'}}>
                        <Snackbar
                            visible={snackbarProps.isVisible}
                            style={{backgroundColor: snackbarProps.color,}}
                            duration={1000}
                            onDismiss={snackbarProps.onDismissSnackBar}
                        >
                            {snackbarProps.message}
                        </Snackbar>
                    </View>
                }
            </>
        </TouchableWithoutFeedback>
    );
};

export default Login;
