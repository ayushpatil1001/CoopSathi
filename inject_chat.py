import re

with open("frontend/src/Layout.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Add import at the top
if "ChatWidget" not in text:
    text = text.replace("import { Link, Outlet } from 'react-router-dom';", "import { Link, Outlet } from 'react-router-dom';\nimport ChatWidget from './components/ChatWidget';")

# Inject component at the bottom
if "<ChatWidget />" not in text:
    text = text.replace("</footer>", "</footer>\n      <ChatWidget />")

with open("frontend/src/Layout.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("ChatWidget injected")
