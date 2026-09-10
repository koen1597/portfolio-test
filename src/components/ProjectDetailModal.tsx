import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, CheckCircle2 } from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const { data, selectedProjectId, closeProjectDetail, t } = usePortfolio();
  const modalContentRef = useRef<HTMLDivElement>(null);

  const project = data.projects.find(p => p.id === selectedProjectId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProjectDetail();
    };
    if (selectedProjectId) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProjectId, closeProjectDetail]);

  if (!project) return null;

  const scrollToStep = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stepsList = [
    { num: '01', title: t('개요', 'OVERVIEW'), id: 'step-overview' },
    { num: '02', title: t('배경', 'BACKGROUND'), id: 'step-background' },
    { num: '03', title: t('문제 정의', 'PROBLEM'), id: 'step-problem' },
    { num: '04', title: t('해결 접근', 'APPROACH'), id: 'step-approach' },
    { num: '05', title: t('기획 & 구조', 'PLANNING'), id: 'step-planning' },
    { num: '06', title: t('화면 기획', 'UI/UX'), id: 'step-uiux' },
    { num: '07', title: t('부서 협업', 'COLLABORATION'), id: 'step-collab' },
    { num: '08', title: t('성과 & 임팩트', 'RESULT'), id: 'step-result' },
    { num: '09', title: t('기획자 역할', 'MY ROLE'), id: 'step-myrole' }
  ];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeProjectDetail();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        ref={modalContentRef}
        className="bg-[#FAF9F6] w-full max-w-4xl max-h-[92vh] rounded-2xl border border-zinc-200 shadow-2xl flex flex-col overflow-hidden text-zinc-900"
      >
        {/* Modal Top Header */}
        <div className="sticky top-0 z-20 bg-[#FAF9F6]/95 backdrop-blur-md px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold bg-blue-600 text-white px-2 py-0.5 rounded shadow-2xs">
              PROJECT {project.number}
            </span>
            <span className="text-sm font-semibold text-zinc-900 truncate">
              {project.title}
            </span>
          </div>
          <button
            id="modal-close-btn"
            onClick={closeProjectDetail}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Step Bar */}
        <div className="bg-white px-6 py-2 border-b border-zinc-200/70 overflow-x-auto no-scrollbar flex items-center gap-4 text-[11px] font-mono whitespace-nowrap text-zinc-500">
          <span className="text-zinc-400 font-sans uppercase">{t('바로가기:', 'Jump to:')}</span>
          {stepsList.map(s => (
            <button
              key={s.num}
              onClick={() => scrollToStep(s.id)}
              className="hover:text-blue-600 transition-colors py-0.5"
            >
              {s.num}. {s.title}
            </button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-12 text-zinc-800">
          
          {/* Main Title Hero within Modal */}
          <div className="space-y-3 pb-8 border-b border-zinc-200">
            <div className="flex flex-wrap gap-1.5">
              {project.category.map((c, i) => (
                <span key={i} className="text-xs font-mono bg-blue-50 text-blue-800 border border-blue-200/70 px-2.5 py-0.5 rounded">
                  {c}
                </span>
              ))}
            </div>
            <h1 className="text-2xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
              {project.title}
            </h1>
            <p className="text-base text-zinc-600 font-normal">
              {project.subtitle}
            </p>
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed pt-2">
              {project.summary}
            </p>
          </div>

          {/* 01. OVERVIEW */}
          <section id="step-overview" className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-zinc-400">01</span>
              <h3 className="text-base font-semibold text-zinc-950 uppercase tracking-wider">
                {t('01. 기본 개요 (OVERVIEW)', '01. OVERVIEW')}
              </h3>
            </div>
            <div className="bg-white rounded-xl border border-zinc-200/90 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-zinc-400 block font-mono text-[11px] uppercase">{t('프로젝트명', 'Project')}</span>
                <span className="font-semibold text-zinc-900 mt-0.5 block">{project.overview.project}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-mono text-[11px] uppercase">{t('기업 / 도메인', 'Company / Domain')}</span>
                <span className="font-semibold text-zinc-900 mt-0.5 block">{project.overview.company}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-mono text-[11px] uppercase">{t('진행 기간', 'Duration')}</span>
                <span className="font-semibold text-zinc-900 mt-0.5 block">{project.overview.duration}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-mono text-[11px] uppercase">{t('담당 역할', 'Role')}</span>
                <span className="font-semibold text-zinc-900 mt-0.5 block">{project.overview.role}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-mono text-[11px] uppercase">{t('타깃 플랫폼', 'Platform')}</span>
                <span className="font-semibold text-zinc-900 mt-0.5 block">{project.overview.platform}</span>
              </div>
              <div>
                <span className="text-zinc-400 block font-mono text-[11px] uppercase">{t('팀 구성', 'Team Composition')}</span>
                <span className="font-semibold text-zinc-900 mt-0.5 block">{project.overview.team}</span>
              </div>
            </div>
          </section>

          {/* 02. BACKGROUND */}
          <section id="step-background" className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-zinc-400">02</span>
              <h3 className="text-base font-semibold text-zinc-950 uppercase tracking-wider">
                {t('02. 필요성 및 배경 (BACKGROUND)', '02. BACKGROUND')}
              </h3>
            </div>
            <div className="bg-white rounded-xl border border-zinc-200/90 p-6 space-y-2">
              <h4 className="text-xs font-mono uppercase text-zinc-400">
                {t('왜 이 서비스가 필요했는가?', 'Why was this service needed?')}
              </h4>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                {project.background}
              </p>
            </div>
          </section>

          {/* 03. PROBLEM */}
          <section id="step-problem" className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-zinc-400">03</span>
              <h3 className="text-base font-semibold text-zinc-950 uppercase tracking-wider">
                {t('03. 해결 과제 (PROBLEM)', '03. PROBLEM')}
              </h3>
            </div>
            <div className="bg-white rounded-xl border border-zinc-200/90 p-6 space-y-3">
              <h4 className="text-xs font-mono uppercase text-zinc-400">
                {t('어떤 문제를 해결해야 했는가?', 'What problem were we solving?')}
              </h4>
              <div className="space-y-2.5">
                {project.problem.map((prob, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-zinc-700">
                    <span className="text-xs font-mono font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded mt-0.5">
                      P{idx + 1}
                    </span>
                    <span className="leading-relaxed">{prob}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 04. APPROACH */}
          <section id="step-approach" className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-zinc-400">04</span>
              <h3 className="text-base font-semibold text-zinc-950 uppercase tracking-wider">
                {t('04. 해결 접근법 (APPROACH)', '04. APPROACH')}
              </h3>
            </div>
            <div className="bg-white rounded-xl border border-zinc-200/90 p-6 space-y-3">
              <h4 className="text-xs font-mono uppercase text-zinc-400">
                {t('문제를 어떻게 접근하고 풀었는가?', 'How did I approach the problem?')}
              </h4>
              <div className="space-y-2.5">
                {project.approach.map((app, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-zinc-700">
                    <span className="text-xs font-mono font-bold text-zinc-900 bg-zinc-100 px-1.5 py-0.5 rounded mt-0.5">
                      A{idx + 1}
                    </span>
                    <span className="leading-relaxed">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 05. PLANNING */}
          <section id="step-planning" className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-zinc-400">05</span>
              <h3 className="text-base font-semibold text-zinc-950 uppercase tracking-wider">
                {t('05. 서비스 구조 & 기능 기획 (PLANNING)', '05. PLANNING & ARCHITECTURE')}
              </h3>
            </div>
            <div className="bg-white rounded-xl border border-zinc-200/90 p-6 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-zinc-400">
                  {t('서비스 구조 (Service Structure)', 'Service Structure')}
                </span>
                <p className="text-sm text-zinc-700 leading-relaxed font-medium">
                  {project.planning.serviceStructure}
                </p>
              </div>

              <div className="space-y-1 pt-3 border-t border-zinc-100">
                <span className="text-xs font-mono uppercase text-zinc-400">
                  {t('사용자 동선 (User Flow)', 'User Flow')}
                </span>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {project.planning.userFlow}
                </p>
              </div>

              <div className="space-y-1 pt-3 border-t border-zinc-100">
                <span className="text-xs font-mono uppercase text-zinc-400">
                  {t('정보구조 (Information Architecture)', 'Information Architecture (IA)')}
                </span>
                <p className="text-sm text-zinc-700 leading-relaxed font-mono text-xs bg-zinc-50 p-3 rounded border border-zinc-200/60">
                  {project.planning.informationArchitecture}
                </p>
              </div>

              {project.planning.details && (
                <div className="space-y-2 pt-3 border-t border-zinc-100">
                  <span className="text-xs font-mono uppercase text-zinc-400">
                    {t('운영 및 정책 규칙 (Rules & Edge Cases)', 'Operational & Policy Rules')}
                  </span>
                  <ul className="space-y-1 text-xs text-zinc-600">
                    {project.planning.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-zinc-400">▪</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* 06. UI/UX */}
          <section id="step-uiux" className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-zinc-400">06</span>
              <h3 className="text-base font-semibold text-zinc-950 uppercase tracking-wider">
                {t('06. 화면 기획 & UI/UX 명세 (UI/UX SPECIFICATION)', '06. UI/UX SPECIFICATION')}
              </h3>
            </div>
            <div className="bg-white rounded-xl border border-zinc-200/90 p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase text-zinc-400">
                    {t('와이어프레임 & 레이아웃 원칙', 'Wireframe & Layout Principles')}
                  </span>
                  <p className="text-sm text-zinc-700 leading-relaxed">
                    {project.uiux.wireframeNotes}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase text-zinc-400">
                    {t('화면설계서 & 스토리보드', 'Screen Planning & Storyboard')}
                  </span>
                  <p className="text-sm text-zinc-700 leading-relaxed">
                    {project.uiux.screenPlanning}
                  </p>
                </div>
              </div>

              <div className="space-y-1 pt-3 border-t border-zinc-100">
                <span className="text-xs font-mono uppercase text-zinc-400">
                  {t('인터랙션 & 상태 피드백', 'Interaction & State Feedback')}
                </span>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {project.uiux.interaction}
                </p>
              </div>

              {project.uiux.highlights && (
                <div className="space-y-1.5 pt-3 border-t border-zinc-100">
                  <span className="text-xs font-mono uppercase text-zinc-400">
                    {t('핵심 UX 하이라이트', 'Key UX Highlights')}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.uiux.highlights.map((h, i) => (
                      <div key={i} className="text-xs text-zinc-700 bg-zinc-50 p-2.5 rounded border border-zinc-200/50">
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 07. COLLABORATION */}
          <section id="step-collab" className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-zinc-400">07</span>
              <h3 className="text-base font-semibold text-zinc-950 uppercase tracking-wider">
                {t('07. 유관 부서 협업 (COLLABORATION)', '07. CROSS-FUNCTIONAL COLLABORATION')}
              </h3>
            </div>
            <div className="bg-white rounded-xl border border-zinc-200/90 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-zinc-50/70 rounded-lg border border-zinc-200/60 space-y-1">
                <span className="font-semibold text-zinc-900 block font-mono uppercase text-[11px]">
                  {t('디자이너 협업 (Designer)', 'Designer Collaboration')}
                </span>
                <p className="text-zinc-600 leading-relaxed">{project.collaboration.designer}</p>
              </div>
              <div className="p-3 bg-zinc-50/70 rounded-lg border border-zinc-200/60 space-y-1">
                <span className="font-semibold text-zinc-900 block font-mono uppercase text-[11px]">
                  {t('개발자 협업 (Developer)', 'Developer Collaboration')}
                </span>
                <p className="text-zinc-600 leading-relaxed">{project.collaboration.developer}</p>
              </div>
              <div className="p-3 bg-zinc-50/70 rounded-lg border border-zinc-200/60 space-y-1">
                <span className="font-semibold text-zinc-900 block font-mono uppercase text-[11px]">
                  {t('마케팅 정렬 (Marketing)', 'Marketing Alignment')}
                </span>
                <p className="text-zinc-600 leading-relaxed">{project.collaboration.marketing}</p>
              </div>
              <div className="p-3 bg-zinc-50/70 rounded-lg border border-zinc-200/60 space-y-1">
                <span className="font-semibold text-zinc-900 block font-mono uppercase text-[11px]">
                  {t('운영 & VOC 동기화 (Operations)', 'Operations & VOC Sync')}
                </span>
                <p className="text-zinc-600 leading-relaxed">{project.collaboration.operations}</p>
              </div>
            </div>
          </section>

          {/* 08. RESULT */}
          <section id="step-result" className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-zinc-400">08</span>
              <h3 className="text-base font-semibold text-zinc-950 uppercase tracking-wider">
                {t('08. 성과 & 임팩트 (RESULT & IMPACT)', '08. RESULT & IMPACT')}
              </h3>
            </div>
            <div className="bg-white rounded-xl border border-zinc-200/90 p-6 space-y-5">
              <p className="text-sm sm:text-base text-zinc-800 leading-relaxed">
                {project.result.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.result.metrics.map((m, i) => (
                  <div key={i} className="p-4 bg-zinc-50 rounded-lg border border-zinc-200/80 text-center">
                    <span className="text-xs text-zinc-500 block">{m.label}</span>
                    <span className="text-2xl font-semibold text-zinc-950 font-mono tracking-tight block my-0.5">
                      {m.value}
                    </span>
                    {m.desc && <span className="text-[11px] text-zinc-400 block">{m.desc}</span>}
                  </div>
                ))}
              </div>

              {project.result.impact && (
                <div className="space-y-1 pt-2 border-t border-zinc-100">
                  <span className="text-xs font-mono uppercase text-zinc-400">
                    {t('주요 비즈니스 성과', 'Key Outcomes')}
                  </span>
                  <ul className="space-y-1 text-xs text-zinc-600">
                    {project.result.impact.map((imp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-800 shrink-0 mt-0.5" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* 09. MY ROLE */}
          <section id="step-myrole" className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                09 ★ CRUCIAL
              </span>
              <h3 className="text-base font-bold text-zinc-950 uppercase tracking-wider">
                {t('09. 기획자로서의 역할과 기여 (MY ROLE)', '09. MY ROLE & CONTRIBUTION')}
              </h3>
            </div>
            
            <div className="bg-zinc-900 text-white rounded-xl p-6 sm:p-8 space-y-6 shadow-md border border-zinc-800">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-zinc-400">
                  {t('기획자 핵심 책임', 'Primary Responsibility')}
                </span>
                <h4 className="text-lg font-semibold text-white">
                  {project.myRole.primary}
                </h4>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-zinc-400">
                  {t('구체적으로 무엇을 했는가? (What exactly did I do?)', 'What exactly did I do?')}
                </span>
                <ul className="space-y-2">
                  {project.myRole.responsibilities.map((r, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-800 space-y-1">
                <span className="text-xs font-mono uppercase text-emerald-400">
                  {t('기획자로서 얻은 인사이트 (Key Takeaway)', 'Key Takeaway as a Planner')}
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                  "{project.myRole.keyTakeaway}"
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-4 border-t border-zinc-200 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-400">
            {t('케이스 스터디 완료', 'End of Case Study')} · {project.overview.project}
          </span>
          <button
            onClick={closeProjectDetail}
            className="text-xs font-medium bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors"
          >
            {t('케이스 스터디 닫기', 'Close Case Study')}
          </button>
        </div>

      </div>
    </div>
  );
};
