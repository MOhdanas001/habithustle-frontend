'use client';
import React, { useState } from 'react';
import { Trophy, Users, TrendingUp,  Flame, Target, ArrowRight, Zap} from 'lucide-react';

import { SignupModal } from './user/home/common/SignupModal';

export default function HabitBetLanding() {
  const [showLoginModal, setShowLoginModal] = useState(false);


  const featuredBets = [
    { id: 1, habit: 'Morning Workout', participants: 156, stake: 5000, category: 'Fitness', trending: true },
    { id: 2, habit: 'No Social Media', participants: 89, stake: 3200, category: 'Productivity', trending: true },
    { id: 3, habit: 'Read 30 mins daily', participants: 234, stake: 7800, category: 'Learning', trending: false },
    { id: 4, habit: 'Meditation Daily', participants: 178, stake: 4500, category: 'Wellness', trending: false },
    { id: 5, habit: 'No Junk Food', participants: 145, stake: 6100, category: 'Health', trending: true },
    { id: 6, habit: 'Learn New Skill', participants: 92, stake: 3800, category: 'Growth', trending: false },
  ];

  const topPerformers = [
    { rank: 1, name: 'Sarah M.', wins: 48, streak: 45 },
    { rank: 2, name: 'Mike R.', wins: 42, streak: 38 },
    { rank: 3, name: 'Alex K.', wins: 39, streak: 41 },
  ];

  const features = [
    { icon: Target, title: 'Create Habits', desc: 'Set any habit goal and challenge friends' },
    { icon: Users, title: 'Bet with Friends', desc: 'Add friends and compete together' },
    { icon: TrendingUp, title: 'Track Progress', desc: 'Monitor your streaks and wins' },
    { icon: Trophy, title: 'Win Rewards', desc: 'Complete habits and earn your stakes' },
  ];

  const handleActionClick = () => {
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white text-black p-2 rounded-lg">
                <Trophy className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold">HabitBet</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleActionClick}
                className="text-white hover:text-gray-300 transition-colors font-medium hidden sm:block"
              >
                Sign In
              </button>
              <button 
                onClick={handleActionClick}
                className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/20">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm">Join 10,000+ users building better habits</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Bet on Your Habits.<br />
          <span className="text-gray-400">Win Real Stakes.</span>
        </h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Challenge friends, stay accountable, and earn rewards by completing your daily habits. Turn self-improvement into a competitive game.
        </p>
        <button 
          onClick={handleActionClick}
          className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all transform hover:scale-105 inline-flex items-center space-x-2"
        >
          <span>Start Your First Bet</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">$2.4M+</div>
              <div className="text-gray-400 text-sm">Total Stakes</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">10K+</div>
              <div className="text-gray-400 text-sm">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">50K+</div>
              <div className="text-gray-400 text-sm">Bets Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">89%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bets */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold mb-2">Trending Bets</h3>
            <p className="text-gray-400">See what others are betting on right now</p>
          </div>
          <button 
            onClick={handleActionClick}
            className="text-white hover:text-gray-300 transition-colors font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBets.map((bet) => (
            <div
              key={bet.id}
              onClick={handleActionClick}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer group relative overflow-hidden"
            >
              {bet.trending && (
                <div className="absolute top-4 right-4">
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                    <Flame className="w-3 h-3" />
                    <span>Hot</span>
                  </div>
                </div>
              )}
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-2">{bet.category}</div>
                <h4 className="text-xl font-bold group-hover:text-white transition-colors mb-3">
                  {bet.habit}
                </h4>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{bet.participants} joined</span>
                  </div>
                  <div className="font-bold text-white">
                    ${bet.stake.toLocaleString()}
                  </div>
                </div>
              </div>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-all font-medium">
                Join Bet
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-2">How It Works</h3>
            <p className="text-gray-400">Start betting on habits in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-2">Top Performers</h3>
          <p className="text-gray-400">See who&apos;s crushing their habits</p>
        </div>
        <div className="max-w-2xl mx-auto space-y-4">
          {topPerformers.map((performer) => (
            <div
              key={performer.rank}
              onClick={handleActionClick}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  performer.rank === 1 ? 'bg-yellow-500 text-black' :
                  performer.rank === 2 ? 'bg-gray-300 text-black' :
                  'bg-orange-600 text-white'
                }`}>
                  {performer.rank}
                </div>
                <div>
                  <div className="font-bold text-lg">{performer.name}</div>
                  <div className="text-sm text-gray-400">{performer.wins} wins</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-bold">{performer.streak} days</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-4">Ready to Build Better Habits?</h3>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of users who are transforming their lives, one bet at a time.
          </p>
          <button 
            onClick={handleActionClick}
            className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Create Your First Bet</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Login/Signup Modal */}
      {showLoginModal && (
       <SignupModal setShowLoginModal={setShowLoginModal} />
      )}
    </div>
  );
}