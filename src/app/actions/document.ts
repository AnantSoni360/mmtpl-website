'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';


export async function uploadDocument(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const docType = formData.get('docType') as string;
  const projectId = formData.get('projectId') as string;
  // In a real app with Cloudinary, we'd get this from the client-side uploader.
  // We'll mock it here.
  const fileUrl = `https://mmtpl.in/docs/${Date.now()}-${name.replace(/\s+/g, '-').toLowerCase()}.pdf`;

  if (!name || !docType) throw new Error('Missing fields');

  await prisma.document.create({
    data: {
      name,
      fileUrl,
      docType,
      uploadedById: user.id,
      projectId: projectId || null
    }
  });

  revalidatePath('/admin/documents');
  redirect('/admin/documents');
}
