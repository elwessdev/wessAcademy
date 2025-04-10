"use client";
import { usePathname } from 'next/navigation';
import Courses from "./Courses";

export default function Home() {
    const pathname = usePathname();
    return (
        <div className="">
            {pathname === '/home' && <Courses />}
            {/* {pathname === '/home/settings' && <Settings />}
            {pathname === '/home/courseContent' && <CourseContent />} */}
            {/* Default to Courses if no other path matches */}
        </div>
    );
}
