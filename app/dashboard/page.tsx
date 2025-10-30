'use client'

import { useEffect, useState } from 'react'
import { Users, Store, Calendar, Briefcase } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Stats {
  users: { total: number; active: number; blocked: number }
  shops: { total: number; active: number; inactive: number }
  events: { total: number; upcoming: number }
  services: { total: number; available: number; unavailable: number }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Mock data for demonstration
      setStats({
        users: { total: 1242, active: 1180, blocked: 62 },
        shops: { total: 86, active: 78, inactive: 8 },
        events: { total: 24, upcoming: 8 },
        services: { total: 142, available: 136, unavailable: 6 }
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-600 dark:text-gray-400">
          Loading...
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.users.total || 0,
      subtitle: `${stats?.users.active || 0} active, ${
        stats?.users.blocked || 0
      } blocked`,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Shops',
      value: stats?.shops.total || 0,
      subtitle: `${stats?.shops.active || 0} active, ${
        stats?.shops.inactive || 0
      } inactive`,
      icon: Store,
      color: 'bg-green-500',
    },
    {
      title: 'Total Events',
      value: stats?.events.total || 0,
      subtitle: `${stats?.events.upcoming || 0} upcoming`,
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Services',
      value: stats?.services.total || 0,
      subtitle: `${stats?.services.available || 0} available`,
      icon: Briefcase,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome to your dashboard
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.subtitle}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/dashboard/users"
              className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="font-medium text-gray-900 dark:text-white">
                Manage Users
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                View, edit, and manage user accounts
              </div>
            </a>
            <a
              href="/dashboard/shops"
              className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="font-medium text-gray-900 dark:text-white">
                Manage Shops
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Create and manage shop listings
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Database
              </span>
              <span className="font-medium text-green-600">Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                API Status
              </span>
              <span className="font-medium text-green-600">Operational</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Version</span>
              <span className="font-medium text-gray-900 dark:text-white">
                1.0.0
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}