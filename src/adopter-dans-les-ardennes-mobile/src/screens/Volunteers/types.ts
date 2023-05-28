export interface IVolunteers {
    id: number,
    notes: string,
    scheduleId: number,
    days: string[],
    startTimeHour: number,
    startTimeMinute: number,
    endTimeHour: number,
    endTimeMinute: number,
    name: string,
    imageUrl: string,
    address: string,
    phone: string,
    email: string,
    scheduleString: string,
    active: boolean
    imageBase64?: string
}