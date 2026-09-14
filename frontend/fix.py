import base64
import re

with open('src/App.tsx', 'rb') as f:
    text = f.read().decode('utf-8')

# The exact garbled string found:
#  - _     ,    _  | Government of India
# We can just replace using regex or exact substring. Let's use generic patterns.

text = re.sub(r'<span>.*?\| Government of India</span>', '<span>' + base64.b64decode('4KSt4KS+4KSw4KSkIOCkuOCksOCkleCkvuCksCB8IEdvdmVybm1lbnQgb2YgSW5kaWE=').decode('utf-8') + '</span>', text)

text = re.sub(r'<option value="hi">.*?</option>', '<option value="hi">' + base64.b64decode('4KS54KS/4KSo4KWN4KSm4KWHIChIaW5kaSk=').decode('utf-8') + '</option>', text)
text = re.sub(r'<option value="mr">.*?</option>', '<option value="mr">' + base64.b64decode('4KSu4KSw4KS+4KSg4KWHIChNYXJhdGhpKQ==').decode('utf-8') + '</option>', text)
text = re.sub(r'<option value="gu">.*?</option>', '<option value="gu">' + base64.b64decode('4KSl4K1B4KSc4KSw4KS+4KSk4KWHIChHdWphcmF0aSk=').decode('utf-8') + '</option>', text)

text = re.sub(r'<text fill="#1e293b".*?>.*?</text>', '<text fill="#1e293b" fontFamily="\'Noto Sans Devanagari\', sans-serif" fontSize="8" fontWeight="700" textAnchor="middle" x="50" y="106">' + base64.b64decode('4KS44KSk4KWN4KSv4KSu4KWH4KS1IOCknOCkr+CkpOClhQ==').decode('utf-8') + '</text>', text)

text = re.sub(r'<span className="text-\[10px\] font-semibold uppercase tracking-wider text-ink-500 font-devanagari">.*?</span>', '<span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 font-devanagari">' + base64.b64decode('4KSt4KS+4KSw4KSkIOCkuOCksOCkleCkvuCksA==').decode('utf-8') + '</span>', text, count=1)

text = re.sub(r'<h1 className="text-lg sm:text-xl font-bold text-ink-900 font-devanagari tracking-tight leading-none">.*?</h1>', '<h1 className="text-lg sm:text-xl font-bold text-ink-900 font-devanagari tracking-tight leading-none">' + base64.b64decode('4KS44KS54KSV4KS+4KSw4KS/4KSk4KS+IOCkruCkguCkpOCljeCksOCkvuCksuCkrw==').decode('utf-8') + '</h1>', text)

text = re.sub(r'<p className="text-\[11px\] text-ink-500 mt-0\.5">.*?</p>', '<p className="text-[11px] text-ink-500 mt-0.5">' + base64.b64decode('4KS44KS54KSV4KS+4KSwIOCkuOClhyDkuLjkuK7kuY3kuLDkuInkuKbluY3kuKfgup8gLSBQcm9zcGVyaXR5IHRocm91Z2ggQ29vcGVyYXRpb24=').decode('utf-8') + '</p>', text, count=1)

text = re.sub(r'\(.*?, Government of India\)\.', '(' + base64.b64decode('4KS44KS54KSV4KS+4KSw4KS/4KSk4KS+IOCkruCkguCkpOCljeCksOCkvuCksuCkrSwg4KSt4KS+4KSw4KSkIOCkuOCksOCkleCkvuCksA==').decode('utf-8') + ', Government of India).', text)

with open('src/App.tsx', 'wb') as f:
    f.write(text.encode('utf-8'))
