import styled from "styled-components/native";
import {RFValue} from "react-native-responsive-fontsize";

export const Label = styled.Text`
  font-family: ${({theme}) => theme.fonts.Roboto_Regular};
  font-size: ${RFValue(14)}px;
  margin-bottom: ${RFValue(6)}px;
  color: ${({theme}) => theme.colors.gray_450};
`;