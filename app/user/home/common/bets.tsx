import { betApi } from "@/app/hooks/useroute";
import { Calendar, Clock, Flame, Search, Trophy, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function BetsPage() {
    const [activeTab, setActiveTab] = useState('active');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeBets, setActiveBets] = useState<any[]>([]);
    const [upcomingBets, setUpcomingBets] = useState<any[]>([]);
    const [completedBets, setCompletedBets] = useState<any[]>([]);
    const formatDate = (dateString:any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
        });
    };
    useEffect(() => {
        const fetchBets = async () => {
            try {
                const res = await betApi.getUserBets();
                const json = await res.json();
                if (res.ok && json.success) {
                    console.log("Bets fetched:", json);
                    setActiveBets(json.bets['active'] || []);
                    setCompletedBets(json.bets['completed'] || []);
                    setUpcomingBets(json.bets['upcoming'] || []);
                }
            } catch (err) {
                console.error("Error fetching bets:", err);
            }
        };
        fetchBets();
    }, []);

    const filteredActiveBets = activeBets.filter(bet =>
        bet.habit.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredCompletedBets = completedBets.filter(bet =>
        bet.habit.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
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
                    className={`px-6 py-3 font-bold rounded-xl transition-all ${activeTab === 'active'
                            ? 'bg-purple-500 text-white shadow-md'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Active Bets ({activeBets.length})
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-6 py-3 font-bold rounded-xl transition-all ${activeTab === 'completed'
                            ? 'bg-purple-500 text-white shadow-md'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Completed ({completedBets.length})
                </button>
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-3 font-bold rounded-xl transition-all ${activeTab === 'upcoming'
                            ? 'bg-purple-500 text-white shadow-md'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Upcoming ({upcomingBets.length})
                </button>
            </div>

            {/* Active Bets */}
            {activeTab === 'active' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredActiveBets.map((bet) => (
                        <div key={bet.id} className="p-6 bg-white rounded-3xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 border border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-2xl font-black text-gray-800">{bet.name}</h3>
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
                            <h3 className="text-2xl font-black mb-4 text-gray-800">{bet.name}</h3>
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
             {activeTab === 'upcoming' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {upcomingBets.map((bet) => (
              <div key={bet.betId || bet.id} className="p-6 bg-white rounded-3xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 border border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-black text-gray-800">{bet.name}</h3>
                  <span className={`text-xs px-3 py-1.5 rounded-xl font-bold ${
                    bet.participantStatus?.paymentStatus === 'UNPAID'
                      ? 'bg-orange-100 text-orange-600 animate-pulse'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {bet.participantStatus?.paymentStatus}
                  </span>
                </div>
                
                <p className="text-gray-500 mb-4 text-sm line-clamp-2">{bet.description}</p>
                
                {/* Date Section */}
                <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-purple-500" />
                      <span className="font-bold text-gray-600">Start:</span>
                      <span className="text-gray-800 font-semibold">{formatDate(bet.start_date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-purple-500" />
                      <span className="font-bold text-gray-600">End:</span>
                      <span className="text-gray-800 font-semibold">{formatDate(bet.end_date)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-semibold">Total Pool:</span>
                    <span className="text-lg font-black text-gray-800">${bet.total_amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-semibold">Your Stake:</span>
                    <span className="text-lg font-black text-purple-600">${bet.amount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-600">Status:</span>
                    <span className="text-gray-700 font-semibold">
                      {bet.participantStatus?.betStatus || bet.betStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-600">Off Days Available:</span>
                    <span className="text-gray-700 font-semibold">
                      {3 - (bet.participantStatus?.usedOffDays ?? 0)} / 3
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button 
                    className={`flex-1 px-4 py-2.5 rounded-xl font-bold shadow transition-all ${
                      bet.participantStatus?.paymentStatus === 'UNPAID'
                        ? 'bg-purple-500 text-white hover:bg-purple-600 transform hover:scale-105'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                    disabled={bet.participantStatus?.paymentStatus !== 'UNPAID'}
                  >
                    {bet.participantStatus?.paymentStatus === 'UNPAID' ? 'Pay Now' : 'Paid'}
                  </button>
                  <button className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-bold shadow hover:bg-gray-300 transition-all transform hover:scale-105">
                    Details
                  </button>
                </div>
              </div>
            ))}
</div>
        )}
        </>
    );
}