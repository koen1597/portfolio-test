import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, Workflow, CheckCircle2 } from 'lucide-react';
import { SectionTransition, FadeIn, StaggerContainer, StaggerItem } from './SectionTransition';

export const HowIWorkSection: React.FC = () => {
  const { data, t } = usePortfolio();
  const { howIWork } = data;

  return (
    <SectionTransition id="how-i-work" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#090D1C] via-[#0E152A] to-[#070A16] text-slate-100 border-b border-slate-800/80">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <FadeIn className="space-y-3">
          <div className="text-xs font-mono tracking-widest text-blue-400 uppercase">
            {t('04 / 업무 방식', '04 / HOW I WORK')}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {t('구조화와 실행의 6단계 작업 방식', 'Methodical & Transparent Process')}
          </h2>
          <p className="text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            {t(
              '추상적인 아이디어를 손에 잡히는 서비스로 구체화하기 위해 지키는 6단계 작업 원칙입니다.',
              'A six-stage disciplined framework translating ambiguous business requirements into robust, high-fidelity digital products.'
            )}
          </p>
        </FadeIn>

        {/* 6 Steps Grid */}
        <StaggerContainer staggerDelay={0.09} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {howIWork.map((step, idx) => (
            <StaggerItem key={step.step} className="h-full">
              <div
                className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between shadow-xl hover:border-blue-500/60 hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] transition-all backdrop-blur-md h-full"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-400">
                      STEP {step.step}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-xs shadow-blue-500"></span>
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {step.title}
                    </h3>
                    <div className="text-xs font-medium text-slate-400">
                      {step.subtitle}
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed pt-1 font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-slate-400 font-medium">Phase 0{idx + 1}</span>
                  {idx < howIWork.length - 1 ? (
                    <span className="flex items-center gap-1 text-blue-400 font-medium">
                      {t('다음:', 'Next:')} {howIWork[idx + 1].title} <ArrowRight className="w-3 h-3 text-blue-400" />
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">{t('지속적 개선 루프 ↺', 'Continuous Loop ↺')}</span>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Summary Motto Box */}
        <FadeIn delay={0.2} className="p-7 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white border border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">{t('기획 철학', 'Planning Philosophy')}</span>
            <p className="text-sm sm:text-base font-medium text-slate-200 leading-relaxed">
              {t(
                '"화면은 기획의 결과물일 뿐, 기획의 본질은 복잡한 현실의 제약을 단순한 시스템으로 푸는 것입니다."',
                '"Screens are merely artifacts of planning; the essence of planning is untangling complex real-world constraints into simple, robust systems."'
              )}
            </p>
          </div>
          <span className="text-xs font-mono bg-blue-950 text-blue-300 px-4 py-2 rounded-xl border border-blue-800/80 whitespace-nowrap shadow-md">
            {data.profile.name}
          </span>
        </FadeIn>

      </div>
    </SectionTransition>
  );
};
