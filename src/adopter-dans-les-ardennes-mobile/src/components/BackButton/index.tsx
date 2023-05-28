import {Container} from './styles'
import {MaterialIcons} from '@expo/vector-icons'
import React from 'react'
import {BorderlessButtonProps} from 'react-native-gesture-handler'
import {RFValue} from 'react-native-responsive-fontsize'
import {useTheme} from 'styled-components'

interface Props extends BorderlessButtonProps {
    color?: string
}

export function BackButton({color, ...rest}: Props) {
    const theme = useTheme()

    return (
        <Container {...rest}>
            <MaterialIcons name="chevron-left" size={RFValue(24)} color={color ? color : theme.colors.white_100}/>
        </Container>
    )
}
