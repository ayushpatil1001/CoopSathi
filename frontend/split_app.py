import re
import os

with open("src/App.tsx", "r", encoding="utf-8") as f:
    app_text = f.read()

# Extract main content
main_match = re.search(r'(<main.*?</main>)', app_text, re.DOTALL)
main_content = main_match.group(1) if main_match else ""

# Extract layout parts (before main and after main)
before_main = app_text[:main_match.start()]
after_main = app_text[main_match.end():]

# Clean up Satyameva Jayate bug in footer
after_main = after_main.replace('>Satyameva Jayate<', '>\u2022<')

# Let's fix the links in the nav bar in before_main to use <Link>
# We need to replace <a href="..."> with <Link to="...">
def replace_nav_links(match):
    href = match.group(2)
    cls = match.group(1)
    inner = match.group(3)
    
    # Map href to router path
    path_map = {
        '#': '/',
        '#about': '/about',
        '#laws': '/laws',
        '#schemes': '/schemes',
        '#pacs': '/pacs',
        '#pmfby': '/pmfby',
        '#ombudsman': '/ombudsman',
        '#ncct': '/ncct',
        '#telemetry': '/telemetry'
    }
    to_path = path_map.get(href, href)
    
    return f'<Link className="{cls}" to="{to_path}">{inner}</Link>'

before_main = re.sub(r'<a className="([^"]*)" href="([^"]+)">([\s\S]*?)</a>', replace_nav_links, before_main)

# Create Layout.tsx
layout_content = f"""import React from 'react';
import {{ Link, Outlet }} from 'react-router-dom';

export default function Layout() {{
{before_main.replace('export default function App() {', '').replace('return (', 'return (\n<>\n')}
      <Outlet />
{after_main.replace('</div>\n  );\n}', '</>\n  );\n}')}
"""
with open("src/Layout.tsx", "w", encoding="utf-8") as f:
    f.write(layout_content)

# Create pages
pages = ['Home', 'About', 'Laws', 'Schemes', 'Pacs', 'Pmfby', 'Ombudsman', 'Ncct', 'Telemetry']
titles = {
    'Home': 'Home',
    'About': 'About Ministry',
    'Laws': 'MSCS Act 2023',
    'Schemes': 'Schemes & Subsidies',
    'Pacs': 'PACS Services',
    'Pmfby': 'Crop Insurance (PMFBY)',
    'Ombudsman': 'Ombudsman',
    'Ncct': 'NCCT Training',
    'Telemetry': 'National Telemetry'
}

for page in pages:
    if page == 'Home':
        content = f"""import React from 'react';

export default function Home() {{
  return (
    <>
      {main_content}
    </>
  );
}}
"""
    else:
        content = f"""import React from 'react';

export default function {page}() {{
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-ink-900 mb-6">{titles[page]}</h1>
      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm">
        <p className="text-ink-600 leading-relaxed">
          Welcome to the official information page for {titles[page]}. Detailed documentation, 
          guidelines, and services for this section are maintained by the Ministry of Cooperation.
        </p>
        <div className="mt-8 p-4 bg-ink-50 rounded border border-ink-100 flex items-center gap-3">
          <span className="material-symbols-outlined text-ink-500 text-2xl">info</span>
          <span className="text-sm text-ink-700">Content for this section is updated regularly as per government mandates.</span>
        </div>
      </div>
    </main>
  );
}}
"""
    with open(f"src/pages/{page}.tsx", "w", encoding="utf-8") as f:
        f.write(content)

# Create App.tsx with Router
app_content = """import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
import Laws from './pages/Laws';
import Schemes from './pages/Schemes';
import Pacs from './pages/Pacs';
import Pmfby from './pages/Pmfby';
import Ombudsman from './pages/Ombudsman';
import Ncct from './pages/Ncct';
import Telemetry from './pages/Telemetry';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="laws" element={<Laws />} />
          <Route path="schemes" element={<Schemes />} />
          <Route path="pacs" element={<Pacs />} />
          <Route path="pmfby" element={<Pmfby />} />
          <Route path="ombudsman" element={<Ombudsman />} />
          <Route path="ncct" element={<Ncct />} />
          <Route path="telemetry" element={<Telemetry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
"""
with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(app_content)

print("Split app successfully.")
