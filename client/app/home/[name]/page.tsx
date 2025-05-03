"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Check, ChevronLeft } from "lucide-react"
import { useParams } from "next/navigation"
import "./style.scss"
import Link from "next/link"

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
                console.log("course", data.course);
            } else {
                console.error("Failed to fetch course:", data)
            }
        }
        getCourse()
    },[name, params])


    const toggleCompletion = (e: React.MouseEvent, sectionId: number) => {
        e.stopPropagation()
        setCompletedSections((prev) =>
            prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
        )
    }

//   const progressPercentage = Math.round((completedSections.length / course.sections.length) * 100)

    return (
        <div className="flex gap-6 p-6 flex-wrap h-[calc(100vh-74px)] overflow-auto">
            <div className="flex w-[100%] mb-[10px]">
                <Link href="/home">
                    <ChevronLeft size={30} className="relative top-[4px]" />
                </Link>
                <h3 className="text-left text-[25px] font-bold text-gray-700">
                    {course?.course_name}
                </h3>
            </div>
            <div className="w-[300px] bg-white shadow-md h-fit p-4 rounded-md">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[20px] font-semibold text-gray-700">Sections</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-medium">{sections.length}</span>
                </div>
                {sections.map((section:any, index:any) => (
                    <div key={index} className="flex mb-2 select-none py-2 cursor-pointer rounded-md" onClick={() => {console.log("ok")}}>
                        <div
                            className={`w-5 h-5 rounded border flex items-center justify-start cursor-pointer mr-[10px] ${
                            completedSections.includes(section.id) ? "bg-indigo-500 border-indigo-500" : "border-gray-300"
                            }`}
                            onClick={(e) => toggleCompletion(e, section.id)}
                        >
                            {completedSections.includes(section.id) && <Check className="h-3.5 text-white" />}
                        </div>
                        {/* <span className="mr-1 text-gray-700">{section.section_number}.</span> */}
                        <span
                            className={`font-medium text-black`}
                        >
                            {section.section_title}
                        </span>
                    </div>
                ))}
            </div>
            <div className="w-[calc(100%-324px)] flex flex-wrap gap-6 h-[calc(100vh-74px)] overflow-auto">
                <div className="control">
                    <span>Next</span>
                    <span>Prev</span>
                </div>
                {
                    sections.map((section:any, index:any) => (
                        <div 
                            className="bg-white flex flex-wrap items-center justify-between p-4 rounded-md w-full shadow-md" 
                            key={index}
                        >
                            <h3 className="flex flex-wrap">
                                <span className="text-[18px] font-semibold text-gray-700 w-full">
                                    {section.section_number}.<> </>
                                    {section.section_title}
                                </span>
                                <span className="text-[15px] py-1 font-medium w-full text-[#6b7280]">
                                    {section.section_description}
                                </span>
                            </h3>
                            <div className="p-4 rounded-md mb-2 w-full">
                                {section?.video && 
                                    (
                                        <h1>Video</h1>
                                    )
                                }
                                {
                                    <div dangerouslySetInnerHTML={{ __html: section?.section_content }} />
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
