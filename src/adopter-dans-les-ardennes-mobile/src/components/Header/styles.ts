import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import {RFValue} from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
  padding-top: ${getStatusBarHeight() + 30}px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 ${RFValue(15)}px;

`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.Poppins_Bold};
  font-size: ${RFValue(24)}px;
  color: ${({theme}) => theme.colors.white_100};
  
`

export const SideMenuButton = styled.TouchableOpacity.attrs({
    hitSlop: {top: 20, right: 20, bottom: 20, left: 20}
})``
