import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "wessAcademy - Foundation for a Better Future",
  description: "A community with high expectation and high academic achievement",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import './globals.css'