import { UiPageWithTabs } from '../../ui'
import { LucideBug } from 'lucide-react'
import { Alert } from '@mantine/core'

export default function FeatureDev() {
  return (
    <UiPageWithTabs
      basePath="/dev"
      title="Development"
      icon={<LucideBug />}
      tabs={[
        { element: <FeatureDevOverview />, label: 'Overview', path: 'overview' },
        { element: <FeatureDevPlaceholder />, label: 'Placeholder', path: 'placeholder' },
        { element: <FeatureDevEditMePlease />, label: 'Edit me please!', path: 'edit-me-please' },
      ]}
    ></UiPageWithTabs>
  )
}

function FeatureDevOverview() {
  return (
    <div>
      <Alert color="yellow" title="THIS IS THE DEV SECTION. START ADDING FEATURES HERE." />
    </div>
  )
}

function FeatureDevPlaceholder() {
  return (
    <div>
      <Alert color="orange" title="THIS IS A PLACEHOLDER FEATURE." />
    </div>
  )
}

function FeatureDevEditMePlease() {
  return (
    <div>
      <Alert color="red" title="COME ON, EDIT ME PLEASE!" />
    </div>
  )
}
