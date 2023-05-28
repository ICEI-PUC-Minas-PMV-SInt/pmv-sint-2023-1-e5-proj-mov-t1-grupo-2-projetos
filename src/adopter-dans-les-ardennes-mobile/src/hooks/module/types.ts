import { ReactNode } from 'react'

export interface IModuleContext {
  selectedModule: string | null

  setModule(name: string): void
}

export interface IModuleProvider {
  children: ReactNode
}
