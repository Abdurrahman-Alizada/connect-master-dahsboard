'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Ban, CheckCircle, Filter, X, Users as UsersIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface User {
  id: string
  email: string
  name: string
  phone: string | null
  status: string
  createdAt: string
}

export default function UsersPage() {
  // Static user data
  const staticUsers: User[] = [
    {
      id: '1',
      email: 'john.doe@example.com',
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      status: 'active',
      createdAt: '2025-01-15',
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      phone: '+1 (555) 987-6543',
      status: 'active',
      createdAt: '2025-02-20',
    },
    {
      id: '3',
      email: 'bob.johnson@example.com',
      name: 'Bob Johnson',
      phone: null,
      status: 'blocked',
      createdAt: '2025-03-10',
    },
    {
      id: '4',
      email: 'alice.williams@example.com',
      name: 'Alice Williams',
      phone: '+1 (555) 456-7890',
      status: 'active',
      createdAt: '2025-04-05',
    },
    {
      id: '5',
      email: 'charlie.brown@example.com',
      name: 'Charlie Brown',
      phone: '+1 (555) 234-5678',
      status: 'blocked',
      createdAt: '2025-05-12',
    },
  ]

  const [users] = useState<User[]>(staticUsers)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    status: 'active',
  })
  const [showFilters, setShowFilters] = useState(false)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase()) ||
                          (user.phone && user.phone.includes(search))
    const matchesStatus = statusFilter ? user.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    setShowModal(false)
    setEditingUser(null)
    setFormData({ email: '', name: '', phone: '', status: 'active' })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return
    // In a real app, this would delete from a database
    alert('User deleted successfully!')
  }

  const handleToggleStatus = (id: string) => {
    // In a real app, this would update the user status in a database
    alert('User status updated successfully!')
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setFormData({
      email: user.email,
      name: user.name,
      phone: user.phone || '',
      status: user.status,
    })
    setShowModal(true)
  }

  const openCreateModal = () => {
    setEditingUser(null)
    setFormData({ email: '', name: '', phone: '', status: 'active' })
    setShowModal(true)
  }

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('')
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/20 text-success'
      case 'blocked':
        return 'bg-error/20 text-error'
      default:
        return 'bg-off-white text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            Users Management
          </h1>
          <p className="text-text-secondary mt-2">
            Manage user accounts, permissions, and access
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-teal-green text-white rounded-lg hover:bg-forest-green transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-light-gray rounded-lg focus:ring-2 focus:ring-teal-green focus:border-transparent shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-light-gray rounded-lg hover:bg-off-white transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-light-gray">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-light-gray rounded-lg focus:ring-2 focus:ring-teal-green focus:border-transparent shadow-sm"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-off-white flex items-center justify-center mb-4">
                <UsersIcon className="w-8 h-8 text-gray" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-1">No users found</h3>
              <p className="text-text-secondary">
                {search || statusFilter 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Get started by adding a new user'}
              </p>
              {!search && !statusFilter && (
                <button
                  onClick={openCreateModal}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-teal-green text-white rounded-lg hover:bg-forest-green transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-light-gray">
                    <th className="text-left py-3 px-4 font-medium text-text-primary">
                      User
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary">
                      Contact
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary">
                      Joined
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-text-primary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-light-gray hover:bg-off-white transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-text-primary">
                          {user.name}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-text-secondary">
                          {user.email}
                        </div>
                        <div className="text-sm text-text-tertiary">
                          {user.phone || 'No phone'}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(user.status)}`}
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(user)}
                            className="p-2 text-teal-green hover:bg-mint-green/20 rounded-lg transition-colors"
                            title="Edit user"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(user.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              user.status === 'active'
                                ? 'text-warning hover:bg-warning/10'
                                : 'text-success hover:bg-success/10'
                            }`}
                            title={user.status === 'active' ? 'Block user' : 'Unblock user'}
                          >
                            {user.status === 'active' ? (
                              <Ban className="w-4 h-4" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-text-primary">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-text-tertiary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-light-gray rounded-lg focus:ring-2 focus:ring-teal-green focus:border-transparent shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-light-gray rounded-lg focus:ring-2 focus:ring-teal-green focus:border-transparent shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-light-gray rounded-lg focus:ring-2 focus:ring-teal-green focus:border-transparent shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-light-gray rounded-lg focus:ring-2 focus:ring-teal-green focus:border-transparent shadow-sm"
                >
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-light-gray rounded-lg hover:bg-off-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-teal-green text-white rounded-lg hover:bg-forest-green transition-colors shadow-sm"
                >
                  {editingUser ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}