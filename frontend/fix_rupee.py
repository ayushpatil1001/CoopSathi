import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix garbled rupee symbols and metrics
# For some reason \ufffd matches the replacement character. We can also just use regex to match whatever precedes the comma.
text = re.sub(r'[^a-zA-Z0-9\s<>\-"\']+,12,925 Cr', '?2,516 Cr', text)
text = re.sub(r'[^a-zA-Z0-9\s<>\-"\']+,13,00,000', '?3,00,000', text)
text = re.sub(r'[^a-zA-Z0-9\s<>\-"\']+,12\.06 L Cr', '?1.50 L Cr', text)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Rupee symbols fixed.")
