import { Box, Flex, Group, ScrollArea } from '@mantine/core'
import { UiLayoutNavbarLinkGroup, UiLayoutNavbarLinksGroup } from './ui-layout-navbar-links-group'
import classes from './ui-layout-navbar.module.css'
import { UiThemeToggle } from './ui-theme-toggle.tsx'

export function UiLayoutNavbar({ groups, close }: { groups: UiLayoutNavbarLinkGroup[]; close: () => void }) {
  const items = groups.map((item) => <UiLayoutNavbarLinksGroup {...item} key={item.label} close={close} />)

  return (
    <Flex component="nav" h="100%" direction="column" px="md">
      <ScrollArea className={classes.links}>
        <Box>{items}</Box>
      </ScrollArea>

      <Group p="xs" className={classes.footer} justify="space-between" align="center">
        <UiThemeToggle display="flex" />
      </Group>
    </Flex>
  )
}
