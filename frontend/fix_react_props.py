import re
import json

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Fix standard SVG kebab-case properties
props_to_fix = [
    'font-size', 'font-family', 'font-weight', 'text-anchor',
    'stop-color', 'stop-opacity', 'stroke-width', 'stroke-linecap',
    'stroke-linejoin', 'fill-rule', 'clip-rule', 'clip-path'
]

for prop in props_to_fix:
    camel_prop = prop.split('-')[0] + "".join(word.capitalize() for word in prop.split('-')[1:])
    text = text.replace(f'{prop}=', f'{camel_prop}=')

# 2. Fix inline style="prop: value; prop: value;" strings
def style_to_object(match):
    style_str = match.group(1)
    rules = style_str.split(';')
    obj_str_parts = []
    for rule in rules:
        if not rule.strip(): continue
        parts = rule.split(':', 1)
        if len(parts) == 2:
            key = parts[0].strip()
            val = parts[1].strip()
            # camelCase the key
            key_camel = key.split('-')[0] + "".join(word.capitalize() for word in key.split('-')[1:])
            # Handle quoted strings safely (though css vals are just strings in React)
            obj_str_parts.append(f"{key_camel}: '{val}'")
    
    return "style={{" + ", ".join(obj_str_parts) + "}}"

text = re.sub(r'style="([^"]+)"', style_to_object, text)

# 3. Check for any missing 'className' replacements (just in case)
text = text.replace(' class=', ' className=')
text = text.replace(' for=', ' htmlFor=')

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed React props successfully.")
