import {Platform} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import styled, {css} from 'styled-components/native'

const ios = Platform.OS === 'ios'

export const Container = styled.View`
  width: 50%;
`

export const Card = styled.View`
  width: ${RFValue(150)}px;
  height: ${RFValue(150)}px;
  margin: ${RFValue(21)}px 0 0 0;
  border-radius: ${RFValue(8)}px;
  align-self: center;
  background-color: ${({theme}) => theme.colors.white_100};

  ${ios
          ? css`
            box-shadow: 2px 2px 3px rgba(84, 84, 84, 0.25098);
          `
          : css`
            box-shadow: 2px 2px 3px rgba(84, 84, 84, 0.25098);
            elevation: 8;
          `};
`

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const IconWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: ${RFValue(34)}px;
  height: ${RFValue(34)}px;
  margin-bottom: ${RFValue(6)}px;
  border-radius: ${RFValue(16)}px;
  background-color: ${({theme}) => theme.colors.purple_250}
`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.Poppins_Medium};
  font-size: ${RFValue(16)}px;
  text-align: center;
  color: ${({theme}) => theme.colors.gray_350};
`
