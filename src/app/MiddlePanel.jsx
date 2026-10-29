import { useCallback, useEffect, useRef, useState } from 'react';
import { useWork } from './WorkContext.jsx';
import ManageLOIs from './panels/draft/ManageLOIs.jsx';
import LinkSite from './panels/draft/LinkSite.jsx';
import ChooseTemplate from './panels/draft/ChooseTemplate.jsx';
import AddOptionalLanguage from './panels/draft/AddOptionalLanguage.jsx';
import UnderscoresAndEdit from './panels/draft/UnderscoresAndEdit.jsx';
import UploadTemplate from './panels/build/UploadTemplate.jsx';
import LinkSiteFields from './panels/build/LinkSiteFields.jsx';
import BuildOptionalLang from './panels/build/BuildOptionalLang.jsx';
import ConvertUnderscores from './panels/build/ConvertUnderscores.jsx';

const DRAFT = {
  manage: ManageLOIs,
  link: LinkSite,
  template: ChooseTemplate,
  language: AddOptionalLanguage,
  edit: UnderscoresAndEdit,
};
const BUILD = {
  upload: UploadTemplate,
  'link-fields': LinkSiteFields,
  'opt-lib': BuildOptionalLang,
  underscores: ConvertUnderscores,
};

const DEFAULT_WIDTH = 450;
const MIN_WIDTH = 280;
const MAX_WIDTH = 680;

export default function MiddlePanel() {
  const { mode, step } = useWork();
  const map = mode === 'draft' ? DRAFT : BUILD;
  const Panel = map[step] || map[Object.keys(map)[0]];

  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const dragStart = useRef(null);

  const onMouseDown = useCallback((e) => {
    dragStart.current = { x: e.clientX, startWidth: width };
    e.preventDefault();
  }, [width]);

  useEffect(() => {
    function onMove(e) {
      if (!dragStart.current) return;
      const delta = e.clientX - dragStart.current.x;
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, dragStart.current.startWidth + delta));
      setWidth(next);
    }
    function onUp() { dragStart.current = null; }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <section
      className="relative flex shrink-0 flex-col bg-ap-light"
      style={{ width: `${width}px` }}
    >
      <Panel />
      <div
        onMouseDown={onMouseDown}
        className="absolute right-0 top-0 h-full w-[6px] cursor-ew-resize bg-transparent hover:bg-black/10 active:bg-black/20"
        aria-label="Resize panel"
        role="separator"
      />
    </section>
  );
}
