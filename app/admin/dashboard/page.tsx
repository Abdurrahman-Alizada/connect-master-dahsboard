'use client'

import { Users, Store, Calendar, Briefcase, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  // Static data for demonstration
  const stats = {
    users: { total: 1242, active: 1180, blocked: 62, change: 12.5 },
    shops: { total: 86, active: 78, inactive: 8, change: 8.3 },
    events: { total: 24, upcoming: 8, change: -2.1 },
    services: { total: 142, available: 136, unavailable: 6, change: 5.7 },
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.users.total,
      subtitle: `${stats.users.active} active, ${stats.users.blocked} blocked`,
      change: stats.users.change,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Shops',
      value: stats.shops.total,
      subtitle: `${stats.shops.active} active, ${stats.shops.inactive} inactive`,
      change: stats.shops.change,
      icon: Store,
      color: 'bg-green-500',
    },
    {
      title: 'Total Events',
      value: stats.events.total,
      subtitle: `${stats.events.upcoming} upcoming`,
      change: stats.events.change,
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Services',
      value: stats.services.total,
      subtitle: `${stats.services.available} available`,
      change: stats.services.change,
      icon: Briefcase,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome to your admin panel. Here's what's happening today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          const isPositive = stat.change >= 0
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {stat.subtitle}
                </p>
                <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>{isPositive ? '+' : ''}{stat.change.toFixed(1)}% from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow border border-gray-200">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/admin/users"
              className="block p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    Manage Users
                  </div>
                  <div className="text-sm text-gray-600">
                    View, edit, and manage user accounts
                  </div>
                </div>
              </div>
            </a>
            <a
              href="/admin/shops"
              className="block p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <Store className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                    Manage Shops
                  </div>
                  <div className="text-sm text-gray-600">
                    Create and manage shop listings
                  </div>
                </div>
              </div>
            </a>
            <a
              href="/admin/events"
              className="block p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                    Manage Events
                  </div>
                  <div className="text-sm text-gray-600">
                    Create and manage events
                  </div>
                </div>
              </div>
            </a>
            <a
              href="/admin/services"
              className="block p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg mr-3">
                  <Briefcase className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                    Manage Services
                  </div>
                  <div className="text-sm text-gray-600">
                    Create and manage service offerings
                  </div>
                </div>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border border-gray-200">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-600">
                  Database
                </span>
              </div>
              <span className="font-medium text-green-600">Connected</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-600">
                  API Status
                </span>
              </div>
              <span className="font-medium text-green-600">Operational</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-600">Version</span>
              </div>
              <span className="font-medium text-gray-900">
                v1.2.0
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-gray-600">Last Update</span>
              </div>
              <span className="font-medium text-gray-900">
                Today
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}