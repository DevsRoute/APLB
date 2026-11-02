import { useWork } from './WorkContext.jsx';
import { useResizableWidth, ResizeHandle } from './useResizableWidth.jsx';
import ManageLOIs from './panels/draft/ManageLOIs.jsx';
import LinkSite from './panels/draft/LinkSite.jsx';
import ChooseTemplate from './panels/draft/ChooseTemplate.jsx';
import AddOptionalLanguage from './panels/draft/AddOptionalLanguage.jsx';
import UploadTemplate from './panels/build/UploadTemplate.jsx';
import LinkSiteFields from './panels/build/LinkSiteFields.jsx';
import BuildOptionalLang from './panels/build/BuildOptionalLang.jsx';
import ConvertUnderscores from './panels/build/ConvertUnderscores.jsx';

const DRAFT = {
  manage: ManageLOIs,
  link: LinkSite,
  template: ChooseTemplate,
  language: AddOptionalLanguage,
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

  const [width, onResizeStart] = useResizableWidth({
    initial: DEFAULT_WIDTH,
    min: MIN_WIDTH,
    max: MAX_WIDTH,
  });

  return (
    <section
      className="relative flex shrink-0 flex-col bg-ap-light"
      style={{ width: `${width}px` }}
    >
      <Panel />
      <ResizeHandle onMouseDown={onResizeStart} />
    </section>
  );
}
