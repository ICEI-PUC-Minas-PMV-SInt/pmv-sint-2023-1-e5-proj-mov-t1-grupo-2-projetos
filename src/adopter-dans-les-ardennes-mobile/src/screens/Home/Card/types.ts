import { ReactNode } from 'react';
import { IconType } from 'src/components/CustomIcon';

export interface ICardData {
  title: string
  key: number
  svgIcon: ReactNode | null
  iconName: string | null
  type: IconType | null
  screenName: string
}

export interface ICard {
  handleNavigation: (screenName: string) => void
}
