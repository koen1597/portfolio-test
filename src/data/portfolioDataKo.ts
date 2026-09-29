import { PortfolioData } from '../types';

export const portfolioDataKo: PortfolioData = {
  profile: {
    name: "나카노 코엔 (Koen Nakano)",
    roleTitle: "서비스 기획자 · UI/UX 기획자",
    heroQuote: "비즈니스 모델과 운영 프로세스를 꿰뚫는 실행형 기획자",
    heroSubquote: "비즈니스 분석을 기반으로 웹·앱 서비스 기획, 백오피스 설계, 프로토타이핑 및 글로벌 운영을 실행합니다.",
    experienceYears: "서비스 기획자",
    phone: "010-7930-1597",
    email: "koen.nakano@gmail.com",
    location: "서울 관악구 봉천동 (Seoul / Tokyo)",
    mbti: "ENTJ-A",
    photoUrl: "",
    coreBadges: [
      "서비스 기획 (Service Planning)",
      "UI/UX 기획 & 화면설계",
      "어드민 / 백오피스 기획",
      "퍼블리싱 프로토타입 (HTML/CSS)",
      "서비스 운영 & VOC 관리",
      "글로벌 비즈니스 (KR / JA / EN)"
    ],
    aboutIntro: "일본 출생 및 다문화권에서 성장하며 유연한 환경 적응력을 길렀습니다. Google YouTube, iHerb 등 글로벌 기업에서의 고객 지원 및 운영 경험을 토대로, 비즈니스 실행력을 갖춘 서비스 기획 및 UI/UX 설계에 역량을 집중하고 있습니다.",
    aboutPhilosophy: "기획은 단순한 화면 그리기가 아닙니다. 비즈니스 모델, 백오피스 운영 동선, 개발팀의 구현 제약(HTML/CSS 마크업 및 데이터 통신)까지 사전에 명세화할 때 서비스가 안정적으로 작동합니다. 기술과 현장을 모두 이해하는 실무형 소통을 지향합니다.",
    aboutCollaboration: "ENTJ-A 성향으로 사안을 명확하고 투명하게 전달하며 신뢰를 쌓습니다. 기획, 디자인, 개발, 마케팅, 운영 간의 입장 차이를 조율하여 프로젝트를 정해진 일정 내에 완수합니다.",
    backgroundOrigin: "3년 이상 거주 국가 : 일본, 한국, 미국, 필리핀, 캐나다",
    languages: [
      { lang: "한국어", level: "원어민 수준" },
      { lang: "일본어", level: "모국어 (Native)" },
      { lang: "영어", level: "일상 회화 가능 (TOEIC 990 / TOEFL 107)" }
    ],
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com"
  },
  competencies: [
    {
      id: "comp-1",
      number: "01",
      title: "서비스 기획 & 백오피스 (Service Planning)",
      badge: "My Core",
      description: "비즈니스 모델과 운영 요구사항을 분석하여 명확한 요구사항 정의서(PRD), 정보구조(IA), 정책 정의서 및 백오피스 구조를 설계합니다.",
      tags: [
        "서비스 전략 (Strategy)",
        "요구사항 정의 (PRD)",
        "정보구조 (IA)",
        "비즈니스 정책 수립",
        "유저 플로우 (User Flow)",
        "어드민/백오피스 설계"
      ]
    },
    {
      id: "comp-2",
      number: "02",
      title: "UI/UX 기획 & 퍼블리싱 (UI/UX & Prototyping)",
      badge: "My Core",
      description: "Figma 기반의 스토리보드와 상태별(Edge case) 예외 처리를 꼼꼼하게 설계합니다. 필요 시 HTML/CSS 마크업 프로토타입으로 개발팀과 정밀하게 소통합니다.",
      tags: [
        "와이어프레임 (Wireframe)",
        "화면설계서 (Storyboard)",
        "HTML/CSS 퍼블리싱",
        "인터랙션 명세",
        "상태별 예외 처리 (Edge Case)",
        "Figma 컴포넌트화"
      ]
    },
    {
      id: "comp-3",
      number: "03",
      title: "서비스 운영 & VOC 관리 (Operations)",
      badge: "My Strength",
      description: "실제 고객 문의(VOC)와 운영 이슈를 구조적으로 분석하여, 서비스 개선 과제를 도출하고 운영 백오피스를 고도화합니다.",
      tags: [
        "운영 프로세스 최적화",
        "고객 피드백 & VOC 분석",
        "CS 품질 및 매뉴얼 구축",
        "이슈 트래킹 및 우선순위",
        "운영 백오피스 고도화"
      ]
    },
    {
      id: "comp-4",
      number: "04",
      title: "온보딩 퍼널 & 글로벌 프로덕트 (Product Growth)",
      badge: "My Strength",
      description: "사용자의 첫 진입 장벽을 낮추는 온보딩 퍼널을 설계하고, 다언어(한/일/영) 커뮤니케이션 역량을 바탕으로 글로벌 사용자 환경을 설계합니다.",
      tags: [
        "온보딩 퍼널 최적화",
        "유저 리텐션 기획",
        "다언어/글로벌 UX",
        "제품 성장 지표 분석",
        "크로스보더 커뮤니케이션"
      ]
    }
  ],
  lifecycle: [
    {
      stage: "PLAN",
      title: "기획 (Service & Business Planning)",
      subtitle: "목적 정의 & 백오피스 구조 설계",
      description: "비즈니스 모델과 운영 요구사항을 분석하여 명확한 기능 명세서(PRD), 정보구조도(IA), 정책 정의서를 수립합니다.",
      skills: ["요구사항 정의서 (PRD)", "정보구조도 (IA)", "기능 명세서", "정책 및 비즈니스 룰"]
    },
    {
      stage: "DESIGN",
      title: "설계 (UI/UX & Prototyping)",
      subtitle: "화면 구체화 & 마크업 프로토타이핑",
      description: "Figma를 통한 정밀한 화면설계서와 와이어프레임을 제작하며, 필요 시 HTML/CSS 기반 퍼블리싱 프로토타입으로 개발팀과 정확히 소통합니다.",
      skills: ["와이어프레임", "스토리보드 (SB)", "HTML/CSS 퍼블리싱", "Figma 협업"]
    },
    {
      stage: "BUILD",
      title: "개발 협업 (Development Collaboration)",
      subtitle: "개발 친화적 소통 & 긴급 퍼블리싱 지원",
      description: "DB 구조와 프론트엔드/백엔드 통신 규격을 이해하는 기획자로서, 개발팀 긴급 상황 시 직접 퍼블리싱 코드를 공유하고 정밀 QA를 지원합니다.",
      skills: ["HTML/CSS 마크업 지원", "API 통신 구조 이해", "Jira/VSCode 협업", "예외 처리 정책"]
    },
    {
      stage: "OPERATE",
      title: "운영 (Operations & VOC Feedback)",
      subtitle: "운영 현장 관리 & VOC 피드백 루프",
      description: "글로벌 서비스 운영팀 리드 경험을 바탕으로 런칭 후 유저 문의 분석, 백오피스 병목 개선, 프로세스 표준화를 이끕니다.",
      skills: ["VOC 분석", "운영 백오피스 기획", "글로벌 CS 관리", "이슈 해결 가이드"]
    },
    {
      stage: "GROW",
      title: "성장 (Growth & Global Expansion)",
      subtitle: "글로벌 마케팅 & 다언어 로컬라이제이션",
      description: "한국어·영어·일본어 3개 언어 능력을 활용하여 글로벌 유저 온보딩 퍼널을 최적화하고 해외 파트너십과 커뮤니케이션을 추진합니다.",
      skills: ["다언어 로컬라이제이션", "온보딩 퍼널 최적화", "사용자 경험 개선", "글로벌 파트너십"]
    }
  ],
  experiences: [
    {
      id: "exp-1",
      period: "2025. 03 — 재직 중",
      company: "(주)어셈브릭스 (Assemblix)",
      role: "사업전략기획팀 과장 (Lead Service & UI/UX Planner)",
      summary: "태권도 통합 플랫폼 '티넥트(T-NECT)' 및 화물 넘버 직거래 플랫폼 '탑탑(TOPTOP)' 서비스 기획, 어드민/백오피스 설계, UI/UX 기획 및 HTML/CSS 퍼블리싱 총괄",
      responsibilities: [
        "태권도 도장 관리 및 대회 운영 통합 플랫폼 '티넥트(T-NECT)' 기획: 관장용(마스터), 학부모/수련생용(메이트), 출석 전용 키오스크 앱, 대회 관리자 웹 및 블록체인 기반 'T-BADGE' 디지털 상장 e-Certificate 설계",
        "블록체인 기반 화물 넘버 직거래 플랫폼 '탑탑(TOPTOP)' 웹/모바일 앱 기획: 개인용달·개별화물·주선면허 톤급별 시세 조회 및 법인계좌 에스크로 안전 결제 프로세스 설계",
        "개발팀 구현 편의를 위한 반응형 HTML/CSS 마크업 프로토타입 직접 제작 및 개발-기획 실시간 싱크",
        "현장 피드백 및 고객 VOC 분석을 통한 백오피스 어드민 화면 개선"
      ],
      tags: ["서비스 기획", "UI/UX 화면기획", "백오피스 기획", "HTML/CSS 퍼블리싱", "Figma", "티넥트", "탑탑"]
    },
    {
      id: "exp-2",
      period: "2024. 05 — 2025. 03 (11개월)",
      company: "(주)아크리아스튜디오 (Archria Studio)",
      role: "서비스 기획실 대리 매니저 (Service & Growth Planner)",
      summary: "블록체인 웹툰 앱 'HYPERCOMIC' 및 만화 작가를 위한 AI 창작 플랫폼 'PrompTale' 기획, 노드(NODE) 시스템 설계 및 유틸리티 NFT 마케팅 총괄",
      responsibilities: [
        "만화 작가들의 그림체를 학습시키는 AI 보조 제작 사이트 'PrompTale'의 AI 학습 파이프라인 및 분산 노드(NODE) 서비스 구축·설계",
        "블록체인 기반 웹툰 리워드 앱 'HYPERCOMIC' 서비스 기획 (웹툰 열람 시 HYCO 토큰 리워드 지급 플로우 설계)",
        "HYPERCOMIC 및 PrompTale 서비스 이용 혜택(무료 웹툰 열람권, AI 데이터 사용량 할인 등)을 연계한 유틸리티 NFT 5,476,972개 민팅 및 완판 달성 견인",
        "글로벌 커뮤니티(Discord/Telegram) 성장 전략 수립 및 해외 CS센터 원격 관리"
      ],
      tags: ["PrompTale AI", "HYPERCOMIC", "노드 서비스 설계", "유틸리티 NFT", "UI/UX 기획"]
    },
    {
      id: "exp-3",
      period: "2023. 10 — 2024. 05 (8개월)",
      company: "Sun & Rich (해외 사업부서)",
      role: "해외 사업부서 대리 매니저",
      summary: "해외 모바일 애플리케이션 기획, 서비스 운영, 마케팅 및 비즈니스 협력 총괄",
      responsibilities: [
        "글로벌 모바일 서비스 기획 및 런칭 운영안 수립",
        "서비스 론칭을 위한 미디어믹스 마케팅 플랜 수립 및 해외 프로모션 집행",
        "글로벌 파트너십 조율 및 서비스 솔루션 제공",
        "원격 CS 센터 운영 관리 및 글로벌 고객 지원 프로세스 표준화"
      ],
      tags: ["글로벌 서비스 기획", "미디어믹스", "해외 파트너십", "원격 CS센터 관리"]
    },
    {
      id: "exp-4",
      period: "2023. 05 — 2023. 10 (6개월)",
      company: "㈜위즈블 (Wizbl)",
      role: "전략기획실 대리 매니저",
      summary: "엔터테인먼트 플랫폼의 글로벌 진출 전략 수립 및 UI/UX 기획",
      responsibilities: [
        "글로벌 엔터테인먼트 플랫폼 론칭 준비 및 서비스 사이트 기획",
        "백오피스 운영안 작성 및 세부 비즈니스 정책 정의",
        "유저 저니(User Journey) 기획: 유저 진입부터 주요 액션, 목표 달성까지의 전 과정 UX 설계"
      ],
      tags: ["전략 기획", "UI/UX 디자인", "유저 저니 설계", "글로벌 론칭"]
    },
    {
      id: "exp-5",
      period: "2022. 11 — 2023. 05 (7개월)",
      company: "이엘파크 (EL Park / 이엘그룹)",
      role: "플랫폼사업전략실 대리 팀원",
      summary: "'nfTTcity' 메타버스 프로젝트 사업 전략 수립, 웹사이트 기획 및 NFT 3분 완판 마케팅 총괄",
      responsibilities: [
        "메타버스 플랫폼에서 캐릭터로 활용 가능한 독점 유틸리티 NFT 기획 및 론칭 웹사이트 구축",
        "사전 론칭 캠페인 집행으로 단 3분 만에 NFT 완판 기록 달성",
        "소셜 바이럴 마케팅을 통해 4만 명 이상의 글로벌 사전 등록 유저 온보딩 견인"
      ],
      tags: ["nfTTcity", "메타버스 기획", "NFT 3분 완판", "4만 유저 유입"]
    },
    {
      id: "exp-6",
      period: "2022. 08 — 2022. 11 (4개월)",
      company: "NEXTOR",
      role: "플랫폼사업부 / 마케팅 대리 매니저",
      summary: "메타버스 소셜 플랫폼 사업 전략 수립, 웹사이트 기획 및 글로벌 론칭 프로세스 총괄",
      responsibilities: [
        "메타버스 플랫폼 웹사이트 기획 및 론칭 관리",
        "해외 마케팅 및 IR 자료 제작, 영/일 번역 업무 수행",
        "웹 플랫폼 기획 및 글로벌 론칭 프로세스 조율"
      ],
      tags: ["메타버스 기획", "웹 플랫폼 기획", "IR 자료 영문화", "해외 마케팅"]
    },
    {
      id: "exp-7",
      period: "2021. 09 — 2022. 02 (6개월)",
      company: "더퓨쳐컴퍼니 (Metaverse2)",
      role: "마케팅 / 기획 사원 팀원",
      summary: "가상 부동산 메타버스 플랫폼 'Metaverse2 (메타버스2)' 웹사이트 기획, 다국어 로컬라이제이션 및 마케팅 전략 수립",
      responsibilities: [
        "earth2.io 모델의 가상 부동산 타일 거래 메타버스 플랫폼 웹사이트 기획 및 런칭 참여",
        "영문/일문 글로벌 로컬리제이션 및 다국어 웹 콘텐츠 검수",
        "마케팅 전략 수립 및 초기 글로벌 커뮤니티 활성화"
      ],
      tags: ["가상 부동산", "Metaverse2", "로컬라이제이션", "기획/마케팅"]
    },
    {
      id: "exp-8",
      period: "2021. 01 — 2021. 09 (9개월)",
      company: "Google YouTube (YouTube POS JP)",
      role: "YouTube POS JP 사원 팀장",
      summary: "YouTube 일본 고객 응대 및 운영 팀장, 상담 품질 관리 및 팀원 성과 개선 주도",
      responsibilities: [
        "일본어 원어민 역량을 바탕으로 YouTube POS 관련 전문 고객 응대 총괄",
        "팀원 업무 성과 지표(KPI) 관리 및 상담 품질 개선 교육 진행",
        "운영 데이터 분석을 통한 반복 문의 개선안 보고"
      ],
      tags: ["Google YouTube", "운영 팀장", "일본어 Native", "성과 관리"]
    },
    {
      id: "exp-9",
      period: "2017. 10 — 2020. 11 (3년 2개월)",
      company: "iHerb®",
      role: "해외 운영팀 사원 팀장",
      summary: "글로벌 이커머스 iHerb 해외 운영팀 리드, 고객 문의 분석 및 CS 품질·인사 관리",
      responsibilities: [
        "해외 고객 응대 및 문의 유형 정량 분석(VOC Analysis)",
        "신규 입사자 CS 교육 기획, 상담 품질 관리, 팀원 면접 및 채용 지원",
        "글로벌 결제/배송 이슈에 대한 표준 대응 프로세스 수립"
      ],
      tags: ["iHerb", "해외 운영팀장", "VOC 분석", "품질 관리", "프로세스 표준화"]
    },
    {
      id: "exp-10",
      period: "2015. 01 — 2018. 01 (3년 1개월)",
      company: "DetonatioN FocusMe (일본 프로 e스포츠 구단)",
      role: "리그오브레전드(LoL) 2군 선수 및 프리랜서",
      summary: "일본 대표 e스포츠 팀 소속 선수 활동, 공식 대회 입상 및 일본 미디어 방송 출연",
      responsibilities: [
        "리그오브레전드 일본 공식 대회 2회 출전 (2위 1회, 4위 1회 입상)",
        "지역 대회 약 6회 출전 (우승 3회, 2위 1회, 3위 2회 달성)",
        "일본 메이저 스트리밍 플랫폼 Abema TV 공식 방송 2회 출연으로 대중 소통"
      ],
      tags: ["프로게이머", "e스포츠", "대회 입상", "Abema TV 방송"]
    },
    {
      id: "exp-11",
      period: "2015. 01 — 2017. 01 (2년 1개월)",
      company: "Upwork (글로벌 프리랜서)",
      role: "다국어 로컬라이제이션 프리랜서",
      summary: "영어·일본어·한국어 전문 번역 및 게임·웹사이트 콘텐츠 로컬라이제이션 수행",
      responsibilities: [
        "웹사이트, 소설, 만화, 영상 자막, 게임 콘텐츠 한/영/일 삼국어 번역",
        "문화적 뉘앙스를 반영한 로컬라이제이션 및 클라이언트 품질 검수"
      ],
      tags: ["Upwork", "한/영/일 번역", "로컬라이제이션", "글로벌 프리랜서"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      number: "01",
      title: "티넥트 (T-NECT) - 태권도 도장 통합 관리 & 대회 운영 플랫폼",
      subtitle: "도장 행정 SaaS부터 실시간 대회 운영 및 블록체인 디지털 상장(T-BADGE)까지 아우르는 올인원 솔루션",
      category: ["SaaS 플랫폼", "UI/UX 기획", "대회 관리 시스템", "T-BADGE 상장", "HTML/CSS 퍼블리싱"],
      period: "2025. 03 — 현재",
      thumbnailUrl: "",
      metric: "업무 시간 60% 절감",
      metricLabel: "원장 행정 소요 시간 절감",
      summary: "아날로그 장부와 수기 영수증에 의존하던 태권도 도장의 출결, 정기 수납, 학부모 알림을 디지털화하고, 태권도 대회의 수련생 참가 등록부터 실시간 점수 집계, 블록체인 기반 'T-BADGE' 디지털 상장(e-Certificate) 수여까지 전 과정을 구축한 통합 플랫폼입니다. (https://www.t-nect.com/)",
      artifacts: [
        {
          id: "tnect-art-1",
          type: "wireframe",
          title: "T-BADGE 블록체인 디지털 상장(e-Certificate) 피그마 컴포넌트화",
          description: "대회 수상자에게 공식 수여되는 디지털 상장의 앞면(대회No, 등수, 선수명, 도장명, 종목/부문), 뒷면(평가 점수, 공식 수여문), 소셜 뷰(영상/이미지 첨부, SNS 공유, PDF 다운로드)를 유동적으로 설계한 Figma 컴포넌트 시스템",
          imageUrl: "",
          tag: "T-BADGE 컴포넌트 설계",
          keyInsight: "수상 내역이 영구 보존되는 블록체인 배지와 함께, 학부모가 카카오톡·SNS로 즉시 자랑할 수 있는 감성적 인터랙션 및 공식 PDF 발급 동선 설계"
        },
        {
          id: "tnect-art-2",
          type: "before-after",
          title: "도장 출결 전용 앱 & 학부모 알림 동선 개선",
          description: "기존 4단계 화면 전환 플로우를 단일 10키 숫자패드 및 1초 즉시 확인 화면으로 개편하여 하교 시간대 원생 혼잡도를 대폭 감소시켰습니다.",
          beforeCaption: "AS-IS: 화면 전환 3회, 사범님 확인 팝업 대기 (소요 시간 15초, 줄서기 병목)",
          afterCaption: "TO-BE: 번호 4자리 입력 즉시 출석 확정 및 학부모 앱 알림 자동 발송 (소요 시간 3초)",
          imageUrl: "",
          tag: "AS-IS vs TO-BE",
          keyInsight: "하교 시간 원생 동시 입장 시 병목을 없애기 위해 '확인' 버튼을 생략한 4자리 자동 감지 인터랙션 설계"
        }
      ],
      retrospective: {
        title: "도장 현장 네트워크 불안정을 고려한 오프라인 우선(Offline-First) 정책 수립",
        mistakeOrChallenge: "초기 기획 당시 모든 출석 체크를 실시간 서버 API 요청으로만 처리하도록 설계했습니다.",
        rootCause: "실제 도장 필드 테스트 결과 와이파이 음영 구역에서 순간 네트워크 순단으로 출석 데이터가 누락되는 이슈가 발생했습니다.",
        howSolved: "브라우저 로컬 저장소 기반의 '오프라인 우선 큐잉 동기화 정책'을 수립하여 네트워크가 끊겨도 화면은 정상 출석 처리되고, 통신 복구 즉시 백그라운드에서 순차 재전송되도록 플로우를 개선했습니다.",
        lessonLearned: "기획자는 최적의 환경이 아닌 현장 최악의 엣지 케이스를 기준으로 폴백 정책을 수립해야 한다는 점을 체득했습니다.",
        beforeAfterComparison: {
          beforeText: "네트워크 끊김 시 에러 팝업 노출 및 출결 데이터 유실",
          afterText: "로컬 큐 즉각 저장 + 초록 체크 정상 피드백 + 통신 복구 시 자동 백그라운드 싱크"
        }
      },
      externalLinks: [
        {
          label: "티넥트 마스터 (관장용 SaaS 웹)",
          url: "https://www.t-nect.com/master",
          type: "live",
          note: "도장 행정, 원비 수납, 출결 및 원생 관리 올인원 솔루션"
        }
      ],
      overview: {
        project: "티넥트 (T-NECT)",
        company: "(주)어셈브릭스 (Assemblix)",
        duration: "2025. 03 — 현재",
        role: "Lead Service Planner & UI/UX Designer",
        platform: "Web & Mobile / 티넥트 마스터 · 메이트 · 출석앱 · 대회 관리자",
        team: "기획 1명, 디자이너 1명, 개발팀 4명"
      },
      background: "수많은 도장과 무도 학원이 수기 출석부와 종이 영수증에 의존해 행정 처리에 치이고 있었으며, 태권도 대회 역시 수기 점수 집계와 종이 상장 발급으로 많은 시간과 인력이 소모되고 있었습니다. 도장 운영과 대회 진행을 아우르는 디지털 통합 솔루션이 필요했습니다.",
      problem: [
        "원비 수납 누락 및 매달 반복되는 수기 고지서 발송 부담",
        "아이들의 도장 출결 상태에 대한 학부모의 불안감과 잦은 유선 문의",
        "태권도 대회 시 선수 등록, 실시간 점수 집계, 종이 상장 발급에 드는 막대한 행정 공수"
      ],
      approach: [
        "역할별 전용 서비스 분리: 관장용 '티넥트 마스터', 학부모/수련생용 '티넥트 메이트', '출석 전용 키오스크 앱', '대회 관리자 웹' 구축",
        "태권도 대회 실시간 점수 등록 및 모바일 리더보드 화면 설계",
        "블록체인 기반의 영구 보존형 디지털 상장 'T-BADGE' 피그마 컴포넌트화 및 SNS 공유 UX 구현"
      ],
      planning: {
        serviceStructure: "티넥트 마스터(관장) - 티넥트 메이트(학부모/수련생) - 출석앱(키오스크) - 대회 운영 시스템을 통합 파이프라인으로 연결했습니다.",
        userFlow: "도장 일상: 번호 입력 출결 → 학부모 실시간 알림 → 정기 수납 1-클릭 결제 / 대회: 온라인 참가 접수 → 심판 실시간 점수 입력 → T-BADGE 디지털 상장 발급 및 SNS 공유",
        informationArchitecture: "도장 관리 / 출결 현황 / 원비 수납 / 대회 참가 신청 / 실시간 대회 점수판 / T-BADGE 상장 보관함",
        details: [
          "다자녀 가구 통합 청구 및 형제 할인 자동 계산 룰 수립",
          "대회 종목별 평가 배점표에 따른 실시간 점수 집계 로직 정의",
          "T-BADGE 블록체인 해시 발급 및 PDF 상장 즉시 렌더링 정책 수립"
        ]
      },
      uiux: {
        wireframeNotes: "디지털 기기에 익숙하지 않은 원장님과 어린 수련생 모두가 매뉴얼 없이 직관적으로 조작할 수 있도록 설계했습니다.",
        screenPlanning: "T-BADGE 상장 화면은 앞면 메달 그래픽, 뒷면 공인 점수/수여문, 소셜 영상 첨부 등 카드 플립 인터랙션으로 설계했습니다.",
        interaction: "출결 키오스크 번호 4자리 입력 시 자동 검증 후 1초 만에 초기화되는 동선을 구현했습니다.",
        highlights: [
          "T-BADGE 피그마 반응형 컴포넌트 시스템",
          "실시간 태권도 대회 채점 모바일 웹",
          "원클릭 일괄 알림톡 발송 모달"
        ]
      },
      collaboration: {
        designer: "T-BADGE 상장 그래픽과 마스터/메이트 앱 UI 컴포넌트 시스템을 Figma에서 일원화했습니다.",
        developer: "기획 의도가 100% 반영되도록 상태별 엣지 케이스를 명세화하고 긴급 마크업을 직접 지원했습니다.",
        marketing: "도장 관장님 커뮤니티 및 대회 참가 태권도장 타깃 온보딩 랜딩페이지를 기획했습니다.",
        operations: "초기 도입 도장 및 시범 대회 현장에 직접 상주하여 사용자 피드백을 실시간 수집 및 반영했습니다."
      },
      result: {
        summary: "원장님의 일일 출결·행정 소요 시간을 60% 이상 단축하고, 태권도 대회의 접수부터 T-BADGE 디지털 상장 수여까지 전 과정을 무장애로 완수했습니다.",
        metrics: [
          { label: "행정 시간 단축", value: "60% 절감", desc: "출결 및 수납 업무 소요 시간 대폭 감소" },
          { label: "수납 완료율", value: "98.4%", desc: "1-클릭 간편 청구 도입 효과" },
          { label: "T-BADGE 발행", value: "100% 전산화", desc: "종이 상장 인쇄 비용 및 발급 대기 시간 제로화" }
        ],
        impact: [
          "수기 업무 디지털 전환으로 교육 본연의 가치에 집중할 수 있는 환경 제공",
          "위변조 없는 디지털 상장 수여로 학부모 신뢰도 상승 및 SNS 바이럴 효과 달성"
        ]
      },
      myRole: {
        primary: "서비스 기획, UI/UX 화면설계, 백오피스 정책 및 T-BADGE 컴포넌트 기획 총괄",
        responsibilities: [
          "서비스 요구사항 정의서(PRD) 및 마스터/메이트/출석앱 화면설계서 작성",
          "태권도 대회 운영 워크플로우 및 T-BADGE 디지털 상장 인터랙션 설계",
          "백오피스 데이터 구조 및 정기 수납 정책 정의",
          "핵심 화면 HTML/CSS 퍼블리싱 지원"
        ],
        keyTakeaway: "현장의 소리를 직접 듣고 예외 상황을 기획 단계에서 선제적으로 해결하는 것이 프로덕트 성공의 열쇠임을 확인했습니다."
      }
    },
    {
      id: "proj-2",
      number: "02",
      title: "탑탑 (TOPTOP) - 블록체인 기반 화물 넘버 직거래 플랫폼",
      subtitle: "음성적 화물 운송 자격·영업용 번호판 거래를 양성화한 톤급별 시세 조회 및 에스크로 직거래 솔루션",
      category: ["P2P 플랫폼", "화물 넘버 거래", "에스크로 정책", "시세 데이터 UI", "UI/UX 기획"],
      period: "2025. 03 — 현재",
      thumbnailUrl: "",
      metric: "사기 발생률 0건",
      metricLabel: "법인계좌 안전 에스크로 거래",
      summary: "오프라인 딜러나 중개 브로커에 의존하여 높은 수수료와 사기 위험에 노출되던 화물 영업용 번호판(개인용달, 개별화물, 주선면허 등) 직거래를 전기차부터 톤급별 실시간 시세 조회와 법인계좌 에스크로 안전 결제로 혁신한 플랫폼입니다.",
      artifacts: [
        {
          id: "toptop-art-1",
          type: "wireframe",
          title: "전기차부터 주선면허까지 톤급별 실시간 시세 조회 UI",
          description: "개인용달(일반), 개별화물, 주선면허 등 카테고리별 최근 실거래가 추이와 월별 시세를 그래프와 카드로 한눈에 비교할 수 있는 시세 데이터 정보 구조",
          imageUrl: "",
          tag: "시세 대시보드 UI"
        },
        {
          id: "toptop-art-2",
          type: "before-after",
          title: "화물 넘버 양도양수 행정 절차의 에스크로 가이드화",
          description: "계약금 예치부터 관할 관청 서류 접수, 양도양수 인가 확인 시 대금 지급까지를 단계별 타임라인으로 설계하여 거래 분쟁을 원천 차단했습니다.",
          beforeCaption: "AS-IS: 브로커를 통한 불투명한 수수료, 계약금 먹튀 및 서류 미인가 분쟁 빈번",
          afterCaption: "TO-BE: 법인계좌 에스크로 예치 → 공증 서류 접수 → 관청 인가 확인 시 안전 정산 (사기 0건)",
          imageUrl: "",
          tag: "AS-IS vs TO-BE"
        }
      ],
      retrospective: {
        title: "화물 운송 인가 행정의 특수성을 반영한 단계별 정산 룰 수립",
        mistakeOrChallenge: "초기 기획 당시 일반 상거래처럼 서류 등기 발송 완료 후 일정 기간 경과 시 자동 구매확정되는 구조를 검토했습니다.",
        rootCause: "화물 넘버 거래는 서류만 수령하고 관할 지자체에 정식 양도양수 인가 신청을 하지 않으면 법적 권리가 이전되지 않는 특수성이 있었습니다.",
        howSolved: "단순 배송 확인 타이머를 폐지하고, 지자체 화물 운송사업 양도양수 인가 확인이 완료되는 시점에만 판매자에게 정산 대금이 지급되도록 에스크로 조건을 확립했습니다.",
        lessonLearned: "특수 산업 도메인의 법적·행정적 규정을 철저히 검증하고 기획에 반영해야만 진정한 사용자 보호가 가능함을 체득했습니다.",
        beforeAfterComparison: {
          beforeText: "단순 서류 수령 후 자동 정산 (행정 미인가 시 구매자 피해 발생 리스크)",
          afterText: "지자체 정식 양도양수 인가 확인 즉시 안전 정산 (거래 분쟁 제로화)"
        }
      },
      externalLinks: [
        {
          label: "탑탑 (Google Play 스토어)",
          url: "https://play.google.com/store/apps/details?id=kr.co.assembrix.toptop3&hl=ko",
          type: "live",
          note: "블록체인 기반 화물 넘버 직거래 및 톤급별 시세 조회 안드로이드 공식 앱"
        }
      ],
      overview: {
        project: "탑탑 (TOPTOP)",
        company: "(주)어셈브릭스 (Assemblix)",
        duration: "2025. 03 — 현재",
        role: "Lead Service & UI/UX Planner",
        platform: "Mobile Web & App (Android / iOS) / Admin Backoffice",
        team: "기획 1명, 디자이너 1명, 개발팀 3명"
      },
      background: "수천만 원에 달하는 화물차 영업용 넘버 거래는 깜깜이 시세와 오프라인 브로커의 과도한 중개 수수료, 계약금 편취 등 사기 피해가 끊이지 않던 시장이었습니다. 투명한 시세 확인과 안전한 직거래 수단이 절실했습니다.",
      problem: [
        "톤급별/면허별 실거래가를 투명하게 확인할 수 있는 공인된 데이터 부재",
        "개인 간 고액 직거래 시 대금 지급과 서류 인가를 보증하는 신뢰 수단 부재",
        "원하는 매물 탐색의 어려움 및 복잡한 지자체 양도양수 인가 절차의 혼란"
      ],
      approach: [
        "전기차, 개인용달, 개별화물, 주선면허 등 톤급별 실시간 시세 그래프 및 매물 탐색 UI 설계",
        "법인계좌 예치 기반의 안전 에스크로 결제 및 5단계 양도양수 행정 가이드 구축",
        "삽니다/팝니다 간편 거래 신청 및 관심 매물 모아보기 인터페이스 제공"
      ],
      planning: {
        serviceStructure: "시세 조회 - 인증 매물 등록/탐색 - 에스크로 안전 결제 - 행정 서류 검증 - 관리자 정산 백오피스로 이어지는 신뢰 거래 구조를 설계했습니다.",
        userFlow: "매물 탐색/시세 확인 → 거래 신청 → 법인계좌 대금 예치 → 지자체 양도양수 서류 접수 → 인가 완료 확인 → 판매자 정산 완료",
        informationArchitecture: "홈 / 톤급별 시세보기 / 삽니다·팝니다 매물 / 관심 매물 / 마이페이지(거래 현황)",
        details: [
          "허위 매물 차단을 위한 화물 운송자격 증명 및 등록증 사전 검증 정책",
          "행정 미인가 또는 계약 철회 시 법인계좌 환불 정책 수립",
          "분쟁 발생 시 관리자 직권 검토 및 중재 프로세스 정의"
        ]
      },
      uiux: {
        wireframeNotes: "현업 화물 기사님들의 주행 및 대기 환경을 고려해 큰 폰트, 높은 대비, 직관적인 버튼 배치를 적용했습니다.",
        screenPlanning: "시세 화면은 월별 변동 추이와 톤급별 가격대를 한눈에 비교할 수 있는 인터랙티브 차트로 구성했습니다.",
        interaction: "원하는 매물 카드에서 '거래 신청' 터치 시 즉시 진행 절차 안내 모달이 표출되는 직관적 인터랙션을 구현했습니다.",
        highlights: [
          "톤급별/면허별 실시간 시세 차트 컴포넌트",
          "단계별 거래 진행 타임라인 UI",
          "관심 매물 즉시 모아보기 필터"
        ]
      },
      collaboration: {
        designer: "신뢰감을 주는 블루/오렌지 톤의 모바일 전용 디자인 시스템을 구축했습니다.",
        developer: "에스크로 결제 상태 머신과 지자체 서류 업로드/검증 프로세스를 정의하여 개발했습니다.",
        marketing: "화물 운송 종사자 커뮤니티 및 밴드 타깃 홍보 랜딩페이지를 기획했습니다.",
        operations: "고객 문의 응대 및 서류 검증 백오피스 운영 매뉴얼을 수립했습니다."
      },
      result: {
        summary: "법인계좌 안전 에스크로 거래를 통해 거래 사기 발생률 0건을 달성하고, 깜깜이였던 화물 넘버 시세를 투명하게 공시키셨습니다.",
        metrics: [
          { label: "사기 발생률", value: "0건", desc: "법인계좌 에스크로 안전 결제 보호 효과" },
          { label: "시세 데이터", value: "톤급별 제공", desc: "전기차부터 주선면허까지 실시간 집계" }
        ],
        impact: [
          "음성적 오프라인 브로커 시장을 모바일 직거래 플랫폼으로 양성화",
          "투명한 시세 공개로 화물 차주들의 불필요한 중개 수수료 부담 경감"
        ]
      },
      myRole: {
        primary: "서비스 비즈니스 모델 설계, UI/UX 기획 및 법인계좌 에스크로 정책 수립",
        responsibilities: [
          "화물 넘버 직거래 서비스 정책 정의서 및 단계별 유저 플로우 작성",
          "모바일 앱 화면설계서 및 톤급별 시세 대시보드 UI 기획",
          "지자체 양도양수 행정 절차 검증 및 에스크로 정산 룰 수립",
          "관리자 백오피스 매물 승인 및 거래 중재 화면 설계"
        ],
        keyTakeaway: "특수 직군 플랫폼 기획은 현업 종사자의 언어와 실제 거래 관행을 깊이 이해하고 신뢰의 안전망을 짤 때 비로소 완성됨을 확인했습니다."
      }
    },
    {
      id: "proj-3",
      number: "03",
      title: "HYPERCOMIC & PrompTale - 블록체인 웹툰 & AI 작가 창작 플랫폼",
      subtitle: "웹툰 열람 보상(HYCO)과 AI 노드(Node) 설계, 547만 개 유틸리티 NFT 민팅을 이끈 서비스 기획",
      category: ["AI 플랫폼", "블록체인 웹툰", "노드 서비스 설계", "유틸리티 NFT", "UI/UX 기획"],
      period: "2024. 05 — 2025. 03",
      thumbnailUrl: "",
      metric: "547만+ 민팅 완판",
      metricLabel: "유틸리티 NFT 판매 및 노드 구축",
      summary: "(주)아크리아스튜디오에서 웹툰 열람 시 토큰을 보상하는 웹툰 앱 'HYPERCOMIC'과 만화 작가들의 그림체를 AI로 학습시켜 창작을 돕는 'PrompTale'의 AI 학습 파이프라인 및 분산 노드(NODE) 서비스를 기획했습니다. 서비스 이용 혜택과 결합된 유틸리티 NFT 547만 개 민팅/완판을 견인했습니다.",
      artifacts: [
        {
          id: "promptale-art-1",
          type: "wireframe",
          title: "PrompTale 작가 AI 스타일 학습 & 분산 노드(Node) 관리 UI",
          description: "만화 작가가 본인의 그림체 에셋을 업로드하여 전용 AI 모델을 학습시키고, 분산 노드(NODE) 파워를 통해 렌더링을 가속하는 워크플로우 화면 설계",
          imageUrl: "",
          tag: "AI & 노드 시스템 설계",
          keyInsight: "전문 용어를 몰라도 작가가 직관적으로 자신의 드로잉을 학습시키고 결과물을 생성할 수 있는 직관적인 스텝 바이 스텝 UI 구현"
        },
        {
          id: "promptale-art-2",
          type: "before-after",
          title: "HYPERCOMIC 웹툰 리워드 & 유틸리티 멤버십 온보딩",
          description: "단순 열람을 넘어 웹툰을 보면 HYCO 토큰을 지급하고, 유틸리티 NFT 보유 시 무료 열람 및 AI 데이터 할인을 즉각 적용하는 혜택 구조",
          beforeCaption: "AS-IS: 단순 웹툰 구독 모델 및 토큰 없는 일방향 콘텐츠 소비",
          afterCaption: "TO-BE: 열람 시 HYCO 리워드 적립 + 유틸리티 NFT 보유 시 PrompTale AI 무료 생성 혜택 연동",
          imageUrl: "",
          tag: "AS-IS vs TO-BE"
        }
      ],
      retrospective: {
        title: "AI 생성 대기 시간과 노드 컴퓨팅 분산 처리 시의 유저 피드백 개선",
        mistakeOrChallenge: "초기 AI 생성 화면에서 복잡한 연산 중 화면이 멈춘 것처럼 보이는 정적 로딩 화면을 적용했습니다.",
        rootCause: "고해상도 만화 컷 생성 시 수십 초의 렌더링 시간이 소요되어 유저가 오류로 오인하고 새로고침을 누르는 문제가 발생했습니다.",
        howSolved: "단계별 진행 상태(프롬프트 분석 → 스케치 생성 → 디테일 렌더링)를 실시간 프로그레스 바로 시각화하고, 백그라운드 큐 완료 시 토스트 알림을 제공하도록 UX를 개편했습니다.",
        lessonLearned: "생성형 AI 서비스 기획에서는 백엔드 연산 시간 동안 유저에게 예측 가능한 진행 피드백을 주는 것이 리텐션에 결정적임을 배웠습니다.",
        beforeAfterComparison: {
          beforeText: "정적 스피너로 인한 생성 오류 오인 및 새로고침 이탈",
          afterText: "단계별 진행률 시각화 + 백그라운드 완료 알림으로 체감 대기 시간 해소"
        }
      },
      externalLinks: [
        {
          label: "HYPERCOMIC (웹툰 리워드 서비스)",
          url: "https://play.hypercomic.io/Webtoon",
          type: "live",
          note: "열람 시 HYCO 토큰을 보상 지급하는 블록체인 기반 웹툰 플랫폼"
        },
        {
          label: "PrompTale AI (만화 작가 AI 스튜디오)",
          url: "https://www.promptale.io/",
          type: "live",
          note: "작가 고유 화풍 AI 모델 학습 및 분산 노드(Node) 인프라 사이트"
        }
      ],
      overview: {
        project: "HYPERCOMIC & PrompTale",
        company: "(주)아크리아스튜디오 (Archria Studio)",
        duration: "2024. 05 — 2025. 03",
        role: "Service & Growth Planner",
        platform: "Web & Mobile App / PrompTale AI & HYPERCOMIC Webtoon",
        team: "기획 1명, 디자이너 2명, 개발팀 5명"
      },
      background: "웹툰 작가들의 과도한 작화 노동을 보조하기 위한 생성형 AI 툴과 독자들에게 실질적 혜택을 돌려주는 리워드형 웹툰 플랫폼의 결합이 요구되었습니다.",
      problem: [
        "만화 작가들이 자신의 고유한 그림체를 학습시키고 제어하기 어려운 기존 AI 툴의 한계",
        "웹툰 소비 시 유저의 참여를 이끌어낼 동기 부여 및 리텐션 장치 부족",
        "투기성이 아닌 실제 플랫폼 사용 가치를 제공하는 유틸리티 모델의 필요성"
      ],
      approach: [
        "PrompTale: 만화 작가 전용 화풍 학습 인터페이스 및 분산 노드(NODE) 인프라 서비스 구축",
        "HYPERCOMIC: 웹툰 열람 시 HYCO 토큰을 보상하는 사용자 리워드 메커니즘 설계",
        "유틸리티 NFT 기획: 무료 웹툰 열람권, PrompTale AI 데이터 생성 할인 혜택을 결합하여 547만 개 민팅 달성"
      ],
      planning: {
        serviceStructure: "HYPERCOMIC 웹툰 뷰어, PrompTale AI 창작 스튜디오, 노드(Node) 생태계, 유틸리티 멤버십을 하나의 서비스 허브로 연결했습니다.",
        userFlow: "HYPERCOMIC 웹툰 감상 → HYCO 토큰 적립 / 작가: 그림체 학습 → PrompTale AI로 컷 완성 / 유틸리티 NFT 보유 시 AI 및 웹툰 프리미엄 혜택 즉시 적용",
        informationArchitecture: "웹툰 라이브러리 / AI 창작 스튜디오 / 노드 대시보드 / 멤버십 혜택 / 리워드 지갑",
        details: [
          "PrompTale AI 노드 구매자 대상 컴퓨팅 파워 기여 및 서비스 우선권 정책 수립",
          "HYCO 토큰 일일 적립 한도 및 어뷰징 방지 정책 정의",
          "유틸리티 NFT 등급별 무료 컷 생성 크레딧 지급 룰 명세화"
        ]
      },
      uiux: {
        wireframeNotes: "작가의 크리에이티브 작업 몰입을 방해하지 않도록 정갈한 캔버스 중심 UI를 구성했습니다.",
        screenPlanning: "노드 대시보드는 현재 가동 상태, 처리량, 잔여 크레딧을 대시보드 위젯으로 한눈에 파악할 수 있도록 배치했습니다.",
        interaction: "웹툰 열람 완료 시 즉각적인 코인 적립 인터랙션과 함께 다음 화 연속 감상 동선을 유기적으로 연결했습니다.",
        highlights: [
          "만화 작가 전용 AI 프롬프트 빌더",
          "분산 노드(Node) 상태 모니터링 대시보드",
          "유틸리티 멤버십 혜택 현황 카드"
        ]
      },
      collaboration: {
        designer: "웹툰 IP의 감성을 살린 세련된 비주얼 에셋과 다크 UI 테마를 협업했습니다.",
        developer: "AI 모델 추론 API 연동 규격 및 블록체인 노드 트랜잭션 검증 플로우를 조율했습니다.",
        marketing: "글로벌 웹3 및 크리에이터 커뮤니티 타깃 AMA와 유틸리티 민팅 캠페인을 기획했습니다.",
        operations: "글로벌 디스코드/텔레그램 커뮤니티 운영 가이드라인과 해외 CS 대응 매뉴얼을 수립했습니다."
      },
      result: {
        summary: "유틸리티 NFT 5,476,972개 민팅 완판을 달성하고, 2,000개 이상의 노드 판매를 통해 안정적인 서비스 인프라를 구축했습니다.",
        metrics: [
          { label: "NFT 민팅 실적", value: "5,476,972개", desc: "실제 서비스 혜택과 결합된 유틸리티 판매" },
          { label: "노드 판매", value: "2,000+ 노드", desc: "PrompTale AI 분산 인프라 구축 완수" },
          { label: "활성 지갑 수", value: "837,456개", desc: "글로벌 유저의 폭발적 생태계 참여" }
        ],
        impact: [
          "단순 수집형이 아닌 '실사용 유틸리티' 기반의 성공적인 프로덕트 기획력 입증",
          "생성형 AI 기술과 콘텐츠 플랫폼을 결합한 차세대 비즈니스 모델 구축"
        ]
      },
      myRole: {
        primary: "PrompTale AI 노드 서비스 기획, HYPERCOMIC 리워드 설계 및 유틸리티 NFT 기획",
        responsibilities: [
          "PrompTale AI 작가 화풍 학습 및 분산 노드 관리 화면설계서 작성",
          "HYPERCOMIC 웹툰 리워드 플로우 및 유틸리티 혜택 정책 수립",
          "547만 개 민팅을 견인한 멤버십 온보딩 퍼널 및 랜딩페이지 기획",
          "글로벌 커뮤니티 운영 및 VOC 피드백 수렴"
        ],
        keyTakeaway: "기술적 트렌드에 매몰되지 않고 '유저가 실제로 누리는 혜택과 사용 가치'를 제품에 담아낼 때 대규모 구매와 지속적인 참여가 일어남을 확인했습니다."
      }
    },
    {
      id: "proj-4",
      number: "04",
      title: "nfTTcity & 가상 부동산 메타버스 플랫폼",
      subtitle: "3분 만에 NFT 완판을 기록한 메타버스 연계 유틸리티 기획 및 4만 글로벌 유저 온보딩",
      category: ["메타버스", "가상 부동산", "nfTTcity", "온보딩 퍼널", "다국어 UX"],
      period: "2021. 09 — 2023. 05",
      thumbnailUrl: "",
      metric: "3분 만에 완판",
      metricLabel: "40,000+ 글로벌 사전 등록",
      summary: "이엘그룹(이엘파크)에서 메타버스 내 실제 캐릭터 아바타로 활용되는 독점 혜택의 'nfTTcity' 프로젝트를 기획하여 3분 만에 NFT 완판 및 4만 명 이상의 글로벌 사전 등록을 이끌었으며, 더퓨쳐컴퍼니에서 가상 부동산 플랫폼 'Metaverse2(메타버스2)'의 웹사이트 기획과 다국어 로컬라이제이션을 수행했습니다.",
      artifacts: [
        {
          id: "metaverse2-art-1",
          type: "wireframe",
          title: "Metaverse 2 (Rule the World) 가상 부동산 웹 플랫폼 & 키비주얼",
          description: "지구를 1:1 스케일로 구현하여 가상 토지 타일을 거래하고 도시를 건설·운영하는 Metaverse 2의 글로벌 론칭 키비주얼 및 영/일/한 3개 국어 포털 UX 기획",
          imageUrl: "",
          tag: "Metaverse 2 플랫폼 기획",
          keyInsight: "해외 유저와 국내 유저가 직관적으로 가상 부동산 세계관을 이해할 수 있도록 3D 지구본과 도시 랜드마크를 결합한 정보 구조 수립"
        }
      ],
      overview: {
        project: "nfTTcity & Metaverse2",
        company: "이엘그룹(이엘파크) / 더퓨쳐컴퍼니 / ㈜위즈블",
        duration: "2021. 09 — 2023. 05",
        role: "Service & Business Strategy Planner",
        platform: "Web Portal / Global Metaverse Platform",
        team: "전략기획 2명, 디자이너 2명, 개발팀 4명"
      },
      background: "메타버스와 가상 부동산 시장이 폭발적으로 태동하던 시기, 단순 가상 공간을 넘어 실제 사용자가 몰입할 수 있는 캐릭터 유틸리티와 신뢰할 수 있는 웹 플랫폼 환경이 필요했습니다.",
      problem: [
        "메타버스 플랫폼 초기 론칭 시 글로벌 사용자 유입 및 지속적 인지도 확보의 한계",
        "NFT 구매 후 실제 메타버스 플랫폼 내에서 활용할 수 있는 실질적 유틸리티 부재",
        "해외 사용자 대상의 영문/일문 다국어 서비스 환경 및 커뮤니케이션 부재"
      ],
      approach: [
        "nfTTcity: 메타버스 내에서 실제 플레이어 캐릭터로 사용 가능한 3D 아바타 유틸리티 기획",
        "단 3분 만에 전량 소진을 이끈 사전 바이럴 캠페인 및 카운트다운 론칭 웹사이트 구축",
        "Metaverse2: earth2.io 모델의 가상 부동산 타일 거래 웹 기획 및 영/일 다국어 완벽 로컬라이제이션"
      ],
      planning: {
        serviceStructure: "웹 포털을 허브로 하여 메타버스 세계관 소개, 사전 등록 이벤트, NFT 민팅, 글로벌 커뮤니티가 유기적으로 연결된 정보 구조를 수립했습니다.",
        userFlow: "사전 마케팅 유입 → 1-클릭 화이트리스트 등록 → 민팅 당일 1-클릭 구매 → 메타버스 캐릭터 보유 인증 및 커뮤니티 참여",
        informationArchitecture: "홈 / 세계관 및 캐릭터 / 민팅 센터 / 로드맵 / 글로벌 커뮤니티",
        details: [
          "nfTTcity 캐릭터 등급별 메타버스 플랫폼 내 독점 혜택 및 능력치 정책 수립",
          "영어, 일본어, 한국어 3개 국어 실시간 로컬라이제이션 가이드",
          "글로벌 서비스 이용약관 및 커뮤니티 가이드라인 정립"
        ]
      },
      uiux: {
        wireframeNotes: "메타버스 세계관을 전달하는 감각적인 비주얼과 깔끔한 정보 배치를 조화시켰습니다.",
        screenPlanning: "민팅 당일 카운트다운 타이머와 실시간 잔여 수량을 직관적으로 시각화하여 몰입감을 극대화했습니다.",
        interaction: "완판 시 즉각적인 축하 모달과 원클릭 소셜 공유 버튼을 제공했습니다.",
        highlights: [
          "단 3분 만에 트래픽 피크를 감당한 안정적 웹 UI",
          "영/일/한 다국어 즉시 전환 시스템",
          "글로벌 커뮤니티(Twitter/Discord) 연동 위젯"
        ]
      },
      collaboration: {
        designer: "메타버스 캐릭터 키 비주얼과 UI 에셋을 디자이너와 실시간 검수했습니다.",
        developer: "트래픽 폭주에 대비한 페이지 캐싱 및 성능 최적화를 개발팀과 사전 조율했습니다.",
        marketing: "인플루언서 릴레이 프로모션 및 에어드롭 이벤트를 정밀하게 스케줄링했습니다.",
        operations: "론칭 당일 글로벌 디스코드 채널에서 3개 국어로 실시간 유저 문의를 대응했습니다."
      },
      result: {
        summary: "nfTTcity 론칭 단 3분 만에 NFT 완판을 기록하고, 4만 명 이상의 글로벌 활성 커뮤니티를 성공적으로 구축했습니다.",
        metrics: [
          { label: "NFT 완판 기록", value: "3분 만에 완판", desc: "1차 론칭 당시 전량 조기 소진" },
          { label: "사전 등록 유저", value: "40,000+명", desc: "소셜 바이럴 캠페인 기반 대규모 유입" },
          { label: "후속 판매율", value: "86.6%", desc: "7,500개 중 6,500개 조기 판매 달성" }
        ],
        impact: [
          "실제 서비스 내 활용성(Utility)을 갖춘 메타버스 프로젝트 기획력 입증",
          "가상 부동산 및 메타버스 플랫폼의 다국어 글로벌 론칭 프로세스 완수"
        ]
      },
      myRole: {
        primary: "nfTTcity 유틸리티 기획, 론칭 웹사이트 기획 및 글로벌 커뮤니케이션 리드",
        responsibilities: [
          "메타버스 플랫폼 및 론칭 웹사이트 정보구조(IA)와 화면설계서 작성",
          "캐릭터 유틸리티 혜택 정의 및 4만 유저 온보딩 퍼널 설계",
          "영문/일문 전략 기획서 및 다국어 콘텐츠 검수",
          "글로벌 커뮤니티 운영 및 이벤트 총괄"
        ],
        keyTakeaway: "가상 자산과 플랫폼의 성공은 실질적인 활용 가치와 철저한 론칭 UX 설계에서 비롯됨을 실증했습니다."
      }
    }
  ],
  howIWork: [
    {
      step: "01",
      title: "비즈니스 모델 & 요구사항 정의 (PRD)",
      subtitle: "Why & What First",
      description: "화면을 그리기 전, 서비스가 해결하려는 핵심 문제와 비즈니스 목적을 명확히 정의합니다. 기능 명세서(PRD)와 정책서를 통해 팀 전체의 정렬을 이끕니다."
    },
    {
      step: "02",
      title: "정보구조(IA) & 백오피스 설계",
      subtitle: "Structure & Operations",
      description: "사용자가 마주할 화면뿐만 아니라, 백오피스 운영진이 데이터를 어떻게 관리하고 처리할지 데이터 흐름과 어드민 동선을 사전에 구조화합니다."
    },
    {
      step: "03",
      title: "와이어프레임 & 마크업 프로토타입",
      subtitle: "Figma & HTML/CSS",
      description: "Figma를 통한 정밀한 스토리보드와 상태별 예외 처리를 명세화합니다. 필요 시 HTML/CSS 마크업 프로토타입을 직접 작성하여 개발팀과의 커뮤니케이션 비용을 줄입니다."
    },
    {
      step: "04",
      title: "개발 협업 & 정밀 QA",
      subtitle: "Engineering Alignment",
      description: "개발 구현 제약과 API 통신 규격을 함께 논의하며, 엣지 케이스를 빠짐없이 검증하여 런칭 시점의 결함을 최소화합니다."
    },
    {
      step: "05",
      title: "서비스 론칭 & VOC 피드백 루프",
      subtitle: "Continuous Improvement",
      description: "출시 후 고객 문의(VOC)와 운영 데이터를 정량 분석하여 백오피스 병목을 해소하고 다음 스프린트 개선 과제로 연결합니다."
    },
    {
      step: "06",
      title: "데이터 분석 & 그로스 이터레이션",
      subtitle: "Data & Growth",
      description: "핵심 지표(AARRR, 퍼널 전환율) 분석을 통해 온보딩 이탈을 줄이고, 서비스의 지속 가능한 성장을 위한 지표 기반 기획을 반복합니다."
    }
  ]
};
