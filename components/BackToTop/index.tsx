'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'react-feather';

const GAP = 24; // matches the bottom-6 / right-6 (1.5rem) offset

export default function BackToTop({ threshold = 600 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(GAP);

  useEffect(() => {
    function updatePosition() {
      setVisible(window.scrollY > threshold);

      // Keep the button clear of the footer once it scrolls into view,
      // rather than assuming a fixed footer height.
      const footer = document.querySelector('footer');
      if (!footer) return;

      const { top } = footer.getBoundingClientRect();
      const overlap = window.innerHeight - top;
      setBottomOffset(overlap > 0 ? overlap + GAP : GAP);
    }

    updatePosition();
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [threshold]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      style={{ bottom: bottomOffset }}
      className={`fixed right-6 z-50 bg-shadow text-shadow-light hover:text-highlight-2 rounded-sm p-2.5 shadow-[0_0.3125rem_0.9375rem_0_rgba(0,0,0,0.4)] transition-[opacity,transform] duration-300 ${
        visible
          ? 'opacity-80 hover:opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
