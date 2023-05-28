import {Modal, SafeAreaView} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ModalStyle = styled(Modal as any).attrs(({theme}) => ({
    backdropOpacity: 0.75,
    backdropColor: theme.black,
    margin: 0,
    shadowColor: theme.shadow,
    shadowOffset: {
        width: 0,
        height: RFValue(6),
    },
    shadowOpacity: RFValue(0.4),
    shadowRadius: RFValue(8),
    elevation: RFValue(6),
    rippleContainerBorderRadius: RFValue(2),
}))``;

export const ButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${RFValue(20)}px ${RFValue(20)}px;
`;

export const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: ${RFValue(320)}px;
  height: ${RFValue(320)}px;
  background: ${({theme}) => theme.colors.purple_50};
  border-radius: ${RFValue(4)}px;
`;

export const CloseButton = styled.TouchableOpacity.attrs({
    hitSlop: {top: 20, right: 20, bottom: 20, left: 20},
})`
  position: absolute;
  top: ${RFValue(10)}px;
  right: ${RFValue(12)}px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding: ${RFValue(20)}px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(16)}px;
  margin-top: ${RFValue(16)}px;
  margin-right: ${RFValue(30)}px;
`;

export const ModalTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.Poppins_Medium};
  font-size: ${RFValue(18)}px;
`;

export const CustomIconContainer = styled.View`
  margin-left: ${RFValue(8)}px;
  margin-right: ${RFValue(8)}px;
  margin-bottom: ${RFValue(4)}px;
`;

const Button = styled.TouchableOpacity`
  width: ${RFValue(130)}px;
  height: ${RFValue(56)}px;
  border-radius: ${RFValue(8)}px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors.purple_300};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
`;

export const RightButton = styled(Button)`
  background: ${({theme}) => theme.colors.purple_300};

`;

export const LeftButton = styled(Button)`
`;

export const LeftButtonText = styled.Text`
  color: ${({theme}) => theme.colors.purple_300};
  font-size: ${RFValue(16)}px;
`;

export const RightButtonText = styled.Text`
  color: ${({theme}) => theme.colors.white_100};
  font-size: ${RFValue(16)}px;
`;
