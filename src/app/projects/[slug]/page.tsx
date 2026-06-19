import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { TagPill } from '@/components/ui/TagPill'
import { ArrowLeft, Building2, MapPin, Calendar, CheckCircle2, Factory } from 'lucide-react'

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  
  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col -mt-24 pb-24">
      {/* ── HERO ── */}
      <section className="relative pt-48 pb-32 bg-[#0a1128] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover scale-105 filter blur-sm brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-[#0a1128]/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 max-w-[var(--page-max-width)] relative z-10">
          <Link href="/projects" className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors mb-8 font-switzer text-sm uppercase tracking-wider">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <TagPill variant="lilac">{project.category}</TagPill>
            <TagPill variant="bone">{project.status}</TagPill>
          </div>
          
          <h1 className="font-editorial text-4xl md:text-6xl text-white mb-6 max-w-4xl">
            {project.title}
          </h1>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Image & Description */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="font-editorial text-3xl text-[var(--color-obsidian)] mb-6">Project Overview</h2>
              <p className="text-[var(--color-graphite)] font-switzer text-lg leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Project Details Sidebar */}
          <div>
            <div className="bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-2xl p-8 sticky top-32 shadow-xl">
              <h3 className="font-editorial text-2xl text-[var(--color-obsidian)] mb-8">Project Details</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-[var(--color-bone)] border border-[var(--color-silver)] text-[#3b82f6]">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-switzer font-medium text-[var(--color-slate)] block mb-1">Client</span>
                    <span className="text-lg font-semibold text-[var(--color-obsidian)]">{project.client}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-[var(--color-bone)] border border-[var(--color-silver)] text-[#3b82f6]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-switzer font-medium text-[var(--color-slate)] block mb-1">Location</span>
                    <span className="text-lg font-semibold text-[var(--color-obsidian)]">{project.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-[var(--color-bone)] border border-[var(--color-silver)] text-[#3b82f6]">
                    <Factory size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-switzer font-medium text-[var(--color-slate)] block mb-1">Project Value</span>
                    <span className="text-lg font-semibold text-[var(--color-obsidian)]">{project.value}</span>
                  </div>
                </div>

                {project.year && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-[var(--color-bone)] border border-[var(--color-silver)] text-[#3b82f6]">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <span className="text-sm font-switzer font-medium text-[var(--color-slate)] block mb-1">Year</span>
                      <span className="text-lg font-semibold text-[var(--color-obsidian)]">{project.year}</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-[var(--color-bone)] border border-[var(--color-silver)] text-[#3b82f6]">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-switzer font-medium text-[var(--color-slate)] block mb-1">Status</span>
                    <span className="text-lg font-semibold text-[var(--color-obsidian)]">{project.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
