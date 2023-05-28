import {ReactNode} from 'react'

export interface ICollapsibleCard {
    children: ReactNode
    defaultCollapsed: boolean
    title: string
    subtitle?: string
    showIcon: boolean
    imageUrl: string
    hasBeenAdopted: boolean
    onPress: () => void
}
