"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/interface", label: "Emotion Interface" },
  { href: "/founder", label: "Founder" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-3 left-0 right-0 z-50">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="backdrop-blur-md bg-white/40 dark:bg-black/30 border border-white/30 dark:border-white/10 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between p-3">
            <Link href="/" className="font-semibold tracking-wider text-gray-900 dark:text-gray-100">
              <span className="text-xl">ARISE</span>{" "}
              <span className="text-sm text-gray-600 dark:text-gray-400">Emotional AI</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm transition-colors",
                    pathname === l.href
                      ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                      : "hover:bg-gray-900/10 dark:hover:bg-white/10"
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <Button asChild size="sm" className="ml-2 bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500">
                <Link href="/interface">Try Now</Link>
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden px-3 pb-3"
              >
                <div className="flex flex-col gap-2">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm",
                        pathname === l.href
                          ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                          : "hover:bg-gray-900/10 dark:hover:bg-white/10"
                      )}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  )
}
