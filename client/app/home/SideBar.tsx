"use client"

import { Settings, LogOut, ChevronRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useAuthStore from "../store/authStore";

const sideBar = () => {
    const userData = useAuthStore((state) => state.userData);
    const logout = useAuthStore((state) => state.logout);
    return (
        <div className="w-72 bg-white shadow-lg z-10">
            <div className="p-6 border-b border-gray-100 px-[15px] py-[9px]">
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 text-transparent bg-clip-text">
                    <Image
                        src="/logo3.png"
                        alt="wessAcademy logo"
                        width={180}
                        height={69}
                        className="object-contain w-[145px]"
                    />
                </div>
            </div>

            <div className="flex flex-col items-center py-8">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-[5px] text-white text-xl font-medium shadow-md">
                        {userData?.username?.slice(0, 2).toUpperCase() || ""}
                    </div>
                    <div className="absolute bottom-3 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div className="text-gray-800 font-medium text-lg mb-1">{userData?.username}</div>
                <div className="text-gray-500 text-sm mb-6 capitalize">{userData?.major?.replace(/-/g, " ")}</div>

                <button className="w-48 py-2.5 px-4 mb-3 text-gray-700 bg-[#f0f1f27a] hover:bg-gray-100 rounded-lg flex items-center transition-all outline-none">
                    <Settings size={18} className="mr-3 text-indigo-500" />
                    <span>Settings</span>
                    <ChevronRight size={16} className="ml-auto text-gray-400" />
                </button>

                <button className="w-48 py-2.5 px-4 text-gray-700 bg-[#f0f1f27a] hover:bg-gray-100 rounded-lg flex items-center transition-all outline-none" onClick={logout}>
                    <LogOut size={18} className="mr-3 text-indigo-500" />
                    <span>Logout</span>
                    <ChevronRight size={16} className="ml-auto text-gray-400" />
                </button>
            </div>

            {/* My Courses Section */}
            <div className="w-full px-6">
                <div className="flex items-center mb-4">
                    <BookOpen size={18} className="text-indigo-500 mr-2" />
                    <h3 className="text-gray-700 font-medium">My Courses</h3>
                </div>

                {/* Course 1 */}
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs">
                        UI
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">UI Design Masterclass</div>
                        <div className="flex items-center mt-1">
                        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full rounded-full" style={{ width: "75%" }}></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">75%</span>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Course 2 */}
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs">
                        JS
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">JavaScript Basics</div>
                        <div className="flex items-center mt-1">
                        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">45%</span>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Course 3 */}
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs">
                        RE
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">React Framework</div>
                        <div className="flex items-center mt-1">
                        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: "90%" }}></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">90%</span>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Course 4 */}
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs">
                        UX
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">UX Research</div>
                        <div className="flex items-center mt-1">
                        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full" style={{ width: "30%" }}></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">30%</span>
                        </div>
                    </div>
                    </div>
                </div>

                <Link
                    href="/all-courses"
                    className="text-indigo-600 text-sm font-medium flex items-center justify-center mt-2 hover:text-indigo-700"
                >
                    View all courses <ChevronRight size={14} className="ml-1" />
                </Link>
            </div>

            <div className="absolute bottom-4 left-6 text-gray-400 text-sm">
                © 2025 wessAcademy
            </div>
        </div>
    )
}

export default sideBar