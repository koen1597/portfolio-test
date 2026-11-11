import React, { useState, useEffect, useCallback } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

interface SectionItem {
  id: string;
  labelKo: string;
  labelEn: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'hero', labelKo: '홈', labelEn: 'Home' },
  { id: 'projects', labelKo: '프로젝트', labelEn: 'Projects' },
  { id: 'experience', labelKo: '경력', labelEn: 'Experience' },
  { id: 'about', labelKo: '소개 & 역량', labelEn: 'About' },
  { id: 'how-i-work', labelKo: '업무 방식', labelEn: 'Process' },
  { id: 'contact', labelKo: '연락처', labelEn: 'Contact' },
];

export const ScrollSpy: React.FC = () => {
  const { t } = usePortfolio();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 220; // Offset for header + eye focus level
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Edge case: bottom of the page always activates the last section
    if (window.scrollY + windowHeight >= documentHeight - 50) {
      setActiveSection(SECTIONS[SECTIONS.length - 1].id);
      return;
    }

    // Determine current active section
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const section = SECTIONS[i];
      const el = document.getElementById(section.id);
      if (el) {
        const top = el.offsetTop;
        if (scrollPosition >= top) {
          setActiveSection(section.id);
          return;
        }
      }
    }

    setActiveSection('hero');
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Scroll Spy Navigation"
      className="fixed right-8 xl:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3.5 items-end select-none pointer-events-auto"
    >
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;
        const label = t(section.labelKo, section.labelEn);

        return (
          <div
            key={section.id}
            className="relative flex items-center justify-end group py-0.5"
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Tooltip Label - Smooth hover display strictly on mouse enter */}
            <span
              className={`pointer-events-none absolute right-7 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium shadow-md transition-all duration-200 whitespace-nowrap z-50 ${
                isHovered
                  ? 'opacity-100 translate-x-0 bg-slate-900 text-white'
                  : 'opacity-0 translate-x-1.5'
              }`}
            >
              {label}
            </span>

            {/* Indicator Dot Button with generous hit area */}
            <button
              type="button"
              onClick={() => scrollToSection(section.id)}
              aria-label={`Scroll to ${label}`}
              className="p-1 -m-1 flex items-center justify-center cursor-pointer focus-visible:outline-none"
            >
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'h-7 w-2.5 bg-blue-600 ring-4 ring-blue-100 shadow-xs'
                    : 'h-2.5 w-2.5 bg-slate-300 hover:bg-slate-400 opacity-60 hover:opacity-100 hover:scale-125'
                }`}
              />
            </button>
          </div>
        );
      })}
    </nav>
  );
};
