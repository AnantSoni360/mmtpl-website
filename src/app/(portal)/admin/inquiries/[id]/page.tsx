import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { ArrowLeft, ArrowRight, Building, CheckCircle, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default async function InquiryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/inquiries" className="w-10 h-10 rounded-full border border-[var(--color-silver)] flex items-center justify-center hover:bg-[var(--color-bone)] transition-colors">
            <ArrowLeft size={16} className="text-[var(--color-obsidian)]" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1 flex items-center gap-3">
              Inquiry from {inquiry.name}
              <StatusBadge status={inquiry.status} variant={inquiry.status === 'NEW' ? 'error' : inquiry.status === 'CLOSED' ? 'default' : 'warning'} />
            </h1>
            <p className="text-[13px] text-[var(--color-slate)] font-switzer">
              Received on {format(new Date(inquiry.createdAt), 'dd MMMM yyyy, hh:mm a')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <form action={async () => {
            'use server';
            const { advanceInquiryStatus } = await import('@/app/actions/inquiry');
            await advanceInquiryStatus(id, inquiry.status);
          }}>
            <Button type="submit" variant="outline">
              Advance Status <ArrowRight size={14} className="ml-1" />
            </Button>
          </form>
          <Link href={`/admin/projects/new?inquiryId=${inquiry.id}&name=${encodeURIComponent(inquiry.name)}&company=${encodeURIComponent(inquiry.company || '')}&scope=${encodeURIComponent(inquiry.message)}`}>
            <Button variant="lilac">Convert to Project</Button>
          </Link>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
          <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider border-b border-[var(--color-silver)] pb-2">Message</h2>
          <div className="bg-[var(--color-bone)] p-4 rounded-lg border border-[var(--color-silver)]">
            <p className="text-[14px] text-[var(--color-obsidian)] font-switzer leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
          </div>
          
          <div>
            <h3 className="text-[13px] font-semibold text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Service of Interest</h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-lilac-bloom)]/10 text-[var(--color-lilac-bloom)] text-[13px] font-medium font-switzer">
              {inquiry.service}
            </span>
          </div>
        </div>

        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
          <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider border-b border-[var(--color-silver)] pb-2">Contact Info</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-[var(--color-slate)] mt-0.5" />
              <div>
                <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider">Email</p>
                <a href={`mailto:${inquiry.email}`} className="text-[14px] font-medium text-[var(--color-lilac-bloom)] hover:underline font-switzer">{inquiry.email}</a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-[var(--color-slate)] mt-0.5" />
              <div>
                <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider">Phone</p>
                <a href={`tel:${inquiry.phone}`} className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{inquiry.phone}</a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building size={16} className="text-[var(--color-slate)] mt-0.5" />
              <div>
                <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider">Company</p>
                <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{inquiry.company || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
