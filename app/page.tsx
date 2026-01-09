'use client';
import { Trophy, Users, TrendingUp, Flame, Target, ArrowRight, Sparkles } from 'lucide-react';
import { SignupModal } from './user/home/common/SignupModal';
import { useState } from 'react';

export default function HabitBetLanding() {

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleActionClick = () => {
    setShowLoginModal(true);
  };

  const featuredBets = [
    { id: 1, habit: '🏃‍♂️ Morning Workout', participants: 156, stake: 5000, category: 'Fitness', trending: true, color: 'from-blue-400 to-cyan-400' },
    { id: 2, habit: '📱 No Social Media', participants: 89, stake: 3200, category: 'Productivity', trending: true, color: 'from-purple-400 to-pink-400' },
    { id: 3, habit: '📚 Read 30 mins daily', participants: 234, stake: 7800, category: 'Learning', trending: false, color: 'from-green-400 to-emerald-400' },
    { id: 4, habit: '🧘‍♀️ Meditation Daily', participants: 178, stake: 4500, category: 'Wellness', trending: false, color: 'from-indigo-400 to-purple-400' },
    { id: 5, habit: '🥗 No Junk Food', participants: 145, stake: 6100, category: 'Health', trending: true, color: 'from-orange-400 to-red-400' },
    { id: 6, habit: '💡 Learn New Skill', participants: 92, stake: 3800, category: 'Growth', trending: false, color: 'from-yellow-400 to-orange-400' },
  ];

  const topPerformers = [
    { rank: 1, name: 'Sarah M.', wins: 48, streak: 45 },
    { rank: 2, name: 'Mike R.', wins: 42, streak: 38 },
    { rank: 3, name: 'Alex K.', wins: 39, streak: 41 },
  ];

  const features = [
    { icon: Target, title: 'Create Habits', desc: 'Set any habit goal and challenge friends', color: 'from-purple-400 to-purple-500' },
    { icon: Users, title: 'Bet with Friends', desc: 'Add friends and compete together', color: 'from-pink-400 to-pink-500' },
    { icon: TrendingUp, title: 'Track Progress', desc: 'Monitor your streaks and wins', color: 'from-blue-400 to-blue-500' },
    { icon: Trophy, title: 'Win Rewards', desc: 'Complete habits and earn your stakes', color: 'from-yellow-400 to-orange-500' },
  ];


  return (
    <>
        <header className="border-b border-slate-700 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white p-2.5 rounded-2xl shadow-lg">
                <Trophy className="w-7 h-7" />
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">HabitBet</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleActionClick}
                className="text-slate-300 hover:text-cyan-400 transition-colors font-bold hidden sm:block"
              >
                Sign In
              </button>
              <button
                onClick={handleActionClick}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-7 py-3 rounded-2xl font-black hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
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

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">


      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="relative">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-3 rounded-full mb-8 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-black">Join 10,000+ users building better habits</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight text-white">
            Bet on Your Habits.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Win Real Stakes.</span>
          </h2>
          <p className="text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-bold leading-relaxed">
            Challenge friends, stay accountable, and earn rewards by completing your daily habits. Turn self-improvement into a competitive game 🎮
          </p>
          <button 
            // onClick={handleActionClick}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xl hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-110 inline-flex items-center space-x-3 shadow-2xl"
          >
            <span>Start Your First Bet</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-2 rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-6 py-10">
            <div>
              <div className="text-5xl font-black text-cyan-400 mb-2">$2.4M+</div>
              <div className="text-slate-400 text-sm font-bold">Total Stakes</div>
            </div>
            <div>
              <div className="text-5xl font-black text-cyan-400 mb-2">10K+</div>
              <div className="text-slate-400 text-sm font-bold">Active Users</div>
            </div>
            <div>
              <div className="text-5xl font-black text-cyan-400 mb-2">50K+</div>
              <div className="text-slate-400 text-sm font-bold">Bets Created</div>
            </div>
            <div>
              <div className="text-5xl font-black text-cyan-400 mb-2">89%</div>
              <div className="text-slate-400 text-sm font-bold">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bets */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-5xl font-black text-white mb-3 flex items-center gap-3">
              Trending Bets 🔥
            </h3>
            <p className="text-slate-300 font-bold text-lg">See what others are betting on right now</p>
          </div>
          <button 
            onClick={handleActionClick}
            className="text-cyan-400 hover:text-cyan-300 transition-colors font-black flex items-center space-x-2 text-lg"
          >
            <span>View All</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBets.map((bet) => (
            <div
              key={bet.id}
              onClick={handleActionClick}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-slate-700 rounded-3xl p-7 hover:shadow-2xl hover:border-cyan-400 transition-all cursor-pointer group relative overflow-hidden transform hover:scale-105"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400 opacity-10 rounded-full -mr-20 -mt-20"></div>
              
              {bet.trending && (
                <div className="absolute top-5 right-5">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs px-4 py-2 rounded-full flex items-center space-x-1 font-black shadow-lg animate-pulse">
                    <Flame className="w-4 h-4" />
                    <span>HOT</span>
                  </div>
                </div>
              )}
              <div className="mb-5 relative z-10">
                <div className="text-xs font-black mb-3 text-cyan-400">
                  {bet.category.toUpperCase()}
                </div>
                <h4 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors mb-4">
                  {bet.habit}
                </h4>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-slate-300 font-bold">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <span>{bet.participants} joined</span>
                  </div>
                  <div className="font-black text-2xl text-cyan-400">
                    ${bet.stake.toLocaleString()}
                  </div>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-2xl transition-all font-black shadow-md">
                Join Bet →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-y border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black text-white mb-4">How It Works ⚡</h3>
            <p className="text-slate-300 font-bold text-xl">Start betting on habits in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="text-center bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
                <div className={`bg-gradient-to-br ${feature.color} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-md transform hover:scale-110 transition-all`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-black text-xl mb-3 text-white">{feature.title}</h4>
                <p className="text-slate-300 font-semibold">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-5xl font-black text-white mb-4">Top Performers 🏆</h3>
          <p className="text-slate-300 font-bold text-lg">See who&apos;s crushing their habits</p>
        </div>
        <div className="max-w-2xl mx-auto space-y-5">
          {topPerformers.map((performer) => (
            <div
              key={performer.rank}
              // onClick={handleActionClick}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-slate-700 rounded-3xl p-7 hover:shadow-2xl hover:border-cyan-400 transition-all cursor-pointer flex items-center justify-between transform hover:scale-105"
            >
              <div className="flex items-center space-x-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg ${
                  performer.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' :
                  performer.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                  'bg-gradient-to-br from-orange-400 to-orange-500 text-white'
                }`}>
                  {performer.rank}
                </div>
                <div>
                  <div className="font-black text-xl text-white">{performer.name}</div>
                  <div className="text-sm text-slate-300 font-bold">{performer.wins} wins 🎯</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-orange-500/20 px-5 py-3 rounded-2xl">
                <Flame className="w-6 h-6 text-orange-400" />
                <span className="font-black text-xl text-orange-400">{performer.streak}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-cyan-500 to-blue-500 border-y-4 border-cyan-400 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="text-6xl font-black mb-6 text-white">Ready to Build Better Habits? 🚀</h3>
          <p className="text-2xl text-blue-100 mb-10 font-bold leading-relaxed">
            Join thousands of users who are transforming their lives, one bet at a time.
          </p>
          <button 
            // onClick={handleActionClick}
            className="bg-white text-cyan-500 px-10 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all transform hover:scale-110 inline-flex items-center space-x-3 shadow-2xl"
          >
            <span>Create Your First Bet</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-800 to-slate-900 border-t-2 border-cyan-400">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-2 rounded-xl">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">HabitBet</span>
          </div>
          <p className="text-slate-400 font-bold">© 2024 HabitBet. Build better habits, together. ✨</p>
        </div>
      </footer>

      
    </div>
        </>
  );
}