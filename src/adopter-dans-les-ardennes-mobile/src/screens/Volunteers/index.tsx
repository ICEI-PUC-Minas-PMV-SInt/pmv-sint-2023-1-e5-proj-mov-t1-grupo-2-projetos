import React, {useCallback, useEffect, useState} from "react";
import { FlatList, Platform, View} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";

import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";

import Dropdown from "src/components/Dropdown";
import Total from "src/components/Total";
import Button from "src/components/Button";
import Card from "src/components/Card";
import Background from "src/components/Background";
import Header from "src/components/Header";

import {api} from "src/configs/api";

import {IVolunteers} from "src/screens/Volunteers/types";
import {RootStackParamList, ScreenName} from "src/routes/types";

import {DropdownWrapper} from "./styles";

import LoadingIndicator from "src/components/LoadingIndicator";

type INavigation = DrawerNavigationProp<RootStackParamList, 'newVolunteers'>

const Volunteers = () => {
    const [volunteers, setVolunteers] = useState<IVolunteers[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterValue, setFilterValue] = useState(2);
    const [filteredVolunteers, setFilteredVolunteers] = useState<IVolunteers[]>([]);

    const navigation = useNavigation<INavigation>()
    const ios = Platform.OS === 'ios'

    const itemsVolunteersList = [
        {label: 'All', value: 1},
        {label: 'Available', value: 2},
        {label: 'Unavailable', value: 3}
    ]

    const handleFilterValue = (value: number) => {
        setFilterValue(value)
    }

    useEffect(() => {
        let filteredValue: IVolunteers[]
        switch (filterValue) {
            case 2:
                filteredValue = volunteers.filter(item => item.active)
                break;
            case 3:
                filteredValue = volunteers.filter(item => !item.active)
                break;

            default:
                filteredValue = volunteers
                break;
        }
        setFilteredVolunteers(filteredValue)
    }, [filterValue, volunteers])

    const fetchVolunteers = async () => {
        setLoading(true)
        try {
            const response = await api.get('/volunteers');
            setVolunteers(response.data)
            setFilteredVolunteers(response.data)
        } catch (error) {
            console.log(error, 'erro')
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchVolunteers();
            return () => {};
        }, [])
    );

    const formattedDays = (days: string[]) => {
        return days
            .map((item: string, index: number, array: string[]) => {
                const formattedItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
                if (index === array.length - 1 && array.length > 1) {
                    return " and " + formattedItem;
                } else if (index === 0) {
                    return formattedItem;
                } else {
                    return ", " + formattedItem;
                }
            })
            .join('');
    };

    const formatTime = (hour: number, minute: number) => {
        const amOrPm = hour >= 12 ? 'pm' : 'am';
        const adjustedHour = hour % 12 || 12;
        const formattedMinute = String(minute).padStart(2, '0');
        return `${adjustedHour}:${formattedMinute} ${amOrPm}`;
    };

    const filterItemsVolunteersName = (text) => {
        console.log(text)
        const filtered = volunteers.filter((item) => {
            return item.name.includes(text)
        })
        setFilteredVolunteers(filtered)
    }

    const handleGoToForm = (volunteer: IVolunteers) => {
        navigation.navigate(ScreenName.STEP_ONE_NEW_VOLUNTEERS, volunteer)
    }

    return (
        <Background
            style={{height: '71%'}}
            headerChildren={
                <>
                    <Header title="Volunteers"/>
                    <DropdownWrapper style={ios && {zIndex: 400}}>
                        <Dropdown
                            zIndex={4000}
                            zIndexInverse={5000}
                            items={itemsVolunteersList}
                            placeholder=""
                            setValue={handleFilterValue}
                            value={filterValue}
                            onChangeSearchText={filterItemsVolunteersName}
                        />
                        <Total content={`${filteredVolunteers.length} volunteers`}
                               style={{top: ios ? `${RFValue(30)}px` :`${RFValue(12)}px`}}/>
                    </DropdownWrapper>

                </>
            }>

            {loading ?
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <LoadingIndicator size="large"/>
                </View> :
                <>
                    <FlatList style={{height: '82%'}}
                              data={filteredVolunteers}
                              keyExtractor={item => item.id}
                              renderItem={({item}) => (
                                  <View style={{marginBottom: RFValue(10)}}>
                                      <Card name={item.name} active={item.active} showBorder showAvatar textAlign='left'
                                            img={item.imageUrl}
                                            date={`Days: ${formattedDays(item.days)}`}
                                            hour={`from ${formatTime(item.startTimeHour, item.startTimeMinute)} to ${formatTime(item.endTimeHour, item.endTimeMinute)}`}
                                            onPress={() => handleGoToForm(item)}
                                      />
                                  </View>
                              )}/>
                    <Button
                        text="New volunteer"
                        onPress={() => navigation.navigate(ScreenName.STEP_ONE_NEW_VOLUNTEERS)}
                    />
                </>
            }

        </Background>
    )
}

export default Volunteers;