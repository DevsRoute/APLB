import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { listSites } from '../lib/api/sites.js';
import { listTemplates, fetchTemplate } from '../lib/api/templates.js';
import { parsePlaceholders } from '../lib/parsePlaceholders.js';
import { autoMapFields, buildFillData } from '../lib/autoMapFields.js';
import { fillDocx, blobToArrayBuffer } from '../lib/fillTemplate.js';
import { fillOptionalLanguage } from '../lib/fillOptionalLanguage.js';

const Ctx = createContext(null);

const FILL_ON_STEPS = new Set(['language', 'edit']);

export function WorkProvider({ children }) {
  const [mode, setMode] = useState('draft');
  const [step, setStep] = useState('manage');
  const [sites, setSites] = useState([]);
  const [site, setSite] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [templateBuffer, setTemplateBuffer] = useState(null);
  const [filled, setFilled] = useState(null);
  const [chosenLanguage, setChosenLanguage] = useState({});
  const [savedLOIs, setSavedLOIs] = useState([]);
  const [sentLOIs, setSentLOIs] = useState([]);

  const fillInFlight = useRef(false);
  const chosenLanguageRef = useRef(chosenLanguage);
  chosenLanguageRef.current = chosenLanguage;

  useEffect(() => {
    listSites().then((s) => {
      setSites(s);
      setSite(s.find((x) => x.id === 'sample-site') ?? s[0] ?? null);
    });
    listTemplates().then((t) => {
      setTemplates(t);
      setTemplate(t.find((x) => x.id === 'loi-apst-latest') ?? t[0] ?? null);
    });
  }, []);

  useEffect(() => {
    if (!template) {
      setTemplateBuffer(null);
      setFilled(null);
      return;
    }
    let cancelled = false;
    setFilled(null);
    fetchTemplate(template.id).then(({ arrayBuffer }) => {
      if (!cancelled) setTemplateBuffer(arrayBuffer);
    });
    return () => { cancelled = true; };
  }, [template]);

  useEffect(() => {
    setFilled(null);
  }, [site, chosenLanguage]);

  const runFill = useCallback(async () => {
    if (!site || !templateBuffer || filled || fillInFlight.current) return;
    fillInFlight.current = true;
    try {
      while (true) {
        const chosenAtStart = chosenLanguageRef.current;
        try {
          const afterClauses = fillOptionalLanguage(templateBuffer, chosenAtStart);
          const { squares } = parsePlaceholders(afterClauses);
          const mapping = autoMapFields(squares);
          const data = buildFillData(site, mapping);
          const blob = fillDocx(afterClauses, data);
          const buffer = await blobToArrayBuffer(blob);
          if (chosenAtStart === chosenLanguageRef.current) {
            setFilled({ buffer, blob });
            return;
          }
        } catch (err) {
          console.error('[runFill] pipeline error:', err);
          return;
        }
      }
    } finally {
      fillInFlight.current = false;
    }
  }, [site, templateBuffer, filled]);

  useEffect(() => {
    if (FILL_ON_STEPS.has(step)) runFill();
  }, [step, runFill]);

  const value = useMemo(() => ({
    mode, step, setMode, setStep,
    sites, site, setSite,
    templates, template, setTemplate,
    templateBuffer,
    filled,
    runFill,
    chosenLanguage, setChosenLanguage,
    savedLOIs, setSavedLOIs,
    sentLOIs, setSentLOIs,
  }), [mode, step, sites, site, templates, template, templateBuffer, filled, runFill, chosenLanguage, savedLOIs, sentLOIs]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWork() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useWork must be used inside WorkProvider');
  return v;
}
