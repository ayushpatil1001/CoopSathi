import re

with open("src/App.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# 1. Add useState, useEffect inside App component
state_code = """
  const [modalData, setModalData] = React.useState<{title: string, content: string} | null>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a, button');
      if (!target) return;

      const isExternal = target.tagName === 'A' && target.hasAttribute('target') && target.getAttribute('target') === '_blank';
      const href = target.getAttribute('href');
      const isHash = href && href.startsWith('#');
      const isButton = target.tagName === 'BUTTON';

      // We handle all hash links and buttons to make them "usable" and show info
      if (!isExternal && (isHash || isButton)) {
        // Allow select language to work normally
        if (target.closest('select')) return;
        
        e.preventDefault();
        let title = (target as HTMLElement).innerText.trim();
        // Fallbacks for icon-only buttons
        if (!title || title.length < 2) {
          title = target.getAttribute('title') || target.getAttribute('aria-label') || 'Information Details';
        }
        
        // Remove material symbols text if it leaked into innerText
        title = title.replace(/(arrow_forward|open_in_new|download|home|person|record_voice_over|contrast|close|search)/g, '').trim();

        if (title) {
          setModalData({
            title: title,
            content: `Official information and services regarding "${title}" are currently being synchronized. This section will provide the complete digitized workflow and relevant government data shortly.`
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
"""

text = text.replace('export default function App() {\n', 'export default function App() {\n' + state_code)

# 2. Add Modal JSX at the end of the main div
modal_jsx = """
      {/* GLOBAL INFORMATION MODAL */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/40 backdrop-blur-sm" onClick={() => setModalData(null)}>
          <div className="bg-white rounded-lg shadow-xl border border-ink-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3 bg-ink-50">
              <h3 className="font-bold text-ink-900 truncate pr-4">{modalData.title}</h3>
              <button onClick={() => setModalData(null)} className="text-ink-400 hover:text-ink-700 transition flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-5 sm:p-6 text-sm text-ink-600 leading-relaxed">
              <div className="mb-4 w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <span className="material-symbols-outlined">info</span>
              </div>
              {modalData.content}
            </div>
            <div className="border-t border-ink-100 px-4 py-3 bg-ink-50 flex justify-end">
              <button onClick={() => setModalData(null)} className="px-4 py-1.5 bg-ink-900 text-white text-xs font-semibold rounded hover:bg-ink-800 transition">
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
"""

# Inject right before the last closing div
# The layout is return ( <div ...> ... </div> );
text = text.replace('</footer>\n    </div>', '</footer>\n' + modal_jsx + '    </div>')

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Modal added.")
