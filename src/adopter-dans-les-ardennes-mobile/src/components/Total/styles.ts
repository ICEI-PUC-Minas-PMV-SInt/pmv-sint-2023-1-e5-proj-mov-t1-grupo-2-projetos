import {RFValue} from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export interface ITotalStyle {
    top?: string | number
}

export const Container = styled.View<ITotalStyle>`
  align-self: flex-end;
  top: ${({top}) => (top ? top : `-16px`)};
  right: 45px;
`

export const Text = styled.Text`
  font-family: ${({theme}) => theme.fonts.Roboto_Regular};
  font-size: ${RFValue(14)}px;
  text-align: right;
  color: ${({theme}) => theme.colors.white_100};
`
