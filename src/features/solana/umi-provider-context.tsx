import { createContext, useContext } from 'react'

export interface GillProviderContext {
  // TODO: Replace with UMI
  umi: string
}

export const UmiContext = createContext<GillProviderContext>({} as GillProviderContext)

export function useGill() {
  return useContext(UmiContext)
}
