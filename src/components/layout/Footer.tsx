import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#0a1128] pt-24 pb-10 mt-auto overflow-hidden border-t border-blue-900/30">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      <div className="container mx-auto px-6 max-w-[var(--page-max-width)] relative z-10">
        
        {/* Top Newsletter / CTA section inside footer */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-16 mb-16 border-b border-white/10">
          <div className="max-w-xl">
            <h3 className="font-editorial text-3xl text-white mb-3">Stay connected with MMTPL</h3>
            <p className="text-blue-100/60 font-switzer text-sm leading-relaxed">
              Subscribe to our newsletter for the latest updates on our industrial projects, technological advancements, and company news.
            </p>
          </div>
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-white/5 border border-white/10 text-white placeholder:text-white/40 px-6 py-3.5 rounded-full focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all w-full sm:w-[300px] font-switzer text-sm"
            />
            <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-3.5 rounded-full font-semibold font-switzer text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2 group whitespace-nowrap w-full sm:w-auto">
              Subscribe <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 inline-flex">
              <div className="bg-white p-1.5 rounded-full shadow-lg">
                <Image 
                  src="/logo.png" 
                  alt="MMTPL Logo" 
                  width={48} 
                  height={48} 
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-white tracking-wide">
                MMTPL
              </h3>
            </Link>
            <p className="font-switzer text-sm text-blue-100/60 leading-relaxed mb-8 max-w-sm">
              Man Machine Technocrats Pvt. Ltd. Building the future with precision, safety, and excellence. Leading turnkey contracting organization delivering comprehensive solutions across core sectors.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#3b82f6] hover:text-white hover:-translate-y-1 transition-all border border-white/10 shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#3b82f6] hover:text-white hover:-translate-y-1 transition-all border border-white/10 shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#3b82f6] hover:text-white hover:-translate-y-1 transition-all border border-white/10 shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-switzer font-semibold text-white mb-6 tracking-wider text-xs uppercase opacity-90">
              Company
            </h4>
            <ul className="flex flex-col gap-4 font-switzer text-sm text-blue-100/60">
              <li><Link href="/about" className="hover:text-[#3b82f6] hover:translate-x-1 inline-block transition-all">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-[#3b82f6] hover:translate-x-1 inline-block transition-all">Our Projects</Link></li>
              <li><Link href="/safety" className="hover:text-[#3b82f6] hover:translate-x-1 inline-block transition-all">Safety & Quality</Link></li>
              <li><Link href="/careers" className="hover:text-[#3b82f6] hover:translate-x-1 inline-block transition-all">Careers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-switzer font-semibold text-white mb-6 tracking-wider text-xs uppercase opacity-90">
              Services
            </h4>
            <ul className="flex flex-col gap-4 font-switzer text-sm text-blue-100/60">
              <li><Link href="/services" className="hover:text-[#3b82f6] hover:translate-x-1 inline-block transition-all">Mechanical Fabrication</Link></li>
              <li><Link href="/services" className="hover:text-[#3b82f6] hover:translate-x-1 inline-block transition-all">Civil Infrastructure</Link></li>
              <li><Link href="/services" className="hover:text-[#3b82f6] hover:translate-x-1 inline-block transition-all">Electrical & Instrumentation</Link></li>
              <li><Link href="/services" className="hover:text-[#3b82f6] hover:translate-x-1 inline-block transition-all">EPC Turnkey</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-switzer font-semibold text-white mb-6 tracking-wider text-xs uppercase opacity-90">
              Contact
            </h4>
            <ul className="flex flex-col gap-5 font-switzer text-sm text-blue-100/60">
              <li className="flex items-start gap-3 group cursor-pointer">
                <Mail size={18} className="text-[#3b82f6] mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">info@mnm.ltd</span>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <Phone size={18} className="text-[#3b82f6] mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">+91 (022) 2850 0000</span>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <MapPin size={18} className="text-[#3b82f6] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed group-hover:text-white transition-colors">
                  6th Floor, Akruti Trade Center,<br />
                  MIDC Marol, Andheri East,<br />
                  Mumbai Suburban, MH 400093
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 font-switzer text-xs text-blue-100/40">
          <p>© {currentYear} Man Machine Technocrats Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
