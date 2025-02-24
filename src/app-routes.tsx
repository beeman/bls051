import { Navigate, RouteObject, useRoutes } from 'react-router'
import { UiLayout } from './ui/'
import { LazyFeatureAbout, LazyFeatureContact, LazyFeatureDev, LazyFeatureHome } from './features'
import { LucideBug, LucideHome } from 'lucide-react'
import { UiNotFound } from './ui'
import { WalletButton, WalletIcon } from './features/solana'
import { Box } from '@mantine/core'

export function AppRoutes() {
  const routes: RouteObject[] = [
    {
      path: '',
      element: (
        <UiLayout
          headerLinks={[
            { label: 'Home', to: '/home' },
            { label: 'Dev', to: '/dev' },
            { label: 'About', to: '/about' },
          ]}
          navbarLinkGroups={[
            {
              label: 'Home',
              icon: LucideHome,
              to: '/home',
            },
            {
              label: 'Development',
              icon: LucideBug,
              to: '/dev',
            },
          ]}
          profile={
            <>
              <Box display="flex" hiddenFrom="sm">
                <WalletIcon size="md" />
              </Box>
              <Box display="flex" visibleFrom="sm">
                <WalletButton size="xs" variant="light" />
              </Box>
            </>
          }
        />
      ),
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: '/about', element: <LazyFeatureAbout /> },
        { path: '/contact', element: <LazyFeatureContact /> },
        { path: '/dev/*', element: <LazyFeatureDev /> },
        { path: '/home', element: <LazyFeatureHome /> },
        { path: '*', element: <UiNotFound /> },
      ],
    },
  ]
  return useRoutes(routes)
}
