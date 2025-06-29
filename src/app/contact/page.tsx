// app/contact/page.tsx
'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-24 px-4 pt-32 bg-white">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-0 md:p-0 flex flex-col md:flex-row overflow-hidden">
        {/* Imagen decorativa */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-0">
          <img
            src="/placeholder/cafe.jpg"
            alt="Contact illustration"
            className="object-cover w-full h-full min-h-[28rem] max-h-[40rem] m-0 rounded-none shadow-none"
            style={{ aspectRatio: '3/4' }}
          />
        </div>
        {/* Formulario */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-8 text-center tracking-tight">Contact Us</h1>
          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-gray-700">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="input"
              />
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-primary w-full disabled:opacity-60"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {status === 'success' && <p className="text-green-600 mt-6 text-center font-semibold">Thank you! Your message has been sent.</p>}
          {status === 'error' && <p className="text-red-600 mt-6 text-center font-semibold">Something went wrong. Please try again.</p>}
        </div>
      </div>
    </div>
  )
}
