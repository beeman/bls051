import { ReactNode } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  activeClusterAtom,
  activeClustersAtom,
  Cluster,
  clusterAtom,
  ClusterProviderContextValues,
  ClusterProviderContextX,
  clustersAtom,
  getClusterUrlParam,
} from './cluster-provider-context'

export function ClusterProvider({ children }: { children: ReactNode }) {
  const cluster = useAtomValue(activeClusterAtom)
  const clusters = useAtomValue(activeClustersAtom)
  const setCluster = useSetAtom(clusterAtom)
  const setClusters = useSetAtom(clustersAtom)

  const value: ClusterProviderContextValues = {
    cluster,
    clusters: clusters.sort((a, b) => (a.name > b.name ? 1 : -1)),
    addCluster: (cluster: Cluster) => {
      setClusters([...clusters, cluster])
    },
    deleteCluster: (cluster: Cluster) => {
      setClusters(clusters.filter((item) => item.name !== cluster.name))
    },
    setCluster: (cluster: Cluster) => setCluster(cluster),
    getExplorerUrl: (path: string) => `https://explorer.solana.com/${path}${getClusterUrlParam(cluster)}`,
  }
  return <ClusterProviderContextX.Provider value={value}>{children}</ClusterProviderContextX.Provider>
}
