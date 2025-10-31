'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Simple validation for demo purposes
    if (email === 'admin@example.com' && password === 'admin123') {
      // Simulate successful login
      router.push('/admin/dashboard')
    } else {
      setError('Invalid credentials. Use admin@example.com / admin123')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-off-white via-cream to-mint-green/20 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-teal-green to-main-green rounded-full mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary">
              Admin Panel
            </h1>
            <p className="text-text-secondary mt-2">
              Sign in to manage your application
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-lg">
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-light-gray rounded-lg focus:ring-2 focus:ring-teal-green focus:border-transparent shadow-sm transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-light-gray rounded-lg focus:ring-2 focus:ring-teal-green focus:border-transparent shadow-sm transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray hover:text-text-primary" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray hover:text-text-primary" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-green focus:ring-teal-green border-light-gray rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-text-primary"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-teal-green hover:text-main-green"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-linear-to-r from-teal-green to-main-green hover:from-forest-green hover:to-teal-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-green transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Default credentials: admin@example.com / admin123
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-text-tertiary">
            © 2025 Admin Panel. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}