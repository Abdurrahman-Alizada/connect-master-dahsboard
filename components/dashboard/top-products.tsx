import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { topProducts } from '@/lib/data'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Best performing products this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => {
            const isPositive = product.trend > 0
            
            return (
              <div key={product.id} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>{formatNumber(product.sales)} sales</span>
                    <span>{formatCurrency(product.revenue)}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {formatPercentage(product.trend)}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

