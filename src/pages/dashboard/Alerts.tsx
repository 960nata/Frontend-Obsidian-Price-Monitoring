import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { Alert } from '../../types/alert.types';
import { formatDate, formatRelativeTime } from '../../utils/formatters';
import { useTranslation } from '../../hooks/useTranslation';
import { Skeleton } from '../../components/common/Skeleton';
import { useNotifications } from '../../hooks/useNotifications';

export default function Alerts() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { permission, requestPermission, showNotification } = useNotifications();

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
    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-8">
          <Skeleton variant="text" width="25%" height={48} className="mb-2" />
          <Skeleton variant="text" width="60%" height={18} />
        </div>

        {/* Alert Cards */}
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6">
              <div className="flex items-start gap-4">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" width="70%" height={18} />
                  <Skeleton variant="text" width="50%" height={14} />
                  <Skeleton variant="text" width="40%" height={12} />
                </div>
                <Skeleton variant="rectangular" width={80} height={32} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const unreadAlerts = alerts?.filter((a) => !a.isRead) || [];
  const readAlerts = alerts?.filter((a) => a.isRead) || [];

  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      showNotification('Permission Granted', {
        body: 'You will now receive push notifications for new alerts!',
        tag: 'permission-granted',
      });
    }
  };

  const handleTestNotification = () => {
    showNotification('Test Notification', {
      body: 'This is a test push notification. If you see this, notifications are working!',
      tag: 'test-notification',
      requireInteraction: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-12">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 neon-glow-text">
              {t('alerts.title')}
            </h1>
            <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
              {t('alerts.description')}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {permission === 'default' && (
              <button
                onClick={handleRequestPermission}
                className="px-6 py-3 bg-neon-mint text-obsidian rounded-sm text-sm font-black uppercase tracking-[0.2em] hover:scale-105 transition-all neon-border-glow"
              >
                Enable Notifications
              </button>
            )}
            {permission === 'granted' && (
              <button
                onClick={handleTestNotification}
                className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-sm text-sm font-black uppercase tracking-[0.2em] hover:border-neon-mint/30 hover:bg-white/10 transition-all"
              >
                Test Notification
              </button>
            )}
            {permission === 'denied' && (
              <div className="px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-sm text-xs font-bold uppercase tracking-wider text-center">
                Notifications Blocked
              </div>
            )}
          </div>
        </div>
        {permission === 'granted' && (
          <div className="mt-4 px-4 py-2 bg-neon-mint/10 border border-neon-mint/30 rounded-sm inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-mint animate-pulse"></span>
            <span className="text-xs font-bold text-neon-mint uppercase tracking-wider">
              Push Notifications Enabled
            </span>
          </div>
        )}
      </div>

      {unreadAlerts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {t('alerts.unread')}
            </h2>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-red-400">
                {unreadAlerts.length}
              </span>
            </span>
          </div>
          <div className="space-y-4">
            {unreadAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white/5 backdrop-blur-xl border border-white/5 border-l-4 border-l-red-500/50 p-6 rounded-sm hover:border-neon-mint/30 transition-all"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-extrabold text-white mb-2 text-xl tracking-tight">
                      {alert.product?.name || 'Product'}
                    </h3>
                    <p className="text-slate-400 mb-3 font-light leading-relaxed">{alert.message}</p>
                    <p className="text-[10px] text-slate-500 font-bold tracking-[0.3em] uppercase">
                      {formatRelativeTime(alert.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => markAsReadMutation.mutate(alert.id)}
                      className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-sm hover:border-neon-mint/30 hover:bg-white/10 transition-all text-xs font-black uppercase tracking-[0.2em]"
                    >
                      {t('alerts.markRead')}
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(alert.id)}
                      className="px-6 py-3 bg-white/5 border border-white/10 text-red-400 rounded-sm hover:border-red-500/30 hover:bg-red-500/10 transition-all text-xs font-black uppercase tracking-[0.2em]"
                    >
                      {t('common.delete')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {readAlerts.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {t('alerts.read')}
            </h2>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">
                {readAlerts.length}
              </span>
            </span>
          </div>
          <div className="space-y-4">
            {readAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white/5 backdrop-blur-xl border border-white/5 border-l-4 border-l-slate-500/30 p-6 rounded-sm opacity-75 hover:opacity-100 hover:border-neon-mint/30 transition-all"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-2 text-lg">
                      {alert.product?.name || 'Product'}
                    </h3>
                    <p className="text-slate-400 mb-3">{alert.message}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                      {formatRelativeTime(alert.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteMutation.mutate(alert.id)}
                    className="px-6 py-3 bg-white/5 border border-white/10 text-red-400 rounded-sm hover:border-red-500/30 hover:bg-red-500/10 transition-all text-xs font-black uppercase tracking-[0.2em] flex-shrink-0"
                  >
                    {t('common.delete')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {alerts?.length === 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-16 rounded-sm text-center">
          <div className="mb-6">
            <span className="material-symbols-outlined text-7xl text-slate-600/50">notifications_off</span>
          </div>
          <p className="text-slate-400 mb-2 font-light text-lg">
            {t('alerts.noAlerts')}
          </p>
          <p className="text-slate-500 text-sm font-light">
            {t('alerts.noAlertsDesc')}
          </p>
        </div>
      )}
    </div>
  );
}
