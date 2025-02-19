import { ActionIcon, Button, Image } from '@mantine/core'
import { NavLink as Link } from 'react-router'

export function UiLayoutLogo({
  logo = '/logo.svg',
  name = 'Samui',
}: {
  logo?: string
  name?: string
} = {}) {
  const logoElement = <Image src={logo} width={30} height={30} />
  return (
    <>
      <Button variant="subtle" leftSection={logoElement} component={Link} to="/" visibleFrom="sm">
        {name}
      </Button>
      <ActionIcon variant="subtle" component={Link} to="/" hiddenFrom="sm">
        {logoElement}
      </ActionIcon>
    </>
  )
}
