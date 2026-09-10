import sys

file_path = r"d:\mmtpl website\src\app\ai-prediction\dashboard\page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    # Backgrounds
    "bg-neutral-950/80": "bg-white/90",
    "bg-neutral-950": "bg-slate-50",
    "bg-neutral-900/50": "bg-slate-50 border-slate-200 shadow-sm",
    "bg-neutral-900": "bg-white",
    
    # Borders
    "border-neutral-800/80": "border-slate-200/80",
    "border-neutral-800/50": "border-slate-200/50",
    "border-neutral-800": "border-slate-200",
    "border-neutral-700": "border-slate-300",
    "border-red-900/50": "border-red-200",
    
    # Text colors
    "text-white": "text-slate-900",
    "text-neutral-400": "text-slate-600",
    "text-neutral-500": "text-slate-500",
    
    # Gradients and blurs
    "from-neutral-950": "from-white",
    "via-neutral-950/60": "via-white/70",
    
    # Specific adjustments for form inputs
    "bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-white": "bg-white border border-slate-300 rounded-lg p-3 text-slate-900",
    
    # Shadows
    "shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)]": "shadow-[0_4px_15px_-3px_rgba(37,99,235,0.4)]",
    
    # Special button adjustments
    "bg-neutral-800 hover:bg-neutral-700 text-white": "bg-slate-800 hover:bg-slate-700 text-white",
    
    # Specific risk box adjustments
    "bg-red-950/20": "bg-red-50"
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Theme updated successfully.")
