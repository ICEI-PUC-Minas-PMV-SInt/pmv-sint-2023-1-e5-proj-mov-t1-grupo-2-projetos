import React, {useCallback, useEffect, useState} from "react";
import {ParamListBase, useFocusEffect, useNavigation} from "@react-navigation/native";
import {ActivityIndicator, FlatList, Platform, View} from "react-native";
import {api} from "src/configs/api";
import {RootStackParamList, ScreenName} from "src/routes/types";
import Background from "src/components/Background";
import Header from "src/components/Header";
import {DropdownWrapper} from "src/screens/Volunteers/styles";
import Dropdown from "src/components/Dropdown";
import Total from "src/components/Total";
import {RFValue} from "react-native-responsive-fontsize";
import Card from "src/components/Card";
import Button from "src/components/Button";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {ShelterVisitProps} from "src/screens/ShelterVisit/types";
import GenericModal from "src/components/GenericModal";
import theme from "src/styles/theme";

type INavigation = DrawerNavigationProp<ParamListBase, 'newSchedules'>

const ShelterVisit = () => {
    const [visits, setVisits] = useState<ShelterVisitProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterValue, setFilterValue] = useState(0);
    const [filteredVisits, setFilteredVisits] = useState<ShelterVisitProps[]>([]);
    const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [cardToBeDeleted, setCardToBeDeleted] = useState<number>(0)

    const navigation = useNavigation<INavigation>()
    const ios = Platform.OS === 'ios'

    const buildFilterItems = () => {
        const items = visits.map((item) => {
            return {label: item.name, value: item.id}
        })
        items.unshift({label: 'All', value: 0})
        return items
    }


    const handleFilterValue = (value: number) => {
        setFilterValue(value)
    }

    useEffect(() => {
        const filteredValue: ShelterVisitProps[] = visits.filter(item => item.id === filterValue)
        setFilteredVisits(filteredValue && filteredValue.length > 0 ? filteredValue : visits)
    }, [filterValue, visits])

    async function fetchShelterVisits() {
        setLoading(true)
        try {
            const response = await api.get('/shelter-visits');
            const visitsData = response.data.map(visits => ({
                ...visits,
                date: new Date(visits.date),
            }));

            setVisits(visitsData)
            setFilteredVisits(visitsData)
        } catch (error) {
            console.log(error, 'erro')
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchShelterVisits();
            return () => {
            };
        }, [])
    );

    const formatTime = (hour: number, minute: number) => {
        const amOrPm = hour >= 12 ? 'pm' : 'am';
        const adjustedHour = hour % 12 || 12;
        const formattedMinute = String(minute).padStart(2, '0');
        return `${adjustedHour}:${formattedMinute} ${amOrPm}`;
    };

    const filterItemsVisitsName = (text) => {
        const filtered = visits.filter((item) => {
            return item.name.includes(text)
        })
        setFilteredVisits(filtered)
        setFilterValue(null)
    }

    const handleGoToForm = (visits: ShelterVisitProps) => {
        navigation.navigate(ScreenName.STEP_ONE_NEW_SCHEDULES, visits)
    }

    const handleDelete = (selected: number) => {
        setLoadingDelete(true)

        async function deleteVisit() {

            try {
                await api.delete(`/shelter-visits/${selected}`);

            } catch (error) {
                console.log(error, 'error')
            } finally {
                setVisits(
                    visits.filter((item) => {
                        return item.id !== selected
                    }))
                setLoadingDelete(false)
                setIsVisibleDeleteModal(false)

            }
        }

        deleteVisit()
    }

    const handleOpenDeleteModal = (id: number) => {
        setIsVisibleDeleteModal(true)
        setCardToBeDeleted(id)
    }

    return (
        <Background
            style={{height: '71%'}}
            headerChildren={
                <>
                    <Header title="Shelter Visit"/>
                    <DropdownWrapper style={ios && {zIndex: 400}}>
                        <Dropdown
                            zIndex={4000}
                            zIndexInverse={5000}
                            items={buildFilterItems()}
                            placeholder=""
                            setValue={handleFilterValue}
                            value={filterValue}
                            onChangeSearchText={filterItemsVisitsName}
                        />
                        <Total content={`${visits.length} visits`}
                               style={{top: ios ? `${RFValue(30)}px` : `${RFValue(12)}px`}}/>
                    </DropdownWrapper>

                </>
            }
        >
            <>
                {loading ?
                    <View style={{
                        justifyContent: 'center',
                        width: '100%', height: '60%'
                    }}>
                        <ActivityIndicator color={theme.colors.purple_300} size="large"
                        />
                    </View>
                    :
                    <FlatList style={{height: '88%', marginTop: RFValue(-10)}}
                              data={filteredVisits}
                              keyExtractor={item => item.id}
                              renderItem={({item}) => (
                                  <View style={{marginBottom: RFValue(10)}}>
                                      <Card name={item.name}
                                            phone={`Phone: ${item.phone}`}
                                            email={`Email: ${item.email}`}
                                            date={`Day: ${item.date.toISOString().substring(0, 10)}`}
                                            hour={`Hour: ${formatTime(item.hour, item.minute)}`}
                                            textAlign='center'
                                            paddingRight={RFValue(20)}
                                            paddingLeft={RFValue(20)}
                                            showDeleteIcon
                                            onPress={() => handleGoToForm(item)}
                                            handleDelete={() => handleOpenDeleteModal(item.id)}

                                      />
                                  </View>
                              )}/>

                }

                <GenericModal leftButtonOnPress={() => setIsVisibleDeleteModal(false)} leftButtonTitle="Cancel"
                              loading={loadingDelete}
                              onRequestClose={() => setIsVisibleDeleteModal(false)}
                              rightButtonOnPress={() => handleDelete(cardToBeDeleted)} rightButtonTitle="Delete"
                              title="Are you sure you want to delete it?"
                              visible={isVisibleDeleteModal}/>
                <Button
                    text="New Visit"
                    onPress={() => navigation.navigate(ScreenName.STEP_ONE_NEW_SCHEDULES)}
                />
            </>
        </Background>
    )
}


export default ShelterVisit;