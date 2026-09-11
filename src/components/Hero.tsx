import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data, t } = usePortfolio();
  const { profile } = data;
  const [imageError, setImageError] = useState(false);

  // Reset error whenever photoUrl updates
  useEffect(() => {
    setImageError(false);
  }, [profile.photoUrl]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-28 pb-20 md:pt-36 md:pb-28 border-b border-zinc-200/70 relative overflow-hidden">
      {/* Ambient background accents */}
      <div className="absolute -top-16 -right-16 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-44 -left-20 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Main Typography Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Role Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-blue-800 bg-blue-50/90 px-3 py-1 rounded-full border border-blue-200/80 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                  {t('신규 프로젝트 기획 진행 가능', 'Available for Product Planning')}
                </span>
                <span className="text-xs font-mono text-zinc-400">·</span>
                <span className="text-xs font-mono text-zinc-500">
                  {profile.experienceYears}
                </span>
              </div>
              <h2 className="text-sm font-semibold tracking-wide text-zinc-700 uppercase">
                {profile.roleTitle}
              </h2>
            </div>

            {/* Main Statement */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-semibold tracking-tight text-zinc-950 leading-[1.15] max-w-2xl text-balance">
                {profile.heroQuote}
              </h1>
              <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-xl">
                {profile.heroSubquote}
              </p>
            </div>

            {/* Key Skill Pillars */}
            <div className="space-y-2.5 pt-2">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                {t('핵심 역량 및 업무 범위', 'Core Competencies & Scope')}
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.coreBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs font-medium text-zinc-800 bg-white px-3 py-1.5 rounded-md border border-zinc-200/90 hover:border-blue-300 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                id="hero-view-projects-btn"
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-all shadow-sm shadow-blue-500/25 hover:shadow-blue-500/35"
              >
                <span>{t('선정 프로젝트 케이스 스터디', 'View Selected Projects')}</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                id="hero-contact-btn"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-blue-700 bg-white hover:bg-blue-50/40 px-4 py-2.5 rounded-lg border border-zinc-300 hover:border-blue-300 transition-all shadow-2xs"
              >
                <span>{t('연락처 및 이력서', 'Contact & Resume')}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500" />
              </button>
            </div>
          </div>

          {/* Editorial Identity Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-zinc-200/90 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-zinc-100">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/90 shadow-xs flex-shrink-0 ring-2 ring-blue-500/10">
                  {(profile.photoUrl || '/profile.png') && !imageError ? (
                    <img
                      src={profile.photoUrl || '/profile.png'}
                      alt={profile.name}
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg tracking-wider">
                      {profile.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-zinc-950 tracking-tight truncate">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-zinc-600 font-medium truncate">
                    {profile.roleTitle}
                  </p>
                  <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                    {profile.location || 'Seoul · Tokyo'} · {profile.mbti || 'ENTJ-A'}
                  </p>
                </div>
              </div>

              {/* Identity highlight */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  {t('글로벌 커뮤니케이션 & 배경', 'Global Perspective')}
                </div>
                <div className="bg-zinc-50/80 rounded-lg p-3 border border-zinc-200/60 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 sm:gap-2">
                    <span className="font-medium text-zinc-700 whitespace-nowrap shrink-0">{t('문화적 배경', 'Background')}</span>
                    <span className="text-zinc-900 font-medium sm:text-right text-[11px] leading-snug break-keep">{profile.backgroundOrigin}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-zinc-200/50">
                    <span className="font-medium text-zinc-700">{t('구사 언어', 'Languages')}</span>
                    <span className="text-zinc-600 font-mono text-[11px] bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200/80">KO / JA / EN</span>
                  </div>
                </div>
              </div>

              {/* Core Philosophy mini quote */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  {t('기획 철학', 'Planning Philosophy')}
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed italic border-l-2 border-blue-600 pl-3 py-0.5">
                  {t(
                    '"기획은 화면을 그리기 전에 비즈니스와 운영 구조를 먼저 이해하는 것에서 시작합니다."',
                    '"Planning starts by understanding business and operational architecture before drawing screens."'
                  )}
                </p>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-100">
                <div className="p-2.5 rounded-lg bg-blue-50/40 border border-blue-100/70">
                  <div className="text-xs text-blue-700 font-medium">{t('실무 경력', 'Years Active')}</div>
                  <div className="text-base font-semibold text-zinc-950 mt-0.5">{profile.experienceYears}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-50/60 border border-zinc-100">
                  <div className="text-xs text-zinc-400">{t('업무 영역', 'Coverage')}</div>
                  <div className="text-base font-semibold text-zinc-900 mt-0.5">{t('전주기 (End-to-End)', 'End-to-End')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
