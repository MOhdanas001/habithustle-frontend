'use client';

// Auth API calls
export const authApi = {
  login: (data: { email: string; password: string }) =>
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        identifier: data.email,
        password: data.password,
      }),
    }),

  register: (data: { email: string; password: string; name: string, username: string }) =>
    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    }),

  logout: () =>
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }),

  getMe: () =>
    fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    }),
};

// Bet API calls
export const betApi = {
  create: (data: any) =>
    fetch('/api/bet/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    }),

  getFriends: () =>
    fetch('/api/get/friends', {
      method: 'GET',
      credentials: 'include',
    }),

  search: (query: string) =>
    fetch(`/api/search/bet?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      credentials: 'include',
    }),

  getUserBets: () =>
    fetch('/api/get/bets', {
      method: 'GET',
      credentials: 'include',
    }),
};

// Friends API calls
export const friendsApi = {
  sendRequest: (data: { toUserId: string }) =>
    fetch('/api/friends/send-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    }),

  respond: (data: { requestId: string; action: 'accept' | 'reject' }) =>
    fetch('/api/friends/respond', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    }),

  search: (query: string) =>
    fetch(`/api/search/friends?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      credentials: 'include',
    }),
};



