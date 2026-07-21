import sys

file_path = r"d:\mmtpl website\src\app\ai-prediction\dashboard\page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Import AnimatePresence
content = content.replace("import { motion } from 'framer-motion';", "import { motion, AnimatePresence } from 'framer-motion';")

# 2. Add State and Helper Function
# Find the line: const [result, setResult] = useState<any>(null);
state_injection = """  const [result, setResult] = useState<any>(null);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const generateExplanation = (label: string, count: number) => {
    const w = Number(formData.weight) || 1000;
    const d = Number(formData.duration) || 30;
    const s = Number(formData.shifts) || 1;
    
    if (label.includes('Rigger') || label.includes('Fitter') || label.includes('Fabricator')) {
      return `Handling ${w.toLocaleString()} tons of steel over ${d} days requires intense mechanical alignment and heavy lifting. We allocated ${count} ${label} across ${s} shifts to ensure continuous assembly operations without site bottlenecks.`;
    }
    if (label.includes('Welder') || label.includes('Cutter') || label.includes('Grinder')) {
      return `Based on standard joint-to-tonnage ratios for the ${formData.industry} industry, a significant welding volume is expected. ${count} ${label} are required to meet the daily output needed to finish within the aggressive ${d}-day timeline.`;
    }
    if (label.includes('Crane') || label.includes('Hydra') || label.includes('Lifter') || label.includes('Forklift')) {
      return `The ${formData.contractNature} nature of this project involves moving heavy modules and working at heights. ${count} ${label} were predicted to provide adequate hook coverage across the site while accounting for maintenance downtime.`;
    }
    if (label.includes('Foremen') || label.includes('Engineer') || label.includes('Supervisor') || label.includes('HSE')) {
      return `To maintain strict quality control and safety under a ${formData.risk} risk environment, ${count} ${label} are necessary to oversee the massive workforce and ensure compliance with site standards.`;
    }
    return `To support a ${d}-day ${formData.contractType} contract under ${formData.risk} conditions, ${count} ${label} are optimal to maintain productivity targets and site safety.`;
  };"""
content = content.replace("  const [result, setResult] = useState<any>(null);", state_injection)

# 3. Add onClick to Workforce Gallery
workforce_card_old = 'className="relative group rounded-xl shadow-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow"'
workforce_card_new = 'onClick={() => setSelectedCard(item)} className="cursor-pointer relative group rounded-xl shadow-sm border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow"'
content = content.replace(workforce_card_old, workforce_card_new)

# 4. Add onClick to Equipment Gallery
# It uses the exact same class string, so the replace above might hit both if they are identical.
# Let's ensure both are hit by doing it twice just in case, or replacing all.
# Actually, the string replacement does all occurrences by default.

# 5. Add Modal HTML before the final closing div of the dashboard view
# We need to find the place right after the Action Buttons.
action_buttons_end = """             <button onClick={() => setResult(null)} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md tracking-widest text-sm uppercase transition-all">
                [ New Prediction ]
             </button>
          </motion.div>"""

modal_injection = """             <button onClick={() => setResult(null)} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md tracking-widest text-sm uppercase transition-all">
                [ New Prediction ]
             </button>
          </motion.div>

          {/* Modal */}
          <AnimatePresence>
            {selectedCard && (
              <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }}
                 className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
                 onClick={() => setSelectedCard(null)}
              >
                 <motion.div 
                   initial={{ scale: 0.9, opacity: 0, y: 20 }}
                   animate={{ scale: 1, opacity: 1, y: 0 }}
                   exit={{ scale: 0.9, opacity: 0, y: 20 }}
                   className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-neutral-800 overflow-hidden relative"
                   onClick={(e) => e.stopPropagation()}
                 >
                    <button onClick={() => setSelectedCard(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white">✕</button>
                    
                    <div className={`p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 bg-slate-50 dark:bg-neutral-950 border border-slate-100 dark:border-neutral-800 ${selectedCard.color}`}>
                       <selectedCard.icon size={40} />
                    </div>
                    
                    <h3 className="text-2xl font-black text-center text-slate-900 dark:text-white uppercase tracking-widest">{selectedCard.label}</h3>
                    <div className="text-5xl font-black text-center text-blue-600 my-4">{selectedCard.count.toLocaleString()}</div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800/30">
                       <h4 className="text-xs font-bold text-blue-800 dark:text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Star className="w-4 h-4"/> AI Prediction Rationale</h4>
                       <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {generateExplanation(selectedCard.label, selectedCard.count)}
                       </p>
                    </div>
                 </motion.div>
              </motion.div>
            )}
          </AnimatePresence>"""

content = content.replace(action_buttons_end, modal_injection)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Modal feature added successfully.")
