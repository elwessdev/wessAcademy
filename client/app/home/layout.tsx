import Link from "next/link";
import { Search } from "lucide-react";
import Sidebar from "@/app/home/SideBar";


export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex min-h-screen">
                {/* Left Sidebar */}
                <Sidebar />

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
                                My Courses
                            </Link>
                            {/* <Link
                                href="#"
                                className="text-gray-600 hover:text-indigo-600 transition-colors"
                            >
                                Notes
                            </Link> */}
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

                    <div className="">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
}