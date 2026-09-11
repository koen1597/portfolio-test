export interface ProjectOverview {
  project: string;
  company: string;
  duration: string;
  role: string;
  platform: string;
  team: string;
}

export interface ProjectArtifact {
  id: string;
  type: 'wireframe' | 'flowchart' | 'before-after' | 'architecture' | 'release-ui' | 'document';
  title: string;
  description: string;
  imageUrl?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  beforeCaption?: string;
  afterCaption?: string;
  tag?: string;
  keyInsight?: string;
}

export type WorkArtifact = ProjectArtifact;

export interface ProjectRetrospective {
  title?: string;
  mistakeOrChallenge: string;
  rootCause: string;
  howSolved: string;
  lessonLearned: string;
  beforeAfterComparison?: {
    beforeText: string;
    afterText: string;
    beforeImage?: string;
    afterImage?: string;
  };
}

export interface ExternalLink {
  label: string;
  url: string;
  type: 'figma' | 'notion' | 'pdf' | 'github' | 'live' | 'other';
  note?: string;
}

export type ProjectExternalLink = ExternalLink;

export interface ProjectCaseStudy {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string[];
  period: string;
  thumbnailUrl?: string;
  metric?: string;
  metricLabel?: string;
  summary: string;
  
  // Visual Artifacts & Troubleshooting Retrospective
  artifacts?: ProjectArtifact[];
  retrospective?: ProjectRetrospective;
  externalLinks?: ExternalLink[];
  
  // 9-step standardized template
  overview: ProjectOverview;
  background: string;
  problem: string[];
  approach: string[];
  planning: {
    serviceStructure: string;
    userFlow: string;
    informationArchitecture: string;
    details?: string[];
  };
  uiux: {
    wireframeNotes: string;
    screenPlanning: string;
    interaction: string;
    highlights?: string[];
  };
  collaboration: {
    designer: string;
    developer: string;
    marketing: string;
    operations: string;
  };
  result: {
    summary: string;
    metrics: { label: string; value: string; desc?: string }[];
    impact: string[];
  };
  myRole: {
    primary: string;
    responsibilities: string[];
    keyTakeaway: string;
  };
}

export interface CompetencyItem {
  id: string;
  number: string;
  title: string;
  badge: 'My Core' | 'My Strength' | 'Previous Experience';
  description: string;
  tags: string[];
}

export interface LifecyclePhase {
  stage: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  role: string;
  summary: string;
  responsibilities: string[];
  tags: string[];
}

export interface ProfileData {
  name: string;
  roleTitle: string;
  heroQuote: string;
  heroSubquote: string;
  experienceYears: string;
  coreBadges: string[];
  aboutIntro: string;
  aboutPhilosophy: string;
  aboutCollaboration: string;
  backgroundOrigin: string;
  languages: { lang: string; level: string }[];
  email: string;
  phone?: string;
  location?: string;
  mbti?: string;
  photoUrl?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface HowIWorkStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface PortfolioData {
  profile: ProfileData;
  competencies: CompetencyItem[];
  lifecycle: LifecyclePhase[];
  experiences: ExperienceItem[];
  projects: ProjectCaseStudy[];
  howIWork: HowIWorkStep[];
}

export type Language = 'ko' | 'en';
