import {Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import styled, {css} from 'styled-components/native';

const ios = Platform.OS === 'ios';

export interface IButtonStyle {
    position?: string;
    isTwoButtons?: boolean;
    isLeftButton?: boolean;
}

export const Container = styled.View<IButtonStyle>`
  width: ${({isTwoButtons}) => isTwoButtons ? '50%' : '100%'};
  position: ${({position}) => position ? position : 'absolute'};
  padding: 0 ${RFValue(16)}px;
  bottom: 0;
`

export const Content = styled.TouchableOpacity<IButtonStyle>`
  padding: ${RFValue(14)}px 0;
  border-radius: ${RFValue(8)}px;
  ${ios
          ? css`
            box-shadow: 2px 2px 3px rgba(84, 84, 84, 0.25098);
          `
          : css`
            box-shadow: 2px 2px 3px rgba(84, 84, 84, 0.25098);
            elevation: 8;
          `};
  background-color: ${({theme, isLeftButton}) => isLeftButton ? theme.colors.white_100 : theme.colors.purple_300};
  border-width: ${({isLeftButton}) => isLeftButton ? `1px` : 0};
  border-color: ${({theme, isLeftButton}) => isLeftButton ? theme.colors.purple_300 : 'transparent'};
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
`;

export const Text = styled.Text<IButtonStyle>`
  font-family: ${({theme}) => theme.fonts.Poppins_Medium};
  font-size: ${RFValue(16)}px;
  text-align: center;
  color: ${({theme, isLeftButton}) => isLeftButton ? theme.colors.purple_300 : theme.colors.white_100};
`;
