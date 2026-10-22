import { useRef } from 'react';
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

  async function handleExport() {
    const name = `LOI - ${site?.name ?? 'draft'}.docx`;
    await editorRef.current?.exportDocx(name);
    setSavedLOIs((xs) => [
      { id: `loi-${Date.now()}`, name: site?.name ?? 'LOI', date: new Date().toISOString() },
      ...xs,
    ]);
  }

  function handleSend() {
    alert('Send is a stub — would email to LL broker.');
  }

  return (
    <div className="flex h-full min-h-0">
      <Sidebar />
      <MiddlePanel />
      <EditorPane
        ref={editorRef}
        buffer={filled?.buffer ?? null}
        onExport={handleExport}
        onSend={handleSend}
      />
    </div>
  );
}
