import { TagPill } from '@/components/ui/TagPill'
import { FadeUp } from '@/components/motion/FadeUp'
import { Card } from '@/components/ui/Card'
import { ShieldCheck, HardHat, FileCheck2, Activity } from 'lucide-react'

export default function Safety() {
  return (
    <div className="flex flex-col gap-[var(--section-gap)] pb-[var(--section-gap)] pt-12">
      
      {/* ── HERO ── */}
      <section className="container mx-auto px-6 max-w-[800px] text-center">
        <FadeUp delay={0.1}>
          <TagPill variant="bone" className="mb-8">Safety First</TagPill>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className="display-lg text-[var(--color-obsidian)] mb-8">
            Zero Harm Policy
          </h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="body-text text-[var(--color-graphite)] text-lg">
            At MMTPL, we believe that every accident is preventable. Safety is not just a priority; it is a core value integrated into every stage of our project lifecycle.
          </p>
        </FadeUp>
      </section>

      {/* ── STATS GRID ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FadeUp delay={0.1} className="w-full">
            <Card className="text-center h-full flex flex-col items-center justify-center bg-[var(--color-bone)] border-none">
              <ShieldCheck className="w-12 h-12 text-[var(--color-obsidian)] mb-4" strokeWidth={1.5} />
              <div className="display text-[var(--color-obsidian)] mb-2">1.7M+</div>
              <div className="caption text-[var(--color-slate)] uppercase tracking-wider">Safe Man Hours</div>
            </Card>
          </FadeUp>
          <FadeUp delay={0.2} className="w-full">
            <Card className="text-center h-full flex flex-col items-center justify-center bg-[var(--color-paper)] border-[var(--color-silver)]">
              <HardHat className="w-12 h-12 text-[var(--color-obsidian)] mb-4" strokeWidth={1.5} />
              <div className="display text-[var(--color-obsidian)] mb-2">100%</div>
              <div className="caption text-[var(--color-slate)] uppercase tracking-wider">PPE Compliance</div>
            </Card>
          </FadeUp>
          <FadeUp delay={0.3} className="w-full">
            <Card className="text-center h-full flex flex-col items-center justify-center bg-[var(--color-paper)] border-[var(--color-silver)]">
              <Activity className="w-12 h-12 text-[var(--color-obsidian)] mb-4" strokeWidth={1.5} />
              <div className="display text-[var(--color-obsidian)] mb-2">0</div>
              <div className="caption text-[var(--color-slate)] uppercase tracking-wider">Fatalities</div>
            </Card>
          </FadeUp>
          <FadeUp delay={0.4} className="w-full">
            <Card className="text-center h-full flex flex-col items-center justify-center bg-[var(--color-bone)] border-none">
              <FileCheck2 className="w-12 h-12 text-[var(--color-obsidian)] mb-4" strokeWidth={1.5} />
              <div className="display text-[var(--color-obsidian)] mb-2">ISO</div>
              <div className="caption text-[var(--color-slate)] uppercase tracking-wider">45001:2018 Certified</div>
            </Card>
          </FadeUp>
        </div>
      </section>

      {/* ── SAFETY STATISTICS REPORT ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] py-6">
        <FadeUp>
          <div className="bg-white rounded-[var(--radius-card)] border border-[var(--color-silver)] overflow-hidden shadow-sm">
            <div className="bg-[var(--color-obsidian)] p-6 text-center">
              <h2 className="heading-sm text-white m-0">Safety Statistics Report</h2>
              <p className="caption text-gray-300 mt-2 tracking-widest uppercase">Current & Cumulative Record</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--color-bone)] border-b border-[var(--color-silver)]">
                    <th className="p-4 font-switzer font-bold text-[var(--color-obsidian)] uppercase text-sm tracking-wider w-16">Sl. No.</th>
                    <th className="p-4 font-switzer font-bold text-[var(--color-obsidian)] uppercase text-sm tracking-wider">Description</th>
                    <th className="p-4 font-switzer font-bold text-[var(--color-obsidian)] uppercase text-sm tracking-wider text-center w-32">Cumulative</th>
                  </tr>
                </thead>
                <tbody className="body-text text-[var(--color-graphite)] text-sm">
                  <tr className="border-b border-[var(--color-silver)] hover:bg-[var(--color-paper)]">
                    <td className="p-4 text-center font-medium">1</td>
                    <td className="p-4">Total Man hours worked</td>
                    <td className="p-4 text-center font-bold text-[var(--color-obsidian)]">1,705,785</td>
                  </tr>
                  <tr className="border-b border-[var(--color-silver)] hover:bg-[var(--color-paper)]">
                    <td className="p-4 text-center font-medium">2</td>
                    <td className="p-4">Total Number of People Worked (Current Month)</td>
                    <td className="p-4 text-center font-bold text-[var(--color-obsidian)]">272</td>
                  </tr>
                  <tr className="border-b border-[var(--color-silver)] hover:bg-[var(--color-paper)]">
                    <td className="p-4 text-center font-medium">3</td>
                    <td className="p-4">Number of First Aid Cases</td>
                    <td className="p-4 text-center font-bold text-green-600">NIL</td>
                  </tr>
                  <tr className="border-b border-[var(--color-silver)] hover:bg-[var(--color-paper)]">
                    <td className="p-4 text-center font-medium">4</td>
                    <td className="p-4">Lost Time Injury (LTI) & Fatalities</td>
                    <td className="p-4 text-center font-bold text-green-600">NIL</td>
                  </tr>
                  <tr className="border-b border-[var(--color-silver)] hover:bg-[var(--color-paper)]">
                    <td className="p-4 text-center font-medium">5</td>
                    <td className="p-4">Number of Near Miss Recorded</td>
                    <td className="p-4 text-center font-bold text-[var(--color-obsidian)]">9</td>
                  </tr>
                  <tr className="border-b border-[var(--color-silver)] hover:bg-[var(--color-paper)]">
                    <td className="p-4 text-center font-medium">6</td>
                    <td className="p-4">Total no. of employees imparted HSE Training</td>
                    <td className="p-4 text-center font-bold text-[var(--color-obsidian)]">323</td>
                  </tr>
                  <tr className="border-b border-[var(--color-silver)] hover:bg-[var(--color-paper)]">
                    <td className="p-4 text-center font-medium">7</td>
                    <td className="p-4">Total no. of Training hours</td>
                    <td className="p-4 text-center font-bold text-[var(--color-obsidian)]">1,436</td>
                  </tr>
                  <tr className="border-b border-[var(--color-silver)] hover:bg-[var(--color-paper)]">
                    <td className="p-4 text-center font-medium">8</td>
                    <td className="p-4">Number of HSE Site inspection / Audits performed</td>
                    <td className="p-4 text-center font-bold text-[var(--color-obsidian)]">36</td>
                  </tr>
                  <tr className="border-b border-[var(--color-silver)] hover:bg-[var(--color-paper)]">
                    <td className="p-4 text-center font-medium">9</td>
                    <td className="p-4">Number of Safety meetings conducted</td>
                    <td className="p-4 text-center font-bold text-[var(--color-obsidian)]">24</td>
                  </tr>
                  <tr className="hover:bg-[var(--color-paper)]">
                    <td className="p-4 text-center font-medium">10</td>
                    <td className="p-4">Lost Time Injury Frequency (LTIF)</td>
                    <td className="p-4 text-center font-bold text-green-600">NIL</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </FadeUp>
      </section>
      
      {/* ── QUALITY COMMITMENT ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] py-12">
        <div className="bg-[var(--color-paper)] p-10 md:p-16 rounded-[var(--radius-card)] border border-[var(--color-silver)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-sky-veil)] opacity-10 rounded-full blur-3xl pointer-events-none" />
          <FadeUp>
            <h2 className="display text-[var(--color-obsidian)] mb-6">Quality Commitment</h2>
            <p className="body-text text-[var(--color-graphite)] text-lg mb-8 leading-relaxed max-w-[800px]">
              MMTPL Group is committed to providing construction services that conform to international standards and meet customer requirements, ensuring complete satisfaction.
            </p>
          </FadeUp>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeUp delay={0.1}>
              <h3 className="subheading text-[var(--color-obsidian)] mb-4">Our Objectives</h3>
              <ul className="flex flex-col gap-3 body-text text-[var(--color-slate)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-lilac-bloom)] mt-1">✓</span>
                  To periodically review and improve processes for continuous and sustainable development.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-lilac-bloom)] mt-1">✓</span>
                  To enhance the effectiveness of the Quality Management System by setting and reviewing quality objectives focused on customer satisfaction and cost efficiency.
                </li>
              </ul>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h3 className="subheading text-[var(--color-obsidian)] mb-4">How We Accomplish This</h3>
              <ul className="flex flex-col gap-3 body-text text-[var(--color-slate)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-lilac-bloom)] mt-1">✓</span> Deploying trained manpower for the job.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-lilac-bloom)] mt-1">✓</span> Establishing good teamwork and adopting efficient and safe work practices.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-lilac-bloom)] mt-1">✓</span> Maintaining machines & equipment in good condition.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-lilac-bloom)] mt-1">✓</span> Ensuring supply of Human & Material resources well in advance.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-lilac-bloom)] mt-1">✓</span> Enhancing Process performance through continuous monitoring.
                </li>
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── SAFETY COMMITMENT ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] py-12">
        <div className="bg-[var(--color-obsidian)] p-10 md:p-16 rounded-[var(--radius-card)] relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-lilac-bloom)] opacity-10 rounded-full blur-3xl pointer-events-none" />
          <FadeUp>
            <h2 className="display text-white mb-6">Safety Environment</h2>
            <p className="body-text text-gray-300 text-lg mb-8 leading-relaxed max-w-[800px]">
              MMTPL Group is committed to ensuring a healthy and safe environment for all concerned by enforcing a strict "Zero Accident" culture. We achieve this through:
            </p>
          </FadeUp>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
            {[
              "Providing regular safety training, toolbox talks, and emergency response drills to all employees and subcontractors.",
              "Ensuring strict use of personal protective equipment (PPE) at all work sites.",
              "Conducting periodic safety audits, inspections, and hazard identification studies.",
              "Promoting a 'Zero Accident' culture through proactive reporting and corrective actions.",
              "Establishing clear safety procedures and safe work method statements for all critical activities.",
              "Ensuring proper permit-to-work systems for high-risk jobs (hot work, confined space, working at height).",
              "Maintaining well-equipped first-aid facilities and trained emergency response teams.",
              "Encouraging employee participation in safety programs and continuous improvement initiatives."
            ].map((text, i) => (
              <FadeUp key={i} delay={0.1 * i} className="flex items-start gap-4">
                <div className="min-w-6 min-h-6 rounded-full bg-[var(--color-lilac-bloom)] flex items-center justify-center mt-1">
                  <span className="text-[var(--color-obsidian)] text-xs font-bold">✓</span>
                </div>
                <p className="body-text text-gray-400">{text}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
