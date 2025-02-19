import { Button } from '@mantine/core'
import { Link } from 'react-router'
import { UiPage } from '../../ui'

export default function FeatureAbout() {
  return (
    <UiPage title="About">
      <Button component={Link} to="/home">
        Home
      </Button>
    </UiPage>
  )
}
