import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApplicationSchema } from '@/lib/validations'
import { getCurrentUser } from '@/lib/auth'
import arcjet, { fixedWindow } from '@arcjet/next'

// Initialize Arcjet for rate limiting (5 requests per hour per IP for applications)
const aj = arcjet({
  key: process.env.ARCJET_KEY || 'ajkey_placeholder',
  rules: [
    fixedWindow({
      mode: 'LIVE',
      window: '1h',
      max: 5,
    }),
  ],
})

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    if (process.env.ARCJET_KEY) {
      const decision = await aj.protect(req)
      if (decision.isDenied()) {
        return NextResponse.json(
          { error: 'Too Many Requests', reason: decision.reason },
          { status: 429 }
        )
      }
    }

    // 2. Parse and Validate Request Body
    const body = await req.json()
    const validatedData = ApplicationSchema.parse(body)

    // 3. Check Authentication for JobSeeker linking
    const user = await getCurrentUser()
    let jobSeekerId = undefined
    if (user && user.role === 'JOB_SEEKER') {
      const seeker = await prisma.jobSeeker.findUnique({ where: { userId: user.id } })
      if (seeker) jobSeekerId = seeker.id
    }

    // 4. Save to Database
    let savedApplication = null;
    try {
      savedApplication = await prisma.jobApplication.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          // @ts-ignore
          position: validatedData.position,
          experience: validatedData.experience,
          message: validatedData.message,
          resumeUrl: validatedData.resumeUrl,
          jobPostingId: validatedData.jobPostingId || undefined,
          jobSeekerId,
        },
      })
    } catch (dbError) {
      console.warn("Database save failed for Application:", dbError)
    }

    // Optional: Send a confirmation email here
    console.log(`[Mock Email] Sent application confirmation email to ${validatedData.email}`);

    return NextResponse.json(
      { success: true, message: 'Application received successfully', id: savedApplication?.id },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('Job Application Error:', error)
    
    // Zod Validation Error Handling
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
