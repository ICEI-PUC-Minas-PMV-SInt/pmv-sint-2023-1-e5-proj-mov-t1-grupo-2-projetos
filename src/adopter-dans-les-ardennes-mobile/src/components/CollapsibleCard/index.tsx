import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {animated, useSpring} from '@react-spring/native';
import React, {memo, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';


import theme from 'src/styles/theme';

import {Card, CardBottom, Overlay, Tag, TagText, Title} from './styles';

import {ICollapsibleCard} from './types';

const avatarPlaceholderImg = require("../../assets/no_image_available.png")

const CollapsibleCard = memo(({
                                  children,
                                  defaultCollapsed,
                                  title,
                                  showIcon,
                                  imageUrl,
                                  hasBeenAdopted,
                                  onPress
                              }: ICollapsibleCard) => {
    const [isCollapsed, setCollapsed] = useState<boolean>(defaultCollapsed || true);

    const animationConfig = {
        height: isCollapsed ? 0 : 'auto',
        progress: isCollapsed ? 0 : 100,
        rotation: isCollapsed ? '0deg' : '-180deg',
    };

    const animation = useSpring(animationConfig);
    const AnimatedView = animated(View);

    return (
        <Card
            accessibilityValue={{
                text: isCollapsed ? 'Double-click to expand information' : ' ',
            }}>
            <TouchableOpacity onPress={onPress}>
                {hasBeenAdopted && <Overlay/>}

                {imageUrl ? <Image
                        defaultSource={avatarPlaceholderImg}
                        source={{uri: imageUrl}}
                        style={{
                            width: RFValue(146),
                            height: RFValue(103),
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8
                        }}/> :
                    <Image source={avatarPlaceholderImg}
                           resizeMethod={"scale"}
                           resizeMode={"center"}
                           defaultSource={avatarPlaceholderImg}
                           style={{
                               width: RFValue(146),
                               height: RFValue(103),
                               borderTopLeftRadius: 8,
                               borderTopRightRadius: 8,
                               backgroundColor: theme.colors.gray_100,
                               opacity: 0.3
                           }}/>
                }

                {hasBeenAdopted && (
                    <Tag>
                        <TagText>Adopted</TagText>
                    </Tag>
                )}
            </TouchableOpacity>

            <CardBottom activeOpacity={1} onPress={() => setCollapsed((value) => !value)}>
                {showIcon &&
                    <MaterialCommunityIcons name="check-decagram-outline" size={24} color={theme.colors.green_200}/>}

                <Title accessible accessibilityRole="text">
                    {title}
                </Title>

                <AnimatedView style={{transform: [{rotate: animation.rotation}]}}>
                    <Feather name="chevron-down" size={RFValue(16)} color={theme.colors.gray_250}/>
                </AnimatedView>
            </CardBottom>

            <AnimatedView
                style={{
                    height: animation.height,
                    opacity: animation.progress?.to({
                        range: [0, 85, 95, 100],
                        output: [0, 0, 0.5, 1],
                    }),
                }}
            >
                <AnimatedView
                    style={{
                        transform: [
                            {
                                translateY: animation.progress?.to({
                                    range: [0, 85, 95, 100],
                                    output: [7.5, 5, 2.5, 0],
                                }),
                            },
                        ],
                    }}
                >
                    {children}
                </AnimatedView>
            </AnimatedView>
        </Card>
    );
});

export default CollapsibleCard;