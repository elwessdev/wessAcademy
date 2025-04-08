import Link from "next/link";
import { Search, Settings, LogOut, ChevronRight } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex min-h-screen">
                {/* Left Sidebar */}
                <div className="w-72 bg-white shadow-lg z-10">
                    <div className="p-6 border-b border-gray-100">
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 text-transparent bg-clip-text">
                        Dashboard
                    </div>
                    </div>

                    <div className="flex flex-col items-center py-8">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-4 text-white text-xl font-medium shadow-md">
                        OS
                        </div>
                        <div className="absolute bottom-3 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="text-gray-800 font-medium text-lg mb-1">Osama</div>
                    <div className="text-gray-500 text-sm mb-6">Computer Science</div>

                    <button className="w-48 py-2.5 px-4 mb-3 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center transition-all">
                        <Settings size={18} className="mr-3 text-indigo-500" />
                        <span>Settings</span>
                        <ChevronRight size={16} className="ml-auto text-gray-400" />
                    </button>

                    <button className="w-48 py-2.5 px-4 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center transition-all">
                        <LogOut size={18} className="mr-3 text-indigo-500" />
                        <span>Logout</span>
                        <ChevronRight size={16} className="ml-auto text-gray-400" />
                    </button>
                    </div>

                    <div className="absolute bottom-4 left-6 text-gray-400 text-sm">
                        © 2025 wessAcademy.
                    </div>
                </div>
                {/* Main Content */}
                <div className="flex-1 bg-gray-50">
                    {/* Top Navigation */}
                    <div className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
                        <div className="flex space-x-8">
                            <Link
                                href="#"
                                className="text-indigo-600 font-medium border-b-2 border-indigo-600 pb-1"
                            >
                                Courses
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-600 hover:text-indigo-600 transition-colors"
                            >
                                Bookmark
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-600 hover:text-indigo-600 transition-colors"
                            >
                                Reports
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-50 border border-gray-200 rounded-full py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Page Title */}
                    <div className="px-8 pt-8 pb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Welcome Back Osama</h1>
                        <p className="text-gray-500 mt-1">
                            Good to see you! Let’s study.
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="flex flex-wrap p-8 h-[calc(100vh-182px)] overflow-auto gap-6">
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-auto h-fit w-[360px]">
                            <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                                <span className="text-lg font-medium">Web Design</span>
                            </div>
                            <div className="p-5 min-h-[165px] relative">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    UI Dashboard
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm">
                                    Modern dashboard interface with analytics and reporting
                                    features.
                                </p>
                                <div className="flex justify-between items-center absolute bottom-[20px] left-[18px] w-[90%]">
                                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                                    In Progress
                                    </span>
                                    <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center">
                                    View Project <ChevronRight size={16} className="ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-auto h-fit w-[360px]">
                            <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                                <span className="text-lg font-medium">Web Design</span>
                            </div>
                            <div className="p-5 min-h-[165px] relative">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    UI Dashboard
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm">
                                    Modern dashboard interface with analytics and reporting
                                    features.
                                </p>
                                <div className="flex justify-between items-center absolute bottom-[20px] left-[18px] w-[90%]">
                                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                                    In Progress
                                    </span>
                                    <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center">
                                    View Project <ChevronRight size={16} className="ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-auto h-fit w-[360px]">
                            <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                                <span className="text-lg font-medium">Web Design</span>
                            </div>
                            <div className="p-5 min-h-[165px] relative">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    UI Dashboard
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm">
                                    Modern dashboard interface with analytics and reporting
                                    features.
                                </p>
                                <div className="flex justify-between items-center absolute bottom-[20px] left-[18px] w-[90%]">
                                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                                    In Progress
                                    </span>
                                    <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center">
                                    View Project <ChevronRight size={16} className="ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
