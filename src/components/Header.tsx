import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock, FileText, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { data, language, setLanguage, openAdminModal, openResume, t, isAdminAuthenticated, adminLogout } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAF9F6]/90 backdrop-blur-md border-b border-zinc-200/80 py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand */}
        <button
          id="header-brand-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 text-left group"
        >
          <span className="font-semibold text-zinc-950 tracking-tight text-lg group-hover:text-zinc-700 transition-colors">
            {data.profile.name}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200/60">
            {t('기획자', 'Planner')}
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-medium text-zinc-600">
          <button
            id="nav-about"
            onClick={() => scrollTo('about')}
            className="hover:text-zinc-950 transition-colors"
          >
            {t('소개', 'About')}
          </button>
          <button
            id="nav-projects"
            onClick={() => scrollTo('projects')}
            className="hover:text-zinc-950 transition-colors"
          >
            {t('프로젝트', 'Projects')}
          </button>
          <button
            id="nav-experience"
            onClick={() => scrollTo('experience')}
            className="hover:text-zinc-950 transition-colors"
          >
            {t('경력 & 전주기', 'Experience')}
          </button>
          <button
            id="nav-how-i-work"
            onClick={() => scrollTo('how-i-work')}
            className="hover:text-zinc-950 transition-colors"
          >
            {t('업무 방식', 'How I Work')}
          </button>
          <button
            id="nav-contact"
            onClick={() => scrollTo('contact')}
            className="hover:text-zinc-950 transition-colors"
          >
            {t('연락처', 'Contact')}
          </button>
        </nav>

        {/* Actions: Language Toggle + Resume + CMS */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle Button (KR / ENG) */}
          <div
            id="lang-toggle-group"
            className="inline-flex items-center p-0.5 bg-zinc-100/90 rounded-md border border-zinc-200/90 text-xs font-mono shadow-2xs"
            role="group"
            aria-label="Language selection"
          >
            <button
              id="lang-btn-kr"
              type="button"
              onClick={() => setLanguage('ko')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                language === 'ko'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-blue-600'
              }`}
              title="한국어 버전으로 보기 (기본)"
            >
              KR
            </button>
            <button
              id="lang-btn-en"
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                language === 'en'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-blue-600'
              }`}
              title="View in English"
            >
              ENG
            </button>
          </div>

          <button
            id="header-resume-btn"
            onClick={openResume}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-blue-700 bg-white hover:bg-blue-50/40 px-3 py-1.5 rounded-md border border-zinc-200 hover:border-blue-200 shadow-xs transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-500" />
            <span>{t('이력서', 'Resume')}</span>
          </button>

          {isAdminAuthenticated && (
            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200/90 px-2 py-1 rounded-md text-xs">
              <button
                id="header-admin-btn"
                onClick={openAdminModal}
                className="inline-flex items-center gap-1 font-medium text-amber-900 hover:text-amber-950 font-mono text-[11px]"
                title={t('CMS 관리자 열기', 'Open CMS Admin')}
              >
                <Lock className="w-3 h-3 text-amber-700" />
                <span>{t('CMS 관리', 'CMS Admin')}</span>
              </button>
              <span className="text-amber-300">|</span>
              <button
                onClick={adminLogout}
                className="text-[10px] font-mono text-zinc-500 hover:text-zinc-800"
                title={t('관리자 로그아웃', 'Admin Logout')}
              >
                {t('로그아웃', 'Logout')}
              </button>
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Language Pill */}
          <div className="inline-flex items-center p-0.5 bg-zinc-100 rounded-md border border-zinc-200 text-xs font-mono">
            <button
              onClick={() => setLanguage('ko')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                language === 'ko' ? 'bg-blue-600 text-white shadow-2xs' : 'text-zinc-600 hover:text-blue-600'
              }`}
            >
              KR
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                language === 'en' ? 'bg-blue-600 text-white shadow-2xs' : 'text-zinc-600 hover:text-blue-600'
              }`}
            >
              ENG
            </button>
          </div>

          {isAdminAuthenticated && (
            <button
              id="mobile-admin-btn"
              onClick={openAdminModal}
              className="p-1.5 rounded-md text-amber-800 bg-amber-50 border border-amber-200"
              title="CMS Admin"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-b border-zinc-200 px-6 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-zinc-700">
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-1.5 hover:text-zinc-950"
            >
              {t('소개', 'About')}
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="text-left py-1.5 hover:text-zinc-950"
            >
              {t('프로젝트', 'Projects')}
            </button>
            <button
              onClick={() => scrollTo('experience')}
              className="text-left py-1.5 hover:text-zinc-950"
            >
              {t('경력 & 전주기', 'Experience')}
            </button>
            <button
              onClick={() => scrollTo('how-i-work')}
              className="text-left py-1.5 hover:text-zinc-950"
            >
              {t('업무 방식', 'How I Work')}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left py-1.5 hover:text-zinc-950"
            >
              {t('연락처', 'Contact')}
            </button>
          </div>
          <div className="pt-3 border-t border-zinc-200 flex items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openResume();
              }}
              className="flex-1 inline-flex justify-center items-center gap-1.5 text-xs font-medium py-2 rounded-md bg-white border border-zinc-200 text-zinc-800"
            >
              <FileText className="w-3.5 h-3.5" />
              {t('이력서 보기', 'View Resume')}
            </button>
            {isAdminAuthenticated && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdminModal();
                }}
                className="flex-1 inline-flex justify-center items-center gap-1.5 text-xs font-medium py-2 rounded-md bg-amber-600 text-white"
              >
                <Lock className="w-3.5 h-3.5" />
                {t('CMS 관리', 'CMS Admin')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
