import { z } from 'zod'

// ── INQUIRY FORM ──────────────────────────────────────
export const InquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name contains invalid characters'),

  company: z
    .string()
    .max(150, 'Company name too long')
    .optional(),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email too long'),

  phone: z
    .string()
    .regex(/^(\+91[\-\s]?)?[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'),

  service: z.enum([
    'mechanical-fabrication',
    'civil-infrastructure',
    'electrical-instrumentation',
    'plant-erection',
    'epc-turnkey',
    'shutdown-maintenance',
    'other',
  ], { message: 'Please select a service' }),

  message: z
    .string()
    .min(20, 'Please provide at least 20 characters describing your project')
    .max(2000, 'Message too long'),
})

export type InquiryInput = z.infer<typeof InquirySchema>

// ── JOB APPLICATION FORM ─────────────────────────────
export const ApplicationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name too short')
    .max(100, 'Name too long'),

  email: z
    .string()
    .email('Invalid email address'),

  phone: z
    .string()
    .regex(/^(\+91[\-\s]?)?[6-9]\d{9}$/, 'Invalid Indian phone number'),

  position: z
    .string()
    .min(2, 'Please specify the position')
    .max(150),

  experience: z
    .string()
    .min(1, 'Please specify your experience'),

  message: z
    .string()
    .max(1000, 'Cover note too long')
    .optional(),

  resumeUrl: z
    .string()
    .url('Invalid resume URL'),

  jobPostingId: z
    .string()
    .optional(),
})

export type ApplicationInput = z.infer<typeof ApplicationSchema>
