# coding: utf-8
import re

with open("src/Layout.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Clean up garbled Hindi text
text = re.sub(r'[^a-zA-Z0-9<>\s/\-={}()\[\]"\'|]+\s*\|\s*Government of India', 'Government of India', text)
text = re.sub(r'>[^a-zA-Z0-9<>\s/\-={}()\[\]"\'|]+<', '>Satyameva Jayate<', text)
text = re.sub(r'\([^a-zA-Z0-9<>\s/\-={}()\[\]"\'|]+\)', '(Ministry of Cooperation, Government of India)', text)
text = text.replace('\ufffd,13,00,000', '\u20B913,00,000')
text = text.replace('\ufffd?\ufffd', '\u2022')
text = text.replace('\ufffd', '')

# Make sure all the text replacements for 'Satyameva Jayate' that I did earlier don't override the actual dots if I accidentally re-ran
# Wait, I explicitly replaced the bullets with `Satyameva Jayate` earlier in Layout.tsx, then changed it back.
text = text.replace('>Satyameva Jayate<', '>\u2022<') # Restore the bullets in footer
text = text.replace('>Satyameva Jayate<', '>\u2022<')

with open("src/Layout.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Cleaned Layout text.")
