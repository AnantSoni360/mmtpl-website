import { TagPill } from '@/components/ui/TagPill'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { Card } from '@/components/ui/Card'

export default function Industries() {
  const industries = [
    { title: 'Power & Energy', desc: 'Thermal, Hydro, and Renewable power plant structures.' },
    { title: 'Steel & Metals', desc: 'Blast furnaces, rolling mills, and heavy steel structures.' },
    { title: 'Oil & Gas', desc: 'Refineries, pipelines, and petrochemical plants.' },
    { title: 'Cement & Mining', desc: 'Material handling systems and heavy equipment erection.' },
    { title: 'Infrastructure', desc: 'Bridges, commercial complexes, and public works.' },
  ]

  return (
    <div className="flex flex-col gap-[var(--section-gap)] pb-[var(--section-gap)] pt-12">
      
      {/* ── HERO ── */}
      <section className="container mx-auto px-6 max-w-[800px] text-center">
        <FadeUp delay={0.1}>
          <TagPill variant="lilac" className="mb-8">Sectors We Serve</TagPill>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className="display-lg text-[var(--color-obsidian)] mb-8">
            Powering Key Industries
          </h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="body-text text-[var(--color-graphite)] text-lg">
            MMTPL provides specialized engineering services tailored to the unique demands of heavy industries.
          </p>
        </FadeUp>
      </section>

      {/* ── GRID ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)]">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <StaggerItem key={i}>
              <Card className="h-full flex flex-col hover:bg-[var(--color-bone)]">
                <h3 className="subheading text-[var(--color-obsidian)] mb-3">{ind.title}</h3>
                <p className="body-text text-[var(--color-slate)]">{ind.desc}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

    </div>
  )
}
