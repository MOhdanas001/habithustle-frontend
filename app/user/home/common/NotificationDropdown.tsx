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
      className="absolute right-0 mt-2 w-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-slate-700 z-[100] max-h-[500px] overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-700 flex justify-between items-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div>
          <h3 className="font-bold text-white text-lg">Notifications</h3>
          {unreadCount > 0 && (
            <p className="text-xs text-cyan-400 font-semibold">
              {unreadCount} new notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <button className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold hover:underline" onClick={onMarkAllRead}>
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
                className={`px-5 py-4 hover:bg-slate-800/80 transition-all cursor-pointer border-b border-slate-700 last:border-b-0 ${
                  notification.unread ? 'bg-cyan-500/10' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-white text-sm">
                        {notification.title}
                      </h4>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                    <p className="text-sm text-slate-300 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
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
                          className="flex-1 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-xs font-semibold rounded-lg transition-all"
                        >
                          Accept
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRespondToRequest(notification.id, false);
                          }}
                          className="flex-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-all"
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
          <div className="px-5 py-12 text-center text-slate-400">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <p className="font-semibold">No notifications</p>
            <p className="text-sm mt-1">You're all caught up!</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-700 bg-slate-800/80">
          <button className="w-full text-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-all">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}
