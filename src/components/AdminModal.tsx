import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCaseStudy, ProfileData } from '../types';
import { Lock, KeyRound, Save, RotateCcw, X, Plus, Trash2, Check, Edit3, ShieldAlert, LogOut, FileText } from 'lucide-react';
import { compressImageFile } from '../utils/imageCompressor';

export const AdminModal: React.FC = () => {
  const {
    data,
    language,
    setLanguage,
    updateData,
    resetToDefault,
    updateProfile,
    updateProject,
    addProject,
    deleteProject,
    isAdminAuthenticated,
    isAdminModalOpen,
    closeAdminModal,
    verifyPassword,
    changePassword,
    adminLogout
  } = usePortfolio();

  const [inputPassword, setInputPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'competencies' | 'security'>('profile');
  
  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Editable Profile state
  const [editableProfile, setEditableProfile] = useState<ProfileData>(data.profile);

  // Editable Project selection state
  const [selectedProjectId, setSelectedProjectId] = useState<string>(data.projects[0]?.id || '');
  const [isEditingProject, setIsEditingProject] = useState<boolean>(true);
  const currentProject = data.projects.find(p => p.id === selectedProjectId) || data.projects[0];
  const [editingProjectData, setEditingProjectData] = useState<ProjectCaseStudy | null>(currentProject || null);

  const [saveToast, setSaveToast] = useState(false);

  React.useEffect(() => {
    setEditableProfile(data.profile);
    const proj = data.projects.find(p => p.id === selectedProjectId) || data.projects[0];
    if (proj) {
      setSelectedProjectId(proj.id);
      setEditingProjectData(proj);
    }
  }, [language, data]);

  if (!isAdminModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPassword(inputPassword)) {
      setPasswordError('');
      setInputPassword('');
      setEditableProfile(data.profile);
      if (data.projects[0]) {
        setSelectedProjectId(data.projects[0].id);
        setEditingProjectData(data.projects[0]);
      }
    } else {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length < 4) {
      setPasswordError('비밀번호는 최소 4자리 이상이어야 합니다.');
      return;
    }
    if (changePassword(newPassword)) {
      setPasswordSuccess('비밀번호가 성공적으로 변경되었습니다!');
      setNewPassword('');
      setTimeout(() => setPasswordSuccess(''), 3000);
    }
  };

  const handleSaveProfile = () => {
    updateProfile(editableProfile);
    triggerSaveToast();
  };

  const handleSaveProject = () => {
    if (editingProjectData) {
      updateProject(editingProjectData);
      triggerSaveToast();
    }
  };

  const handleAddNewProject = () => {
    const newId = `proj-${Date.now()}`;
    const newProj: ProjectCaseStudy = {
      id: newId,
      number: `0${data.projects.length + 1}`,
      title: '새 프로젝트 제목',
      subtitle: '서비스 부제목 및 개요',
      category: ['Service Planning', 'UI/UX Planning'],
      period: '2024.01 — 2024.06',
      summary: '프로젝트 핵심 요약과 해결하고자 한 문제를 작성해주세요.',
      metric: '성과 지표',
      metricLabel: '지표 레이블',
      overview: {
        project: '신규 프로젝트',
        company: '기업명 / 서비스명',
        duration: '6개월',
        role: 'Lead Service Planner',
        platform: 'Web / App',
        team: '기획 1, 디자인 1, 개발 2'
      },
      background: '서비스가 왜 필요했는지 배경을 서술합니다.',
      problem: ['해결해야 했던 첫 번째 문제', '해결해야 했던 두 번째 문제'],
      approach: ['문제를 해결하기 위해 취한 접근법'],
      planning: {
        serviceStructure: '서비스 기본 구조 및 정책',
        userFlow: '주요 사용자 이동 경로',
        informationArchitecture: '핵심 IA 트리'
      },
      uiux: {
        wireframeNotes: '와이어프레임 설계 원칙',
        screenPlanning: '화면 기획서 주요 명세',
        interaction: '인터랙션 및 피드백'
      },
      collaboration: {
        designer: '디자이너와의 협업 내용',
        developer: '개발팀과의 협업 내용',
        marketing: '마케팅팀과의 협업 내용',
        operations: '운영팀과의 협업 내용'
      },
      result: {
        summary: '프로젝트 최종 성과 요약',
        metrics: [{ label: '핵심 지표', value: '+50%', desc: '개선 성과' }],
        impact: ['비즈니스 및 사용자 관점의 임팩트']
      },
      myRole: {
        primary: '기획자로서의 핵심 기여',
        responsibilities: ['내가 구체적으로 수행한 업무 1', '내가 구체적으로 수행한 업무 2'],
        keyTakeaway: '이 프로젝트를 통해 얻은 기획자로서의 인사이트'
      }
    };
    addProject(newProj);
    setSelectedProjectId(newId);
    setEditingProjectData(newProj);
    triggerSaveToast();
  };

  const handleDeleteCurrentProject = () => {
    if (confirm(`'${editingProjectData?.title}' 프로젝트를 정말 삭제하시겠습니까?`)) {
      if (editingProjectData) {
        deleteProject(editingProjectData.id);
        const remaining = data.projects.filter(p => p.id !== editingProjectData.id);
        if (remaining[0]) {
          setSelectedProjectId(remaining[0].id);
          setEditingProjectData(remaining[0]);
        }
        triggerSaveToast();
      }
    }
  };

  const handleReset = () => {
    if (confirm('포트폴리오의 모든 데이터를 초기 원본 상태로 복원하시겠습니까? (직접 수정한 내용이 초기화됩니다)')) {
      resetToDefault();
      closeAdminModal();
    }
  };

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAdminModal();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-200 text-zinc-900"
    >
      <div className="bg-[#FAF9F6] w-full max-w-4xl max-h-[92vh] rounded-2xl border border-zinc-200 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-zinc-900 text-white flex items-center justify-center">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-950">
                {isAdminAuthenticated ? 'Portfolio CMS / Admin' : '관리자 인증'}
              </h2>
              {isAdminAuthenticated && (
                <p className="text-[11px] text-zinc-500 font-mono">
                  관리자 인증됨 · 실시간 수정 및 저장 가능
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded border border-zinc-200 text-xs font-mono mr-2">
                <span className="text-[10px] text-zinc-400 px-1">편집 대상:</span>
                <button
                  type="button"
                  onClick={() => setLanguage('ko')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                    language === 'ko' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  KR (한국어)
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                    language === 'en' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  ENG (English)
                </button>
              </div>
            )}
            {isAdminAuthenticated && (
              <button
                onClick={adminLogout}
                className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 px-2 py-1 rounded hover:bg-zinc-100"
                title="로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            )}
            <button
              onClick={closeAdminModal}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate Screen */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-sm mx-auto my-auto space-y-6 text-center w-full">
            <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-800 mx-auto flex items-center justify-center border border-zinc-200">
              <KeyRound className="w-5 h-5" />
            </div>
            
            <div>
              <h3 className="text-base font-semibold text-zinc-950">
                관리자 인증
              </h3>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono uppercase text-zinc-500">
                  비밀번호
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={inputPassword}
                  onChange={e => setInputPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  className="w-full text-center text-sm px-4 py-2.5 rounded-lg border border-zinc-300 bg-white focus:outline-hidden focus:border-zinc-900 tracking-widest font-mono shadow-2xs"
                />
              </div>

              {passwordError && (
                <div className="text-xs text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                  {passwordError}
                </div>
              )}

              <button
                type="submit"
                className="w-full text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 py-2.5 rounded-lg shadow-xs transition-colors"
              >
                인증하기
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated CMS Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tab navigation */}
            <div className="bg-white px-6 border-b border-zinc-200 flex items-center gap-6 text-xs font-medium overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-zinc-950 text-zinc-950 font-semibold'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                기본 프로필 & Hero
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'border-zinc-950 text-zinc-950 font-semibold'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                프로젝트 관리 ({data.projects.length}개)
              </button>
              <button
                onClick={() => setActiveTab('competencies')}
                className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'competencies'
                    ? 'border-zinc-950 text-zinc-950 font-semibold'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                역량 (What I Do)
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'border-zinc-950 text-zinc-950 font-semibold'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                비밀번호 변경 & 시스템
              </button>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
              
              {/* TAB 1: Profile & Hero */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">
                        기본 프로필 및 헤더 설정
                      </h3>
                      <p className="text-xs text-zinc-500">
                        홈 첫 화면의 문구, 직무 타이틀, 이메일 주소를 변경합니다.
                      </p>
                    </div>
                    <button
                      onClick={handleSaveProfile}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 px-3.5 py-1.5 rounded-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      저장하기
                    </button>
                  </div>

                  {/* Photo & Quick Info */}
                  <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 flex flex-col sm:flex-row items-center gap-5">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-200 border border-zinc-300 flex items-center justify-center flex-shrink-0 relative">
                      {editableProfile.photoUrl ? (
                        <img
                          src={editableProfile.photoUrl}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-mono text-xs text-zinc-500">No Photo</span>
                      )}
                    </div>
                    <div className="flex-1 space-y-2 text-xs">
                      <div className="font-semibold text-zinc-900">프로필 사진 업로드</div>
                      <p className="text-[11px] text-zinc-500">
                        준비하신 사진 파일(Koen Photo.jpg)을 업로드하면 웹사이트 및 이력서에 즉시 반영됩니다.
                      </p>
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-medium transition-colors">
                          <span>사진 파일 선택</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                try {
                                  const compressed = await compressImageFile(file, 600, 0.88);
                                  if (compressed) {
                                    setEditableProfile(prev => ({ ...prev, photoUrl: compressed }));
                                  }
                                } catch (err) {
                                  console.error('Failed to compress image:', err);
                                }
                              }
                            }}
                          />
                        </label>
                        {editableProfile.photoUrl && (
                          <button
                            type="button"
                            onClick={() => setEditableProfile(prev => ({ ...prev, photoUrl: '' }))}
                            className="text-[11px] text-red-600 hover:underline"
                          >
                            사진 삭제
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-mono uppercase text-zinc-500">이름</label>
                      <input
                        type="text"
                        value={editableProfile.name}
                        onChange={e => setEditableProfile({ ...editableProfile, name: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-zinc-300 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono uppercase text-zinc-500">직무 타이틀</label>
                      <input
                        type="text"
                        value={editableProfile.roleTitle}
                        onChange={e => setEditableProfile({ ...editableProfile, roleTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-zinc-300 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono uppercase text-zinc-500">연락처 (Phone)</label>
                      <input
                        type="text"
                        value={editableProfile.phone || ''}
                        onChange={e => setEditableProfile({ ...editableProfile, phone: e.target.value })}
                        placeholder="010-7930-1597"
                        className="w-full px-3 py-2 rounded border border-zinc-300 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono uppercase text-zinc-500">거주 / 활동 지역 (Location)</label>
                      <input
                        type="text"
                        value={editableProfile.location || ''}
                        onChange={e => setEditableProfile({ ...editableProfile, location: e.target.value })}
                        placeholder="서울 관악구 봉천동 / 도쿄"
                        className="w-full px-3 py-2 rounded border border-zinc-300 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono uppercase text-zinc-500">성향 / MBTI</label>
                      <input
                        type="text"
                        value={editableProfile.mbti || ''}
                        onChange={e => setEditableProfile({ ...editableProfile, mbti: e.target.value })}
                        placeholder="ENTJ-A"
                        className="w-full px-3 py-2 rounded border border-zinc-300 bg-white"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-mono uppercase text-zinc-500">Hero 메인 슬로건 (영어)</label>
                      <input
                        type="text"
                        value={editableProfile.heroQuote}
                        onChange={e => setEditableProfile({ ...editableProfile, heroQuote: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-zinc-300 bg-white"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-mono uppercase text-zinc-500">Hero 서브 문구 (한국어)</label>
                      <input
                        type="text"
                        value={editableProfile.heroSubquote}
                        onChange={e => setEditableProfile({ ...editableProfile, heroSubquote: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-zinc-300 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono uppercase text-zinc-500">경력 표시</label>
                      <input
                        type="text"
                        value={editableProfile.experienceYears}
                        onChange={e => setEditableProfile({ ...editableProfile, experienceYears: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-zinc-300 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono uppercase text-zinc-500">이메일 주소</label>
                      <input
                        type="email"
                        value={editableProfile.email}
                        onChange={e => setEditableProfile({ ...editableProfile, email: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-zinc-300 bg-white"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-mono uppercase text-zinc-500">About 소개글 (Intro)</label>
                      <textarea
                        rows={3}
                        value={editableProfile.aboutIntro}
                        onChange={e => setEditableProfile({ ...editableProfile, aboutIntro: e.target.value })}
                        className="w-full p-3 rounded border border-zinc-300 bg-white"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-mono uppercase text-zinc-500">기획 철학 (Philosophy)</label>
                      <textarea
                        rows={2}
                        value={editableProfile.aboutPhilosophy}
                        onChange={e => setEditableProfile({ ...editableProfile, aboutPhilosophy: e.target.value })}
                        className="w-full p-3 rounded border border-zinc-300 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Projects Editor */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Top toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-200">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-mono uppercase text-zinc-500">프로젝트 선택:</label>
                      <select
                        value={selectedProjectId}
                        onChange={e => {
                          setSelectedProjectId(e.target.value);
                          const p = data.projects.find(proj => proj.id === e.target.value);
                          if (p) setEditingProjectData(p);
                        }}
                        className="text-xs font-semibold px-3 py-1.5 rounded border border-zinc-300 bg-white"
                      >
                        {data.projects.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.number}. {p.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleAddNewProject}
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-800 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded border border-zinc-300"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        새 프로젝트 추가
                      </button>
                      <button
                        onClick={handleDeleteCurrentProject}
                        className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded border border-red-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        삭제
                      </button>
                      <button
                        onClick={handleSaveProject}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 px-3.5 py-1.5 rounded"
                      >
                        <Save className="w-3.5 h-3.5" />
                        현재 프로젝트 저장
                      </button>
                    </div>
                  </div>

                  {/* Edit Current Project Fields */}
                  {editingProjectData && (
                    <div className="space-y-6 text-xs">
                      
                      {/* Basic info */}
                      <div className="bg-white p-5 rounded-xl border border-zinc-200 space-y-4">
                        <span className="font-semibold text-zinc-900 uppercase font-mono block">기본 정보</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="font-mono text-zinc-400 block mb-1">순번 (예: 01)</label>
                            <input
                              type="text"
                              value={editingProjectData.number}
                              onChange={e => setEditingProjectData({ ...editingProjectData, number: e.target.value })}
                              className="w-full px-2.5 py-1.5 rounded border border-zinc-300"
                            />
                          </div>
                          <div>
                            <label className="font-mono text-zinc-400 block mb-1">프로젝트 제목</label>
                            <input
                              type="text"
                              value={editingProjectData.title}
                              onChange={e => setEditingProjectData({ ...editingProjectData, title: e.target.value })}
                              className="w-full px-2.5 py-1.5 rounded border border-zinc-300"
                            />
                          </div>
                          <div>
                            <label className="font-mono text-zinc-400 block mb-1">부제목</label>
                            <input
                              type="text"
                              value={editingProjectData.subtitle}
                              onChange={e => setEditingProjectData({ ...editingProjectData, subtitle: e.target.value })}
                              className="w-full px-2.5 py-1.5 rounded border border-zinc-300"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="font-mono text-zinc-400 block mb-1">대표 성과 지표 (예: -60% 또는 1.2M+)</label>
                            <input
                              type="text"
                              value={editingProjectData.metric || ''}
                              onChange={e => setEditingProjectData({ ...editingProjectData, metric: e.target.value })}
                              className="w-full px-2.5 py-1.5 rounded border border-zinc-300"
                            />
                          </div>
                          <div>
                            <label className="font-mono text-zinc-400 block mb-1">지표 설명</label>
                            <input
                              type="text"
                              value={editingProjectData.metricLabel || ''}
                              onChange={e => setEditingProjectData({ ...editingProjectData, metricLabel: e.target.value })}
                              className="w-full px-2.5 py-1.5 rounded border border-zinc-300"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-mono text-zinc-400 block mb-1">요약 (카드 노출)</label>
                          <textarea
                            rows={2}
                            value={editingProjectData.summary}
                            onChange={e => setEditingProjectData({ ...editingProjectData, summary: e.target.value })}
                            className="w-full p-2.5 rounded border border-zinc-300"
                          />
                        </div>
                      </div>

                      {/* 9-Step Sections Preview & Edit */}
                      <div className="bg-white p-5 rounded-xl border border-zinc-200 space-y-4">
                        <span className="font-semibold text-zinc-900 uppercase font-mono block">9단계 표준 템플릿 상세 내용</span>

                        <div className="space-y-3">
                          <div>
                            <label className="font-mono text-zinc-600 font-semibold block mb-1">02. BACKGROUND (필요성/배경)</label>
                            <textarea
                              rows={2}
                              value={editingProjectData.background}
                              onChange={e => setEditingProjectData({ ...editingProjectData, background: e.target.value })}
                              className="w-full p-2.5 rounded border border-zinc-300"
                            />
                          </div>

                          <div>
                            <label className="font-mono text-zinc-600 font-semibold block mb-1">05. PLANNING (서비스 구조)</label>
                            <textarea
                              rows={2}
                              value={editingProjectData.planning.serviceStructure}
                              onChange={e => setEditingProjectData({
                                ...editingProjectData,
                                planning: { ...editingProjectData.planning, serviceStructure: e.target.value }
                              })}
                              className="w-full p-2.5 rounded border border-zinc-300"
                            />
                          </div>

                          <div>
                            <label className="font-mono text-zinc-600 font-semibold block mb-1">06. UI/UX (와이어프레임 & 화면 기획)</label>
                            <textarea
                              rows={2}
                              value={editingProjectData.uiux.screenPlanning}
                              onChange={e => setEditingProjectData({
                                ...editingProjectData,
                                uiux: { ...editingProjectData.uiux, screenPlanning: e.target.value }
                              })}
                              className="w-full p-2.5 rounded border border-zinc-300"
                            />
                          </div>

                          <div>
                            <label className="font-mono text-emerald-700 font-bold block mb-1">09. MY ROLE (기획자로서 정확히 무엇을 했는가?)</label>
                            <input
                              type="text"
                              value={editingProjectData.myRole.primary}
                              onChange={e => setEditingProjectData({
                                ...editingProjectData,
                                myRole: { ...editingProjectData.myRole, primary: e.target.value }
                              })}
                              className="w-full px-2.5 py-1.5 rounded border border-zinc-300 mb-2"
                              placeholder="주요 역할 타이틀"
                            />
                            <textarea
                              rows={2}
                              value={editingProjectData.myRole.keyTakeaway}
                              onChange={e => setEditingProjectData({
                                ...editingProjectData,
                                myRole: { ...editingProjectData.myRole, keyTakeaway: e.target.value }
                              })}
                              className="w-full p-2.5 rounded border border-zinc-300"
                              placeholder="Key Takeaway (기획자로서의 인사이트)"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Competencies */}
              {activeTab === 'competencies' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-zinc-200">
                    <h3 className="text-sm font-semibold text-zinc-900">
                      역량(What I Do) 구분
                    </h3>
                    <p className="text-xs text-zinc-500">
                      01·02 Main Core(핵심)와 03·04 Supporting(서브 역량) 설명을 점검합니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {data.competencies.map(c => (
                      <div key={c.id} className="p-4 bg-white rounded-xl border border-zinc-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-900">{c.number}. {c.title}</span>
                          <span className="font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[10px]">
                            {c.badge}
                          </span>
                        </div>
                        <p className="text-zinc-600 leading-relaxed">{c.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {c.tags.map((t, idx) => (
                            <span key={idx} className="bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 rounded text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Security & Password */}
              {activeTab === 'security' && (
                <div className="space-y-6 max-w-lg">
                  <div className="pb-3 border-b border-zinc-200">
                    <h3 className="text-sm font-semibold text-zinc-900">
                      어드민 비밀번호 변경
                    </h3>
                    <p className="text-xs text-zinc-500">
                      관리자 모달 접근 비밀번호를 안전하게 변경할 수 있습니다.
                    </p>
                  </div>

                  <form onSubmit={handlePasswordChange} className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-mono text-zinc-500 uppercase">새 비밀번호 (4자리 이상)</label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="새 비밀번호 입력..."
                        className="w-full px-3 py-2 rounded border border-zinc-300 bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 px-4 py-2 rounded shadow-xs"
                    >
                      비밀번호 변경 적용
                    </button>

                    {passwordSuccess && (
                      <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">
                        {passwordSuccess}
                      </div>
                    )}
                  </form>

                  <div className="pt-6 border-t border-zinc-200 space-y-3">
                    <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
                      데이터 원상복구 (Reset)
                    </h4>
                    <p className="text-xs text-zinc-600">
                      테스트 중 수정된 내용을 모두 초기 포트폴리오 원본 데이터로 되돌립니다.
                    </p>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded border border-red-200 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      초기 원본 데이터로 전체 복원
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Footer toast */}
            {saveToast && (
              <div className="bg-emerald-600 text-white text-xs px-4 py-2 flex items-center justify-between animate-in slide-in-from-bottom">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>변경사항이 안전하게 저장되었습니다 (브라우저 로컬 저장소 동기화 완료).</span>
                </div>
              </div>
            )}

            {/* Footer buttons */}
            <div className="bg-white px-6 py-3.5 border-t border-zinc-200 flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-mono">
                Koen CMS Engine v1.0
              </span>
              <button
                onClick={closeAdminModal}
                className="font-medium text-zinc-700 hover:text-zinc-950 px-3 py-1.5 rounded hover:bg-zinc-100"
              >
                닫기
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
