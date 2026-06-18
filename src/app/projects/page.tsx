'use client'

import { useState, useEffect } from 'react'
import { TagPill } from '@/components/ui/TagPill'
import { FadeUp } from '@/components/motion/FadeUp'
import { projects } from '@/data/projects'
import { cn } from '@/lib/utils'
import { InteractiveProjectExplorer } from '@/components/sections/InteractiveProjectExplorer'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

const CATEGORIES = ['All', 'India', 'Overseas', 'Coke Oven', 'Blast Furnace']
const ITEMS_PER_PAGE = 9

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE)
  }, [activeCategory])

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const visibleProjects = filteredProjects.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProjects.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE)
  }

  return (
    <div className="flex flex-col gap-[var(--section-gap)] pb-[var(--section-gap)] pt-12">
      
      {/* ── HERO ── */}
      <section className="container mx-auto px-6 max-w-[800px] text-center">
        <FadeUp delay={0.1}>
          <TagPill variant="bone" className="mb-8">Our Portfolio</TagPill>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className="display-lg text-[var(--color-obsidian)] mb-8">
            Milestones in Engineering
          </h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="body-text text-[var(--color-graphite)] text-lg">
            Explore some of the most challenging and impactful industrial projects we have executed across India and Overseas.
          </p>
        </FadeUp>
      </section>

      {/* ── FILTER TABS ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] flex flex-wrap gap-4 justify-center">
        {CATEGORIES.map((cat, i) => (
          <FadeUp key={cat} delay={0.3 + i * 0.1}>
            <button
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-6 py-2 rounded-[var(--radius-pill)] font-switzer font-medium transition-colors border',
                activeCategory === cat
                  ? 'bg-[var(--color-obsidian)] text-[var(--color-paper)] border-[var(--color-obsidian)]'
                  : 'bg-transparent text-[var(--color-graphite)] border-[var(--color-silver)] hover:bg-[var(--color-bone)]'
              )}
            >
              {cat}
            </button>
          </FadeUp>
        ))}
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, i) => (
            <FadeUp key={project.id} delay={0.1}>
              <div className="group cursor-pointer rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-silver)] bg-[var(--color-paper)] hover:shadow-[var(--shadow-card)] transition-all flex flex-col h-full">
                <div className="relative w-full h-[240px] overflow-hidden bg-[var(--color-bone)]">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <TagPill variant="bone">{project.category}</TagPill>
                    {(project.status || project.year) && (
                      <TagPill variant={project.status === 'Running' ? 'lilac' : 'bone'}>
                        {project.status || project.year}
                      </TagPill>
                    )}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="heading-sm text-[var(--color-obsidian)] text-xl leading-tight">{project.title}</h3>
                  </div>
                  
                  <div className="flex flex-col gap-2 mb-4 mt-auto pt-4 border-t border-[var(--color-silver)]">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-slate)]">Client:</span>
                      <span className="font-switzer font-medium text-[var(--color-obsidian)] text-right">{project.client}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-slate)]">Location:</span>
                      <span className="font-switzer font-medium text-[var(--color-obsidian)] text-right">{project.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-slate)]">Value:</span>
                      <span className="font-switzer font-bold text-[var(--color-obsidian)] text-right">{project.value}</span>
                    </div>
                  </div>
                  
                  <p className="body-text text-[var(--color-graphite)] text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            </FadeUp>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-[var(--color-slate)] font-switzer">
              No projects found in this category.
            </div>
          )}
        </div>

        {/* ── LOAD MORE BUTTON ── */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <FadeUp>
              <Button onClick={handleLoadMore} variant="outline" size="lg">
                Load More Projects
              </Button>
            </FadeUp>
          </div>
        )}
      </section>

      {/* ── INTERACTIVE PROJECT EXPLORER ── */}
      <InteractiveProjectExplorer />

      {/* ── LONG-TERM MAINTENANCE EXPERIENCE ── */}
      <section className="bg-bg-main py-16 mt-8 border-t border-silver/30 dark:border-white/10">
        <div className="container mx-auto px-6 max-w-[var(--page-max-width)]">
          <div className="text-center mb-12">
            <FadeUp>
              <TagPill variant="obsidian" className="mb-6">Ongoing Operations</TagPill>
              <h2 className="display text-obsidian dark:text-white mb-6">Long-Term Maintenance Experience</h2>
              <p className="body-text text-graphite dark:text-gray-300 max-w-[800px] mx-auto text-lg leading-relaxed">
                MMTPL has been entrusted with regular refractory maintenance and shutdown services for multiple coke oven facilities at JSW Steel, demonstrating the confidence of leading steel manufacturers in our technical capabilities and service quality.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeUp delay={0.1}>
              <div className="bg-bone dark:bg-[#162033] p-8 rounded-[var(--radius-card)] border border-silver dark:border-white/10 h-full shadow-sm">
                <h3 className="heading-sm text-obsidian dark:text-white mb-6 border-b border-silver dark:border-white/10 pb-4">Maintenance Contracts Executed</h3>
                <ul className="flex flex-col gap-4">
                  {[
                    'Coke Oven (Non-Recovery) – JSW Vijayanagar',
                    'Coke Oven (Non-Recovery) – JSW Vijayanagar',
                    'Coke Oven (Recovery) – JSW Vijayanagar',
                    'Coke Oven (Recovery) – JSW Vijayanagar',
                    'Coke Oven (Recovery) – JSW Ispat Dolvi'
                  ].map((contract, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-lilac-bloom mt-1">•</span>
                      <span className="body-text text-graphite dark:text-gray-300">{contract}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="bg-bone dark:bg-[#162033] p-8 rounded-[var(--radius-card)] border border-silver dark:border-white/10 h-full shadow-sm">
                <h3 className="heading-sm text-obsidian dark:text-white mb-6 border-b border-silver dark:border-white/10 pb-4">Facility Capacities</h3>
                <ul className="flex flex-col gap-4">
                  {[
                    '4 × 32 Ovens + 1 × 5 Ovens + 1 × 6 Ovens',
                    '2 × 39 Ovens + 2 × 31 Ovens',
                    '4 × 56 Ovens',
                    '4 × 72 Ovens',
                    '1 Additional Recovery Coke Oven Battery'
                  ].map((capacity, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-lilac-bloom mt-1">•</span>
                      <span className="body-text text-graphite dark:text-gray-300">{capacity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── PROVEN EXPERTISE CTA ── */}
      <section className="container mx-auto px-6 max-w-[800px] text-center py-12">
        <FadeUp>
          <h2 className="display text-obsidian dark:text-white mb-6">Proven Expertise</h2>
          <p className="body-text text-graphite dark:text-gray-300 text-lg leading-relaxed">
            For more than two decades, MMTPL has consistently delivered high-quality construction, refractory installation, shutdown maintenance, and turnkey industrial solutions for some of the most demanding steel and manufacturing facilities in India. Our proven track record reflects our commitment to engineering excellence, safety, quality, and timely project execution.
          </p>
        </FadeUp>
      </section>

    </div>
  )
}
