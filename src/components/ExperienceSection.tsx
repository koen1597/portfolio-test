import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { data, t } = usePortfolio();
  const { lifecycle, experiences } = data;
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [showAllExperiences, setShowAllExperiences] = useState<boolean>(false);

  const displayedExperiences = showAllExperiences ? experiences : experiences.slice(0, 5);

  return (
    <section id="experience" className="py-24 border-b border-zinc-200/70">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-20">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
            {t('03 / 경력 & 전주기', '03 / EXPERIENCE & LIFECYCLE')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            {t('서비스 전주기 (End-to-End Product Lifecycle)', 'End-to-End Product Lifecycle')}
          </h2>
          <p className="text-base text-zinc-600 max-w-2xl">
            {t(
              '단순히 회사를 나열하는 경력이 아닌, 서비스가 기획되어 출시되고 성장하는 전 주기를 직접 조율해 온 기획자로서의 역량을 보여줍니다.',
              'Demonstrating end-to-end orchestration across every phase of product evolution, from initial discovery and scoping to launch and ongoing operations.'
            )}
          </p>
        </div>

        {/* Lifecycle Visual Pipeline */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-800">
              {t('서비스 라이프사이클 파이프라인', 'Service Lifecycle Pipeline')}
            </h3>
            <span className="text-xs font-mono text-zinc-500">
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
                  className={`p-3.5 sm:p-4 rounded-lg border text-left transition-all relative flex flex-col justify-between ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:border-blue-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-mono tracking-widest ${isActive ? 'text-blue-200' : 'text-zinc-400'}`}>
                        0{idx + 1}
                      </span>
                      <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-blue-700 text-white' : 'bg-zinc-100 text-zinc-600'
                      }`}>
                        {phase.stage}
                      </span>
                    </div>
                    <div className="font-semibold text-xs tracking-tight leading-snug">
                      {phase.title.split('(')[0]}
                    </div>
                  </div>
                  <div className={`text-[11px] mt-2 font-mono leading-tight ${isActive ? 'text-blue-100' : 'text-zinc-400'}`}>
                    {phase.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Stage Detail Card */}
          <div className="bg-gradient-to-br from-blue-50/30 via-white to-zinc-50/40 rounded-xl border border-blue-200/70 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-blue-100/80">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-semibold uppercase bg-blue-600 text-white px-2.5 py-1 rounded shadow-2xs">
                  {lifecycle[selectedStage].stage}
                </span>
                <h4 className="text-base sm:text-lg font-semibold text-zinc-950">
                  {lifecycle[selectedStage].title}
                </h4>
              </div>
              <span className="text-xs text-blue-700 font-medium font-mono">
                {lifecycle[selectedStage].subtitle}
              </span>
            </div>

            <p className="text-sm text-zinc-700 leading-relaxed max-w-3xl">
              {lifecycle[selectedStage].description}
            </p>

            <div className="pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                {t('주요 산출물 & 역량 (Artifacts & Output)', 'Key Artifacts & Output')}
              </div>
              <div className="flex flex-wrap gap-2">
                {lifecycle[selectedStage].skills.map((s, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-800 bg-white px-3 py-1.5 rounded-md border border-zinc-200/80 shadow-2xs hover:border-blue-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Career Timeline Section */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200/80">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-800">
                {t('경력 타임라인 & 주요 이력', 'Career Timeline & Milestones')}
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                {t('서비스 기획, 백오피스 설계 및 글로벌 운영 중심', 'Focused on service planning, backoffice design, and global ops')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-400">
                {displayedExperiences.length} / {experiences.length} {t('건 표시 중', 'shown')}
              </span>
              <button
                onClick={() => setShowAllExperiences(prev => !prev)}
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-900 bg-blue-50/70 hover:bg-blue-100/70 px-2.5 py-1 rounded-md border border-blue-200/60 transition-colors"
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

          <div className="space-y-6">
            {displayedExperiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-xl border border-zinc-200/90 p-6 sm:p-7 shadow-xs space-y-4 hover:border-blue-200/80 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-zinc-100">
                  <div>
                    <h4 className="text-base font-semibold text-zinc-950 tracking-tight">
                      {exp.role}
                    </h4>
                    <div className="text-xs text-blue-700 font-medium mt-0.5">
                      {exp.company}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-zinc-700 font-normal leading-relaxed">
                  {exp.summary}
                </p>

                <div className="space-y-2 pt-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {t('주요 성과 및 업무 범위', 'Key Achievements & Scope')}
                  </div>
                  <ul className="space-y-1.5">
                    {exp.responsibilities.map((r, rIdx) => (
                      <li key={rIdx} className="text-xs sm:text-sm text-zinc-600 flex items-start gap-2 leading-relaxed">
                        <span className="text-blue-500 mt-1 font-bold">―</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100">
                  {exp.tags.map((tItem, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono text-zinc-600 bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200/60"
                    >
                      {tItem}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom expand toggle button if collapsed */}
          {!showAllExperiences && (
            <div className="text-center pt-2">
              <button
                onClick={() => setShowAllExperiences(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-blue-700 bg-blue-50/60 hover:bg-blue-100/60 rounded-lg border border-blue-200 shadow-2xs transition-colors"
              >
                <span>{t(`이전 경력 전체 펼쳐보기 (${experiences.length - 5}개 더보기)`, `Show All Previous Roles (${experiences.length - 5} more)`)}</span>
                <ChevronDown className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

