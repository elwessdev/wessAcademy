"use client"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Bell } from "lucide-react"
import { useRef } from "react";
import { Signin } from "@/app/components/signin"
import { Signup } from "@/app/components/signup"

export default function Home() {
  const signInModel = useRef(null);
  const signUpModel = useRef(null);

  return (
    <div className="min-h-screen bg-indigo-500 bg-gradient-to-br from-indigo-400 to-indigo-600">
      <div className="bg-white overflow-hidden shadow-xl">

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[100vh]">

          {/* Left column */}
          <div className="p-8 lg:p-12 h-[100vh] relative">
            <div className="mb-16">
              <Image
                src="/logo3.png"
                alt="wessAcademy logo"
                width={180}
                height={69}
                className="h-12 w-[180px] h-[69px] object-contain"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                A good <span className="text-indigo-500">education</span> <br />
                is a foundation for <br />
                better future
              </h1>
              <p className="mt-6 text-gray-600 max-w-md">
                A community with high expectation and high academic achievement
              </p>
              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-block px-8 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition-all duration-200 outline-none"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="bg-indigo-500 p-8 lg:p-12 relative h-[100vh]">
            {/* Navigation */}
            <nav className="flex justify-end items-center space-x-6 text-white mb-8 ">
              <Link href="/" className="hover:text-indigo-200 transition-all duration-200">
                About us
              </Link>
              <Link href="/" className="hover:text-indigo-200 transition-all duration-200">
                Service
              </Link>
              <Link href="/" className="hover:text-indigo-200 transition-all duration-200">
                Courses
              </Link>
              <div className="flex justify-end items-center space-x-2 text-white">
                <button
                  onClick={()=>{
                    if (signInModel.current) {
                      signInModel.current.showModal();
                    }
                  }}
                  className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  Sign in
                </button>
                <button
                  onClick={()=>{
                    if (signUpModel.current) {
                      signUpModel.current.showModal();
                    }
                  }}
                  className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  Sign up
                </button>
              </div>
            </nav>
            {/* Student image and notifications */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="absolute -left-16 top-1/4 bg-white p-4 rounded-xl shadow-lg z-10 flex items-center space-x-2">
                <Bell className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Get 20% offer</span>
              </div>

              <div className="bg-white rounded-3xl p-6 max-w-sm mx-auto relative w-[385px] h-[400px]">
                <Image
                  src="/home.jpg"
                  width={385}
                  height={400}
                  alt="Student with books"
                  className="rounded-2xl w-[100%] h-[100%]"
                />

                <div className="absolute -right-12 top-8 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Congratulation</p>
                      <p className="text-xs text-gray-500">Your admission completed</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-8 bottom-16 bg-white p-3 rounded-xl shadow-lg">
                  <div className="w-16 h-16 flex flex-col items-center justify-center">
                    <span className="text-xs font-medium text-gray-900">Skills</span>
                    <svg className="w-10 h-6 mt-1" viewBox="0 0 40 24">
                      <path
                        d="M0,20 Q10,23 20,15 T40,12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-indigo-500"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        {/* <div className="bg-navy-900 text-white py-10 px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center 
        w-full">
          <div>
            <div className="text-3xl font-bold">250+</div>
            <div className="text-indigo-200 mt-1">Total Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold">300+</div>
            <div className="text-indigo-200 mt-1">Total Instructor</div>
          </div>
          <div>
            <div className="text-3xl font-bold">35k+</div>
            <div className="text-indigo-200 mt-1">Total Students</div>
          </div>
          <div>
            <div className="text-3xl font-bold">42k+</div>
            <div className="text-indigo-200 mt-1">Total Seat</div>
          </div>
        </div> */}

        <dialog ref={signInModel} id="signInModel" className="modal">
          <div className="modal-box">
            <Signin onClose={()=>{
              if (signInModel.current) {
                signInModel.current.close();
              }
            }} />
          </div>
        </dialog>

        <dialog ref={signUpModel} id="signUpModel" className="modal">
          <div className="modal-box">
            <Signup onClose={()=>{
              if (signUpModel.current) {
                signUpModel.current.close();
              }
            }} />
          </div>
        </dialog>

      </div>
    </div>
  )
}

