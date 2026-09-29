import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Globe, Sparkles, CheckCircle2, Award, BookOpen, Layers } from 'lucide-react';
import { SectionTransition, FadeIn, StaggerContainer, StaggerItem } from './SectionTransition';

export const AboutSection: React.FC = () => {
  const { data, t } = usePortfolio();
  const { profile, competencies } = data;

  return (
    <SectionTransition id="about" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070914] via-[#0D1325] to-[#070A15] text-slate-100 border-b border-slate-800/80">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-20">
        
        {/* Section Header */}
        <FadeIn className="space-y-3">
          <div className="text-xs font-mono tracking-widest text-blue-400 uppercase">
            {t('02 / 기획자 소개 & 역량', '02 / ABOUT ME')}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {t('기획은 제가 경험해 온 모든 역량이 만나는 중심점입니다.', 'Service planning is where all my cross-functional experience converges.')}
          </h2>
          <p className="text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            {t(
              '다양한 직무를 경험한 뒤 기획을 중심으로 정립했습니다. 마케팅부터 개발 협업, 고객 응대까지 서비스 전체의 흐름을 읽고 설계합니다.',
              'Starting across marketing, operations, and support before focusing on service planning. Reading and architecting the entire product lifecycle from user acquisition to technical execution.'
            )}
          </p>
        </FadeIn>

        {/* Narrative & Background Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story Narrative */}
          <FadeIn direction="right" delay={0.1} className="lg:col-span-7 space-y-6 text-base text-slate-300 leading-relaxed font-normal">
            <p className="text-lg text-white font-medium leading-relaxed">
              {profile.aboutIntro}
            </p>
            <p>
              {profile.aboutPhilosophy}
            </p>
            <p className="text-slate-400">
              {profile.aboutCollaboration}
            </p>

            <div className="pt-2 border-t border-slate-800/80">
              <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 text-sm text-slate-300 space-y-1.5 shadow-md">
                <span className="font-semibold text-blue-300 block">{t('핵심 포지셔닝: ', 'Core Positioning: ')}</span>
                <span className="leading-relaxed block">
                  {t(
                    '"이것저것 다 해본 사람"이 아니라, 기획이 중심이고 다른 직무를 경험했기 때문에 전체적인 관점에서 실행 가능한 기획을 도출하는 사람입니다.',
                    'Not simply someone who touched many areas, but a planner at the core whose cross-functional foundation yields executable, cohesive solutions.'
                  )}
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Background Card (Korean / Japanese & Trilingual) */}
          <FadeIn direction="left" delay={0.2} className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                    {t('배경 및 글로벌 감각', 'Background & Culture')}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-blue-300 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-800/70">
                  {t('다문화 마인드셋', 'Global Mindset')}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-mono">{t('정체성 & 문화적 배경', 'Identity & Origin')}</div>
                <div className="text-base font-bold text-white">
                  {profile.backgroundOrigin}
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {t(
                    '일본, 한국, 미국, 필리핀, 캐나다 등 다양한 문화권의 사용자 경험과 맥락의 차이를 깊이 있게 이해합니다.',
                    'Naturally navigates cultural contexts and user experience subtleties across Japan, Korea, the US, Philippines, and Canada.'
                  )}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-xs text-slate-400 font-mono">{t('3개 국어 실무 역량', 'Trilingual Proficiency')}</div>
                <div className="space-y-2">
                  {profile.languages.map((l, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="font-semibold text-slate-200">{l.lang}</span>
                      <span className="text-blue-300 font-mono text-[11px] font-medium bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/60">{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Credentials */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-xs text-slate-400 font-mono">{t('학력 및 어학 자격', 'Education & Credentials')}</div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-medium text-slate-200">Waseda University</span>
                    <span className="text-slate-400 font-mono text-[11px]">{t('교육심리학과 (중퇴)', 'Educational Psychology')}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-medium text-slate-200">GED (USA)</span>
                    <span className="text-slate-400 font-mono text-[11px]">{t('미국 검정고시 취득', 'US High School Equivalent')}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60">
                    <span className="font-semibold text-emerald-200">TOEIC 990 / TOEFL 107</span>
                    <span className="text-emerald-300 font-mono text-[11px] font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-600/40">{t('만점 및 고득점', 'Top Score')}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 italic pt-1">
                {t(
                  '* 글로벌 프로덕트 및 크로스보더 서비스 협업에 유연하게 대응 가능합니다.',
                  '* Fluent cross-border communication for international product expansion.'
                )}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* The Core Storytelling Flow Diagram */}
        <FadeIn delay={0.15} className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
                {t('경력의 흐름 & 스토리텔링 다이어그램', 'Career Narrative Diagram')}
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {t('"넓게 경험했지만, 중심은 기획이다"', '"Broad Experience, Centered on Planning"')}
              </h3>
            </div>
            <span className="text-xs font-medium text-blue-300 bg-blue-950 border border-blue-800 px-3 py-1 rounded-full w-fit">
              {t('서비스 전주기 관점', 'Product Lifecycle Perspective')}
            </span>
          </div>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            {t(
              '마케팅에서 출발하여 고객과 운영 현장을 마주하고, 이를 해결하기 위해 서비스 기획과 UI/UX 설계로 수렴되었습니다. 각 단계를 직접 겪었기에 디자이너·개발자·운영진 사이의 병목을 사전에 방지합니다.',
              'Beginning in marketing and operations before converging on service and UI/UX planning. Having worked across these domains prevents costly bottlenecks between design, development, and customer operations.'
            )}
          </p>

          {/* Flow visualization with stagger */}
          <StaggerContainer staggerDelay={0.07} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {[
              { 
                step: 'MARKETING', 
                sub: t('유저 유입 & 인지', 'Acquisition'), 
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
                sub: t('기술적 구현 & QA', 'Tech Alignment'), 
                role: t('개발 협업', 'Engineering'), 
                highlight: false 
              }
            ].map((node, i) => (
              <StaggerItem
                key={i}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  node.highlight
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30'
                    : 'bg-slate-950 text-slate-200 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono ${node.highlight ? 'text-blue-100 font-bold' : 'text-slate-500'}`}>
                      0{i + 1}
                    </span>
                    {node.highlight && (
                      <span className="text-[9px] font-mono uppercase bg-blue-800 text-white font-bold px-1.5 py-0.5 rounded">
                        Core
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-xs tracking-tight">
                    {node.step}
                  </div>
                </div>
                <div className={`mt-3 pt-2 border-t text-[11px] leading-tight ${node.highlight ? 'border-blue-400/40 text-blue-100' : 'border-slate-800 text-slate-400'}`}>
                  {node.sub}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-800/50 text-xs text-slate-300 flex items-center justify-between flex-wrap gap-2">
            <span>
              💡 <strong className="text-blue-300">{t('구조적 메시지:', 'Key Narrative:')}</strong>{' '}
              {t(
                '사용자를 이해하고 → 서비스를 설계하고 → 화면으로 구체화하고 → 개발자와 협업하고 → 실제 운영하면서 지속 개선하는 기획자',
                'Understanding users → Architecting services → Specifying screens → Aligning with engineering → Improving in live operations'
              )}
            </span>
          </div>
        </FadeIn>

        {/* What I Do: Main vs Supporting Bento */}
        <div className="space-y-6">
          <FadeIn className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">
                {t('02 / 핵심 역량', '02 / WHAT I DO')}
              </span>
              <h3 className="text-xl sm:text-3xl font-bold text-white mt-1">
                {t('역량 구분: Main Core & Supporting Strength', 'Competency Matrix: Main Core & Supporting Strength')}
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              {t('Main 2개 직무(Core) + Supporting 2개 직무(Strength)', 'Main 2 Core Functions + 2 Supporting Strengths')}
            </p>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {competencies.map((comp) => {
              const isCore = comp.badge === 'My Core';
              const isStrength = comp.badge === 'My Strength';
              return (
                <StaggerItem
                  key={comp.id}
                  className={`rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                    isCore
                      ? 'bg-slate-900/90 border-blue-600/40 shadow-xl shadow-blue-600/5 hover:border-blue-500/80 hover:shadow-blue-600/10'
                      : isStrength
                      ? 'bg-slate-900/90 border-emerald-600/40 shadow-xl shadow-emerald-600/5 hover:border-emerald-500/80'
                      : 'bg-slate-900/90 border-slate-800 shadow-md hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold ${
                        isCore ? 'text-blue-400' : isStrength ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {comp.number}
                      </span>
                      <span
                        className={`text-[11px] font-mono uppercase px-3 py-1 rounded-full border font-bold ${
                          isCore
                            ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                            : isStrength
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border-amber-800'
                        }`}
                      >
                        {comp.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white tracking-tight">
                      {comp.title}
                    </h4>

                    <p className="text-sm text-slate-300 leading-relaxed font-normal">
                      {comp.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800">
                    <div className="flex flex-wrap gap-1.5">
                      {comp.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-md border font-mono ${
                            isCore
                              ? 'text-blue-300 bg-blue-950/60 border-blue-800/70 hover:border-blue-700'
                              : isStrength
                              ? 'text-emerald-300 bg-emerald-950/60 border-emerald-800/70 hover:border-emerald-700'
                              : 'text-amber-300 bg-amber-950/60 border-amber-800/70 hover:border-amber-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

      </div>
    </SectionTransition>
  );
};
