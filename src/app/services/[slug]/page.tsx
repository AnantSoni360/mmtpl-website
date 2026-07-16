import { services } from '@/data/services'
import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { TagPill } from '@/components/ui/TagPill'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug)
  
  if (!service) {
    notFound()
  }

  // Find related projects (just filtering by some keyword match or returning top 3)
  const relatedProjects = projects.filter(p => 
    p.category !== 'Overseas' && 
    (p.title.toLowerCase().includes(service.title.split(' ')[0].toLowerCase()) || 
     p.description.toLowerCase().includes(service.title.split(' ')[0].toLowerCase()))
  ).slice(0, 3)

  // If none match specifically, just show some default ones
  const displayProjects = relatedProjects.length > 0 ? relatedProjects : projects.slice(0, 3)

  return (
    <div className="flex flex-col -mt-24 pb-24">
      {/* ── HERO ── */}
      <section className="relative pt-48 pb-24 bg-[#0a1128] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/noise.png')] mix-blend-overlay" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
        </div>
        
        <div className="container mx-auto px-6 max-w-[var(--page-max-width)] relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors mb-8 font-switzer text-sm uppercase tracking-wider">
            <ArrowLeft size={16} /> Back to Services
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <TagPill variant="lilac">{service.category}</TagPill>
            {service.industries?.map(ind => (
              <TagPill key={ind} variant="bone">{ind}</TagPill>
            ))}
          </div>
          
          <h1 className="font-editorial text-4xl md:text-6xl text-white mb-6 max-w-4xl">
            {service.title}
          </h1>
          <p className="text-xl text-blue-100/80 max-w-2xl font-switzer leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2">
            <h2 className="font-editorial text-3xl text-[var(--color-obsidian)] mb-6">Service Overview</h2>
            <div className="prose prose-lg prose-blue max-w-none text-[var(--color-graphite)] font-switzer leading-relaxed mb-12">
              <p>
                MMTPL provides comprehensive {service.title.toLowerCase()} solutions tailored to the unique demands of heavy industrial sectors. With over two decades of experience, our teams are equipped to handle complex scopes, ensuring rapid mobilization and uncompromising quality.
              </p>
              <p>
                {service.description}
              </p>
            </div>

            <h3 className="font-editorial text-2xl text-[var(--color-obsidian)] mb-6">Key Capabilities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {[
                'End-to-end turnkey execution',
                'Adherence to global safety standards',
                'Experienced workforce and engineers',
                'On-time project delivery',
                'Advanced equipment & machinery',
                'Quality assurance & testing'
              ].map((cap, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--color-graphite)]">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-2xl p-8 mb-8">
              <h3 className="font-editorial text-2xl text-[var(--color-obsidian)] mb-4">Need this service?</h3>
              <p className="text-[var(--color-slate)] mb-6 text-sm">
                Connect with our engineering team to discuss your project requirements and timelines.
              </p>
              <Link href="/contact" className="inline-flex w-full justify-center items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-6 py-3.5 rounded-full transition-all">
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED PROJECTS ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] pt-20 border-t border-[var(--color-silver)]">
        <h2 className="font-editorial text-3xl text-[var(--color-obsidian)] mb-10">Related Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProjects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.id}>
              <div className="group bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300">
                <div className="relative h-48">
                  {/* TEMPORARILY HIDDEN PROJECT PHOTOS 
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  */}
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-[var(--color-obsidian)] mb-2 group-hover:text-[#3b82f6] transition-colors">{project.title}</h3>
                  <p className="text-sm text-[var(--color-slate)] line-clamp-2">{project.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
