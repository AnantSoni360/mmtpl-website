import sys

file_path = r"d:\mmtpl website\src\app\ai-prediction\dashboard\page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix the gradient on the photo cards so the image shows through properly but text is legible
content = content.replace('bg-gradient-to-t from-white via-white/70 to-transparent', 'bg-gradient-to-t from-white via-white/80 to-transparent')

# Remove the black drop shadow on the big numbers, since text is now black (slate-900)
content = content.replace('text-slate-900 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]', 'text-slate-900')

# Change the text color of the labels below the numbers to be legible against white
content = content.replace('text-blue-300 mt-1', 'text-blue-700 mt-1')
content = content.replace('text-amber-400 mt-1', 'text-amber-700 mt-1')

# For the main layout, ensure text is readable
# Change the background of the form stepper area slightly so it's not totally flat
content = content.replace('bg-slate-50/80 backdrop-blur-xl', 'bg-white/90 backdrop-blur-xl')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Card fixes applied.")
