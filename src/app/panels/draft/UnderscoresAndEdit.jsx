import OptionalLanguageList from './OptionalLanguageList.jsx';
import StepFooter from '../StepFooter.jsx';

export default function UnderscoresAndEdit() {
  return (
    <>
      <OptionalLanguageList />
      <StepFooter prev={{ key: 'language', label: 'Add Optional Language' }} />
    </>
  );
}
