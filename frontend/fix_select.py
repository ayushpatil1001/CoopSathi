import re

with open("src/App.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Fix <option selected> to <select defaultValue="en">
text = text.replace('<select aria-label="Select Language" className="bg-transparent text-ink-700 text-[11px] focus:outline-none cursor-pointer border-0 py-0 pl-0 pr-4">', '<select aria-label="Select Language" className="bg-transparent text-ink-700 text-[11px] focus:outline-none cursor-pointer border-0 py-0 pl-0 pr-4" defaultValue="en">')
text = text.replace('<option selected value="en">English</option>', '<option value="en">English</option>')
text = text.replace('<option selected>English</option>', '<option value="en">English</option>')

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Select fixed.")
