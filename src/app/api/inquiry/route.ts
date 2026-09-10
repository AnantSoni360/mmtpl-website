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
        // Send inquiry details to Admin
        await resend.emails.send({
          from: 'MMTPL Inquiries <onboarding@resend.dev>', // MUST change to a verified domain in production
          to: 'abhishek.soni322@gmail.com', 
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

        // Send confirmation auto-reply to User
        await resend.emails.send({
          from: 'MMTPL Support <onboarding@resend.dev>', // Should be a verified domain in production
          to: validatedData.email,
          subject: `We've received your inquiry - MMTPL`,
          html: `
            <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
              <h2 style="color: #1a202c;">Hello ${validatedData.name},</h2>
              <p>Thank you for contacting Man Machine Technocrats Pvt. Ltd.</p>
              <p>This is to confirm that we have successfully received your inquiry regarding <strong>${validatedData.service}</strong>.</p>
              <p>Our team is currently reviewing your message and will get back to you shortly. Please wait for our response.</p>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Need immediate assistance?</strong></p>
                <p style="margin: 5px 0 0 0;">Feel free to call us directly at <strong>+91 9008038052</strong>.</p>
              </div>
              <p>Best Regards,</p>
              <p><strong>The MMTPL Team</strong></p>
            </div>
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
