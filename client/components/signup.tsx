"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Select } from "antd";
import { glob } from "fs";
import authStore from "@/app/store/authStore";

interface AuthModalProps {
    onClose?: () => void;
}

export function Signup({onClose}: AuthModalProps) {
    const setToken = authStore((state => state.setToken));
    const getUserData = authStore((state => state.getUserData)); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        major: "",
        password: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState({
        username: "",
        email: "",
        major: "",
        password: "",
        confirmPassword: "",
        global: "",
    });

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const errors = {
            username: formData.username ? "" : "Username is required",
            email: formData.email ? "" : "Email is required",
            major: formData.major ? "" : "Major is required",
            password: formData.password ? "" : "Password is required",
            confirmPassword: formData.confirmPassword
                ? formData.confirmPassword === formData.password
                    ? ""
                    : "Passwords do not match"
                : "Confirm Password is required",
            global: "",
        };
        setFormErrors(errors);
        if(errors.username || errors.email || errors.major || errors.password || errors.confirmPassword) {
            return;
        }
        try{
            const res = await fetch("http://127.0.0.1:8000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                getUserData();
                onClose?.();
            } else {
                if(data?.detail?.split(" ")[0] === "Username") {
                    setFormErrors({ ...formErrors, username: data.detail });
                    return;
                }
                if(data?.detail?.split(" ")[0] === "Email") {
                    setFormErrors({ ...formErrors, email: data.detail });
                    return;
                }
                setFormErrors({ ...formErrors, global: data.detail });
            }
        } catch (error) {
            setFormErrors({ ...formErrors, global: "An error occurred. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

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

                    <form
                        className="space-y-5"
                        onSubmit={handleSubmit}
                    >
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
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                            {formErrors.username && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
                            )}
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
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            {formErrors.email && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                            )}
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
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                value={formData.major}
                                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                                >
                                    <option value="" hidden>Select your major</option>
                                    <option value="computer-science">Computer Science</option>
                            </select>
                            {formErrors.major && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.major}</p>
                            )}
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
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            {formErrors.password && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                            )}
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
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                            {formErrors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                            disabled={isSubmitting}
                        >
                            {isSubmitting 
                                    ? <span className="loading loading-spinner loading-md"></span>
                                    : "Sign up"
                                }
                        </button>
                        {formErrors.global && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.global}</p>
                        )}
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <button
                            className="text-indigo-600 font-medium hover:text-indigo-700"
                            onClick={() => onClose()}
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
