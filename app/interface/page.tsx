import Image from "next/image"
import { EmotionInterface } from "@/components/emotion-interface"

export default function InterfacePage() {
  return (
    <main className="relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/arise-forest-bg.png"
          alt=""
          width={1920}
          height={1200}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />
      </div>

      <section className="relative z-20 mx-auto max-w-6xl px-4 pt-24 md:pt-28 pb-[max(20px,env(safe-area-inset-bottom))] text-white">
        <h1 className="text-4xl font-semibold">Emotion Interface</h1>
        <p className="mt-3 text-white/90 max-w-3xl text-base md:text-lg">
          Prototype interface to visualize emotion from voice energy and text sentiment with soft, responsive motion.
          All processing happens locally in your browser.
        </p>
        <div className="mt-8">
          <EmotionInterface />
        </div>
      </section>
    </main>
  )
}
