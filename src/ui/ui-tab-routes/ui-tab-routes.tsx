import { Box, Flex, Loader, Tabs, TabsProps, Text } from '@mantine/core'
import { ReactElement, ReactNode, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'

export interface UiTabRoute {
  element: ReactNode
  label: ReactElement | string
  path: string
}

export function UiTabRoutes({
  grow = false,
  tabs,
  basePath,
  ...props
}: Omit<TabsProps, 'children'> & {
  children?: ReactNode
  basePath?: string
  grow?: boolean
  tabs: UiTabRoute[]
}) {
  const navigate = useNavigate()
  const location = useLocation()
  // Set the active tab based on matching the location pathname with the tab path
  const activeTab = tabs.find((tab) => location.pathname.includes(`/${tab.path}`))?.path
  // Set default redirect route to the first tab
  const redirect = tabs.length && tabs[0].path !== '' ? tabs[0].path : undefined

  return (
    <Flex direction="column" justify="space-between" h="100%">
      <Tabs
        value={activeTab}
        onChange={(value) => navigate(`${basePath ? `${basePath}/${value}` : value}`)}
        mb="md"
        {...props}
      >
        <Tabs.List grow={grow}>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.path} value={tab.path}>
              <Text>{tab.label}</Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <Suspense fallback={<Loader />}>
        <Box h="100%" style={{ flexGrow: 1, overflow: 'auto' }}>
          <Routes>
            {redirect ? <Route index element={<Navigate replace to={`./${redirect}`} />} /> : null}
            {tabs.map((tab) => (
              <Route key={tab.path} path={`${tab.path}/*`} element={tab.element} />
            ))}
            <Route path="*" element={<Navigate replace to={`./${redirect}`} />} />
          </Routes>
        </Box>
      </Suspense>
    </Flex>
  )
}
