import styled from "styled-components/native";
import {TextInput} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";

export interface ISimpleInputStyle {
    height?: number | string;
    textAlignVertical?: "center" | "auto" | "top" | "bottom" | undefined;
}

export const Container = styled.View`
  width: 100%;
  padding: 0 ${RFValue(18)}px;
  margin-top: ${RFValue(10)}px;
`;

export const Label = styled.Text`
  font-family: ${({theme}) => theme.fonts.Roboto_Regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.gray_450};
`;

export const Input = styled(TextInput)<ISimpleInputStyle>`
  width: 100%;
  height: ${({height}) => height ? height : `${RFValue(36)}px`};
  font-family: ${({theme}) => theme.fonts.Roboto_Regular};
  font-size: ${RFValue(14)}px;
  margin: ${RFValue(6)}px 0 0 0;
  padding: 0 ${RFValue(8)}px;
  border-radius: ${RFValue(4)}px;
  textAlignVertical: ${({textAlignVertical}) => textAlignVertical ? textAlignVertical : 'auto'};
  color: ${({theme}) => theme.colors.gray_100};
  background-color: ${({theme}) => theme.colors.white_100};
`;