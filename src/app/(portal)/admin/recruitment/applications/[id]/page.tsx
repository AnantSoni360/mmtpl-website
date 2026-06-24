import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { ArrowLeft, Mail, Phone, FileText, Calendar } from 'lucide-react';
import Link from 'next/link';
import { updateApplicationStatus } from '@/app/actions/recruitment';

export default async function ApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const app = await prisma.jobApplication.findUnique({
    where: { id },
    include: { jobPosting: true }
  });

  if (!app) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/recruitment" className="w-10 h-10 rounded-full border border-[var(--color-silver)] flex items-center justify-center hover:bg-[var(--color-bone)] transition-colors">
            <ArrowLeft size={16} className="text-[var(--color-obsidian)]" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1 flex items-center gap-3">
              Application: {app.name}
              <StatusBadge status={app.status.replace('_', ' ')} />
            </h1>
            <p className="text-[13px] text-[var(--color-slate)] font-switzer">
              Applied for: {app.jobPosting?.title || app.position} on {format(new Date(app.createdAt), 'dd MMMM yyyy')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider border-b border-[var(--color-silver)] pb-2">Cover Letter / Message</h2>
            <div className="bg-[var(--color-bone)] p-4 rounded-lg border border-[var(--color-silver)]">
              <p className="text-[14px] text-[var(--color-obsidian)] font-switzer leading-relaxed whitespace-pre-wrap">{app.message || 'No message provided.'}</p>
            </div>
          </div>

          <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-4">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider border-b border-[var(--color-silver)] pb-2">Resume</h2>
            {app.resumeUrl ? (
              <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-lg border border-[var(--color-silver)] hover:bg-[var(--color-bone)] transition-colors">
                <div className="w-10 h-10 bg-red-50 text-red-500 rounded flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">Resume.pdf</p>
                  <p className="text-[12px] text-[var(--color-slate)] font-switzer">Click to view document</p>
                </div>
              </a>
            ) : (
              <p className="text-[13px] text-[var(--color-slate)] font-switzer">No resume uploaded.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider border-b border-[var(--color-silver)] pb-2">Applicant Info</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[var(--color-slate)] mt-0.5" />
                <div>
                  <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider">Email</p>
                  <a href={`mailto:${app.email}`} className="text-[14px] font-medium text-[var(--color-lilac-bloom)] hover:underline font-switzer">{app.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-[var(--color-slate)] mt-0.5" />
                <div>
                  <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider">Phone</p>
                  <a href={`tel:${app.phone}`} className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{app.phone}</a>
                </div>
              </div>
              <div>
                <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider">Experience</p>
                <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer mt-1">{app.experience}</p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-4">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider border-b border-[var(--color-silver)] pb-2">Update Status</h2>
            <div className="space-y-2">
              <form action={async () => {
                'use server';
                await updateApplicationStatus(id, 'SHORTLISTED');
              }}>
                <Button type="submit" variant="outline" className="w-full justify-start text-blue-600 border-blue-200 hover:bg-blue-50">
                  <span className="w-4 h-4 rounded-full bg-blue-500 mr-2" /> Mark Shortlisted
                </Button>
              </form>
              <form action={async () => {
                'use server';
                await updateApplicationStatus(id, 'INTERVIEW_SCHEDULED');
              }}>
                <Button type="submit" variant="outline" className="w-full justify-start text-purple-600 border-purple-200 hover:bg-purple-50">
                  <Calendar size={16} className="mr-2" /> Schedule Interview
                </Button>
              </form>
              <form action={async () => {
                'use server';
                await updateApplicationStatus(id, 'HIRED');
              }}>
                <Button type="submit" variant="outline" className="w-full justify-start text-green-600 border-green-200 hover:bg-green-50">
                  <span className="w-4 h-4 rounded-full bg-green-500 mr-2" /> Mark Hired
                </Button>
              </form>
              <form action={async () => {
                'use server';
                await updateApplicationStatus(id, 'REJECTED');
              }}>
                <Button type="submit" variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 mt-4">
                  <span className="w-4 h-4 rounded-full bg-red-500 mr-2" /> Reject Candidate
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
