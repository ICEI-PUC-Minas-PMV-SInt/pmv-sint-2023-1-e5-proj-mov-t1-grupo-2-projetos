import React, {ReactNode} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {ActivityIndicator} from "react-native";

import CustomIcon, {IconType} from 'src/components/CustomIcon';
import theme from 'src/styles/theme';

import {
    ButtonContainer,
    CloseButton,
    ContentContainer,
    CustomIconContainer,
    LeftButton,
    LeftButtonText,
    ModalContent,
    ModalStyle,
    ModalTitle,
    Overlay,
    RightButton,
    RightButtonText,
    TitleContainer
} from './styles';

interface IGenericModal {
    children?: ReactNode;
    visible: boolean;
    onRequestClose: () => void;
    title: string;
    customIcon?: ReactNode;
    leftButtonTitle: string;
    leftButtonOnPress: () => void;
    leftButtonDisabled?: boolean;
    rightButtonTitle: string;
    rightButtonOnPress: () => void;
    rightButtonDisabled?: boolean;
    loading: boolean;
}

const GenericModal = ({
                          children,
                          visible,
                          onRequestClose,
                          title,
                          customIcon,
                          leftButtonTitle,
                          leftButtonOnPress,
                          leftButtonDisabled = false,
                          rightButtonTitle,
                          rightButtonOnPress,
                          rightButtonDisabled = false,
                          loading
                      }: IGenericModal) => {
    return (
        <ModalStyle
            animationType="fade"
            transparent

            visible={visible}
            onRequestClose={onRequestClose}
        >
            <Overlay>
                <ModalContent>
                    {loading ? null :
                        <CloseButton onPress={onRequestClose}>
                            <CustomIcon
                                name='x-circle'
                                iconType={IconType.Feather}
                                size={RFValue(18)}
                                isActive={false}
                            />

                        </CloseButton>
                    }
                    <TitleContainer>
                        {customIcon && <CustomIconContainer>{customIcon}</CustomIconContainer>}
                        <ModalTitle>{title}</ModalTitle>
                    </TitleContainer>
                    <ContentContainer>{children}</ContentContainer>
                    <ButtonContainer>

                        <LeftButton onPress={leftButtonOnPress} disabled={leftButtonDisabled || loading}>
                            <LeftButtonText>{leftButtonTitle}</LeftButtonText>
                        </LeftButton>
                        <RightButton onPress={rightButtonOnPress} disabled={rightButtonDisabled || loading}>
                            {loading ? <ActivityIndicator color={theme.colors.white_100}/> :
                                <RightButtonText>{rightButtonTitle}</RightButtonText>}
                        </RightButton>
                    </ButtonContainer>
                </ModalContent>
            </Overlay>
        </ModalStyle>
    );
};

export default GenericModal;
