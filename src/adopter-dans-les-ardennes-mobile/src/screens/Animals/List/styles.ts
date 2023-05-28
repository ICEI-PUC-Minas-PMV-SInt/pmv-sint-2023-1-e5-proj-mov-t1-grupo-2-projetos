import { Dimensions } from 'react-native';
import styled from 'styled-components/native'
import {RFValue} from 'react-native-responsive-fontsize'
const screenWidth = Dimensions.get('window').width;
interface DropdownWrapperProps {
    width?:number
}
export const DropdownWrapper = styled.View<DropdownWrapperProps>`
  margin: ${RFValue(30)}px 0;
  width: 95%;
  align-self: center;
`

export const CollapsibleCardWrapper = styled.View`
  width: ${(screenWidth - RFValue(14)) / 2 - RFValue(2)}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 6px;
  padding-bottom: ${RFValue(0)}px;
`

export const Content = styled.View`
  margin: 0 0 0 ${RFValue(12)}px;
  padding-bottom: ${RFValue(5)}px;
`

export const Label = styled.Text`
  font-family: ${({theme}) => theme.fonts.Poppins_Medium};
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  line-height: ${RFValue(18)}px;
  color: ${({theme}) => theme.colors.gray_350};
`

export const Text = styled.Text`
  font-family: ${({theme}) => theme.fonts.Poppins_Regular};
  font-size: ${RFValue(12)}px;
  text-align: left;
  flex-direction: row;
  color: ${({theme}) => theme.colors.gray_350};
`
