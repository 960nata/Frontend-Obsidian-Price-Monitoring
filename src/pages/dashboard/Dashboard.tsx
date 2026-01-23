import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalProducts: number;
  unreadAlerts: number;
  totalPriceHistory: number;
  recentProducts: any[];
}

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const response = await api.get('/dashboard/stats');
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Total Products</div>
          <div className="text-3xl font-bold text-blue-600">{stats?.totalProducts || 0}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Unread Alerts</div>
          <div className="text-3xl font-bold text-red-600">{stats?.unreadAlerts || 0}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Price Checks</div>
          <div className="text-3xl font-bold text-green-600">{stats?.totalPriceHistory || 0}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Products</h2>
        </div>
        <div className="p-6">
          {stats?.recentProducts && stats.recentProducts.length > 0 ? (
            <div className="space-y-4">
              {stats.recentProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
                >
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.marketplace}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">
                      {formatCurrency(product.currentPrice)}
                    </div>
                    {product._count?.alerts > 0 && (
                      <div className="text-sm text-red-600">
                        {product._count.alerts} new alerts
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No products yet. Start by adding your first product!</p>
              <Link
                to="/products"
                className="mt-4 inline-block text-blue-600 hover:text-blue-700"
              >
                Add Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
