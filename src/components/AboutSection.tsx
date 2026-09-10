import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Globe } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data, t } = usePortfolio();
  const { profile, competencies } = data;

  return (
    <section id="about" className="py-24 border-b border-zinc-200/70">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-20">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
            {t('01 / 기획자 소개', '01 / ABOUT ME')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
            {t('기획은 제가 경험해 온 모든 역량이 만나는 중심점입니다.', 'Service planning is where my experience comes together.')}
          </h2>
          <p className="text-base text-zinc-600 max-w-2xl">
            {t(
              '다양한 직무를 경험한 뒤 기획을 중심으로 정립했습니다. 마케팅부터 개발 협업, 고객 응대까지 서비스 전체의 흐름을 읽고 설계합니다.',
              'Starting across marketing, operations, and customer support, my career coalesced into service planning. I read and design the entire service flow from acquisition to tech execution.'
            )}
          </p>
        </div>

        {/* Narrative & Background Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 space-y-6 text-base text-zinc-700 leading-relaxed font-normal">
            <p className="text-lg text-zinc-900 font-medium leading-relaxed">
              {profile.aboutIntro}
            </p>
            <p>
              {profile.aboutPhilosophy}
            </p>
            <p className="text-zinc-600">
              {profile.aboutCollaboration}
            </p>

            <div className="pt-2 border-t border-zinc-200/70">
              <div className="bg-zinc-50/80 rounded-lg p-4 border border-zinc-200/60 text-sm text-zinc-700 space-y-1">
                <span className="font-semibold text-zinc-900">{t('핵심 포지셔닝: ', 'Core Positioning: ')}</span>
                <span>
                  {t(
                    '"이것저것 다 해본 사람"이 아니라, 기획이 중심이고 다른 직무를 경험했기 때문에 전체적인 관점에서 실행 가능한 기획을 도출하는 사람입니다.',
                    'Not simply someone who touched many areas, but a planner at the core whose cross-functional foundation yields executable, cohesive solutions.'
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Background Card (Korean / Japanese & Trilingual) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-xl border border-zinc-200/90 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-zinc-600" />
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-600">
                    {t('배경 및 글로벌 감각', 'Background & Culture')}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200/70">
                  {t('다문화 마인드셋', 'Bilingual Mindset')}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-zinc-400">{t('정체성 & 문화적 배경', 'Identity & Origin')}</div>
                <div className="text-base font-semibold text-zinc-900">
                  {profile.backgroundOrigin}
                </div>
                <p className="text-xs text-zinc-500 mt-1 leading-normal">
                  {t(
                    '한국과 일본 양국의 문화적 맥락과 사용자 경험의 미묘한 차이를 자연스럽게 이해합니다.',
                    'Naturally navigates cultural contexts and user experience subtleties between Korean and Japanese audiences.'
                  )}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <div className="text-xs text-zinc-400">{t('3개 국어 실무 역량', 'Trilingual Proficiency')}</div>
                <div className="space-y-2">
                  {profile.languages.map((l, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-zinc-50 border border-zinc-200/60">
                      <span className="font-semibold text-zinc-800">{l.lang}</span>
                      <span className="text-zinc-600 font-mono text-[11px] font-medium bg-white px-2 py-0.5 rounded border border-zinc-200/80 shadow-2xs">{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Credentials */}
              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <div className="text-xs text-zinc-400">{t('학력 및 어학 자격', 'Education & Credentials')}</div>
                <div className="space-y-1.5 text-xs text-zinc-700 font-sans">
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-zinc-50 border border-zinc-200/60">
                    <span className="font-medium text-zinc-900">Waseda University</span>
                    <span className="text-zinc-500 font-mono text-[11px]">{t('교육심리학과 (중퇴)', 'Educational Psychology (Left)')}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-zinc-50 border border-zinc-200/60">
                    <span className="font-medium text-zinc-900">GED (USA)</span>
                    <span className="text-zinc-500 font-mono text-[11px]">{t('미국 검정고시 취득', 'US High School Equivalent')}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-emerald-50/50 border border-emerald-200/60">
                    <span className="font-semibold text-zinc-900">TOEIC 990 / TOEFL 107</span>
                    <span className="text-emerald-700 font-mono text-[11px] font-bold bg-white px-2 py-0.5 rounded border border-emerald-200 shadow-2xs">{t('만점 및 고득점', 'Full / Top Score')}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-zinc-400 italic pt-1">
                {t(
                  '* 글로벌 프로덕트 및 크로스보더 서비스 협업에 유연하게 대응 가능합니다.',
                  '* Fluent cross-border communication for international product expansion.'
                )}
              </div>
            </div>
          </div>
        </div>

        {/* The Core Storytelling Flow Diagram */}
        <div className="bg-white rounded-xl border border-zinc-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                {t('경력의 흐름 & 스토리텔링 다이어그램', 'Career Narrative Diagram')}
              </span>
              <h3 className="text-lg font-semibold text-zinc-950 mt-0.5">
                {t('"넓게 경험했지만, 중심은 기획이다"', '"Broad Experience, Centered on Planning"')}
              </h3>
            </div>
            <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200/70 px-3 py-1 rounded-full w-fit">
              {t('서비스 전주기 관점', 'Product Lifecycle Perspective')}
            </span>
          </div>

          <p className="text-sm text-zinc-600 max-w-3xl">
            {t(
              '마케팅에서 출발하여 고객과 운영 현장을 마주하고, 이를 해결하기 위해 서비스 기획과 UI/UX 설계로 수렴되었습니다. 각 단계를 직접 겪었기에 디자이너·개발자·운영진 사이의 병목을 예방할 수 있습니다.',
              'Beginning in marketing and operations before converging on service and UI/UX planning. Having worked across these domains prevents costly bottlenecks between design, development, and customer operations.'
            )}
          </p>

          {/* Flow visualization */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {[
              { 
                step: 'MARKETING', 
                sub: t('유저 유입 & 인지', 'Acquisition & Reach'), 
                role: t('시장 이해', 'Market Reality'), 
                highlight: false 
              },
              { 
                step: 'USER', 
                sub: t('고객 행동 & 니즈', 'User Behavior'), 
                role: t('사용자 관점', 'User Perspective'), 
                highlight: false 
              },
              { 
                step: 'OPERATIONS', 
                sub: t('현장 이슈 & VOC', 'Live VOC'), 
                role: t('운영 현실', 'Ops Feedback'), 
                highlight: false 
              },
              { 
                step: 'SERVICE PLANNING', 
                sub: t('목적 정의 & 구조화', 'Purpose & Structure'), 
                role: t('★ 핵심 기획 앵커', '★ CORE ANCHOR'), 
                highlight: true 
              },
              { 
                step: 'UI/UX', 
                sub: t('화면 및 인터랙션', 'Screen Specs'), 
                role: t('화면 구체화', 'Tangible UI'), 
                highlight: true 
              },
              { 
                step: 'DEVELOPMENT', 
                sub: t('기술적 구현 & QA', 'Tech Alignment & QA'), 
                role: t('개발 협업', 'Engineering'), 
                highlight: false 
              }
            ].map((node, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border flex flex-col justify-between transition-all ${
                  node.highlight
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-zinc-50/70 text-zinc-800 border-zinc-200/80 hover:bg-zinc-100/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono ${node.highlight ? 'text-blue-200' : 'text-zinc-400'}`}>
                      0{i + 1}
                    </span>
                    {node.highlight && (
                      <span className="text-[9px] font-mono uppercase bg-blue-700 text-white font-semibold px-1.5 py-0.5 rounded">
                        Core
                      </span>
                    )}
                  </div>
                  <div className="font-semibold text-xs tracking-tight">
                    {node.step}
                  </div>
                </div>
                <div className={`mt-3 pt-2 border-t text-[11px] leading-tight ${node.highlight ? 'border-blue-500/40 text-blue-100' : 'border-zinc-200/40 text-zinc-500'}`}>
                  {node.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-blue-50/40 rounded-lg border border-blue-100 text-xs text-zinc-700 flex items-center justify-between flex-wrap gap-2">
            <span>
              💡 <strong className="text-blue-900">{t('구조적 메시지:', 'Key Narrative:')}</strong>{' '}
              {t(
                '사용자를 이해하고 → 서비스를 설계하고 → 화면으로 구체화하고 → 개발자와 협업하고 → 실제 운영하면서 개선하는 사람',
                'Understanding users → Architecting services → Specifying screens → Aligning with engineering → Improving in live operations'
              )}
            </span>
          </div>
        </div>

        {/* What I Do: Main vs Supporting */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                {t('02 / 역량 구분', '02 / WHAT I DO')}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-zinc-950 mt-1">
                {t('역량 구분: Main Core & Supporting Strength', 'Competency Matrix: Main Core & Supporting Strength')}
              </h3>
            </div>
            <p className="text-xs text-zinc-500 font-mono">
              {t('Main 2개 직무(Core) + Supporting 2개 직무(Strength)', 'Main 2 Core Functions + 2 Supporting Strengths')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {competencies.map((comp) => {
              const isCore = comp.badge === 'My Core';
              const isStrength = comp.badge === 'My Strength';
              return (
                <div
                  key={comp.id}
                  className={`rounded-xl border p-6 sm:p-7 flex flex-col justify-between transition-all ${
                    isCore
                      ? 'bg-white border-blue-200 shadow-[0_4px_20px_rgba(37,99,235,0.06)] hover:border-blue-400'
                      : isStrength
                      ? 'bg-white border-emerald-200/80 shadow-[0_2px_12px_rgba(16,185,129,0.04)] hover:border-emerald-300'
                      : 'bg-white border-amber-200/70 shadow-xs hover:border-amber-300'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold ${
                        isCore ? 'text-blue-600' : isStrength ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {comp.number}
                      </span>
                      <span
                        className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full border font-semibold ${
                          isCore
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : isStrength
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {comp.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-zinc-950 tracking-tight">
                      {comp.title}
                    </h4>

                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-zinc-100">
                    <div className="flex flex-wrap gap-1.5">
                      {comp.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[11px] font-medium px-2 py-1 rounded border shadow-2xs ${
                            isCore
                              ? 'text-blue-900 bg-blue-50/60 border-blue-100 hover:border-blue-200'
                              : isStrength
                              ? 'text-emerald-900 bg-emerald-50/50 border-emerald-100 hover:border-emerald-200'
                              : 'text-amber-900 bg-amber-50/50 border-amber-100 hover:border-amber-200'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
