import {
  Bold, Italic, Underline,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered,
  Undo2, Redo2,
  Indent, Outdent, Pin, ChevronDown,
} from 'lucide-react';

const FONTS = ['Arial', 'Calibri', 'Times New Roman', 'Georgia', 'Courier New', 'Verdana'];

export default function EditorToolbar({ fontFamily, fontSizePx, onFont, onFontSize, onExport, onSend }) {
  const exec = (command, value = null) => {
    document.execCommand('styleWithCSS', false, true);
    document.execCommand(command, false, value);
  };

  return (
    <div className="flex h-[42px] items-center gap-[6px] border-b border-black/10 bg-white px-[16px] text-ap-text">
      <IconBtn onClick={() => exec('insertOrderedList')} title="Numbered list"><ListOrdered size={16} /></IconBtn>
      <IconBtn onClick={() => exec('insertUnorderedList')} title="Bulleted list"><List size={16} /></IconBtn>
      <Divider />
      <IconBtn onClick={() => exec('undo')} title="Undo"><Undo2 size={16} /></IconBtn>
      <IconBtn onClick={() => exec('redo')} title="Redo"><Redo2 size={16} /></IconBtn>
      <Divider />

      <div className="relative">
        <select
          value={fontFamily}
          onChange={(e) => { onFont(e.target.value); exec('fontName', e.target.value); }}
          className="h-[28px] appearance-none border border-black/15 bg-white pl-[8px] pr-[22px] text-[12px] text-ap-text"
        >
          {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
        <ChevronDown size={12} className="pointer-events-none absolute right-[6px] top-1/2 -translate-y-1/2 text-ap-text/60" />
      </div>

      <div className="ml-[2px] flex h-[28px] items-center overflow-hidden border border-black/15 bg-white">
        <input
          type="number"
          value={fontSizePx}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v > 0) { onFontSize(v); applyFontSizePx(v); }
          }}
          className="h-full w-[40px] bg-transparent px-[6px] text-center text-[12px] [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          onClick={() => { const v = Math.max(1, fontSizePx - 1); onFontSize(v); applyFontSizePx(v); }}
          className="h-full border-l border-black/15 px-[6px] text-ap-text hover:bg-black/5"
        >−</button>
        <button
          onClick={() => { const v = fontSizePx + 1; onFontSize(v); applyFontSizePx(v); }}
          className="h-full border-l border-black/15 px-[6px] text-ap-text hover:bg-black/5"
        >+</button>
      </div>

      <Divider />
      <IconBtn onClick={() => exec('bold')} title="Bold"><Bold size={16} /></IconBtn>
      <IconBtn onClick={() => exec('italic')} title="Italic"><Italic size={16} /></IconBtn>
      <IconBtn onClick={() => exec('underline')} title="Underline"><Underline size={16} /></IconBtn>
      <Divider />
      <IconBtn onClick={() => exec('justifyLeft')} title="Align left"><AlignLeft size={16} /></IconBtn>
      <IconBtn onClick={() => exec('justifyCenter')} title="Align center"><AlignCenter size={16} /></IconBtn>
      <IconBtn onClick={() => exec('justifyRight')} title="Align right"><AlignRight size={16} /></IconBtn>
      <IconBtn onClick={() => exec('justifyFull')} title="Justify"><AlignJustify size={16} /></IconBtn>
      <Divider />
      <IconBtn onClick={() => exec('outdent')} title="Decrease indent"><Outdent size={16} /></IconBtn>
      <IconBtn onClick={() => exec('indent')} title="Increase indent"><Indent size={16} /></IconBtn>
      <IconBtn title="Pin"><Pin size={16} /></IconBtn>

      <div className="ml-auto flex items-center gap-[14px]">
        <button onClick={onExport} className="text-[13px] font-bold text-ap-text hover:underline">Export</button>
        <button onClick={onSend}   className="text-[13px] font-bold text-ap-text hover:underline">Send</button>
      </div>
    </div>
  );
}

function IconBtn({ children, onClick, title }) {
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      className="grid h-[28px] w-[28px] place-items-center rounded hover:bg-black/5"
    >{children}</button>
  );
}
function Divider() {
  return <div className="mx-[2px] h-[20px] w-px bg-black/15" />;
}

function applyFontSizePx(px) {
  document.execCommand('styleWithCSS', false, true);
  document.execCommand('fontSize', false, 7);
  for (const n of document.querySelectorAll('font[size="7"], [style*="font-size: xx-large"]')) {
    n.removeAttribute('size');
    n.style.fontSize = `${px}px`;
  }
}
