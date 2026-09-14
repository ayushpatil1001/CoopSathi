import re

with open("src/App.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Make sure values are correct
text = re.sub(r'[\u20b9\ufffd\?]*12,925 Cr', '\u20b92,516 Cr', text)
text = re.sub(r'[\u20b9\ufffd\?]*12\.06 L Cr', '\u20b91.50 L Cr', text)
text = re.sub(r'[\u20b9\ufffd\?]*13,00,000', '\u20b93,00,000', text)

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Applied robust fixes.")
