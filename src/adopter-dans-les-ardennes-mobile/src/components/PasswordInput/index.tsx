import React, {useState} from 'react';
import CustomIcon, {IconType} from 'src/components/CustomIcon';
import {InputContainer, ShowPasswordView, StyledInput} from 'src/components/PasswordInput/styles';
import {Separator} from 'src/screens/Login/styles';
import {RFValue} from "react-native-responsive-fontsize";
import {View} from "react-native";

interface PasswordInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    accessibilityLabel: string;
    accessibilityHint: string;
    showLockIcon: boolean;
    showRevealIcon: boolean;
    style?: {
        width: number
    }
}

export const PasswordInput = ({
                                  placeholder,
                                  value,
                                  onChangeText,
                                  accessibilityLabel,
                                  accessibilityHint,
                                  showRevealIcon,
                                  showLockIcon,
                                  style
                              }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <InputContainer isFocused={isFocused} width={style?.width}>
            {showLockIcon &&
                <>

                    <CustomIcon
                        iconType={IconType.Feather}
                        name="lock"
                        size={RFValue(20)}
                        isActive={value.trim() !== ''}
                        paddingLeft={RFValue(10)}
                        paddingRight={RFValue(10)}
                    />

                    <Separator/>
                </>
            }

            <StyledInput
                placeholder={placeholder}
                secureTextEntry={!showPassword}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                accessibilityLabel={accessibilityLabel}
                accessibilityHint={accessibilityHint}
                accessibilityRole="text"
                autoCapitalize="none"
            />
            {showRevealIcon &&
                <ShowPasswordView>
                    <CustomIcon
                        iconType={IconType.Feather}
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={RFValue(20)}
                        onPress={() => setShowPassword(!showPassword)}
                        isActive={value.trim() !== ''}
                    />
                </ShowPasswordView>
            }
        </InputContainer>
    );
};