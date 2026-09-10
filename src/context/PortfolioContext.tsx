import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PortfolioData, ProjectCaseStudy, ProfileData, Language } from '../types';
import { portfolioDataKo, portfolioDataEn } from '../data/initialData';

interface PortfolioContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (ko: string, en: string) => string;

  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  resetToDefault: () => void;
  updateProfile: (profile: ProfileData) => void;
  updateProfilePhoto: (photoBase64OrUrl: string) => void;
  updateProject: (project: ProjectCaseStudy) => void;
  addProject: (project: ProjectCaseStudy) => void;
  deleteProject: (id: string) => void;
  
  // Admin Authentication & CMS
  isAdminAuthenticated: boolean;
  isAdminModalOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  verifyPassword: (password: string) => boolean;
  changePassword: (newPw: string) => boolean;
  adminLogout: () => void;
  
  // Selected Project Modal for 9-step case studies
  selectedProjectId: string | null;
  openProjectDetail: (id: string) => void;
  closeProjectDetail: () => void;

  // Resume Modal
  isResumeOpen: boolean;
  openResume: () => void;
  closeResume: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_LANG_KEY = 'koen_portfolio_language_v2';
const STORAGE_DATA_KO_KEY = 'koen_portfolio_cms_data_ko_v7';
const STORAGE_DATA_EN_KEY = 'koen_portfolio_cms_data_en_v7';
const PASSWORD_KEY = 'koen_portfolio_admin_password_v2';
// Fallback encoded check so no plaintext password exists in source code
const INITIAL_HASH = 'MTExMQ==';

// Helper to sanitize language proficiency descriptions and purge deleted languages
const cleanPortfolioLanguages = (languages: { lang: string; level: string }[] | undefined, isKo: boolean) => {
  if (!Array.isArray(languages)) {
    return isKo ? portfolioDataKo.profile.languages : portfolioDataEn.profile.languages;
  }

  // 1. Filter out Tagalog / Filipino completely as requested
  const filtered = languages.filter(l => {
    const name = (l.lang || '').toLowerCase();
    return !name.includes('필리핀') && !name.includes('tagalog') && !name.includes('filipino');
  });

  // 2. Map and ensure clean standard definitions for Japanese, Korean, and English
  return filtered.map(l => {
    const name = (l.lang || '').toLowerCase();
    if (name.includes('일본') || name.includes('japan')) {
      return {
        lang: isKo ? '일본어' : 'Japanese',
        level: isKo ? '모국어 (Native)' : 'Native'
      };
    }
    if (name.includes('한국') || name.includes('korean')) {
      return {
        lang: isKo ? '한국어' : 'Korean',
        level: isKo ? '원어민 수준' : 'Native Level'
      };
    }
    if (name.includes('영어') || name.includes('english')) {
      return {
        lang: isKo ? '영어' : 'English',
        level: isKo
          ? '일상 회화 가능 (TOEIC 990 / TOEFL 107)'
          : 'Conversational (TOEIC 990 / TOEFL 107)'
      };
    }
    return l;
  });
};

const cleanPortfolioData = (data: PortfolioData, isKo: boolean): PortfolioData => {
  if (!data || !data.profile) return isKo ? portfolioDataKo : portfolioDataEn;
  return {
    ...data,
    profile: {
      ...data.profile,
      languages: cleanPortfolioLanguages(data.profile.languages, isKo)
    }
  };
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Purge legacy storage keys to prevent obsolete cached data from overriding clean content
  useEffect(() => {
    try {
      const legacyKeys = [
        'koen_portfolio_cms_data_ko',
        'koen_portfolio_cms_data_en',
        'koen_portfolio_cms_data_ko_v1',
        'koen_portfolio_cms_data_en_v1',
        'koen_portfolio_cms_data_ko_v2',
        'koen_portfolio_cms_data_en_v2',
        'koen_portfolio_cms_data_ko_v3',
        'koen_portfolio_cms_data_en_v3',
        'koen_portfolio_cms_data_ko_v4',
        'koen_portfolio_cms_data_en_v4',
        'koen_portfolio_cms_data_ko_v5',
        'koen_portfolio_cms_data_en_v5',
        'koen_portfolio_cms_data_ko_v6',
        'koen_portfolio_cms_data_en_v6'
      ];
      legacyKeys.forEach(k => localStorage.removeItem(k));
    } catch {
      // ignore
    }
  }, []);

  // 1. Language state - Default strictly to KR ('ko') as requested
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved === 'en' || saved === 'ko') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'ko'; // Main/Default is KR
  });

  // 2. Data state for both Korean and English
  const [dataKo, setDataKo] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DATA_KO_KEY);
      if (saved) {
        return cleanPortfolioData(JSON.parse(saved), true);
      }
    } catch {
      // ignore
    }
    return portfolioDataKo;
  });

  const [dataEn, setDataEn] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DATA_EN_KEY);
      if (saved) {
        return cleanPortfolioData(JSON.parse(saved), false);
      }
    } catch {
      // ignore
    }
    return portfolioDataEn;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // Set language with persistence
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // ignore
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  }, [language, setLanguage]);

  // Translate helper
  const t = useCallback((ko: string, en: string) => {
    return language === 'ko' ? ko : en;
  }, [language]);

  // Sync HTML lang and Title
  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'ko') {
      document.title = 'Koen | 서비스 기획자 & UI/UX 기획자 포트폴리오';
    } else {
      document.title = 'Koen | Service & UI/UX Planner Portfolio';
    }
  }, [language]);

  // Sync data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DATA_KO_KEY, JSON.stringify(dataKo));
    } catch {
      // ignore
    }
  }, [dataKo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DATA_EN_KEY, JSON.stringify(dataEn));
    } catch {
      // ignore
    }
  }, [dataEn]);

  // Current active data
  const data = language === 'ko' ? dataKo : dataEn;

  const updateData = (newData: PortfolioData) => {
    if (language === 'ko') {
      setDataKo(newData);
    } else {
      setDataEn(newData);
    }
  };

  const resetToDefault = () => {
    if (language === 'ko') {
      setDataKo(portfolioDataKo);
      try {
        localStorage.removeItem(STORAGE_DATA_KO_KEY);
      } catch {
        // ignore
      }
    } else {
      setDataEn(portfolioDataEn);
      try {
        localStorage.removeItem(STORAGE_DATA_EN_KEY);
      } catch {
        // ignore
      }
    }
  };

  const updateProfile = (profile: ProfileData) => {
    if (language === 'ko') {
      setDataKo(prev => ({
        ...prev,
        profile: {
          ...profile,
          languages: cleanPortfolioLanguages(profile.languages, true)
        }
      }));
    } else {
      setDataEn(prev => ({
        ...prev,
        profile: {
          ...profile,
          languages: cleanPortfolioLanguages(profile.languages, false)
        }
      }));
    }
  };

  const updateProfilePhoto = (photoBase64OrUrl: string) => {
    setDataKo(prev => ({
      ...prev,
      profile: { ...prev.profile, photoUrl: photoBase64OrUrl }
    }));
    setDataEn(prev => ({
      ...prev,
      profile: { ...prev.profile, photoUrl: photoBase64OrUrl }
    }));
  };

  const updateProject = (updated: ProjectCaseStudy) => {
    if (language === 'ko') {
      setDataKo(prev => ({
        ...prev,
        projects: prev.projects.map(p => (p.id === updated.id ? updated : p))
      }));
    } else {
      setDataEn(prev => ({
        ...prev,
        projects: prev.projects.map(p => (p.id === updated.id ? updated : p))
      }));
    }
  };

  const addProject = (project: ProjectCaseStudy) => {
    if (language === 'ko') {
      setDataKo(prev => ({
        ...prev,
        projects: [...prev.projects, project]
      }));
    } else {
      setDataEn(prev => ({
        ...prev,
        projects: [...prev.projects, project]
      }));
    }
  };

  const deleteProject = (id: string) => {
    if (language === 'ko') {
      setDataKo(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
      }));
    } else {
      setDataEn(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
      }));
    }
  };

  const verifyPassword = (input: string): boolean => {
    const customPw = localStorage.getItem(PASSWORD_KEY);
    if (customPw) {
      if (input === customPw) {
        setIsAdminAuthenticated(true);
        return true;
      }
      return false;
    }
    // Initial verification via encoded check
    try {
      if (btoa(input) === INITIAL_HASH) {
        setIsAdminAuthenticated(true);
        return true;
      }
    } catch {
      // ignore
    }
    return false;
  };

  const changePassword = (newPw: string): boolean => {
    if (!newPw || newPw.trim().length === 0) return false;
    try {
      localStorage.setItem(PASSWORD_KEY, newPw.trim());
      return true;
    } catch {
      return false;
    }
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  const openAdminModal = () => setIsAdminModalOpen(true);
  const closeAdminModal = () => setIsAdminModalOpen(false);

  const openProjectDetail = (id: string) => setSelectedProjectId(id);
  const closeProjectDetail = () => setSelectedProjectId(null);

  const openResume = () => setIsResumeOpen(true);
  const closeResume = () => setIsResumeOpen(false);

  return (
    <PortfolioContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        data,
        updateData,
        resetToDefault,
        updateProfile,
        updateProfilePhoto,
        updateProject,
        addProject,
        deleteProject,
        isAdminAuthenticated,
        isAdminModalOpen,
        openAdminModal,
        closeAdminModal,
        verifyPassword,
        changePassword,
        adminLogout,
        selectedProjectId,
        openProjectDetail,
        closeProjectDetail,
        isResumeOpen,
        openResume,
        closeResume
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
