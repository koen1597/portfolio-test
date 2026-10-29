import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio, cleanLeadText } from '../context/PortfolioContext';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  Building2, 
  Globe, 
  Award, 
  Gamepad2, 
  Languages, 
  Sparkles 
} from 'lucide-react';
import { SectionTransition, FadeIn } from './SectionTransition';
import { ExperienceItem } from '../types';

export const ExperienceSection: React.FC = () => {
  const { data, t } = usePortfolio();
  const { lifecycle, experiences } = data;
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [showAllExperiences, setShowAllExperiences] = useState<boolean>(false);

  const coreExperiences = experiences.slice(0, 5);
  const extendedExperiences = experiences.slice(5);

  const getDomainBadge = (id: string, company: string) => {
    if (id === 'exp-1' || company.includes('어셈브릭스') || company.includes('Assemblix')) {
      return {
        label: t('SaaS & 물류 플랫폼 기획', 'SaaS & Logistics Platform Planner'),
        color: 'text-blue-300 bg-blue-950/80 border-blue-700/70',
        icon: <Building2 className="w-3.5 h-3.5 text-blue-400" />
      };
    }
    if (id === 'exp-2' || company.includes('아크리아스튜디오') || company.includes('Archria')) {
      return {
        label: t('AI 창작 도구 & 글로벌 웹툰 플랫폼', 'AI Creative Engine & Webtoon Platform'),
        color: 'text-indigo-300 bg-indigo-950/80 border-indigo-700/70',
        icon: <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
      };
    }
    if (id === 'exp-3' || company.includes('Sun & Rich')) {
      return {
        label: t('글로벌 모바일 앱 기획 & 파트너십', 'Global Mobile App & Partnerships'),
        color: 'text-cyan-300 bg-cyan-950/80 border-cyan-700/70',
        icon: <Globe className="w-3.5 h-3.5 text-cyan-400" />
      };
    }
    if (id === 'exp-4' || company.includes('위즈블') || company.includes('Wizbl')) {
      return {
        label: t('엔터테인먼트 플랫폼 전략 & UX', 'Entertainment Strategy & UX'),
        color: 'text-violet-300 bg-violet-950/80 border-violet-700/70',
        icon: <Briefcase className="w-3.5 h-3.5 text-violet-400" />
      };
    }
    if (id === 'exp-5' || company.includes('이엘파크') || company.includes('EL Park')) {
      return {
        label: t('메타버스 프로젝트 & 유틸리티 NFT', 'Metaverse Project & Utility NFT'),
        color: 'text-amber-300 bg-amber-950/80 border-amber-700/70',
        icon: <Award className="w-3.5 h-3.5 text-amber-400" />
      };
    }
    if (id === 'exp-6' || company.includes('NEXTOR')) {
      return {
        label: t('메타버스 플랫폼 사업 전략 & IR', 'Metaverse Strategy & IR Materials'),
        color: 'text-purple-300 bg-purple-950/80 border-purple-700/70',
        icon: <Globe className="w-3.5 h-3.5 text-purple-400" />
      };
    }
    if (id === 'exp-7' || company.includes('더퓨쳐컴퍼니') || company.includes('Metaverse2')) {
      return {
        label: t('가상 부동산 플랫폼 & 로컬라이제이션', 'Virtual Real Estate & Localization'),
        color: 'text-teal-300 bg-teal-950/80 border-teal-700/70',
        icon: <Building2 className="w-3.5 h-3.5 text-teal-400" />
      };
    }
    if (id === 'exp-8' || company.includes('YouTube')) {
      return {
        label: t('Google YouTube 글로벌 CS 운영', 'Google YouTube Global Support Operations'),
        color: 'text-rose-300 bg-rose-950/80 border-rose-700/70',
        icon: <Globe className="w-3.5 h-3.5 text-rose-400" />
      };
    }
    if (id === 'exp-9' || company.includes('iHerb')) {
      return {
        label: t('글로벌 이커머스 해외 운영팀 (3년 2개월)', 'Global E-Commerce Operations (3y 2m)'),
        color: 'text-emerald-300 bg-emerald-950/80 border-emerald-700/70',
        icon: <Award className="w-3.5 h-3.5 text-emerald-400" />
      };
    }
    if (id === 'exp-10' || company.includes('DetonatioN')) {
      return {
        label: t('일본 프로 e스포츠 구단 선수 & 방송 출연', 'Japanese Pro Esports Player & Official Media'),
        color: 'text-amber-300 bg-amber-950/80 border-amber-700/70',
        icon: <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
      };
    }
    if (id === 'exp-11' || company.includes('Upwork')) {
      return {
        label: t('한/영/일 전문 로컬라이제이션 프리랜서', 'KR/EN/JA Professional Localization'),
        color: 'text-sky-300 bg-sky-950/80 border-sky-700/70',
        icon: <Languages className="w-3.5 h-3.5 text-sky-400" />
      };
    }
    return null;
  };

  const renderExperienceCard = (exp: ExperienceItem, index: number) => {
    const isCurrent = index === 0;
    const badge = getDomainBadge(exp.id, exp.company);
    const indexNumber = String(index + 1).padStart(2, '0');

    return (
      <div
        className={`relative rounded-2xl transition-all duration-300 overflow-hidden ${
          isCurrent
            ? 'p-6 sm:p-8 bg-gradient-to-br from-[#0c1633] via-[#0b142c] to-[#080e20] border-2 border-blue-500/50 shadow-[0_0_35px_rgba(59,130,246,0.18)] hover:border-blue-400'
            : index < 5
            ? 'p-6 sm:p-7 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-slate-800/90 hover:border-slate-700 hover:shadow-xl shadow-md'
            : 'p-6 sm:p-7 bg-slate-900/75 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 shadow-md backdrop-blur-md'
        }`}
      >
        {/* Top Header Row */}
        {isCurrent && (
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-blue-500/20">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                {t('현재 재직 중 · LEAD PLANNER', 'CURRENT POSITION · LEAD PLANNER')}
              </span>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-blue-900/60 text-blue-200 border border-blue-700/60">
              {exp.period}
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1.5 flex-1">
            {/* Index & Company Kicker */}
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                isCurrent 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}>
                #{indexNumber}
              </span>
              <span className="text-xs font-semibold text-blue-400 tracking-wide uppercase flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400/80 shrink-0" />
                <span>{exp.company}</span>
              </span>
            </div>

            {/* Role Heading */}
            <h4 className={`font-bold tracking-tight text-white ${
              isCurrent ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
            }`}>
              {cleanLeadText(exp.role)}
            </h4>

            {/* Domain Highlight Badge */}
            {badge && (
              <div className="pt-1">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border ${badge.color}`}>
                  {badge.icon}
                  <span>{badge.label}</span>
                </span>
              </div>
            )}
          </div>

          {!isCurrent && (
            <div className="shrink-0 sm:text-right">
              <span className="inline-block text-xs font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
                {exp.period}
              </span>
            </div>
          )}
        </div>

        {/* Distinctive Summary Callout Box */}
        <div className={`my-4 p-3.5 sm:p-4 rounded-xl border-l-3 ${
          isCurrent 
            ? 'bg-blue-950/30 border-blue-400 border-y border-r border-blue-900/30' 
            : 'bg-slate-950/60 border-blue-500/80 border-y border-r border-slate-800/60'
        }`}>
          <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">
            {exp.summary}
          </p>
        </div>

        {/* Key Achievements & Responsibilities */}
        <div className="space-y-2 pt-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>{t('주요 성과 및 업무 범위', 'Key Achievements & Scope')}</span>
          </div>
          <ul className="space-y-2 pl-0.5">
            {exp.responsibilities.map((r, rIdx) => (
              <li key={rIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-slate-800/80">
          {exp.tags.map((tItem, tIdx) => (
            <span
              key={tIdx}
              className="text-[11px] font-mono text-slate-300 bg-slate-950/90 px-2.5 py-1 rounded-md border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              {tItem}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <SectionTransition id="experience" className="pt-12 pb-16 sm:pt-14 sm:pb-20 md:pt-16 md:pb-20 relative overflow-hidden bg-gradient-to-b from-[#070A15] via-[#0B1123] to-[#090D1C] text-slate-100 border-b border-slate-800/80">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10 sm:space-y-12">
        
        {/* 1. Section Header: Career Timeline & Milestones (Placed immediately after Case Studies) */}
        <FadeIn className="space-y-4">
          <div className="text-xs font-mono tracking-widest text-blue-400 uppercase">
            {t('02 / 경력 & 전주기', '02 / EXPERIENCE & LIFECYCLE')}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 shrink-0" />
                <span>{t('경력 타임라인 & 주요 이력', 'Career Timeline & Milestones')}</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-slate-400">
                {showAllExperiences ? experiences.length : coreExperiences.length} / {experiences.length} {t('건 표시 중', 'shown')}
              </span>
              <button
                onClick={() => setShowAllExperiences(prev => !prev)}
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-300 hover:text-white bg-blue-950/80 hover:bg-blue-900 px-3 py-1.5 rounded-lg border border-blue-800/80 transition-colors"
              >
                <span>
                  {showAllExperiences 
                    ? t('핵심 이력만 보기', 'Show Core Only') 
                    : t(`전체 이력 보기 (${experiences.length}개)`, `View All (${experiences.length})`)}
                </span>
                {showAllExperiences ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Career Timeline Cards: Core 5 Experiences (Always Visible) */}
        <div className="space-y-6">
          {coreExperiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderExperienceCard(exp, idx)}
            </motion.div>
          ))}
        </div>

        {/* Extended Experiences (Smooth Cascade Reveal via AnimatePresence) */}
        <AnimatePresence initial={false}>
          {showAllExperiences && (
            <motion.div
              key="extended-experiences-container"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: 'auto',
                transition: {
                  height: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.35, delay: 0.05 }
                }
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.2 }
                }
              }}
              className="overflow-hidden space-y-6"
            >
              {/* Visual Chapter Divider */}
              <div className="flex items-center gap-3 pt-6 pb-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/40 to-slate-800" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-300 bg-blue-950/80 px-3.5 py-1.5 rounded-full border border-blue-800/60 shadow-xs">
                  {t('이전 글로벌 플랫폼 및 운영 기반 이력 (6~11)', 'Early Career & Global Ops Milestones (6–11)')}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-blue-500/40 to-slate-800" />
              </div>

              {extendedExperiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.45,
                      delay: idx * 0.07,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                    scale: 0.98,
                    transition: { duration: 0.2 }
                  }}
                >
                  {renderExperienceCard(exp, idx + 5)}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Expand / Collapse Toggle Button */}
        {experiences.length > 5 && (
          <div className="text-center pt-2">
            {!showAllExperiences ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAllExperiences(true)}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-600/25 border border-blue-400/40 transition-all cursor-pointer"
              >
                <span>{t(`이전 경력 전체 펼쳐보기 (${extendedExperiences.length}개 더보기)`, `Show All Previous Roles (${extendedExperiences.length} more)`)}</span>
                <ChevronDown className="w-4 h-4 text-blue-200 group-hover:translate-y-0.5 transition-transform" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAllExperiences(false)}
                className="group inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-850 rounded-xl border border-slate-700 shadow-md transition-all cursor-pointer"
              >
                <span>{t('경력 이력 접기 (핵심 5개만 보기)', 'Collapse to Core Roles (5)')}</span>
                <ChevronUp className="w-4 h-4 text-slate-400 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            )}
          </div>
        )}

        {/* 2. Service Lifecycle Pipeline: Placed AFTER Career Timeline */}
        <div className="pt-10 sm:pt-12 border-t border-slate-800/80 space-y-6">
          <FadeIn className="space-y-2">
            <div className="text-xs font-mono tracking-widest text-blue-400 uppercase">
              {t('02-B / 전주기 기획 파이프라인', '02-B / LIFECYCLE PIPELINE')}
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
              {t('서비스 전주기 기획 및 운영 역량', 'End-to-End Product Lifecycle Capability')}
            </h3>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                {t('서비스 라이프사이클 파이프라인', 'Service Lifecycle Pipeline')}
              </h4>
              <span className="text-xs font-mono text-slate-400">
                {t('단계별 역할을 클릭하여 상세를 확인하세요', 'Click a stage to view role breakdown')}
              </span>
            </div>

            {/* Stepper bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {lifecycle.map((phase, idx) => {
                const isActive = selectedStage === idx;
                return (
                  <button
                    key={phase.stage}
                    onClick={() => setSelectedStage(idx)}
                    className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/25'
                        : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono tracking-widest ${isActive ? 'text-blue-100 font-bold' : 'text-slate-500'}`}>
                          0{idx + 1}
                        </span>
                        <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                          isActive ? 'bg-blue-800 text-white' : 'bg-slate-950 text-slate-400'
                        }`}>
                          {phase.stage}
                        </span>
                      </div>
                      <div className="font-bold text-xs tracking-tight leading-snug">
                        {phase.title.split('(')[0]}
                      </div>
                    </div>
                    <div className={`text-[11px] mt-2 font-mono leading-tight ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      {phase.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Stage Detail Card */}
            <motion.div 
              key={selectedStage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold uppercase bg-blue-600 text-white px-2.5 py-1 rounded shadow-xs">
                    {lifecycle[selectedStage].stage}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {lifecycle[selectedStage].title}
                  </h4>
                </div>
                <span className="text-xs text-blue-400 font-medium font-mono">
                  {lifecycle[selectedStage].subtitle}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl font-normal">
                {lifecycle[selectedStage].description}
              </p>

              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  {t('주요 산출물 & 역량 (Artifacts & Output)', 'Key Artifacts & Output')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {lifecycle[selectedStage].skills.map((s, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 shadow-2xs hover:border-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>

      </div>
    </SectionTransition>
  );
};

