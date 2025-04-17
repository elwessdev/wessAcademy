"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Check } from "lucide-react"
import { useParams } from "next/navigation"
import "./style.scss"

export default function CourseContent() {
    const params = useParams();
    const name = params.name;
    const [expandedSections, setExpandedSections] = useState<number[]>([1])
    const [completedSections, setCompletedSections] = useState<number[]>([])
    const [course, setCourse] = useState<any>(null)
    const [sections, setSections] = useState<any>([])

    useEffect(()=>{
        if(!name){
            return;
        }
        const courseID = name.toString().split("-");
        const getCourse = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/courseDetails?courseID=${parseInt(courseID[courseID.length - 1], 10)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            const data = await res.json()
            if (res.ok) {
                setCourse(data.course);
                setSections(data.sections);
            } else {
                console.error("Failed to fetch course:", data)
            }
        }
        getCourse()
    },[name, params])

    const toggleSection = (sectionId: number) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
        )
    }

    const toggleCompletion = (e: React.MouseEvent, sectionId: number) => {
        e.stopPropagation()
        setCompletedSections((prev) =>
            prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
        )
    }

//   const progressPercentage = Math.round((completedSections.length / course.sections.length) * 100)

    return (
        <div className="h-[calc(100vh-74px)] overflow-auto">
            {/* Main Content */}
            <div className="p-8">
                {/* Course Image */}
                <div className="mb-8 rounded-lg overflow-hidden border border-gray-200 bgh">
                    <Image
                        src={course?.course_image || "https://via.placeholder.com/800x300"}
                        alt={"cover"}
                        width={800}
                        height={300}
                        className="w-full h-[380px]"
                    />
                    <div className="absolute top-1/2 left-1/2 z-30 text-white text-center transform -translate-x-1/2 -translate-y-1/2 w-full">
                        <h3 className="font-bold text-[45px]">{course?.course_name}</h3>
                        <p className="text-[16px] w-[60%] m-auto">{course?.course_description}</p>
                    </div>
                </div>

                {/* Course Sections */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {sections.map((section:any, index:any) => (
                        <div key={index} className="border-b border-gray-200 last:border-b-0 mb-2">
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                                onClick={() => toggleSection(section.id)}
                            >
                                <div className="flex items-center">
                                <span className="mr-2 text-gray-700">{section.section_number}.</span>
                                <span
                                    className={`font-medium text-black`}
                                >
                                    {section.section_title}
                                </span>
                                </div>
                                <div className="flex items-center">
                                <div
                                    className={`w-5 h-5 mr-3 rounded border flex items-center justify-center cursor-pointer ${
                                    completedSections.includes(section.id) ? "bg-indigo-500 border-indigo-500" : "border-gray-300"
                                    }`}
                                    onClick={(e) => toggleCompletion(e, section.id)}
                                >
                                    {completedSections.includes(section.id) && <Check className="w-3.5 h-3.5 text-white" />}
                                </div>

                                {expandedSections.includes(section.id) ? (
                                    <ChevronUp className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                )}
                                </div>
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                expandedSections.includes(section.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="p-4 bg-gray-50 text-gray-700">
                                    <div dangerouslySetInnerHTML={{ __html: section?.section_content }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
