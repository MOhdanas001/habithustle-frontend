"use client";

import { useState } from "react";
import { X, Mail, Lock, Trophy } from "lucide-react";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";
// import { useForm } from "react-hook-form";
// import { login, register  } from "../api/auth";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  name?: string;
  username?: string;
}

interface Props {
  setShowLoginModal: (value: boolean) => void;
}

export const SignupModal = ({ setShowLoginModal }: Props) => {

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
 
  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<FormData>();
  const router = useRouter();

const onSubmit = async (data: FormData) => {
  setApiError(null);
  setIsLoading(true);

  try {
    const endpoint = isLogin
      ? "/api/auth/login"
      : "/api/auth/register";

    const payload = isLogin
      ? {
          identifier: data.email,
          password: data.password,
        }
      : {
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
        };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    // On success, navigate client-side. Accept either 'Admin' or 'admin'.
    if (result.user && (result.user.role === "Admin")) {
      router.push('/admin/dashboard');
    } else {
      router.push('/user/home');
    }

    // ✅ SUCCESS
    setShowLoginModal(false);
    reset();
    


  } catch (err: any) {
    setApiError(err.message);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-100 rounded-2xl max-w-md w-full p-8 relative shadow-2xl">

        {/* Close Button */}
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 text-white p-3 rounded-xl inline-block mb-4 shadow-md">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-900">
            {isLogin ? "Welcome Back!" : "Start Your Journey"}
          </h3>
          <p className="text-gray-500">
            {isLogin
              ? "Sign in to continue betting"
              : "Create an account to get started"}
          </p>
        </div>

        {/* Error Message */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {apiError}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name - Only for Registration */}
          {!isLogin && (
            <>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your name"
                  className={`w-full bg-gray-50 border rounded-lg pl-4 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-purple-400"
                  }`}
                  {...register("name", {
                    required: !isLogin ? "Name is required" : false,
                    minLength:
                      !isLogin ? { value: 2, message: "Name must be at least 2 characters" } : undefined,
                  })}
                />
              </div>
              {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Username</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Choose a username"
                  className={`w-full bg-gray-50 border rounded-lg pl-4 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none ${
                    errors.username
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-purple-400"
                  }`}
                  {...register("username", {
                    required: !isLogin ? "Username is required" : false,
                    minLength:
                      !isLogin ? { value: 2, message: "Username must be at least 2 characters" } : undefined,
                  })}
                />
              </div>
              {errors.username && <span className="text-red-500 text-xs mt-1 block">{errors.username.message}</span>}
            </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full bg-gray-50 border rounded-lg pl-11 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-purple-400"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full bg-gray-50 border rounded-lg pl-11 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-purple-400"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>
            {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
          </div>

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-sm text-purple-600 hover:text-purple-700 font-semibold">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-bold hover:from-purple-600 hover:to-purple-700 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setApiError(null);
              reset();
            }}
            className="text-purple-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};
