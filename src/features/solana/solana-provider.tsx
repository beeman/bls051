import { WalletModalProvider, WalletMultiButton, WalletMultiIcon } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { WalletError } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { ReactNode, useCallback } from 'react'
import { UmiProvider } from './umi-provider.tsx'

export const WalletButton = WalletMultiButton
export const WalletIcon = WalletMultiIcon

const endpoint = 'https://api.devnet.solana.com'

export function SolanaProvider({ children }: { children: ReactNode }) {
  const onError = useCallback((error: WalletError) => {
    console.error(error)
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} onError={onError} autoConnect>
        <WalletModalProvider>
          <UmiProvider endpoint={endpoint}>{children}</UmiProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
