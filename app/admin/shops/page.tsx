'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Filter, X, Store as StoreIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Shop {
  id: string
  name: string
  description: string | null
  address: string
  phone: string
  email: string | null
  status: string
}

export default function ShopsPage() {
  // Static shop data
  const staticShops: Shop[] = [
    {
      id: '1',
      name: 'Tech Gadgets Store',
      description: 'Latest electronics and gadgets',
      address: '123 Main St, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'info@techgadgets.com',
      status: 'active',
    },
    {
      id: '2',
      name: 'Fashion Boutique',
      description: 'Trendy clothing and accessories',
      address: '456 Park Ave, New York, NY 10022',
      phone: '+1 (555) 987-6543',
      email: 'contact@fashionboutique.com',
      status: 'active',
    },
    {
      id: '3',
      name: 'Book Haven',
      description: 'Wide selection of books and stationery',
      address: '789 Broadway, New York, NY 10003',
      phone: '+1 (555) 456-7890',
      email: 'support@bookhaven.com',
      status: 'pending',
    },
    {
      id: '4',
      name: 'Coffee Corner',
      description: 'Artisan coffee and pastries',
      address: '101 First Ave, New York, NY 10004',
      phone: '+1 (555) 234-5678',
      email: 'hello@coffeecorner.com',
      status: 'inactive',
    },
  ]

  const [shops] = useState<Shop[]>(staticShops)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingShop, setEditingShop] = useState<Shop | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    status: 'active',
  })
  const [showFilters, setShowFilters] = useState(false)

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(search.toLowerCase()) || 
                          shop.address.toLowerCase().includes(search.toLowerCase()) ||
                          shop.phone.includes(search)
    const matchesStatus = statusFilter ? shop.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    setShowModal(false)
    setEditingShop(null)
    setFormData({
      name: '',
      description: '',
      address: '',
      phone: '',
      email: '',
      status: 'active',
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this shop? This action cannot be undone.')) return
    // In a real app, this would delete from a database
    alert('Shop deleted successfully!')
  }

  const openEditModal = (shop: Shop) => {
    setEditingShop(shop)
    setFormData({
      name: shop.name,
      description: shop.description || '',
      address: shop.address,
      phone: shop.phone,
      email: shop.email || '',
      status: shop.status,
    })
    setShowModal(true)
  }

  const openCreateModal = () => {
    setEditingShop(null)
    setFormData({
      name: '',
      description: '',
      address: '',
      phone: '',
      email: '',
      status: 'active',
    })
    setShowModal(true)
  }

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('')
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Shops Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage shop listings, information, and status
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Shop
        </button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, address, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
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
          <CardTitle>Shops List</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredShops.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <StoreIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No shops found</h3>
              <p className="text-gray-600">
                {search || statusFilter 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Get started by adding a new shop'}
              </p>
              {!search && !statusFilter && (
                <button
                  onClick={openCreateModal}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Shop
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Shop
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Contact
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Address
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShops.map((shop) => (
                    <tr
                      key={shop.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">
                          {shop.name}
                        </div>
                        {shop.description && (
                          <div className="text-sm text-gray-500 mt-1">
                            {shop.description}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-gray-600">
                          {shop.email || 'No email'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {shop.phone}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {shop.address}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(shop.status)}`}
                        >
                          {shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(shop)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit shop"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(shop.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete shop"
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
              <h2 className="text-2xl font-bold text-gray-900">
                {editingShop ? 'Edit Shop' : 'Add New Shop'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  {editingShop ? 'Update Shop' : 'Create Shop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}