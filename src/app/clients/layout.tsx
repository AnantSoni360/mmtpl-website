import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Clients — JSW Steel, Tata Steel, SAIL, SABIC & More | MMTPL',
  description: 'MMTPL has served India\'s top industrial companies including JSW Steel, Tata Steel, JSPL, SAIL, NMDC, and international clients like SABIC (Saudi Arabia), Jindal Shadeed (Oman), and many more across 5 countries.',
}

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return children
}
