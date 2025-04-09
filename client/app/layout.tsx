"use client"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import useAuthStore from "./store/authStore"
import "./globals.css"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

const metadata: Metadata = {
  title: "wessAcademy - Foundation for a Better Future",
  description: "A community with high expectation and high academic achievement",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const isAuth = useAuthStore((state) => state.isAuth);
  const getUserData = useAuthStore((state) => state.getUserData)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuth) {
      getUserData();
    }
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}