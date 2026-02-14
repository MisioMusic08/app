import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import VideoIntroLoader from "@/components/video-intro-loader"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { TopProgressBar } from "@/components/top-progress-bar"

export const metadata: Metadata = {
  title: "ARISE - Emotional AI",
  description: "Next-gen emotional intelligence platform powered by advanced AI",
  generator: "arise.ai",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="bg-white dark:bg-black antialiased min-h-screen">
        <VideoIntroLoader />
        <TopProgressBar />
        <Navbar />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  )
}
