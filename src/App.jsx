import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Shell from './app/Shell.jsx';
import PocSuperdoc from './pages/PocSuperdoc.jsx';
import PocDocxtemplater from './pages/PocDocxtemplater.jsx';
import PocPdf from './pages/PocPdf.jsx';
import PocFidelity from './pages/PocFidelity.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<Shell />} />
      <Route path="/poc/superdoc" element={<PocSuperdoc />} />
      <Route path="/poc/docxtemplater" element={<PocDocxtemplater />} />
      <Route path="/poc/pdf" element={<PocPdf />} />
      <Route path="/poc/fidelity" element={<PocFidelity />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
