import { Group } from '@mantine/core'
import { UiThemeToggle } from './ui-theme-toggle.tsx'

export function UiLayoutFooter() {
  return (
    <Group justify="space-between" align="center" h="100%" px="xs" wrap="nowrap">
      <Group justify="center" align="center" wrap="nowrap">
        <UiThemeToggle />
      </Group>
      <Group justify="center" align="center" wrap="nowrap" gap="xs">
        X
      </Group>
    </Group>
  )
}
