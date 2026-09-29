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
          ? 'bg-[#060911]/98 border-b border-slate-800/80 shadow-lg shadow-black/50'
          : 'bg-[#050811]/80 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand */}
        <button
          id="header-brand-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 text-left group"
        >
          <span className="font-bold text-white tracking-tight text-lg group-hover:text-blue-400 transition-colors">
            {data.profile.name}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60">
            {t('기획자', 'Planner')}
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-medium text-slate-300">
          <button
            id="nav-projects"
            onClick={() => scrollTo('projects')}
            className="hover:text-white transition-colors"
          >
            {t('프로젝트', 'Projects')}
          </button>
          <button
            id="nav-about"
            onClick={() => scrollTo('about')}
            className="hover:text-white transition-colors"
          >
            {t('소개', 'About')}
          </button>
          <button
            id="nav-experience"
            onClick={() => scrollTo('experience')}
            className="hover:text-white transition-colors"
          >
            {t('경력 & 전주기', 'Experience')}
          </button>
          <button
            id="nav-how-i-work"
            onClick={() => scrollTo('how-i-work')}
            className="hover:text-white transition-colors"
          >
            {t('업무 방식', 'How I Work')}
          </button>
          <button
            id="nav-contact"
            onClick={() => scrollTo('contact')}
            className="hover:text-white transition-colors"
          >
            {t('연락처', 'Contact')}
          </button>
        </nav>

        {/* Actions: Language Toggle + Resume + CMS */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle Button (KR / ENG) */}
          <div
            id="lang-toggle-group"
            className="inline-flex items-center p-0.5 bg-slate-900/90 rounded-md border border-slate-800 text-xs font-mono shadow-xs"
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
                  : 'text-slate-400 hover:text-white'
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
                  : 'text-slate-400 hover:text-white'
              }`}
              title="View in English"
            >
              ENG
            </button>
          </div>

          <button
            id="header-resume-btn"
            onClick={openResume}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 px-3.5 py-1.5 rounded-md border border-slate-700/80 hover:border-slate-500 shadow-xs transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('이력서', 'Resume')}</span>
          </button>

          {/* ADMIN Button (Top Header - Unified before & after login) */}
          {isAdminAuthenticated ? (
            <div className="inline-flex items-center gap-2 bg-amber-950/60 border border-amber-800/80 px-2.5 py-1.5 rounded-md text-xs font-mono">
              <button
                id="header-admin-btn"
                onClick={openAdminModal}
                className="inline-flex items-center gap-1.5 font-semibold text-amber-300 hover:text-amber-200 text-xs transition-colors"
                title={t('관리자 CMS 열기', 'Open Admin CMS')}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ADMIN</span>
              </button>
              <span className="text-amber-800/80">|</span>
              <button
                onClick={adminLogout}
                className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
                title={t('관리자 로그아웃', 'Admin Logout')}
              >
                {t('로그아웃', 'Logout')}
              </button>
            </div>
          ) : (
            <button
              id="header-admin-btn"
              onClick={openAdminModal}
              className="inline-flex items-center gap-1.5 text-xs font-medium font-mono text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700/80 hover:border-slate-500 shadow-xs transition-all"
              title={t('관리자 로그인', 'Admin Login')}
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>ADMIN</span>
            </button>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Language Pill */}
          <div className="inline-flex items-center p-0.5 bg-slate-900 rounded-md border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setLanguage('ko')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                language === 'ko' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              KR
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                language === 'en' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              ENG
            </button>
          </div>

          {/* Mobile ADMIN Button */}
          <button
            id="mobile-admin-btn"
            onClick={openAdminModal}
            className={`px-2 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1 border transition-colors ${
              isAdminAuthenticated
                ? 'text-amber-300 bg-amber-950/60 border-amber-800/80'
                : 'text-slate-300 bg-slate-900 border-slate-800'
            }`}
            title="ADMIN"
          >
            <Lock className="w-3 h-3" />
            <span>ADMIN</span>
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-slate-200 hover:bg-slate-800 border border-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080C15] border-b border-slate-800 px-6 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollTo('projects')}
              className="text-left py-1.5 hover:text-white"
            >
              {t('프로젝트', 'Projects')}
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-1.5 hover:text-white"
            >
              {t('소개', 'About')}
            </button>
            <button
              onClick={() => scrollTo('experience')}
              className="text-left py-1.5 hover:text-white"
            >
              {t('경력 & 전주기', 'Experience')}
            </button>
            <button
              onClick={() => scrollTo('how-i-work')}
              className="text-left py-1.5 hover:text-white"
            >
              {t('업무 방식', 'How I Work')}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left py-1.5 hover:text-white"
            >
              {t('연락처', 'Contact')}
            </button>
          </div>
          <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openResume();
              }}
              className="flex-1 inline-flex justify-center items-center gap-1.5 text-xs font-medium py-2 rounded-md bg-slate-900 border border-slate-700 text-slate-200"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('이력서 보기', 'View Resume')}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAdminModal();
              }}
              className={`flex-1 inline-flex justify-center items-center gap-1.5 text-xs font-mono font-medium py-2 rounded-md border ${
                isAdminAuthenticated
                  ? 'bg-amber-950/60 border-amber-800 text-amber-300'
                  : 'bg-slate-900 border-slate-700 text-slate-200'
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
