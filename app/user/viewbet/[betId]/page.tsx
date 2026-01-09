'use client';
import { useEffect, useState } from 'react';
import { Trophy, Calendar, CheckCircle, XCircle, Flame, ArrowLeft, Clock, Target, Upload, Eye, Shield, Camera, Image as ImageIcon, Link as LinkIcon, AlertCircle } from 'lucide-react';

export default function ViewBetPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [proofDescription, setProofDescription] = useState('');
  const [proofType, setProofType] = useState('image');
  const [proofFile, setProofFile] = useState(null);
  const [proofUrl, setProofUrl] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedProof, setSelectedProof] = useState(null);

  // Mock current user data - replace with actual auth
  const currentUser = {
    id: '1',
    isVerifier: true,
    isParticipant: true
  };

  // Mock bet data
  const bet = {
    id: '123',
    name: 'Morning Workout Challenge',
    description: 'Complete a 30-minute workout every morning before 9 AM.',
    amount: 50,
    betStatus: 'ACTIVE',
    proofDescription: 'Upload a photo of yourself at the gym or a screenshot of your workout tracking app.',
    taskDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    allowedOffDays: 2,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    totalDays: 30,
    daysCompleted: 18,
    daysLeft: 12
  };

  const participants = [
    { id: '1', name: 'Alex Johnson', email: 'alex@example.com', progress: 85, daysCompleted: 18, streak: 12, status: 'leading', isCreator: true, missedDays: 1, avatar: 'AJ' },
    { id: '2', name: 'Sarah Miller', email: 'sarah@example.com', progress: 92, daysCompleted: 20, streak: 15, status: 'leading', missedDays: 0, avatar: 'SM' },
    { id: '3', name: 'Mike Rodriguez', email: 'mike@example.com', progress: 67, daysCompleted: 14, streak: 8, status: 'active', missedDays: 2, avatar: 'MR' }
  ];

  // All proofs in system
  const allProofs = [
    { id: '1', date: '2024-01-20', time: '07:45 AM', participantId: '2', participantName: 'Sarah Miller', description: 'Morning cardio session at LA Fitness', verified: true, proofType: 'image', imageUrl: 'https://via.placeholder.com/400x300', avatar: 'SM' },
    { id: '2', date: '2024-01-20', time: '08:15 AM', participantId: '1', participantName: 'Alex Johnson', description: 'Completed 5K run + stretching', verified: true, proofType: 'url', proofUrl: 'https://strava.com/activities/123', avatar: 'AJ' },
    { id: '3', date: '2024-01-20', time: '08:30 AM', participantId: '3', participantName: 'Mike Rodriguez', description: 'Weight training - chest & triceps', verified: false, proofType: 'image', imageUrl: 'https://via.placeholder.com/400x300', avatar: 'MR' },
    { id: '4', date: '2024-01-19', time: '07:20 AM', participantId: '1', participantName: 'Alex Johnson', description: 'Yoga session - 30 mins', verified: true, proofType: 'image', imageUrl: 'https://via.placeholder.com/400x300', avatar: 'AJ' }
  ];

  // Filter proofs based on user role
  const proofsToShow = currentUser.isVerifier 
    ? allProofs 
    : allProofs.filter(p => p.participantId === currentUser.id);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProof = () => {
    console.log('Uploading proof:', { proofType, proofDescription, proofFile, proofUrl });
    setShowUploadModal(false);
    setProofDescription('');
    setProofFile(null);
    setProofUrl('');
    setPreviewImage(null);
  };

  const handleVerifyProof = (proofId, status) => {
    console.log('Verifying proof:', proofId, status);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'leading': return 'from-emerald-400 to-teal-500';
      case 'active': return 'from-blue-400 to-cyan-500';
      case 'struggling': return 'from-amber-400 to-orange-500';
      case 'failed': return 'from-red-400 to-rose-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const progressPercentage = (bet.daysCompleted / bet.totalDays) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button className="flex items-center gap-2 text-slate-400 hover:text-white font-semibold mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {/* Bet Title Card */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-700/50">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                      {bet.name}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-400/30">
                        {bet.betStatus}
                      </span>
                      <span className="px-3 py-1.5 bg-slate-700/50 text-slate-300 rounded-lg text-xs font-bold border border-slate-600/50">
                        {participants.length} Participants
                      </span>
                      {currentUser.isVerifier && (
                        <span className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-bold border border-purple-400/30 flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Verifier
                        </span>
                      )}
                      {currentUser.isParticipant && (
                        <span className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-bold border border-cyan-400/30">
                          Participant
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 font-medium mb-4 leading-relaxed">{bet.description}</p>
                
                <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-slate-400">Overall Progress</span>
                    <span className="text-sm font-black text-cyan-400">{bet.daysCompleted}/{bet.totalDays} days</span>
                  </div>
                  <div className="relative w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500 shadow-lg shadow-cyan-500/50" style={{ width: `${progressPercentage}%` }} />
                  </div>
                </div>
              </div>

              <div className="lg:w-64">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700/50 shadow-xl">
                  <div className="text-center mb-4">
                    <div className="text-sm text-slate-400 font-bold mb-2">Total Pool</div>
                    <div className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      ${bet.amount * participants.length}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 rounded-xl p-3 text-center border border-slate-700/50">
                      <div className="text-lg font-black text-white">{bet.daysLeft}</div>
                      <div className="text-xs text-slate-400 font-semibold">Days Left</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-3 text-center border border-slate-700/50">
                      <div className="text-lg font-black text-white">${bet.amount}</div>
                      <div className="text-xs text-slate-400 font-semibold">Per User</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-slate-800/80 backdrop-blur-xl p-1.5 rounded-2xl border border-slate-700/50 overflow-x-auto">
          {['overview', 'participants', 'proofs'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-xl">
                <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-cyan-400" />
                  Schedule & Rules
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="text-sm text-slate-400 font-semibold mb-1">Duration</div>
                    <div className="text-lg font-bold text-white">{bet.startDate}</div>
                    <div className="text-sm text-slate-500">to {bet.endDate}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="text-sm text-slate-400 font-semibold mb-1">Active Days</div>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {bet.taskDays.map(day => (
                        <span key={day} className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-bold border border-cyan-400/30">{day}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="text-sm text-slate-400 font-semibold mb-1">Allowed Off Days</div>
                    <div className="text-2xl font-black text-amber-400">{bet.allowedOffDays}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="text-sm text-slate-400 font-semibold mb-1">Total Days</div>
                    <div className="text-2xl font-black text-white">{bet.totalDays}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-xl">
                <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-cyan-400" />
                  Proof Requirements
                </h2>
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-slate-300 font-medium leading-relaxed">{bet.proofDescription}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-xl">
                <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Leaderboard
                </h2>
                <div className="space-y-3">
                  {participants.slice(0, 3).map((p, index) => (
                    <div key={p.id} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-black ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-slate-300' : 'text-amber-600'}`}>#{index + 1}</div>
                        <div className={`w-10 h-10 bg-gradient-to-br ${getStatusColor(p.status)} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}>{p.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white text-sm truncate">{p.name}</div>
                          <div className="text-xs text-slate-400">{p.progress}% complete</div>
                        </div>
                        <Flame className="w-5 h-5 text-orange-400" />
                        <span className="text-sm font-black text-orange-400">{p.streak}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'participants' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {participants.map((participant) => (
              <div key={participant.id} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-xl hover:border-cyan-500/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 bg-gradient-to-br ${getStatusColor(participant.status)} rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg`}>{participant.avatar}</div>
                    <div>
                      <div className="font-black text-white flex items-center gap-2">
                        {participant.name}
                        {participant.isCreator && (
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg font-bold border border-purple-400/30">Host</span>
                        )}
                      </div>
                      <div className="text-sm text-slate-400 font-medium">{participant.email}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-slate-400">Progress</span>
                      <span className="font-black text-white">{participant.progress}%</span>
                    </div>
                    <div className="relative w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
                      <div className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getStatusColor(participant.status)} rounded-full transition-all duration-500 shadow-lg`} style={{ width: `${participant.progress}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-900/50 rounded-xl p-3 text-center border border-slate-700/50">
                      <div className="text-lg font-black text-emerald-400">{participant.daysCompleted}</div>
                      <div className="text-xs text-slate-400 font-semibold">Done</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-3 text-center border border-slate-700/50">
                      <div className="text-lg font-black text-orange-400 flex items-center justify-center gap-1">
                        <Flame className="w-4 h-4" />
                        {participant.streak}
                      </div>
                      <div className="text-xs text-slate-400 font-semibold">Streak</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-3 text-center border border-slate-700/50">
                      <div className={`text-lg font-black ${participant.missedDays > bet.allowedOffDays ? 'text-red-400' : 'text-amber-400'}`}>{participant.missedDays}</div>
                      <div className="text-xs text-slate-400 font-semibold">Missed</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'proofs' && (
          <div className="space-y-6">
            {currentUser.isParticipant && (
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-xl">
                <button onClick={() => setShowUploadModal(true)}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-black rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5" />
                  Submit Today's Proof
                </button>
              </div>
            )}

            <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-3 text-slate-300">
                <AlertCircle className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold">
                  {currentUser.isVerifier && !currentUser.isParticipant && "Viewing all proofs as verifier"}
                  {currentUser.isParticipant && !currentUser.isVerifier && "Viewing your submitted proofs"}
                  {currentUser.isVerifier && currentUser.isParticipant && "Viewing your proofs (you can verify others' proofs)"}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {proofsToShow.length === 0 ? (
                <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-12 border border-slate-700/50 text-center">
                  <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 font-semibold">No proofs submitted yet</p>
                </div>
              ) : (
                proofsToShow.map((proof) => (
                  <div key={proof.id} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-xl hover:border-cyan-500/30 transition-all">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-cyan-500/30 flex-shrink-0">{proof.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="font-black text-white">{proof.participantName}</span>
                              {proof.verified ? (
                                <span className="flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg font-bold border border-emerald-400/30">
                                  <CheckCircle className="w-3 h-3" />
                                  Verified
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-lg font-bold border border-amber-400/30">
                                  <Clock className="w-3 h-3" />
                                  Pending
                                </span>
                              )}
                              {proof.proofType === 'url' && (
                                <span className="flex items-center gap-1 text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg font-bold border border-blue-400/30">
                                  <LinkIcon className="w-3 h-3" />
                                  URL
                                </span>
                              )}
                              {proof.proofType === 'image' && (
                                <span className="flex items-center gap-1 text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg font-bold border border-purple-400/30">
                                  <ImageIcon className="w-3 h-3" />
                                  Image
                                </span>
                              )}
                            </div>
                            <p className="text-slate-300 font-medium mb-3">{proof.description}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {proof.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {proof.time}
                              </div>
                            </div>

                            {proof.proofType === 'image' && proof.imageUrl && (
                              <img src={proof.imageUrl} alt="Proof" className="rounded-xl w-full max-w-md border border-slate-700/50" />
                            )}
                            {proof.proofType === 'url' && proof.proofUrl && (
                              <a href={proof.proofUrl} target="_blank" rel="noopener noreferrer" 
                                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold">
                                <LinkIcon className="w-4 h-4" />
                                {proof.proofUrl}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {currentUser.isVerifier && !proof.verified && proof.participantId !== currentUser.id && (
                        <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                          <button onClick={() => handleVerifyProof(proof.id, 'approved')}
                            className="flex-1 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-emerald-400/30">
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button onClick={() => handleVerifyProof(proof.id, 'rejected')}
                            className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-red-400/30">
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Upload Proof Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-slate-700/50 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <Upload className="w-8 h-8 text-cyan-400" />
                  Submit Proof
                </h2>
                <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-white transition-colors">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-3">Proof Type</label>
                  <div className="flex gap-3">
                    <button onClick={() => setProofType('image')}
                      className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                        proofType === 'image' 
                          ? 'bg-cyan-500/20 text-cyan-400 border-2 border-cyan-400/50' 
                          : 'bg-slate-900/50 text-slate-400 border-2 border-slate-700'
                      }`}>
                      <Camera className="w-5 h-5" />
                      Image
                    </button>
                    <button onClick={() => setProofType('url')}
                      className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                        proofType === 'url' 
                          ? 'bg-cyan-500/20 text-cyan-400 border-2 border-cyan-400/50' 
                          : 'bg-slate-900/50 text-slate-400 border-2 border-slate-700'
                      }`}>
                      <LinkIcon className="w-5 h-5" />
                      URL
                    </button>
                  </div>
                </div>

                {proofType === 'image' ? (
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3">Upload Photo/Screenshot</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileInput" />
                    <label htmlFor="fileInput" className="block border-2 border-dashed border-slate-600 hover:border-cyan-500 rounded-2xl p-8 text-center cursor-pointer transition-all bg-slate-900/50">
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="max-h-64 mx-auto rounded-xl" />
                      ) : (
                        <>
                          <Camera className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                          <p className="text-slate-400 font-semibold mb-1">Click to upload or drag and drop</p>
                          <p className="text-slate-500 text-sm">PNG, JPG up to 10MB</p>
                        </>
                      )}
                    </label>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3">Proof URL</label>
                    <input type="url" value={proofUrl} onChange={(e) => setProofUrl(e.target.value)}
                      placeholder="https://strava.com/activities/123..."
                      className="w-full px-5 py-4 bg-slate-900/50 border-2 border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-medium"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-3">Description</label>
                  <textarea value={proofDescription} onChange={(e) => setProofDescription(e.target.value)}
                    placeholder="Describe what you did today..."
                    rows="4"
                    className="w-full px-5 py-4 bg-slate-900/50 border-2 border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-medium resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-2xl transition-all">
                    Cancel
                  </button>
                  <button onClick={handleUploadProof}
                    disabled={!proofDescription || (proofType === 'image' && !proofFile) || (proofType === 'url' && !proofUrl)}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                    Submit Proof
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}