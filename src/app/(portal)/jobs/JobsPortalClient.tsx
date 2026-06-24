'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplicationSchema, type ApplicationInput } from '@/lib/validations';
import { JobPosting } from '@prisma/client';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CloudinaryUploadWidget } from '@/components/cloudinary/CloudinaryUploadWidget';
import { Briefcase, MapPin, Search, AlertCircle, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface JobsPortalClientProps {
  jobs: JobPosting[];
}

export default function JobsPortalClient({ jobs }: JobsPortalClientProps) {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [nativeFile, setNativeFile] = useState<File | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [locFilter, setLocFilter] = useState('');

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ApplicationInput>({
    resolver: zodResolver(ApplicationSchema),
  });

  const handleApplyClick = (jobTitle: string, jobId: string) => {
    setSelectedJob(jobId);
    setValue('position', jobTitle);
    setValue('jobPostingId', jobId);
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async (data: ApplicationInput) => {
    if (!resumeUrl) {
      toast.error("Please upload your resume before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, resumeUrl }),
      });
      
      if (!res.ok) throw new Error('Submission failed');
        
      toast.success('Application submitted successfully!');
      reset();
      setResumeUrl('');
      setSelectedJob(null);
    } catch (err) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extract unique departments and locations for filters
  const departments = Array.from(new Set(jobs.map(j => j.department)));
  const locations = Array.from(new Set(jobs.map(j => j.location)));

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter ? job.department === deptFilter : true;
    const matchesLoc = locFilter ? job.location === locFilter : true;
    return matchesSearch && matchesDept && matchesLoc;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Browse Jobs</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Find and apply for open positions at MMTPL.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-[var(--color-paper)] p-4 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
          <input 
            type="text" 
            placeholder="Search roles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)]"
          />
        </div>
        <select 
          className="bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] sm:w-[200px]"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select 
          className="bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] sm:w-[200px]"
          value={locFilter}
          onChange={(e) => setLocFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full py-10 text-center text-[var(--color-slate)] font-switzer">
            No jobs found matching your filters.
          </div>
        ) : (
          filteredJobs.map(job => (
            <div key={job.id} className="bg-[var(--color-paper)] rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-slate)] bg-[var(--color-bone)] px-2.5 py-1 rounded-full">{job.department}</span>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-lilac-bloom)] bg-purple-50 px-2.5 py-1 rounded-full">{job.type.replace('_', ' ')}</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-obsidian)] font-switzer mb-3">{job.title}</h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-[13px] text-[var(--color-slate)] font-switzer">
                  <MapPin size={14} /> {job.location}
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[var(--color-slate)] font-switzer">
                  <Briefcase size={14} /> {job.experience}
                </div>
              </div>
              <p className="text-[14px] text-[var(--color-slate)] font-switzer line-clamp-3 mb-6 flex-1">
                {job.description}
              </p>
              <Button onClick={() => handleApplyClick(job.title, job.id)} variant="outline" className="w-full mt-auto">
                Apply Now
              </Button>
            </div>
          ))
        )}
      </div>

      <div id="application-form" className="pt-10 scroll-mt-20">
        <div className="bg-[var(--color-paper)] rounded-[20px] border-[0.5px] border-[var(--color-silver)] shadow-lg p-8 md:p-12 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-switzer text-[var(--color-obsidian)] mb-2">Submit Application</h2>
            <p className="text-[14px] text-[var(--color-slate)] font-switzer">
              {selectedJob 
                ? <span>Applying for: <strong className="text-[var(--color-obsidian)]">{jobs.find(j => j.id === selectedJob)?.title}</strong></span> 
                : 'Select a job above to apply for a specific role, or submit a general application.'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input placeholder="Full Name *" {...register('name')} error={errors.name?.message} />
              <Input type="email" placeholder="Email Address *" {...register('email')} error={errors.email?.message} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input type="tel" placeholder="Phone Number *" {...register('phone')} error={errors.phone?.message} />
              <Input placeholder="Position Applying For *" {...register('position')} error={errors.position?.message} />
            </div>

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

            <Textarea 
              placeholder="Cover Note / Why should we hire you? (Optional)" 
              {...register('message')} 
              error={errors.message?.message} 
              className="min-h-[120px]"
            />

            <div className="space-y-2">
              <span className="font-switzer font-medium text-[var(--color-obsidian)] text-[14px]">Resume / CV (PDF or DOCX) *</span>
              {resumeUrl ? (
                <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-xl text-emerald-700 font-switzer text-[14px] flex items-center justify-between">
                  <span className="flex items-center gap-2"><Upload size={16} /> Resume uploaded successfully!</span>
                  <button type="button" onClick={() => { setResumeUrl(''); setValue('resumeUrl', '', { shouldValidate: true }); setNativeFile(null); setUploadError(false); }} className="underline text-sm hover:text-red-500 transition-colors">Remove</button>
                </div>
              ) : uploadError ? (
                <div className="border border-dashed border-amber-400 bg-amber-50 rounded-xl p-6">
                  <div className="flex items-center gap-2 text-amber-600 text-sm font-switzer font-medium mb-4">
                    <AlertCircle size={16} />
                    Cloud upload unavailable — please attach your resume below.
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="block w-full text-sm text-[var(--color-slate)] file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-obsidian)] file:text-white hover:file:bg-[var(--color-slate)] transition-all font-switzer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setNativeFile(file);
                        const localUrl = `local:${file.name}`;
                        setResumeUrl(localUrl);
                        setValue('resumeUrl', localUrl, { shouldValidate: true });
                      }
                    }}
                  />
                  {nativeFile && (
                    <p className="text-xs text-emerald-600 mt-2 font-switzer">Selected: {nativeFile.name}</p>
                  )}
                </div>
              ) : (
                <CloudinaryUploadWidget
                  resourceType="auto"
                  maxFiles={1}
                  onUploadSuccess={(url) => {
                    setResumeUrl(url);
                    setValue('resumeUrl', url, { shouldValidate: true });
                    setUploadError(false);
                  }}
                  onUploadError={(error: any) => {
                    console.error('Upload error:', error);
                    setUploadError(true);
                  }}
                />
              )}
            </div>

            <input type="hidden" {...register('resumeUrl')} />

            <Button type="submit" variant="lilac" size="lg" disabled={isSubmitting || !resumeUrl} className="w-full">
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
