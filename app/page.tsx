import Image from "next/image"
import { Hero } from "@/components/hero"

export default function Page() {
  return (
    <main className="relative min-h-[120vh]">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/arise-forest-bg.png"
          alt=""
          width={1920}
          height={1200}
          className="h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25),rgba(0,0,0,0.55))]" />
      </div>

      <Hero />

      {/* Feature strips */}
      <section className="relative z-20 mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "On-device first", text: "Privacy-preserving emotion sensing for modern apps." },
            { title: "Multimodal", text: "Voice and text signals combined for deeper understanding." },
            { title: "Human-centered", text: "Ethical, inclusive design that respects user intent." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border bg-white/70 dark:bg-black/40 backdrop-blur p-6">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
