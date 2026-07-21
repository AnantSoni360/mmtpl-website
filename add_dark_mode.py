import sys

file_path = r"d:\mmtpl website\src\app\ai-prediction\dashboard\page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    "bg-white/90": "bg-white/90 dark:bg-neutral-900/90",
    "bg-slate-50": "bg-slate-50 dark:bg-neutral-950",
    "bg-white": "bg-white dark:bg-neutral-900",
    "text-slate-900": "text-slate-900 dark:text-white",
    "text-slate-600": "text-slate-600 dark:text-neutral-400",
    "text-slate-500": "text-slate-500 dark:text-neutral-400",
    "border-slate-200/80": "border-slate-200/80 dark:border-neutral-800/80",
    "border-slate-200/50": "border-slate-200/50 dark:border-neutral-800/50",
    "border-slate-200": "border-slate-200 dark:border-neutral-800",
    "border-slate-300": "border-slate-300 dark:border-neutral-700",
    "border-slate-100": "border-slate-100 dark:border-neutral-800",
    "text-blue-700": "text-blue-700 dark:text-blue-300",
    "text-amber-700": "text-amber-700 dark:text-amber-400",
    "bg-red-50": "bg-red-50 dark:bg-red-950/20",
    "border-red-200": "border-red-200 dark:border-red-900/50",
}

# Apply one by one. Order doesn't matter much as long as we're precise, 
# but some overlaps like bg-slate-50/80 could happen if we aren't careful.
# Notice bg-white/90 is done before bg-white.

for old, new in replacements.items():
    content = content.replace(old, new)

# Special specific string replaces for the form navigation buttons
content = content.replace(
    'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:text-white transition-colors bg-white dark:bg-neutral-900 hover:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-800',
    'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-white dark:bg-neutral-900 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-800'
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Dark mode classes added successfully.")
