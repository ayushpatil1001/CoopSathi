import re
with open("src/App.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace('2,925 Cr', '\u20b92,516 Cr')
text = text.replace('2.06 L Cr', '\u20b91.50 L Cr')
text = text.replace('3,00,000', '\u20b93,00,000')

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Final replacement done.")
