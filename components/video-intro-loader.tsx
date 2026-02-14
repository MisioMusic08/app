"use client"

import { useEffect, useRef, useState } from "react"

const SEEN_KEY = "arise_intro_seen_v1"
const MOBILE_SRC = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ARISE_20250809_230243_0002-yBR8drtNGIlqYhL9DFWuGGmF60qHLq.mp4"
const DESKTOP_SRC = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025_08_11_03_13_55-w4kgJF7X8KJYoVGj7kowmSAPhXu9tA.mp4"

export default function VideoIntroLoader() {
  // pending = deciding; show = play intro; hide = skip
  const [status, setStatus] = useState<"pending" | "show" | "hide">("pending")

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let seen = false
    try {
      seen = typeof window !== "undefined" && localStorage.getItem(SEEN_KEY) === "1"
    } catch {
      seen = false
    }

    if (!reduce && !seen) {
      // Play intro and mark as seen immediately so it only happens once.
      try {
        localStorage.setItem(SEEN_KEY, "1")
      } catch {}
      setStatus("show")
    } else {
      setStatus("hide")
    }
  }, [])

  if (status === "pending") {
    // Prevent flash while deciding
    return <div className="fixed inset-0 z-[100] bg-black" aria-hidden />
  }
  if (status === "hide") return null
  return <IntroOverlay onDone={() => setStatus("hide")} />
}

function IntroOverlay({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [visible, setVisible] = useState(true)
  const [src, setSrc] = useState<string>(MOBILE_SRC)
  const [fit, setFit] = useState<"cover" | "contain">("cover")
  const finished = useRef(false)
  const fallbackTimer = useRef<number | null>(null)

  // True viewport height and safe areas
  useEffect(() => {
    const setSVH = () => {
      const svh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--svh", `${svh}px`)
    }
    setSVH()
    window.addEventListener("resize", setSVH)
    window.addEventListener("orientationchange", setSVH)
    return () => {
      window.removeEventListener("resize", setSVH)
      window.removeEventListener("orientationchange", setSVH)
    }
  }, [])

  // Fit rules: phones = cover, laptops/desktops (>=1024px) = contain (full frame)
  useEffect(() => {
    const updateFitAndSrc = () => {
      const w = window.innerWidth
      // Full screen on laptop/desktop and phone
      setFit("cover")
      // Use desktop video on >= 1024px, mobile video otherwise
      setSrc(w >= 1024 ? DESKTOP_SRC : MOBILE_SRC)
    }
    updateFitAndSrc()
    window.addEventListener("resize", updateFitAndSrc)
    window.addEventListener("orientationchange", updateFitAndSrc)
    return () => {
      window.removeEventListener("resize", updateFitAndSrc)
      window.removeEventListener("orientationchange", updateFitAndSrc)
    }
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const tryPlay = async () => {
      try {
        await v.play()
      } catch {
        // retry after canplay
      }
    }
    const finish = () => {
      if (finished.current) return
      finished.current = true
      setVisible(false)
      window.setTimeout(onDone, 420)
    }
    const onCanPlay = () => tryPlay()
    const onTimeUpdate = () => {
      if (finished.current) return
      if (v.duration && v.currentTime / v.duration > 0.985) finish()
    }
    const onEnded = () => finish()

    v.addEventListener("canplay", onCanPlay)
    v.addEventListener("timeupdate", onTimeUpdate)
    v.addEventListener("ended", onEnded)
    tryPlay()

    // Hard cap safeguard
    fallbackTimer.current = window.setTimeout(() => finish(), 20000)

    return () => {
      v.removeEventListener("canplay", onCanPlay)
      v.removeEventListener("timeupdate", onTimeUpdate)
      v.removeEventListener("ended", onEnded)
      if (fallbackTimer.current) window.clearTimeout(fallbackTimer.current)
    }
  }, [onDone])

  // Prevent scroll underneath
  useEffect(() => {
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = prev
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
      aria-hidden
      style={{
        height: "calc(var(--svh, 1vh) * 100)",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      <div className="absolute inset-0 bg-black" />
      <video
        ref={videoRef}
        key={src}
        className="absolute inset-0 w-full h-full"
        src={src}
        muted
        playsInline
        {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as any)}
        autoPlay
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
        style={{ objectFit: fit, objectPosition: "center center", transform: "translateZ(0)" }}
      />
      {/* End bloom */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-400 ${
          visible ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,1), rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0))",
        }}
      />
    </div>
  )
}
