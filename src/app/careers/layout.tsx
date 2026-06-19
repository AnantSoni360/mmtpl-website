import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers at MMTPL — Join India\'s Leading Industrial Contractor',
  description: 'Explore career opportunities at MMTPL. We are hiring Site Engineers, Refractory Supervisors, Mechanical Erection Engineers, and Safety Officers for projects across India, Oman, and Saudi Arabia. Apply now.',
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
