import { WalletConnectionLoaderRenderer } from './index.ts'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useBalance({ connection, wallet }: WalletConnectionLoaderRenderer) {
  const endpoint = connection.rpcEndpoint
  const publicKey = wallet.adapter.publicKey!

  return useQuery({
    queryKey: ['balance', { publicKey, endpoint }],
    queryFn: async () => await connection.getBalance(publicKey),
  })
}

export function useRequestAirdrop({ connection, wallet }: WalletConnectionLoaderRenderer) {
  const publicKey = wallet.adapter.publicKey!

  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => await connection.requestAirdrop(publicKey, amount * 1e9),
  })
}
