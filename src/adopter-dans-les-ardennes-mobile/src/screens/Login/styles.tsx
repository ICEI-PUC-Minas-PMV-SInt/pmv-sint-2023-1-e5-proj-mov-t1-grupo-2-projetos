import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.purple_50};
`;

export const StyledInput = styled.TextInput.attrs(({theme}) => ({
    placeholderTextColor: theme.colors.gray_50,
}))`
  flex: 1;
  padding: ${RFValue(8)}px;
  font-size: ${RFValue(16)}px;
`;

export const InputContainer = styled.View<{ isFocused: boolean }>`
  width: ${RFValue(300)}px;
  margin-bottom: ${RFValue(16)}px;
  flex-direction: row;
  align-items: center;
  border-color: ${({theme}) => theme.colors.white_100};
  background-color: ${({theme}) => theme.colors.white_100};
  border-width: ${RFValue(1)}px;
  border-bottom-width: ${RFValue(2)}px;
  border-bottom-color: ${({isFocused, theme}) => (isFocused ? theme.colors.purple_300 : theme.colors.white_100)};
`;

export const Separator = styled.View`
  height: 100%;
  width: ${RFValue(1)}px;
  background-color: ${({theme}) => theme.colors.gray};
`;

export const LogoWrapper = styled.View`
  margin-bottom: ${RFValue(35)}px;
`;

export const BindingWrapper = styled.View`
  margin-bottom: ${RFValue(80)}px;
`;

export const ForgotPasswordText = styled.Text`
  color: ${({theme}) => theme.colors.gray_300};
  text-decoration-line: underline;
  font-family: ${({theme}) => theme.fonts.Inter_Regular};
  margin-bottom: ${RFValue(16)}px;
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(17)}px;
  align-self: center;
  letter-spacing: 0;
`;