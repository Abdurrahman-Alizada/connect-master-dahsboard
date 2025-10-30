import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// GET dashboard stats
export async function GET(request: NextRequest) {
  try {
    requireAuth(request)

    const [
      totalUsers,
      activeUsers,
      totalShops,
      activeShops,
      totalEvents,
      upcomingEvents,
      totalServices,
      availableServices,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'active' } }),
      prisma.shop.count(),
      prisma.shop.count({ where: { status: 'active' } }),
      prisma.event.count(),
      prisma.event.count({ where: { status: 'upcoming' } }),
      prisma.service.count(),
      prisma.service.count({ where: { status: 'available' } }),
    ])

    return NextResponse.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        blocked: totalUsers - activeUsers,
      },
      shops: {
        total: totalShops,
        active: activeShops,
        inactive: totalShops - activeShops,
      },
      events: {
        total: totalEvents,
        upcoming: upcomingEvents,
      },
      services: {
        total: totalServices,
        available: availableServices,
        unavailable: totalServices - availableServices,
      },
    })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Get stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

