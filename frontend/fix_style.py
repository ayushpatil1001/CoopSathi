import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    jsx = f.read()

def style_replacer(match):
    style_str = match.group(1)
    declarations = [d.strip() for d in style_str.split(';') if d.strip()]
    obj_str = []
    for d in declarations:
        if ':' not in d: continue
        prop, val = d.split(':', 1)
        prop = prop.strip()
        val = val.strip()
        parts = prop.split('-')
        camel_prop = parts[0] + ''.join(p.capitalize() for p in parts[1:])
        obj_str.append(f"{camel_prop}: '{val}'")
    
    return 'style={{' + ', '.join(obj_str) + '}}'

jsx = re.sub(r'style="(.*?)"', style_replacer, jsx)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(jsx)
print('Styles fixed')
