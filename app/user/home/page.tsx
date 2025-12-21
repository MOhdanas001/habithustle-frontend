"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Users, TrendingUp, Plus, Search, Flame, Target, Clock, Crown } from 'lucide-react';

export default function HabitBetHome() {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();


  useEffect(() => {
    let mounted = true;
    async function fetchMe() {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) {
          router.replace('/');
          return;
        }
        const data = await res.json();
        if (mounted) setUser(data?.user || data || null);
      } catch (err) {
        console.error('Failed to fetch /api/me', err);
        router.replace('/');
      } finally {
        if (mounted) setLoadingUser(false);
      }
    }
    fetchMe();
    return () => {
      mounted = false;
    };
  }, [router]);

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error('Logout failed', err);
    }
    try { localStorage.removeItem('token'); } catch {}
    router.push('/');
  }

  const activeBets = [
    { id: 1, habit: 'Morning Workout', creator: 'You', participants: 4, stake: 100, daysLeft: 12, progress: 75, streak: 9 },
    { id: 2, habit: 'No Social Media', creator: 'Alex', participants: 3, stake: 50, daysLeft: 5, progress: 60, streak: 18 },
    { id: 3, habit: 'Read 30 mins daily', creator: 'Sarah', participants: 5, stake: 75, daysLeft: 20, progress: 85, streak: 20 },
  ];

  const completedBets = [
    { id: 4, habit: 'Meditation Daily', winner: 'You', participants: 3, won: 150 },
    { id: 5, habit: 'No Coffee', winner: 'Mike', participants: 4, won: 200 },
  ];

  const stats = [
    { label: 'Active Bets', value: '3', icon: Target, trend: '+2' },
    { label: 'Win Rate', value: '67%', icon: Trophy, trend: '+5%' },
    { label: 'Current Streak', value: '20', icon: Flame, trend: '+3' },
    { label: 'Total Won', value: '$450', icon: TrendingUp, trend: '+$150' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white text-black p-2 rounded-lg">
                <Trophy className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold">HabitBet</h1>
            </div>
            <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Create Bet</span>
            </button>
            <button onClick={handleLogout} className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center space-x-2">
              <span>{loadingUser ? '...' : user ? `Logout (${user.username || user.name || user.email})` : 'Logout'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Champion! 🏆</h2>
          <p className="text-gray-400">Keep pushing your limits and winning bets</p>
          {user && (
            <div className="mt-3 text-sm text-gray-300">
              Signed in as <strong>{user.name || user.username || user.email}</strong> ({user.role})
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer transform hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <stat.icon className="w-8 h-8 text-white" />
                <span className="text-green-400 text-sm font-semibold">{stat.trend}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bets or friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-all"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-white/10">
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 px-2 font-semibold transition-all ${
              activeTab === 'active'
                ? 'border-b-2 border-white text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Active Bets ({activeBets.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 px-2 font-semibold transition-all ${
              activeTab === 'completed'
                ? 'border-b-2 border-white text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Completed ({completedBets.length})
          </button>
        </div>

        {/* Active Bets */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {activeBets.map((bet) => (
              <div
                key={bet.id}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold group-hover:text-white transition-colors">
                        {bet.habit}
                      </h3>
                      {bet.creator === 'You' && (
                        <span className="bg-white/10 text-xs px-2 py-1 rounded-full">Creator</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{bet.participants} participants</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{bet.daysLeft} days left</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span>{bet.streak} day streak</span>
                      </div>
                      <div className="font-semibold text-white">
                        ${bet.stake} at stake
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-64">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Your Progress</span>
                      <span className="text-sm font-semibold">{bet.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all"
                        style={{ width: `${bet.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Bets */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedBets.map((bet) => (
              <div
                key={bet.id}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{bet.habit}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{bet.participants} participants</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        <span className="text-white">Winner: {bet.winner}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">+${bet.won}</div>
                    <div className="text-sm text-gray-400">Won</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all text-left group">
            <Plus className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold mb-1">Create New Bet</h3>
            <p className="text-sm text-gray-400">Challenge friends on a new habit</p>
          </button>
          
          <button className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all text-left group">
            <Users className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold mb-1">Invite Friends</h3>
            <p className="text-sm text-gray-400">Add friends to your bets</p>
          </button>
          
          <button className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all text-left group">
            <Trophy className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold mb-1">Leaderboard</h3>
            <p className="text-sm text-gray-400">See top performers</p>
          </button>
        </div>
      </div>
    </div>
  );
}