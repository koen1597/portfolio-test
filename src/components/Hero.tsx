import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio, cleanLeadText } from '../context/PortfolioContext';
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
    <section id="home" className="pt-24 pb-12 sm:pt-28 md:pt-32 md:pb-16 relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] text-slate-900 border-b border-slate-200/90">
      {/* Ambient background lighting with subtle soft pastel gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-100/70 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-indigo-100/70 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-sky-100/60 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Subtle fine tech grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-8 sm:space-y-10">
        {/* Top Grid: Main Statement + Identity Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Main Typography Column */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 space-y-6"
          >
            
            {/* Live Status Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 shadow-2xs font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span>{t('신규 서비스 & UI/UX 기획 진행 가능', 'Available for Product Planning')}</span>
              </span>
              <span className="text-xs font-mono text-slate-300">·</span>
              <span className="text-xs font-mono text-slate-600 font-semibold">
                {profile.experienceYears}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3.5">
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-slate-900 leading-[1.15] text-balance">
                {profile.heroQuote}
              </h1>
              {profile.heroSubquote ? (
                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                  {profile.heroSubquote}
                </p>
              ) : null}
            </div>

            {/* Key Skill Badges */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-medium">
                {t('전문 기획 분야 (Core Competencies)', 'Specialized Scope')}
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.coreBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/90 hover:border-blue-400 transition-colors shadow-2xs"
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
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>{t('프로젝트 케이스 스터디', 'View Case Studies')}</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                id="hero-contact-btn"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
              >
                <span>{t('연락처 및 이력서', 'Contact & Resume')}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
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
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xl space-y-5 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl pointer-events-none" />

              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs shrink-0 ring-2 ring-blue-500/20">
                  {profile.photoUrl && !imageError ? (
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-800 text-white flex flex-col items-center justify-center font-bold tracking-wider select-none">
                      <span className="text-xl font-bold font-mono tracking-wider">KN</span>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold text-slate-900 tracking-tight truncate">
                    {profile.name}
                  </h2>
                  <p className="text-xs text-blue-600 font-semibold truncate mt-0.5">
                    {cleanLeadText(profile.roleTitle)}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                    {profile.location || 'Seoul · Tokyo'} · {profile.mbti || 'ENTJ-A'}
                  </p>
                </div>
              </div>

              {/* Visa & Work Eligibility Status Badge */}
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <div className="min-w-0 flex-1 text-[11px] leading-tight">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-emerald-800 font-mono">F-2 {t('거주 비자', 'Resident Visa')}</span>
                    <span className="text-emerald-700 font-medium">· {t('국내 취업 활동 제한 없음', 'Full Work Eligibility')}</span>
                  </div>
                  <span className="block text-[10px] text-slate-500 mt-0.5">
                    {t('*기업 비자 지원(스폰서십) 불필요 · 내국인과 동일 채용 가능', '*No sponsorship required · Eligible for immediate standard hiring')}
                  </span>
                </div>
              </div>

              {/* Background & Languages */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>{t('문화적 배경 & 언어', 'Background & Languages')}</span>
                  <span className="text-blue-600 font-semibold">KO / JA / EN</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 text-xs">
                  <div className="text-slate-700 font-medium leading-relaxed">
                    {profile.backgroundOrigin}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
