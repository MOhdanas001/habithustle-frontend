"use client";
import  { useState, } from 'react';
import { Search, TrendingUp, Users, Trophy, Calendar, Target, Plus, UserPlus, Award, Flame, Zap, User, LogOut, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';
import { betApi } from '@/app/hooks/useroute';
import BetsPage from './common/bets';




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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 p-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-3 text-white flex items-center gap-3">
              Welcome back, Champion! 🏆
            </h2>
            <p className="text-blue-100 text-xl mb-3 font-semibold">Keep pushing your limits and winning bets</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-green-400 text-sm font-black bg-green-900/30 px-3 py-1.5 rounded-xl">{stat.trend}</span>
              </div>
              <div className="text-4xl font-black text-cyan-400 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-300 text-sm font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
         <BetsPage />
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="p-8 bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-3xl shadow-2xl hover:shadow-2xl transition-all transform hover:scale-105">
            <Plus className="w-12 h-12 mb-4 mx-auto" />
            <h3 className="font-black text-xl mb-2">Create New Bet</h3>
            <p className="text-sm text-blue-100 font-semibold">Challenge friends on a new habit</p>
          </button>
          <button className="p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 text-white rounded-3xl shadow-xl hover:shadow-2xl border border-slate-700 hover:border-cyan-400 transition-all transform hover:scale-105" onClick={() => router.push('/user/friends')}>
            <UserPlus className="w-12 h-12 mb-4 mx-auto text-cyan-400" />
            <h3 className="font-black text-xl mb-2">Invite Friends</h3>
            <p className="text-sm text-slate-300 font-semibold">Add friends to your bets</p>
          </button>
          <button className="p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 text-white rounded-3xl shadow-xl hover:shadow-2xl border border-slate-700 hover:border-cyan-400 transition-all transform hover:scale-105">
            <Award className="w-12 h-12 mb-4 mx-auto text-cyan-400" />
            <h3 className="font-black text-xl mb-2">Leaderboard</h3>
            <p className="text-sm text-slate-300 font-semibold">See top performers</p>
          </button>
        </div>
      </div>
    </div>
  );
}