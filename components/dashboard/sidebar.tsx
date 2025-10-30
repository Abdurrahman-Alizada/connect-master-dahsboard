'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  Package,
  FileText,
  Bell,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/analytics',
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    href: '/orders',
  },
  {
    title: 'Products',
    icon: Package,
    href: '/products',
  },
  {
    title: 'Customers',
    icon: Users,
    href: '/customers',
  },
  {
    title: 'Reports',
    icon: FileText,
    href: '/reports',
  },
  {
    title: 'Notifications',
    icon: Bell,
    href: '/notifications',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Admin User
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              admin@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

