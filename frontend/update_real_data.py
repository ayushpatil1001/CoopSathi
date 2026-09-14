import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Navbar text color fix
text = text.replace('<nav className="bg-ink-900 border-b border-ink-800 sticky top-0 z-40">', '<nav className="bg-ink-900 text-white border-b border-ink-800 sticky top-0 z-40">')
text = text.replace('text-ink-300 hover:text-white', 'text-white/90 hover:text-white')
text = text.replace('text-ink-100 font-semibold border-b-2 border-white', 'text-white font-semibold border-b-2 border-white')

# 2. Update placeholders with real data
text = text.replace('12,925 Cr', '?2,516 Cr')
text = text.replace('Target ERP Onboarding', 'Target PACS Onboarding')
text = text.replace('011-20901234', '1800 103 6891')
text = text.replace('011-20901551', '011-24362140')

# Replace images safely
img1 = 'https://upload.wikimedia.org/wikipedia/commons/4/41/Amit_Shah_Official_Portrait.jpg'
text = re.sub(r'<img src="https://lh3.googleusercontent.com/aida-public/[^"]+" alt="Shri Amit Shah[^"]+"', f'<img src="{img1}" alt="Shri Amit Shah"', text)

img2 = 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Murlidhar_Mohol.png'
text = re.sub(r'<img src="https://lh3.googleusercontent.com/aida-public/[^"]+" alt="Shri Murlidhar Mohol[^"]+"', f'<img src="{img2}" alt="Shri Murlidhar Mohol"', text)

img3 = 'https://crcs.gov.in/sites/default/files/2023-10/dummy-user.jpg'
text = re.sub(r'<img src="https://lh3.googleusercontent.com/aida-public/[^"]+" alt="Dr. Ashish Kumar Bhutani[^"]+"', f'<img src="{img3}" alt="Secretary"', text)

# For any missed googleusercontent images, fallback just in case
text = re.sub(r'<img src="https://lh3.googleusercontent.com/aida-public/[^"]+"', f'<img src="{img3}"', text)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated App.tsx with real data successfully")
