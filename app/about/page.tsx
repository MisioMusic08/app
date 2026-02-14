import Image from "next/image"

export default function AboutPage() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      <section className="relative z-20 mx-auto max-w-5xl px-4 pt-28 pb-16 text-white">
        <h1 className="text-4xl md:text-5xl font-semibold">About ARISE</h1>
        <p className="mt-4 text-lg text-white/90 max-w-3xl">
          ARISE is building Emotional AI that helps products respond with care. We combine signal processing, lightweight models,
          and thoughtful design to create experiences that feel calm and human.
        </p>
      </section>

      <section className="relative z-20 mx-auto max-w-5xl px-4 pb-20 grid gap-6 md:grid-cols-3">
        {[
          { k: "2019", v: "Research began on robust, privacy-first voice features." },
          { k: "2022", v: "Prototype multimodal emotion interface shipped to partners." },
          { k: "2025", v: "ARISE Next Gen platform preview." },
        ].map((i) => (
          <div key={i.k} className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-6 text-white">
            <div className="text-sm uppercase tracking-wide text-white/70">{i.k}</div>
            <div className="mt-2">{i.v}</div>
          </div>
        ))}
      </section>

      <section className="relative z-20 mx-auto max-w-5xl px-4 pb-32">
        <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur p-8 text-white">
          <h2 className="text-2xl font-semibold">Values</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li className="bg-white/10 rounded-xl p-4">Respect and privacy by default</li>
            <li className="bg-white/10 rounded-xl p-4">Inclusive emotion representations</li>
            <li className="bg-white/10 rounded-xl p-4">Clarity and consent in UX</li>
            <li className="bg-white/10 rounded-xl p-4">Evidence-driven design</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
