import OptionalLanguageList from './OptionalLanguageList.jsx';
import StepFooter from '../StepFooter.jsx';

export default function AddOptionalLanguage() {
  return (
    <>
      <OptionalLanguageList />
      <StepFooter prev={{ key: 'template', label: 'Template' }} />
    </>
  );
}
