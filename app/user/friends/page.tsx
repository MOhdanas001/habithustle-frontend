"use client";

import React, { useEffect, useState } from "react";
import { Search, UserPlus, Check, X } from "lucide-react";
import { friendsApi } from "../../hooks/useroute";

type UserSearch = {
  id: string;
  username: string;
  profileURL: string | null;
};

export default function FriendsPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<UserSearch[]>([]);
  const [sentIds, setSentIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- SEARCH USERS ---------------- */
  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      setError(null);
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await friendsApi.search(query);
        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || "Search failed");
        }
        setUsers(json.data);

      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Failed to search users");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [query]);

  /* ---------------- SEND FRIEND REQUEST ---------------- */
  const sendRequest = async (userId: string) => {
    if (sentIds.includes(userId)) return;

    try {
      const res = await friendsApi.sendRequest({ toUserId: userId });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Request failed");
      }

      setSentIds((prev) => [...prev, userId]);
    } catch (err) {
      alert("Failed to send request");
    }
  };


  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-bold text-purple-600">Friends</p>
          <h1 className="text-3xl font-black text-gray-900">
            Find and add friends
          </h1>
          <p className="text-gray-600 font-semibold">
            Search users and send friend requests
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-white border px-4 py-3 rounded-2xl shadow-sm mb-8">
          <Search className="w-5 h-5 text-purple-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by username"
            className="w-full outline-none bg-transparent"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center font-bold text-gray-700">
            Searching users...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center text-red-600 font-bold">{error}</div>
        )}

        {/* Results */}
        {!loading && !error && users.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {users.map((user) => {
              const sent = sentIds.includes(user.id);

              return (
                <div
                  key={user.id}
                  className="bg-white border rounded-3xl p-6 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xl font-black">
                        {user.username}
                      </div>
                      <div className="text-sm text-purple-600 font-semibold">
                        @{user.username}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {sent ? (
                      <button
                        disabled
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 text-green-700 font-bold"
                      >
                        <Check className="w-4 h-4" />
                        Request sent
                      </button>
                    ) : (
                      <button
                        onClick={() => sendRequest(user.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold bg-purple-600 hover:bg-purple-700"
                      >
                        <UserPlus className="w-4 h-4" />
                        Send request
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && query && users.length === 0 && (
          <div className="text-center mt-10 text-gray-600 font-bold">
            <X className="mx-auto mb-2" />
            No users found
          </div>
        )}
      </div>
    </div>
  );
}
