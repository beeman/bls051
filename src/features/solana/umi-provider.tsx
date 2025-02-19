import { ReactNode, useMemo } from 'react'

import { GillProviderContext, UmiContext } from './umi-provider-context.tsx'

export function UmiProvider({ children, endpoint }: { children: ReactNode; endpoint: string }) {
  const umi = useMemo(() => {
    // TODO: Replace with UMI initialization
    console.log(`TODO: Initialize UMI here`)
    return `INITIALIZE UMI WITH ENDPOINT ${endpoint}`
  }, [endpoint])

  const value: GillProviderContext = {
    umi,
  }

  return <UmiContext.Provider value={value}>{children}</UmiContext.Provider>
}
