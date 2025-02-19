import { ActionIcon, Alert, Group, Text } from '@mantine/core'
import { useConnection } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { LucideRefreshCw } from 'lucide-react'
import { ReactNode } from 'react'
import { useCluster } from '../data-access'

export function ClusterUiChecker({ children }: { children: ReactNode }) {
  const { cluster } = useCluster()
  const { connection } = useConnection()

  const query = useQuery({
    queryKey: ['version', { cluster, endpoint: connection.rpcEndpoint }],
    queryFn: () => connection.getVersion(),
    retry: 1,
  })
  if (query.isLoading) {
    return null
  }
  if (query.isError || !query.data) {
    return (
      <Alert
        variant="outline"
        color="yellow"
        styles={{
          label: { width: '100%' },
        }}
        title={
          <Group justify="center" gap="xs">
            <Text>
              Error connecting to cluster <strong>{cluster.name}</strong>
            </Text>
            <ActionIcon variant="light" color="yellow" size="sm" onClick={() => query.refetch()}>
              <LucideRefreshCw size={16} />
            </ActionIcon>
          </Group>
        }
      />
    )
  }
  return children
}
