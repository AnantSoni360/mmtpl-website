'use client'

import { useState } from 'react'
import { TagPill } from '@/components/ui/TagPill'
import { FadeUp } from '@/components/motion/FadeUp'
import { Building2, Settings2, Globe, MapPin, Handshake, Cpu } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type Client = {
  name: string
  logo: string
  description?: string
}

export default function Clients() {
  const [hoveredClient, setHoveredClient] = useState<Client | null>(null)

  const steelClients: Client[] = [
    { name: 'JSW Steel Limited', logo: '/clients-logo/JSW Steel.png', description: 'JSW Steel is one of India\'s leading multinational steel producers, flagship company of the JSW Group, with a massive capacity of 28.2 MTPA.' },
    { name: 'Jindal Steel & Power', logo: '/clients-logo/Jindal Steel & Power (JSPL).jpg', description: 'An industrial powerhouse with a dominant presence in steel, power, mining, and infrastructure sectors globally.' },
    { name: 'Jindal Stainless', logo: '/clients-logo/Jindal Stainless Limited (JSL).webp', description: 'India\'s largest stainless steel manufacturer, providing advanced corrosion-resistant materials for critical industrial applications.' },
    { name: 'Tata Steel', logo: '/clients-logo/Tata Steel.jpg', description: 'A top global steel company with an annual crude steel capacity of 34 million tonnes, known for its innovation and sustainability.' },
    { name: 'Essar', logo: '/clients-logo/Essar.png', description: 'A multinational conglomerate operating across steel, energy, infrastructure, and services, driving large-scale industrial projects.' },
    { name: 'SAIL', logo: '/clients-logo/Sail.jpg', description: 'Steel Authority of India Limited is a central public sector enterprise and one of the largest steel-making companies in India.' },
    { name: 'NMDC Limited', logo: '/clients-logo/NMDC.png', description: 'National Mineral Development Corporation is India\'s largest iron ore producer, operating highly mechanized iron ore mines.' },
    { name: 'Gerdau Steel', logo: '/clients-logo/Gerdau.png', description: 'The largest producer of long steel in the Americas, operating a major special steel plant in India for the automotive industry.' },
    { name: 'Lloyds Metals', logo: '/clients-logo/LLOYDS METALS.png', description: 'Lloyds Metals and Energy Limited is a leading producer of sponge iron and power, and operates significant iron ore mines.' },
    { name: 'Minera Steel', logo: '/clients-logo/minera.png', description: 'Minera Steel & Power produces high-quality sponge iron, MS billets, and structural steel products in Karnataka.' },
  ]

  const cementClients: Client[] = [
    { name: 'Bharathi Cement', logo: '/clients-logo/Bharathi Cement.jpg', description: 'A premium cement brand in South India, operating a massive 7.75 MTPA manufacturing facility in Andhra Pradesh.' },
    { name: 'Zuari Cement', logo: '/clients-logo/Zuari Cement.png', description: 'Part of the HeidelbergCement Group, Zuari Cement is a leading cement manufacturer in South India with a capacity of 7.1 MTPA.' },
    { name: 'Aditya Birla Group', logo: '/clients-logo/Aditya Birla Group.png', description: 'A global conglomerate and the parent company of UltraTech Cement, the largest manufacturer of grey cement and ready mix concrete in India.' },
    { name: 'Orient Cement', logo: '/clients-logo/orient cement ck birla group.png', description: 'Part of the CK Birla Group, Orient Cement is known for producing premium grade cement for critical infrastructure projects.' },
    { name: 'Deccan Cements', logo: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=300&auto=format&fit=crop', description: 'A pioneer in the Indian cement industry, Deccan Cements operates a specialized plant in Telangana producing high-strength cement.' },
    { name: 'Parasakthi Cements', logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=300&auto=format&fit=crop', description: 'A high-quality cement producer based in Andhra Pradesh, serving the growing infrastructure needs of Southern India.' },
  ]

  const epcPartners = [
    'Larsen & Toubro (L&T)', 'Nagarjuna Construction Company (NCC)', 
    'AP Bawa Group', 'Shriram EPC', 'RHI Magnesita India'
  ]

  const techPartners = [
    'RHI Magnesita', 'SMS Group', 'VAI', 'FLSmidth', 'Morgan Engineering', 
    'CFMCC', 'Sino Steel', 'Cimprogetti', 'Danieli', 'Tenova'
  ]

  const intlClients = [
    {
      country: 'Oman',
      clients: ['Jindal Shadeed Iron & Steel', 'Carmeuse Majan', 'Associated Group', 'Oman Cement', 'Orion Construction']
    },
    {
      country: 'UAE',
      clients: ['Vandana Global', 'Uma Lime Industries', 'Tiger Steel', 'Super Cement', 'Union Chlorine', 'International Quality Steels']
    },
    {
      country: 'Saudi Arabia',
      clients: ['SABIC (Saudi Basic Industries)', 'Saudi Calcined Petroleum Coke Company'],
      note: 'Awarded a prestigious 5-Year General Service Contract (USD 15 Million) with SABIC.'
    }
  ]

  // Helper function to render a marquee
  const renderMarquee = (clients: typeof steelClients, direction: 'normal' | 'reverse' = 'normal') => {
    // Duplicate the array to create a seamless loop
    const displayClients = [...clients, ...clients, ...clients]
    return (
      <div className="marquee-container py-8 mask-edges">
        <div className="marquee-content animate-[marquee_40s_linear_infinite] gap-6" style={{ animationDirection: direction }}>
          {displayClients.map((client, idx) => (
            <div 
              key={idx} 
              className="client-logo-card flex-shrink-0 w-[240px] h-[160px] bg-white rounded-[var(--radius-card)] border border-[var(--color-silver)] flex flex-col items-center justify-center p-4 relative overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredClient(client)}
              onMouseLeave={() => setHoveredClient(null)}
            >
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
              <div className="relative w-full h-1/2 mb-4 z-10">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <span className="font-switzer font-medium text-sm text-center text-[var(--color-graphite)] z-10">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Typewriter animation variants (optimized for words instead of letters to fix lag)
  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4, // Start typing after card expands
        staggerChildren: 0.05, // Slower stagger for words
      },
    },
  }
  
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className="flex flex-col gap-[var(--section-gap)] pb-[var(--section-gap)] pt-12 overflow-hidden relative">
      
      {/* ── MASSIVE HOVER OVERLAY ── */}
      <AnimatePresence>
        {hoveredClient && (
          <motion.div 
            key="overlay-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            
            {/* Massive Card */}
            <motion.div 
              key={hoveredClient.name} // Forces animation to restart if switching directly between cards
              initial={{ scale: 0.85, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 bg-[var(--color-paper)] p-12 rounded-[var(--radius-card-lg)] w-[90vw] max-w-[1000px] shadow-2xl flex flex-col items-center text-center"
            >
              <div className="relative w-full h-[250px] mb-8">
                <Image 
                  src={hoveredClient.logo} 
                  fill 
                  className="object-contain drop-shadow-lg" 
                  alt={hoveredClient.name} 
                />
              </div>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="display text-[var(--color-obsidian)] mb-6 text-5xl"
              >
                {hoveredClient.name}
              </motion.h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-24 h-1 bg-[var(--color-lilac-bloom)] mb-6 mx-auto rounded-full origin-center" 
              />
              <motion.p 
                variants={sentenceVariants}
                initial="hidden"
                animate="visible"
                className="body-text text-2xl text-[var(--color-graphite)] leading-relaxed max-w-[800px] min-h-[100px]"
              >
                {hoveredClient.description?.split(' ').map((word, index) => (
                  <motion.span key={`${word}-${index}`} variants={wordVariants} className="inline-block mr-2">
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="container mx-auto px-6 max-w-[800px] text-center">
        <FadeUp delay={0.1}>
          <TagPill variant="bone" className="mb-8">Our Network</TagPill>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className="display-lg text-[var(--color-obsidian)] mb-8">
            Trusted By Industry Leaders
          </h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="body-text text-[var(--color-graphite)] text-lg">
            Over the past two decades, MMTPL has successfully partnered with some of the most respected organizations across the steel, cement, engineering, and industrial sectors.
          </p>
        </FadeUp>
      </section>

      {/* ── INTERACTIVE MARQUEES ── */}
      <section className="w-full relative z-10">
        <div className="container mx-auto px-6 mb-4">
          <div className="flex items-center gap-3">
            <Settings2 className="w-6 h-6 text-[var(--color-obsidian)]" />
            <h2 className="heading-sm text-[var(--color-obsidian)]">Steel Sector Partners</h2>
          </div>
        </div>
        
        {/* Steel Marquee */}
        <div className="w-full bg-[var(--color-bone)] border-y border-[var(--color-silver)] shadow-inner">
          {renderMarquee(steelClients, 'normal')}
        </div>

        <div className="container mx-auto px-6 mb-4 mt-20">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-[var(--color-obsidian)]" />
            <h2 className="heading-sm text-[var(--color-obsidian)]">Cement Sector Partners</h2>
          </div>
        </div>

        {/* Cement Marquee */}
        <div className="w-full bg-[var(--color-bone)] border-y border-[var(--color-silver)] shadow-inner">
           {renderMarquee(cementClients, 'reverse')}
        </div>
      </section>

      {/* ── INTERNATIONAL PRESENCE ── */}
      <section className="bg-bg-main border-y border-silver/30 dark:border-white/10 dark:bg-[#0a1128] py-[var(--section-gap)]">
        <div className="container mx-auto px-6 max-w-[var(--page-max-width)]">
          <FadeUp>
            <div className="flex items-center gap-3 mb-12 justify-center">
              <Globe className="w-8 h-8 text-obsidian dark:text-white" />
              <h2 className="display text-obsidian dark:text-white">International Presence</h2>
            </div>
            <p className="body-text text-graphite dark:text-gray-300 text-center max-w-[800px] mx-auto mb-16 text-lg">
              MMTPL has successfully expanded its operations beyond India and delivered major projects across the Middle East.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {intlClients.map((region, idx) => (
              <FadeUp delay={0.1 * (idx + 1)} key={idx}>
                <div className="bg-bone dark:bg-[#162033] p-8 rounded-[var(--radius-card)] border border-silver dark:border-white/10 h-full hover:border-obsidian dark:hover:border-gray-600 transition-colors shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-5 h-5 text-lilac-bloom" />
                    <h3 className="heading-sm text-obsidian dark:text-white">{region.country}</h3>
                  </div>
                  <ul className="flex flex-col gap-3 mb-6">
                    {region.clients.map((client, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-silver dark:text-gray-500 mt-1">•</span>
                        <span className="body-text text-graphite dark:text-gray-300">{client}</span>
                      </li>
                    ))}
                  </ul>
                  {region.note && (
                    <div className="mt-auto pt-4 border-t border-gray-800">
                      <p className="text-xs text-[var(--color-lilac-bloom)] leading-relaxed italic">
                        {region.note}
                      </p>
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIPS ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeUp delay={0.1}>
            <div className="bg-bone dark:bg-[#162033] p-10 rounded-[var(--radius-card)] border border-silver dark:border-white/10 h-full shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Handshake className="w-6 h-6 text-obsidian dark:text-white" />
                <h2 className="heading-sm text-obsidian dark:text-white">Engineering & EPC Partners</h2>
              </div>
              <p className="body-text text-graphite dark:text-gray-300 mb-6 text-sm">
                As a trusted execution partner, subcontractor, and joint venture associate, MMTPL has collaborated with leading engineering and EPC organizations:
              </p>
              <div className="flex flex-wrap gap-3">
                {epcPartners.map((partner, i) => (
                  <div key={i} className="bg-white dark:bg-obsidian px-4 py-2 rounded-md border border-silver dark:border-white/20 text-sm font-switzer font-medium text-obsidian dark:text-paper shadow-sm">
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="bg-bone dark:bg-[#162033] p-10 rounded-[var(--radius-card)] border border-silver dark:border-white/10 h-full shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="w-6 h-6 text-obsidian dark:text-white" />
                <h2 className="heading-sm text-obsidian dark:text-white">Global Technology Partners</h2>
              </div>
              <p className="body-text text-graphite dark:text-gray-300 mb-6 text-sm">
                We have successfully executed projects utilizing technologies supplied by some of the world's most recognized OEMs:
              </p>
              <div className="flex flex-wrap gap-2">
                {techPartners.map((partner, i) => (
                  <div key={i} className="bg-white dark:bg-obsidian px-3 py-1.5 rounded-full border border-silver dark:border-white/20 text-xs font-switzer text-slate dark:text-gray-300 shadow-sm">
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CONCLUSION CTA ── */}
      <section className="container mx-auto px-6 max-w-[800px] text-center pt-8">
        <FadeUp>
          <h2 className="display text-[var(--color-obsidian)] mb-6">Building Long-Term Partnerships</h2>
          <p className="body-text text-[var(--color-graphite)] text-lg leading-relaxed">
            From steel plants and cement facilities to industrial infrastructure and turnkey projects, MMTPL continues to serve leading organizations across India and international markets. Our extensive project experience, skilled workforce, and commitment to excellence have made us a trusted partner for some of the world's most respected industrial companies and technology providers.
          </p>
        </FadeUp>
      </section>

    </div>
  )
}
