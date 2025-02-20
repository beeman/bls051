import { createContext, useContext } from 'react'
import { Umi } from '@metaplex-foundation/umi'

export interface GillProviderContext {
  umi: Umi
}

export const UmiContext = createContext<GillProviderContext>({} as GillProviderContext)

export function useUmi() {
  return useContext(UmiContext)
}
