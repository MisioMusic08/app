"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-black">
      <div className="absolute inset-0">
        {/* Subtle animated gradient to blend into hero */}
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, background: [
            "radial-gradient(60% 60% at 50% 40%, rgba(245, 171, 255, 0.25), transparent), radial-gradient(40% 40% at 60% 60%, rgba(255, 145, 163, 0.25), transparent)",
            "radial-gradient(60% 60% at 55% 45%, rgba(245, 171, 255, 0.25), transparent), radial-gradient(40% 40% at 62% 58%, rgba(255, 145, 163, 0.25), transparent)",
          ] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-4xl font-semibold tracking-wider"
        >
          ARISE
        </motion.div>
        <div className="mt-6 w-64 h-2 bg-white/15 rounded-full overflow-hidden">
          <motion.div
            className="h-2 w-1/3 bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400"
            initial={{ x: "-50%" }}
            animate={{ x: "150%" }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="mt-4 text-white/70 text-sm">Preparing a calmer web...</div>
      </div>
    </div>
  )
}
