import React from 'react';
import LottieView from 'lottie-react-native';

import splash from '../../assets/splash.json';

import { Container } from './styles';

interface ILoadAnimation {
    onAnimationFinish: () => void;
}

const LoadingAnimation = ({onAnimationFinish}: ILoadAnimation) => {

    return (
        <Container>
            <LottieView
                source={splash}
                resizeMode="contain"
                autoPlay
                loop={false}
                onAnimationFinish={onAnimationFinish}
            />
        </Container>
    );
};

export default LoadingAnimation;
