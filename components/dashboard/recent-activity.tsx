import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { recentActivities } from '@/lib/data'
import { CheckCircle2, Clock, XCircle } from 'lucide-react'

const statusConfig = {
  success: {
    icon: CheckCircle2,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
  pending: {
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
  },
  failed: {
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/20',
  },
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest user actions and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const config = statusConfig[activity.status]
            const Icon = config.icon
            
            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`rounded-full p-2 ${config.bgColor}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.user}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {activity.time}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

