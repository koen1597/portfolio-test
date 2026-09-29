import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Printer } from 'lucide-react';

export const ResumeModal: React.FC = () => {
  const { data, isResumeOpen, closeResume, language, setLanguage, t } = usePortfolio();
  const { profile, competencies, experiences, projects } = data;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeResume();
    };
    if (isResumeOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isResumeOpen, closeResume]);

  if (!isResumeOpen) return null;

  const handlePrint = () => {
    const resumeEl = document.getElementById('printable-resume');
    if (!resumeEl) {
      window.print();
      return;
    }

    // Try isolated hidden iframe print to bypass iframe/modal scroll clipping & sandbox restrictions
    try {
      let printFrame = document.getElementById('resume-print-iframe') as HTMLIFrameElement;
      if (printFrame) {
        printFrame.remove();
      }
      printFrame = document.createElement('iframe');
      printFrame.id = 'resume-print-iframe';
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = '0';
      printFrame.style.visibility = 'hidden';
      document.body.appendChild(printFrame);

      const frameDoc = printFrame.contentWindow?.document;
      if (frameDoc) {
        frameDoc.open();
        
        // Collect stylesheet tags from document
        const styleSheets = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
          .map(el => el.outerHTML)
          .join('\n');

        frameDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <title>${profile.name} - ${t('이력서', 'Resume')}</title>
              ${styleSheets}
              <style>
                @page { size: A4 portrait; margin: 12mm 15mm; }
                * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                html, body {
                  background: #ffffff !important;
                  color: #18181b !important;
                  font-family: -apple-system, BlinkMacSystemFont, "Pretendard Variable", Pretendard, system-ui, sans-serif;
                  margin: 0;
                  padding: 8px;
                }
                .print-hidden { display: none !important; }
              </style>
            </head>
            <body>
              <div class="print-container">
                ${resumeEl.innerHTML}
              </div>
            </body>
          </html>
        `);
        frameDoc.close();

        setTimeout(() => {
          try {
            printFrame.contentWindow?.focus();
            printFrame.contentWindow?.print();
          } catch {
            window.print();
          }
        }, 300);
        return;
      }
    } catch (e) {
      console.warn('Iframe print error, falling back to window.print', e);
    }

    // Direct browser print fallback
    window.print();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeResume();
      }}
      className="resume-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="resume-modal-card bg-white w-full max-w-4xl max-h-[94vh] rounded-2xl border border-zinc-200 shadow-2xl flex flex-col overflow-hidden text-zinc-900 print:max-w-none print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Header toolbar (hidden when printed) */}
        <div className="print-hidden print:hidden bg-zinc-50 px-6 py-3 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              {t('상세 이력서 문서', 'Interactive Resume Document')}
            </span>
            {/* Language toggle inside resume */}
            <div className="inline-flex items-center p-0.5 bg-zinc-200/80 rounded text-xs font-mono">
              <button
                onClick={() => setLanguage('ko')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                  language === 'ko' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                KR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                  language === 'en' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                ENG
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 px-3.5 py-1.5 rounded-md shadow-xs transition-colors cursor-pointer"
              title={t('PDF 저장 및 인쇄', 'Save as PDF & Print')}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('인쇄 / PDF 저장', 'Print / Save PDF')}</span>
            </button>
            <button
              onClick={closeResume}
              className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/80 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div id="printable-resume" className="resume-content-body overflow-y-auto p-8 sm:p-12 space-y-10 font-sans print:p-0">
          
          {/* Header */}
          <div className="border-b border-zinc-200 pb-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                {profile.photoUrl ? (
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 text-white flex items-center justify-center font-bold font-mono text-2xl tracking-wider shrink-0 border border-zinc-300 shadow-xs">
                    KN
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
                    {profile.name}
                  </h1>
                  <p className="text-base font-semibold text-zinc-700 mt-0.5">
                    {profile.roleTitle}
                  </p>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">
                    {profile.location || 'Seoul · Tokyo'} · {profile.mbti || 'ENTJ-A'}
                  </p>
                </div>
              </div>

              <div className="text-xs sm:text-right space-y-1 text-zinc-600 font-mono">
                <div>Email: <a href={`mailto:${profile.email}`} className="text-zinc-900 hover:text-blue-600 underline underline-offset-2">{profile.email}</a></div>
                <div>Phone: <a href={`tel:${profile.phone || '010-7930-1597'}`} className="text-zinc-900 hover:text-blue-600">{profile.phone || '010-7930-1597'}</a></div>
                <div>{t('문화적 배경: ', 'Background: ')}{profile.backgroundOrigin}</div>
                <div>{t('구사 언어: 일본어 (모국어) / 한국어 (원어민 수준) / 영어 (일상 회화)', 'Languages: JA (Native) / KO (Native Level) / EN (Conversational)')}</div>
              </div>
            </div>

            <p className="text-sm text-zinc-700 leading-relaxed max-w-3xl pt-2">
              "{profile.heroQuote}" — {profile.heroSubquote}
            </p>
          </div>

          {/* Executive Summary */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold border-b border-zinc-200 pb-1">
              {t('기획자 핵심 요약', 'Executive Summary')}
            </h2>
            <div className="text-xs sm:text-sm text-zinc-700 space-y-2 leading-relaxed">
              <p>
                {profile.aboutIntro} {profile.aboutPhilosophy}
              </p>
              <p>
                {profile.aboutCollaboration}
              </p>
            </div>
          </div>

          {/* Core Competencies */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold border-b border-zinc-200 pb-1">
              {t('핵심 역량 및 업무 범위', 'Competencies & Scope')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {competencies.map(c => (
                <div key={c.id} className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900">{c.number}. {c.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200 text-zinc-700">
                      {c.badge}
                    </span>
                  </div>
                  <p className="text-zinc-600 text-[11px] leading-normal">{c.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {c.tags.map((tTag, i) => (
                      <span key={i} className="text-[10px] bg-white border border-zinc-200/80 px-1.5 py-0.5 rounded text-zinc-700">
                        {tTag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold border-b border-zinc-200 pb-1">
              {t('주요 경력 사항', 'Professional Experience')}
            </h2>
            <div className="space-y-6">
              {experiences.map(exp => (
                <div key={exp.id} className="space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div className="font-bold text-zinc-950 text-sm">
                      {exp.role} <span className="font-normal text-zinc-500">· {exp.company}</span>
                    </div>
                    <span className="font-mono text-zinc-400">{exp.period}</span>
                  </div>
                  <p className="text-zinc-700 text-xs leading-relaxed">{exp.summary}</p>
                  <ul className="space-y-1 pt-1 text-zinc-600">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-zinc-400">▪</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold border-b border-zinc-200 pb-1">
              {t('선정 프로젝트 및 케이스 스터디', 'Selected Projects & Case Studies')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {projects.map(p => (
                <div key={p.id} className="p-4 rounded-lg border border-zinc-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900">{p.number}. {p.title}</span>
                    {p.metric && (
                      <span className="font-mono text-[10px] font-semibold bg-zinc-900 text-white px-2 py-0.5 rounded">
                        {p.metric}
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-500 text-[11px]">{p.subtitle}</p>
                  <p className="text-zinc-600 text-xs line-clamp-2">{p.summary}</p>
                  <div className="pt-1 text-[11px] text-zinc-700 font-medium">
                    <span className="text-zinc-400">{t('기획자 역할: ', 'Role: ')}</span>
                    {p.myRole.primary}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold border-b border-zinc-200 pb-1">
              {t('학력 및 어학 자격', 'Education & Certifications')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-lg border border-zinc-200 bg-zinc-50/50 space-y-2">
                <div className="font-bold text-zinc-900">{t('학력 사항', 'Education')}</div>
                <div className="space-y-1.5 text-zinc-700">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-zinc-900">Waseda University (일본)</span>
                    <span className="font-mono text-[11px] text-zinc-400">2016.04 ~ 2016.11</span>
                  </div>
                  <p className="text-[11px] text-zinc-500">{t('교육심리학과 (중퇴)', 'Department of Educational Psychology (Left)')}</p>

                  <div className="pt-2 border-t border-zinc-200/60 flex justify-between items-baseline">
                    <span className="font-semibold text-zinc-900">GED (미국)</span>
                    <span className="font-mono text-[11px] text-zinc-400">2016.01</span>
                  </div>
                  <p className="text-[11px] text-zinc-500">{t('미국 고등학교 학력 검정고시 취득', 'US High School Equivalency Examination')}</p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-zinc-200 bg-zinc-50/50 space-y-2">
                <div className="font-bold text-zinc-900">{t('어학 및 자격 사항', 'Languages & Scores')}</div>
                <div className="space-y-1.5 text-zinc-700">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-zinc-900">TOEIC 990점</span>
                    <span className="font-mono text-[11px] font-semibold text-emerald-700">{t('만점', 'Full Score (990/990)')}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-zinc-900">TOEFL (iBT) 107점</span>
                    <span className="font-mono text-[11px] text-zinc-500">{t('고득점 취득 (107/120)', 'High Score (107/120)')}</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-200/60">
                    <p className="text-[11px] text-zinc-600">
                      {t(
                        '일본어 (모국어) · 한국어 (원어민 수준) · 영어 (일상 회화 가능)',
                        'Japanese (Native) · Korean (Native Level) · English (Conversational)'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
