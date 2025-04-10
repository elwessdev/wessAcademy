"use client"
import { ChevronRight } from 'lucide-react'
import useAuthStore from '../store/authStore'
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import Image from 'next/image';

const Courses = () => {
    const userData = useAuthStore((state => state.userData));

    const {data:courses, isLoading, error} = useQuery({
        queryKey: ['courses'],
        queryFn: () => fetch('http://127.0.0.1:8000/api/course/coursesList').then(res => res.json()),
        enabled: !!userData,
        refetchOnWindowFocus: false,
    })

    useEffect(()=>{
        console.log(courses)
    },[courses])

    return (
        <div className="h-[calc(100vh-74px)] overflow-auto">
            {/* Page Title */}
            <div className="px-8 pt-8 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Welcome Back {userData?.username}</h1>
                <p className="text-gray-500 mt-1">
                    Good to see you! Let’s study.
                </p>
            </div>
            {/* Content Grid */}
            <div className="flex flex-wrap p-8 gap-6">
                {isLoading && <div className="text-center text-gray-500">Loading...</div>}
                {error && <div className="text-center text-red-500">Error loading courses</div>}
                {courses?.myCourses && courses?.myCourses?.map((course: any) => (
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-auto h-fit w-[360px]">
                        <Image
                            src={course?.course_image}
                            alt="Course Image"
                            width={360}
                            height={200}
                            className="w-full h-[200px] object-cover rounded-t-xl"
                        />
                        <div className="p-5 min-h-[165px] relative">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {course?.course_name}
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                {course?.course_description}
                            </p>
                            <div className="absolute bottom-[11px] left-[18px] w-[90%] flex-wrap">
                                <div className='w-full flex justify-between items-center'>
                                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                                        {course?.status}
                                    </span>
                                    <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center">
                                        {
                                            course?.status === 'completed' ? 'View' : 'Continue'
                                        }
                                        <ChevronRight size={16} className="ml-1" />
                                    </button>
                                </div>
                                <div className="flex items-center mt-[8px]">
                                    <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${course?.progress}%` }}></div>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-2">{course?.progress}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {courses?.courses && courses?.courses?.map((course: any) => (
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-auto h-fit w-[360px]">
                        <Image
                            src={course?.course_image}
                            alt="Course Image"
                            width={360}
                            height={200}
                            className="w-full h-[200px] object-cover rounded-t-xl"
                        />
                        <div className="p-5 min-h-[165px] relative">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {course?.course_name}
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                {course?.course_description}
                            </p>
                            <div className="flex justify-center items-center absolute bottom-[10px] left-[18px] w-[90%]">
                                <button className="px-[30px] py-[9px] rounded-[4px] bg-[#6665f1] text-white font-medium text-sm flex items-center transition-all duration-2000">
                                    Start
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Courses