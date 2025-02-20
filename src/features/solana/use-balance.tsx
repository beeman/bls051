import { WalletConnectionLoaderRenderer } from './index.ts'
import { useQuery } from '@tanstack/react-query'

export function useBalance({ connection, publicKey }: Omit<WalletConnectionLoaderRenderer, 'wallet'>) {
  return useQuery({
    queryKey: ['balance', { publicKey, endpoint: connection.rpcEndpoint }],
    queryFn: async () => await connection.getBalance(publicKey),
  })
}
