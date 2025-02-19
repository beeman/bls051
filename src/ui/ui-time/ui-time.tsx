import { Text, TextProps } from '@mantine/core'
import TimeAgo from 'timeago-react'

export interface UiTimeProps extends TextProps {
  date: Date | number
  prefix?: string
  suffix?: string
}

export function UiTime({ date, prefix, suffix, ...props }: UiTimeProps) {
  date = typeof date === 'number' ? new Date(date) : date
  return (
    <Text {...props} title={date.toISOString()}>
      {prefix}
      <TimeAgo datetime={date} locale="en_US" />
      {suffix}
    </Text>
  )
}
