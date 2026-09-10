import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Industrial Services — Refractory, Structural, Mechanical & More | MMTPL',
  description: 'MMTPL offers 11+ comprehensive industrial services: Refractory Installation, Structural Steel Erection, Mechanical Equipment Erection, Civil Works, Utility Piping, Electrical & Instrumentation, EPC Turnkey, and Plant Operations & Maintenance.',
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
