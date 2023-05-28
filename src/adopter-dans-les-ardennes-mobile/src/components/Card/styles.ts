import styled, {css} from 'styled-components/native'
import {Platform} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'


const ios = Platform.OS === 'ios'

export interface ICardStyle {
    isActive?: boolean;
    showBorder?: boolean;
    tagText?: string;
    textAlign?: string;
    paddingLeft?: string | number;
    paddingRight?: string | number;
}

export const Container = styled.TouchableOpacity<ICardStyle>`
  width: 90%;
  height: ${RFValue(155)}px;
  margin: 0 ${RFValue(20)}px;
  border-radius: ${RFValue(8)}px;
  align-self: center;
  padding-right: 8px;
  border-left-width: ${({showBorder}) => showBorder ? `3px` : 0}
  border-left-color: ${({isActive, theme}) =>
          isActive ?
                  theme.colors.green_200
                  : theme.colors.red_200
  }

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
  height: 100%;
  flex-direction: row;
  padding: ${RFValue(12)}px 0;

`

export const Tag = styled.View<ICardStyle>`
  width: ${RFValue(83)}px;
  height: ${RFValue(28)}px;
  padding: 7px 0;
  border-radius: ${RFValue(8)}px;
  background-color: ${({tagText, theme}) => {
    if (tagText?.toLowerCase() === 'Pending') {
      return theme.colors.orange_200;
    }
    if (tagText?.toLowerCase() === 'Closed') {
      return theme.colors.red_200;
    }

    return theme.colors.green_200
  }}
`

export const TagText = styled.Text`
  font-family: ${({theme}) => theme.fonts.Poppins_Medium};
  font-size: ${RFValue(12)}px;
  text-align: center;
  color: ${({theme}) => theme.colors.white_100};
`

export const Wrapper = styled.ScrollView`
  flex-direction: column;
`


export const Name = styled.Text<ICardStyle>`
  font-family: ${({theme}) => theme.fonts.Poppins_Medium};
  font-size: ${RFValue(16)}px;
  text-align: ${({textAlign}) => textAlign ? textAlign : 'center'};
  color: ${({theme}) => theme.colors.gray_350};
`

export const InfoWrapper = styled.View<ICardStyle>`
  margin: ${RFValue(6)}px 0 0 0;
  ${({paddingRight}) =>
          paddingRight &&
          css`
            padding-right: ${paddingRight}px;
          `}
  ${({paddingLeft}) =>
          paddingLeft &&
          css`
            padding-left: ${paddingLeft}px;
          `}
`
export const Info = styled.Text`
  font-family: ${({theme}) => theme.fonts.Poppins_Medium};
  font-size: ${RFValue(14)}px;
  text-align: left;
  color: ${({theme}) => theme.colors.gray_350};
`

export const IconWrapper = styled.TouchableOpacity.attrs({
    hitSlop: {top: 30, right: 30, bottom: 30, left: 30},
})`
  position: absolute;
  align-self: center;
  right: ${RFValue(12)}px;
`;