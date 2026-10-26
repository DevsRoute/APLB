import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { DocxEditor } from '@docx-editor.dev/react';
import { packagedFonts } from '@docx-editor.dev/fonts';
import '@docx-editor.dev/core/styles/editor.css';

const DOCX_MIME =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const BLANK_PATTERN = '_';

const fonts = packagedFonts();

const EditorPane = forwardRef(function EditorPane(
  { buffer, showToolbar = true, showUnderscoreNav = false, onExport, onSend },
  ref,
) {
  const editorRef = useRef(null);
  const docBytes = useMemo(() => (buffer ? new Uint8Array(buffer) : null), [buffer]);
  const [blankIndex, setBlankIndex] = useState(-1);

  useImperativeHandle(ref, () => ({
    async exportDocx(filename = 'loi.docx') {
      const bytes = await editorRef.current?.save();
      if (!bytes) return;
      downloadBlob(new Blob([bytes], { type: DOCX_MIME }), filename);
    },
  }));

  function goBlank(step) {
    const editor = editorRef.current?.getEditor();
    if (!editor) return;
    const raw = editor.findMatches(BLANK_PATTERN);
    const groups = groupAdjacent(raw);
    if (groups.length === 0) return;
    const next = blankIndex < 0
      ? (step > 0 ? 0 : groups.length - 1)
      : (blankIndex + step + groups.length) % groups.length;
    const match = groups[next];
    editor.selectMatch(match);
    editor.scrollToBlock(match.blockId);
    setBlankIndex(next);
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-white">
      {(showToolbar || showUnderscoreNav) && (
        <div className="flex items-center justify-end gap-5 border-b border-black/10 bg-white px-5 py-2 text-[12px] font-bold text-ap-text">
          {showUnderscoreNav && (
            <div className="mr-auto flex items-center gap-1">
              <BlankBtn direction="left" onClick={() => goBlank(-1)} />
              <BlankBtn direction="right" onClick={() => goBlank(1)} />
            </div>
          )}
          {showToolbar && (
            <>
              <button onClick={onExport} className="hover:underline">Export</button>
              <button onClick={onSend} className="hover:underline">Send</button>
            </>
          )}
        </div>
      )}
      <div className="min-h-0 flex-1">
        {docBytes && (
          <DocxEditor
            key={buffer}
            ref={editorRef}
            document={docBytes}
            mode="edit"
            fonts={fonts}
          />
        )}
      </div>
    </section>
  );
});

function groupAdjacent(matches) {
  const out = [];
  for (const m of matches) {
    const last = out[out.length - 1];
    if (last && last.blockId === m.blockId && m.start <= last.start + last.length) {
      const end = Math.max(last.start + last.length, m.start + m.length);
      last.length = end - last.start;
      continue;
    }
    out.push({ ...m });
  }
  return out;
}

function BlankBtn({ direction, onClick }) {
  const path = direction === 'left'
    ? 'M11 3 L6 8 L11 13'
    : 'M7 3 L12 8 L7 13';
  return (
    <button
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous blank' : 'Next blank'}
      className="flex h-[24px] w-[24px] items-center justify-center rounded border border-ap-text/20 bg-[#dbe4ff] hover:bg-[#c7d4fa]"
    >
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <path d={path} stroke="#404040" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="4" y1="16" x2="14" y2="16" stroke="#404040" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default EditorPane;
