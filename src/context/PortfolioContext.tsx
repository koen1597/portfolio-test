import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { PortfolioData, ProjectCaseStudy, ProfileData, Language } from '../types';
import { portfolioDataKo, portfolioDataEn } from '../data/initialData';
import { db } from '../lib/firebase';
import { doc, onSnapshot, setDoc, getDocFromServer } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreError';
import { compressImage } from '../lib/imageCompressor';
import {
  extractAndUploadAllMedia,
  preloadAllReferencedMedia,
  isMediaRef,
  getMediaIdFromRef,
  getMediaFromLocalCache
} from '../lib/mediaStorage';

interface PortfolioContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (ko: string, en: string) => string;

  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  resetToDefault: () => Promise<void>;
  updateProfile: (profile: ProfileData) => void;
  updateProfilePhoto: (photoBase64OrUrl: string) => void;
  updateProject: (project: ProjectCaseStudy) => void;
  addProject: (project: ProjectCaseStudy) => void;
  deleteProject: (id: string) => void;

  // Direct Async Save & Sync methods (Prevents React state delay & guarantees instant Firestore upload)
  saveProfile: (profile: ProfileData) => Promise<boolean>;
  saveProject: (project: ProjectCaseStudy) => Promise<boolean>;
  addNewProject: (project: ProjectCaseStudy) => Promise<boolean>;
  removeProject: (id: string) => Promise<boolean>;

  // Cloud Sync Status
  isSyncing: boolean;
  lastSyncedAt: Date | null;
  publishToCloud: (overrideKo?: PortfolioData, overrideEn?: PortfolioData) => Promise<boolean>;

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
const STORAGE_DATA_KO_KEY = 'koen_portfolio_cms_data_ko_v15';
const STORAGE_DATA_EN_KEY = 'koen_portfolio_cms_data_en_v15';
const STORAGE_PHOTO_KEY = 'koen_portfolio_custom_photo';
const PASSWORD_KEY = 'koen_portfolio_admin_password_v2';
// Fallback encoded check so no plaintext password exists in source code
const INITIAL_HASH = 'MTExMQ==';

// Helper to sanitize language proficiency descriptions and purge deleted languages
const cleanPortfolioLanguages = (languages: { lang: string; level: string }[] | undefined, isKo: boolean) => {
  if (!Array.isArray(languages)) {
    return isKo ? portfolioDataKo.profile.languages : portfolioDataEn.profile.languages;
  }

  // 1. Filter out Tagalog / Filipino completely
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
  const fallback = isKo ? portfolioDataKo : portfolioDataEn;
  if (!data || !data.profile) return fallback;

  // Automatically migrate legacy backgroundOrigin if it's the old default
  const legacyOrigins = [
    '일본 출생 · 다문화 성장 (서울 거주 / 도쿄 소통)',
    'Born in Japan · Global Growth (Seoul / Tokyo)'
  ];
  const origin = (!data.profile.backgroundOrigin || legacyOrigins.includes(data.profile.backgroundOrigin))
    ? fallback.profile.backgroundOrigin
    : data.profile.backgroundOrigin;

  // Sanitize obsolete placeholders
  const expYears = (data.profile.experienceYears && (
    data.profile.experienceYears.includes('11년') ||
    data.profile.experienceYears.includes('11+') ||
    data.profile.experienceYears.includes('시니어') ||
    data.profile.experienceYears.includes('Senior')
  ))
    ? fallback.profile.experienceYears
    : (data.profile.experienceYears || fallback.profile.experienceYears);

  const heroSub = (data.profile.heroSubquote && (data.profile.heroSubquote.includes('11년') || data.profile.heroSubquote.includes('11+')))
    ? fallback.profile.heroSubquote
    : (data.profile.heroSubquote || fallback.profile.heroSubquote);

  // Enforce latest projects and strictly purge obsolete NAMBA or outdated case studies
  const cleanedProjects = fallback.projects.map(fallbackProj => {
    const existing = (data.projects || []).find(p => p.id === fallbackProj.id);
    if (!existing) return fallbackProj;

    const existingStr = JSON.stringify(existing);
    if (
      existingStr.includes('남바') ||
      existingStr.includes('NAMBA') ||
      existingStr.includes('골드 번호판') ||
      existingStr.includes('특수/골드') ||
      existingStr.includes('gold vehicle license')
    ) {
      return fallbackProj;
    }

    const isBadThumb = existing.thumbnailUrl && (existing.thumbnailUrl.includes('unsplash') || existing.thumbnailUrl.includes('_showcase.svg'));
    const isBadArtifact = (url?: string) => url && (url.includes('unsplash') || url.includes('_showcase.svg'));

    return {
      ...fallbackProj,
      ...existing,
      thumbnailUrl: isBadThumb ? '' : (existing.thumbnailUrl || ''),
      artifacts: (existing.artifacts && existing.artifacts.length > 0)
        ? existing.artifacts.map(a => ({
            ...a,
            imageUrl: isBadArtifact(a.imageUrl) ? '' : (a.imageUrl || '')
          }))
        : fallbackProj.artifacts,
      retrospective: existing.retrospective || fallbackProj.retrospective,
      externalLinks: existing.externalLinks || fallbackProj.externalLinks
    };
  });

  // Also preserve any newly added custom projects
  const additionalProjects = (data.projects || []).filter(
    p => !fallback.projects.some(fp => fp.id === p.id)
  );
  const allCleanedProjects = [...cleanedProjects, ...additionalProjects];

  // Experiences check: if existing has obsolete data, replace with fallback.experiences
  const hasStaleExp = !data.experiences || data.experiences.some(e => {
    const s = JSON.stringify(e);
    return s.includes('남바') || s.includes('NAMBA') || s.includes('골드 번호판');
  });
  const cleanedExperiences = hasStaleExp ? fallback.experiences : data.experiences;

  let customPhoto = '';
  try {
    customPhoto = localStorage.getItem(STORAGE_PHOTO_KEY) || '';
  } catch {
    // ignore
  }

  const isBadPhoto = (url?: string) => !url || url === '/profile.png' || url === '/profile.jpg';
  const resolvedPhoto = !isBadPhoto(data.profile.photoUrl)
    ? data.profile.photoUrl
    : (!isBadPhoto(customPhoto) ? customPhoto : '');

  return {
    ...data,
    profile: {
      ...data.profile,
      backgroundOrigin: origin,
      experienceYears: expYears,
      heroSubquote: heroSub,
      photoUrl: resolvedPhoto,
      languages: cleanPortfolioLanguages(data.profile.languages, isKo)
    },
    experiences: cleanedExperiences,
    projects: allCleanedProjects,
    competencies: fallback.competencies,
    lifecycle: fallback.lifecycle,
    howIWork: fallback.howIWork
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
        'koen_portfolio_cms_data_en_v6',
        'koen_portfolio_cms_data_ko_v7',
        'koen_portfolio_cms_data_en_v7',
        'koen_portfolio_cms_data_ko_v8',
        'koen_portfolio_cms_data_en_v8',
        'koen_portfolio_cms_data_ko_v9',
        'koen_portfolio_cms_data_en_v9',
        'koen_portfolio_cms_data_ko_v10',
        'koen_portfolio_cms_data_en_v10',
        'koen_portfolio_cms_data_ko_v11',
        'koen_portfolio_cms_data_en_v11',
        'koen_portfolio_cms_data_ko_v12',
        'koen_portfolio_cms_data_en_v12',
        'koen_portfolio_cms_data_ko_v13',
        'koen_portfolio_cms_data_en_v13'
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
    return cleanPortfolioData(portfolioDataKo, true);
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
    return cleanPortfolioData(portfolioDataEn, false);
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // Dedicated media cache to store image data URLs separately from main portfolio documents
  const [mediaCache, setMediaCache] = useState<Record<string, string>>({});

  // Preload any referenced media documents from 'portfolio_media'
  useEffect(() => {
    preloadAllReferencedMedia(dataKo, (id, dataUrl) => {
      setMediaCache(prev => (prev[id] === dataUrl ? prev : { ...prev, [id]: dataUrl }));
    });
    preloadAllReferencedMedia(dataEn, (id, dataUrl) => {
      setMediaCache(prev => (prev[id] === dataUrl ? prev : { ...prev, [id]: dataUrl }));
    });
  }, [dataKo, dataEn]);

  // Auto-migrate any existing embedded base64 images from projects into dedicated documents
  useEffect(() => {
    async function autoMigrateExistingMedia() {
      const koStr = JSON.stringify(dataKo);
      const enStr = JSON.stringify(dataEn);
      if (koStr.includes('data:image') || enStr.includes('data:image')) {
        try {
          const sanitizedKo = await extractAndUploadAllMedia(dataKo);
          const sanitizedEn = await extractAndUploadAllMedia(dataEn);
          setDataKo(sanitizedKo);
          setDataEn(sanitizedEn);
          await Promise.all([
            setDoc(doc(db, 'portfolio', 'ko'), { ...sanitizedKo, language: 'ko', updatedAt: new Date().toISOString() }),
            setDoc(doc(db, 'portfolio', 'en'), { ...sanitizedEn, language: 'en', updatedAt: new Date().toISOString() })
          ]);
        } catch (e) {
          console.warn('Auto media migration deferred:', e);
        }
      }
    }
    autoMigrateExistingMedia();
  }, []);

  // Validate Firestore Connection and ensure fresh seed on boot
  useEffect(() => {
    async function initConnection() {
      // Test Firestore connection
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error('Please check your Firebase configuration.');
        }
      }
    }
    initConnection();
  }, []);

  // Real-time Firestore synchronization for Netlify visitors & multi-device
  useEffect(() => {
    // Listen to Korean document
    const unsubKo = onSnapshot(doc(db, 'portfolio', 'ko'), (docSnap) => {
      if (docSnap.exists()) {
        const cloudData = docSnap.data();
        if (cloudData && cloudData.profile) {
          const cleaned = cleanPortfolioData(cloudData as PortfolioData, true);
          setDataKo(cleaned);
          try {
            localStorage.setItem(STORAGE_DATA_KO_KEY, JSON.stringify(cleaned));
          } catch {
            // ignore
          }
          const rawStr = JSON.stringify(cloudData);
          if (rawStr.includes('남바') || rawStr.includes('NAMBA')) {
            setDoc(doc(db, 'portfolio', 'ko'), {
              ...cleaned,
              language: 'ko',
              updatedAt: new Date().toISOString()
            }).catch(() => {});
          }
          setLastSyncedAt(new Date());
        }
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'portfolio/ko');
    });

    // Listen to English document
    const unsubEn = onSnapshot(doc(db, 'portfolio', 'en'), (docSnap) => {
      if (docSnap.exists()) {
        const cloudData = docSnap.data();
        if (cloudData && cloudData.profile) {
          const cleaned = cleanPortfolioData(cloudData as PortfolioData, false);
          setDataEn(cleaned);
          try {
            localStorage.setItem(STORAGE_DATA_EN_KEY, JSON.stringify(cleaned));
          } catch {
            // ignore
          }
          const rawStr = JSON.stringify(cloudData);
          if (rawStr.includes('NAMBA') || rawStr.includes('남바')) {
            setDoc(doc(db, 'portfolio', 'en'), {
              ...cleaned,
              language: 'en',
              updatedAt: new Date().toISOString()
            }).catch(() => {});
          }
          setLastSyncedAt(new Date());
        }
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'portfolio/en');
    });

    return () => {
      unsubKo();
      unsubEn();
    };
  }, []);

  // Publish active content directly to Firestore Cloud DB (Full sync)
  const publishToCloud = useCallback(async (overrideKo?: PortfolioData, overrideEn?: PortfolioData): Promise<boolean> => {
    setIsSyncing(true);
    try {
      const koDocRef = doc(db, 'portfolio', 'ko');
      const enDocRef = doc(db, 'portfolio', 'en');

      const dataToSaveKo = overrideKo || dataKo;
      const dataToSaveEn = overrideEn || dataEn;

      const sanitizedKo = await extractAndUploadAllMedia(dataToSaveKo);
      const sanitizedEn = await extractAndUploadAllMedia(dataToSaveEn);

      await Promise.all([
        setDoc(koDocRef, {
          ...sanitizedKo,
          language: 'ko',
          updatedAt: new Date().toISOString()
        }),
        setDoc(enDocRef, {
          ...sanitizedEn,
          language: 'en',
          updatedAt: new Date().toISOString()
        })
      ]);

      setLastSyncedAt(new Date());
      setIsSyncing(false);
      return true;
    } catch (err: any) {
      console.error('publishToCloud error:', err);
      handleFirestoreError(err, OperationType.WRITE, 'portfolio');
      setIsSyncing(false);
      return false;
    }
  }, [dataKo, dataEn]);

  // Robust Direct Save & Sync Profile (fixes async state delay bug)
  const saveProfile = useCallback(async (profile: ProfileData): Promise<boolean> => {
    setIsSyncing(true);
    const cleanedKoLanguages = cleanPortfolioLanguages(profile.languages, true);
    const cleanedEnLanguages = cleanPortfolioLanguages(profile.languages, false);
    
    // Ensure photoUrl is compressed to <60KB if base64 data to guarantee Firestore 1MB quota
    let newPhoto = profile.photoUrl !== undefined ? profile.photoUrl : (dataKo.profile.photoUrl || '');
    if (newPhoto === '/profile.png' || newPhoto === '/profile.jpg') newPhoto = '';
    if (newPhoto && newPhoto.startsWith('data:image')) {
      try {
        newPhoto = await compressImage(newPhoto, 500, 0.75);
      } catch {
        // fallback
      }
    }

    const newKo: PortfolioData = {
      ...dataKo,
      profile: {
        ...(language === 'ko' ? profile : dataKo.profile),
        photoUrl: newPhoto,
        languages: language === 'ko' ? cleanedKoLanguages : dataKo.profile.languages
      }
    };

    const newEn: PortfolioData = {
      ...dataEn,
      profile: {
        ...(language === 'en' ? profile : dataEn.profile),
        photoUrl: newPhoto,
        languages: language === 'en' ? cleanedEnLanguages : dataEn.profile.languages
      }
    };

    try {
      const sanitizedKo = await extractAndUploadAllMedia(newKo);
      const sanitizedEn = await extractAndUploadAllMedia(newEn);

      setDataKo(sanitizedKo);
      setDataEn(sanitizedEn);
      try {
        localStorage.setItem(STORAGE_DATA_KO_KEY, JSON.stringify(sanitizedKo));
        localStorage.setItem(STORAGE_DATA_EN_KEY, JSON.stringify(sanitizedEn));
        if (newPhoto && newPhoto !== '/profile.png' && newPhoto !== '/profile.jpg') {
          localStorage.setItem(STORAGE_PHOTO_KEY, newPhoto);
        } else {
          localStorage.removeItem(STORAGE_PHOTO_KEY);
        }
      } catch {
        // ignore
      }

      const koDocRef = doc(db, 'portfolio', 'ko');
      const enDocRef = doc(db, 'portfolio', 'en');

      await Promise.all([
        setDoc(koDocRef, {
          ...sanitizedKo,
          language: 'ko',
          updatedAt: new Date().toISOString()
        }),
        setDoc(enDocRef, {
          ...sanitizedEn,
          language: 'en',
          updatedAt: new Date().toISOString()
        })
      ]);

      setLastSyncedAt(new Date());
      setIsSyncing(false);
      return true;
    } catch (err: any) {
      console.error('saveProfile Firestore write failed:', err);
      handleFirestoreError(err, OperationType.WRITE, 'portfolio');
      setIsSyncing(false);
      throw err;
    }
  }, [dataKo, dataEn, language]);

  // Robust Direct Save & Sync Project (fixes async state delay bug)
  const saveProject = useCallback(async (updatedProject: ProjectCaseStudy): Promise<boolean> => {
    setIsSyncing(true);
    let newKo: PortfolioData;
    let newEn: PortfolioData;

    if (language === 'ko') {
      newKo = {
        ...dataKo,
        projects: dataKo.projects.map(p => (p.id === updatedProject.id ? updatedProject : p))
      };
      newEn = {
        ...dataEn,
        projects: dataEn.projects.map(p => {
          if (p.id === updatedProject.id) {
            return {
              ...p,
              thumbnailUrl: updatedProject.thumbnailUrl !== undefined ? updatedProject.thumbnailUrl : p.thumbnailUrl,
              artifacts: updatedProject.artifacts ? updatedProject.artifacts.map((a, i) => ({
                ...(p.artifacts?.[i] || a),
                imageUrl: a.imageUrl,
                type: a.type
              })) : p.artifacts
            };
          }
          return p;
        })
      };
    } else {
      newEn = {
        ...dataEn,
        projects: dataEn.projects.map(p => (p.id === updatedProject.id ? updatedProject : p))
      };
      newKo = {
        ...dataKo,
        projects: dataKo.projects.map(p => {
          if (p.id === updatedProject.id) {
            return {
              ...p,
              thumbnailUrl: updatedProject.thumbnailUrl !== undefined ? updatedProject.thumbnailUrl : p.thumbnailUrl,
              artifacts: updatedProject.artifacts ? updatedProject.artifacts.map((a, i) => ({
                ...(p.artifacts?.[i] || a),
                imageUrl: a.imageUrl,
                type: a.type
              })) : p.artifacts
            };
          }
          return p;
        })
      };
    }

    try {
      // 1. Extract any base64 images into separate documents in 'portfolio_media'
      // Each image gets its own full 1MB quota and never bloats the main portfolio document!
      const sanitizedKo = await extractAndUploadAllMedia(newKo);
      const sanitizedEn = await extractAndUploadAllMedia(newEn);

      setDataKo(sanitizedKo);
      setDataEn(sanitizedEn);
      try {
        localStorage.setItem(STORAGE_DATA_KO_KEY, JSON.stringify(sanitizedKo));
        localStorage.setItem(STORAGE_DATA_EN_KEY, JSON.stringify(sanitizedEn));
      } catch {
        // ignore
      }

      // 2. Persist sanitized, lightweight documents (~30KB) to Firestore
      const koDocRef = doc(db, 'portfolio', 'ko');
      const enDocRef = doc(db, 'portfolio', 'en');

      await Promise.all([
        setDoc(koDocRef, {
          ...sanitizedKo,
          language: 'ko',
          updatedAt: new Date().toISOString()
        }),
        setDoc(enDocRef, {
          ...sanitizedEn,
          language: 'en',
          updatedAt: new Date().toISOString()
        })
      ]);

      setLastSyncedAt(new Date());
      setIsSyncing(false);
      return true;
    } catch (err: any) {
      console.error('saveProject Firestore write failed:', err);
      handleFirestoreError(err, OperationType.WRITE, 'portfolio');
      setIsSyncing(false);
      return false;
    }
  }, [dataKo, dataEn, language]);

  // Robust Add Project & Sync
  const addNewProject = useCallback(async (project: ProjectCaseStudy): Promise<boolean> => {
    setIsSyncing(true);
    const newKo: PortfolioData = {
      ...dataKo,
      projects: [...dataKo.projects, project]
    };
    const newEn: PortfolioData = {
      ...dataEn,
      projects: [...dataEn.projects, project]
    };

    try {
      const sanitizedKo = await extractAndUploadAllMedia(newKo);
      const sanitizedEn = await extractAndUploadAllMedia(newEn);

      setDataKo(sanitizedKo);
      setDataEn(sanitizedEn);
      try {
        localStorage.setItem(STORAGE_DATA_KO_KEY, JSON.stringify(sanitizedKo));
        localStorage.setItem(STORAGE_DATA_EN_KEY, JSON.stringify(sanitizedEn));
      } catch {
        // ignore
      }

      await Promise.all([
        setDoc(doc(db, 'portfolio', 'ko'), { ...sanitizedKo, language: 'ko', updatedAt: new Date().toISOString() }),
        setDoc(doc(db, 'portfolio', 'en'), { ...sanitizedEn, language: 'en', updatedAt: new Date().toISOString() })
      ]);
      setLastSyncedAt(new Date());
      setIsSyncing(false);
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'portfolio');
      setIsSyncing(false);
      return false;
    }
  }, [dataKo, dataEn]);

  // Robust Remove Project & Sync
  const removeProject = useCallback(async (id: string): Promise<boolean> => {
    setIsSyncing(true);
    const newKo: PortfolioData = {
      ...dataKo,
      projects: dataKo.projects.filter(p => p.id !== id)
    };
    const newEn: PortfolioData = {
      ...dataEn,
      projects: dataEn.projects.filter(p => p.id !== id)
    };

    setDataKo(newKo);
    setDataEn(newEn);
    try {
      localStorage.setItem(STORAGE_DATA_KO_KEY, JSON.stringify(newKo));
      localStorage.setItem(STORAGE_DATA_EN_KEY, JSON.stringify(newEn));
    } catch {
      // ignore
    }

    try {
      await Promise.all([
        setDoc(doc(db, 'portfolio', 'ko'), { ...newKo, language: 'ko', updatedAt: new Date().toISOString() }),
        setDoc(doc(db, 'portfolio', 'en'), { ...newEn, language: 'en', updatedAt: new Date().toISOString() })
      ]);
      setLastSyncedAt(new Date());
      setIsSyncing(false);
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'portfolio');
      setIsSyncing(false);
      return false;
    }
  }, [dataKo, dataEn]);

  // Discreet keyboard shortcut (Ctrl+Shift+A / Cmd+Shift+A) & URL parameter (?admin=true) to open admin modal safely
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true') {
        setIsAdminModalOpen(true);
      }
    } catch {
      // ignore
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  // Current active data - photoUrl respects user custom upload across both languages
  const activeRaw = language === 'ko' ? dataKo : dataEn;
  const isBadPhotoStr = (url?: string) => !url || url === '/profile.png' || url === '/profile.jpg';
  const synchronizedPhoto = !isBadPhotoStr(dataKo.profile.photoUrl)
    ? dataKo.profile.photoUrl
    : (!isBadPhotoStr(dataEn.profile.photoUrl) ? dataEn.profile.photoUrl : '');

  const data: PortfolioData = useMemo(() => {
    const resolve = (url?: string): string => {
      if (!url) return '';
      if (isMediaRef(url)) {
        const id = getMediaIdFromRef(url);
        return mediaCache[id] || getMediaFromLocalCache(id) || '';
      }
      return url;
    };

    return {
      ...activeRaw,
      profile: {
        ...activeRaw.profile,
        photoUrl: resolve(synchronizedPhoto)
      },
      projects: (activeRaw.projects || []).map(p => ({
        ...p,
        thumbnailUrl: resolve(p.thumbnailUrl),
        artifacts: (p.artifacts || []).map(a => ({
          ...a,
          imageUrl: resolve(a.imageUrl)
        }))
      }))
    };
  }, [activeRaw, synchronizedPhoto, mediaCache]);

  const updateData = (newData: PortfolioData) => {
    if (language === 'ko') {
      setDataKo(newData);
    } else {
      setDataEn(newData);
    }
  };

  const resetToDefault = async () => {
    const freshKo = cleanPortfolioData(portfolioDataKo, true);
    const freshEn = cleanPortfolioData(portfolioDataEn, false);
    setDataKo(freshKo);
    setDataEn(freshEn);
    try {
      localStorage.setItem(STORAGE_DATA_KO_KEY, JSON.stringify(freshKo));
      localStorage.setItem(STORAGE_DATA_EN_KEY, JSON.stringify(freshEn));
    } catch {
      // ignore
    }
    try {
      await Promise.all([
        setDoc(doc(db, 'portfolio', 'ko'), { ...freshKo, language: 'ko', updatedAt: new Date().toISOString() }),
        setDoc(doc(db, 'portfolio', 'en'), { ...freshEn, language: 'en', updatedAt: new Date().toISOString() })
      ]);
      setLastSyncedAt(new Date());
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'portfolio');
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
    const cleanUrl = isBadPhotoStr(photoBase64OrUrl) ? '' : photoBase64OrUrl;
    try {
      if (cleanUrl) {
        localStorage.setItem(STORAGE_PHOTO_KEY, cleanUrl);
      } else {
        localStorage.removeItem(STORAGE_PHOTO_KEY);
      }
    } catch {
      // ignore
    }
    setDataKo(prev => ({
      ...prev,
      profile: { ...prev.profile, photoUrl: cleanUrl }
    }));
    setDataEn(prev => ({
      ...prev,
      profile: { ...prev.profile, photoUrl: cleanUrl }
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
    // Initial verification via encoded check (Default: 1111)
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
        saveProfile,
        saveProject,
        addNewProject,
        removeProject,
        isSyncing,
        lastSyncedAt,
        publishToCloud,
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
