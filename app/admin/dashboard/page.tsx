"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    id?: string;
    name?: string;
    email?: string;
    username?: string;
    role?: string;
}

export default function AdminDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // useEffect(() => {
    //     let mounted = true;
    //     async function fetchMe() {
    //         try {
    //             const res = await fetch("/api/auth/me", { credentials: "include" });
    //             if (!res.ok) {
    //                 // not authenticated
    //                 router.replace("/");
    //                 return;
    //             }
    //             const data = await res.json();
    //             if (mounted) setUser(data?.user || data || null);
    //         } catch (err) {
    //             console.error("Failed to fetch user:", err);
    //         } finally {
    //             if (mounted) setLoading(false);
    //         }
    //     }
    //     fetchMe();
    //     return () => {
    //         mounted = false;
    //     };
    // }, [router]);

    async function handleLogout() {
        try {
            await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        } catch (err) {
            console.error("Logout failed:", err);
        }
        // clear any client-side token and redirect
        try {
            localStorage.removeItem("token");
        } catch {}
        router.push("/");
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                    {loading ? (
                        <div className="text-gray-400">Loading...</div>
                    ) : (
                        user ? (
                            <div className="text-sm text-gray-300">
                                <div>{user.name || user.username || user.email}</div>
                                <div className="text-xs text-gray-400">{user.email}</div>
                            </div>
                        ) : (
                            <div className="text-sm text-gray-400">Not signed in</div>
                        )
                    )}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-gray-300">Here you can manage users and site settings.</p>
                {/* Show additional admin info or user list here if needed */}
            </div>
        </div>
    );
}