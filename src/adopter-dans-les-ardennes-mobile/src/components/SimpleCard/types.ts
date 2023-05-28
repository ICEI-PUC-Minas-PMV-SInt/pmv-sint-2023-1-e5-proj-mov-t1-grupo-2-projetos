import { ReactNode } from 'react'
import { IconType } from 'src/components/CustomIcon';

export interface ISimpleCard {
  title: string
  iconName?: string | undefined
  iconType?: IconType | undefined
  children?: ReactNode
  onPress: () => void
}
