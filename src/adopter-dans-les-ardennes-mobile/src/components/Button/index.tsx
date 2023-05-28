import React from 'react';
import theme from 'src/styles/theme';
import { Container, Content, Text,IButtonStyle } from './styles'
import { ActivityIndicator } from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context';


interface IButton {
    text: string
    onPress?: () => void
    loading?: boolean
    style?: IButtonStyle;
    isTwoButtons?: boolean;
    isLeftButton?: boolean;
}

const Button = ({text, onPress, style, loading, isTwoButtons = false, isLeftButton = false}: IButton) => {
    const insets = useSafeAreaInsets();
    return (

        <Container position={style?.position} style={{paddingBottom: insets.bottom + 20,}} isTwoButtons={isTwoButtons}>
            <Content disabled={loading} onPress={onPress} isLeftButton={isLeftButton}>
                {loading ?
                    <ActivityIndicator color={theme.colors.white_100}/>
                    :
                    <Text isLeftButton={isLeftButton}>{text}</Text>
                }
            </Content>
        </Container>

    )
}

export default Button
