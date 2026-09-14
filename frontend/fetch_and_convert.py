import urllib.request
import re
import sys

url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YjRjZmQ5OTMyZmEwMzkyY2JjMjQ1MDgxYWQ4EgsSBxDy1oiTvAIYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTQwMjI2OTM0NjY5MDc0NjM4NA&filename=&opi=89354086"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
except Exception as e:
    print(e)
    sys.exit(1)

body_match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL | re.IGNORECASE)
if not body_match:
    print('No body found')
    sys.exit(1)

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
print('Downloaded and Converted successfully')
