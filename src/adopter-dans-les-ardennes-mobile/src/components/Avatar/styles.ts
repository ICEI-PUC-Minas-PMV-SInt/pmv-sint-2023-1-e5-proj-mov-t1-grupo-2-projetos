import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

interface ContainerProps {
    width?: number;
    height?: number;
}


export const Container = styled.ImageBackground<ContainerProps>`
  justify-content: center;
  width: ${({width = 64}) => RFValue(width)}px;
  height: ${({height = 64}) => RFValue(height)}px;
  margin: 0 ${RFValue(26)}px ${RFValue(16)}px ${RFValue(26)}px;
  border-radius: ${RFValue(32)}px;
  background-color: ${({theme}) => theme.colors.gray_150};
  overflow: hidden;
`;

export const Label = styled.Text`
  font-family: ${({theme}) => theme.fonts.Roboto_Regular};
  text-align: center;
  color: ${({theme}) => theme.colors.gray_300};
`;