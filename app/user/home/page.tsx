"use client";
import  { useState, } from 'react';
import { Search, TrendingUp, Users, Trophy, Calendar, Target, Plus, UserPlus, Award, Flame, Zap, User, LogOut, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';
import { betApi } from '@/app/hooks/useroute';




export default function HabitBetDashboard() {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { loading } = useUser();


  const stats = [
    { icon: Target, value: '3', label: 'Active Bets', trend: '+2' },
    { icon: Trophy, value: '67%', label: 'Win Rate', trend: '+5%' },
    { icon: Flame, value: '20', label: 'Current Streak', trend: '+3' },
    { icon: TrendingUp, value: '$450', label: 'Total Won', trend: '+$150' }
  ];

  const activeBets = [
    {
      id: 1,
      habit: '🏃‍♂️ Morning Run',
      creator: 'You',
      participants: 5,
      daysLeft: 12,
      streak: 8,
      stake: 50,
      progress: 67
    },
    {
      id: 2,
      habit: '📚 Read 30 Minutes',
      creator: 'Sarah',
      participants: 8,
      daysLeft: 5,
      streak: 15,
      stake: 30,
      progress: 85
    },
    {
      id: 3,
      habit: '🧘‍♀️ Daily Meditation',
      creator: 'Mike',
      participants: 12,
      daysLeft: 20,
      streak: 3,
      stake: 40,
      progress: 45
    }
  ];

  const completedBets = [
    {
      id: 1,
      habit: '💧 Drink 8 Glasses Water',
      participants: 6,
      winner: 'You',
      won: 180
    },
    {
      id: 2,
      habit: '🎨 Daily Sketch',
      participants: 4,
      winner: 'Emma',
      won: 0
    }
  ];

  const filteredActiveBets = activeBets.filter(bet =>
    bet.habit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompletedBets = completedBets.filter(bet =>
    bet.habit.toLowerCase().includes(searchQuery.toLowerCase())
  );

 

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 text-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 p-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-3 text-white flex items-center gap-3">
              Welcome back, Champion! 🏆
            </h2>
            <p className="text-purple-100 text-xl mb-3 font-semibold">Keep pushing your limits and winning bets</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 bg-white rounded-3xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-purple-500" />
                </div>
                <span className="text-green-600 text-sm font-black bg-green-100 px-3 py-1.5 rounded-xl">{stat.trend}</span>
              </div>
              <div className="text-4xl font-black text-purple-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your bets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-purple-200 rounded-2xl pl-14 pr-4 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all shadow-sm font-medium"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-8 bg-white p-2 rounded-2xl shadow-md w-fit">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-3 font-bold rounded-xl transition-all ${
              activeTab === 'active'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Active Bets ({activeBets.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 py-3 font-bold rounded-xl transition-all ${
              activeTab === 'completed'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Completed ({completedBets.length})
          </button>
        </div>

        {/* Active Bets */}
        {activeTab === 'active' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredActiveBets.map((bet) => (
              <div key={bet.id} className="p-6 bg-white rounded-3xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-black text-gray-800">{bet.habit}</h3>
                  {bet.creator === 'You' && (
                    <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1.5 rounded-xl font-bold">
                      Creator
                    </span>
                  )}
                </div>
                <div className="space-y-3 mb-5">
                  <div className="flex items-center text-sm text-gray-600 font-semibold">
                    <Users className="w-4 h-4 mr-2 text-purple-500" />
                    {bet.participants} participants
                  </div>
                  <div className="flex items-center text-sm text-gray-600 font-semibold">
                    <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                    {bet.daysLeft} days left
                  </div>
                  <div className="flex items-center text-sm text-gray-600 font-semibold">
                    <Flame className="w-4 h-4 mr-2 text-orange-500" />
                    {bet.streak} day streak 🔥
                  </div>
                  <div className="text-3xl font-black text-purple-600">
                    ${bet.stake}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-purple-600">{bet.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-400 to-purple-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${bet.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Bets */}
        {activeTab === 'completed' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCompletedBets.map((bet) => (
              <div key={bet.id} className="p-6 bg-white rounded-3xl shadow-md hover:shadow-lg transition-all border border-gray-100">
                <h3 className="text-2xl font-black mb-4 text-gray-800">{bet.habit}</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 font-semibold">
                    <Users className="w-4 h-4 mr-2 text-purple-500" />
                    {bet.participants} participants
                  </div>
                  <div className="flex items-center text-sm text-gray-600 font-semibold">
                    <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                    Winner: {bet.winner}
                  </div>
                  {bet.winner === 'You' && (
                    <div className="mt-4 p-5 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl shadow-md">
                      <div className="text-3xl font-black text-white flex items-center gap-2">
                        <Zap className="w-8 h-8" />
                        +${bet.won}
                      </div>
                      <div className="text-sm text-green-100 font-bold mt-1">You Won! 🎉</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="p-8 bg-gradient-to-br from-purple-400 to-purple-500 text-white rounded-3xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <Plus className="w-12 h-12 mb-4 mx-auto" />
            <h3 className="font-black text-xl mb-2">Create New Bet</h3>
            <p className="text-sm text-purple-100 font-semibold">Challenge friends on a new habit</p>
          </button>
          <button className="p-8 bg-white text-gray-800 rounded-3xl shadow-md hover:shadow-lg border border-gray-200 hover:border-purple-300 transition-all transform hover:scale-105" onClick={() => router.push('/user/friends')}>
            <UserPlus className="w-12 h-12 mb-4 mx-auto text-purple-500" />
            <h3 className="font-black text-xl mb-2">Invite Friends</h3>
            <p className="text-sm text-gray-600 font-semibold">Add friends to your bets</p>
          </button>
          <button className="p-8 bg-white text-gray-800 rounded-3xl shadow-md hover:shadow-lg border border-gray-200 hover:border-purple-300 transition-all transform hover:scale-105">
            <Award className="w-12 h-12 mb-4 mx-auto text-purple-500" />
            <h3 className="font-black text-xl mb-2">Leaderboard</h3>
            <p className="text-sm text-gray-600 font-semibold">See top performers</p>
          </button>
        </div>
      </div>
    </div>
  );
}