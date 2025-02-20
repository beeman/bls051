import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { useConnection, useWallet, Wallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey } from '@solana/web3.js'
import { ReactNode } from 'react'

export interface WalletConnectionLoaderRenderer {
  connection: Connection
  publicKey: PublicKey
  wallet: Wallet
}

export function WalletConnectionLoader({
  render,
}: {
  render: ({ wallet, connection }: WalletConnectionLoaderRenderer) => ReactNode
}) {
  const { wallet } = useWallet()
  const { connection } = useConnection()
  const publicKey = wallet?.adapter.publicKey

  if (!connection) {
    return null
  }

  if (!wallet || !publicKey) {
    return <WalletMultiButton />
  }

  return render({ connection, publicKey, wallet })
}
