'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, Activity, ArrowRight, ShieldCheck, Download, 
  AlertTriangle, Clock, Wrench, IndianRupee, HardHat, Star
} from 'lucide-react';

export default function PredictionDashboard() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [formData, setFormData] = useState({
    industry: 'Steel',
    unitType: 'Blast Furnace',
    location: 'Bellary, Karnataka',
    repeatClient: 'Yes',
    contractType: 'Fabrication & Erection',
    contractNature: 'New Installation',
    scope: 'Erection of major blast furnace steel structures',
    weight: '12000',
    contractValue: '8000',
    duration: '400',
    shifts: '2',
    distance: '1150',
    risk: 'High',
    season: 'Monsoon'
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitPrediction = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 border-b border-slate-200 pb-2">Step 1 — Project Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Client Industry</label>
                <select name="industry" value={formData.industry} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Steel</option>
                  <option>Cement</option>
                  <option>Power</option>
                  <option>Mining</option>
                  <option>Infrastructure</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Plant Unit Type</label>
                <select name="unitType" value={formData.unitType} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Coke Oven</option>
                  <option>Blast Furnace</option>
                  <option>Cement Kiln</option>
                  <option>Power Plant</option>
                  <option>Rolling Mill</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Plant Location (City/State)</label>
                <input name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Bellary, Karnataka" className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Repeat Client?</label>
                <select name="repeatClient" value={formData.repeatClient} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 border-b border-slate-200 pb-2">Step 2 — Contract Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Contract Type</label>
                <select name="contractType" value={formData.contractType} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Installation</option>
                  <option>Fabrication & Erection</option>
                  <option>Mechanical Erection</option>
                  <option>Piping</option>
                  <option>Maintenance</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Contract Nature</label>
                <select name="contractNature" value={formData.contractNature} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>New Installation</option>
                  <option>Expansion</option>
                  <option>Revamp</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-slate-600">Project Scope (Optional summary)</label>
                <textarea name="scope" value={formData.scope} onChange={handleInputChange} placeholder="Describe the project scope..." rows={3} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 border-b border-slate-200 pb-2">Step 3 — Project Scale</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Estimated Equipment Weight (Tons)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Estimated Contract Value (INR Lakhs)</label>
                <input type="number" name="contractValue" value={formData.contractValue} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Planned Duration (Days)</label>
                <input type="number" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Planned Daily Shifts</label>
                <select name="shifts" value={formData.shifts} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 border-b border-slate-200 pb-2">Step 4 — Operational Conditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Distance from Base (KM)</label>
                <input type="number" name="distance" value={formData.distance} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Start Season</label>
                <select name="season" value={formData.season} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Winter</option>
                  <option>Summer</option>
                  <option>Monsoon</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-slate-600">Safety Risk Level</label>
                <select name="risk" value={formData.risk} onChange={handleInputChange} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="Low">Low - Standard</option>
                  <option value="Medium">Medium - Heavy equipment</option>
                  <option value="High">High - Hazardous</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 border-b border-slate-200 pb-2">Review Project Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm bg-white p-6 rounded-lg border border-slate-200">
              <div><span className="text-slate-500">Industry:</span> <span className="text-slate-900">{formData.industry}</span></div>
              <div><span className="text-slate-500">Plant Unit:</span> <span className="text-slate-900">{formData.unitType}</span></div>
              <div><span className="text-slate-500">Contract Type:</span> <span className="text-slate-900">{formData.contractType}</span></div>
              <div><span className="text-slate-500">Project Size:</span> <span className="text-slate-900">{formData.weight} Tons</span></div>
              <div><span className="text-slate-500">Contract Value:</span> <span className="text-slate-900">₹{formData.contractValue} Lakhs</span></div>
              <div><span className="text-slate-500">Duration:</span> <span className="text-slate-900">{formData.duration} Days</span></div>
            </div>
          </motion.div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/5 blur-[120px] rounded-full" />
        <div className="text-center space-y-8 z-10 relative">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            <Activity className="absolute inset-0 m-auto w-8 h-8 text-blue-400 animate-pulse" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 tracking-widest animate-pulse">GENERATING FEASIBILITY REPORT...</h2>
            <div className="text-slate-600 text-sm space-y-2">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>✓ Processing 7-Tier Multi-Model Engine</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>✓ Predicting granular workforce & equipment</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>✓ Analyzing safety & business potential</motion.p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-900 font-sans border-t-4 border-blue-600">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-6">
          
          {/* Header Block */}
          <motion.div variants={itemVariants} className="text-center space-y-4 mb-8">
             <h1 className="text-4xl font-black tracking-widest text-slate-900 border-b-2 border-slate-200 pb-4 uppercase">
               AI Project Feasibility Report
             </h1>
             <div className="flex flex-col items-center gap-2">
               <p className="text-slate-500 text-sm tracking-widest font-bold uppercase">PROJECT SCALE</p>
               <p className="text-blue-400 text-lg font-medium">{result.project_scale.scale_text}</p>
             </div>
          </motion.div>

          {/* The Executive Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
             {/* Workforce & Equipment */}
             <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg">
                <Users className="w-8 h-8 text-blue-400 mb-3" />
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">WORKFORCE</div>
                <div className="text-3xl font-black text-slate-900">{result.workforce.total} <span className="text-lg text-slate-600">People</span></div>
             </div>
             <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg">
                <Wrench className="w-8 h-8 text-indigo-400 mb-3" />
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">EQUIPMENT</div>
                <div className="text-3xl font-black text-slate-900">{result.equipment.total_units} <span className="text-lg text-slate-600">Units</span></div>
             </div>

             {/* Cost & Duration */}
             <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg">
                <IndianRupee className="w-8 h-8 text-emerald-400 mb-3" />
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">COST</div>
                <div className="text-3xl font-black text-slate-900">₹{result.cost.predicted_cost_cr} <span className="text-lg text-slate-600">Cr</span></div>
             </div>
             <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg">
                <Clock className="w-8 h-8 text-orange-400 mb-3" />
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">DURATION</div>
                <div className="text-3xl font-black text-slate-900">{result.schedule.predicted_days} <span className="text-lg text-slate-600">Days</span></div>
             </div>

             {/* Risk & Safety */}
             <div className={`border rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg ${result.risk.delay_level === 'HIGH' ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'}`}>
                <AlertTriangle className={`w-8 h-8 mb-3 ${result.risk.delay_level === 'HIGH' ? 'text-red-400' : 'text-orange-400'}`} />
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">DELAY RISK</div>
                <div className={`text-3xl font-black ${result.risk.delay_level === 'HIGH' ? 'text-red-400' : 'text-orange-400'}`}>{result.risk.delay_level}</div>
                <div className="text-sm text-slate-600 font-bold mt-1">{result.risk.delay_prob}% Probability</div>
             </div>
             <div className={`border rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg ${result.safety.level === 'HIGH' ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'}`}>
                <HardHat className={`w-8 h-8 mb-3 ${result.safety.level === 'HIGH' ? 'text-red-400' : 'text-emerald-400'}`} />
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">SAFETY RISK</div>
                <div className={`text-3xl font-black ${result.safety.level === 'HIGH' ? 'text-red-400' : 'text-emerald-400'}`}>{result.safety.level}</div>
                <div className="text-sm text-slate-600 font-bold mt-1">{result.safety.incidents} Expected Events</div>
             </div>
          </motion.div>

          <div className="py-6 border-b border-slate-200"></div>

          {/* Detailed Resource Breakdown */}
          <motion.div variants={itemVariants} className="space-y-6">
             <h2 className="text-xl font-bold tracking-widest text-slate-900 text-center uppercase">Resource Breakdown</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Workforce Gallery */}
                <div className="bg-slate-50 border-slate-200 shadow-sm border border-slate-200 rounded-lg p-6">
                   <div className="text-sm font-bold text-slate-600 border-b border-slate-200 pb-3 mb-6 uppercase tracking-wider flex items-center gap-2">
                     <span>👷 Workforce Gallery (Total: {result.workforce.total})</span>
                   </div>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { label: 'Riggers', count: result.workforce.riggers, img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=150&h=150&fit=crop' },
                        { label: 'Fitters', count: result.workforce.fitters, img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=150&h=150&fit=crop' },
                        { label: 'Rect. Welders', count: result.workforce.welders_rectifier, img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&h=150&fit=crop' },
                        { label: 'SAW Welders', count: result.workforce.welders_saw, img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&h=150&fit=crop' },
                        { label: 'MIG Welders', count: result.workforce.welders_mig, img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&h=150&fit=crop' },
                        { label: 'Gas Cutters', count: result.workforce.gas_cutters, img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=150&h=150&fit=crop' },
                        { label: 'Grinders', count: result.workforce.grinders, img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=150&h=150&fit=crop' },
                        { label: 'Fabricators', count: result.workforce.fabricators, img: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=150&h=150&fit=crop' },
                        { label: 'Electricians', count: result.workforce.electricians, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&h=150&fit=crop' },
                        { label: 'Pipefitters', count: result.workforce.pipefitters, img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=150&h=150&fit=crop' },
                        { label: 'Helpers', count: result.workforce.helpers, img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=150&h=150&fit=crop' },
                        { label: 'Foremen', count: result.workforce.foremen, img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=150&h=150&fit=crop' },
                        { label: 'Engineers', count: result.workforce.engineers, img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop' },
                        { label: 'Supervisors', count: result.workforce.supervisors, img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=150&h=150&fit=crop' },
                        { label: 'HSE Officers', count: result.workforce.hse_officers, img: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=150&h=150&fit=crop' },
                        { label: 'Crane Ops', count: result.workforce.crane_operators, img: 'https://images.unsplash.com/photo-1588557132645-ff567110cafd?w=150&h=150&fit=crop' }
                      ].filter(w => w.count > 0).map((item, idx) => (
                         <motion.div 
                            key={item.label}
                            whileHover={{ scale: 1.05, y: -5 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + (idx * 0.05), type: "spring", stiffness: 200 }}
                            className="relative group rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-white aspect-square flex flex-col items-center justify-center"
                         >
                            <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                            <div className="relative z-10 flex flex-col items-center text-center p-2 mt-auto pb-4">
                               <motion.span 
                                  initial={{ y: 10, opacity: 0 }} 
                                  animate={{ y: 0, opacity: 1 }} 
                                  transition={{ delay: 0.6 + (idx * 0.05) }}
                                  className="text-3xl font-black text-slate-900"
                               >
                                  {item.count}
                               </motion.span>
                               <span className="text-[10px] font-bold tracking-widest uppercase text-blue-700 mt-1">{item.label}</span>
                            </div>
                         </motion.div>
                      ))}
                   </div>
                </div>

                {/* Equipment Gallery */}
                <div className="bg-slate-50 border-slate-200 shadow-sm border border-slate-200 rounded-lg p-6">
                   <div className="text-sm font-bold text-slate-600 border-b border-slate-200 pb-3 mb-6 uppercase tracking-wider flex items-center gap-2">
                     <span>🚜 Equipment Gallery (Total: {result.equipment.total_units})</span>
                   </div>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { label: '300T Cranes', count: result.equipment.crane_300t, img: 'https://images.unsplash.com/photo-1588557132645-ff567110cafd?w=150&h=150&fit=crop' },
                        { label: '150T Cranes', count: result.equipment.crane_150t, img: 'https://images.unsplash.com/photo-1588557132645-ff567110cafd?w=150&h=150&fit=crop' },
                        { label: '80T Cranes', count: result.equipment.crane_80t, img: 'https://images.unsplash.com/photo-1588557132645-ff567110cafd?w=150&h=150&fit=crop' },
                        { label: '50T Cranes', count: result.equipment.crane_50t, img: 'https://images.unsplash.com/photo-1588557132645-ff567110cafd?w=150&h=150&fit=crop' },
                        { label: '15T Hydras', count: result.equipment.hydras_15t, img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=150&h=150&fit=crop' },
                        { label: 'Man Lifter 120ft', count: result.equipment.man_lifter_120ft, img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=150&h=150&fit=crop' },
                        { label: 'Man Lifter 80ft', count: result.equipment.man_lifter_80ft, img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=150&h=150&fit=crop' },
                        { label: 'Forklifts', count: result.equipment.forklifts, img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=150&h=150&fit=crop' },
                        { label: 'Rectifiers', count: result.equipment.rectifier_machines, img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&h=150&fit=crop' },
                        { label: 'SAW Units', count: result.equipment.saw_machines, img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&h=150&fit=crop' },
                        { label: 'MIG Units', count: result.equipment.mig_machines, img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&h=150&fit=crop' },
                        { label: 'Scaffolding', count: result.equipment.scaffold_pipes, img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=150&h=150&fit=crop' }
                      ].filter(e => e.count > 0).map((item, idx) => (
                         <motion.div 
                            key={item.label}
                            whileHover={{ scale: 1.05, y: -5 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + (idx * 0.05), type: "spring", stiffness: 200 }}
                            className="relative group rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-white aspect-square flex flex-col items-center justify-center"
                         >
                            <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                            <div className="relative z-10 flex flex-col items-center text-center p-2 mt-auto pb-4">
                               <motion.span 
                                  initial={{ y: 10, opacity: 0 }} 
                                  animate={{ y: 0, opacity: 1 }} 
                                  transition={{ delay: 0.8 + (idx * 0.05) }}
                                  className="text-3xl font-black text-slate-900"
                               >
                                  {item.count.toLocaleString()}
                               </motion.span>
                               <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700 mt-1">{item.label}</span>
                            </div>
                         </motion.div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>

          <div className="py-6 border-b border-slate-200"></div>

          {/* Business Outlook */}
          <motion.div variants={itemVariants} className="space-y-6">
             <h2 className="text-xl font-bold tracking-widest text-slate-900 text-center uppercase">Business Outlook</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-lg">
                   <Star className="w-6 h-6 text-yellow-500 mx-auto mb-3" />
                   <div className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-2">Client Satisfaction</div>
                   <div className="text-3xl font-black text-slate-900">{result.business.csat} <span className="text-lg text-slate-500">/ 10</span></div>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-lg">
                   <Activity className="w-6 h-6 text-emerald-500 mx-auto mb-3" />
                   <div className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-2">Repeat Order Probability</div>
                   <div className="text-3xl font-black text-emerald-400">{result.business.repeat_prob}%</div>
                </div>
             </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center gap-4 pt-8">
             <button onClick={() => window.print()} className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-slate-900 font-bold rounded shadow-lg tracking-widest text-sm uppercase transition-colors">
                [ Download Project Report ]
             </button>
             <button onClick={() => setResult(null)} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-slate-900 font-bold rounded shadow-lg tracking-widest text-sm uppercase transition-colors">
                [ New Prediction ]
             </button>
          </motion.div>

        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl w-full z-10">
        
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-semibold text-slate-500 mb-3 px-1 tracking-wide uppercase">
            <span className={step >= 1 ? 'text-blue-400' : ''}>Profile</span>
            <span className={step >= 2 ? 'text-blue-400' : ''}>Details</span>
            <span className={step >= 3 ? 'text-blue-400' : ''}>Scale</span>
            <span className={step >= 4 ? 'text-blue-400' : ''}>Conditions</span>
            <span className={step === 5 ? 'text-blue-400' : ''}>Review</span>
          </div>
          <div className="h-2 w-full bg-white rounded-full overflow-hidden shadow-inner border border-slate-200/50">
            <div className="h-full bg-blue-600 transition-all duration-500 ease-out" style={{ width: `${(step / 5) * 100}%` }}></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-2xl">
          {renderFormStep()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-slate-200/80">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-white hover:bg-neutral-800 rounded-xl border border-slate-200">
                Back
              </button>
            ) : (
              <Link href="/ai-prediction" className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                Cancel
              </Link>
            )}

            {step < 5 ? (
              <button onClick={() => setStep(step + 1)} className="group flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-slate-900 text-sm font-semibold rounded-xl hover:bg-blue-500 transition-all shadow-[0_4px_15px_-3px_rgba(37,99,235,0.4)]">
                Next Step
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button onClick={submitPrediction} className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-slate-900 text-sm font-semibold rounded-xl hover:bg-blue-500 transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)] hover:shadow-[0_0_40px_-5px_rgba(37,99,235,0.8)]">
                <Activity className="w-4 h-4" /> GENERATE REPORT
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
