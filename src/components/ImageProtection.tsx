import { useEffect } from 'react';

export default function ImageProtection() {
  useEffect(() => {
    const preventSave = (e: MouseEvent) => {
      e.preventDefault();
      alert('Images are protected and cannot be downloaded.');
    };

    const preventDrag = (e: DragEvent) => {
      e.preventDefault();
    };

    const preventContextMenu = (e: MouseEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventDrag);
    document.addEventListener('drop', preventDrag);
    document.addEventListener('keydown', (e) => {
      // Prevent saving with Ctrl/Cmd + S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
      }
    });

    // Add styles to prevent selection
    const style = document.createElement('style');
    style.innerHTML = `
      img {
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventDrag);
      document.removeEventListener('drop', preventDrag);
      document.head.removeChild(style);
    };
  }, []);

  return null;
} 