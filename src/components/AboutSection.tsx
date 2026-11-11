import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Globe, Sparkles, CheckCircle2, Award, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import { SectionTransition, FadeIn, StaggerContainer, StaggerItem } from './SectionTransition';

export const AboutSection: React.FC = () => {
  const { data, t } = usePortfolio();
  const { profile, competencies } = data;

  return (
    <SectionTransition id="about" className="pt-12 pb-16 sm:pt-14 sm:pb-20 md:pt-16 md:pb-20 relative overflow-hidden bg-slate-50/70 text-slate-900 border-b border-slate-200/80">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-50/60 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <FadeIn className="space-y-3">
          <div className="text-xs font-mono tracking-widest text-blue-700 uppercase font-semibold">
            {t('03 / 기획자 소개 & 역량', '03 / ABOUT ME')}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {t('기획은 제가 경험해 온 모든 역량이 만나는 중심점입니다.', 'Service planning is where all my cross-functional experience converges.')}
          </h2>
        </FadeIn>

        {/* Narrative & Background Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story Narrative Card */}
          <FadeIn direction="right" delay={0.1} className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4 text-slate-700 leading-relaxed font-normal">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                {t('기획 철학 & 실무 협업', 'Planning & Collaboration')}
              </span>
              <span className="text-[11px] font-mono text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200 font-medium">
                {t('실무형 소통', 'Practical Alignment')}
              </span>
            </div>
            <p className="text-base sm:text-lg text-slate-900 font-semibold leading-relaxed">
              {profile.aboutIntro}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {profile.aboutPhilosophy}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {profile.aboutCollaboration}
            </p>
          </FadeIn>

          {/* Background Card (Korean / Japanese & Trilingual) */}
          <FadeIn direction="left" delay={0.2} className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold">
                    {t('배경 및 글로벌 감각', 'Background & Culture')}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 font-medium">
                  {t('다문화 마인드셋', 'Global Mindset')}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-mono font-medium">{t('정체성 & 문화적 배경', 'Identity & Origin')}</div>
                <div className="text-base font-bold text-slate-900">
                  {profile.backgroundOrigin}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {t(
                    '일본, 한국, 미국, 필리핀, 캐나다 등 다양한 문화권의 사용자 경험과 맥락의 차이를 깊이 있게 이해합니다.',
                    'Naturally navigates cultural contexts and user experience subtleties across Japan, Korea, the US, Philippines, and Canada.'
                  )}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-xs text-slate-500 font-mono font-medium">{t('3개 국어 실무 역량', 'Trilingual Proficiency')}</div>
                <div className="space-y-2">
                  {profile.languages.map((l, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-semibold text-slate-800">{l.lang}</span>
                      <span className="text-blue-700 font-mono text-[11px] font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Credentials */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-xs text-slate-500 font-mono font-medium">{t('학력 및 어학 자격', 'Education & Credentials')}</div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-medium text-slate-800">Waseda University</span>
                    <span className="text-slate-500 font-mono text-[11px]">{t('교육심리학과 (중퇴)', 'Educational Psychology')}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-medium text-slate-800">GED (USA)</span>
                    <span className="text-slate-500 font-mono text-[11px]">{t('미국 검정고시 취득', 'US High School Equivalent')}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="font-semibold text-emerald-900">TOEIC 990 / TOEFL 107</span>
                    <span className="text-emerald-800 font-mono text-[11px] font-bold bg-white px-2 py-0.5 rounded border border-emerald-300">{t('만점 및 고득점', 'Top Score')}</span>
                  </div>
                </div>
              </div>

              {/* Visa & Work Eligibility */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-xs text-slate-500 font-mono font-medium flex items-center justify-between">
                  <span>{t('체류 및 취업 자격', 'Visa & Work Authorization')}</span>
                  <span className="text-emerald-700 font-bold">{t('취업 활동 자유', 'Fully Eligible')}</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold text-emerald-900">
                      {t('F-2 (거주 비자) · 국내 취업 제한 없음', 'F-2 Resident Visa · No Work Restrictions')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed pl-6">
                    {t(
                      '*내국인과 동일하게 법적 취업 활동에 제한이 없으며, 기업의 별도 비자 발급 지원(스폰서십)이나 행정 절차 없이 즉시 정규직/계약직 채용 및 4대 보험 적용이 가능합니다.',
                      '*Full legal employment rights in South Korea with zero restrictions. No corporate visa sponsorship or administrative sponsor procedures required.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* The Core Storytelling Flow Diagram */}
        <FadeIn delay={0.15} className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold">
                {t('경력의 흐름 & 스토리텔링 다이어그램', 'Career Narrative Diagram')}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {t('"넓게 경험했지만, 중심은 기획이다"', '"Broad Experience, Centered on Planning"')}
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full w-fit">
              {t('서비스 전주기 관점', 'Product Lifecycle Perspective')}
            </span>
          </div>

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
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono ${node.highlight ? 'text-blue-100 font-bold' : 'text-slate-400'}`}>
                      0{i + 1}
                    </span>
                    {node.highlight && (
                      <span className="text-[9px] font-mono uppercase bg-blue-700 text-white font-bold px-1.5 py-0.5 rounded">
                        Core
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-xs tracking-tight">
                    {node.step}
                  </div>
                </div>
                <div className={`mt-3 pt-2 border-t text-[11px] leading-tight ${node.highlight ? 'border-blue-400/40 text-blue-100' : 'border-slate-200 text-slate-500'}`}>
                  {node.sub}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>

        {/* What I Do: Main vs Supporting Bento */}
        <div className="space-y-6">
          <FadeIn className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-xs font-mono tracking-widest text-blue-700 uppercase font-semibold">
                {t('02 / 핵심 역량', '02 / WHAT I DO')}
              </span>
              <h3 className="text-xl sm:text-3xl font-bold text-slate-900 mt-1">
                {t('역량 구분: Main Core & Supporting Strength', 'Competency Matrix: Main Core & Supporting Strength')}
              </h3>
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {competencies.map((comp) => {
              const isCore = comp.badge === 'My Core';
              const isStrength = comp.badge === 'My Strength';
              return (
                <StaggerItem
                  key={comp.id}
                  className={`rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl ${
                    isCore
                      ? 'bg-white border-blue-300/80 shadow-sm hover:border-blue-500'
                      : isStrength
                      ? 'bg-white border-emerald-300/80 shadow-sm hover:border-emerald-500'
                      : 'bg-white border-slate-200/90 shadow-sm hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold ${
                        isCore ? 'text-blue-600' : isStrength ? 'text-emerald-600' : 'text-slate-600'
                      }`}>
                        {comp.number}
                      </span>
                      <span
                        className={`text-[11px] font-mono uppercase px-3 py-1 rounded-full border font-bold ${
                          isCore
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : isStrength
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        {comp.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                      {comp.title}
                    </h4>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {comp.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5">
                      {comp.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-md border font-mono text-slate-700 bg-slate-100 hover:bg-slate-200/80 border-slate-200/80 transition-all duration-200 hover:-translate-y-0.5"
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
