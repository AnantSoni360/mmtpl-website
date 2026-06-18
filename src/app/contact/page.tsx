'use client'

import { TagPill } from '@/components/ui/TagPill'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { Button } from '@/components/ui/Button'
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from 'lucide-react'

export default function Contact() {
  const offices = [
    {
      title: 'Head Office',
      address: '6th Floor, Akruti Trade Center, MIDC Marol, Andheri East, Mumbai Suburban, Maharashtra. (400093)',
      icon: <MapPin className="w-6 h-6 text-[var(--color-lilac-bloom)]" />,
    },
    {
      title: 'Branch Office',
      address: 'Room No- 313, 3rd Floor, Gokul Square, Bellary-Sandur Road, Toranagallu, Bellary-Dist, Karnataka. 583123',
      icon: <MapPin className="w-6 h-6 text-[var(--color-sky-veil)]" />,
    }
  ]

  const contacts = [
    {
      title: 'Call Us',
      detail: '+91 (022) 2850 0000', // Placeholder
      desc: 'Mon-Sat from 9am to 6pm.',
      icon: <Phone className="w-6 h-6 text-[var(--color-obsidian)]" />,
    },
    {
      title: 'Email Us',
      detail: 'info@mnm.ltd', // Official Email
      desc: 'Our friendly team is here to help.',
      icon: <Mail className="w-6 h-6 text-[var(--color-obsidian)]" />,
    }
  ]

  return (
    <div className="flex flex-col gap-[var(--section-gap)] pb-[var(--section-gap)] pt-12">
      
      {/* ── HERO ── */}
      <section className="container mx-auto px-6 max-w-[800px] text-center">
        <FadeUp delay={0.1}>
          <TagPill variant="bone" className="mb-8">Contact Us</TagPill>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className="display-lg text-[var(--color-obsidian)] mb-8">
            Let's build the future, together.
          </h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="body-text text-[var(--color-graphite)] text-lg">
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
                <h2 className="heading-sm text-[var(--color-obsidian)] mb-8">Our Locations</h2>
                <div className="flex flex-col gap-8">
                  {offices.map((office, idx) => (
                    <div key={idx} className="flex gap-4 p-6 rounded-[var(--radius-card)] bg-[var(--color-bone)] border border-[var(--color-silver)] hover:border-[var(--color-slate)] transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        {office.icon}
                      </div>
                      <div>
                        <h3 className="font-switzer font-medium text-lg text-[var(--color-obsidian)] mb-2">{office.title}</h3>
                        <p className="body-text text-[var(--color-graphite)] leading-relaxed">
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
                    <div className="w-12 h-12 rounded-full bg-[var(--color-bone)] flex items-center justify-center mb-2">
                      {contact.icon}
                    </div>
                    <h3 className="font-switzer font-medium text-lg text-[var(--color-obsidian)]">{contact.title}</h3>
                    <p className="font-switzer font-bold text-[var(--color-obsidian)]">{contact.detail}</p>
                    <p className="text-sm text-[var(--color-slate)]">{contact.desc}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

          </div>

          {/* ── RIGHT: CONTACT FORM ── */}
          <div className="w-full lg:w-7/12">
            <FadeUp delay={0.4}>
              <div className="bg-[var(--color-paper)] p-8 md:p-12 rounded-[var(--radius-card-lg)] border border-[var(--color-silver)] shadow-[var(--shadow-card)]">
                <h2 className="heading-sm text-[var(--color-obsidian)] mb-8">Send us a message</h2>
                
                <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-[var(--color-obsidian)]">First name</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        className="w-full px-4 py-3 rounded-[var(--radius-control)] border border-[var(--color-silver)] bg-[var(--color-bone)] focus:bg-[var(--color-paper)] focus:outline-none focus:ring-2 focus:ring-[var(--color-obsidian)] transition-all text-[var(--color-obsidian)] placeholder:text-[var(--color-slate)]"
                        placeholder="First name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-[var(--color-obsidian)]">Last name</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        className="w-full px-4 py-3 rounded-[var(--radius-control)] border border-[var(--color-silver)] bg-[var(--color-bone)] focus:bg-[var(--color-paper)] focus:outline-none focus:ring-2 focus:ring-[var(--color-obsidian)] transition-all text-[var(--color-obsidian)] placeholder:text-[var(--color-slate)]"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-[var(--color-obsidian)]">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-[var(--radius-control)] border border-[var(--color-silver)] bg-[var(--color-bone)] focus:bg-[var(--color-paper)] focus:outline-none focus:ring-2 focus:ring-[var(--color-obsidian)] transition-all text-[var(--color-obsidian)] placeholder:text-[var(--color-slate)]"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-medium text-[var(--color-obsidian)]">Phone number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full px-4 py-3 rounded-[var(--radius-control)] border border-[var(--color-silver)] bg-[var(--color-bone)] focus:bg-[var(--color-paper)] focus:outline-none focus:ring-2 focus:ring-[var(--color-obsidian)] transition-all text-[var(--color-obsidian)] placeholder:text-[var(--color-slate)]"
                      placeholder="+91 (000) 000-0000"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-[var(--color-obsidian)]">Message</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      className="w-full px-4 py-3 rounded-[var(--radius-control)] border border-[var(--color-silver)] bg-[var(--color-bone)] focus:bg-[var(--color-paper)] focus:outline-none focus:ring-2 focus:ring-[var(--color-obsidian)] transition-all resize-none text-[var(--color-obsidian)] placeholder:text-[var(--color-slate)]"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" variant="dark" size="lg" className="w-full flex justify-center items-center gap-2">
                      Send Message
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </FadeUp>
          </div>
          
        </div>
      </section>

      {/* ── MAP / BRANDING STRIP ── */}
      <section className="w-full mt-12 bg-[var(--color-obsidian)]">
        <div className="container mx-auto px-6 py-20 max-w-[var(--page-max-width)] flex flex-col md:flex-row items-center justify-between gap-8">
          <FadeUp>
            <h2 className="display text-white max-w-[500px]">Global Standards.<br/>Local Expertise.</h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="body-text text-gray-400 max-w-[400px]">
              MMTPL continues to scale new heights in industrial construction, blending cutting-edge engineering with an uncompromising commitment to safety and quality.
            </p>
          </FadeUp>
        </div>
      </section>

    </div>
  )
}
