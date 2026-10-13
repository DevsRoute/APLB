// Thin wrapper around docx-preview (Apache-2.0). Renders a .docx into a
// container as real HTML DOM (section.docx > article > p/span/table) that
// visually matches Word. It renders only — set contenteditable="true" on the
// rendered <section class="docx"> nodes after render if the caller wants
// in-place editing (see src/app/EditorPane.jsx for an example).
import { renderAsync } from 'docx-preview';

export async function renderDocx(arrayBuffer, container, { styleContainer } = {}) {
  container.innerHTML = '';
  await renderAsync(arrayBuffer, container, styleContainer ?? null, {
    inWrapper: true,
    ignoreWidth: false,
    ignoreHeight: false,
    breakPages: true,
    renderHeaders: true,
    renderFooters: true,
    renderFootnotes: true,
    renderEndnotes: true,
    experimental: true,
    useBase64URL: true,
  });
}
