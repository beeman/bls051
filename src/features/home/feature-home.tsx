import { UiPage } from '../../ui'
import { WalletConnectionLoader } from '../solana'
import { FeatureHomeConnected } from './feature-home-connected.tsx'

export default function FeatureHome() {
  return (
    <UiPage title="Home">
      <WalletConnectionLoader render={FeatureHomeConnected} />
    </UiPage>
  )
}
