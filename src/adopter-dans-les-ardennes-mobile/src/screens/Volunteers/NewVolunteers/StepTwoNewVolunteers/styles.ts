import styled from "styled-components/native";
import {RFValue} from "react-native-responsive-fontsize";

export const Content = styled.ScrollView`
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: ${RFValue(20)}px;
`;

export const DropdownWrapper = styled.View`
  padding: 0 ${RFValue(18)}px;
  margin-top: ${RFValue(8)}px;
`


export const HourAndMinuteWrapper = styled.View`
  flex-direction: row;
`;

export const HourAndMinuteLabel = styled.Text`
  font-family: ${({theme}) => theme.fonts.Roboto_Regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.gray_450};
`;

export const Divider = styled.Text`
  fontFamily: ${({theme}) => theme.fonts.Roboto_Regular};
  font-size: ${RFValue(16)}px;
  text-align: center;
  padding: 0 ${RFValue(4)}px;
  color: ${({theme}) => theme.colors.gray_100};
`

export const HourAndMinuteInput = styled.TextInput`
  width: ${RFValue(46)}px;
  height: ${RFValue(46)}px;
  font-family: ${({theme}) => theme.fonts.Roboto_Regular};
  font-size: ${RFValue(14)}px;
  text-align: center;
  color: ${({theme}) => theme.colors.gray_100};
  border-radius: ${RFValue(8)}px;
  background-color: ${({theme}) => theme.colors.white_100};
`;