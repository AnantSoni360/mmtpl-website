'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { CheckCircle2, ShieldCheck, Activity, Globe } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      toast.success('Registration successful');
      router.push('/jobs'); // Redirect to Job Seeker Portal
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex bg-[#f8f9fa] dark:bg-[#050B1A] transition-colors duration-500">
      {/* Theme Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeSwitcher />
      </div>

      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/industrial-future-bg.png"
          alt="MMTPL Industrial Future"
          fill
          className="object-cover opacity-20 dark:opacity-40 mix-blend-luminosity"
          priority
        />
        {/* Navy/Blue-Purple Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9fa] via-white/90 to-gray-100/80 dark:from-[#050B1A] dark:via-[#081122]/90 dark:to-[#0D1B3D]/80 transition-colors duration-500" />
        {/* Floating Particles */}
        <ParticleBackground />
      </div>

      <div className="relative z-10 flex w-full h-screen">
        {/* Left Side (60%) - Hero Section */}
        <div className="hidden lg:flex w-[60%] flex-col justify-center px-16 xl:px-24">
          <div className="max-w-2xl">
            {/* Glowing Logo */}
            <div className={`mb-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative inline-block animate-pulse" style={{ animationDuration: '3s' }}>
                <Image 
                  src="/logo.png" 
                  alt="MMTPL Logo" 
                  width={200} 
                  height={200} 
                  className="w-auto h-[140px] object-contain drop-shadow-[0_0_15px_rgba(37,99,235,0.4)] dark:drop-shadow-[0_0_25px_rgba(0,229,255,0.8)] transition-all duration-500" 
                />
              </div>
            </div>

            {/* Typography */}
            <div className={`mb-12 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl xl:text-6xl font-bold font-clash text-[#111] dark:text-white mb-6 leading-[1.1] tracking-tight transition-colors duration-500">
                Building Tomorrow's<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#00E5FF]">
                  Industries
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-[#B0B8D0] font-switzer font-medium max-w-lg leading-relaxed transition-colors duration-500">
                Secure access to projects, clients, reports and enterprise solutions. Powered by MMTPL.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Activity, title: 'Real-Time Project Tracking', color: 'text-[#2563EB] dark:text-[#00E5FF]', delay: 'delay-500' },
                { icon: ShieldCheck, title: 'Enterprise Security', color: 'text-[#8B5CF6] dark:text-[#8B5CF6]', delay: 'delay-[600ms]' },
                { icon: Activity, title: 'Smart Analytics Dashboard', color: 'text-[#2563EB] dark:text-[#2563EB]', delay: 'delay-[700ms]' },
                { icon: Globe, title: 'Global Industrial Solutions', color: 'text-[#2563EB] dark:text-[#00E5FF]', delay: 'delay-[800ms]' },
              ].map((feature, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-4 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-4 transition-all duration-700 transform ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} ${feature.delay}`}
                >
                  <div className={`p-2 rounded-lg bg-white/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none ${feature.color}`}>
                    <feature.icon size={20} />
                  </div>
                  <span className="text-[14px] font-switzer font-medium text-gray-700 dark:text-[#B0B8D0] transition-colors duration-500">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side (40%) - Login Card */}
        <div className="w-full lg:w-[40%] flex justify-center items-center px-6 lg:px-12 relative overflow-y-auto">
          <div className={`w-full max-w-[420px] py-12 transition-all duration-1000 delay-500 transform ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            
            {/* Glassmorphism Card */}
            <div className="relative rounded-2xl bg-white/80 dark:bg-[#081122]/40 backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group transition-colors duration-500">
              
              {/* Neon Border Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 dark:from-[#2563EB]/20 via-transparent to-[#00E5FF]/5 dark:to-[#00E5FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 border border-transparent rounded-2xl group-hover:border-[#2563EB]/20 dark:group-hover:border-[#00E5FF]/30 transition-colors duration-500 pointer-events-none" />
              
              <div className="p-8 md:p-10 relative z-10">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-6 lg:hidden">
                    <Image src="/logo.png" alt="MMTPL" width={100} height={100} className="w-auto h-[60px]" />
                  </div>
                  <h2 className="text-2xl font-semibold font-clash text-[#111] dark:text-white mb-2 transition-colors duration-500">Create Account</h2>
                  <p className="text-[14px] text-gray-500 dark:text-[#B0B8D0] font-switzer transition-colors duration-500">Register to access your enterprise portal</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative group/input">
                    <label className="block text-[12px] font-medium text-gray-600 dark:text-[#B0B8D0] font-switzer mb-1.5 uppercase tracking-wider transition-colors duration-500">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-[15px] font-switzer text-[#111] dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:bg-white dark:focus:bg-white/10 focus:border-[#00E5FF]/50 focus:ring-1 focus:ring-[#00E5FF]/50 outline-none transition-all shadow-inner"
                    />
                  </div>

                  <div className="relative group/input">
                    <label className="block text-[12px] font-medium text-gray-600 dark:text-[#B0B8D0] font-switzer mb-1.5 uppercase tracking-wider transition-colors duration-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-[15px] font-switzer text-[#111] dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:bg-white dark:focus:bg-white/10 focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/50 outline-none transition-all shadow-inner"
                    />
                  </div>
                  
                  <div className="relative group/input">
                    <label className="block text-[12px] font-medium text-gray-600 dark:text-[#B0B8D0] font-switzer mb-1.5 uppercase tracking-wider transition-colors duration-500">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full px-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-[15px] font-switzer text-[#111] dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:bg-white dark:focus:bg-white/10 focus:border-[#8B5CF6]/50 focus:ring-1 focus:ring-[#8B5CF6]/50 outline-none transition-all shadow-inner"
                    />
                  </div>

                  {error && (
                    <div className="text-red-600 dark:text-red-400 text-[13px] font-switzer font-medium bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-3 rounded-xl text-center transition-colors duration-500">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full h-[52px] bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] hover:from-[#1D4ED8] hover:to-[#7C3AED] text-white font-switzer font-medium rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4 overflow-hidden shadow-lg shadow-[#2563EB]/20 dark:shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transform hover:scale-[1.02]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? 'Creating Account...' : 'Register Securely'}
                      {!loading && <span className="transform group-hover:translate-x-1 transition-transform">→</span>}
                    </span>
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 text-center transition-colors duration-500">
                  <p className="text-[13px] font-switzer text-gray-600 dark:text-[#B0B8D0] transition-colors duration-500">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-[#2563EB] dark:text-[#00E5FF] hover:text-[#1D4ED8] dark:hover:text-white font-medium transition-colors">
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
