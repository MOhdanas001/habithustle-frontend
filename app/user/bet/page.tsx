"use client";
import React from 'react';
import { Trophy, Users, Calendar, DollarSign, FileText, CheckCircle, Clock, ArrowLeft, Plus, X, Sparkles } from 'lucide-react';
import { useCreateBetForm } from '../../hooks/useCreateBetForm';

export default function CreateBetPage() {
  const {
    step,
    setStep,
    formData,
    handleInputChange,
    handleDayToggle,
    newParticipant,
    setNewParticipant,
    addParticipant,
    removeParticipant,
    submit,
    loading,
    error,
    success,
  } = useCreateBetForm();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleSubmit = async () => {
    try {
      const result = await submit();
      // Optional: navigate or clear form
      alert('Bet created successfully! 🎉');
    } catch (e) {
      // error state already set in hook; keep UI responsive
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info', icon: FileText },
    { number: 2, title: 'Schedule', icon: Calendar },
    { number: 3, title: 'Participants', icon: Users },
    { number: 4, title: 'Review', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 font-bold mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-purple-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                  Create New Bet
                </h1>
                <p className="text-gray-600 font-semibold mt-1">Challenge yourself and friends to build better habits 🚀</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((s, index) => (
                <React.Fragment key={s.number}>
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all ${
                      step >= s.number 
                        ? 'bg-gradient-to-br from-purple-400 to-purple-500 text-white shadow-lg scale-110' 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {step > s.number ? <CheckCircle className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
                    </div>
                    <span className={`text-xs font-bold mt-2 ${step >= s.number ? 'text-purple-600' : 'text-gray-400'}`}>
                      {s.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 rounded-full ${step > s.number ? 'bg-gradient-to-r from-purple-400 to-purple-500' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-purple-200">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-gray-800 mb-2 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  Basic Information
                </h2>
                <p className="text-gray-600 font-semibold">Tell us about your habit challenge</p>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">Bet Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Morning Workout Challenge"
                  className="w-full px-5 py-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your habit challenge in detail..."

                  className="w-full px-5 py-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">Stake Amount ($) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-5 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="50"
                    className="w-full pl-14 pr-5 py-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">Proof Description *</label>
                <textarea
                  name="proofDescription"
                  value={formData.proofDescription}
                  onChange={handleInputChange}
                  placeholder="How will you prove completion? (e.g., Photo of gym check-in, Screenshot of reading app)"
                  rows="3"
                  className="w-full px-5 py-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all font-medium resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-gray-800 mb-2 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-500" />
                  Schedule & Duration
                </h2>
                <p className="text-gray-600 font-semibold">Set when and how often you'll do this habit</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl text-gray-800 focus:outline-none focus:border-purple-400 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl text-gray-800 focus:outline-none focus:border-purple-400 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-3">Active Days *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {daysOfWeek.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-4 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 ${
                        formData.taskDays.includes(day)
                          ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg'
                          : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                      }`}
                    >
                      {day.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">Allowed Off Days</label>
                <input
                  type="number"
                  name="allowedOffDays"
                  value={formData.allowedOffDays}
                  onChange={handleInputChange}
                  placeholder="e.g., 2 (optional)"
                  min="0"
                  className="w-full px-5 py-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all font-medium"
                />
                <p className="text-sm text-gray-500 mt-2 font-medium">Number of days participants can miss without penalty</p>
              </div>
            </div>
          )}

          {/* Step 3: Participants */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-gray-800 mb-2 flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-500" />
                  Add Participants
                </h2>
                <p className="text-gray-600 font-semibold">Invite friends to join your challenge</p>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">Participant Email</label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={newParticipant}
                    onChange={(e) => setNewParticipant(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addParticipant())}
                    placeholder="friend@example.com"
                    className="flex-1 px-5 py-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all font-medium"
                  />
                  <button
                    onClick={addParticipant}
                    className="px-6 py-4 bg-gradient-to-r from-purple-400 to-purple-500 text-white font-black rounded-2xl hover:from-purple-500 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add
                  </button>
                </div>
              </div>

              {formData.participants.length > 0 && (
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-3">
                    Participants ({formData.participants.length})
                  </label>
                  <div className="space-y-3">
                    {formData.participants.map((participant, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-black">
                            {participant.email.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-gray-800">{participant.email}</span>
                        </div>
                        <button
                          onClick={() => removeParticipant(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-gray-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-purple-500" />
                  Review Your Bet
                </h2>
                <p className="text-gray-600 font-semibold">Make sure everything looks good before creating</p>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                  <h3 className="font-black text-lg text-gray-800 mb-3">📝 Basic Info</h3>
                  <div className="space-y-2 text-gray-700 font-semibold">
                    <p><strong>Name:</strong> {formData.name || 'Not set'}</p>
                    <p><strong>Description:</strong> {formData.description || 'Not set'}</p>
                    <p><strong>Stake:</strong> ${formData.amount || '0'}</p>
                    <p><strong>Proof:</strong> {formData.proofDescription || 'Not set'}</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                  <h3 className="font-black text-lg text-gray-800 mb-3">📅 Schedule</h3>
                  <div className="space-y-2 text-gray-700 font-semibold">
                    <p><strong>Duration:</strong> {formData.startDate} to {formData.endDate}</p>
                    <p><strong>Active Days:</strong> {formData.taskDays.length > 0 ? formData.taskDays.join(', ') : 'None selected'}</p>
                    <p><strong>Allowed Off Days:</strong> {formData.allowedOffDays || '0'}</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                  <h3 className="font-black text-lg text-gray-800 mb-3">👥 Participants</h3>
                  <p className="text-gray-700 font-semibold">
                    {formData.participants.length > 0 
                      ? `${formData.participants.length} participant(s): ${formData.participants.map(p => p.email).join(', ')}`
                      : 'No participants added'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-6 border-t-2 border-purple-100 ">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-10 py-4 mt-6 bg-gray-200 text-gray-700 font-black rounded-2xl hover:bg-gray-300 transition-all"
              >
                ← Previous
              </button>
            )}
            
            {step < 4 ? (
                <button
                onClick={() => setStep(step + 1)}
                className="ml-auto px-10 py-3 mt-6 bg-gradient-to-r from-purple-400 to-purple-500 
                            text-white font-black rounded-2xl
                            hover:from-purple-500 hover:to-purple-600
                            transition-all transform hover:scale-105 shadow-lg"
                >
                Next →
                </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto px-8 py-4 bg-gradient-to-r from-green-400 to-green-500 text-white font-black rounded-2xl hover:from-green-500 hover:to-green-600 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                {loading ? 'Creating…' : 'Create Bet 🎉'}
              </button>
            )}
          </div>
          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 font-semibold">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 font-semibold">
              Bet created successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}