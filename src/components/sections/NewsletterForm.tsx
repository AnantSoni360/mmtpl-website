'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Newsletter',
          lastName: 'Subscriber',
          email,
          phone: 'N/A',
          serviceType: 'newsletter',
          message: `Newsletter subscription request from: ${email}`,
        }),
      })
      if (!res.ok) throw new Error('Subscription failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
      {status === 'success' ? (
        <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-6 py-3.5 rounded-full font-switzer text-sm w-full sm:w-[340px] text-center flex items-center justify-center gap-2">
          <CheckCircle size={16} />
          Thank you for subscribing!
        </div>
      ) : (
        <>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address" 
            className="bg-white/5 border border-white/10 text-white placeholder:text-white/40 px-6 py-3.5 rounded-full focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all w-full sm:w-[300px] font-switzer text-sm"
          />
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-70 disabled:hover:bg-[#3b82f6] text-white px-8 py-3.5 rounded-full font-semibold font-switzer text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2 group whitespace-nowrap w-full sm:w-auto"
            >
              {status === 'loading' ? 'Subscribing...' : (
                <>Subscribe <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-xs text-center font-switzer">Failed. Please try again.</p>
            )}
          </div>
        </>
      )}
    </form>
  )
}
