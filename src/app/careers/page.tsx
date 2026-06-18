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
    <div className="flex flex-col gap-[var(--section-gap)] pb-[var(--section-gap)] pt-12">
      
      {/* ── HERO ── */}
      <section className="container mx-auto px-6 max-w-[800px] text-center">
        <FadeUp delay={0.1}>
          <TagPill variant="bone" className="mb-8">Join the Team</TagPill>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className="display-lg text-[var(--color-obsidian)] mb-8">
            Build Your Career with MMTPL
          </h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="body-text text-[var(--color-graphite)] text-lg mb-12">
            We are always looking for passionate engineers, managers, and technical specialists to join our mission of building world-class infrastructure.
          </p>
        </FadeUp>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)]">
        <h2 className="heading-sm text-[var(--color-obsidian)] mb-10 text-center">Open Positions</h2>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <StaggerItem key={job.id}>
              <Card className="h-full flex flex-col hover:border-[var(--color-obsidian)] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <TagPill variant="bone">{job.department}</TagPill>
                  <span className="caption text-[var(--color-slate)] bg-[var(--color-paper)] px-2 py-1 rounded border border-[var(--color-silver)]">{job.type}</span>
                </div>
                <h3 className="subheading text-[var(--color-obsidian)] mb-2">{job.title}</h3>
                
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2 text-[14px] text-[var(--color-graphite)] font-switzer">
                    <MapPin size={16} /> {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-[var(--color-graphite)] font-switzer">
                    <Briefcase size={16} /> {job.experience}
                  </div>
                </div>

                <p className="body-text text-[var(--color-slate)] mb-6 flex-grow">{job.description}</p>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-auto"
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
      <section id="application-form" className="container mx-auto px-6 max-w-[800px]">
        <Card elevated>
          <h2 className="heading-sm mb-2 text-[var(--color-obsidian)]">Submit Application</h2>
          <p className="body-text text-[var(--color-slate)] mb-8">
            {selectedJob 
              ? `Applying for: ${jobs.find(j => j.id === selectedJob)?.title}` 
              : 'Submit a general application and we will keep you in mind for future roles.'}
          </p>
          
          {submitStatus === 'success' ? (
            <div className="p-6 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] rounded-[var(--radius-control)] font-switzer text-center">
              <h3 className="font-bold text-lg mb-2">Application Received!</h3>
              <p>Thank you for applying. Our HR team will review your profile and contact you if there is a match.</p>
              <Button variant="outline" className="mt-6" onClick={() => {
                setSubmitStatus('idle')
                setSelectedJob(null)
              }}>Submit Another Application</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input placeholder="Full Name *" {...register('name')} error={errors.name?.message} />
                <Input type="email" placeholder="Email Address *" {...register('email')} error={errors.email?.message} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input type="tel" placeholder="Phone Number *" {...register('phone')} error={errors.phone?.message} />
                <Input placeholder="Position Applying For *" {...register('position')} error={errors.position?.message} />
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
              />

              <div className="flex flex-col gap-2">
                <span className="font-switzer font-medium text-[var(--color-obsidian)]">Resume / CV (PDF) *</span>
                
                {/* Uploadthing Dropzone Placeholder */}
                {resumeUrl ? (
                  <div className="p-4 border border-[var(--color-silver)] bg-[#f0fdf4] rounded-[var(--radius-control)] text-[#166534] font-switzer text-sm flex items-center justify-between">
                    <span>Resume Uploaded Successfully!</span>
                    <button type="button" onClick={() => setResumeUrl('')} className="underline text-sm hover:text-red-600 transition-colors">Remove</button>
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
                      container: 'border-2 border-dashed border-[var(--color-silver)] bg-[var(--color-bone)] rounded-[var(--radius-control)] p-8 transition-colors hover:border-[var(--color-graphite)]',
                      button: 'bg-[var(--color-obsidian)] text-[var(--color-paper)] font-switzer font-medium px-4 py-2 rounded-[var(--radius-control)] mt-4 cursor-pointer hover:bg-[var(--color-graphite)] transition-colors',
                      label: 'font-switzer text-[var(--color-slate)]',
                    }}
                  />
                )}
              </div>

              {submitStatus === 'error' && (
                <span className="text-red-500 font-switzer text-[14px]">
                  Failed to submit. Please try again later.
                </span>
              )}

              <Button type="submit" variant="lilac" size="lg" disabled={isSubmitting || !resumeUrl} className="w-full md:w-auto self-start mt-2">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          )}
        </Card>
      </section>

    </div>
  )
}
