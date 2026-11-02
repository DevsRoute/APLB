import { useCallback, useEffect, useRef, useState } from 'react';

// Drag-to-resize width for a left-anchored panel. Attach the returned
// onMouseDown to a handle on the panel's right edge.
export function useResizableWidth({ initial, min, max }) {
  const [width, setWidth] = useState(initial);
  const dragStart = useRef(null);

  const onMouseDown = useCallback((e) => {
    dragStart.current = { x: e.clientX, startWidth: width };
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  }, [width]);

  useEffect(() => {
    function onMove(e) {
      if (!dragStart.current) return;
      const delta = e.clientX - dragStart.current.x;
      setWidth(Math.min(max, Math.max(min, dragStart.current.startWidth + delta)));
    }
    function onUp() {
      if (!dragStart.current) return;
      dragStart.current = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [min, max]);

  return [width, onMouseDown];
}

export function ResizeHandle({ onMouseDown }) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="absolute right-0 top-0 z-10 h-full w-[6px] cursor-ew-resize bg-transparent hover:bg-black/10 active:bg-black/20"
      aria-label="Resize panel"
      role="separator"
    />
  );
}
