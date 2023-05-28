import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import AdoptersGreyIcon from 'src/assets/adopters-grey.svg';
import AnimalsGreyIcon from 'src/assets/animals-grey.svg';
import VolunteersGreyIcon from 'src/assets/volunteers-grey.svg';
import CustomIcon, {IconType} from 'src/components/CustomIcon';
import ChangePasswordModal from 'src/components/SideMenu/ChangePassword';
import SectionItem from 'src/components/SideMenu/Section';
import {MenuItemsWrapper, SettingsTitle} from 'src/components/SideMenu/styles';
import {useAuth} from 'src/hooks/Auth/auth';
import {ScreenName} from 'src/routes/types';
import {cardInfo} from 'src/screens/Home/Card';
import {ICardData} from 'src/screens/Home/Card/types';
import {TouchableOpacity, View} from "react-native";

const SideMenu = () => {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [showSettingsItems, setShowSettingsItems] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const {signOut} = useAuth();

    const toggleSettingsItems = () => {
        setShowSettingsItems(!showSettingsItems);
    };

    const handleShowChangePasswordModal = () => {
        setShowChangePasswordModal(!showChangePasswordModal);
    };

    const navigateTo = (screenName: keyof typeof ScreenName) => () => {
        navigation.navigate(screenName);
    };

    const renderSvgOrIcon = (menu: ICardData) => {
        if (menu.svgIcon) {
            switch (menu.screenName) {
                case ScreenName.ADOPTERS:
                    return (<AdoptersGreyIcon width={RFValue(24)} height={RFValue(24)}/>);
                case ScreenName.ANIMALS:
                    return (<AnimalsGreyIcon width={RFValue(24)} height={RFValue(24)}/>);
                case ScreenName.VOLUNTEERS:
                    return (<VolunteersGreyIcon width={RFValue(24)} height={RFValue(24)}/>);

            }
        } else if (menu.iconName && menu.type) {
            return (
                <CustomIcon
                    name={menu.iconName}
                    iconType={menu.type}
                    size={RFValue(24)}
                    isActive={false}
                />
            );
        }
    };

    const renderSettingsAccessItems = () => (
        <>
            <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginLeft: 1, marginTop: 6}}
                onPress={toggleSettingsItems}>

                <CustomIcon
                    name="chevron-left"
                    iconType={IconType.Feather}
                    size={RFValue(24)}
                    isActive={false}


                />
                <View style={{marginLeft: 10}}>
                    <SettingsTitle>Settings</SettingsTitle>
                </View>
            </TouchableOpacity>
            <SectionItem
                title="Change Password"
                accessibilityLabel="Change Password"
                onPress={handleShowChangePasswordModal}
                customIcon={
                    <CustomIcon
                        name="lock"
                        iconType={IconType.Feather}
                        size={RFValue(24)}
                        isActive={false}
                    />
                }
            />
        </>
    );

    const renderDefaultItems = () => (
        <>
            {cardInfo.map((menu) => (
                <SectionItem
                    key={menu.title}
                    title={menu.title}
                    accessibilityLabel={menu.title}
                    customIcon={renderSvgOrIcon(menu)}
                    onPress={navigateTo(menu.screenName)}
                />
            ))}
            <SectionItem
                title="Settings"
                accessibilityLabel="Settings"
                customIcon={
                    <CustomIcon
                        name="settings"
                        iconType={IconType.Feather}
                        size={RFValue(24)}
                        isActive={false}
                    />
                }
                onPress={toggleSettingsItems}/>


        </>
    );

    return (
        <>

            <ChangePasswordModal isVisible={showChangePasswordModal} handleShow={handleShowChangePasswordModal}/>

            <MenuItemsWrapper>
                {showSettingsItems ? renderSettingsAccessItems() : renderDefaultItems()}
            </MenuItemsWrapper>
            <View style={{marginBottom: RFValue(26)}}>
                <SectionItem
                    title="Logout"
                    accessibilityLabel="Logout"
                    onPress={signOut}
                    customIcon={
                        <CustomIcon
                            name="logout"
                            iconType={IconType.MaterialCommunityIcons}
                            size={RFValue(24)}
                            isActive={false}
                        />

                    }
                />
            </View>
        </>
    );
};

export default SideMenu;