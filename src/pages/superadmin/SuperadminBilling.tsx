import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

export default function SuperadminBilling() {
  const { data: billing, isLoading } = useQuery({
    queryKey: ['superadmin', 'billing'],
    queryFn: async () => {
      const response = await api.get('/superadmin/billing');
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Billing</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Total Subscriptions</div>
          <div className="text-3xl font-bold">{billing?.totalSubscriptions || 0}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Premium</div>
          <div className="text-3xl font-bold text-blue-600">{billing?.premiumCount || 0}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Free</div>
          <div className="text-3xl font-bold text-gray-600">{billing?.freeCount || 0}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {billing?.subscriptions?.map((sub: any) => (
              <tr key={sub.id}>
                <td className="px-6 py-4 whitespace-nowrap">{sub.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sub.plan}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      sub.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {sub.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
