'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, Activity, ArrowRight, ShieldCheck, Download, 
  AlertTriangle, Clock, Wrench, IndianRupee, HardHat, Star,
  Zap, Flame, Hammer, Eye, ClipboardList, PlusSquare, ArrowUpCircle, Truck, BatteryCharging, LayoutGrid, CircleDot, Anchor, Compass
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

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
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-neutral-800 pb-2">Step 1 — Project Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Client Industry</label>
                <select name="industry" value={formData.industry} onChange={handleInputChange} className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Steel</option>
                  <option>Cement</option>
                  <option>Power</option>
                  <option>Mining</option>
                  <option>Infrastructure</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Plant Unit Type</label>
                <select name="unitType" value={formData.unitType} onChange={handleInputChange} className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Coke Oven</option>
                  <option>Blast Furnace</option>
                  <option>Cement Kiln</option>
                  <option>Power Plant</option>
                  <option>Rolling Mill</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Plant Location (City/State)</label>
                <input name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Bellary, Karnataka" className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Repeat Client?</label>
                <select name="repeatClient" value={formData.repeatClient} onChange={handleInputChange} className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
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
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-neutral-800 pb-2">Step 2 — Contract Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Contract Type</label>
                <select name="contractType" value={formData.contractType} onChange={handleInputChange} className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Installation</option>
                  <option>Fabrication & Erection</option>
                  <option>Mechanical Erection</option>
                  <option>Piping</option>
                  <option>Maintenance</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Contract Nature</label>
                <select name="contractNature" value={formData.contractNature} onChange={handleInputChange} className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>New Installation</option>
                  <option>Expansion</option>
                  <option>Revamp</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Project Scope (Optional summary)</label>
                <textarea name="scope" value={formData.scope} onChange={handleInputChange} placeholder="Describe the project scope..." rows={3} className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-neutral-800 pb-2">Step 3 — Project Scale</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Estimated Equipment Weight (Tons)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Estimated Contract Value (INR Lakhs)</label>
                <input type="number" name="contractValue" value={formData.contractValue} onChange={handleInputChange} className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Planned Duration (Days)</label>
                <input type="number" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Planned Daily Shifts</label>
                <select name="shifts" value={formData.shifts} onChange={handleInputChange} className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
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
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-neutral-800 pb-2">Step 4 — Operational Conditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Distance from Base (KM)</label>
                <input type="number" name="distance" value={formData.distance} onChange={handleInputChange} className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Start Season</label>
                <select name="season" value={formData.season} onChange={handleInputChange} className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Winter</option>
                  <option>Summer</option>
                  <option>Monsoon</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-slate-600 dark:text-neutral-400">Safety Risk Level</label>
                <select name="risk" value={formData.risk} onChange={handleInputChange} className="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
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
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-neutral-800 pb-2">Review Project Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm bg-white dark:bg-neutral-900 p-6 rounded-lg border border-slate-200 dark:border-neutral-800">
              <div><span className="text-slate-500 dark:text-neutral-400">Industry:</span> <span className="text-slate-900 dark:text-white">{formData.industry}</span></div>
              <div><span className="text-slate-500 dark:text-neutral-400">Plant Unit:</span> <span className="text-slate-900 dark:text-white">{formData.unitType}</span></div>
              <div><span className="text-slate-500 dark:text-neutral-400">Contract Type:</span> <span className="text-slate-900 dark:text-white">{formData.contractType}</span></div>
              <div><span className="text-slate-500 dark:text-neutral-400">Project Size:</span> <span className="text-slate-900 dark:text-white">{formData.weight} Tons</span></div>
              <div><span className="text-slate-500 dark:text-neutral-400">Contract Value:</span> <span className="text-slate-900 dark:text-white">₹{formData.contractValue} Lakhs</span></div>
              <div><span className="text-slate-500 dark:text-neutral-400">Duration:</span> <span className="text-slate-900 dark:text-white">{formData.duration} Days</span></div>
            </div>
          </motion.div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/5 blur-[120px] rounded-full" />
        <div className="text-center space-y-8 z-10 relative">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            <Activity className="absolute inset-0 m-auto w-8 h-8 text-blue-400 animate-pulse" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-widest animate-pulse">GENERATING FEASIBILITY REPORT...</h2>
            <div className="text-slate-600 dark:text-neutral-400 text-sm space-y-2">
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

    const workforceChartData = [
      { name: 'Welders', value: result.workforce.welders_rectifier + result.workforce.welders_saw + result.workforce.welders_mig, color: '#f97316' },
      { name: 'Fitters/Riggers', value: result.workforce.riggers + result.workforce.fitters + result.workforce.pipefitters, color: '#3b82f6' },
      { name: 'Fabricators/Cutters', value: result.workforce.fabricators + result.workforce.gas_cutters + result.workforce.grinders, color: '#10b981' },
      { name: 'Mgmt/Engineers', value: result.workforce.foremen + result.workforce.engineers + result.workforce.supervisors + result.workforce.hse_officers, color: '#a855f7' },
      { name: 'Others', value: result.workforce.helpers + result.workforce.electricians + result.workforce.crane_operators, color: '#64748b' }
    ].filter(d => d.value > 0);

    const equipmentChartData = [
      { name: 'Heavy Cranes', count: result.equipment.crane_300t + result.equipment.crane_150t + result.equipment.crane_80t + result.equipment.crane_50t },
      { name: 'Lifting (Light)', count: result.equipment.hydras_15t + result.equipment.man_lifter_120ft + result.equipment.man_lifter_80ft + result.equipment.forklifts },
      { name: 'Welding Units', count: result.equipment.rectifier_machines + result.equipment.saw_machines + result.equipment.mig_machines }
    ].filter(d => d.count > 0);

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 p-6 md:p-12 text-slate-900 dark:text-white font-sans border-t-4 border-blue-600">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-6">
          
          {/* Header Block */}
          <motion.div variants={itemVariants} className="text-center space-y-4 mb-8">
             <h1 className="text-4xl font-black tracking-widest text-slate-900 dark:text-white border-b-2 border-slate-200 dark:border-neutral-800 pb-4 uppercase">
               AI Project Feasibility Report
             </h1>
             <div className="flex flex-col items-center gap-2">
               <p className="text-slate-500 dark:text-neutral-400 text-sm tracking-widest font-bold uppercase">PROJECT SCALE</p>
               <p className="text-blue-400 text-lg font-medium">{result.project_scale.scale_text}</p>
             </div>
          </motion.div>

          {/* The Executive Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
             {/* Workforce & Equipment */}
             <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg">
                <Users className="w-8 h-8 text-blue-400 mb-3" />
                <div className="text-xs text-slate-500 dark:text-neutral-400 uppercase tracking-widest font-bold mb-1">WORKFORCE</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{result.workforce.total} <span className="text-lg text-slate-600 dark:text-neutral-400">People</span></div>
             </div>
             <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg">
                <Wrench className="w-8 h-8 text-indigo-400 mb-3" />
                <div className="text-xs text-slate-500 dark:text-neutral-400 uppercase tracking-widest font-bold mb-1">EQUIPMENT</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{result.equipment.total_units} <span className="text-lg text-slate-600 dark:text-neutral-400">Units</span></div>
             </div>

             {/* Cost & Duration */}
             <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg">
                <IndianRupee className="w-8 h-8 text-emerald-400 mb-3" />
                <div className="text-xs text-slate-500 dark:text-neutral-400 uppercase tracking-widest font-bold mb-1">COST</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">₹{result.cost.predicted_cost_cr} <span className="text-lg text-slate-600 dark:text-neutral-400">Cr</span></div>
             </div>
             <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg">
                <Clock className="w-8 h-8 text-orange-400 mb-3" />
                <div className="text-xs text-slate-500 dark:text-neutral-400 uppercase tracking-widest font-bold mb-1">DURATION</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{result.schedule.predicted_days} <span className="text-lg text-slate-600 dark:text-neutral-400">Days</span></div>
             </div>

             {/* Risk & Safety */}
             <div className={`border rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg ${result.risk.delay_level === 'HIGH' ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50' : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800'}`}>
                <AlertTriangle className={`w-8 h-8 mb-3 ${result.risk.delay_level === 'HIGH' ? 'text-red-400' : 'text-orange-400'}`} />
                <div className="text-xs text-slate-500 dark:text-neutral-400 uppercase tracking-widest font-bold mb-1">DELAY RISK</div>
                <div className={`text-3xl font-black ${result.risk.delay_level === 'HIGH' ? 'text-red-400' : 'text-orange-400'}`}>{result.risk.delay_level}</div>
                <div className="text-sm text-slate-600 dark:text-neutral-400 font-bold mt-1">{result.risk.delay_prob}% Probability</div>
             </div>
             <div className={`border rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg ${result.safety.level === 'HIGH' ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50' : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800'}`}>
                <HardHat className={`w-8 h-8 mb-3 ${result.safety.level === 'HIGH' ? 'text-red-400' : 'text-emerald-400'}`} />
                <div className="text-xs text-slate-500 dark:text-neutral-400 uppercase tracking-widest font-bold mb-1">SAFETY RISK</div>
                <div className={`text-3xl font-black ${result.safety.level === 'HIGH' ? 'text-red-400' : 'text-emerald-400'}`}>{result.safety.level}</div>
                <div className="text-sm text-slate-600 dark:text-neutral-400 font-bold mt-1">{result.safety.incidents} Expected Events</div>
             </div>
          </motion.div>

          <div className="py-6 border-b border-slate-200 dark:border-neutral-800"></div>

          {/* Detailed Resource Breakdown */}
          <motion.div variants={itemVariants} className="space-y-6">
             <h2 className="text-xl font-bold tracking-widest text-slate-900 dark:text-white text-center uppercase">Resource Breakdown</h2>
             
             {/* Interactive Visualizations */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm">
                   <div className="text-sm font-bold text-slate-600 dark:text-neutral-400 border-b border-slate-200 dark:border-neutral-800 pb-3 mb-6 uppercase tracking-wider flex items-center gap-2">
                     <span>📊 Workforce Composition</span>
                   </div>
                   <div className="h-64 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                         <Pie data={workforceChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} stroke="none" label>
                           {workforceChartData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                         </Pie>
                         <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                       </PieChart>
                     </ResponsiveContainer>
                   </div>
                </div>
                <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm">
                   <div className="text-sm font-bold text-slate-600 dark:text-neutral-400 border-b border-slate-200 dark:border-neutral-800 pb-3 mb-6 uppercase tracking-wider flex items-center gap-2">
                     <span>📈 Core Equipment Clusters</span>
                   </div>
                   <div className="h-64 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={equipmentChartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                         <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                         <XAxis type="number" />
                         <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 11, fill: '#475569' }} />
                         <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                         <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={25} />
                       </BarChart>
                     </ResponsiveContainer>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Workforce Gallery */}
                <div className="bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 shadow-sm border border-slate-200 dark:border-neutral-800 rounded-lg p-6">
                   <div className="text-sm font-bold text-slate-600 dark:text-neutral-400 border-b border-slate-200 dark:border-neutral-800 pb-3 mb-6 uppercase tracking-wider flex items-center gap-2">
                     <span>👷 Workforce Gallery (Total: {result.workforce.total})</span>
                   </div>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { label: 'Riggers', count: result.workforce.riggers, icon: Anchor, color: 'text-blue-500' },
                        { label: 'Fitters', count: result.workforce.fitters, icon: Wrench, color: 'text-indigo-500' },
                        { label: 'Rect. Welders', count: result.workforce.welders_rectifier, icon: Flame, color: 'text-orange-500' },
                        { label: 'SAW Welders', count: result.workforce.welders_saw, icon: Flame, color: 'text-orange-400' },
                        { label: 'MIG Welders', count: result.workforce.welders_mig, icon: Flame, color: 'text-orange-600' },
                        { label: 'Gas Cutters', count: result.workforce.gas_cutters, icon: Zap, color: 'text-red-500' },
                        { label: 'Grinders', count: result.workforce.grinders, icon: CircleDot, color: 'text-yellow-600' },
                        { label: 'Fabricators', count: result.workforce.fabricators, icon: Hammer, color: 'text-emerald-500' },
                        { label: 'Electricians', count: result.workforce.electricians, icon: Zap, color: 'text-yellow-400' },
                        { label: 'Pipefitters', count: result.workforce.pipefitters, icon: Wrench, color: 'text-cyan-500' },
                        { label: 'Helpers', count: result.workforce.helpers, icon: Users, color: 'text-slate-500 dark:text-neutral-400' },
                        { label: 'Foremen', count: result.workforce.foremen, icon: HardHat, color: 'text-purple-500' },
                        { label: 'Engineers', count: result.workforce.engineers, icon: Compass, color: 'text-purple-600' },
                        { label: 'Supervisors', count: result.workforce.supervisors, icon: ClipboardList, color: 'text-purple-400' },
                        { label: 'HSE Officers', count: result.workforce.hse_officers, icon: PlusSquare, color: 'text-green-500' },
                        { label: 'Crane Ops', count: result.workforce.crane_operators, icon: ArrowUpCircle, color: 'text-sky-500' }
                      ].filter(w => w.count > 0).map((item, idx) => (
                         <motion.div 
                            key={item.label}
                            whileHover={{ scale: 1.05, y: -5 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + (idx * 0.05), type: "spring", stiffness: 200 }}
                            className="relative group rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 aspect-square flex flex-col items-center justify-center"
                         >
                            <div className={`p-3 rounded-full bg-slate-50 dark:bg-neutral-950 border border-slate-100 dark:border-neutral-800 mb-2 ${item.color}`}>
                               <item.icon size={28} />
                            </div>
                            <div className="flex flex-col items-center text-center">
                               <motion.span 
                                  initial={{ y: 10, opacity: 0 }} 
                                  animate={{ y: 0, opacity: 1 }} 
                                  transition={{ delay: 0.6 + (idx * 0.05) }}
                                  className="text-3xl font-black text-slate-900 dark:text-white"
                               >
                                  {item.count}
                               </motion.span>
                               <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 dark:text-neutral-400 mt-1">{item.label}</span>
                            </div>
                         </motion.div>
                      ))}
                   </div>
                </div>

                {/* Equipment Gallery */}
                <div className="bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 shadow-sm border border-slate-200 dark:border-neutral-800 rounded-lg p-6">
                   <div className="text-sm font-bold text-slate-600 dark:text-neutral-400 border-b border-slate-200 dark:border-neutral-800 pb-3 mb-6 uppercase tracking-wider flex items-center gap-2">
                     <span>🚜 Equipment Gallery (Total: {result.equipment.total_units})</span>
                   </div>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { label: '300T Cranes', count: result.equipment.crane_300t, icon: ArrowUpCircle, color: 'text-red-600' },
                        { label: '150T Cranes', count: result.equipment.crane_150t, icon: ArrowUpCircle, color: 'text-red-500' },
                        { label: '80T Cranes', count: result.equipment.crane_80t, icon: ArrowUpCircle, color: 'text-orange-500' },
                        { label: '50T Cranes', count: result.equipment.crane_50t, icon: ArrowUpCircle, color: 'text-orange-400' },
                        { label: '15T Hydras', count: result.equipment.hydras_15t, icon: Truck, color: 'text-amber-500' },
                        { label: 'Man Lifter 120ft', count: result.equipment.man_lifter_120ft, icon: ArrowUpCircle, color: 'text-yellow-600' },
                        { label: 'Man Lifter 80ft', count: result.equipment.man_lifter_80ft, icon: ArrowUpCircle, color: 'text-yellow-500' },
                        { label: 'Forklifts', count: result.equipment.forklifts, icon: Truck, color: 'text-amber-400' },
                        { label: 'Rectifiers', count: result.equipment.rectifier_machines, icon: BatteryCharging, color: 'text-blue-600' },
                        { label: 'SAW Units', count: result.equipment.saw_machines, icon: BatteryCharging, color: 'text-blue-500' },
                        { label: 'MIG Units', count: result.equipment.mig_machines, icon: BatteryCharging, color: 'text-cyan-500' },
                        { label: 'Scaffolding', count: result.equipment.scaffold_pipes, icon: LayoutGrid, color: 'text-slate-500 dark:text-neutral-400' }
                      ].filter(e => e.count > 0).map((item, idx) => (
                         <motion.div 
                            key={item.label}
                            whileHover={{ scale: 1.05, y: -5 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + (idx * 0.05), type: "spring", stiffness: 200 }}
                            className="relative group rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 aspect-square flex flex-col items-center justify-center"
                         >
                            <div className={`p-3 rounded-full bg-slate-50 dark:bg-neutral-950 border border-slate-100 dark:border-neutral-800 mb-2 ${item.color}`}>
                               <item.icon size={28} />
                            </div>
                            <div className="flex flex-col items-center text-center">
                               <motion.span 
                                  initial={{ y: 10, opacity: 0 }} 
                                  animate={{ y: 0, opacity: 1 }} 
                                  transition={{ delay: 0.8 + (idx * 0.05) }}
                                  className="text-3xl font-black text-slate-900 dark:text-white"
                               >
                                  {item.count.toLocaleString()}
                               </motion.span>
                               <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 dark:text-neutral-400 mt-1">{item.label}</span>
                            </div>
                         </motion.div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>

          <div className="py-6 border-b border-slate-200 dark:border-neutral-800"></div>

          {/* Business Outlook */}
          <motion.div variants={itemVariants} className="space-y-6">
             <h2 className="text-xl font-bold tracking-widest text-slate-900 dark:text-white text-center uppercase">Business Outlook</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg p-6 text-center shadow-lg">
                   <Star className="w-6 h-6 text-yellow-500 mx-auto mb-3" />
                   <div className="text-sm font-bold text-slate-600 dark:text-neutral-400 uppercase tracking-widest mb-2">Client Satisfaction</div>
                   <div className="text-3xl font-black text-slate-900 dark:text-white">{result.business.csat} <span className="text-lg text-slate-500 dark:text-neutral-400">/ 10</span></div>
                </div>
                <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg p-6 text-center shadow-lg">
                   <Activity className="w-6 h-6 text-emerald-500 mx-auto mb-3" />
                   <div className="text-sm font-bold text-slate-600 dark:text-neutral-400 uppercase tracking-widest mb-2">Repeat Order Probability</div>
                   <div className="text-3xl font-black text-emerald-400">{result.business.repeat_prob}%</div>
                </div>
             </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center gap-4 pt-8">
             <button onClick={() => window.print()} className="px-8 py-3 bg-white dark:bg-neutral-900 border-2 border-slate-300 dark:border-neutral-700 hover:bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white font-bold rounded-xl shadow-sm tracking-widest text-sm uppercase transition-all">
                [ Download Project Report ]
             </button>
             <button onClick={() => setResult(null)} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md tracking-widest text-sm uppercase transition-all">
                [ New Prediction ]
             </button>
          </motion.div>

        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl w-full z-10">
        
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-neutral-400 mb-3 px-1 tracking-wide uppercase">
            <span className={step >= 1 ? 'text-blue-400' : ''}>Profile</span>
            <span className={step >= 2 ? 'text-blue-400' : ''}>Details</span>
            <span className={step >= 3 ? 'text-blue-400' : ''}>Scale</span>
            <span className={step >= 4 ? 'text-blue-400' : ''}>Conditions</span>
            <span className={step === 5 ? 'text-blue-400' : ''}>Review</span>
          </div>
          <div className="h-2 w-full bg-white dark:bg-neutral-900 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-neutral-800/50 dark:border-neutral-800/50">
            <div className="h-full bg-blue-600 transition-all duration-500 ease-out" style={{ width: `${(step / 5) * 100}%` }}></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-neutral-900/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-slate-200 dark:border-neutral-800/80 dark:border-neutral-800/80 rounded-3xl p-6 md:p-10 shadow-2xl">
          {renderFormStep()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-slate-200 dark:border-neutral-800/80 dark:border-neutral-800/80">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-white dark:bg-neutral-900 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-800">
                Back
              </button>
            ) : (
              <Link href="/ai-prediction" className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:text-white transition-colors">
                Cancel
              </Link>
            )}

            {step < 5 ? (
              <button onClick={() => setStep(step + 1)} className="group flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md">
                Next Step
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button onClick={submitPrediction} className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)] hover:shadow-[0_0_40px_-5px_rgba(37,99,235,0.8)]">
                <Activity className="w-4 h-4" /> GENERATE REPORT
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
