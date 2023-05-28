import styled from "styled-components/native";
import {RFValue} from "react-native-responsive-fontsize";

export const DropdownWrapper = styled.View`
  padding: 0 ${RFValue(18)}px;
  margin-top: ${RFValue(8)}px;
`

export const Content = styled.ScrollView`
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: ${RFValue(20)}px;
`;
