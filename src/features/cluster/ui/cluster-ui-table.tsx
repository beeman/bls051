import { Anchor, Button, Table, Text } from '@mantine/core'
import { LucideTrash } from 'lucide-react'
import { useCluster } from '../data-access'

export function ClusterUiTable() {
  const { clusters, setCluster, deleteCluster } = useCluster()
  return (
    <div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name / Network / Endpoint</Table.Th>
            <Table.Th align="center">Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {clusters.map((item) => (
            <Table.Tr key={item.name}>
              <Table.Td>
                <Text size="lg">
                  {item?.active ? (
                    item.name
                  ) : (
                    <Anchor component="button" title="Select cluster" onClick={() => setCluster(item)}>
                      {item.name}
                    </Anchor>
                  )}
                </Text>
                <Text size="xs">Network: {item.network ?? 'custom'}</Text>
                <div>{obfuscateSecret(item.endpoint)}</div>
              </Table.Td>
              <Table.Td>
                <Button
                  disabled={item?.active}
                  onClick={() => {
                    if (!window.confirm('Are you sure?')) {
                      return
                    }
                    deleteCluster(item)
                  }}
                >
                  <LucideTrash size={16} />
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}

function obfuscateSecret(url: string) {
  return url.replace(url.split('=')[1], '[REDACTED]')
}
