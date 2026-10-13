import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { listSites } from '../lib/api/sites.js';
import { listTemplates, fetchTemplate } from '../lib/api/templates.js';
import { parsePlaceholders } from '../lib/parsePlaceholders.js';
import { autoMapFields, buildFillData } from '../lib/autoMapFields.js';
import { fillDocx, blobToArrayBuffer } from '../lib/fillTemplate.js';

const Ctx = createContext(null);

export function WorkProvider({ children }) {
  const [mode, setMode] = useState('draft');          // 'draft' | 'build'
  const [step, setStep] = useState('manage');         // default landing — Manage LOIs
  const [sites, setSites] = useState([]);
  const [site, setSite] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [filled, setFilled] = useState(null);
  const [chosenLanguage, setChosenLanguage] = useState({});
  const [savedLOIs, setSavedLOIs] = useState([]);
  const [sentLOIs, setSentLOIs] = useState([]);

  useEffect(() => {
    listSites().then((s) => {
      setSites(s);
      // Match Figma: the selected site is Cheviot Park (middle one).
      setSite(s.find((x) => x.id === 'cheviot-2330') ?? s[0] ?? null);
    });
    listTemplates().then((t) => {
      setTemplates(t);
      setTemplate(t.find((x) => x.id === 'dt-shopping-center') ?? t[0] ?? null);
    });
  }, []);

  useEffect(() => {
    if (!site || !template) return;
    (async () => {
      const { arrayBuffer } = await fetchTemplate(template.id);
      const { squares } = parsePlaceholders(arrayBuffer);
      const mapping = autoMapFields(squares);
      const data = buildFillData(site, mapping);
      const blob = fillDocx(arrayBuffer, data);
      const buffer = await blobToArrayBuffer(blob);
      setFilled({ buffer, blob });
    })();
  }, [site, template]);

  const value = useMemo(() => ({
    mode, step, setMode, setStep,
    sites, site, setSite,
    templates, template, setTemplate,
    filled,
    chosenLanguage, setChosenLanguage,
    savedLOIs, setSavedLOIs,
    sentLOIs, setSentLOIs,
  }), [mode, step, sites, site, templates, template, filled, chosenLanguage, savedLOIs, sentLOIs]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWork() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useWork must be used inside WorkProvider');
  return v;
}
