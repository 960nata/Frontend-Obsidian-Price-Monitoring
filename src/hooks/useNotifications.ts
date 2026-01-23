import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useAuthStore } from '../store/auth.store';
import { UserRole } from '../types/user.types';

export const useNotifications = () => {
  const { user } = useAuthStore();
  const [permission, setPermission] = useState<NotificationPermission>('default');

  // Check if user is admin or superadmin
  const isAdmin = user?.role === UserRole.ADMIN || user?.role === UserRole.SUPERADMIN;

  // Get unread alerts count (for regular users) or system stats (for admin)
  const { data: unreadCount = 0, refetch } = useQuery<number>({
    queryKey: ['unread-alerts-count'],
    queryFn: async () => {
      if (isAdmin) {
        // Admin can check system stats or other metrics
        try {
          const response = await api.get('/admin/analytics');
          // Return a count based on system metrics if needed
          return 0; // Admin doesn't have personal alerts, but can use notifications
        } catch {
          return 0;
        }
      }
      const response = await api.get('/dashboard/stats');
      return response.data.unreadAlerts || 0;
    },
    enabled: !!user,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Request notification permission
  useEffect(() => {
    if (!('Notification' in window)) {
      return;
    }

    if (Notification.permission === 'default') {
      setPermission('default');
    } else {
      setPermission(Notification.permission);
    }
  }, []);

  // Request permission
  const requestPermission = async () => {
    if (!('Notification' in window)) {
      return false;
    }

    const perm = await Notification.requestPermission();
    setPermission(perm);
    return perm === 'granted';
  };

  // Update permission state when it changes
  useEffect(() => {
    if (!('Notification' in window)) {
      return;
    }

    // Listen for permission changes
    const checkPermission = () => {
      setPermission(Notification.permission);
    };

    // Check permission on mount and periodically
    checkPermission();
    const interval = setInterval(checkPermission, 1000);

    return () => clearInterval(interval);
  }, []);

  // Show browser notification
  const showNotification = (title: string, options?: NotificationOptions) => {
    if (!('Notification' in window)) {
      console.warn('Browser does not support notifications');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options,
      });
    } else if (Notification.permission === 'default') {
      // If permission is default, request it first
      requestPermission().then((granted) => {
        if (granted) {
          new Notification(title, {
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            ...options,
          });
        }
      });
    } else {
      console.warn('Notification permission denied. Please enable notifications in browser settings.');
    }
  };

  // Monitor for new alerts and show push notification
  useEffect(() => {
    if (!user) return;

    // For regular users: show price alerts
    // For admin: notifications are available via showNotification function
    if (isAdmin) {
      // Admin can manually trigger notifications using showNotification function
      // No automatic alerts for admin
      return;
    }

    let previousCount = unreadCount;

    const checkNewAlerts = () => {
      refetch().then((result) => {
        const currentCount = result.data || 0;
        if (currentCount > previousCount && previousCount > 0) {
          const newAlerts = currentCount - previousCount;
          showNotification(
            `${newAlerts} New Alert${newAlerts > 1 ? 's' : ''}`,
            {
              body: `You have ${newAlerts} new price alert${newAlerts > 1 ? 's' : ''}`,
              tag: 'price-alert',
              requireInteraction: false,
            }
          );
        }
        previousCount = currentCount;
      });
    };

    // Check every 30 seconds
    const interval = setInterval(checkNewAlerts, 30000);

    return () => clearInterval(interval);
  }, [unreadCount, isAdmin, user, refetch]);

  return {
    unreadCount,
    permission,
    requestPermission,
    showNotification,
    isAdmin,
  };
};
