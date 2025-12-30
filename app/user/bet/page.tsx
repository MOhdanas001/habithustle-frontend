"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { Trophy, Users, Calendar, DollarSign, Search, X, Target } from 'lucide-react';
import { useCreateBetForm } from '../../hooks/useCreateBetForm';
import { betApi } from '@/app/hooks/useroute';
import { Datepicker } from 'flowbite-react';
import { FriendsListItem } from '@/app/types/types';

export type Participant = { id: string; email?: string; name?: string; username?: string };

export default function CreateBetPage() {
  const {
    formData,
    handleInputChange,
    handleDayToggle,
    setNewParticipant,
    addParticipant,
    removeParticipant,
    addVerifier,
    removeVerifier,
    submit,
    loading,
    error,
    success,
  } = useCreateBetForm();

  const [friendsDropdownOpen, setFriendsDropdownOpen] = useState(false);
  const [verifierDropdownOpen, setVerifierDropdownOpen] = useState(false);
  const [friendSearch, setFriendSearch] = useState('');
  const [friends, setFriends] = useState<FriendsListItem[]>([]);
  const [friendsLoading, setFriendsLoading] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant[]>([]);

  const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  // Fetch friends from backend
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setFriendsLoading(true);
        const response = await betApi.getFriends();
        const json = await response.json();
        if (!response.ok || json.success === false) {
          throw new Error(json.message || 'Failed to load friends');
        }
        if (!cancelled) {
          setFriends(Array.isArray(json.friends) ? json.friends : []);
        }
      } catch (e) {
        console.error('Failed to load friends:', e);
      } finally {
        if (!cancelled) setFriendsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredFriends = useMemo(() => {
    const q = friendSearch.trim().toLowerCase();
    // exclude already selected participants and the selected verifier
    const base = friends.filter((f: FriendsListItem) => {
      const isVerifier = formData.verifierId && formData.verifierId === f.id;
      const isParticipant = formData.participantIds && formData.participantIds.includes(f.id);
      return !isVerifier && !isParticipant;
    });

    if (!q) return base;
    return base.filter((f:FriendsListItem) => {
      const display = (f.username || f.name || '').toLowerCase();
      return display.includes(q) || f.email.toLowerCase().includes(q);
    });
  }, [friends, friendSearch]);

  const addFriendAsParticipant = (friend:FriendsListItem) => {
    if (!formData.participantIds.includes(friend.id)) {
      addParticipant(friend);
      setSelectedParticipant(prev => [...prev, { id: friend.id, name: friend.name }]);
      setFriendsDropdownOpen(false);
    }
  };

  const removeParticipantByEmail = (id: string) => {
    const index = formData.participantIds.findIndex(p => p === id);
    if (index !== -1) {
      removeParticipant(id);
      setSelectedParticipant(prev => {
        const newSelected = [...prev];
        newSelected.splice(index, 1);
        return newSelected;
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await submit();
      alert('Bet created successfully! 🎉');
    } catch (e) {
      // error is already set in hook
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            marginBottom: '1rem',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
          }}>
            <Trophy style={{ width: '40px', height: '40px', color: 'white' }} />
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.5rem'
          }}>
            Create New Bet Challenge
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>
            Set up your habit challenge and invite friends
          </p>
        </div>

        {/* Main Form Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        }}
        className='overflow-x-hidden overflow-y-visible'
        >
          {/* Form Content */}
          <div style={{ padding: '2.5rem' }}>
            {/* Challenge Details */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Target style={{ width: '20px', height: '20px', color: '#667eea' }} />
                <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  Challenge Details
                </h2>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4a5568', marginBottom: '0.5rem' }}>
                  Challenge Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Morning Workout Challenge"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderBottom: '2px solid #e2e8f0',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#e2e8f0'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4a5568', marginBottom: '0.5rem' }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your habit challenge..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderBottom: '2px solid #e2e8f0',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#e2e8f0'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4a5568', marginBottom: '0.5rem' }}>
                    Stake Amount
                  </label>
                  <div style={{ position: 'relative' }}>
                    <DollarSign style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#a0aec0' }} />
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="50"
                      style={{
                        width: '100%',
                        paddingLeft: '2.5rem',
                        paddingRight: '1rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        border: 'none',
                        borderBottom: '2px solid #e2e8f0',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => e.target.style.borderBottomColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderBottomColor = '#e2e8f0'}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4a5568', marginBottom: '0.5rem' }}>
                    Allowed Off Days
                  </label>
                  <input
                    type="number"
                    name="allowedOffDays"
                    value={formData.allowedOffDays}
                    onChange={handleInputChange}
                    placeholder="2"
                    min="0"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: 'none',
                      borderBottom: '2px solid #e2e8f0',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderBottomColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderBottomColor = '#e2e8f0'}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4a5568', marginBottom: '0.5rem' }}>
                  Proof Description
                </label>
                <textarea
                  name="proofDescription"
                  value={formData.proofDescription}
                  onChange={handleInputChange}
                  placeholder="How will you prove completion? (e.g., Photo of gym check-in)"
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderBottom: '2px solid #e2e8f0',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#e2e8f0'}
                />
              </div>
            </div>

            {/* participants section */}
            <div style={{ paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Users style={{ width: '20px', height: '20px', color: '#667eea' }} />
                <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  Participants
                </h2>
              </div>

              {/* Selected Participants */}
              {selectedParticipant.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  {selectedParticipant.map((participant) => {
                    const label = participant.name;
                    return (
                      <div
                        key={participant.id}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                          borderRadius: '20px',
                          border: '1px solid rgba(102, 126, 234, 0.2)'
                        }}
                      >
                        <div style={{
                          width: '28px',
                          height: '28px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {String(label).charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4a5568' }}>
                          {label}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeParticipantByEmail(participant.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#a0aec0',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <X style={{ width: '16px', height: '16px' }} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Add Friends Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setFriendsDropdownOpen(!friendsDropdownOpen)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderBottom: '2px solid #e2e8f0',
                    background: 'white',
                    textAlign: 'left',
                    color: '#a0aec0',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                >
                  <span>Add friends to challenge</span>
                  <Users style={{ width: '18px', height: '18px', color: '#667eea' }} />
                </button>

                {friendsDropdownOpen && (
                  <>
                    <div 
                      style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 10
                      }}
                      onClick={() => setFriendsDropdownOpen(false)}
                    />
                    
                    <div style={{
                      position: 'absolute',
                      zIndex: 20,
                      width: '100%',
                      marginTop: '0.5rem',
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                      maxHeight: '280px'
                    }}>
                      {/* Search */}
                      <div style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                        <div style={{ position: 'relative' }}>
                          <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px', color: '#a0aec0' }} />
                          <input
                            type="text"
                            value={friendSearch}
                            onChange={(e) => setFriendSearch(e.target.value)}
                            placeholder="Search friends..."
                            style={{
                              width: '100%',
                              paddingLeft: '2.25rem',
                              paddingRight: '0.75rem',
                              paddingTop: '0.5rem',
                              paddingBottom: '0.5rem',
                              background: '#f7fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              fontSize: '0.875rem',
                              outline: 'none',
                              fontFamily: 'inherit'
                            }}
                          />
                        </div>
                      </div>

                      {/* Friends List */}
                      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {friendsLoading ? (
                          <div style={{ padding: '1.5rem', textAlign: 'center', color: '#a0aec0', fontSize: '0.875rem' }}>
                            Loading...
                          </div>
                        ) : filteredFriends.length > 0 ? (
                          <div>
                            {filteredFriends.map((friend) => {
                              const isAdded = (formData.participantIds || []).includes(friend.id) || formData.verifierId === friend.id;

                              return (
                                <button
                                  key={friend.id}
                                  type="button"
                                  onClick={() => addFriendAsParticipant(friend)}
                                  disabled={isAdded}
                                  style={{
                                    width: '100%',
                                    display: isAdded ? 'none' : 'flex',
                                    alignItems: 'center',
                                    gap: '0.625rem',
                                    padding: '0.625rem 0.75rem',
                                    background: 'white',
                                    border: 'none',
                                    borderBottom: '1px solid #f7fafc',
                                    cursor: isAdded ? 'not-allowed' : 'pointer',
                                    opacity: isAdded ? 0.4 : 1,
                                    textAlign: 'left',
                                    transition: 'background 0.2s',
                                    fontFamily: 'inherit'
                          
                                  }}
                                  onMouseEnter={(e) => !isAdded && (e.currentTarget.style.background = '#f7fafc')}
                                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                >
                                  <div style={{
                                    width: '32px',
                                    height: '32px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    flexShrink: 0
                                  }}>
                                    {friend.name.charAt(0).toUpperCase()}
                                  </div>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.8125rem', fontWeight: '500', color: '#1a202c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {friend.name}
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: '#a0aec0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {friend.email}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div style={{ padding: '1.5rem', textAlign: 'center', color: '#a0aec0', fontSize: '0.875rem' }}>
                            {friendSearch ? 'No matches' : 'No friends'}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div style={{ paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Users style={{ width: '20px', height: '20px', color: '#667eea' }} />
                <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  Verifier
                </h2>
              </div>

              {/* Selected Verifier */}
              {formData.verifier && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                      borderRadius: '20px',
                      border: '1px solid rgba(102, 126, 234, 0.2)'
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {formData.verifier.name.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4a5568' }}>
                      {formData.verifier.name}
                    </span>
                  </div>
                </div>
              )}
              {/* Add Friends Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setVerifierDropdownOpen(!verifierDropdownOpen)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderBottom: '2px solid #e2e8f0',
                    background: 'white',
                    textAlign: 'left',
                    color: '#a0aec0',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                >
                  <span>Add a verifier</span>
                  <Users style={{ width: '18px', height: '18px', color: '#667eea' }} />
                </button>

                {verifierDropdownOpen && (
                  <>
                    <div 
                      style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 10
                      }}
                      onClick={() => setVerifierDropdownOpen(false)}
                    />
                    
                    <div style={{
                      position: 'absolute',
                      zIndex: 20,
                      width: '100%',
                      marginTop: '0.5rem',
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                      maxHeight: '280px'
                    }}>
                      {/* Search */}
                      <div style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                        <div style={{ position: 'relative' }}>
                          <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px', color: '#a0aec0' }} />
                          <input
                            type="text"
                            value={friendSearch}
                            onChange={(e) => setFriendSearch(e.target.value)}
                            placeholder="Search friends..."
                            style={{
                              width: '100%',
                              paddingLeft: '2.25rem',
                              paddingRight: '0.75rem',
                              paddingTop: '0.5rem',
                              paddingBottom: '0.5rem',
                              background: '#f7fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              fontSize: '0.875rem',
                              outline: 'none',
                              fontFamily: 'inherit'
                            }}
                          />
                        </div>
                      </div>

                      {/* Friends List */}
                      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {friendsLoading ? (
                          <div style={{ padding: '1.5rem', textAlign: 'center', color: '#a0aec0', fontSize: '0.875rem' }}>
                            Loading...
                          </div>
                        ) : friends.length > 0 ? (
                          <div>
                            {friends.map((friend) => {
                              const isAdded = formData.verifierId === friend.id;
                              return (
                                <button
                                  key={friend.id}
                                  type="button"
                                  onClick={() => addVerifier(friend)}
                                  disabled={isAdded}
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.625rem',
                                    padding: '0.625rem 0.75rem',
                                    background: 'white',
                                    border: 'none',
                                    borderBottom: '1px solid #f7fafc',
                                    cursor: isAdded ? 'not-allowed' : 'pointer',
                                    opacity: isAdded ? 0.4 : 1,
                                    textAlign: 'left',
                                    transition: 'background 0.2s',
                                    fontFamily: 'inherit'
                                  }}
                                  onMouseEnter={(e) => !isAdded && (e.currentTarget.style.background = '#f7fafc')}
                                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                >
                                  <div style={{
                                    width: '32px',
                                    height: '32px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    flexShrink: 0
                                  }}>
                                    {friend.name.charAt(0).toUpperCase()}
                                  </div>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.8125rem', fontWeight: '500', color: '#1a202c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {friend.name}
                                    </div>
                                    <div style={{ fontSize: '0.6875rem', color: '#a0aec0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {friend.email}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div style={{ padding: '1.5rem', textAlign: 'center', color: '#a0aec0', fontSize: '0.875rem' }}>
                            {friendSearch ? 'No matches' : 'No friends'}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Schedule Section */}
            <div style={{ marginBottom: '2.5rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Calendar style={{ width: '20px', height: '20px', color: '#667eea' }} />
                <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  Schedule
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4a5568', marginBottom: '0.5rem' }}>
                    Start Date
                  </label>
                  <Datepicker
                    value={formData.startDate ? new Date(formData.startDate) : undefined}
                    onChange={(date) => {
                      const d = Array.isArray(date) ? date[0] : date;
                      const value = d instanceof Date ? d.toISOString().split('T')[0] : '';
                      handleInputChange({ target: { name: 'startDate', value } } as any);
                    }}
                    minDate={new Date()}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4a5568', marginBottom: '0.5rem' }}>
                    End Date
                  </label>
                  <Datepicker
                    value={formData.endDate ? new Date(formData.endDate) : undefined}
                    onChange={(date) => {
                      const d = Array.isArray(date) ? date[0] : date;
                      const value = d instanceof Date ? d.toISOString().split('T')[0] : '';
                      handleInputChange({ target: { name: 'endDate', value } } as any);
                    }}
                    minDate={formData.startDate ? new Date(formData.startDate) : new Date()}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4a5568', marginBottom: '0.75rem' }}>
                  Active Days
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {daysOfWeek.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: '10px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        border: formData.taskDays.includes(day) ? 'none' : '2px solid #e2e8f0',
                        background: formData.taskDays.includes(day) ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                        color: formData.taskDays.includes(day) ? 'white' : '#4a5568',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontFamily: 'inherit'
                      }}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid #e2e8f0' }}>
            {error && (
              <div style={{
                marginBottom: '1rem',
                padding: '0.75rem 1rem',
                background: '#fee',
                border: '1px solid #fcc',
                borderRadius: '8px',
                color: '#c33',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{
                marginBottom: '1rem',
                padding: '0.75rem 1rem',
                background: '#efe',
                border: '1px solid #cfc',
                borderRadius: '8px',
                color: '#3c3',
                fontSize: '0.875rem'
              }}>
                Bet created successfully! 🎉
              </div>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                fontFamily: 'inherit'
              }}
            >
              {loading ? (
                <>Creating Challenge...</>
              ) : (
                <>
                  <Trophy style={{ width: '20px', height: '20px' }} />
                  Create Challenge
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}