import {RFValue} from 'react-native-responsive-fontsize';
import AnimalIcon from 'src/assets/animals.svg';
import VolunteersIcon from 'src/assets/volunteers.svg';
import {IconType} from 'src/components/CustomIcon';

import SimpleCard from 'src/components/SimpleCard';

import {ScreenName} from 'src/routes/types';
import {ICard, ICardData} from 'src/screens/Home/Card/types';

export const cardInfo: ICardData[] = [
    {
        key: 1,
        title: 'Animals',
        svgIcon: null,
        iconName: 'paw-outline',
        type: IconType.Ionicons,
        screenName: ScreenName.ANIMALS,
    },
    {
        key: 2,
        title: 'Volunteers',
        svgIcon: <VolunteersIcon width={RFValue(14)} height={RFValue(14)}/>,
        iconName: null,
        type: null,
        screenName: ScreenName.VOLUNTEERS
    },
    {
        key: 3,
        title: 'Shelter Visit',
        iconName: 'calendar',
        type: IconType.Feather,
        svgIcon: null,
        screenName: ScreenName.SHELTER_VISIT
    },
    {
        key: 4,
        title: 'Processes',
        iconName: 'idcard',
        type: IconType.AntDesign,
        svgIcon: null,
        screenName: ScreenName.PROCESSES
    }
];

const Card = ({handleNavigation}: ICard) => {
    return (
        <>
            {cardInfo.map((item) => {
                return (
                    item.iconName ?
                        <SimpleCard
                            key={item.key}
                            iconName={item.iconName}
                            iconType={item.type}
                            title={item.title}
                            onPress={() => handleNavigation(item.screenName)}
                        />
                        :
                        <SimpleCard
                            key={item.key}
                            title={item.title}
                            children={item.svgIcon}
                            onPress={() => handleNavigation(item.screenName)}
                        />
                );
            })}
        </>
    );
};

export default Card;
