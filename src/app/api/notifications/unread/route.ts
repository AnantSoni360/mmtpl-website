import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ unreadCount: 0 });

  const unreadCount = await prisma.notification.count({
    where: {
      userId: user.id,
      isRead: false
    }
  });

  return NextResponse.json({ unreadCount });
}
