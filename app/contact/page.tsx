import Image from "next/image"
import { ContactForm } from "./submit"

export default function ContactPage() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />
      </div>

      <section className="relative z-20 mx-auto max-w-5xl px-4 pt-28 pb-24 text-white">
        <h1 className="text-4xl md:text-5xl font-semibold">Contact</h1>
        <p className="mt-3 text-white/90 max-w-2xl">
          Tell us about your product and how emotional intelligence can help your users feel understood.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
