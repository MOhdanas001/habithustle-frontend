'use client';

import { useEffect, useState, useCallback } from 'react';
import { ref, onValue, remove, off } from 'firebase/database';
import { database } from '@/app/config/firebase';

export interface Notification {
  id: string;
  type: 'bet_invite' | 'bet_won' | 'bet_completed' | 'streak_milestone' | 'friend_joined' | 'FRIEND_REQUEST';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  senderId?: string;
  senderName?: string;
  status?: string;
  timestamp?: number;
}

interface UseFirebaseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isConnected: boolean;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  acceptFriendRequest: (notificationId: string) => void;
  declineFriendRequest: (notificationId: string) => void;
}

function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function convertFirebaseNotification(key: string, data: any): Notification {
  const type = data.type;
  
  let title = 'New Notification';
  let message = data.message || 'You have a new notification';
  
  if (type === 'friend_request') {
    title = 'New Friend Request';
    message = `${data.senderName || 'Someone'} wants to be your friend`;
  } else if (type === 'bet_invite') {
    title = 'New Bet Invitation';
    message = data.message || `${data.senderName} invited you to join a bet`;
  }
  
  return {
    id: key,
    type: type as Notification['type'],
    title,
    message,
    time: formatTimestamp(data.timestamp || Date.now()),
    unread: true,
    senderId: data.senderId,
    senderName: data.senderName,
    status: data.status,
    timestamp: data.timestamp
  };
}

export function useFirebaseNotifications(userId?: string): UseFirebaseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);


  useEffect(() => {

    if (!userId) {
      console.log('No user ID provided for Firebase notifications');
      return;
    }

    console.log('Setting up Firebase listener for user:', userId);
    const notificationsRef = ref(database, `notifications/${userId}`);

    // Listen for real-time updates
    const unsubscribe = onValue(
      notificationsRef,
      (snapshot) => {
        setIsConnected(true);
        const data = snapshot.val();
        
        if (data) {
          console.log('Firebase notifications data:', data);
          const notificationsList: Notification[] = [];
          
          Object.keys(data).forEach((key) => {
            const notification = convertFirebaseNotification(key, data[key]);
            notificationsList.push(notification);
          });
          
          // Sort by timestamp (newest first)
          notificationsList.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          
          setNotifications(notificationsList);
        } else {
          setNotifications([]);
        }
      },
      (error) => {
        console.error('Firebase error:', error);
        setIsConnected(false);
      }
    );

    // Cleanup listener on unmount
    return () => {
      off(notificationsRef);
      unsubscribe();
    };
  }, [userId]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, unread: false }))
    );
  }, []);

  const acceptFriendRequest = useCallback(async (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (!notification?.senderId || !userId) return;

    try {
      // Call your backend API to accept the friend request
      const response = await fetch('/api/friends/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ friendId: notification.senderId })
      });

      if (response.ok) {
        // Remove notification from Firebase
        const notificationRef = ref(database, `notifications/${userId}/${notificationId}`);
        await remove(notificationRef);
        console.log('Friend request accepted and notification removed');
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  }, [notifications, userId]);

  const declineFriendRequest = useCallback(async (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (!notification?.senderId || !userId) return;

    try {
      // Call your backend API to decline the friend request
      const response = await fetch('/api/friends/decline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ friendId: notification.senderId })
      });

      if (response.ok) {
        // Remove notification from Firebase
        const notificationRef = ref(database, `notifications/${userId}/${notificationId}`);
        await remove(notificationRef);
        console.log('Friend request declined and notification removed');
      }
    } catch (error) {
      console.error('Error declining friend request:', error);
    }
  }, [notifications, userId]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead,
    acceptFriendRequest,
    declineFriendRequest
  };
}

// Export as useWebSocket for backward compatibility
export { useFirebaseNotifications as useWebSocket };
