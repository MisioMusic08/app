import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FounderPage() {
  return (
    <main className="relative">
      {/* Background */}
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
        <h1 className="text-4xl md:text-5xl font-semibold">Founder</h1>
        <p className="mt-3 text-white/90 max-w-3xl">
          ARISE is led by a young builder passionate about making technology feel kinder and more emotionally aware.
        </p>
      </section>

      <section className="relative z-20 mx-auto max-w-5xl px-4 pb-28 grid gap-6 md:grid-cols-[1fr_1.35fr]">
        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardContent className="p-6 md:p-8">
            <div className="w-full flex justify-center">
              <div
                className="relative aspect-square w-[280px] sm:w-[340px] md:w-[400px] rounded-full overflow-hidden border-4 border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.45)] bg-white/5"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/v0_image-VsUCXinwJnnV27kzityFYPdl0Ifye8.png"
                  alt="Founder portrait"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "50% 30%" }}
                  sizes="(min-width: 768px) 400px, 80vw"
                  priority
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardContent className="p-6 md:p-8 text-white/90">
            <h2 className="text-2xl md:text-3xl font-semibold">Bhargava Bharath</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-sm">Founder</Badge>
              <Badge variant="secondary" className="text-sm">AI Programmer</Badge>
              <Badge variant="secondary" className="text-sm">Psychologist</Badge>
              <Badge variant="secondary" className="text-sm">Age 17</Badge>
            </div>

            <p className="mt-5">
              Bhargava focuses on Emotional AI that understands feelings like sadness and anger and responds with care.
              The vision behind ARISE is simple: help products feel more human while being private, ethical, and safe.
            </p>

            <h3 className="mt-6 text-xl font-semibold">Focus</h3>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>On-device emotional understanding for privacy and speed</li>
              <li>Human-centered, transparent UX</li>
              <li>Safety-by-design across models and interfaces</li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold">Message</h3>
            <p className="mt-3">
              ARISE is built to be 100% safe by design—clear consent, respectful data practices, and inclusive representations of emotion.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
