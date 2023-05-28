import React from 'react';
import { View } from 'react-native';
import { ISectionItem } from 'src/components/SideMenu/Section/types';
import { Section, SectionContainer, SectionTitle } from './styles';

const SectionItem = ({
                         title,
                         accessibilityLabel,
                         onPress,
                         customIcon,
                     }: ISectionItem) => (
    <Section accessible accessibilityLabel={accessibilityLabel} onPress={onPress}>
        <View
            style={{
                flex: 1,
                maxWidth: 50,
                alignItems: 'center',
                justifyContent:  'center',
            }}
        >
            {customIcon}
        </View>
        <SectionContainer>
            <SectionTitle>{title}</SectionTitle>
        </SectionContainer>
        <View/>
    </Section>
);

export default SectionItem;
