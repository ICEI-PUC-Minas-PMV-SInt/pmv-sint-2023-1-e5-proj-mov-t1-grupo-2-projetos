export interface IAnimals {
    id: number;
    code: string,
    name: string,
    breed: string,
    arrivalDate: Date;
    imageUrl: string,
    gender: string,
    age: Date,
    vaccinated: boolean,
    castrated: boolean,
    wormed: boolean,
    electronicChip: string,
    illness: string,
    notes: string,
    isAvailable: boolean,
    hasBeenAdopted: boolean
}

export const itemsAnimalsList = [
    {label: 'All', value: 1},
    {label: 'Available', value: 2},
    {label: 'Unavailable', value: 3},
    {label: 'Adopted', value: 4}
];