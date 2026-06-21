import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { InquirySchema } from '@/lib/validations'
import arcjet, { fixedWindow } from '@arcjet/next'
import { Resend } from 'resend'

// Initialize Arcjet for rate limiting (10 requests per hour per IP)
const aj = arcjet({
  key: process.env.ARCJET_KEY || 'ajkey_placeholder',
  rules: [
    fixedWindow({
      mode: 'LIVE',
      window: '1h',
      max: 10,
    }),
  ],
})

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder')

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
    const validatedData = InquirySchema.parse(body)

    // 3. Extract IP Address for logging (Optional but good for tracking abuse)
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

    // 4. Save to Database
    // Using try-catch to allow local dev to proceed even if DB isn't configured yet
    let savedInquiry = null;
    try {
      savedInquiry = await prisma.inquiry.create({
        data: {
          name: validatedData.name,
          company: validatedData.company,
          email: validatedData.email,
          phone: validatedData.phone,
          service: validatedData.service,
          message: validatedData.message,
          // @ts-ignore
          ipAddress: ipAddress,
        },
      })
    } catch (dbError) {
      console.warn("Database save failed (might not be configured yet):", dbError)
    }

    // 5. Send Email Notification (If Resend is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'MMTPL Inquiries <onboarding@resend.dev>', // Should be a verified domain in production
          to: 'contact@mmtpl.in', // Replace with actual company email
          subject: `New Inquiry from ${validatedData.name} - ${validatedData.service}`,
          html: `
            <h3>New Inquiry Received</h3>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Company:</strong> ${validatedData.company || 'N/A'}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${validatedData.phone}</p>
            <p><strong>Service:</strong> ${validatedData.service}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${validatedData.message}</p>
          `,
        })
      } catch (emailError) {
        console.error("Email send failed:", emailError)
        // We don't throw here because we still want to return success to the user 
        // if the DB save worked (or if we're just testing the frontend).
      }
    }

    return NextResponse.json(
      { success: true, message: 'Inquiry received successfully', id: savedInquiry?.id },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('Inquiry Submission Error:', error)
    
    // Zod Validation Error Handling
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
