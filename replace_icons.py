import sys

file_path = r"d:\mmtpl website\src\app\ai-prediction\dashboard\page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add Lucide icon imports
import_str_old = "import { \n  Users, Activity, ArrowRight, ShieldCheck, Download, \n  AlertTriangle, Clock, Wrench, IndianRupee, HardHat, Star\n} from 'lucide-react';"
import_str_new = "import { \n  Users, Activity, ArrowRight, ShieldCheck, Download, \n  AlertTriangle, Clock, Wrench, IndianRupee, HardHat, Star,\n  Zap, Flame, Hammer, Eye, ClipboardList, PlusSquare, ArrowUpCircle, Truck, BatteryCharging, LayoutGrid, CircleDot, Anchor, Compass\n} from 'lucide-react';"

content = content.replace(import_str_old, import_str_new)

# Replace Workforce Array
workforce_old = """                      {[
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
                      ]"""

workforce_new = """                      {[
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
                        { label: 'Helpers', count: result.workforce.helpers, icon: Users, color: 'text-slate-500' },
                        { label: 'Foremen', count: result.workforce.foremen, icon: HardHat, color: 'text-purple-500' },
                        { label: 'Engineers', count: result.workforce.engineers, icon: Compass, color: 'text-purple-600' },
                        { label: 'Supervisors', count: result.workforce.supervisors, icon: ClipboardList, color: 'text-purple-400' },
                        { label: 'HSE Officers', count: result.workforce.hse_officers, icon: PlusSquare, color: 'text-green-500' },
                        { label: 'Crane Ops', count: result.workforce.crane_operators, icon: ArrowUpCircle, color: 'text-sky-500' }
                      ]"""

content = content.replace(workforce_old, workforce_new)

# Replace Workforce Card HTML
workforce_card_old = """                            <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>"""
workforce_card_new = """                            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300">
                               <item.icon size={80} className={item.color} />
                            </div>"""

content = content.replace(workforce_card_old, workforce_card_new)

# Replace Equipment Array
equipment_old = """                      {[
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
                      ]"""
equipment_new = """                      {[
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
                        { label: 'Scaffolding', count: result.equipment.scaffold_pipes, icon: LayoutGrid, color: 'text-slate-500' }
                      ]"""

content = content.replace(equipment_old, equipment_new)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Icons added successfully.")
