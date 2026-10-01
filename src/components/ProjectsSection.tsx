import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, Layers, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { SectionTransition, FadeIn, StaggerContainer, StaggerItem } from './SectionTransition';

export const ProjectsSection: React.FC = () => {
  const { data, openProjectDetail, t } = usePortfolio();
  const { projects } = data;

  // Direct project link map for quick reference & easy deletion/modification
  const projectDirectLinks: Record<string, { label: string; url: string }[]> = {
    'proj-1': [
      { label: 't-nect.com/master', url: 'https://www.t-nect.com/master' }
    ],
    'proj-2': [
      { label: t('Google Play (탑탑)', 'Google Play (TOPTOP)'), url: 'https://play.google.com/store/apps/details?id=kr.co.assembrix.toptop3&hl=ko' }
    ],
    'proj-3': [
      { label: 'HYPERCOMIC', url: 'https://play.hypercomic.io/Webtoon' },
      { label: 'PrompTale AI', url: 'https://www.promptale.io/' }
    ]
  };

  return (
    <SectionTransition id="projects" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070A15] via-[#090E21] to-[#070914] text-slate-100 border-b border-slate-800/80">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Header */}
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest text-blue-400 uppercase">
              {t('01 / 핵심 프로젝트', '01 / FEATURED PROJECTS')}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {t('기획 케이스 스터디 & 산출물', 'Case Studies & Deliverables')}
            </h2>
            <p className="text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
              {t(
                '문제 정의부터 정보구조(IA), 개발 및 운영 협업, 그리고 시행착오 극복 과정까지 실무 기획의 사고 과정을 상세히 공유합니다.',
                'Sharing the end-to-end planning thought process from problem definition and information architecture to cross-functional alignment and retrospective problem solving.'
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-blue-300 bg-blue-950/80 px-3 py-1.5 rounded-lg border border-blue-800/60 w-fit">
              {t('상세 기획서 & 산출물', 'Detailed Case Studies & Deliverables')}
            </span>
          </div>
        </FadeIn>

        {/* Project Cards Grid */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            return (
              <StaggerItem key={project.id} className="h-full">
                <div
                  onClick={() => openProjectDetail(project.id)}
                  className="group bg-slate-900/90 rounded-2xl border border-slate-800/90 overflow-hidden shadow-xl hover:border-blue-500/60 hover:shadow-[0_12px_44px_rgba(37,99,235,0.18)] transition-all duration-300 flex flex-col justify-between cursor-pointer backdrop-blur-sm h-full"
                >
                {/* Visual Thumbnail Area (Preserved container for project screenshots) */}
                <div className="relative aspect-16/9 overflow-hidden bg-slate-950 border-b border-slate-800/90 flex items-center justify-center">
                  {project.thumbnailUrl ? (
                    <img 
                      src={project.thumbnailUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 flex flex-col items-center justify-center p-6 text-center border-dashed border border-slate-800/80 group-hover:border-blue-500/40 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mb-2 shadow-inner group-hover:border-blue-500/60 transition-colors">
                        <Layers className="w-6 h-6 text-blue-400" />
                      </div>
                      <span className="text-xs font-semibold text-slate-200 tracking-tight line-clamp-1">
                        {project.title}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 mt-1">
                        {t('기획 케이스 스터디 산출물 영역', 'Case Study Artifact Area')}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span className="text-[11px] font-mono font-bold bg-slate-950/90 text-white px-2.5 py-1 rounded backdrop-blur-md border border-slate-700/80 shadow-xs">
                      PROJECT {project.number}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Titles */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-400">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.category.map((cat, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono text-slate-300 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800 group-hover:border-slate-700 transition-colors"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Key Overview Mini Bar */}
                  <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono uppercase">{t('기획 역할', 'Role')}</span>
                      <span className="text-slate-200 font-medium truncate block">{project.overview.role.split('(')[0]}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono uppercase">{t('타겟 플랫폼', 'Platform')}</span>
                      <span className="text-slate-200 font-medium truncate block">{project.overview.platform}</span>
                    </div>
                  </div>

                  {/* Project External Links */}
                  {projectDirectLinks[project.id] && projectDirectLinks[project.id].length > 0 && (
                    <div className="pt-1 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-slate-500 mr-0.5">
                        {t('서비스 링크:', 'Live:')}
                      </span>
                      {projectDirectLinks[project.id].map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline bg-blue-950/40 hover:bg-blue-900/50 border border-blue-800/50 px-2.5 py-1 rounded-md transition-colors"
                        >
                          <span>{link.label}</span>
                          <ExternalLinkIcon className="w-3 h-3 opacity-70" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer Action */}
                <div className="px-6 sm:px-7 py-3.5 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    {project.period}
                  </span>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:text-blue-300 font-mono tracking-tight">
                    <span>{t('상세 케이스 스터디 보기', 'View Case Study')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

    </div>
  </SectionTransition>
);
};
