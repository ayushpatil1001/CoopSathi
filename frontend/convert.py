import re

with open('stitch_duotone_portal_2.html', 'r', encoding='utf-8') as f:
    html = f.read()

body_match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL | re.IGNORECASE)
if not body_match:
    print('No body found')
    exit()

jsx = body_match.group(1)

jsx = jsx.replace('class=', 'className=')
jsx = jsx.replace('for=', 'htmlFor=')
jsx = jsx.replace('xmlns:xlink', 'xmlnsXlink')
jsx = jsx.replace('xml:space', 'xmlSpace')
jsx = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', jsx, flags=re.DOTALL)

for tag in ['input', 'img', 'br', 'hr', 'meta', 'link']:
    jsx = re.sub(r'<(' + tag + r'[^>]*?)(?<!/)>', r'<\1 />', jsx, flags=re.IGNORECASE)

jsx = jsx.replace('stroke-width', 'strokeWidth')
jsx = jsx.replace('stroke-linecap', 'strokeLinecap')
jsx = jsx.replace('stroke-linejoin', 'strokeLinejoin')
jsx = jsx.replace('fill-rule', 'fillRule')
jsx = jsx.replace('clip-rule', 'clipRule')
jsx = jsx.replace('clip-path', 'clipPath')

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write('import React from "react";\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-ink-50 text-ink-900 font-sans selection:bg-ink-900 selection:text-white">\n')
    f.write(jsx)
    f.write('\n    </div>\n  );\n}\n')
print('Converted successfully')
