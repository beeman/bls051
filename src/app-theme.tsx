import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { ReactNode } from 'react'
import { appThemeOverride } from './app-theme-override.ts'

export function AppTheme({
  children,
  theme = appThemeOverride,
}: {
  children: ReactNode
  theme?: MantineThemeOverride
}) {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  )
}
