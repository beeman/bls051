import { ReactNode, useMemo } from 'react'

import { GillProviderContext, UmiContext } from './umi-provider-context.tsx'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { mplCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine'
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { useWallet } from '@solana/wallet-adapter-react'

export function UmiProvider({ children, endpoint }: { children: ReactNode; endpoint: string }) {
  const wallet = useWallet()
  const umi = useMemo(() => {
    const umi = createUmi(endpoint)
    umi.use(mplCore())
    umi.use(mplCandyMachine())
    umi.use(walletAdapterIdentity(wallet))

    return umi
  }, [endpoint, wallet])

  const value: GillProviderContext = {
    umi,
  }

  return <UmiContext.Provider value={value}>{children}</UmiContext.Provider>
}
