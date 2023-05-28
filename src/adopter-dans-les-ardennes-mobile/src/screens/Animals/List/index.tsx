import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase, useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, Platform, ScrollView, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import Background from 'src/components/Background';
import Button from 'src/components/Button';
import CollapsibleCard from 'src/components/CollapsibleCard';
import Dropdown from 'src/components/Dropdown';
import Header from 'src/components/Header';
import LoadingIndicator from 'src/components/LoadingIndicator';
import Total from 'src/components/Total';

import {api} from 'src/configs/api';

import {ScreenName} from 'src/routes/types';
import {IAnimals, itemsAnimalsList} from 'src/screens/Animals/List/types';

import {CollapsibleCardWrapper, Content, DropdownWrapper, Label, Text} from './styles';

type INavigation = DrawerNavigationProp<ParamListBase, 'animals'>

const Animals = () => {
    const [animals, setAnimals] = useState<IAnimals[]>([]);
    const [filteredAnimals, setFilteredAnimals] = useState<IAnimals[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterValue, setFilterValue] = useState(1);

    const navigation = useNavigation<INavigation>();
    const isAndroid = Platform.OS === 'android';

    const fetchAnimals = async () => {
        try {
            const response = await api.get('/animals');
            const animalsData = response.data.map(animal => ({
                ...animal,
                age: new Date(animal.age),
                arrivalDate: new Date(animal.arrivalDate),
            }));
            setAnimals(animalsData);
            setFilteredAnimals(animalsData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchAnimals();
            return () => {};
        }, [])
    );

    const handleFilterValue = useCallback((value: string | number | boolean) => {
            let filtered: IAnimals[];
            switch (value) {
                case 2:
                    filtered = animals.filter(
                        (animal) => animal.isAvailable && !animal.hasBeenAdopted
                    );
                    break;
                case 3:
                    filtered = animals.filter((animal) => !animal.isAvailable && !animal.hasBeenAdopted);
                    break;
                case 4:
                    filtered = animals.filter((animal) => animal.hasBeenAdopted);
                    break;
                default:
                    filtered = animals;
            }
            setFilteredAnimals(filtered);
            setFilterValue(Number(value))
        },
        [animals]
    );

    const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth);
        const currentDate = new Date();

        const yearDiff = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();
        const dayDiff = currentDate.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            return yearDiff - 1;
        } else if (monthDiff === 0 && dayDiff === 0) {
            return yearDiff;
        } else {
            return yearDiff;
        }
    };

    const getAgeString = (dateOfBirth) => {
        const age = calculateAge(dateOfBirth);

        if (age === 0) {
            const birthDate = new Date(dateOfBirth);
            const currentDate = new Date();
            const monthDiff = currentDate.getMonth() - birthDate.getMonth();
            const dayDiff = currentDate.getDate() - birthDate.getDate();

            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                return `${Math.abs(monthDiff)} months`;
            } else if (monthDiff === 0 && dayDiff === 0) {
                return "0 days";
            } else if (dayDiff === 1) {
                return "1 day";
            } else {
                return `${Math.abs(dayDiff)} days`;
            }
        } else if (age === 1) {
            return "1 year";
        } else {
            return `${age} years`;
        }
    };

    return (
        <Background
            style={{height: '71%'}}
            headerChildren={
                <>
                    <Header title="Animals"/>
                    <DropdownWrapper style={!isAndroid && {zIndex: 400}}>
                        <Dropdown zIndex={4000} zIndexInverse={5000}
                                  items={itemsAnimalsList} placeholder=""
                                  onSelectItem={(item => handleFilterValue(Array.isArray(item) ? item[0].value : item.value))}
                                  value={filterValue}/>
                        <Total content={`${filteredAnimals.length} Animals`}
                               style={{top: !isAndroid ? `${RFValue(30)}px` : `${RFValue(12)}px`}}/>
                    </DropdownWrapper>

                </>
            }>
            {loading ? <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <LoadingIndicator size="large"/>
                </View> :
                <>
                    <FlatList style={{height: '88%', marginTop: RFValue(-10)}}
                              data={filteredAnimals}
                              keyExtractor={item => item.id.toString()}
                              renderItem={({item}) => (

                                  <CollapsibleCardWrapper>
                                      <CollapsibleCard
                                          defaultCollapsed
                                          showIcon={item.isAvailable && !item.hasBeenAdopted}
                                          title={item.name}
                                          imageUrl={item.imageUrl && item.imageUrl}
                                          hasBeenAdopted={item.hasBeenAdopted}
                                          children={

                                              <ScrollView style={{
                                                  marginBottom: RFValue(10),
                                              }}>
                                                  <Content>
                                                      <Label>Gender</Label>
                                                      <Text>{item.gender.charAt(0).toUpperCase() + item.gender.slice(1).toLowerCase()}</Text>
                                                  </Content>
                                                  <Content>
                                                      <Label>Age</Label>
                                                      <Text>{getAgeString(item.age)}</Text>
                                                  </Content>
                                                  <Content>
                                                      <Label>Breed</Label>
                                                      <Text>{item.breed}</Text>
                                                  </Content>
                                                  <Content>
                                                      <Label>illness</Label>
                                                      <Text>{item.illness}</Text>
                                                  </Content>
                                                  <Content>
                                                      <Label>Vaccinated</Label>
                                                      <Text>{item.vaccinated ? 'Yes' : 'No'}</Text>
                                                  </Content>
                                                  <Content>
                                                      <Label>Dewormed</Label>
                                                      <Text>{item.wormed ? 'Yes' : 'No'}</Text>
                                                  </Content>
                                                  <Content>
                                                      <Label>Castrated</Label>
                                                      <Text>{item.castrated ? 'Yes' : 'No'}</Text>
                                                  </Content>
                                                  <Content>
                                                      <Label>Notes</Label>
                                                      <Text>{item.notes}</Text>
                                                  </Content>
                                              </ScrollView>
                                          }
                                          onPress={() => navigation.navigate(ScreenName.REGISTER, item)}
                                      />
                                  </CollapsibleCardWrapper>
                              )}
                              numColumns={2}
                    />

                    <Button
                        text="New animal"
                        onPress={() => navigation.navigate(ScreenName.REGISTER)}
                    />
                </>
            }

        </Background>
    );
};

export default Animals;
