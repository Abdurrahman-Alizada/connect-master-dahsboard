import { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

export interface AdminPayload {
  id: string
  email: string
  name: string
}

export function verifyToken(request: NextRequest): AdminPayload | null {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7)
    const decoded = verify(token, JWT_SECRET) as AdminPayload
    
    return decoded
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

export function requireAuth(request: NextRequest): AdminPayload {
  const admin = verifyToken(request)
  
  if (!admin) {
    throw new Error('Unauthorized')
  }
  
  return admin
}

