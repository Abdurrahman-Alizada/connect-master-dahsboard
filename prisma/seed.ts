import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create some sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        email: 'john@example.com',
        name: 'John Doe',
        phone: '+1234567890',
        status: 'active',
      },
    }),
    prisma.user.upsert({
      where: { email: 'jane@example.com' },
      update: {},
      create: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        phone: '+1234567891',
        status: 'active',
      },
    }),
  ])

  console.log('✅ Sample users created:', users.length)

  // Create some sample shops
  const shops = await Promise.all([
    prisma.shop.upsert({
      where: { id: '1' },
      update: {},
      create: {
        id: '1',
        name: 'Coffee Shop',
        description: 'Best coffee in town',
        address: '123 Main St',
        phone: '+1234567892',
        email: 'coffee@example.com',
        status: 'active',
      },
    }),
    prisma.shop.upsert({
      where: { id: '2' },
      update: {},
      create: {
        id: '2',
        name: 'Book Store',
        description: 'Wide selection of books',
        address: '456 Oak Ave',
        phone: '+1234567893',
        email: 'books@example.com',
        status: 'active',
      },
    }),
  ])

  console.log('✅ Sample shops created:', shops.length)

  // Create some sample events
  const events = await Promise.all([
    prisma.event.upsert({
      where: { id: '1' },
      update: {},
      create: {
        id: '1',
        title: 'Summer Festival',
        description: 'Annual summer music festival',
        location: 'Central Park',
        startDate: new Date('2025-07-01'),
        endDate: new Date('2025-07-03'),
        status: 'upcoming',
      },
    }),
    prisma.event.upsert({
      where: { id: '2' },
      update: {},
      create: {
        id: '2',
        title: 'Tech Conference',
        description: 'Latest in technology',
        location: 'Convention Center',
        startDate: new Date('2025-08-15'),
        endDate: new Date('2025-08-17'),
        status: 'upcoming',
      },
    }),
  ])

  console.log('✅ Sample events created:', events.length)

  // Create some sample services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: '1' },
      update: {},
      create: {
        id: '1',
        name: 'Web Development',
        description: 'Professional web development services',
        category: 'Technology',
        price: 5000,
        status: 'available',
      },
    }),
    prisma.service.upsert({
      where: { id: '2' },
      update: {},
      create: {
        id: '2',
        name: 'Graphic Design',
        description: 'Creative graphic design solutions',
        category: 'Design',
        price: 2000,
        status: 'available',
      },
    }),
  ])

  console.log('✅ Sample services created:', services.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

