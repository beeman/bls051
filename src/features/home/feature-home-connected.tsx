import { WalletButton, WalletConnectionLoaderRenderer } from '../solana'
import { useBalance, useRequestAirdrop } from '../solana/use-balance.tsx'
import { Button, Group, Stack } from '@mantine/core'

export function FeatureHomeConnected({ connection, wallet }: WalletConnectionLoaderRenderer) {
  const mutationRequestAirdrop = useRequestAirdrop({ connection, wallet })
  const queryBalance = useBalance({ connection, wallet })
  const balance = queryBalance.data ? (queryBalance.data / 1e9).toFixed(2) : '0'

  return (
    <Stack align="flex-start">
      <Group>
        <WalletButton variant="light" />
        <Button
          disabled={queryBalance.isLoading || Number(queryBalance.data) > 0}
          loading={mutationRequestAirdrop.isPending}
          onClick={() => mutationRequestAirdrop.mutateAsync({ amount: 1 }).then(() => queryBalance.refetch())}
        >
          Request airdrop
        </Button>
      </Group>
      <pre>
        {JSON.stringify(
          {
            publicKey: wallet.adapter.publicKey?.toString(),
            endpoint: connection.rpcEndpoint,
            balance: balance,
          },
          null,
          2,
        )}
      </pre>
    </Stack>
  )
}
