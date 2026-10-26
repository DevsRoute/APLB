import { useWork } from './WorkContext.jsx';
import ManageLOIs from './panels/draft/ManageLOIs.jsx';
import LinkSite from './panels/draft/LinkSite.jsx';
import ChooseTemplate from './panels/draft/ChooseTemplate.jsx';
import AddOptionalLanguage from './panels/draft/AddOptionalLanguage.jsx';
import UnderscoresAndEdit from './panels/draft/UnderscoresAndEdit.jsx';
import FillTemplateData from './panels/draft/FillTemplateData.jsx';
import UploadTemplate from './panels/build/UploadTemplate.jsx';
import LinkSiteFields from './panels/build/LinkSiteFields.jsx';
import BuildOptionalLang from './panels/build/BuildOptionalLang.jsx';
import ConvertUnderscores from './panels/build/ConvertUnderscores.jsx';

const DRAFT = {
  manage: ManageLOIs,
  link: LinkSite,
  template: ChooseTemplate,
  'fill-data': FillTemplateData,
  language: AddOptionalLanguage,
  edit: UnderscoresAndEdit,
};
const BUILD = {
  upload: UploadTemplate,
  'link-fields': LinkSiteFields,
  'opt-lib': BuildOptionalLang,
  underscores: ConvertUnderscores,
};

export default function MiddlePanel() {
  const { mode, step } = useWork();
  const map = mode === 'draft' ? DRAFT : BUILD;
  const Panel = map[step] || map[Object.keys(map)[0]];
  return (
    <section className="flex w-[358px] shrink-0 flex-col bg-ap-light">
      <Panel />
    </section>
  );
}
