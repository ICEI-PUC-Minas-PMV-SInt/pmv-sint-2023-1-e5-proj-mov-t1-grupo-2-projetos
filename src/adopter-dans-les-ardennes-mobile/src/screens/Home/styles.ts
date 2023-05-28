import {RFValue} from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Platform} from "react-native";

const ios = Platform.OS === 'ios';
export const GreetingsWrapper = styled.View`
  width:100%;
  padding-top: ${ ios ? getStatusBarHeight() : RFValue(10)}px;
  margin-left:  ${RFValue(40)}px;
`

export const Greetings = styled.Text`
  font-family: ${({theme}) => theme.fonts.Poppins_SemiBold};
  font-size: ${RFValue(22)}px;
  text-align: left;
  color: ${({theme}) => theme.colors.white_100};
`


