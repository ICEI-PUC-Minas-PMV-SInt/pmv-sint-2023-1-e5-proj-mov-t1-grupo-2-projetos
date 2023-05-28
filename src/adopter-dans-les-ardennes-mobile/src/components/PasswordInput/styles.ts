import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ShowPasswordView = styled.View`
  padding-right: ${RFValue(20)}px;
`;

export const StyledInput = styled.TextInput.attrs(({theme}) => ({
    placeholderTextColor: theme.colors.gray_50,
}))`
  flex: 1;
  padding: ${RFValue(8)}px;
  font-size: ${RFValue(16)}px;
`;

export const InputContainer = styled.View<{ isFocused: boolean, width: number | undefined }>`
  width: ${({width}) => (width ? `${RFValue(width)}px` : `${RFValue(300)}px`)};
  margin-bottom: ${RFValue(16)}px;
  flex-direction: row;
  align-items: center;
  border-color: ${({theme}) => theme.colors.white_100};
  background-color: ${({theme}) => theme.colors.white_100};;
  border-width: ${RFValue(1)}px;;
  border-bottom-width: ${RFValue(2)}px;
  border-bottom-color: ${({isFocused, theme}) => (isFocused ? theme.colors.purple_300 : theme.colors.white_100)};
`;