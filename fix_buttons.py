import sys

file_path = r"d:\mmtpl website\src\app\ai-prediction\dashboard\page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix Download button
old_download = 'className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-slate-900 font-bold rounded shadow-lg tracking-widest text-sm uppercase transition-colors"'
new_download = 'className="px-8 py-3 bg-white border-2 border-slate-300 hover:bg-slate-50 text-slate-900 font-bold rounded-xl shadow-sm tracking-widest text-sm uppercase transition-all"'
content = content.replace(old_download, new_download)

# Fix New Prediction button
old_new = 'className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-slate-900 font-bold rounded shadow-lg tracking-widest text-sm uppercase transition-colors"'
new_new = 'className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md tracking-widest text-sm uppercase transition-all"'
content = content.replace(old_new, new_new)

# Fix Form buttons (Next Step / Generate)
content = content.replace('bg-blue-600 text-slate-900 text-sm font-semibold rounded-xl', 'bg-blue-600 text-white text-sm font-semibold rounded-xl')
content = content.replace('hover:bg-blue-500 transition-all shadow-[0_4px_15px_-3px_rgba(37,99,235,0.4)]', 'hover:bg-blue-700 transition-all shadow-md')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Button colors fixed.")
