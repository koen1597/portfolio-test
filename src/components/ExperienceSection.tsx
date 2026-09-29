import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { CheckCircle2, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { SectionTransition, FadeIn, StaggerContainer, StaggerItem } from './SectionTransition';

export const ExperienceSection: React.FC = () => {
  const { data, t } = usePortfolio();
  const { lifecycle, experiences } = data;
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [showAllExperiences, setShowAllExperiences] = useState<boolean>(false);

  const displayedExperiences = showAllExperiences ? experiences : experiences.slice(0, 5);

  return (
    <SectionTransition id="experience" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070A15] via-[#0B1123] to-[#090D1C] text-slate-100 border-b border-slate-800/80">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-20">
        
        {/* Section Header */}
        <FadeIn className="space-y-3">
          <div className="text-xs font-mono tracking-widest text-blue-400 uppercase">
            {t('03 / 경력 & 전주기', '03 / EXPERIENCE & LIFECYCLE')}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {t('서비스 전주기 기획 및 운영 역량', 'End-to-End Product Lifecycle')}
          </h2>
          <p className="text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            {t(
              '단순히 회사를 나열하는 경력이 아닌, 서비스가 기획되어 출시되고 성장하는 전 주기를 직접 조율해 온 기획자로서의 역량을 보여줍니다.',
              'Demonstrating end-to-end orchestration across every phase of product evolution, from initial discovery and scoping to launch and ongoing operations.'
            )}
          </p>
        </FadeIn>

        {/* Lifecycle Visual Pipeline */}
        <FadeIn delay={0.1} className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {t('서비스 라이프사이클 파이프라인', 'Service Lifecycle Pipeline')}
            </h3>
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

        {/* Career Timeline Section */}
        <div className="space-y-8 pt-4">
          <FadeIn className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>{t('경력 타임라인 & 주요 이력', 'Career Timeline & Milestones')}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('서비스 기획, 백오피스 설계 및 글로벌 운영 중심', 'Focused on service planning, backoffice design, and global ops')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">
                {displayedExperiences.length} / {experiences.length} {t('건 표시 중', 'shown')}
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
          </FadeIn>

          <StaggerContainer staggerDelay={0.08} className="space-y-6">
            {displayedExperiences.map((exp) => (
              <StaggerItem key={exp.id}>
                <div
                  className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-xl space-y-4 hover:border-slate-700 transition-all backdrop-blur-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {exp.role}
                      </h4>
                      <div className="text-xs text-blue-400 font-semibold mt-0.5">
                        {exp.company}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 font-normal leading-relaxed">
                    {exp.summary}
                  </p>

                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      {t('주요 성과 및 업무 범위', 'Key Achievements & Scope')}
                    </div>
                    <ul className="space-y-1.5">
                      {exp.responsibilities.map((r, rIdx) => (
                        <li key={rIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 leading-relaxed">
                          <span className="text-blue-400 mt-1 font-bold">―</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                    {exp.tags.map((tItem, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {tItem}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Bottom expand toggle button if collapsed */}
          {!showAllExperiences && (
            <div className="text-center pt-2">
              <button
                onClick={() => setShowAllExperiences(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-blue-300 bg-blue-950/80 hover:bg-blue-900 rounded-lg border border-blue-800 shadow-md transition-colors"
              >
                <span>{t(`이전 경력 전체 펼쳐보기 (${experiences.length - 5}개 더보기)`, `Show All Previous Roles (${experiences.length - 5} more)`)}</span>
                <ChevronDown className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          )}
        </div>

      </div>
    </SectionTransition>
  );
};
