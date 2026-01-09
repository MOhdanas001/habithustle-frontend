"use client";
import { Trophy } from "lucide-react";
import { useState } from "react";
import { SignupModal } from "../user/home/common/SignupModal";

export default function NavbarGuest() {


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
    </>
  );
}
