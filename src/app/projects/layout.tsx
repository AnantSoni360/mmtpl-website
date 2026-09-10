import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Industrial Projects — Steel Plants, Coke Ovens & Pellet Plants | MMTPL',
  description: 'Browse MMTPL\'s portfolio of major industrial projects including ₹91.56 Cr BOF Works at JSW Steel, Coke Oven Battery construction, Pellet Plant turnkey projects, and 11+ overseas projects across Oman, UAE, and Saudi Arabia.',
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
