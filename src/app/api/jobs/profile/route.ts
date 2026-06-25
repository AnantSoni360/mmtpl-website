import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'JOB_SEEKER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, phone, experience, currentRole, resumeUrl } = await req.json();

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { name }
      }),
      prisma.jobSeeker.update({
        where: { userId: user.id },
        data: {
          phone,
          experience,
          currentRole,
          resumeUrl
        }
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
