import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowDown, ArrowUpRight, ShieldCheck, Globe2 } from 'lucide-react';

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
    <section id="home" className="pt-28 pb-20 md:pt-36 md:pb-28 relative overflow-hidden bg-gradient-to-b from-[#050811] via-[#090D1A] to-[#0A0E1F] text-slate-100 border-b border-slate-800/80">
      {/* Ambient background lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Subtle fine tech grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.35) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Top Grid: Main Statement + Identity Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Typography Column */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 space-y-6"
          >
            
            {/* Live Status Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-blue-300 bg-blue-950/70 px-3.5 py-1.5 rounded-full border border-blue-800/70 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span>{t('신규 서비스 & UI/UX 기획 진행 가능', 'Available for Product Planning')}</span>
              </span>
              <span className="text-xs font-mono text-slate-500">·</span>
              <span className="text-xs font-mono text-slate-400 font-medium">
                {profile.experienceYears}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3.5">
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.14] text-balance">
                {profile.heroQuote}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                {profile.heroSubquote}
              </p>
            </div>

            {/* Key Skill Badges */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                {t('전문 기획 분야 (Core Competencies)', 'Specialized Scope')}
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.coreBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-850 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-colors shadow-2xs"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="hero-view-projects-btn"
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-lg transition-all shadow-md shadow-blue-600/30 hover:shadow-blue-600/40"
              >
                <span>{t('프로젝트 케이스 스터디', 'View Case Studies')}</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                id="hero-contact-btn"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 px-4 py-2.5 rounded-lg border border-slate-700/80 hover:border-slate-500 transition-all shadow-2xs"
              >
                <span>{t('연락처 및 이력서', 'Contact & Resume')}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </motion.div>

          {/* Profile Identity Card */}
          <motion.div 
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800/90 p-6 shadow-2xl space-y-5 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-800/80">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-md shrink-0 ring-2 ring-blue-500/20">
                  {profile.photoUrl && !imageError ? (
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-white flex flex-col items-center justify-center font-bold tracking-wider select-none">
                      <span className="text-xl font-bold font-mono tracking-wider">KN</span>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold text-white tracking-tight truncate">
                    {profile.name}
                  </h2>
                  <p className="text-xs text-blue-400 font-medium truncate mt-0.5">
                    {profile.roleTitle}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {profile.location || 'Seoul · Tokyo'} · {profile.mbti || 'ENTJ-A'}
                  </p>
                </div>
              </div>

              {/* Background & Languages */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>{t('문화적 배경 & 언어', 'Background & Languages')}</span>
                  <span className="text-blue-400">KO / JA / EN</span>
                </div>
                <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="text-slate-200 font-medium leading-relaxed">
                    {profile.backgroundOrigin}
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/50">
                    {t('일본 출생 · 글로벌 성장 · 시니어 서비스 기획', 'Born in Japan · Global Growth · Senior Service Planner')}
                  </div>
                </div>
              </div>

              {/* Core Philosophy mini quote */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  {t('기획 철학', 'Planning Philosophy')}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-blue-500 pl-3 py-0.5">
                  {t(
                    '"비즈니스 모델과 운영 동선을 먼저 꿰뚫어야 안정적인 UI/UX가 완성됩니다."',
                    '"True UI/UX stability stems from mastering the business and operational architecture first."'
                  )}
                </p>
              </div>

              {/* Quick stats row */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80 text-xs">
                <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40">
                  <div className="text-blue-400 font-mono text-[10px]">{t('전문 포지션', 'Position')}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{profile.experienceYears}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 font-mono text-[10px]">{t('업무 영역', 'Coverage')}</div>
                  <div className="text-sm font-semibold text-slate-200 mt-0.5">{t('전주기 (E2E)', 'End-to-End')}</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
