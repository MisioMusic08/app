"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from 'lucide-react'
import { sendMessage } from "./submit-action"

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, null)

  return (
    <form action={formAction} className="grid gap-4 max-w-2xl">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="name" className="text-sm text-white/80">Name</label>
          <Input id="name" name="name" required className="bg-white/90 text-gray-900" placeholder="Your name" />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="email" className="text-sm text-white/80">Email</label>
          <Input id="email" name="email" type="email" required className="bg-white/90 text-gray-900" placeholder="you@company.com" />
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="company" className="text-sm text-white/80">Company</label>
        <Input id="company" name="company" className="bg-white/90 text-gray-900" placeholder="Company (optional)" />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="message" className="text-sm text-white/80">Message</label>
        <Textarea id="message" name="message" required rows={6} className="bg-white/90 text-gray-900" placeholder="How can we help?" />
      </div>

      <Button disabled={pending} className="bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500">
        {pending ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>) : "Send message"}
      </Button>

      {state && (
        <div className="rounded-lg border border-white/20 bg-white/10 p-3 text-sm text-white/90">
          {state.message}
        </div>
      )}
    </form>
  )
}
