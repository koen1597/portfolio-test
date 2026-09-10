import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight } from 'lucide-react';

export const HowIWorkSection: React.FC = () => {
  const { data, t } = usePortfolio();
  const { howIWork } = data;

  return (
    <section id="how-i-work" className="py-24 border-b border-zinc-200/70">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
            {t('05 / 업무 방식', '05 / HOW I WORK')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            {t('구조화와 실행의 6단계 작업 방식', 'Methodical & Transparent Process')}
          </h2>
          <p className="text-base text-zinc-600 max-w-2xl">
            {t(
              '추상적인 아이디어를 손에 잡히는 서비스로 구체화하기 위해 지키는 6단계 작업 원칙입니다.',
              'A six-stage disciplined framework translating ambiguous business requirements into robust, high-fidelity digital products.'
            )}
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {howIWork.map((step, idx) => (
            <div
              key={step.step}
              className="bg-white rounded-xl border border-zinc-200/90 p-6 flex flex-col justify-between shadow-xs hover:border-blue-300 hover:shadow-[0_4px_20px_rgba(37,99,235,0.06)] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600">
                    STEP {step.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-lg font-semibold text-zinc-950 tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-xs font-medium text-zinc-500">
                    {step.subtitle}
                  </div>
                </div>

                <p className="text-sm text-zinc-600 leading-relaxed pt-1">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="text-zinc-500 font-medium">Phase 0{idx + 1}</span>
                {idx < howIWork.length - 1 ? (
                  <span className="flex items-center gap-1 text-blue-600 font-medium">
                    {t('다음:', 'Next:')} {howIWork[idx + 1].title} <ArrowRight className="w-3 h-3 text-blue-500" />
                  </span>
                ) : (
                  <span className="text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded">{t('지속적 개선 루프 ↺', 'Continuous Loop ↺')}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Motto Box */}
        <div className="p-7 rounded-xl bg-gradient-to-r from-zinc-950 via-slate-900 to-blue-950 text-white border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">{t('기획 철학', 'Planning Philosophy')}</span>
            <p className="text-sm sm:text-base font-medium text-zinc-100 leading-relaxed">
              {t(
                '"화면은 기획의 결과물일 뿐, 기획의 본질은 복잡한 현실의 제약을 단순한 시스템으로 푸는 것입니다."',
                '"Screens are merely artifacts of planning; the essence of planning is untangling complex real-world constraints into simple, robust systems."'
              )}
            </p>
          </div>
          <span className="text-xs font-mono bg-blue-950/80 text-blue-200 px-3.5 py-1.5 rounded-lg border border-blue-700/50 whitespace-nowrap shadow-xs">
            {data.profile.name}
          </span>
        </div>

      </div>
    </section>
  );
};
