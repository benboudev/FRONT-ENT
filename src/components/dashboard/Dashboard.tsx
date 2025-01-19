import { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  ClipboardList, 
  ArrowUpRight,
  TrendingUp,
  Clock 
} from 'lucide-react';
import { customerApi } from '../../api/customerApi';
import { materialApi } from '../../api/materialApi';
import { orderApi } from '../../api/orderApi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    customers: 0,
    materials: 0,
    orders: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [customersData, materialsData, ordersData] = await Promise.all([
          customerApi.getAll(),
          materialApi.getAll(),
          orderApi.getOrders()
        ]);

        setStats({
          customers: Array.isArray(customersData) ? customersData.length : 
                    (customersData.data?.length || 0),
          materials: Array.isArray(materialsData) ? materialsData.length : 
                    (materialsData.data?.length || 0),
          orders: Array.isArray(ordersData) ? ordersData.length : 
                 (ordersData.data?.length || 0),
          loading: false
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Orders Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 transition-colors">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">
                  {stats.loading ? '...' : stats.orders}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <ClipboardList className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">12% increase</span>
              </div>
              <a href="/orders" 
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                View all
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Customers Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 transition-colors">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">
                  {stats.loading ? '...' : stats.customers}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">8% increase</span>
              </div>
              <a href="/customers" 
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                View all
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Materials Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 transition-colors">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Materials</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">
                  {stats.loading ? '...' : stats.materials}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1 text-green-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Last added 2h ago</span>
              </div>
              <a href="/materials" 
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                View all
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {stats.loading ? (
                <div className="text-gray-500">Loading activities...</div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <ClipboardList className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">New order created</p>
                      <p className="text-gray-500 text-xs">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">New customer added</p>
                      <p className="text-gray-500 text-xs">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                      <Package className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">Material inventory updated</p>
                      <p className="text-gray-500 text-xs">2 hours ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
