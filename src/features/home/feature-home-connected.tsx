import { WalletButton, WalletConnectionLoaderRenderer } from '../solana'
import { useBalance } from '../solana/use-balance.tsx'
import { Box, Button, Group, Stack } from '@mantine/core'
import { useRequestAirdrop } from '../solana/use-request-airdrop.tsx'

export function FeatureHomeConnected({ connection, publicKey }: WalletConnectionLoaderRenderer) {
  const mutationRequestAirdrop = useRequestAirdrop({ connection, publicKey })
  const queryBalance = useBalance({ connection, publicKey })
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
      <Box component="pre" fz="xs">
        {JSON.stringify(
          {
            endpoint: connection.rpcEndpoint,
            balance: balance,
            publicKey,
          },
          null,
          2,
        )}
      </Box>
    </Stack>
  )
}
