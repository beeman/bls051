import { Flex, Group, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { ReactNode } from 'react'

export interface UiPageHeaderProps {
  title?: ReactNode
  icon?: ReactNode
  action?: ReactNode
}

export function UiPageHeader({ action, icon, title }: UiPageHeaderProps) {
  const { colors } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const bg = colorScheme === 'dark' ? colors.dark[8] : colors.gray[0]

  return (
    <Flex mih={60} justify="space-between" align="center" wrap="nowrap" bg={bg} px="md" py="xs">
      {icon || title ? (
        <Group justify="center" align="center" wrap="nowrap" gap="xs">
          {icon ? icon : null}
          {typeof title === 'string' ? (
            <Text size="xl" span fw={700}>
              {title}
            </Text>
          ) : (
            title
          )}
        </Group>
      ) : (
        <Group />
      )}
      {action ? (
        <Group justify="center" align="center" wrap="nowrap" gap="xs">
          {action}
        </Group>
      ) : null}
    </Flex>
  )
}
