import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

export default function AdminAnalytics() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['admin', 'analytics'],
    queryFn: async () => {
      const response = await api.get('/admin/analytics');
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">System Statistics</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Users:</span>
              <span className="font-semibold">{analytics?.totalUsers || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Products:</span>
              <span className="font-semibold">{analytics?.totalProducts || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Alerts:</span>
              <span className="font-semibold">{analytics?.totalAlerts || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Scrapes:</span>
              <span className="font-semibold">{analytics?.totalScrapes || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate:</span>
              <span className="font-semibold">
                {analytics?.successRate?.toFixed(1) || 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Users by Role</h2>
          <div className="space-y-2">
            {analytics?.usersByRole?.map((item: any) => (
              <div key={item.role} className="flex justify-between">
                <span>{item.role}:</span>
                <span className="font-semibold">{item._count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
