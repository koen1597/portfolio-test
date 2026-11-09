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
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 py-3.5 sm:py-4 ${
        isScrolled
          ? 'bg-white/95 border-b border-slate-200/90 shadow-xs backdrop-blur-md'
          : 'bg-[#F8FAFC]/85 border-b border-transparent backdrop-blur-xs'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand */}
        <button
          id="header-brand-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <span className="font-bold text-slate-900 tracking-tight text-lg group-hover:text-blue-600 transition-colors">
            {data.profile.name}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80 font-medium">
            {t('기획자', 'Planner')}
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-medium text-slate-600">
          <button
            id="nav-projects"
            onClick={() => scrollTo('projects')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            {t('프로젝트', 'Projects')}
          </button>
          <button
            id="nav-experience"
            onClick={() => scrollTo('experience')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            {t('경력', 'Experience')}
          </button>
          <button
            id="nav-about"
            onClick={() => scrollTo('about')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            {t('소개', 'About')}
          </button>
          <button
            id="nav-how-i-work"
            onClick={() => scrollTo('how-i-work')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            {t('업무 방식', 'How I Work')}
          </button>
          <button
            id="nav-contact"
            onClick={() => scrollTo('contact')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            {t('연락처', 'Contact')}
          </button>
        </nav>

        {/* Actions: Language Toggle + Resume + CMS */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle Button (KR / ENG) */}
          <div
            id="lang-toggle-group"
            className="inline-flex items-center p-0.5 bg-slate-100 rounded-md border border-slate-200/90 text-xs font-mono shadow-2xs"
            role="group"
            aria-label="Language selection"
          >
            <button
              id="lang-btn-kr"
              type="button"
              onClick={() => setLanguage('ko')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                language === 'ko'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="한국어 버전으로 보기 (기본)"
            >
              KR
            </button>
            <button
              id="lang-btn-en"
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="View in English"
            >
              ENG
            </button>
          </div>

          <button
            id="header-resume-btn"
            onClick={openResume}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 px-3.5 py-1.5 rounded-md border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('이력서', 'Resume')}</span>
          </button>

          {/* ADMIN Button (Top Header - Unified before & after login) */}
          {isAdminAuthenticated ? (
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/90 px-2.5 py-1.5 rounded-md text-xs font-mono">
              <button
                id="header-admin-btn"
                onClick={openAdminModal}
                className="inline-flex items-center gap-1.5 font-semibold text-amber-800 hover:text-amber-900 text-xs transition-colors cursor-pointer"
                title={t('관리자 CMS 열기', 'Open Admin CMS')}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>ADMIN</span>
              </button>
              <span className="text-amber-300">|</span>
              <button
                onClick={adminLogout}
                className="text-[11px] text-amber-700 hover:text-amber-900 transition-colors cursor-pointer"
                title={t('관리자 로그아웃', 'Admin Logout')}
              >
                {t('로그아웃', 'Logout')}
              </button>
            </div>
          ) : (
            <button
              id="header-admin-btn"
              onClick={openAdminModal}
              className="inline-flex items-center gap-1.5 text-xs font-semibold font-mono text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
              title={t('관리자 로그인', 'Admin Login')}
            >
              <Lock className="w-3 h-3 text-slate-500" />
              <span>ADMIN</span>
            </button>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Language Pill */}
          <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-md border border-slate-200 text-xs font-mono">
            <button
              onClick={() => setLanguage('ko')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                language === 'ko' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              KR
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                language === 'en' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ENG
            </button>
          </div>

          {/* Mobile ADMIN Button */}
          <button
            id="mobile-admin-btn"
            onClick={openAdminModal}
            className={`px-2 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1 border transition-colors cursor-pointer ${
              isAdminAuthenticated
                ? 'text-amber-800 bg-amber-50 border-amber-200'
                : 'text-slate-700 bg-white border-slate-200'
            }`}
            title="ADMIN"
          >
            <Lock className="w-3 h-3 text-slate-500" />
            <span>ADMIN</span>
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <button
              onClick={() => scrollTo('projects')}
              className="text-left py-1.5 hover:text-blue-600"
            >
              {t('프로젝트', 'Projects')}
            </button>
            <button
              onClick={() => scrollTo('experience')}
              className="text-left py-1.5 hover:text-blue-600"
            >
              {t('경력', 'Experience')}
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-1.5 hover:text-blue-600"
            >
              {t('소개', 'About')}
            </button>
            <button
              onClick={() => scrollTo('how-i-work')}
              className="text-left py-1.5 hover:text-blue-600"
            >
              {t('업무 방식', 'How I Work')}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left py-1.5 hover:text-blue-600"
            >
              {t('연락처', 'Contact')}
            </button>
          </div>
          <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openResume();
              }}
              className="flex-1 inline-flex justify-center items-center gap-1.5 text-xs font-semibold py-2 rounded-md bg-slate-50 border border-slate-200 text-slate-800"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>{t('이력서 보기', 'View Resume')}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAdminModal();
              }}
              className={`flex-1 inline-flex justify-center items-center gap-1.5 text-xs font-mono font-medium py-2 rounded-md border ${
                isAdminAuthenticated
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>ADMIN</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
