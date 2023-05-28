import { Platform, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import styled, { css } from 'styled-components/native';


const screenWidth = Dimensions.get ('window').width;
const ios = Platform.OS === 'ios';

export const Card = styled.View`
  ${ios
          ? css`
            box-shadow: 2px 1px 3px rgba(84, 84, 84, 0.25098);
          `
          : css`
            box-shadow: 2px 2px 3px rgba(84, 84, 84, 0.25098);
            elevation: 6;
          `};
  width: ${(screenWidth - RFValue (20)) / 2 - RFValue (16)}px;
  margin: ${RFValue (10)}px ${RFValue (6)}px;
  padding-bottom: ${RFValue (4)}px;
  border-radius: ${RFValue (8)}px;
  background-color: ${({theme}) => theme.colors.white_100};
`;

export const CardBottom = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: ${RFValue (10)}px 0;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.Poppins_Regular};
  font-size: ${RFValue (14)}px;
  ${({theme}) => theme.colors.gray_350};
`;

export const Overlay = styled.View`
  position: absolute;
  opacity: 0.4;
  width: ${(screenWidth - RFValue (20)) / 2 - RFValue (16)}px;
  height: 100%;
  z-index: 1000;
  border-top-left-radius: ${RFValue (8)}px;
  border-top-right-radius: ${RFValue (8)}px;
  background-color: ${({theme}) => theme.colors.black_100};
`;

export const Tag = styled.View`
  width: ${RFValue (86)}px;
  border-radius: ${RFValue (8)}px;
  padding: ${RFValue (6)}px;
  bottom: 15px;
  position: absolute;
  align-self: center;
  background-color: ${({theme}) => theme.colors.red_100};
`;

export const TagText = styled.Text`
  font-family: ${({theme}) => theme.fonts.Poppins_Medium};
  font-size: ${RFValue (12)}px;
  text-align: center;
  color: ${({theme}) => theme.colors.white_100};
`;
