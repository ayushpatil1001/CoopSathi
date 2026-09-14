with open("src/Layout.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace('</div>\n  );\n}', '</div>\n    </>\n  );\n}')

with open("src/Layout.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Fixed closing fragment.")
