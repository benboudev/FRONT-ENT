import { useState } from 'react';
import { X, User, Mail, Phone, MapPin } from 'lucide-react';
import type { Customer } from '../../types/customer';

interface Props {
  customer?: Customer | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

const CustomerForm = ({ customer, onSubmit, onCancel }: Props) => {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await onSubmit(formData);
    } catch (err) {
      setError('Failed to save customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center px-10 py-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <User className="h-6 w-6 text-blue-600" />
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="px-10 py-8">
          {error && (
            <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-10">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-base font-medium text-gray-700 flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-gray-400" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter customer's full name"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-base font-medium text-gray-700 flex items-center gap-2 mb-2">
                <Mail className="h-5 w-5 text-gray-400" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
              />
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="block text-base font-medium text-gray-700 flex items-center gap-2 mb-2">
                <Phone className="h-5 w-5 text-gray-400" />
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            {/* Address Input */}
            <div className="space-y-2">
              <label className="block text-base font-medium text-gray-700 flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                Address
              </label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm transition-colors min-h-[8rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Enter full address"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-gray-50 border-t border-gray-200 rounded-b-xl">
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-4 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                customer ? 'Update Customer' : 'Add Customer'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
