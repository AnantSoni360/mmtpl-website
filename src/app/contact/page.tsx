'use client'

import { useState } from 'react'
import { TagPill } from '@/components/ui/TagPill'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { MapPin, Phone, Mail, Send } from 'lucide-react'

export default function Contact() {
  const offices = [
    {
      title: 'Head Office',
      address: '6th Floor, Akruti Trade Center, MIDC Marol, Andheri East, Mumbai Suburban, Maharashtra. (400093)',
      icon: <MapPin className="w-6 h-6 text-lilac-bloom dark:text-purple-300" />,
    },
    {
      title: 'Branch Office',
      address: 'Room No- 313, 3rd Floor, Gokul Square, Bellary-Sandur Road, Toranagallu, Bellary-Dist, Karnataka. 583123',
      icon: <MapPin className="w-6 h-6 text-sky-veil dark:text-sky-300" />,
    }
  ]

  const contacts = [
    {
      title: 'Call Us',
      detail: '+91 9008038052',
      desc: 'Mon-Sat from 9am to 6pm.',
      icon: <Phone className="w-6 h-6 text-obsidian dark:text-white" />,
    },
    {
      title: 'Email Us',
      detail: 'info@mnm.ltd', // Official Email
      desc: 'Our friendly team is here to help.',
      icon: <Mail className="w-6 h-6 text-obsidian dark:text-white" />,
    },
    {
      title: 'WhatsApp',
      detail: '+91 9008038052',
      desc: 'Message us for quick queries.',
      icon: <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>,
    }
  ]

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Submission failed')
      setFormStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      setFormStatus('error')
    }
  }

  return (
    <div className="flex flex-col gap-[var(--section-gap)] pb-[var(--section-gap)] pt-12">
      
      {/* ── HERO ── */}
      <section className="container mx-auto px-6 max-w-[800px] text-center">
        <FadeUp delay={0.1}>
          <TagPill variant="bone" className="mb-8">Contact Us</TagPill>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className="display-lg text-obsidian dark:text-white mb-8">
            Let's build the future, together.
          </h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="body-text text-graphite dark:text-gray-300 text-lg">
            Whether you have a question about our services, want to discuss a new industrial project, or are looking to partner with us, our team is ready to answer all your questions.
          </p>
        </FadeUp>
      </section>

      <section className="container mx-auto px-6 max-w-[var(--page-max-width)]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* ── LEFT: CONTACT INFO ── */}
          <div className="w-full lg:w-5/12 flex flex-col gap-12">
            
            <FadeUp delay={0.2}>
              <div>
                <h2 className="heading-sm text-obsidian dark:text-white mb-8">Our Locations</h2>
                <div className="flex flex-col gap-8">
                  {offices.map((office, idx) => (
                    <div key={idx} className="flex gap-4 p-6 rounded-[var(--radius-card)] bg-bone dark:bg-[#162033] border border-silver dark:border-white/20 hover:border-slate dark:hover:border-gray-500 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        {office.icon}
                      </div>
                      <div>
                        <h3 className="font-switzer font-medium text-lg text-obsidian dark:text-white mb-2">{office.title}</h3>
                        <p className="body-text text-graphite dark:text-gray-300 leading-relaxed">
                          {office.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {contacts.map((contact, idx) => (
                  <div key={idx} className="flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-full bg-bone dark:bg-[#162033] flex items-center justify-center mb-2">
                      {contact.icon}
                    </div>
                    <h3 className="font-switzer font-medium text-lg text-obsidian dark:text-white">{contact.title}</h3>
                    <p className="font-switzer font-bold text-obsidian dark:text-white">{contact.detail}</p>
                    <p className="text-sm text-slate dark:text-gray-400">{contact.desc}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

          </div>

          {/* ── RIGHT: CONTACT FORM ── */}
          <div className="w-full lg:w-7/12">
            <FadeUp delay={0.4}>
              <div className="bg-white dark:bg-[#1A1A1A] p-8 md:p-12 rounded-[var(--radius-card-lg)] border border-silver dark:border-white/20 shadow-sm">
                <h2 className="heading-sm text-obsidian dark:text-white mb-8">Send us a message</h2>
                
                {formStatus === 'success' ? (
                  <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 rounded-2xl font-switzer text-center">
                    <h3 className="font-bold text-2xl mb-3">Message Sent!</h3>
                    <p className="mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
                    <Button variant="outline" className="border-emerald-500/50 hover:bg-emerald-500 hover:text-white" onClick={() => setFormStatus('idle')}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-obsidian dark:text-white">First name</label>
                        <input 
                          type="text" 
                          id="firstName" 
                          name="firstName"
                          required
                          className="w-full px-4 py-3 rounded-[var(--radius-control)] border border-silver dark:border-white/20 bg-bone dark:bg-[#162033] focus:bg-white dark:bg-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-obsidian dark:ring-white/50 transition-all text-obsidian dark:text-white placeholder:text-slate dark:text-gray-400"
                          placeholder="First name"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-obsidian dark:text-white">Last name</label>
                        <input 
                          type="text" 
                          id="lastName" 
                          name="lastName"
                          required
                          className="w-full px-4 py-3 rounded-[var(--radius-control)] border border-silver dark:border-white/20 bg-bone dark:bg-[#162033] focus:bg-white dark:bg-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-obsidian dark:ring-white/50 transition-all text-obsidian dark:text-white placeholder:text-slate dark:text-gray-400"
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium text-obsidian dark:text-white">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-[var(--radius-control)] border border-silver dark:border-white/20 bg-bone dark:bg-[#162033] focus:bg-white dark:bg-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-obsidian dark:ring-white/50 transition-all text-obsidian dark:text-white placeholder:text-slate dark:text-gray-400"
                        placeholder="you@company.com"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-sm font-medium text-obsidian dark:text-white">Phone number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        required
                        className="w-full px-4 py-3 rounded-[var(--radius-control)] border border-silver dark:border-white/20 bg-bone dark:bg-[#162033] focus:bg-white dark:bg-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-obsidian dark:ring-white/50 transition-all text-obsidian dark:text-white placeholder:text-slate dark:text-gray-400"
                        placeholder="+91 9008038052"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="serviceType" className="text-sm font-medium text-obsidian dark:text-white">Service Type</label>
                      <Select
                        id="serviceType"
                        name="serviceType"
                        required
                        placeholder="Select a service type..."
                        className="bg-bone dark:bg-[#162033] text-obsidian dark:text-white border-silver dark:border-white/20"
                        options={[
                          { value: 'refractory', label: 'Refractory Installation' },
                          { value: 'structural', label: 'Structural Fabrication' },
                          { value: 'equipment', label: 'Equipment Installation' },
                          { value: 'civil', label: 'Civil Structures' },
                          { value: 'operations', label: 'Plant Operations & Maintenance' },
                          { value: 'other', label: 'Other Inquiry' },
                        ]}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-sm font-medium text-obsidian dark:text-white">Message</label>
                      <textarea 
                        id="message" 
                        name="message"
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-[var(--radius-control)] border border-silver dark:border-white/20 bg-bone dark:bg-[#162033] focus:bg-white dark:bg-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-obsidian dark:ring-white/50 transition-all resize-none text-obsidian dark:text-white placeholder:text-slate dark:text-gray-400"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>

                    {formStatus === 'error' && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg text-sm text-center">
                        Failed to send message. Please try again later.
                      </div>
                    )}

                    <div className="pt-4">
                      <Button type="submit" variant="dark" size="lg" disabled={formStatus === 'submitting'} className="w-full flex justify-center items-center gap-2">
                        {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </FadeUp>
          </div>
          
        </div>
      </section>

      {/* ── GOOGLE MAPS EMBED ── */}
      <section className="w-full mt-12 bg-bg-main dark:bg-[#0a1128] border-t border-silver/30 dark:border-white/10">
        <div className="w-full h-[500px] relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8354670220265!2d72.87955561537707!3d19.114881657095493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c80ee9155555%3A0xc31604ddfba6c7aa!2sAkruti%20Trade%20Center!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            className="absolute top-0 left-0 w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
            allowFullScreen={true}
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

    </div>
  )
}
