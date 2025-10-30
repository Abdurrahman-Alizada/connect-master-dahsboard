'use client'

import ProtectedLayout from '@/components/admin/protected-layout'

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedLayout>{children}</ProtectedLayout>
}