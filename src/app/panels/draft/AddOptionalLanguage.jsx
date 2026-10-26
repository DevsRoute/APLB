import OptionalLanguageList from './OptionalLanguageList.jsx';
import StepFooter from '../StepFooter.jsx';

export default function AddOptionalLanguage() {
  return (
    <>
      <OptionalLanguageList />
      <StepFooter
        prev={{ key: 'fill-data', label: 'Fill Template Data' }}
        next={{ key: 'edit', label: 'Underscores and Edit' }}
      />
    </>
  );
}
