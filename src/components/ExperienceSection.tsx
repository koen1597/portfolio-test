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
  const { experiences } = data;
  const [showAllExperiences, setShowAllExperiences] = useState<boolean>(false);

  const coreExperiences = experiences.slice(0, 5);
  const extendedExperiences = experiences.slice(5);

  const getDomainBadge = (id: string, company: string) => {
    if (id === 'exp-1' || company.includes('어셈브릭스') || company.includes('Assemblix')) {
      return {
        label: t('SaaS & 물류 플랫폼 기획', 'SaaS & Logistics Platform Planner'),
        color: 'text-blue-700 bg-blue-50 border-blue-200',
        icon: <Building2 className="w-3.5 h-3.5 text-blue-600" />
      };
    }
    if (id === 'exp-2' || company.includes('아크리아스튜디오') || company.includes('Archria')) {
      return {
        label: t('AI 창작 도구 & 글로벌 웹툰 플랫폼', 'AI Creative Engine & Webtoon Platform'),
        color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
        icon: <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
      };
    }
    if (id === 'exp-3' || company.includes('Sun & Rich')) {
      return {
        label: t('글로벌 모바일 앱 기획 & 파트너십', 'Global Mobile App & Partnerships'),
        color: 'text-cyan-800 bg-cyan-50 border-cyan-200',
        icon: <Globe className="w-3.5 h-3.5 text-cyan-600" />
      };
    }
    if (id === 'exp-4' || company.includes('위즈블') || company.includes('Wizbl')) {
      return {
        label: t('엔터테인먼트 플랫폼 전략 & UX', 'Entertainment Strategy & UX'),
        color: 'text-purple-700 bg-purple-50 border-purple-200',
        icon: <Briefcase className="w-3.5 h-3.5 text-purple-600" />
      };
    }
    if (id === 'exp-5' || company.includes('이엘파크') || company.includes('EL Park')) {
      return {
        label: t('메타버스 프로젝트 & 유틸리티 NFT', 'Metaverse Project & Utility NFT'),
        color: 'text-amber-800 bg-amber-50 border-amber-200',
        icon: <Award className="w-3.5 h-3.5 text-amber-600" />
      };
    }
    if (id === 'exp-6' || company.includes('NEXTOR')) {
      return {
        label: t('메타버스 플랫폼 사업 전략 & IR', 'Metaverse Strategy & IR Materials'),
        color: 'text-violet-800 bg-violet-50 border-violet-200',
        icon: <Globe className="w-3.5 h-3.5 text-violet-600" />
      };
    }
    if (id === 'exp-7' || company.includes('더퓨쳐컴퍼니') || company.includes('Metaverse2')) {
      return {
        label: t('가상 부동산 플랫폼 & 로컬라이제이션', 'Virtual Real Estate & Localization'),
        color: 'text-teal-800 bg-teal-50 border-teal-200',
        icon: <Building2 className="w-3.5 h-3.5 text-teal-600" />
      };
    }
    if (id === 'exp-8' || company.includes('YouTube')) {
      return {
        label: t('Google YouTube 글로벌 CS 운영', 'Google YouTube Global Support Operations'),
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        icon: <Globe className="w-3.5 h-3.5 text-rose-600" />
      };
    }
    if (id === 'exp-9' || company.includes('iHerb')) {
      return {
        label: t('글로벌 이커머스 해외 운영팀 (3년 2개월)', 'Global E-Commerce Operations (3y 2m)'),
        color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
        icon: <Award className="w-3.5 h-3.5 text-emerald-600" />
      };
    }
    if (id === 'exp-10' || company.includes('DetonatioN')) {
      return {
        label: t('일본 프로 e스포츠 구단 선수 & 방송 출연', 'Japanese Pro Esports Player & Official Media'),
        color: 'text-orange-800 bg-orange-50 border-orange-200',
        icon: <Gamepad2 className="w-3.5 h-3.5 text-orange-600" />
      };
    }
    if (id === 'exp-11' || company.includes('Upwork')) {
      return {
        label: t('한/영/일 전문 로컬라이제이션 프리랜서', 'KR/EN/JA Professional Localization'),
        color: 'text-sky-800 bg-sky-50 border-sky-200',
        icon: <Languages className="w-3.5 h-3.5 text-sky-600" />
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
        className={`relative rounded-2xl transition-all duration-300 ease-out overflow-hidden ${
          isCurrent
            ? 'p-6 sm:p-8 bg-white border-2 border-blue-600 shadow-md hover:-translate-y-1.5 hover:shadow-xl'
            : 'p-6 sm:p-7 bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 hover:-translate-y-1.5 hover:shadow-xl'
        }`}
      >
        {/* Top Header Row */}
        {isCurrent && (
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-blue-100">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
                {t('현재 재직 중 · LEAD PLANNER', 'CURRENT POSITION · LEAD PLANNER')}
              </span>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
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
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                #{indexNumber}
              </span>
              <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{exp.company}</span>
              </span>
            </div>

            {/* Role Heading */}
            <h4 className={`font-bold tracking-tight text-slate-900 ${
              isCurrent ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
            }`}>
              {cleanLeadText(exp.role)}
            </h4>

            {/* Domain Highlight Badge */}
            {badge && (
              <div className="pt-1">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border ${badge.color}`}>
                  {badge.icon}
                  <span>{badge.label}</span>
                </span>
              </div>
            )}
          </div>

          {!isCurrent && (
            <div className="shrink-0 sm:text-right">
              <span className="inline-block text-xs font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 font-medium">
                {exp.period}
              </span>
            </div>
          )}
        </div>

        {/* Distinctive Summary Callout Box */}
        <div className={`my-4 p-3.5 sm:p-4 rounded-xl border-l-4 ${
          isCurrent 
            ? 'bg-blue-50/60 border-blue-600 border-y border-r border-blue-100' 
            : 'bg-slate-50 border-slate-400 border-y border-r border-slate-200'
        }`}>
          <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
            {exp.summary}
          </p>
        </div>

        {/* Key Achievements & Responsibilities */}
        <div className="space-y-2 pt-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-600 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{t('주요 성과 및 업무 범위', 'Key Achievements & Scope')}</span>
          </div>
          <ul className="space-y-2 pl-0.5">
            {exp.responsibilities.map((r, rIdx) => (
              <li key={rIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 leading-relaxed font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-slate-100">
          {exp.tags.map((tItem, tIdx) => (
            <span
              key={tIdx}
              className="text-[11px] font-mono text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-md border border-slate-200/80 transition-all duration-200 hover:-translate-y-0.5"
            >
              {tItem}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <SectionTransition id="experience" className="pt-12 pb-16 sm:pt-14 sm:pb-20 md:pt-16 md:pb-20 relative overflow-hidden bg-white text-slate-900 border-b border-slate-200/80">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-50/60 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header: Career Timeline & Milestones */}
        <FadeIn className="space-y-4">
          <div className="text-xs font-mono tracking-widest text-blue-700 uppercase font-semibold">
            {t('02 / 경력', '02 / CAREER & EXPERIENCE')}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 shrink-0" />
                <span>{t('경력 타임라인 & 주요 이력', 'Career Timeline & Milestones')}</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-slate-500 font-medium">
                {showAllExperiences ? experiences.length : coreExperiences.length} / {experiences.length} {t('건 표시 중', 'shown')}
              </span>
              <button
                onClick={() => setShowAllExperiences(prev => !prev)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors cursor-pointer"
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

        {/* Career Timeline Cards: Core 5 Experiences */}
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

        {/* Extended Experiences */}
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
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 to-slate-200" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 shadow-2xs">
                  {t('이전 글로벌 플랫폼 및 운영 기반 이력 (6~11)', 'Early Career & Global Ops Milestones (6–11)')}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-blue-300 to-slate-200" />
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
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>{t(`이전 경력 전체 펼쳐보기 (${extendedExperiences.length}개 더보기)`, `Show All Previous Roles (${extendedExperiences.length} more)`)}</span>
                <ChevronDown className="w-4 h-4 text-blue-100 group-hover:translate-y-0.5 transition-transform" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAllExperiences(false)}
                className="group inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-xs transition-all cursor-pointer"
              >
                <span>{t('경력 이력 접기 (핵심 5개만 보기)', 'Collapse to Core Roles (5)')}</span>
                <ChevronUp className="w-4 h-4 text-slate-400 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            )}
          </div>
        )}

      </div>
    </SectionTransition>
  );
};

