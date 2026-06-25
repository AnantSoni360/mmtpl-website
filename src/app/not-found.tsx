import Link from 'next/link';
import { Construction } from 'lucide-react';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f8f9fa] dark:bg-[#050B1A] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      <div className="relative z-10 text-center px-6">
        <div className="bg-white/80 dark:bg-[#081122]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-10 md:p-14 shadow-xl max-w-lg mx-auto transform animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Construction size={40} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-clash font-bold text-gray-900 dark:text-white mb-4">
            Coming Soon!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 font-switzer mb-8 text-lg">
            This page or feature is currently under construction and will be available in a future update. Stay tuned!
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
