'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApplicationSchema, type ApplicationInput } from '@/lib/validations'
import { TagPill } from '@/components/ui/TagPill'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { jobs } from '@/data/jobs'
import { UploadDropzone } from '@/components/uploadthing'
import { Briefcase, MapPin, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [resumeUrl, setResumeUrl] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(ApplicationSchema),
  })

  // When a job is selected, update the form value
  const handleApplyClick = (jobTitle: string, jobId: string) => {
    setSelectedJob(jobId)
    setValue('position', jobTitle)
    setValue('jobPostingId', jobId)
    // Scroll to form
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const onSubmit = async (data: ApplicationInput) => {
    if (!resumeUrl) {
      alert("Please upload your resume before submitting.")
      return
    }
    
    const payload = { ...data, resumeUrl }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      
      if (!res.ok) throw new Error('Submission failed')
        
      setSubmitStatus('success')
      reset()
      setResumeUrl('')
      setSelectedJob(null)
    } catch (err) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col w-full overflow-hidden bg-bg-main relative">
      
      {/* ── CINEMATIC HERO ── */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex flex-col items-center justify-center border-b border-white/5">
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40">
           <motion.div 
             animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0"
             style={{
               backgroundImage: `linear-gradient(var(--color-graphite) 1px, transparent 1px), linear-gradient(90deg, var(--color-graphite) 1px, transparent 1px)`,
               backgroundSize: '60px 60px'
             }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-bg-main" />
        </div>
        
        {/* Deep Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-veil opacity-10 dark:opacity-20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-lilac-bloom opacity-10 dark:opacity-20 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="container mx-auto px-6 relative z-10 text-center max-w-[800px]">
          <FadeUp delay={0.1}>
            <TagPill variant="bone" className="mb-8 mx-auto backdrop-blur-md border border-white/20 bg-white/50 dark:bg-white/5 shadow-sm">
              <span className="text-obsidian dark:text-white">Join the Team</span>
            </TagPill>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="display-lg text-obsidian mb-8 tracking-tight">
              Build Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-veil to-purple-500">MMTPL</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="body-text text-graphite text-xl md:text-2xl leading-relaxed">
              We are always looking for passionate engineers, managers, and technical specialists to join our mission of building world-class infrastructure.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] py-24 relative z-20">
        <h2 className="display text-obsidian mb-10 text-center text-4xl">Open Positions</h2>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <StaggerItem key={job.id}>
              <Card className="relative h-full flex flex-col group hover:-translate-y-2 transition-transform duration-500 bg-white/60 dark:bg-[#0a1128]/60 backdrop-blur-xl border border-white/50 dark:border-white/10 overflow-hidden shadow-lg p-6">
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-veil/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <TagPill variant="bone" className="bg-white/80 dark:bg-white/10 text-obsidian dark:text-white text-xs border border-silver shadow-sm">{job.department}</TagPill>
                  <span className="caption text-slate bg-paper px-3 py-1 rounded-full border border-silver shadow-sm text-xs font-bold uppercase tracking-wider">{job.type}</span>
                </div>
                
                <h3 className="text-2xl font-switzer font-bold tracking-tight text-obsidian mb-4 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-veil group-hover:to-purple-500 transition-colors duration-300">
                  {job.title}
                </h3>
                
                <div className="flex flex-col gap-3 mb-6 relative z-10">
                  <div className="flex items-center gap-2 text-[14px] text-graphite font-switzer bg-bone/50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-silver/50">
                    <MapPin size={16} className="text-sky-veil" /> {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-graphite font-switzer bg-bone/50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-silver/50">
                    <Briefcase size={16} className="text-purple-500" /> {job.experience}
                  </div>
                </div>

                <p className="body-text text-slate mb-8 flex-grow relative z-10 line-clamp-3 leading-relaxed">{job.description}</p>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-auto relative z-10 group-hover:bg-obsidian group-hover:text-white transition-colors duration-300"
                  onClick={() => handleApplyClick(job.title, job.id)}
                >
                  Apply Now
                </Button>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="application-form" className="container mx-auto px-6 max-w-[800px] pb-32">
        <FadeUp>
          <div className="relative bg-white/80 dark:bg-[#162033]/90 backdrop-blur-xl border border-silver dark:border-white/10 p-8 md:p-12 rounded-[var(--radius-card-lg)] shadow-2xl overflow-hidden">
            
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 opacity-10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center mb-10">
              <h2 className="display text-obsidian text-3xl mb-3">Submit Application</h2>
              <p className="body-text text-slate">
                {selectedJob 
                  ? <span className="font-medium bg-bone px-3 py-1 rounded-full border border-silver text-obsidian">Applying for: {jobs.find(j => j.id === selectedJob)?.title}</span> 
                  : 'Submit a general application and we will keep you in mind for future roles.'}
              </p>
            </div>
            
            {submitStatus === 'success' ? (
              <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 rounded-2xl font-switzer text-center relative z-10">
                <h3 className="font-bold text-2xl mb-3">Application Received!</h3>
                <p className="mb-8">Thank you for applying. Our HR team will review your profile and contact you if there is a match.</p>
                <Button variant="outline" className="border-emerald-500/50 hover:bg-emerald-500 hover:text-white" onClick={() => {
                  setSubmitStatus('idle')
                  setSelectedJob(null)
                }}>Submit Another Application</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 relative z-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input placeholder="Full Name *" {...register('name')} error={errors.name?.message} className="bg-bone/50 dark:bg-[#0a1128]/50 border-silver/50" />
                  <Input type="email" placeholder="Email Address *" {...register('email')} error={errors.email?.message} className="bg-bone/50 dark:bg-[#0a1128]/50 border-silver/50" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input type="tel" placeholder="Phone Number *" {...register('phone')} error={errors.phone?.message} className="bg-bone/50 dark:bg-[#0a1128]/50 border-silver/50" />
                  <Input placeholder="Position Applying For *" {...register('position')} error={errors.position?.message} className="bg-bone/50 dark:bg-[#0a1128]/50 border-silver/50" />
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <Select
                    options={[
                      { value: '0-2', label: '0-2 Years' },
                      { value: '3-5', label: '3-5 Years' },
                      { value: '6-10', label: '6-10 Years' },
                      { value: '10+', label: '10+ Years' },
                    ]}
                    placeholder="Total Experience *"
                    {...register('experience')}
                    error={errors.experience?.message}
                  />
                </div>

                <Textarea 
                  placeholder="Cover Note / Why should we hire you? (Optional)" 
                  {...register('message')} 
                  error={errors.message?.message} 
                  className="bg-bone/50 dark:bg-[#0a1128]/50 border-silver/50 min-h-[120px]"
                />

                <div className="flex flex-col gap-2">
                  <span className="font-switzer font-medium text-obsidian text-sm">Resume / CV (PDF) *</span>
                  
                  {/* Uploadthing Dropzone Placeholder */}
                  {resumeUrl ? (
                    <div className="p-4 border border-emerald-500/30 bg-emerald-500/10 rounded-xl text-emerald-700 dark:text-emerald-400 font-switzer text-sm flex items-center justify-between">
                      <span>Resume Uploaded Successfully!</span>
                      <button type="button" onClick={() => setResumeUrl('')} className="underline text-sm hover:text-red-500 transition-colors">Remove</button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint="resumeUploader"
                      onClientUploadComplete={(res) => {
                        if (res?.[0]) {
                          setResumeUrl(res[0].url)
                        }
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`)
                      }}
                      appearance={{
                        container: 'border border-dashed border-silver dark:border-white/30 bg-bone/50 dark:bg-obsidian/50 rounded-xl p-8 transition-colors hover:border-obsidian dark:hover:border-white/60',
                        button: 'bg-obsidian dark:bg-lilac-bloom text-white !text-white font-switzer font-medium px-6 py-2.5 rounded-lg mt-4 cursor-pointer transition-colors text-sm',
                        label: 'font-switzer text-obsidian dark:text-gray-200 text-sm font-medium',
                        allowedContent: 'font-switzer text-graphite dark:text-gray-400 text-xs mt-1',
                      }}
                    />
                  )}
                </div>

                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg text-sm text-center">
                    Failed to submit. Please try again later.
                  </div>
                )}

                <Button type="submit" variant="lilac" size="lg" disabled={isSubmitting || !resumeUrl} className="w-full mt-4 bg-obsidian text-white hover:bg-graphite">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            )}
          </div>
        </FadeUp>
      </section>

    </div>
  )
}
