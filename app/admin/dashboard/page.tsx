'use client'

import { useEffect, useState } from 'react'
import { Users, Store, Calendar, Briefcase, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatNumber, formatPercentage } from '@/lib/utils'

interface Stats {
  users: { total: number; active: number; blocked: number; change: number }
  shops: { total: number; active: number; inactive: number; change: number }
  events: { total: number; upcoming: number; change: number }
  services: { total: number; available: number; unavailable: number; change: number }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
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
          Loading dashboard...
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
      change: stats?.users.change || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Shops',
      value: stats?.shops.total || 0,
      subtitle: `${stats?.shops.active || 0} active, ${
        stats?.shops.inactive || 0
      } inactive`,
      change: stats?.shops.change || 0,
      icon: Store,
      color: 'bg-green-500',
    },
    {
      title: 'Total Events',
      value: stats?.events.total || 0,
      subtitle: `${stats?.events.upcoming || 0} upcoming`,
      change: stats?.events.change || 0,
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Services',
      value: stats?.services.total || 0,
      subtitle: `${stats?.services.available || 0} available`,
      change: stats?.services.change || 0,
      icon: Briefcase,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome to your admin panel. Here's what's happening today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          const isPositive = stat.change >= 0
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
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
                  {formatNumber(stat.value)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.subtitle}
                </p>
                {stat.change !== undefined && (
                  <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    <span>{formatPercentage(stat.change)} from last month</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/admin/users"
              className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Manage Users
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    View, edit, and manage user accounts
                  </div>
                </div>
              </div>
            </a>
            <a
              href="/admin/shops"
              className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                  <Store className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    Manage Shops
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Create and manage shop listings
                  </div>
                </div>
              </div>
            </a>
            <a
              href="/admin/events"
              className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Manage Events
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Create and manage events
                  </div>
                </div>
              </div>
            </a>
            <a
              href="/admin/services"
              className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-3">
                  <Briefcase className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    Manage Services
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Create and manage service offerings
                  </div>
                </div>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Database
                </span>
              </div>
              <span className="font-medium text-green-600">Connected</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  API Status
                </span>
              </div>
              <span className="font-medium text-green-600">Operational</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">Version</span>
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                v1.2.0
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">Last Update</span>
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                Today
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}