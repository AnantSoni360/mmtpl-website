import sys

file_path = r"d:\mmtpl website\src\app\ai-prediction\dashboard\page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

card_old = """                            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300">
                               <item.icon size={80} className={item.color} />
                            </div>
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
                            </div>"""

card_new = """                            <div className={`p-3 rounded-full bg-slate-50 border border-slate-100 mb-2 ${item.color}`}>
                               <item.icon size={28} />
                            </div>
                            <div className="flex flex-col items-center text-center">
                               <motion.span 
                                  initial={{ y: 10, opacity: 0 }} 
                                  animate={{ y: 0, opacity: 1 }} 
                                  transition={{ delay: 0.6 + (idx * 0.05) }}
                                  className="text-3xl font-black text-slate-900"
                               >
                                  {item.count}
                               </motion.span>
                               <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mt-1">{item.label}</span>
                            </div>"""

content = content.replace(card_old, card_new)

card_old_eq = """                            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300">
                               <item.icon size={80} className={item.color} />
                            </div>
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
                            </div>"""

card_new_eq = """                            <div className={`p-3 rounded-full bg-slate-50 border border-slate-100 mb-2 ${item.color}`}>
                               <item.icon size={28} />
                            </div>
                            <div className="flex flex-col items-center text-center">
                               <motion.span 
                                  initial={{ y: 10, opacity: 0 }} 
                                  animate={{ y: 0, opacity: 1 }} 
                                  transition={{ delay: 0.8 + (idx * 0.05) }}
                                  className="text-3xl font-black text-slate-900"
                               >
                                  {item.count.toLocaleString()}
                               </motion.span>
                               <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mt-1">{item.label}</span>
                            </div>"""

content = content.replace(card_old_eq, card_new_eq)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Card layout fixed.")
