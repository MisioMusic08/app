"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Mic, MicOff, Waves, Type, Sparkles, ShieldCheck, Volume2, Gauge, Loader2, Wand2, Activity } from 'lucide-react'

type VoiceStats = {
  rms: number // 0..1
  pitch: number | null
  speaking: boolean
  freqs: Uint8Array // frequency bins for EQ viz
}

type AiResult = {
  label: "Joy" | "Content" | "Neutral" | "Sadness" | "Anger" | "Surprise"
  valence: number
  arousal: number
  confidence: number
  rationale: string
} | null

const WORDS_POS = ["love","great","happy","calm","peace","wonderful","amazing","kind","care","joy","excited","proud","hope","grateful","safe","relaxed","fun"]
const WORDS_NEG = ["hate","bad","angry","sad","upset","terrible","awful","worried","stress","anxious","fear","tired","cry","lonely","hurt","mad"]

export function EmotionInterface() {
  const [tab, setTab] = useState<"multi" | "voice" | "text">("multi")
  const [text, setText] = useState("")
  const [textScore, setTextScore] = useState(0)
  const [sensitivity, setSensitivity] = useState(55)

  // Voice analysis (local)
  const { running, stats, start, stop } = useVoiceAnalyzer({ sensitivity })

  // Simple local sentiment for fallback blending
  useEffect(() => {
    const words = text.toLowerCase().match(/[a-z']+/g) || []
    let score = 0
    for (const w of words) {
      if (WORDS_POS.includes(w)) score += 1
      if (WORDS_NEG.includes(w)) score -= 1
    }
    setTextScore(words.length ? score / Math.sqrt(words.length) : 0)
  }, [text])

  // Pitch history for baseline and dynamics
  const pitchWindowRef = useRef<number[]>([])
  const prevPitchRef = useRef<number | null>(null)
  const [derivedPitch, setDerivedPitch] = useState<{ mean: number | null; stdev: number; z: number; delta: number }>(
    { mean: null, stdev: 0, z: 0, delta: 0 }
  )

  useEffect(() => {
    const p = stats.pitch
    // Update moving window when speaking and pitch available
    if (stats.speaking && p && isFinite(p)) {
      const win = pitchWindowRef.current
      win.push(p)
      if (win.length > 60) win.shift() // ~1-2s of history (depends on RAF)
      const mean = win.reduce((a, b) => a + b, 0) / win.length
      const variance = win.reduce((a, b) => a + (b - mean) * (b - mean), 0) / win.length
      const stdev = Math.max(1, Math.sqrt(variance))
      const z = (p - mean) / stdev
      const prev = prevPitchRef.current
      const delta = prev ? Math.abs(p - prev) : 0
      prevPitchRef.current = p
      setDerivedPitch({ mean, stdev, z, delta })
    } else {
      // When not speaking, gently decay the delta/z to zero
      setDerivedPitch((d) => ({ ...d, z: d.z * 0.9, delta: d.delta * 0.85 }))
      prevPitchRef.current = p ?? prevPitchRef.current
    }
  }, [stats.pitch, stats.speaking])

  // AI integration
  const { ai, analyzing, providerAvailable, triggerAnalyze, autoQueueAnalyze } = useAiAnalyzer()

  // Auto analyze when inputs change (debounced)
  useEffect(() => {
    autoQueueAnalyze({
      text,
      voice: {
        rms: stats.rms,
        pitch: stats.pitch,
        speaking: stats.speaking,
      },
    })
  }, [text, stats.rms, stats.pitch, stats.speaking, autoQueueAnalyze])

  // Fusion of AI result with local signals (AI wins when present)
  const fused = useMemo(() => {
    const energy = stats.rms
    const textValence = (Math.max(-1, Math.min(1, textScore)) + 1) / 2
    if (ai) {
      return {
        label: ai.label,
        arousal: ai.arousal,
        valence: ai.valence,
        confidence: ai.confidence,
        source: "ai" as const,
      }
    }

    // Voice-derived heuristics
    const z = derivedPitch.z // pitch deviation from your current baseline
    const deltaHz = derivedPitch.delta
    const speaking = stats.speaking

    // If not speaking, fall back to near-neutral
    if (!speaking && energy < 0.06) {
      return { label: "Neutral" as const, arousal: energy, valence: 0.5, confidence: 0.5, source: "local" as const }
    }

    // Surprise: sudden jump in pitch plus high arousal
    if (deltaHz > 120 && energy > 0.55) {
      return { label: "Surprise", arousal: clamp(0.7 + Math.min(0.25, energy), 0, 1), valence: textValence, confidence: 0.65, source: "local" as const }
    }

    // Joy vs Anger: both higher pitch than baseline and higher energy; choose by valence
    if (z > 0.6 && energy > 0.5) {
      const isPositive = textValence >= 0.52
      return {
        label: isPositive ? "Joy" : "Anger",
        arousal: clamp(0.65 + Math.min(0.3, energy), 0, 1),
        valence: isPositive ? clamp(0.65 + (z * 0.05), 0, 1) : clamp(0.35 - (z * 0.02), 0, 1),
        confidence: 0.6,
        source: "local" as const,
      }
    }

    // Sadness: lower-than-baseline pitch and low energy
    if (z < -0.4 && energy < 0.4) {
      return { label: "Sadness", arousal: clamp(energy * 0.9, 0, 0.4), valence: Math.min(0.45, textValence * 0.8), confidence: 0.6, source: "local" as const }
    }

    // Content: calmer energy with slightly positive valence
    if (energy < 0.45 && textValence >= 0.58) {
      return { label: "Content", arousal: clamp(energy * 0.8, 0, 0.5), valence: clamp(0.6 + (textValence - 0.5) * 0.5, 0.55, 0.85), confidence: 0.55, source: "local" as const }
    }

    // Neutral default
    return { label: "Neutral", arousal: energy, valence: 0.5, confidence: 0.5, source: "local" as const }
  }, [ai, stats.rms, stats.speaking, textScore, derivedPitch.z, derivedPitch.delta])

  // Animated derived values
  const energySpring = useSpring(fused.arousal, { stiffness: 120, damping: 20, mass: 0.7 })
  const valenceSpring = useSpring(fused.valence, { stiffness: 120, damping: 20, mass: 0.7 })
  useEffect(() => {
    energySpring.set(fused.arousal)
    valenceSpring.set(fused.valence)
  }, [fused.arousal, fused.valence, energySpring, valenceSpring])

  return (
    <div className="w-full">
      {/* Top: Emotion Summary - mobile-first hero */}
      <section className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr] lg:gap-6">
        <Card className="bg-white/75 dark:bg-black/40 backdrop-blur border border-white/30 dark:border-white/10 overflow-hidden">
          <CardContent className="p-5 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                Detected Emotion
                {analyzing && <Loader2 className="h-3.5 w-3.5 animate-spin text-rose-500" />}
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-fuchsia-600 to-rose-600">
                  {providerAvailable ? "AI Powered" : "Local Mode"}
                </Badge>
                <Button
                  size="sm"
                  variant="secondary"
                  className="gap-1"
                  onClick={() =>
                    triggerAnalyze({
                      text,
                      voice: { rms: stats.rms, pitch: stats.pitch, speaking: stats.speaking },
                    })
                  }
                >
                  <Wand2 className="h-4 w-4" /> Analyze
                </Button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-[minmax(240px,340px)_1fr] gap-6 items-start">
              {/* Emotion Avatar */}
              <EmotionAvatar
                emotion={fused.label}
                energy={fused.arousal}
                valence={fused.valence}
                speaking={stats.speaking}
                pitch={stats.pitch}
              />

              {/* Numbers and badges */}
              <div className="grid gap-4">
                <div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">{fused.label}</div>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {providerAvailable ? `Confidence ${Math.round((ai?.confidence ?? 0.5) * 100)}%` : "Heuristic"}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Metric label="Arousal" value={fused.arousal} />
                  <Metric label="Valence" value={fused.valence} />
                  <Metric
                    label="Pitch"
                    value={stats.pitch ? Math.min(999, Math.round(stats.pitch)) / 1000 : 0}
                    fmt={() => (stats.pitch ? `${Math.round(stats.pitch)} Hz` : "—")}
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Metric
                    label="Pitch Δ"
                    value={derivedPitch.delta / 400}
                    fmt={() => `${Math.round(derivedPitch.delta)} Hz`}
                  />
                  <Metric
                    label="Pitch z"
                    value={(derivedPitch.z + 3) / 6}
                    fmt={() => derivedPitch.z.toFixed(2)}
                  />
                  <div className="hidden sm:flex items-center gap-2 rounded-lg bg-white/60 dark:bg-white/10 px-3 py-2 text-sm">
                    <Activity className="h-4 w-4 text-rose-500" />
                    <span className="text-gray-600 dark:text-gray-300">Speaking {stats.speaking ? "Yes" : "No"}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1"><ShieldCheck className="h-3.5 w-3.5" /> Privacy-first</Badge>
                  <Badge variant="secondary" className="gap-1"><Sparkles className="h-3.5 w-3.5" /> Real-time</Badge>
                </div>
              </div>
            </div>

            {ai?.rationale && providerAvailable && (
              <div className="mt-4 text-xs text-gray-600 dark:text-gray-300">
                Rationale: {ai.rationale}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Controls quick access on mobile */}
        <Card className="bg-white/75 dark:bg-black/40 backdrop-blur border border-white/30 dark:border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Gauge className="h-4 w-4 text-rose-500" /> Controls</CardTitle>
            <CardDescription>Use your microphone and text to explore the interface.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 md:space-y-5">
            <div className="flex items-center justify-center">
              <MicCircle
                running={running}
                onToggle={() => (running ? stop() : start())}
                ariaLabel={running ? "Stop microphone" : "Start microphone"}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <Volume2 className="h-4 w-4" /> Sensitivity
              </div>
              <Slider value={[sensitivity]} onValueChange={(v)=>setSensitivity(v[0])} min={0} max={100} step={1} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Bottom: Tabs for Voice/Text, with advanced visuals */}
      <Tabs value={tab} onValueChange={(v)=>setTab(v as typeof tab)} className="w-full">
        <TabsList className="bg-white/70 dark:bg-white/10 backdrop-blur">
          <TabsTrigger value="multi" className="gap-2"><Sparkles className="h-4 w-4" /> Fusion</TabsTrigger>
          <TabsTrigger value="voice" className="gap-2"><Waves className="h-4 w-4" /> Voice</TabsTrigger>
          <TabsTrigger value="text" className="gap-2"><Type className="h-4 w-4" /> Text</TabsTrigger>
        </TabsList>

        {/* Fusion View */}
        <TabsContent value="multi" className="mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <FusionEQ freqs={stats.freqs} energy={fused.arousal} />
            <TextPanel text={text} setText={setText} score={textScore} />
          </div>
        </TabsContent>

        {/* Voice View */}
        <TabsContent value="voice" className="mt-4 md:mt-5">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <VoicePanel freqs={stats.freqs} pitch={stats.pitch} energy={fused.arousal} speaking={stats.speaking} />
            <InfoPanel title="Tips" items={[
              "Try a calm 'mm-hmm' (lower pitch) vs an excited 'ahhhh!' (higher pitch).",
              "Speak near the mic and reduce background noise.",
              "Click Analyze to compare with the cloud model when available.",
            ]} />
          </div>
        </TabsContent>

        {/* Text View */}
        <TabsContent value="text" className="mt-4 md:mt-5">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <TextPanel text={text} setText={setText} score={textScore} large />
            <InfoPanel title="Examples" items={[
              "I feel calm and optimistic about the future.",
              "I'm frustrated that this kept breaking.",
              "Today was incredible — proud of the team!",
            ]} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/* ————— Avatar (unchanged, supports all 6 emotions) ————— */

function EmotionAvatar({
  emotion,
  energy,
  valence,
  speaking,
  pitch,
}: {
  emotion: string
  energy: number
  valence: number
  speaking: boolean
  pitch: number | null
}) {
  const targets = getEmotionTargets(emotion)

  const smile = useSpring(targets.smile, { stiffness: 160, damping: 20, mass: 0.7 })
  const open = useSpring(targets.open, { stiffness: 160, damping: 20, mass: 0.7 })
  const brow = useSpring(targets.brow, { stiffness: 160, damping: 20, mass: 0.7 })
  const eyeHappy = useSpring(targets.eyeHappy ? 1 : 0, { stiffness: 160, damping: 20, mass: 0.7 })
  const eyeOpen = useSpring(targets.eyeOpen, { stiffness: 160, damping: 20, mass: 0.7 })

  useEffect(() => {
    smile.set(targets.smile)
    open.set(targets.open)
    brow.set(targets.brow)
    eyeHappy.set(targets.eyeHappy ? 1 : 0)
    eyeOpen.set(targets.eyeOpen)
  }, [targets, smile, open, brow, eyeHappy, eyeOpen])

  const hue = 0 + (120 - 0) * valence
  const light = 45 + (70 - 45) * energy

  const mouthD = useMemo(() => {
    const cx = 120, cy = 145
    const w = 86
    const leftX = cx - w / 2
    const rightX = cx + w / 2
    const s = clamp(smile.get(), -1, 1)
    const o = clamp(open.get(), 0, 1)
    const curve = s * 26
    const drop = o * 22
    const c1x = cx - w * 0.25, c2x = cx + w * 0.25
    const c1y = cy + curve - drop
    const c2y = cy + curve - drop
    const y = cy + (s < 0 ? 6 : 0)
    return `M ${leftX} ${y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${rightX} ${y}`
  }, [smile, open])

  const isO = useMemo(() => {
    const s = Math.abs(smile.get())
    return open.get() > 0.65 && s < 0.25
  }, [smile, open])

  const eyeScaleY = useTransform(eyeOpen, [0, 1], [0.2, 1])
  const pupilScale = 0.8 + Math.min(0.3, energy * 0.6)
  const browTilt = useTransform(brow, [-30, 30], [-18, 18])

  return (
    <div className="relative w-[clamp(220px,28vw,320px)] sm:w-[clamp(240px,26vw,340px)] md:w-[clamp(260px,24vw,340px)] lg:w-[360px] mx-auto md:mx-0">
      <motion.div
        className="absolute -inset-6 rounded-full blur-2xl"
        style={{ background: `radial-gradient(circle, hsla(${hue},90%,${light + 18}%,0.75), transparent 60%)` }}
        animate={{ opacity: speaking ? [0.6, 1, 0.6] : 0.7, scale: speaking ? [0.98, 1.02, 0.98] : 1 }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />

      <div className="relative rounded-3xl p-5 bg-white/0">
        <motion.svg
          viewBox="0 0 240 240"
          className="w-full h-full"
          initial={false}
          animate={{
            scale: speaking ? [1, 1.015, 1] : 1,
            rotate: speaking ? [0, 1.5, -1.5, 0] : 0,
          }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <radialGradient id="face-grad" cx="45%" cy="35%" r="70%">
              <stop offset="0%" stopColor={`hsl(${hue}, 90%, ${light + 10}%)`} />
              <stop offset="100%" stopColor={`hsl(${hue}, 65%, ${light}%)`} />
            </radialGradient>
            <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
              <feBlend in="SourceGraphic" in2="blur" mode="normal" />
            </filter>
          </defs>

          <circle cx="120" cy="120" r="96" fill="url(#face-grad)" filter="url(#soft)" />

          {/* Eyes (open variant) */}
          <g>
            <motion.ellipse
              cx="86" cy="102" rx="12" ry="8"
              style={{ scaleY: eyeScaleY as any }}
              fill="rgba(0,0,0,0.85)"
              opacity={1 - (eyeHappy.get?.() ?? 0)}
            />
            <motion.ellipse
              cx="154" cy="102" rx="12" ry="8"
              style={{ scaleY: eyeScaleY as any }}
              fill="rgba(0,0,0,0.85)"
              opacity={1 - (eyeHappy.get?.() ?? 0)}
            />
            <motion.circle cx="86" cy="102" r={3.5 * pupilScale} fill="rgba(255,255,255,0.9)" opacity={1 - (eyeHappy.get?.() ?? 0)} />
            <motion.circle cx="154" cy="102" r={3.5 * pupilScale} fill="rgba(255,255,255,0.9)" opacity={1 - (eyeHappy.get?.() ?? 0)} />
          </g>

          {/* Eyes (happy arc variant) */}
          <g opacity={eyeHappy.get?.() ?? 0}>
            <path d="M74 102 Q 86 94 98 102" stroke="rgba(0,0,0,0.85)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M142 102 Q 154 94 166 102" stroke="rgba(0,0,0,0.85)" strokeWidth="6" strokeLinecap="round" fill="none" />
          </g>

          {/* Brows */}
          <g>
            <motion.line
              x1="72" y1="82" x2="104" y2="78"
              stroke="rgba(0,0,0,0.8)" strokeWidth="6" strokeLinecap="round"
              style={{ rotate: browTilt as any, transformOrigin: "88px 80px" }}
            />
            <motion.line
              x1="136" y1="78" x2="168" y2="82"
              stroke="rgba(0,0,0,0.8)" strokeWidth="6" strokeLinecap="round"
              style={{ rotate: (useTransform(browTilt, (v)=> -v) as any), transformOrigin: "152px 80px" }}
            />
          </g>

          {/* Mouth */}
          {isO ? (
            <motion.circle
              cx="120" cy="145"
              r={10 + open.get() * 18}
              fill="rgba(0,0,0,0.85)"
            />
          ) : (
            <motion.path
              d={mouthD}
              stroke="rgba(0,0,0,0.85)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </motion.svg>
      </div>
    </div>
  )
}

function getEmotionTargets(emotion: string) {
  const base = { smile: 0, open: 0.12, brow: 0, eyeHappy: false, eyeOpen: 0.85 }
  switch (emotion) {
    case "Joy":
      return { smile: 0.8, open: 0.22, brow: -12, eyeHappy: true, eyeOpen: 0.6 }
    case "Content":
      return { smile: 0.45, open: 0.16, brow: -4, eyeHappy: false, eyeOpen: 0.9 }
    case "Sadness":
      return { smile: -0.65, open: 0.14, brow: 10, eyeHappy: false, eyeOpen: 0.7 }
    case "Anger":
      return { smile: -0.25, open: 0.18, brow: 18, eyeHappy: false, eyeOpen: 0.6 }
    case "Surprise":
      return { smile: 0.0, open: 0.9, brow: -6, eyeHappy: false, eyeOpen: 1.0 }
    default:
      return base
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function Metric({ label, value, fmt }: { label: string; value: number; fmt?: (v:number)=>string }) {
  const display = fmt ? fmt(value) : value.toFixed(2)
  return (
    <div className="rounded-lg bg-white/60 dark:bg-white/10 px-3 py-2 flex items-center justify-between text-sm">
      <span className="text-gray-600 dark:text-gray-300">{label}</span>
      <span className="font-mono">{display}</span>
    </div>
  )
}

function FusionEQ({ freqs, energy }: { freqs: Uint8Array; energy: number }) {
  const bars = 32
  const step = Math.max(1, Math.floor(freqs.length / bars))
  const values = new Array(bars).fill(0).map((_, i) => freqs[i * step] || 0)

  return (
    <Card className="bg-white/75 dark:bg-black/40 backdrop-blur border border-white/30 dark:border-white/10 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Multimodal Visualizer</CardTitle>
        <CardDescription>Frequency energy and overall activation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden bg-gradient-to-b from-black/10 to-black/20 border border-white/20">
          <div className="absolute inset-0 grid grid-cols-32 items-end gap-[2px] px-3 pb-3">
            {values.map((v, idx) => {
              const h = (v / 255) * 100
              return (
                <motion.div
                  key={idx}
                  className="bg-gradient-to-t from-rose-500/70 via-fuchsia-500/80 to-amber-400/90 rounded-t-[6px]"
                  initial={{ height: "5%" }}
                  animate={{ height: `${Math.max(4, h)}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.6 }}
                />
              )
            })}
          </div>
          <motion.div className="absolute left-0 right-0" style={{ bottom: `${Math.max(6, energy*100)}%` }}>
            <div className="h-0.5 bg-gradient-to-r from-fuchsia-400/70 via-rose-400/70 to-amber-300/70 blur-[1px]" />
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

function VoicePanel({ freqs, pitch, energy, speaking }: { freqs: Uint8Array; pitch: number | null; energy: number; speaking: boolean }) {
  const bars = 40
  const step = Math.max(1, Math.floor(freqs.length / bars))
  const values = new Array(bars).fill(0).map((_, i) => freqs[i * step] || 0)

  return (
    <Card className="bg-white/75 dark:bg-black/40 backdrop-blur border border-white/30 dark:border-white/10 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Voice Analyzer</CardTitle>
        <CardDescription>Live EQ, energy, and estimated pitch</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative h-44 sm:h-56 rounded-xl overflow-hidden bg-gradient-to-b from-black/10 to-black/20 border border-white/20">
          <div className="absolute inset-0 grid grid-cols-40 items-end gap-[2px] px-3 pb-3">
            {values.map((v, idx) => {
              const h = (v / 255) * 100
              return (
                <motion.div
                  key={idx}
                  className="rounded-t-[6px]"
                  style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.0) 0%, rgba(236,72,153,0.9) 100%)" }}
                  initial={{ height: "6%" }}
                  animate={{ height: `${Math.max(5, h)}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              )
            })}
          </div>
          <motion.div className="absolute inset-x-0" style={{ bottom: `${Math.max(6, energy*100)}%` }}>
            <div className="h-0.5 bg-gradient-to-r from-fuchsia-400 via-rose-400 to-amber-300 blur-[1px]" />
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Metric label="Speaking" value={speaking ? 1 : 0} fmt={() => speaking ? "Yes" : "No"} />
          <Metric label="Energy" value={energy} />
          <Metric label="Pitch" value={pitch ? pitch / 1000 : 0} fmt={() => pitch ? `${Math.round(pitch)} Hz` : "—"} />
        </div>
      </CardContent>
    </Card>
  )
}

function TextPanel({ text, setText, score, large = false }: { text: string; setText: (v:string)=>void; score: number; large?: boolean }) {
  const valence = (Math.max(-1, Math.min(1, score)) + 1) / 2
  const hue = 0 + (120 - 0) * valence
  const pct = Math.round(valence * 100)

  return (
    <Card className="bg-white/75 dark:bg-black/40 backdrop-blur border border-white/30 dark:border-white/10 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Text Sentiment</CardTitle>
        <CardDescription>Type how you feel — local estimation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          rows={large ? 10 : 6}
          value={text}
          onChange={(e)=>setText(e.target.value)}
          placeholder="Write your thoughts..."
          className="bg-white/90 dark:bg-black/40"
        />
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border" style={{ borderColor: `hsl(${hue}, 75%, 55%)` }}>
              <div className="w-full h-full rounded-full" style={{ background: `conic-gradient(hsl(${hue},75%, 75%, 55%) ${pct}%, rgba(0,0,0,0) ${pct}%)` }} />
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">Valence {pct}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="bg-white/75 dark:bg-black/40 backdrop-blur border border-white/30 dark:border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm">Helpful guidance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <ul className="list-disc pl-5 space-y-1">
          {items.map((t, i) => <li key={i} className="text-sm text-gray-700 dark:text-gray-300">{t}</li>)}
        </ul>
      </CardContent>
    </Card>
  )
}

function MicCircle({
  running,
  onToggle,
  ariaLabel,
}: {
  running: boolean
  onToggle: () => void
  ariaLabel?: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault()
          onToggle()
        }
      }}
      aria-pressed={running}
      aria-label={ariaLabel || "Toggle microphone"}
      className={[
        "relative grid place-items-center",
        "h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full",
        "transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400/60",
        running
          ? "bg-gradient-to-br from-fuchsia-600 to-rose-600 text-white"
          : "bg-white dark:bg-white/10 text-gray-800 dark:text-white",
        "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
      ].join(" ")}
      style={{ contain: "layout paint style" }}
    >
      <div
        className={[
          "absolute inset-0 rounded-full",
          "pointer-events-none",
          running ? "animate-pulse" : "opacity-0",
        ].join(" ")}
        style={{
          boxShadow:
            running
              ? "0 0 0 10px rgba(236,72,153,0.15), 0 0 0 18px rgba(244,114,182,0.10)"
              : "none",
        }}
      />
      {running ? (
        <MicOff className="h-8 w-8 sm:h-9 sm:w-9" />
      ) : (
        <Mic className="h-8 w-8 sm:h-9 sm:w-9" />
      )}
      <span className="sr-only">{ariaLabel || "Toggle microphone"}</span>
    </button>
  )
}

/* ————— AI hook ————— */

function useAiAnalyzer() {
  const [ai, setAi] = useState<AiResult>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [providerAvailable, setProviderAvailable] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastPayloadRef = useRef<string>("")

  const analyze = useCallback(async (payload: {
    text: string
    voice: { rms: number; pitch: number | null; speaking: boolean }
  }) => {
    const key = JSON.stringify({
      t: payload.text.slice(0, 200),
      r: Math.round(payload.voice.rms * 100) / 100,
      p: payload.voice.pitch ? Math.round(payload.voice.pitch) : null,
      s: payload.voice.speaking,
    })
    if (key === lastPayloadRef.current) return // skip duplicate
    lastPayloadRef.current = key

    setAnalyzing(true)
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data?.providerAvailable === false) {
        setProviderAvailable(false)
        setAi(null)
      } else {
        setProviderAvailable(true)
        if (data?.ok && data?.result) {
          setAi({
            label: data.result.label,
            valence: data.result.valence,
            arousal: data.result.arousal,
            confidence: data.result.confidence,
            rationale: data.result.rationale,
          })
        }
      }
    } catch {
      // leave ai as-is on network errors
    } finally {
      setAnalyzing(false)
    }
  }, [])

  const autoQueueAnalyze = useCallback((payload: {
    text: string
    voice: { rms: number; pitch: number | null; speaking: boolean }
  }) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    // Debounce: trigger ~1.2s after last change
    timerRef.current = setTimeout(() => analyze(payload), 1200)
  }, [analyze])

  const triggerAnalyze = useCallback((payload: {
    text: string
    voice: { rms: number; pitch: number | null; speaking: boolean }
  }) => analyze(payload), [analyze])

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  return { ai, analyzing, providerAvailable, triggerAnalyze, autoQueueAnalyze }
}

/* ————— Voice analyzer (local) ————— */

function useVoiceAnalyzer({ sensitivity }: { sensitivity: number }) {
  const [running, setRunning] = useState(false)
  const [stats, setStats] = useState<VoiceStats>({ rms: 0, pitch: null, speaking: false, freqs: new Uint8Array(128) })
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number | null>(null)

  const start = useCallback(async () => {
    if (running) return
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    streamRef.current = stream
    setRunning(true)

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const source = ctx.createMediaStreamSource(stream)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 2048
    const freqAnalyser = ctx.createAnalyser()
    freqAnalyser.fftSize = 2048
    source.connect(analyser)
    source.connect(freqAnalyser)

    const buf = new Float32Array(analyser.fftSize)
    const freqs = new Uint8Array(freqAnalyser.frequencyBinCount)

    const loop = () => {
      analyser.getFloatTimeDomainData(buf)
      freqAnalyser.getByteFrequencyData(freqs)

      let sum = 0
      for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i]
      let rms = Math.sqrt(sum / buf.length)
      rms = Math.min(1, rms * (0.5 + sensitivity / 50))

      const speaking = rms > 0.06
      const pitch = estimatePitch(buf, ctx.sampleRate)

      setStats({ rms, pitch, speaking, freqs: freqs.slice(0) })
      rafRef.current = requestAnimationFrame(loop)
    }
    loop()
  }, [running, sensitivity])

  const stop = useCallback(() => {
    if (!running) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    setRunning(false)
    setStats({ rms: 0, pitch: null, speaking: false, freqs: new Uint8Array(128) })
  }, [running])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    }
  }, [])

  return { running, stats, start, stop }
}

// Simple autocorrelation pitch estimator
function estimatePitch(buf: Float32Array, sampleRate: number): number | null {
  let SIZE = buf.length
  let rms = 0
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i]
  rms = Math.sqrt(rms / SIZE)
  if (rms < 0.01) return null

  let r1 = 0, r2 = SIZE - 1, thres = 0.2
  for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buf[i]) < thres) { r1 = i; break }
  for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break }
  SIZE = r2 - r1
  if (SIZE < 32) return null

  const c = new Array(SIZE).fill(0)
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) c[i] = c[i] + buf[r1 + j] * buf[r1 + i + j]
  }
  let d = 0
  while (c[d] > c[d + 1]) d++
  let maxval = -1, maxpos = -1
  for (let i = d; i < SIZE; i++) if (c[i] > maxval) { maxval = c[i]; maxpos = i }
  const T0 = maxpos
  return T0 ? sampleRate / T0 : null
}
