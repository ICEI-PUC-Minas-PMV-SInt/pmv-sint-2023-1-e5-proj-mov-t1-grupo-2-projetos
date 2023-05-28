import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const MenuItemsWrapper = styled.View`
  padding-top: ${RFValue(40)}px;
  flex: 1;
`;

export const SettingsTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.Roboto_Regular};
  font-size: ${RFValue(18)}px;
  text-align: center;
  color: ${({theme}) => theme.colors.gray_300};
`
