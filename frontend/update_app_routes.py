import re
import os

with open("src/App.tsx", "r", encoding="utf-8") as f:
    text = f.read()

if "import Chat from './pages/Chat';" not in text:
    text = text.replace("import Telemetry from './pages/Telemetry';", "import Telemetry from './pages/Telemetry';\nimport Chat from './pages/Chat';")

if '<Route path="chat" element={<Chat />} />' not in text:
    text = text.replace('          <Route path="telemetry" element={<Telemetry />} />', '          <Route path="telemetry" element={<Telemetry />} />\n          <Route path="chat" element={<Chat />} />')

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(text)

# Remove the old ChatWidget component
if os.path.exists("src/components/ChatWidget.tsx"):
    os.remove("src/components/ChatWidget.tsx")

print("Routes updated and ChatWidget removed.")
