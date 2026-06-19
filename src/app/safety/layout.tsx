import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Safety & Quality — Zero Harm Culture, ISO 45001:2018 Certified | MMTPL',
  description: 'MMTPL\'s safety-first culture: 1.7M+ safe man hours, NIL Lost Time Injuries, 100% PPE compliance, ISO 45001:2018 certified. Real-time safety statistics dashboard and comprehensive HSE policy.',
}

export default function SafetyLayout({ children }: { children: React.ReactNode }) {
  return children
}
