import React from 'react';
import {Feather} from '@expo/vector-icons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

import {BackButton} from 'src/components/BackButton';

import {IHeader} from 'src/components/Header/types';
import {RootStackParamList} from 'src/routes/types';

import theme from "src/styles/theme";

import {Container, SideMenuButton, Title} from './styles';

type INavigation = DrawerNavigationProp<RootStackParamList, 'home'>

const Header = ({title , renderBackButton = true}: IHeader) => {
    const navigation = useNavigation<INavigation>()

    const handleBack = () => {
        navigation.goBack()
    }

    return (
        <Container>
            {renderBackButton &&
            <BackButton onPress={handleBack}/>
            }
            <Title>{title}</Title>
            <SideMenuButton onPress={navigation.toggleDrawer}>
                <Feather name="more-vertical" size={24} color={theme.colors.white_100}/>
            </SideMenuButton>
        </Container>
    )
}

export default Header
