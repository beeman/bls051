import { UiPage } from '../../ui'
import { WalletConnectionLoader } from '../solana'
import { FeatureHomeConnected } from './feature-home-connected.tsx'
import { LucideHome } from 'lucide-react'

export default function FeatureHome() {
  return (
    <UiPage title="Home" icon={<LucideHome />}>
      <WalletConnectionLoader render={(props) => <FeatureHomeConnected {...props} />} />
    </UiPage>
  )
}
