import { WalletConnectionLoaderRenderer } from './wallet-connection-loader.tsx'
import { useMutation } from '@tanstack/react-query'

export function useRequestAirdrop({ connection, publicKey }: Omit<WalletConnectionLoaderRenderer, 'wallet'>) {
  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => await connection.requestAirdrop(publicKey, amount * 1e9),
  })
}
