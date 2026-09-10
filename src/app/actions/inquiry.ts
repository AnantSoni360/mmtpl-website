'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { InquiryStatus } from '@prisma/client';

export async function advanceInquiryStatus(id: string, currentStatus: InquiryStatus) {
  const nextStatusMap: Record<InquiryStatus, InquiryStatus> = {
    NEW: 'REVIEWED',
    REVIEWED: 'REPLIED',
    REPLIED: 'CLOSED',
    CLOSED: 'NEW'
  };

  const nextStatus = nextStatusMap[currentStatus] || 'NEW';

  await prisma.inquiry.update({
    where: { id },
    data: { status: nextStatus }
  });

  revalidatePath('/admin/inquiries');
  revalidatePath(`/admin/inquiries/${id}`);
}
