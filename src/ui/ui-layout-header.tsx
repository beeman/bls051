import { Burger, Button, Group } from '@mantine/core'
import { NavLink as Link, useLocation } from 'react-router'
import { UiLayoutLogo } from './ui-layout-logo.tsx'
import { UiThemeToggle } from './ui-theme-toggle.tsx'
import { ReactNode } from 'react'

export interface AppLayoutHeaderLink {
  label: string
  to: string
}

export function UiLayoutHeader({
  hasNavbar,
  links = [],
  opened,
  profile,
  toggle,
}: {
  hasNavbar: boolean
  links?: AppLayoutHeaderLink[]
  opened: boolean
  profile: ReactNode
  toggle: () => void
}) {
  const { pathname } = useLocation()

  return (
    <Group justify="space-between" align="center" h="100%" px="xs" wrap="nowrap">
      <Group justify="center" align="center" wrap="nowrap">
        {hasNavbar ? <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> : null}
        <UiLayoutLogo />
        {links.length ? (
          <Group wrap="nowrap" gap="xs">
            {links.map((link) => (
              <Button
                size="xs"
                key={link.to}
                component={Link}
                to={link.to}
                variant={pathname.startsWith(link.to) ? 'filled' : 'light'}
              >
                {link.label}
              </Button>
            ))}
          </Group>
        ) : null}
      </Group>
      <Group justify="center" align="center" wrap="nowrap" gap="xs">
        {profile}
        <UiThemeToggle />
      </Group>
    </Group>
  )
}
