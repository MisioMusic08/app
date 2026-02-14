"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[78vh] grid place-items-center text-center">
      <div className="relative z-20 mx-auto max-w-3xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
        >
          Emotional AI, Elevated
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="mt-4 text-lg md:text-xl text-white/90"
        >
          ARISE decodes human emotion from voice and text to help products feel more human—private, ethical, and beautifully designed.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500">
            <Link href="/interface">
              Try the Emotion Interface
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="bg-white/90 hover:bg-white text-gray-900">
            <Link href="/about">About Us</Link>
          </Button>
        </motion.div>
      </div>

      {/* Subtle depth vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" aria-hidden />
    </section>
  )
}
