import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = schema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success even if user not found (security best practice to prevent email enumeration)
    if (!user) {
      return NextResponse.json({ success: true });
    }

    // In a real app, generate a unique token, save it to the DB with expiration, and include it in the URL
    const resetUrl = `https://mmtpl.in/auth/reset-password?token=mock_token`;

    // Send email using Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'no-reply@mmtpl.in',
        to: email,
        subject: 'MMTPL Portal - Password Reset',
        html: `
          <p>Hi ${user.name || 'User'},</p>
          <p>You requested a password reset. Please click the link below to securely reset your password:</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p>Regards,<br>MMTPL Team</p>
        `,
      });
    } else {
      console.log('Would send reset email to', email, 'with link', resetUrl);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
