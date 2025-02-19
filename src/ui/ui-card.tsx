import { Card, Skeleton } from '@mantine/core'
import { ReactNode } from 'react'
import { UiCardHeader } from './ui-card-header.tsx'
import { UiError } from './ui-error.tsx'

export function UiCard({
  children,
  action,
  title,
  description,
  isLoading = false,
  error,
}: {
  title?: string
  children: ReactNode
  action?: ReactNode
  description?: string
  isLoading?: boolean
  error?: Error | null
}) {
  return (
    <Card p="md" withBorder shadow="sm">
      <UiCardHeader title={title} description={description} action={action} />
      {error ? <UiError mb="lg" error={error} /> : null}
      {children || isLoading ? <Skeleton visible={isLoading}>{children}</Skeleton> : null}
    </Card>
  )
}
