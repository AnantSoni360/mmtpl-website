'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function AdPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Small delay so it pops up nicely after initial page load
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const closePopup = () => {
    setIsOpen(false)
  }

  // Prevent scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />
          
          {/* Modal content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative bg-[#020917] border border-blue-500/20 rounded-2xl shadow-[0_0_80px_rgba(59,130,246,0.15)] overflow-hidden max-w-5xl w-full pointer-events-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          >
            {/* Close button */}
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/40 hover:bg-red-500 hover:text-white text-gray-200 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>
            
            {/* Image container */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-black">
              <Image 
                src="/images/hiring-oman.jpg" 
                alt="Urgent Hiring - Oman Free Recruitment" 
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Bottom Call to Action Bar */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-blue-500/30">
              <div className="text-white">
                <h3 className="font-semibold text-lg sm:text-xl">Oman Free Recruitment</h3>
                <p className="text-blue-200 text-sm">Send your resume to apply for these positions.</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <a 
                  href="mailto:info@cgt.com"
                  className="flex-1 sm:flex-none text-center bg-white text-blue-900 hover:bg-gray-100 font-semibold py-2.5 px-6 rounded-full transition-colors whitespace-nowrap"
                >
                  Email Resume
                </a>
                <a 
                  href="https://wa.me/919008038052"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-6 rounded-full transition-colors whitespace-nowrap"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
