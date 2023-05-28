import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';


export interface IBackgroundStyle {
    height?: number | string;
    paddingTop?: number;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.purple_300};
`;

export const Content = styled.View<IBackgroundStyle>`
  position: absolute;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  height: ${({height}) => (height ? height : '80%')};
  bottom: 0;
  padding-top: ${({paddingTop = 32}) => `${RFValue (paddingTop)}px`};
  border-top-left-radius: ${RFValue (40)}px;
  border-top-right-radius: ${RFValue (40)}px;
  background-color: ${({theme}) => theme.colors.purple_50};

`;
