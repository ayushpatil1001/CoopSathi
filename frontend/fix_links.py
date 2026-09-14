import re

with open("src/Layout.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Replace footer hash links to use Link component
# Example: <a className="hover:text-ink-200" href="#privacy">Privacy Policy</a>
# Becomes: <Link className="hover:text-ink-200" to="/privacy">Privacy Policy</Link>

def link_replacer(match):
    full_match = match.group(0)
    cls = match.group(1)
    href = match.group(2)
    inner = match.group(3)
    
    # Exclude external links
    if href.startswith('http') or href.startswith('mailto'):
        return full_match
        
    if href.startswith('#'):
        path = href.replace('#', '/')
        if path == '/': path = '/'
        return f'<Link className="{cls}" to="{path}">{inner}</Link>'
    
    return full_match

text = re.sub(r'<a className="([^"]*)" href="([^"]+)">([\s\S]*?)</a>', link_replacer, text)

# Also fix any <a href="#..."> without className
text = re.sub(r'<a href="#([^"]+)">([\s\S]*?)</a>', r'<Link to="/\1">\2</Link>', text)

with open("src/Layout.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Links fixed.")
