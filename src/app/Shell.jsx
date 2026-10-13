import { useRef, useState } from 'react';
import Sidebar from './Sidebar.jsx';
import MiddlePanel from './MiddlePanel.jsx';
import EditorPane from './EditorPane.jsx';
import { WorkProvider, useWork } from './WorkContext.jsx';

export default function Shell() {
  return (
    <WorkProvider>
      <Inner />
    </WorkProvider>
  );
}

function Inner() {
  const { filled, site, setSavedLOIs } = useWork();
  const editorRef = useRef(null);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSizePx, setFontSizePx] = useState(16);

  async function handleExport() {
    await editorRef.current?.exportDocx(`LOI - ${site?.name ?? 'draft'}.docx`);
    setSavedLOIs((xs) => [
      { id: `loi-${Date.now()}`, name: site?.name ?? 'LOI', date: new Date().toISOString() },
      ...xs,
    ]);
  }

  return (
    <div className="flex h-full min-h-0">
      <Sidebar />
      <MiddlePanel />
      <EditorPane
        ref={editorRef}
        buffer={filled?.buffer ?? null}
        fontFamily={fontFamily}
        fontSizePx={fontSizePx}
        onFont={setFontFamily}
        onFontSize={setFontSizePx}
        onExport={handleExport}
        onSend={() => alert('Send is a stub — would email to LL broker.')}
      />
    </div>
  );
}
