import re

with open("src/Layout.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Remove ChatWidget import and component
text = text.replace("import ChatWidget from './components/ChatWidget';\n", "")
text = text.replace("      <ChatWidget />", "")

# Add highlighted button to Navbar
button_html = """
  {/* AI Chatbot Launcher */}
  <div className="ml-auto flex items-center">
    <Link to="/chat" className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-full font-bold transition shadow-sm border border-emerald-500">
      <span className="material-symbols-outlined text-[16px]">smart_toy</span>
      CoopSathi AI
    </Link>
  </div>
"""
text = text.replace("{/*  Subtle AI Assistant Quick Launcher  */}", button_html)

with open("src/Layout.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Layout updated.")
