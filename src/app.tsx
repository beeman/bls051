import './app-theme-styles.ts'
import { AppRoutes } from './app-routes.tsx'
import { AppTheme } from './app-theme.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClusterProvider } from './features/cluster/data-access'
import { SolanaProvider } from './features/solana'

const client = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={client}>
      <AppTheme>
        <ClusterProvider>
          <SolanaProvider>
            <AppRoutes />
          </SolanaProvider>
        </ClusterProvider>
      </AppTheme>
    </QueryClientProvider>
  )
}
