import React, { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  ExternalLink as ExternalLinkIcon, 
  ZoomIn, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Image as ImageIcon 
} from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const { data, selectedProjectId, closeProjectDetail, t } = usePortfolio();
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [artifactFilter, setArtifactFilter] = useState<'all' | 'wireframe' | 'before-after' | 'release-ui'>('all');
  const [lightboxData, setLightboxData] = useState<{ url: string; title: string; caption?: string } | null>(null);

  const project = data.projects.find(p => p.id === selectedProjectId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxData) {
          setLightboxData(null);
        } else {
          closeProjectDetail();
        }
      }
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
  }, [selectedProjectId, closeProjectDetail, lightboxData]);

  if (!project) return null;

  const hasArtifacts = Boolean(project.artifacts && project.artifacts.length > 0);
  const hasRetrospective = Boolean(project.retrospective);
  const hasExternalLinks = Boolean(project.externalLinks && project.externalLinks.length > 0);

  const filteredArtifacts = (project.artifacts || []).filter(item => {
    if (artifactFilter === 'all') return true;
    if (artifactFilter === 'wireframe') return item.type === 'wireframe' || item.type === 'flowchart' || item.type === 'architecture';
    if (artifactFilter === 'before-after') return item.type === 'before-after';
    if (artifactFilter === 'release-ui') return item.type === 'release-ui';
    return true;
  });

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

        {/* Scrollable Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-12 text-zinc-800">
          
          {/* Main Title Hero within Modal */}
          <div className="space-y-4 pb-8 border-b border-zinc-200">
            {/* Visual Cover Header Slot */}
            <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden bg-slate-950 border border-zinc-200/90 shadow-xs relative flex items-center justify-center">
              {project.thumbnailUrl ? (
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 flex flex-col items-center justify-center p-6 text-center border-dashed border border-slate-800 text-white">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mb-2 shadow-inner">
                    <Layers className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-sm font-semibold tracking-tight text-slate-200">
                    {project.title}
                  </span>
                  <span className="text-xs font-mono text-slate-400 mt-1">
                    {t('프로젝트 대표 산출물 이미지 영역', 'Project Cover Image Slot')}
                  </span>
                </div>
              )}
            </div>
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
                {t('01. 기본 개요', '01. OVERVIEW')}
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
                {t('02. 필요성 및 배경', '02. BACKGROUND')}
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
                {t('03. 해결 과제 정의', '03. PROBLEM')}
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
                {t('04. 해결 접근 전략', '04. APPROACH')}
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
                {t('05. 서비스 구조 및 기능 기획', '05. PLANNING & ARCHITECTURE')}
              </h3>
            </div>
            <div className="bg-white rounded-xl border border-zinc-200/90 p-6 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-zinc-400">
                  {t('서비스 구조', 'Service Structure')}
                </span>
                <p className="text-sm text-zinc-700 leading-relaxed font-medium">
                  {project.planning.serviceStructure}
                </p>
              </div>

              <div className="space-y-1 pt-3 border-t border-zinc-100">
                <span className="text-xs font-mono uppercase text-zinc-400">
                  {t('사용자 동선', 'User Flow')}
                </span>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {project.planning.userFlow}
                </p>
              </div>

              <div className="space-y-1 pt-3 border-t border-zinc-100">
                <span className="text-xs font-mono uppercase text-zinc-400">
                  {t('정보구조 (IA)', 'Information Architecture (IA)')}
                </span>
                <p className="text-sm text-zinc-700 leading-relaxed font-mono text-xs bg-zinc-50 p-3 rounded border border-zinc-200/60">
                  {project.planning.informationArchitecture}
                </p>
              </div>

              {project.planning.details && (
                <div className="space-y-2 pt-3 border-t border-zinc-100">
                  <span className="text-xs font-mono uppercase text-zinc-400">
                    {t('운영 및 정책 규칙', 'Operational & Policy Rules')}
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
                {t('06. 화면 기획 및 UI/UX 명세', '06. UI/UX SPECIFICATION')}
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

          {/* ARTIFACTS & WIREFRAME GALLERY */}
          {hasArtifacts && (
            <section id="step-artifacts" className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">
                    ★ EVIDENCE
                  </span>
                  <h3 className="text-base font-bold text-zinc-950 uppercase tracking-wider flex items-center gap-2">
                    {t('실무 산출물 및 화면설계서', 'WORK ARTIFACTS & WIREFRAME SPECIFICATIONS')}
                  </h3>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {(['all', 'wireframe', 'before-after', 'release-ui'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setArtifactFilter(tab)}
                      className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-all font-mono ${
                        artifactFilter === tab
                          ? 'bg-zinc-900 text-white font-medium shadow-xs'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
                      }`}
                    >
                      {tab === 'all' && t('전체 보기', 'All')}
                      {tab === 'wireframe' && t('와이어프레임 & IA', 'Wireframe/IA')}
                      {tab === 'before-after' && t('Before & After', 'Before & After')}
                      {tab === 'release-ui' && t('배포 UI', 'Release UI')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredArtifacts.map((artifact) => (
                  <div 
                    key={artifact.id}
                    className="bg-white rounded-xl border border-zinc-200/90 shadow-2xs overflow-hidden transition-all hover:border-zinc-300"
                  >
                    {/* Header info */}
                    <div className="p-4 sm:p-5 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-zinc-50/40">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {artifact.tag && (
                            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60">
                              {artifact.tag}
                            </span>
                          )}
                          <span className="text-xs font-mono text-zinc-400 uppercase">
                            {artifact.type}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-semibold text-zinc-900">
                          {artifact.title}
                        </h4>
                      </div>
                      <span className="text-xs text-zinc-500 font-mono">
                        {t('실무 원본 데이터 기반', 'Based on Real Work')}
                      </span>
                    </div>

                    {/* Image / Before & After comparison visual */}
                    <div className="p-4 sm:p-5 bg-zinc-100/60 space-y-4">
                      {artifact.type === 'before-after' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* AS-IS */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200/70 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                AS-IS ({t('개선 전 문제점', 'Previous Problem')})
                              </span>
                            </div>
                            {artifact.imageUrl ? (
                              <div 
                                onClick={() => setLightboxData({
                                  url: artifact.imageUrl!,
                                  title: `${artifact.title} (AS-IS)`,
                                  caption: artifact.beforeCaption
                                })}
                                className="relative group rounded-lg overflow-hidden border border-zinc-300 bg-white aspect-video cursor-pointer"
                              >
                                <img 
                                  src={artifact.imageUrl} 
                                  alt="AS-IS Preview"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium backdrop-blur-2xs">
                                  <ZoomIn className="w-4 h-4" />
                                  {t('클릭하여 확대', 'Click to zoom')}
                                </div>
                              </div>
                            ) : (
                              <div className="relative rounded-lg overflow-hidden border border-dashed border-rose-200 bg-rose-50/30 aspect-video flex flex-col items-center justify-center p-4 text-center">
                                <FileText className="w-7 h-7 text-rose-300 mb-1.5" />
                                <span className="text-xs font-semibold text-rose-900">AS-IS {t('기획 화면 슬롯', 'Wireframe Slot')}</span>
                                <span className="text-[11px] text-zinc-500 mt-0.5">{t('실제 산출물 이미지 등록 대기', 'Awaiting real screenshot')}</span>
                              </div>
                            )}
                            {artifact.beforeCaption && (
                              <p className="text-xs text-zinc-600 leading-relaxed bg-white/80 p-2.5 rounded border border-zinc-200">
                                <span className="font-semibold text-rose-700">● </span>
                                {artifact.beforeCaption}
                              </p>
                            )}
                          </div>

                          {/* TO-BE */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/70 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                TO-BE ({t('개선 후 해결책', 'Improved Solution')})
                              </span>
                            </div>
                            {artifact.imageUrl ? (
                              <div 
                                onClick={() => setLightboxData({
                                  url: artifact.imageUrl!,
                                  title: `${artifact.title} (TO-BE)`,
                                  caption: artifact.afterCaption
                                })}
                                className="relative group rounded-lg overflow-hidden border border-emerald-300 bg-white aspect-video cursor-pointer"
                              >
                                <img 
                                  src={artifact.imageUrl} 
                                  alt="TO-BE Preview"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium backdrop-blur-2xs">
                                  <ZoomIn className="w-4 h-4" />
                                  {t('클릭하여 확대', 'Click to zoom')}
                                </div>
                              </div>
                            ) : (
                              <div className="relative rounded-lg overflow-hidden border border-dashed border-emerald-200 bg-emerald-50/30 aspect-video flex flex-col items-center justify-center p-4 text-center">
                                <FileText className="w-7 h-7 text-emerald-400 mb-1.5" />
                                <span className="text-xs font-semibold text-emerald-900">TO-BE {t('개선 화면 슬롯', 'Solution Slot')}</span>
                                <span className="text-[11px] text-zinc-500 mt-0.5">{t('실제 산출물 이미지 등록 대기', 'Awaiting real screenshot')}</span>
                              </div>
                            )}
                            {artifact.afterCaption && (
                              <p className="text-xs text-zinc-600 leading-relaxed bg-white/80 p-2.5 rounded border border-zinc-200">
                                <span className="font-semibold text-emerald-700">● </span>
                                {artifact.afterCaption}
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        artifact.imageUrl ? (
                          <div 
                            onClick={() => setLightboxData({
                              url: artifact.imageUrl!,
                              title: artifact.title,
                              caption: artifact.description
                            })}
                            className="relative group rounded-lg overflow-hidden border border-zinc-300 bg-white aspect-video cursor-pointer max-h-80"
                          >
                            <img 
                              src={artifact.imageUrl} 
                              alt={artifact.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium backdrop-blur-2xs">
                              <ZoomIn className="w-4 h-4" />
                              {t('클릭하여 고해상도 확대 (Zoom)', 'Click to zoom high-res')}
                            </div>
                          </div>
                        ) : (
                          <div className="relative rounded-lg overflow-hidden border border-dashed border-blue-200 bg-blue-50/30 aspect-video max-h-80 flex flex-col items-center justify-center p-6 text-center">
                            <Layers className="w-8 h-8 text-blue-400 mb-2" />
                            <span className="text-xs font-semibold text-zinc-800">{artifact.title}</span>
                            <span className="text-[11px] font-mono text-zinc-500 mt-1">{t('기획 명세서 / 화면설계서 산출물 영역', 'Deliverable Specification & UI Frame Slot')}</span>
                          </div>
                        )
                      )}

                      {/* Description & Key Insight */}
                      <div className="space-y-2 pt-1">
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                          {artifact.description}
                        </p>
                        {artifact.keyInsight && (
                          <div className="flex items-start gap-2 text-xs bg-blue-50/70 border border-blue-200/60 p-3 rounded-lg text-blue-900">
                            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-semibold font-mono uppercase text-[11px] block text-blue-800">
                                {t('기획 핵심 의도 & 인사이트', 'Key Planning Insight')}
                              </strong>
                              <span>{artifact.keyInsight}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* RETROSPECTIVE & TROUBLESHOOTING CASE STUDY */}
          {hasRetrospective && project.retrospective && (
            <section id="step-mistake" className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  MISTAKE & RECOVERY
                </span>
                <div>
                  <h3 className="text-base font-bold text-zinc-950 uppercase tracking-wider">
                    {t('기획자의 시행착오 및 문제 해결 과정', 'MISTAKE, ROOT CAUSE & TROUBLESHOOTING')}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {t('기획자의 진짜 실력은 예상치 못한 실패와 결함을 만났을 때 집요하게 원인을 파고들어 해결하는 과정에서 드러납니다.', 'True product management competency shines when confronting unexpected pitfalls and systematically solving them.')}
                  </p>
                </div>
              </div>

              <div className="bg-zinc-900 text-white rounded-xl border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md">
                {/* Title */}
                <div className="border-b border-zinc-800 pb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                    {t('실무 트러블슈팅 케이스', 'Troubleshooting Case')}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {project.retrospective.title}
                  </h4>
                </div>

                {/* 4-Step Analysis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 01. Mistake */}
                  <div className="bg-zinc-800/80 rounded-lg p-4 border border-zinc-700/60 space-y-2">
                    <div className="flex items-center gap-2 text-rose-400">
                      <span className="text-xs font-mono font-bold bg-rose-950/80 border border-rose-800/80 px-2 py-0.5 rounded">
                        01
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {t('초기 실수 및 간과했던 지점', 'Initial Pitfall / Oversights')}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {project.retrospective.mistakeOrChallenge}
                    </p>
                  </div>

                  {/* 02. Root Cause */}
                  <div className="bg-zinc-800/80 rounded-lg p-4 border border-zinc-700/60 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400">
                      <span className="text-xs font-mono font-bold bg-amber-950/80 border border-amber-800/80 px-2 py-0.5 rounded">
                        02
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {t('현장 데이터 & 원인 분석', 'Field Data & Root Cause Analysis')}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {project.retrospective.rootCause}
                    </p>
                  </div>

                  {/* 03. How Solved */}
                  <div className="bg-zinc-800/80 rounded-lg p-4 border border-zinc-700/60 space-y-2 md:col-span-2">
                    <div className="flex items-center gap-2 text-blue-400">
                      <span className="text-xs font-mono font-bold bg-blue-950/80 border border-blue-800/80 px-2 py-0.5 rounded">
                        03
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {t('재기획 및 긴급 해결 조치', 'Redesign & Systematic Action Taken')}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {project.retrospective.howSolved}
                    </p>
                  </div>
                </div>

                {/* Before / After Comparison if exists */}
                {project.retrospective.beforeAfterComparison && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-lg bg-zinc-950/70 border border-zinc-800">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-rose-400 font-semibold uppercase">
                        {t('기존 위험 상황 및 원인', 'Failure / Risk Scenario')}
                      </span>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {project.retrospective.beforeAfterComparison.beforeText}
                      </p>
                    </div>
                    <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-zinc-800 pt-2 sm:pt-0 sm:pl-3">
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">
                        {t('개편 후 안정화 조치', 'Safeguard & Stability Applied')}
                      </span>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {project.retrospective.beforeAfterComparison.afterText}
                      </p>
                    </div>
                  </div>
                )}

                {/* 04. Lesson Learned */}
                <div className="pt-4 border-t border-zinc-800 flex items-start gap-3 bg-emerald-950/20 p-4 rounded-lg border border-emerald-900/40">
                  <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                      {t('기획자로서 체득한 핵심 교훈', 'Permanent Lesson Learned as a Planner')}
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed italic">
                      "{project.retrospective.lessonLearned}"
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 07. COLLABORATION */}
          <section id="step-collab" className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-zinc-400">07</span>
              <h3 className="text-base font-semibold text-zinc-950 uppercase tracking-wider">
                {t('07. 유관 부서 협업 및 정렬', '07. CROSS-FUNCTIONAL COLLABORATION')}
              </h3>
            </div>
            <div className="bg-white rounded-xl border border-zinc-200/90 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-zinc-50/70 rounded-lg border border-zinc-200/60 space-y-1">
                <span className="font-semibold text-zinc-900 block font-mono uppercase text-[11px]">
                  {t('디자이너 협업', 'Designer Collaboration')}
                </span>
                <p className="text-zinc-600 leading-relaxed">{project.collaboration.designer}</p>
              </div>
              <div className="p-3 bg-zinc-50/70 rounded-lg border border-zinc-200/60 space-y-1">
                <span className="font-semibold text-zinc-900 block font-mono uppercase text-[11px]">
                  {t('개발자 협업', 'Developer Collaboration')}
                </span>
                <p className="text-zinc-600 leading-relaxed">{project.collaboration.developer}</p>
              </div>
              <div className="p-3 bg-zinc-50/70 rounded-lg border border-zinc-200/60 space-y-1">
                <span className="font-semibold text-zinc-900 block font-mono uppercase text-[11px]">
                  {t('마케팅 정렬', 'Marketing Alignment')}
                </span>
                <p className="text-zinc-600 leading-relaxed">{project.collaboration.marketing}</p>
              </div>
              <div className="p-3 bg-zinc-50/70 rounded-lg border border-zinc-200/60 space-y-1">
                <span className="font-semibold text-zinc-900 block font-mono uppercase text-[11px]">
                  {t('운영 및 고객의견(VOC) 동기화', 'Operations & VOC Sync')}
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
                {t('08. 성과 및 비즈니스 임팩트', '08. RESULT & IMPACT')}
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
                {t('09. 기획자로서의 역할과 기여', '09. MY ROLE & CONTRIBUTION')}
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
                  {t('주요 기획 업무 및 세부 실행 내역', 'What exactly did I do?')}
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
                  {t('기획자로서 얻은 핵심 인사이트', 'Key Takeaway as a Planner')}
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                  "{project.myRole.keyTakeaway}"
                </p>
              </div>
            </div>
          </section>

          {/* 10. EXTERNAL ARTIFACT LINKS */}
          {hasExternalLinks && project.externalLinks && (
            <section id="step-links" className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-zinc-400">10</span>
                <h3 className="text-base font-bold text-zinc-950 uppercase tracking-wider">
                  {t('관련 기획 산출물 & 프로토타입 링크', 'RELATED ARTIFACT & PROTOTYPE LINKS')}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.externalLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-xs transition-all flex items-start justify-between group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {link.type === 'figma' && <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">Figma</span>}
                        {link.type === 'pdf' && <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">PDF</span>}
                        {link.type === 'live' && <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Live Service</span>}
                        {link.type === 'notion' && <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-300">Notion</span>}
                      </div>
                      <h5 className="text-xs sm:text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                        {link.label}
                      </h5>
                      {link.note && link.note !== '대외비 마스킹 완료' && (
                        <p className="text-xs text-zinc-500">{link.note}</p>
                      )}
                    </div>
                    <ExternalLinkIcon className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 transition-colors shrink-0 mt-1" />
                  </a>
                ))}
              </div>
            </section>
          )}

        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {lightboxData && (
        <div 
          onClick={() => setLightboxData(null)}
          className="fixed inset-0 z-70 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between text-white bg-zinc-900">
              <div className="space-y-0.5 max-w-2xl">
                <h5 className="text-sm font-semibold text-white truncate">{lightboxData.title}</h5>
                {lightboxData.caption && (
                  <p className="text-xs text-zinc-400 line-clamp-2">{lightboxData.caption}</p>
                )}
              </div>
              <button
                onClick={() => setLightboxData(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[78vh] flex items-center justify-center bg-zinc-950 p-3">
              <img 
                src={lightboxData.url} 
                alt={lightboxData.title}
                className="max-w-full max-h-[74vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
