import re

with open("src/App.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Replace text-ink-300 on the nav bar with text-white
text = re.sub(r'<nav className="([^"]*)text-ink-300([^"]*)"', r'<nav className="\1text-white\2"', text)

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Navbar fixed.")
