'use client';

import { useEffect, useState, useCallback } from 'react';
import { ref, onValue, remove, off } from 'firebase/database';
import { database } from '@/app/config/firebase';

export interface Notification {
  id: string; // senderId (node key)
  type: 'FRIEND_REQUEST';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  senderId: string;
  senderName: string;
  status: string;
  timestamp: number;
  profilepic?: string;
  username?: string;
}

interface UseFirebaseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isConnected: boolean;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  respondToRequest: (senderId: string, accept: boolean) => void;
}

function formatTimestamp(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function useFirebaseNotifications(
  userId?: string
): UseFirebaseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // =======================
  // Firebase Listener
  // =======================
  useEffect(() => {
    if (!userId) return;

    const notificationsRef = ref(database, `notifications/${userId}`);

    const unsubscribe = onValue(
      notificationsRef,
      (snapshot) => {
        setIsConnected(true);
        const data = snapshot.val();

        if (!data) {
          setNotifications([]);
          return;
        }

        const list: Notification[] = [];

        // ONE sender node = ONE notification
        Object.entries(data).forEach(([senderId, n]: any) => {
          list.push({
            id: senderId,
            type: n.type,
            title: 'New Friend Request',
            message: `${n.senderName} sent you a friend request`,
            time: formatTimestamp(n.timestamp),
            unread: true,
            senderId: n.senderId,
            senderName: n.senderName,
            status: n.status,
            timestamp: n.timestamp,
            profilepic: n.profilepic,
            username: n.username
          });
        });

        list.sort((a, b) => b.timestamp - a.timestamp);
        setNotifications(list);
      },
      (error) => {
        console.error('Firebase listener error:', error);
        setIsConnected(false);
      }
    );

    return () => {
      off(notificationsRef);
      unsubscribe();
    };
  }, [userId]);

  // =======================
  // Local Read State
  // =======================
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  // =======================
  // Accept Friend Request
  // =======================
  const respondToRequest = useCallback(
    async (senderId: string, accept: boolean) => {
      if (!userId) return;

      try {
        const res = await fetch('/api/friends/respond', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ senderId: senderId, accept: accept })
        });

        if (!res.ok) throw new Error('Accept failed');

        await remove(ref(database, `notifications/${userId}/${senderId}`));
      } catch (err) {
        console.error('Accept friend request failed:', err);
      }
    },
    [userId]
  );

  const unreadCount = notifications.filter((n) => n.unread).length;

  return {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead,
   respondToRequest
  };
}

// backward compatibility
export { useFirebaseNotifications as useWebSocket };
