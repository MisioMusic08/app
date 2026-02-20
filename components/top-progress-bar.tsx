"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function TopProgressBar() {
  const pathname = usePathname()
  const [active, setActive] = useState(true)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<number | null>(null)

  // Trigger on path change
  useEffect(() => {
    setActive(true)
    setProgress(0)

    // Simulate progressive loading
    if (timerRef.current) cancelAnimationFrame(timerRef.current)
    let start: number | null = null
    const step = (ts: number) => {
      if (start === null) start = ts
      const elapsed = ts - start
      // Ease to ~90% over 1.2s
      const pct = Math.min(90, 100 * (1 - Math.exp(-elapsed / 600)))
      setProgress(pct)
      timerRef.current = requestAnimationFrame(step)
    }
    timerRef.current = requestAnimationFrame(step)

    // Complete shortly after mount
    const done = setTimeout(() => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current)
        timerRef.current = null
      }
      setProgress(100)
      const finish = setTimeout(() => {
        setActive(false)
        setProgress(0)
      }, 250)
      return () => clearTimeout(finish)
    }, 800)

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current)
      clearTimeout(done)
    }
  }, [pathname])

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <AnimatePresence>
        {active && (
          <motion.div
            key="bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-1"
          >
            <motion.div
              className="h-1 bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
            />
            {/* Glow */}
            <motion.div
              className="h-0.5 -mt-0.5 bg-gradient-to-r from-fuchsia-400/40 via-rose-400/40 to-amber-300/40 blur-[2px]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
