import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { Alert } from '../../types/alert.types';
import { formatDate, formatRelativeTime } from '../../utils/formatters';
import { Button } from '../../components/common/Button';

export default function Alerts() {
  const queryClient = useQueryClient();

  const { data: alerts, isLoading } = useQuery<Alert[]>({
    queryKey: ['alerts'],
    queryFn: async () => {
      const response = await api.get('/alerts');
      return response.data;
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/alerts/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/alerts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const unreadAlerts = alerts?.filter((a) => !a.isRead) || [];
  const readAlerts = alerts?.filter((a) => a.isRead) || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Alerts</h1>

      {unreadAlerts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Unread ({unreadAlerts.length})</h2>
          <div className="space-y-4">
            {unreadAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{alert.product?.name || 'Product'}</h3>
                    <p className="text-gray-700">{alert.message}</p>
                    <p className="text-sm text-gray-500 mt-2">{formatRelativeTime(alert.createdAt)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => markAsReadMutation.mutate(alert.id)}
                    >
                      Mark Read
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteMutation.mutate(alert.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {readAlerts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Read ({readAlerts.length})</h2>
          <div className="space-y-4">
            {readAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white p-6 rounded-lg shadow border-l-4 border-gray-300 opacity-75"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{alert.product?.name || 'Product'}</h3>
                    <p className="text-gray-700">{alert.message}</p>
                    <p className="text-sm text-gray-500 mt-2">{formatRelativeTime(alert.createdAt)}</p>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => deleteMutation.mutate(alert.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {alerts?.length === 0 && (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <p className="text-gray-600">No alerts yet. You'll be notified when prices change!</p>
        </div>
      )}
    </div>
  );
}
