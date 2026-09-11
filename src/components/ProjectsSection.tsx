import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, TrendingUp, Layers, AlertTriangle, ExternalLink } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data, openProjectDetail, t } = usePortfolio();
  const { projects } = data;

  return (
    <section id="projects" className="py-24 border-b border-zinc-200/70">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
              {t('04 / 선정 프로젝트', '04 / SELECTED PROJECTS')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 tracking-tight">
              {t('기획 케이스 스터디 & 산출물', 'Case Studies & Deliverables')}
            </h2>
            <p className="text-base text-zinc-600 max-w-2xl">
              {t(
                '단순히 화면 스크린샷만 나열하지 않고, 기획자의 문제 정의부터 정보구조(IA), 개발/운영 협업, 실제 산출물 갤러리 및 시행착오 극복기까지 투명하게 공유합니다.',
                'Going beyond surface mocks to detail problem definition, information architecture, real work artifacts, and honest retrospective troubleshooting.'
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded border border-zinc-200/80 w-fit">
              {t('실제 산출물 & 트러블슈팅 포함', 'Real Artifacts & Troubleshooting Included')}
            </span>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const artifactCount = project.artifacts?.length || 0;
            const hasRetro = Boolean(project.retrospective);

            return (
              <div
                key={project.id}
                onClick={() => openProjectDetail(project.id)}
                className="group bg-white rounded-xl border border-zinc-200/90 overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-[0_12px_36px_rgba(37,99,235,0.09)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Visual Thumbnail Header if available */}
                {project.thumbnailUrl && (
                  <div className="relative aspect-16/8 overflow-hidden bg-zinc-100 border-b border-zinc-100">
                    <img 
                      src={project.thumbnailUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                    
                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[11px] font-mono font-bold bg-zinc-900/90 text-white px-2.5 py-1 rounded backdrop-blur-xs border border-white/10 shadow-xs">
                        PROJECT {project.number}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {artifactCount > 0 && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold bg-blue-900/80 text-blue-100 px-2 py-0.5 rounded backdrop-blur-xs border border-blue-400/30">
                            <Layers className="w-3 h-3 text-blue-300" />
                            {t(`산출물 ${artifactCount}건`, `${artifactCount} Artifacts`)}
                          </span>
                        )}
                        {hasRetro && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold bg-amber-950/80 text-amber-200 px-2 py-0.5 rounded backdrop-blur-xs border border-amber-400/30">
                            <AlertTriangle className="w-3 h-3 text-amber-400" />
                            {t('시행착오 극복기', 'Mistake Case')}
                          </span>
                        )}
                      </div>
                      
                      {project.metric && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold bg-emerald-950/85 text-emerald-200 px-2.5 py-0.5 rounded backdrop-blur-xs border border-emerald-400/30 shrink-0">
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                          {project.metric}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-7 space-y-5">
                  {/* Header row when no thumbnail */}
                  {!project.thumbnailUrl && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-600">
                        PROJECT {project.number}
                      </span>
                      {project.metric && (
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                            <TrendingUp className="w-3 h-3 text-blue-600" />
                            {project.metric}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Titles */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-zinc-950 tracking-tight group-hover:text-blue-900 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-zinc-500">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.category.map((cat, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono text-zinc-700 bg-zinc-50 px-2.5 py-0.5 rounded-md border border-zinc-200/70 group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-colors"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Key Overview Mini Bar */}
                  <div className="bg-zinc-50/80 rounded-lg p-3 border border-zinc-200/50 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-zinc-400 block text-[10px] font-mono uppercase">{t('역할', 'Role')}</span>
                      <span className="text-zinc-800 font-medium truncate block">{project.overview.role.split('(')[0]}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px] font-mono uppercase">{t('플랫폼', 'Platform')}</span>
                      <span className="text-zinc-800 font-medium truncate block">{project.overview.platform}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="px-7 py-4 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">
                    {project.period}
                  </span>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700 font-mono tracking-tight underline underline-offset-4 hover:no-underline">
                    <span>{t('케이스 스터디 & 산출물 보기', 'View Case Study & Artifacts')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Thinking Process */}
        <div className="bg-blue-50/40 rounded-xl p-6 border border-blue-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 text-xs text-zinc-700">
            <span className="font-semibold text-blue-950 block sm:inline mr-2">
              💡 {t('기획 포트폴리오의 핵심 가치:', 'Planner Portfolio Philosophy:')}
            </span>
            {t(
              '단순한 시각 디자인보다 “문제를 어떻게 정의하고, 비즈니스 규칙과 운영 프로세스를 어떻게 구조화했는가”라는 기획자의 사고 과정(Thinking Process)을 중점적으로 기술했습니다.',
              'Prioritizing structured thinking, business logic, and operational workflow architecture over mere decorative surface styling.'
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
