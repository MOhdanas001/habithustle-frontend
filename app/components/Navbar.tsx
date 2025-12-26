"use client";
import { Bell, LogOut, Plus, Trophy, User } from "lucide-react";
import { useRef, useState } from "react";
import { useFirebaseNotifications } from "../hooks/useFirebaseNotifications";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import NotificationDropdown from "../user/home/common/NotificationDropdown";
import { SignupModal } from "../user/home/common/SignupModal";
import PageLoader from "./PageLoader";


export default function Navbar() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotificationMenu, setShowNotificationMenu] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const menuTimeout = useRef<NodeJS.Timeout | null>(null);
    const { user, loading, refetch } = useUser();
    const router = useRouter();
    const {notifications,unreadCount, isConnected,markAllAsRead,respondToRequest} = useFirebaseNotifications(user?.id);

    // Default CTA handler for unauthenticated users; shows signup/login modal
    const handleActionClick = () => {
        setShowLoginModal(true);
    };


    async function handleLogout() {
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
            if (res.ok) {
                router.push('/');
                refetch();
            }
        } catch (err) {
            console.error('Logout failed', err);
        }
    }

    const handleMouseEnter = (type: 'profile' | 'notification') => {
        if (menuTimeout.current) {
            clearTimeout(menuTimeout.current);
        }
        if (type === 'profile') {
            setShowProfileMenu(true);
            setShowNotificationMenu(false);
        } else {
            setShowNotificationMenu(true);
            setShowProfileMenu(false);
        }
    };

    const handleMouseLeave = (type: 'profile' | 'notification') => {
        menuTimeout.current = setTimeout(() => {
            if (type === 'profile') {
                setShowProfileMenu(false);
                setShowNotificationMenu(false);
            } else {
                setShowNotificationMenu(false);
                setShowProfileMenu(false);
            }
        }, 200);
    };
    // Prevent flicker: while auth state is loading, render a minimal placeholder
    if(loading){
        return <PageLoader  />;
    } 

    if (!user) {
        return (
            <>
                <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="bg-purple-600 text-white p-2.5 rounded-2xl shadow-lg">
                                    <Trophy className="w-7 h-7" />
                                </div>
                                <h1 className="text-3xl font-black bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">HabitBet</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleActionClick}
                                    className="text-gray-700 hover:text-purple-600 transition-colors font-bold hidden sm:block"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={handleActionClick}
                                    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-7 py-3 rounded-2xl font-black hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                                >
                                    Get Started ✨
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                {showLoginModal && (
                    <SignupModal setShowLoginModal={setShowLoginModal} />
                )}
            </>
        );
    }

    return (
        <nav className="flex justify-between items-center mb-8 p-5 bg-white rounded-3xl shadow-md backdrop-blur-sm border border-gray-100 relative z-50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
                    HabitBet
                </h1>
            </div>
            <div className="flex gap-3 items-center">
                <button onClick={()=>router.push('/user/bet')} className="px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-2xl transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
                    <Plus className="w-5 h-5 inline mr-2" />
                    Create Bet
                </button>

                {/* Notification Bell with Badge */}
                <div className="relative">
                    <button
                        onMouseEnter={() => handleMouseEnter('notification')}
                        onMouseLeave={() => handleMouseLeave('notification')}
                        className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition-all transform hover:scale-105 relative"
                    >
                        <Bell className="w-6 h-6" />
                        {/* Notification Badge - Only show if there are unread notifications */}
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-[24px] h-6 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                                {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                        )}
                        {/* Connection status indicator */}
                        {isConnected && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                        )}
                    </button>

                    {/* Dropdown Menu */}
                    {showNotificationMenu && (
                        <NotificationDropdown
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                            notifications={notifications}
                            unreadCount={unreadCount}
                            onMarkAllRead={markAllAsRead}
                            onRespondToRequest={respondToRequest}
            
                        />
                    )}
                </div>
                <div className="relative">
                    <button
                        onMouseEnter={() => handleMouseEnter('profile')}
                        onMouseLeave={() => handleMouseLeave('profile')}
                        className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition-all transform hover:scale-105"
                    >
                        {user?.name?.charAt(0) || 'U'}
                    </button>

                    {/* Dropdown Menu */}
                    {showProfileMenu && (
                        <div
                            onMouseEnter={() => handleMouseEnter('profile')}
                            onMouseLeave={() => handleMouseLeave('profile')}
                            className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[100]"
                        >
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="font-bold text-gray-800">{user?.name || 'User'}</p>
                                <p className="text-sm text-gray-500">{user?.email || 'No email'}</p>
                                <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-lg font-semibold">
                                    {user?.role || 'Member'}
                                </span>
                            </div>
                            <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-all flex items-center gap-3 text-gray-700 font-semibold">
                                <User className="w-5 h-5 text-purple-500" />
                                Profile
                            </button>
                            <button onClick={handleLogout} className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-all flex items-center gap-3 text-red-600 font-semibold">
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}