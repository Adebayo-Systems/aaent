import { useEffect } from 'react';

/**
 * Deters casual content copying and image theft.
 * NOTE: This is a deterrent, not a hard block — determined users can still
 * view source or use DevTools. Keeps casual copiers out.
 */
export function useAntiCopy() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => e.preventDefault();

    // Block common keyboard shortcuts: Ctrl+C, Ctrl+U (view source),
    // Ctrl+S (save), Ctrl+A (select all), F12 (devtools), Ctrl+Shift+I/J
    const handleKeyDown = (e) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (
        (ctrl && ['c', 'u', 's', 'a', 'p'].includes(e.key.toLowerCase())) ||
        (ctrl && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };

    // Prevent drag-to-copy on images
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);
}
