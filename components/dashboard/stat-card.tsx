import { DollarSign, Users, ShoppingCart, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPercentage } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string
  change: number
  icon: string
}

const iconMap = {
  'dollar-sign': DollarSign,
  'users': Users,
  'shopping-cart': ShoppingCart,
  'trending-up': TrendingUp,
}

export function StatCard({ title, value, change, icon }: StatCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap] || TrendingUp
  const isPositive = change > 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs">
          {isPositive ? (
            <ArrowUp className="h-3 w-3 text-green-600" />
          ) : (
            <ArrowDown className="h-3 w-3 text-red-600" />
          )}
          <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
            {formatPercentage(change)}
          </span>
          <span className="text-gray-500">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

