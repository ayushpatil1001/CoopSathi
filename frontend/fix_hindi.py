import base64
with open('src/App.tsx', 'rb') as f:
    content = f.read().decode('utf-8')

# The text that got garbled was probably due to write_to_file messing it up.
# Let's replace the whole span of the attributes where they occur.
# Government of India header:
content = content.replace(
    '<span> - _     ,    _  | Government of India</span>',
    '<span>' + base64.b64decode('4KSt4KS+4KSw4KSkIOCkuOCksOCkleCkvuCksCB8IEdvdmVybm1lbnQgb2YgSW5kaWE=').decode('utf-8') + '</span>'
)

# Languages:
lang1 = '<option value="hi">' + base64.b64decode('4KS54KS/4KSo4KWN4KSm4KWHIChIaW5kaSk=').decode('utf-8') + '</option>'
lang2 = '<option value="mr">' + base64.b64decode('4KSu4KSw4KS+4KSg4KWHIChNYXJhdGhpKQ==').decode('utf-8') + '</option>'
lang3 = '<option value="gu">' + base64.b64decode('4KSl4K1B4KSc4KSw4KS+4KSk4KWHIChHdWphcmF0aSk=').decode('utf-8') + '</option>'

import re
content = re.sub(r'<option value="hi">.*?</option>', lang1, content)
content = re.sub(r'<option value="mr">.*?</option>', lang2, content)
content = re.sub(r'<option value="gu">.*?</option>', lang3, content)

# Satyameva Jayate (svg text):
content = re.sub(
    r'<text fill="#1e293b".*?>.*?</text>',
    '<text fill="#1e293b" fontFamily="\'Noto Sans Devanagari\', sans-serif" fontSize="8" fontWeight="700" textAnchor="middle" x="50" y="106">' + base64.b64decode('4KS44KSk4KWN4KSv4KSu4KWH4KS1IOCknOCkr+CkpOClhQ==').decode('utf-8') + '</text>',
    content
)

# Ministry of Cooperation
min1 = '<span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 font-devanagari">' + base64.b64decode('4KSt4KS+4KSw4KSkIOCkuOCksOCkleCkvuCksA==').decode('utf-8') + '</span>'
content = re.sub(r'<span className="text-\[10px\] font-semibold uppercase tracking-wider text-ink-500 font-devanagari">.*?</span>', min1, content, count=1)

min2 = '<h1 className="text-lg sm:text-xl font-bold text-ink-900 font-devanagari tracking-tight leading-none">' + base64.b64decode('4KS44KS54KSV4KS+4KSw4KS/4KSk4KS+IOCkruCkguCkpOCljeCksOCkvuCksuCkrw==').decode('utf-8') + '</h1>'
content = re.sub(r'<h1 className="text-lg sm:text-xl font-bold text-ink-900 font-devanagari tracking-tight leading-none">.*?</h1>', min2, content)

min3 = '<p className="text-[11px] text-ink-500 mt-0.5">' + base64.b64decode('4KS44KS54KSV4KS+4KSwIOCkuOClhyDohuOOhOOCleODlOOCleOCu+OOp+OCkCAtIFByb3NwZXJpdHkgdGhyb3VnaCBDb29wZXJhdGlvbg==').decode('utf-8') + '</p>'
# Wait, "????? ?? ???????" base64 is actually '4KS44KS54KSV4KS+4KSwIOCkuOClhyDkuLjkuK7kuY3kuLDkuInkuKbluY3kuKfgup8gLSBQcm9zcGVyaXR5IHRocm91Z2ggQ29vcGVyYXRpb24=' No let's generate it in Python to be safe.

with open('src/App.tsx', 'wb') as f:
    f.write(content.encode('utf-8'))
