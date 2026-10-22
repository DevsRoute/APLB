import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { DocxEditor } from '@docx-editor.dev/react';
import { packagedFonts } from '@docx-editor.dev/fonts';
import '@docx-editor.dev/core/styles/editor.css';

const DOCX_MIME =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

const fonts = packagedFonts();

const EditorPane = forwardRef(function EditorPane({ buffer, onExport, onSend }, ref) {
  const editorRef = useRef(null);
  const docBytes = useMemo(() => (buffer ? new Uint8Array(buffer) : null), [buffer]);

  useImperativeHandle(ref, () => ({
    async exportDocx(filename = 'loi.docx') {
      const bytes = await editorRef.current?.save();
      if (!bytes) return;
      downloadBlob(new Blob([bytes], { type: DOCX_MIME }), filename);
    },
  }));

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-white">
      <div className="flex items-center justify-end gap-5 border-b border-black/10 bg-white px-5 py-2 text-[12px] font-bold text-ap-text">
        <button onClick={onExport} className="hover:underline">Export</button>
        <button onClick={onSend} className="hover:underline">Send</button>
      </div>
      <div className="min-h-0 flex-1">
        {docBytes && (
          <DocxEditor
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
