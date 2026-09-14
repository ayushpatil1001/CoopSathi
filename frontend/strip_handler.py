import re

with open("src/Layout.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Remove the useEffect click handler completely
# The easiest way is to just find the start of the return (
# and replace everything from const [modalData... up to the return (

match = re.search(r'  const \[modalData.*?return \(\n<>\n', text, re.DOTALL)
if match:
    text = text[:match.start()] + '  return (\n<>\n' + text[match.end():]
else:
    print("Could not find click handler.")

# We also need to remove the modal JSX at the end of the file.
# It usually looks like {modalData && ( <div className="fixed inset-0...
# Let's see if we can find it.
match_modal = re.search(r'\{modalData && \([\s\S]*?</>\n  \);\n\}', text)
if match_modal:
    text = text[:match_modal.start()] + '</>\n  );\n}' + text[match_modal.end():]

with open("src/Layout.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Stripped handler.")
