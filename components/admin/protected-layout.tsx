'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from './admin-sidebar'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    // if (!token) {
    //   router.push('/admin/login')
    // }

    // Load sidebar collapsed state
    const savedCollapsedState = localStorage.getItem('sidebarCollapsed')
    if (savedCollapsedState) {
      setIsSidebarCollapsed(JSON.parse(savedCollapsedState))
    }

    // Listen for changes to sidebar state
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sidebarCollapsed') {
        setIsSidebarCollapsed(JSON.parse(e.newValue || 'false'))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [router])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar />
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      } overflow-y-auto`}>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}