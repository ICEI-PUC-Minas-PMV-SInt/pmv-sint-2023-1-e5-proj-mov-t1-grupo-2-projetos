import React from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


import Background from 'src/components/Background';
import Header from 'src/components/Header';
import Card from 'src/screens/Home/Card';

import { useAuth } from 'src/hooks/Auth/auth';

import { Greetings, GreetingsWrapper} from "./styles";


type INavigation = StackNavigationProp<ParamListBase, 'home'>

const Home = () => {
    const navigation = useNavigation<INavigation>();
    const {user} = useAuth ();

    const handleNavigation = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <Background
            headerChildren={
                <>
                    <Header  renderBackButton={false}/>
                    <GreetingsWrapper>

                        <Greetings>{`Hello, `+ user?.name}</Greetings>
                    </GreetingsWrapper>
                </>
            }
        >

            <Card handleNavigation={handleNavigation}/>
        </Background>
    );
};

export default Home;
