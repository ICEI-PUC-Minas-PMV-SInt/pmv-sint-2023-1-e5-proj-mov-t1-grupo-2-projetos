import {AntDesign, Feather, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Ionicons} from '@expo/vector-icons';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

type IIconType = 'feather' | 'antDesign' | 'materialIcons' | 'simpleLineIcons' | 'materialCommunityIcons' | 'ionicons';

export enum IconType {
    Feather = 'feather',
    AntDesign = 'antDesign',
    MaterialIcons = 'materialIcons',
    SimpleLineIcons = 'simpleLineIcons',
    MaterialCommunityIcons = 'materialCommunityIcons',
    Ionicons = 'ionicons'
}

interface CustomIconProps {
    isActive: boolean;
    iconType: IconType;
    onPress?: () => void;
}

interface IconProps {
    name: string;
    size?: number;
    color?: string;
    paddingLeft?: number;
    paddingRight?: number;
}

const getIconComponent = (iconType: IIconType) => {
    switch (iconType) {
        case 'feather':
            return Feather;
        case 'antDesign':
            return AntDesign;
        case 'materialIcons':
            return MaterialIcons;
        case 'simpleLineIcons':
            return SimpleLineIcons;
        case 'materialCommunityIcons':
            return MaterialCommunityIcons;
        case 'ionicons':
            return Ionicons;
        default:
            return Feather;
    }
};

const getIconColor = (isActive: boolean, theme: any, color?: string) => {
    if (isActive) {
        return theme.colors.purple_300;
    }
    return color ? color : theme.colors.gray_250;
};

export const CustomIcon = styled(({
                                      isActive,
                                      iconType,
                                      paddingLeft,
                                      paddingRight,
                                      color,
                                      ...rest
                                  }: CustomIconProps & IconProps) => {
    const IconComponent = getIconComponent(iconType);
    // @ts-ignore
    return <IconComponent {...rest} />;
})<CustomIconProps & IconProps>`
  ${({paddingLeft}) => paddingLeft !== undefined && `padding-left: ${RFValue(paddingLeft)}px;`}
  ${({paddingRight}) => paddingRight !== undefined && `padding-right: ${RFValue(paddingRight)}px;`}
  color: ${({isActive, theme, color}) => getIconColor(isActive, theme, color)};
`;

export default CustomIcon;