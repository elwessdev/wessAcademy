"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AuthModalProps {
    onClose?: () => void;
}

export function Signup({onClose}: AuthModalProps) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div
                className="relative bg-white rounded-2xl shadow-xl w-[470px] overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
                <div
                    className={`p-8 md:p-12`}
                >
                    <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign up</h2>
                    <p className="text-gray-500">Create an account to get started.</p>
                    </div>

                    <form className="space-y-5">
                    <div>
                        <label
                        htmlFor="signup-username"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        Username
                        </label>
                        <input
                        type="text"
                        id="signup-username"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label
                        htmlFor="signup-email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        Email
                        </label>
                        <input
                        type="email"
                        id="signup-email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label
                        htmlFor="major"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        Major
                        </label>
                        <select
                        id="major"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        >
                        <option value="">Select your major</option>
                        <option value="computer-science">Computer Science</option>
                        <option value="design">Design</option>
                        <option value="business">Business</option>
                        <option value="engineering">Engineering</option>
                        <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label
                        htmlFor="signup-password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        Password
                        </label>
                        <input
                        type="password"
                        id="signup-password"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        Confirm Password
                        </label>
                        <input
                        type="password"
                        id="confirm-password"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Sign up
                    </button>
                    </form>

                    <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <button
                        className="text-indigo-600 font-medium hover:text-indigo-700"
                        onClick={() => setView("signin")}
                        >
                        Sign in
                        </button>
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
