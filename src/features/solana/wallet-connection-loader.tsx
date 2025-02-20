import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { useConnection, useWallet, Wallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'
import { ReactNode } from 'react'

export interface WalletConnectionLoaderRenderer {
  connection: Connection
  wallet: Wallet
}

export function WalletConnectionLoader({
  render,
}: {
  render: ({ wallet, connection }: WalletConnectionLoaderRenderer) => ReactNode
}) {
  const { wallet } = useWallet()
  const { connection } = useConnection()

  if (!connection) {
    return null
  }
  if (!wallet) {
    return <WalletMultiButton />
  }

  return render({ wallet, connection })
}
