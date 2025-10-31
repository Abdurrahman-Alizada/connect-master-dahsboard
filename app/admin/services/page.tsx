'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Filter, X, Briefcase as BriefcaseIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

interface Service {
  id: string
  name: string
  description: string | null
  category: string
  price: number
  status: string
}

export default function ServicesPage() {
  // Static service data
  const staticServices: Service[] = [
    {
      id: '1',
      name: 'Website Design',
      description: 'Professional website design and development services',
      category: 'Web Development',
      price: 1500,
      status: 'available',
    },
    {
      id: '2',
      name: 'SEO Optimization',
      description: 'Search engine optimization to improve your website ranking',
      category: 'Digital Marketing',
      price: 800,
      status: 'available',
    },
    {
      id: '3',
      name: 'Mobile App Development',
      description: 'Custom mobile application development for iOS and Android',
      category: 'App Development',
      price: 5000,
      status: 'available',
    },
    {
      id: '4',
      name: 'Graphic Design',
      description: 'Creative graphic design for branding and marketing materials',
      category: 'Design',
      price: 300,
      status: 'unavailable',
    },
  ]

  const [services] = useState<Service[]>(staticServices)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    status: 'available',
  })
  const [showFilters, setShowFilters] = useState(false)

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) || 
                          service.category.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter ? service.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    setShowModal(false)
    setEditingService(null)
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      status: 'available',
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this service? This action cannot be undone.')) return
    // In a real app, this would delete from a database
    alert('Service deleted successfully!')
  }

  const openEditModal = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description || '',
      category: service.category,
      price: service.price.toString(),
      status: service.status,
    })
    setShowModal(true)
  }

  const openCreateModal = () => {
    setEditingService(null)
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      status: 'available',
    })
    setShowModal(true)
  }

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('')
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success/20 text-success'
      case 'unavailable':
        return 'bg-off-white text-gray-800'
      default:
        return 'bg-off-white text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            Services Management
          </h1>
          <p className="text-text-secondary mt-2">
            Manage service offerings, pricing, and availability
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-teal-green text-white rounded-lg hover:bg-forest-green transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, category..."
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
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
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
          <CardTitle>Services List</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-off-white flex items-center justify-center mb-4">
                <BriefcaseIcon className="w-8 h-8 text-gray" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-1">No services found</h3>
              <p className="text-text-secondary">
                {search || statusFilter 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Get started by adding a new service'}
              </p>
              {!search && !statusFilter && (
                <button
                  onClick={openCreateModal}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-teal-green text-white rounded-lg hover:bg-forest-green transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-light-gray">
                    <th className="text-left py-3 px-4 font-medium text-text-primary">
                      Service
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-text-primary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service) => (
                    <tr
                      key={service.id}
                      className="border-b border-light-gray hover:bg-off-white transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-text-primary">
                          {service.name}
                        </div>
                        {service.description && (
                          <div className="text-sm text-text-tertiary mt-1 line-clamp-2">
                            {service.description}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {service.category}
                      </td>
                      <td className="py-3 px-4 font-medium text-text-primary">
                        {formatCurrency(service.price)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(service.status)}`}
                        >
                          {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(service)}
                            className="p-2 text-teal-green hover:bg-mint-green/20 rounded-lg transition-colors"
                            title="Edit service"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                            title="Delete service"
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
                {editingService ? 'Edit Service' : 'Add New Service'}
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
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-light-gray rounded-lg focus:ring-2 focus:ring-teal-green focus:border-transparent shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-light-gray rounded-lg focus:ring-2 focus:ring-teal-green focus:border-transparent shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
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
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
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
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}