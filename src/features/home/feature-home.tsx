import { Button } from '@mantine/core'
import { UiPage } from '../../ui'
import { Link } from 'react-router'

export default function FeatureHome() {
  return (
    <UiPage title="Home">
      <Button component={Link} to="/about">
        About
      </Button>
    </UiPage>
  )
}
