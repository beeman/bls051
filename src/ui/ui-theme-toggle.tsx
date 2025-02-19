import { ActionIcon, ActionIconProps, useMantineColorScheme } from '@mantine/core'
import { LucideMoon, LucideSun } from 'lucide-react'

export function UiThemeToggle(props: ActionIconProps) {
  const { setColorScheme, colorScheme } = useMantineColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <ActionIcon onClick={() => setColorScheme(isDark ? 'light' : 'dark')} variant="light" {...props}>
      {isDark ? <LucideSun size={20} /> : <LucideMoon size={20} />}
    </ActionIcon>
  )
}
