import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { isAdmin } from '@/lib/permissions';

const leaveActionSchema = z.object({
  leaveId: z.string().cuid(),
  action: z.enum(['APPROVED', 'REJECTED']),
});

export async function PATCH(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isAdmin(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const data = leaveActionSchema.parse(body);

    const updated = await prisma.leaveRequest.update({
      where: { id: data.leaveId },
      data: {
        status: data.action,
        approvedById: user.id,
      },
    });

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
