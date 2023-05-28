import { ReactNode } from 'react'
import { IBackgroundStyle } from 'src/components/Background/styles'

export interface IBackground {
  headerChildren: ReactNode
  children: ReactNode
  style?: IBackgroundStyle
}
