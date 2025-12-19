"use client";

import { useState } from "react";
import { X, Mail, Lock, Trophy } from "lucide-react";
import { useForm } from "react-hook-form";
import { login, register as registerUser } from "../api/auth";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  name?: string;
}

interface Props {
  setShowLoginModal: (value: boolean) => void;
}

export const SignupModal = ({ setShowLoginModal }: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setApiError(null);
    try {
        const response = await login({ identifier: data.email, password: data.password });
        localStorage.setItem("token", response.data.token);
        router.push("/home");
        setShowLoginModal(false);
        reset();

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setApiError(errorMessage);
      console.error(`${isLogin ? "Login" : "Registration"} failed:`, error);
    } finally {
      setIsLoading(false);
    }
  };

 
 
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-white/20 rounded-2xl max-w-md w-full p-8 relative animate-in">
        
        {/* Close Button */}
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white text-black p-3 rounded-xl inline-block mb-4">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">
            {isLogin ? "Welcome Back!" : "Start Your Journey"}
          </h3>
          <p className="text-gray-400">
            {isLogin
              ? "Sign in to continue betting"
              : "Create an account to get started"}
          </p>
        </div>

        {/* Error Message */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
            {apiError}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name - Only for Registration */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your name"
                  className={`w-full bg-white/5 border rounded-lg pl-4 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-white/30"
                  }`}
                  {...register("name", {
                    required: !isLogin ? "Name is required" : false,
                    minLength:
                      !isLogin ? { value: 2, message: "Name must be at least 2 characters" } : undefined,
                  })}
                />
              </div>
              {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full bg-white/5 border rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/10 focus:border-white/30"
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
            {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full bg-white/5 border rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/10 focus:border-white/30"
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
            {errors.password && <span className="text-red-400 text-xs mt-1 block">{errors.password.message}</span>}
          </div>

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-sm text-gray-400 hover:text-white">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-200 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setApiError(null);
              reset();
            }}
            className="text-white font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};
