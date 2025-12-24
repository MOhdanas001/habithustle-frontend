import { Trophy, UserPlus, Target, TrendingUp, Clock, CheckCircle2, Users, UserCheck } from "lucide-react";

interface NotificationDropdownProps {
  handleMouseEnter: (type: 'profile' | 'notification') => void;
  handleMouseLeave: (type: 'profile' | 'notification') => void;
  notifications: Notification[];
  unreadCount: number;
  onMarkAllRead: () => void;
 onRespondToRequest: (notificationId: number, accept: boolean) => void;
}

interface Notification {
  id: number;
  type: 'bet_invite' | 'bet_won' | 'bet_completed' | 'streak_milestone' | 'friend_joined' | 'FRIEND_REQUEST';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon?: typeof Trophy;
  iconColor?: string;
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'FRIEND_REQUEST':
      return { icon: Users, color: 'text-pink-500' };
    case 'bet_invite':
      return { icon: UserPlus, color: 'text-blue-500' };
    case 'bet_won':
      return { icon: Trophy, color: 'text-yellow-500' };
    case 'streak_milestone':
      return { icon: Target, color: 'text-orange-500' };
    case 'bet_completed':
      return { icon: CheckCircle2, color: 'text-green-500' };
    case 'friend_joined':
      return { icon: UserCheck, color: 'text-purple-500' };
    default:
      return { icon: Trophy, color: 'text-gray-500' };
  }
};

export default function NotificationDropdown({ 
  handleMouseEnter, 
  handleMouseLeave, 
  notifications,
  unreadCount,
  onMarkAllRead,
  onRespondToRequest
}: NotificationDropdownProps) {
        
console.log('Rendering NotificationDropdown with notifications:', notifications);

  return (
    <div
      onMouseEnter={() => handleMouseEnter('notification')}
      onMouseLeave={() => handleMouseLeave('notification')}
      className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-[100] max-h-[500px] overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-purple-50 to-pink-50">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">Notifications</h3>
          {unreadCount > 0 && (
            <p className="text-xs text-purple-600 font-semibold">
              {unreadCount} new notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <button className="text-xs text-purple-600 hover:text-purple-700 font-semibold hover:underline" onClick={onMarkAllRead}>
          Mark all read
        </button>
      </div>

      {/* Notifications List */}
      <div className="overflow-y-auto max-h-[400px] custom-scrollbar">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const { icon: Icon, color } = getNotificationIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`px-5 py-4 hover:bg-gray-50 transition-all cursor-pointer border-b border-gray-50 last:border-b-0 ${
                  notification.unread ? 'bg-purple-50/30' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {notification.title}
                      </h4>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{notification.time}</span>
                    </div>
                    
                    {/* Friend Request Action Buttons */}
                    {notification.type === 'FRIEND_REQUEST' && (
                      <div className="flex gap-2 mt-3">
                        <h1>{notification.senderName} wants to be your friend</h1>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRespondToRequest(notification.id, true);
                          }}
                          className="flex-1 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-xs font-semibold rounded-lg transition-all"
                        >
                          Accept
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRespondToRequest(notification.id, false);
                          }}
                          className="flex-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-lg transition-all"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-5 py-12 text-center text-gray-400">
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-gray-300" />
            </div>
            <p className="font-semibold">No notifications</p>
            <p className="text-sm mt-1">You're all caught up!</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <button className="w-full text-center text-sm font-semibold text-purple-600 hover:text-purple-700 transition-all">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}
