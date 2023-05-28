import { IModuleContext, IModuleProvider } from './types'
import React, { createContext, useCallback, useContext, useState } from 'react'

const ModuleContext = createContext<IModuleContext | undefined>(undefined)

const ModuleProvider = ({ children }: IModuleProvider) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  const setModule = useCallback((name: string) => {
    setSelectedModule(name)
  }, [])

  return (
    <ModuleContext.Provider value={{ selectedModule, setModule }}>
      {children}
    </ModuleContext.Provider>
  )
}

const useModule = () => {
  const context = useContext(ModuleContext)

  if (context === undefined) {
    throw new Error('useModule must be used within a ModuleProvider.')
  }

  return context
}

export { ModuleProvider, useModule }
