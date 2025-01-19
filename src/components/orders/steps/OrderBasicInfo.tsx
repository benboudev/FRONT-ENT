import { useState, useEffect } from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import { customerApi } from '../../../api/customerApi';
import type { Customer } from '../../../types/customer';

interface Props {
  data: {
    customer_id: string;
    shop_date: string;
    job_address: string;
    delivery_date: string;
    order_status: string;
  };
  onUpdate: (data: any) => void;
}

const OrderBasicInfo = ({ data, onUpdate }: Props) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await customerApi.getAll();
        setCustomers(Array.isArray(response) ? response : response.data || []);
      } catch (error) {
        console.error('Failed to load customers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-xl font-semibold text-gray-900">Order Information</div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Customer Selection */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
            <User className="h-5 w-5 text-gray-400" />
            Customer
          </label>
          <select
            value={data.customer_id}
            onChange={(e) => onUpdate({ customer_id: e.target.value })}
            className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm 
              transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 
              focus:border-blue-500 appearance-none bg-white"
            required
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Shop Date */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            Shop Date
          </label>
          <input
            type="date"
            value={data.shop_date}
            onChange={(e) => onUpdate({ shop_date: e.target.value })}
            className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm 
              transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 
              focus:border-blue-500"
            required
          />
        </div>

        {/* Job Address */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-400" />
            Job Address
          </label>
          <textarea
            value={data.job_address}
            onChange={(e) => onUpdate({ job_address: e.target.value })}
            className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm 
              transition-colors min-h-[8rem] focus:ring-2 focus:ring-blue-500 
              focus:border-blue-500 resize-none"
            placeholder="Enter job site address"
            required
          />
        </div>

        {/* Delivery Date */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            Delivery Date
          </label>
          <input
            type="date"
            value={data.delivery_date}
            onChange={(e) => onUpdate({ delivery_date: e.target.value })}
            className="block w-full px-6 py-4 text-lg rounded-lg border shadow-sm 
              transition-colors min-h-[3.5rem] focus:ring-2 focus:ring-blue-500 
              focus:border-blue-500"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default OrderBasicInfo;
