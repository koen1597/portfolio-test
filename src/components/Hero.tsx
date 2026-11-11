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
    <section id="hero" className="pt-24 pb-16 sm:pt-28 md:pt-32 md:pb-20 lg:pb-24 relative overflow-hidden bg-white text-slate-900 border-b border-slate-200/80">
      {/* Ambient background lighting with subtle soft pastel gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-50/70 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-indigo-50/70 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-sky-50/60 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Subtle fine tech grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
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
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-slate-800 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200/90 shadow-2xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
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

            {/* Key Skill Badges - Primary Skills Highlighted, Secondary Neutral */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
                {t('전문 기획 분야 (Core Competencies)', 'Specialized Scope')}
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.coreBadges.map((badge, idx) => {
                  const isPrimary =
                    badge.includes('서비스 기획') ||
                    badge.includes('UI/UX') ||
                    badge.includes('어드민') ||
                    badge.includes('AI 서비스') ||
                    badge.includes('결제') ||
                    badge.includes('Service Planning') ||
                    badge.includes('Admin') ||
                    badge.includes('AI Product') ||
                    badge.includes('Payment');

                  return (
                    <span
                      key={idx}
                      className={`inline-flex items-center text-xs px-3 py-1.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-2xs ${
                        isPrimary
                          ? 'font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 hover:bg-blue-100/70'
                          : 'font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90'
                      }`}
                    >
                      {badge}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* CTAs with responsive full-width mobile scaling and gap */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 mt-6">
              <button
                id="hero-view-projects-btn"
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 px-5 py-3 sm:py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <span>{t('프로젝트 케이스 스터디', 'View Case Studies')}</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                id="hero-contact-btn"
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 active:scale-95 bg-white hover:bg-slate-50 px-5 py-3 sm:py-2.5 rounded-lg border border-slate-200 shadow-2xs hover:border-slate-300 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <span>{t('연락처 및 이력서', 'Contact & Resume')}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </motion.div>

          {/* Profile Identity Card - Clean 2-Column Key-Value Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-md hover:shadow-xl transition-all duration-300 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl pointer-events-none" />

              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs shrink-0 ring-2 ring-slate-200/80">
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
                  <p className="text-[11px] font-mono text-slate-700 mt-0.5 font-medium">
                    {profile.location || 'Seoul · Tokyo'} · {profile.mbti || 'ENTJ-A'}
                  </p>
                </div>
              </div>

              {/* 2-Column Key-Value Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                {/* 1. Visa Status */}
                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    {t('비자 상태', 'Visa Status')}
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <span className="truncate">F-2 {t('거주 비자', 'Resident')}</span>
                  </div>
                  <div className="text-[10.5px] text-slate-700 leading-tight">
                    {t('취업 제한 없음', 'Full Eligibility')}
                  </div>
                </div>

                {/* 2. Languages */}
                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    {t('언어 역량', 'Languages')}
                  </div>
                  <div className="font-semibold text-slate-900">
                    KO · JA · EN
                  </div>
                  <div className="text-[10.5px] text-slate-700 leading-tight truncate">
                    {t('한국어·일본어 원어민', 'Bilingual Native')}
                  </div>
                </div>

                {/* 3. Base & Location */}
                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    {t('활동 권역', 'Base Location')}
                  </div>
                  <div className="font-semibold text-slate-900 truncate">
                    {profile.location || 'Seoul · Tokyo'}
                  </div>
                  <div className="text-[10.5px] text-slate-700 leading-tight">
                    {t('서울/도쿄 협업 가능', 'Seoul / Tokyo')}
                  </div>
                </div>

                {/* 4. Experience */}
                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    {t('기획 경력', 'Experience')}
                  </div>
                  <div className="font-semibold text-slate-900 truncate">
                    {profile.experienceYears || '7년+'}
                  </div>
                  <div className="text-[10.5px] text-slate-700 leading-tight">
                    {t('서비스 전주기 기획', 'End-to-End PM')}
                  </div>
                </div>
              </div>

              {/* Hiring note banner */}
              <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200/80 text-[11px] text-emerald-950 leading-relaxed font-medium">
                <span className="font-bold text-emerald-900">{t('채용 참고:', 'Hiring Note:')}</span>{' '}
                {t('기업 비자 지원(스폰서십) 불필요 · 내국인과 동일 즉시 채용 가능', 'No visa sponsorship required · Eligible for immediate standard hiring')}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
