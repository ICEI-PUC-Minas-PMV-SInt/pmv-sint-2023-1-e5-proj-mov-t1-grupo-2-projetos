import { ReactNode } from 'react';

export interface ISectionItem {
  title: string
  iconName?: string
  accessibilityLabel?: string
  onPress?: () => void
  customIcon?: ReactNode
  chevronRight?: boolean
  children?: ReactNode
  styled?: { justifyContent: string }
}
