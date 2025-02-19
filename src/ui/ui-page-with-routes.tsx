import { RouteObject, useRoutes } from 'react-router'
import { UiPage, UiPageProps } from './ui-page.tsx'

export interface UiPageWithRoutesProps extends UiPageProps {
  path?: string
  routes: RouteObject[]
}

export function UiPageWithRoutes({
  path = '*',
  routes: children = [],
  ...pageProps
}: Omit<UiPageWithRoutesProps, 'children'>) {
  return useRoutes([{ path, element: <UiPage {...pageProps} />, children }])
}
