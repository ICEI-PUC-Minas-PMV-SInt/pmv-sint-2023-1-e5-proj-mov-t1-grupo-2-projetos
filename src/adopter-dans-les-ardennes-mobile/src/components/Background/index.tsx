import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { IBackground } from 'src/components/Background/types';
import { Container, Content } from './styles';

const Background = ({children, headerChildren, style}: IBackground) => {


    return (

        <Container>

            <StatusBar style="light" translucent={true}/>
            {headerChildren}

            <Content height={style?.height} paddingTop={style?.paddingTop}>
                {children}
            </Content>

        </Container>


    );
};

export default Background;
