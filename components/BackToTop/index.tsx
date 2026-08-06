'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'react-feather';

export default function BackToTop({ threshold = 600 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-50 bg-shadow text-shadow-light hover:text-highlight-2 rounded-sm p-2.5 shadow-[0_0.3125rem_0.9375rem_0_rgba(0,0,0,0.4)] transition-all duration-300 ${
        visible
          ? 'opacity-80 hover:opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
