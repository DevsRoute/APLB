import { useRef } from 'react';
import TopHeader from './TopHeader.jsx';
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
  const { step, filled, templateBuffer, site, setSavedLOIs } = useWork();
  const editorRef = useRef(null);
  const editorVisible = step !== 'link';
  const buffer = filled?.buffer ?? templateBuffer ?? null;
  const toolbarVisible = filled !== null;
  const underscoreNavVisible = step === 'edit';

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
    <div className="relative flex h-full min-h-0 flex-col">
      <TopHeader />
      <div className="pointer-events-none absolute left-0 right-0 top-[65px] z-30 h-[16px] bg-gradient-to-b from-black/25 to-transparent" />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <MiddlePanel />
        {editorVisible ? (
          <EditorPane
            ref={editorRef}
            buffer={buffer}
            showToolbar={toolbarVisible}
            showUnderscoreNav={underscoreNavVisible}
            onExport={handleExport}
            onSend={handleSend}
          />
        ) : (
          <section className="flex-1 bg-white" />
        )}
      </div>
    </div>
  );
}
