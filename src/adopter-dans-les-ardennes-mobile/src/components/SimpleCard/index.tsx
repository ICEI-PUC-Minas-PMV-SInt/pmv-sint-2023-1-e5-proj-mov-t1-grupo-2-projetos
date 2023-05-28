import React from 'react';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomIcon from 'src/components/CustomIcon';
import { ISimpleCard } from 'src/components/SimpleCard/types';
import theme from 'src/styles/theme';
import { Card, Container, Content, IconWrapper, Title } from './styles';

const SimpleCard = ({
                        title,
                        iconName,
                        children,
                        onPress,
                        iconType
                    }: ISimpleCard) => {
    return (
        <Container>
            <TouchableOpacity onPress={onPress}>
                <Card>
                    <Content>
                        <IconWrapper>
                            {iconName &&
                                <CustomIcon iconType={iconType} name={iconName} isActive={false} color={theme.colors.white_100}
                                            size={RFValue (14)}/>
                            }
                            {children}
                        </IconWrapper>
                        <Title>{title}</Title>
                    </Content>
                </Card>
            </TouchableOpacity>
        </Container>
    );
};

export default SimpleCard;
