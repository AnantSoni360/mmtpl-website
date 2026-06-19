import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About MMTPL — 20+ Years of Industrial Excellence',
  description: 'Learn about Man Machine Technocrats Pvt. Ltd. — India\'s trusted turnkey industrial contractor since 2004. Explore our company history, leadership team, financial milestones, and global operations across steel, cement, and power sectors.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
