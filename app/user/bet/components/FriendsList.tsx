"use client";

import React, { useMemo, useState } from 'react';
import { Users } from 'lucide-react';

export type Friend = {
  id: string;
  username?: string;
  name?: string;
  email: string;
  avatarUrl?: string | null;
};

interface Props {
  friends: Friend[];
  loading: boolean;
  error: string | null;
  onAdd: (friend: Friend) => void;
  addedEmails: string[];
}

export default function FriendsList({ friends, loading, error, onAdd, addedEmails }: Props) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return friends;
    return friends.filter(f => {
      const name = (f.username || f.name || '').toLowerCase();
      return name.includes(q) || f.email.toLowerCase().includes(q);
    });
  }, [friends, search]);

  if (loading) {
    return (
      <div className="p-4 bg-purple-50 border-2 border-purple-100 rounded-2xl text-gray-700 font-semibold">
        Loading friends...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search friends..."
          className="w-full px-5 py-3 bg-white border-2 border-purple-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all font-medium"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filtered.map((f) => {
            const isAdded = addedEmails.includes(f.email);
            return (
              <div key={f.id} className="flex items-center justify-between p-4 bg-white border-2 border-purple-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center font-black text-purple-600">
                    {(f.username || f.name || f.email).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{f.username || f.name}</div>
                    <div className="text-sm text-gray-500 font-semibold">{f.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => !isAdded && onAdd(f)}
                  disabled={isAdded}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${
                    isAdded 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-400 to-purple-500 text-white hover:from-purple-500 hover:to-purple-600 transform hover:scale-105'
                  }`}
                >
                  {isAdded ? 'Added' : 'Add'}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-600 font-semibold">
          {search ? 'No friends match your search.' : 'No friends found.'}
        </div>
      )}
    </div>
  );
}
