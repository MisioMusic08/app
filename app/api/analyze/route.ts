import { NextResponse } from "next/server"
import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"

type Payload = {
  text: string
  voice?: {
    rms: number // 0..1
    pitch: number | null
    speaking: boolean
    features?: Record<string, number>
  }
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.XAI_API_KEY
    const body = (await req.json()) as Payload

    if (!apiKey) {
      // No provider key — return fallback signal
      return NextResponse.json({
        ok: false,
        providerAvailable: false,
        message: "XAI_API_KEY not set",
      })
    }

    // Compose a compact analysis request
    const system = [
      "You are an emotion analysis engine for a consumer product. Output ONLY a single JSON object with fields:",
      "{",
      '  "label": one of ["Joy","Content","Neutral","Sadness","Anger","Surprise"],',
      '  "valence": number between 0 and 1 (0=negative, 1=positive),',
      '  "arousal": number between 0 and 1 (0=calm, 1=excited),',
      '  "confidence": number between 0 and 1,',
      '  "rationale": short phrase',
      "}",
      "Do not include markdown or explanations. Keep JSON minimal.",
    ].join(" ")

    const user = {
      text: body.text?.slice(0, 2000) ?? "",
      voice: {
        rms: clamp(body.voice?.rms ?? 0, 0, 1),
        pitch: body.voice?.pitch ?? null,
        speaking: !!body.voice?.speaking,
      },
    }

    const { text } = await generateText({
      model: xai("grok-3"),
      system,
      prompt: JSON.stringify(user),
    })

    const json = tryParseJson(text)
    if (!json) {
      return NextResponse.json(
        {
          ok: false,
          providerAvailable: true,
          message: "Model response was not valid JSON",
          raw: text,
        },
        { status: 200 }
      )
    }

    return NextResponse.json({
      ok: true,
      providerAvailable: true,
      result: {
        label: json.label,
        valence: clamp(json.valence, 0, 1),
        arousal: clamp(json.arousal, 0, 1),
        confidence: clamp(json.confidence, 0, 1),
        rationale: String(json.rationale || ""),
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    )
  }
}

function tryParseJson(s: string | null | undefined) {
  if (!s) return null
  const match = s.match(/\{[\s\S]*\}$/) // try last JSON-like object
  try {
    return JSON.parse(match ? match[0] : s)
  } catch {
    return null
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}
