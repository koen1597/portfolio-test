import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Copy, Check, FileText, ArrowUpRight, Send } from 'lucide-react';
import { SectionTransition, FadeIn } from './SectionTransition';

export const ContactSection: React.FC = () => {
  const { data, openResume, t } = usePortfolio();
  const { profile } = data;
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !message) return;
    const subject = encodeURIComponent(`[Portfolio Inquiry] From ${senderName}`);
    const body = encodeURIComponent(`From: ${senderName} (${senderEmail})\n\nMessage:\n${message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <SectionTransition id="contact" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070A16] via-[#090E20] to-[#04060C] text-slate-100">
      {/* Ambient background glows */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Header */}
        <FadeIn className="space-y-3">
          <div className="text-xs font-mono tracking-widest text-blue-400 uppercase">
            {t('05 / 연락처', '05 / CONTACT')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t('복잡한 문제를 명확한 서비스로 만듭니다.', "Let's build something meaningful together.")}
          </h2>
          <p className="text-base text-slate-300 max-w-xl font-normal leading-relaxed">
            {t(
              '복잡한 비즈니스 문제를 명확한 서비스 구조와 직관적인 화면으로 구체화할 기획자를 찾고 계신가요? 편하게 연락주세요.',
              'Looking for a service planner who structures complex business logic into intuitive user experiences? Feel free to reach out.'
            )}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Cards */}
          <FadeIn delay={0.1} className="lg:col-span-6 space-y-4">
            
            {/* Contact Info Card */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4 hover:border-slate-700 transition-all backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {t('직접 연락처 & 이메일', 'Direct Contacts')}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {profile.location || 'Seoul, Korea'}
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Email</div>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm sm:text-base font-bold text-white hover:text-blue-400 font-mono break-all transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
                <button
                  id="copy-email-btn"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-950/80 hover:bg-blue-900 text-blue-300 px-3 py-1.5 rounded-lg border border-blue-800/80 shrink-0 transition-colors"
                  title="Copy email"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">{t('복사됨!', 'Copied!')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-blue-400" />
                      <span>{t('복사', 'Copy')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Phone</div>
                  <a
                    href={`tel:${profile.phone || '010-7930-1597'}`}
                    className="text-sm sm:text-base font-bold text-white hover:text-blue-400 font-mono transition-colors"
                  >
                    {profile.phone || '010-7930-1597'}
                  </a>
                </div>
                <span className="text-xs text-blue-300 font-semibold font-mono bg-blue-950/80 border border-blue-800/60 px-2.5 py-0.5 rounded">
                  {t('통화 / 문자 가능', 'Call / SMS')}
                </span>
              </div>

              <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                {t('평일 업무 시간 및 주말에도 확인 후 신속하게 회신드립니다.', 'Responds promptly upon receiving inquiries.')}
              </p>
            </div>

            {/* Resume & Documents Card */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4 hover:border-slate-700 transition-all backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {t('이력서 & 상세 프로필', 'Documents & Profile')}
                </span>
                <span className="text-xs font-mono text-slate-400">Korean / English</span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  id="contact-resume-btn"
                  onClick={openResume}
                  className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 py-2.5 px-4 rounded-xl transition-all shadow-md shadow-blue-600/25"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t('상세 이력서 열기', 'Open Interactive Resume')}</span>
                </button>

                <button
                  onClick={() => {
                    openResume();
                    setTimeout(() => window.print(), 350);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 py-2.5 px-4 rounded-xl border border-slate-800 transition-all"
                >
                  <span>{t('인쇄 / PDF 저장', 'Print / PDF')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Quick Context Card */}
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-blue-300">
                {t('활동 및 거주 권역:', 'Location & Mobility:')}
              </div>
              <div>
                {t('한국 (서울) 및 일본 (도쿄 / 원격) 프로젝트 유연 대응 가능', 'Available for Seoul, Tokyo, and remote cross-border projects')}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {t(
                  '언어: 일본어 (모국어), 한국어 (원어민 수준), 영어 (일상 회화)',
                  'Languages: Japanese (Native), Korean (Native Level), English (Conversational)'
                )}
              </div>
            </div>

          </FadeIn>

          {/* Quick Message Box */}
          <FadeIn delay={0.2} className="lg:col-span-6">
            <form
              onSubmit={handleSend}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-xl space-y-4 backdrop-blur-md"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white">
                  {t('빠른 메시지 전달', 'Quick Inquiry')}
                </h3>
                <span className="text-[11px] font-mono text-slate-400">Direct Form</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-400">
                  {t('성함 / 소속', 'Name / Company')} <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('예: 홍길동 (스타트업 대표 / 채용 담당자)', 'e.g. Alex Kim (Product Lead / Hiring Team)')}
                  value={senderName}
                  onChange={e => setSenderName(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-400">
                  {t('보내시는 분 이메일', 'Your Email')}
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={senderEmail}
                  onChange={e => setSenderEmail(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-400">
                  {t('메시지 내용', 'Message')} <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={t(
                    '프로젝트 의뢰 내용이나 협업 제안, 커피챗 문의 등을 자유롭게 작성해주세요.',
                    'Feel free to describe the project scope, collaboration proposal, or general inquiry.'
                  )}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3.5 rounded-lg border border-slate-800 bg-slate-950 text-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 py-3 rounded-xl transition-all shadow-md shadow-blue-600/25"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t('메시지 보내기 (기본 이메일 앱 연동)', 'Send Inquiry (Launches Mail App)')}</span>
              </button>

              {formSent && (
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-300 text-center font-mono">
                  {t('이메일 클라이언트가 열렸습니다. 전송 버튼을 눌러주세요!', 'Mail client opened. Please click send!')}
                </div>
              )}
            </form>
          </FadeIn>

        </div>

        {/* Footer */}
        <FadeIn delay={0.25} className="pt-16 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>{t('서비스 & UI/UX 기획자 포트폴리오', 'Service & UI/UX Planner Portfolio')}</span>
          </div>
        </FadeIn>

      </div>
    </SectionTransition>
  );
};
