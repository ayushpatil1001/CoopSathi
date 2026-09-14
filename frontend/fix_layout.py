import re

with open("src/Layout.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Fix the duplicate 'import React from "react";'
text = text.replace('export default function Layout() {\nimport React from "react";\n\n\n\n  const', 'export default function Layout() {\n  const')
text = text.replace('export default function Layout() {\nimport React from "react";\n\nexport default function App() {\n', 'export default function Layout() {\n')

# Fix the broken return
text = text.replace('return (\n<>\n) => document.removeEventListener(\'click\', handleClick);', 'return () => document.removeEventListener(\'click\', handleClick);')

with open("src/Layout.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Layout.tsx fixed.")
