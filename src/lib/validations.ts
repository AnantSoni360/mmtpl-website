import { z } from 'zod'

// ── INQUIRY FORM ──────────────────────────────────────
export const InquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).regex(/^[a-zA-Z\s.'-]+$/, 'Name contains invalid characters'),
  company: z.string().max(150).optional(),
  email: z.string().email('Please enter a valid email address').max(254),
  phone: z.string().regex(/^(\+91[\-\s]?)?[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'),
  service: z.enum([
    'mechanical-fabrication', 'civil-infrastructure', 'electrical-instrumentation',
    'plant-erection', 'epc-turnkey', 'shutdown-maintenance', 'other'
  ], { message: 'Please select a service' }),
  message: z.string().min(20).max(2000),
})
export type InquiryInput = z.infer<typeof InquirySchema>

// ── JOB APPLICATION FORM ─────────────────────────────
export const ApplicationSchema = z.object({
  name: z.string().min(2, 'Name too short').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(\+91[\-\s]?)?[6-9]\d{9}$/, 'Invalid Indian phone number'),
  position: z.string().min(2, 'Please specify the position').max(150),
  experience: z.string().min(1, 'Please specify your experience'),
  message: z.string().max(1000).optional(),
  resumeUrl: z.string().min(1, 'Resume is required'),
  jobPostingId: z.string().optional(),
})
export type ApplicationInput = z.infer<typeof ApplicationSchema>

// ── EMPLOYEE FORM ─────────────────────────────
export const EmployeeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  employeeCode: z.string().min(2, 'Employee Code is required'),
  department: z.string().min(2, 'Department is required'),
  designation: z.string().min(2, 'Designation is required'),
  phone: z.string().regex(/^(\+91[\-\s]?)?[6-9]\d{9}$/, 'Invalid Indian phone number'),
  location: z.string().min(2, 'Location is required'),
  employmentType: z.string().min(2, 'Employment type is required'),
  joinDate: z.string().min(1, 'Join date is required'),
})
export type EmployeeInput = z.infer<typeof EmployeeSchema>

// ── CLIENT FORM ─────────────────────────────
export const ClientSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  gstin: z.string().optional(),
  address: z.string().min(5, 'Address is required'),
  name: z.string().min(2, 'Contact person is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
})
export type ClientInput = z.infer<typeof ClientSchema>

// ── PROJECT FORM ─────────────────────────────
export const ProjectSchema = z.object({
  name: z.string().min(2, 'Project name is required'),
  clientId: z.string().min(1, 'Client is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  budget: z.coerce.number().min(0, 'Budget must be positive'),
  status: z.enum(['PLANNING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED']),
  description: z.string().optional(),
})
export type ProjectInput = z.infer<typeof ProjectSchema>

// ── TASK FORM ─────────────────────────────
export const TaskSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().optional(),
  assignedToId: z.string().min(1, 'Assignee is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  dueDate: z.string().min(1, 'Due date is required'),
})
export type TaskInput = z.infer<typeof TaskSchema>

// ── LEAVE FORM ─────────────────────────────
export const LeaveSchema = z.object({
  type: z.enum(['CASUAL', 'MEDICAL', 'EARNED', 'UNPAID']),
  fromDate: z.string().min(1, 'From date is required'),
  toDate: z.string().min(1, 'To date is required'),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
})
export type LeaveInput = z.infer<typeof LeaveSchema>
