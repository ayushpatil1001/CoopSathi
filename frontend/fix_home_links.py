import re

with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Add Link import
if "import { Link }" not in text:
    text = text.replace("import React from 'react';", "import React from 'react';\nimport { Link } from 'react-router-dom';")

def link_replacer(match):
    full_match = match.group(0)
    cls = match.group(1)
    href = match.group(2)
    inner = match.group(3)
    
    if href.startswith('http') or href.startswith('mailto'):
        return full_match
        
    if href.startswith('#'):
        path = href.replace('#', '/')
        if path == '/': path = '/'
        return f'<Link className="{cls}" to="{path}">{inner}</Link>'
    
    return full_match

text = re.sub(r'<a className="([^"]*)" href="([^"]+)">([\s\S]*?)</a>', link_replacer, text)

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Home links fixed.")
