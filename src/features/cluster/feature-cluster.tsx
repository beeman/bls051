import { LucideNetwork } from 'lucide-react'
import { useRoutes } from 'react-router'
import { ClusterUiModal, ClusterUiTable } from './ui'
import { UiPage } from '../../ui'

export default function FeatureCluster() {
  return useRoutes([
    {
      path: '',
      element: <UiPage title="Clusters" icon={<LucideNetwork size={24} />} action={<ClusterUiModal size="xs" />} />,
      children: [{ index: true, element: <ClusterUiTable /> }],
    },
  ])
}
