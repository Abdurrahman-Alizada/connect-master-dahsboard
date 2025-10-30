export interface StatCard {
  title: string
  value: string
  change: number
  icon: string
}

export interface ChartData {
  name: string
  value: number
}

export interface RecentActivity {
  id: string
  user: string
  action: string
  time: string
  status: 'success' | 'pending' | 'failed'
}

export interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  trend: number
}

export const statsData: StatCard[] = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: 20.1,
    icon: 'dollar-sign',
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: 15.3,
    icon: 'users',
  },
  {
    title: 'Total Orders',
    value: '1,234',
    change: -4.3,
    icon: 'shopping-cart',
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: 8.2,
    icon: 'trending-up',
  },
]

export const revenueData: ChartData[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
]

export const categoryData: ChartData[] = [
  { name: 'Electronics', value: 4500 },
  { name: 'Clothing', value: 3200 },
  { name: 'Food', value: 2800 },
  { name: 'Books', value: 1900 },
  { name: 'Other', value: 2100 },
]

export const recentActivities: RecentActivity[] = [
  {
    id: '1',
    user: 'John Doe',
    action: 'Completed purchase of MacBook Pro',
    time: '2 minutes ago',
    status: 'success',
  },
  {
    id: '2',
    user: 'Jane Smith',
    action: 'Signed up for premium plan',
    time: '15 minutes ago',
    status: 'success',
  },
  {
    id: '3',
    user: 'Bob Johnson',
    action: 'Payment processing',
    time: '1 hour ago',
    status: 'pending',
  },
  {
    id: '4',
    user: 'Alice Williams',
    action: 'Refund requested',
    time: '2 hours ago',
    status: 'failed',
  },
  {
    id: '5',
    user: 'Charlie Brown',
    action: 'Updated profile information',
    time: '3 hours ago',
    status: 'success',
  },
]

export const topProducts: TopProduct[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    sales: 234,
    revenue: 562800,
    trend: 12.5,
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    sales: 456,
    revenue: 456000,
    trend: 8.3,
  },
  {
    id: '3',
    name: 'AirPods Pro',
    sales: 789,
    revenue: 197250,
    trend: -3.2,
  },
  {
    id: '4',
    name: 'iPad Air',
    sales: 345,
    revenue: 206700,
    trend: 15.7,
  },
  {
    id: '5',
    name: 'Apple Watch',
    sales: 567,
    revenue: 226800,
    trend: 5.4,
  },
]

