import {Feather} from '@expo/vector-icons'
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import theme from "src/styles/theme";

export const Section = styled.TouchableOpacity`
  flex-direction: row;
  margin: ${RFValue(8)}px ${RFValue(16)}px;
  align-content: center;
  justify-content: center;
`

export const SectionContainer = styled.View`
  flex: 1;
  margin-left: ${RFValue(8)}px;
  justify-content: center;
  min-height: 40px;
`
export const SectionTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.Inter_Regular};
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(24)}px;
  max-width: 93%;
  color: ${({theme}) => theme.colors.gray_450};
`

export const ChevronRight = styled(Feather).attrs(() => ({
    name: 'chevron-left',
    size: RFValue(10),
    color: theme.colors.white_100
}))`
  margin: ${RFValue(0)}px ${RFValue(0)}px ${RFValue(35)}px 0;
`