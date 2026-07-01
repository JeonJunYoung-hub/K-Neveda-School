import heroImage from '../assets/hero-nevada-stem.png';

const imageUrls = {
  lab:
    'https://images.pexels.com/photos/6208709/pexels-photo-6208709.jpeg?cs=srgb&dl=pexels-cottonbro-6208709.jpg&fm=jpg',
  canyon:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg/1280px-Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg',
  drone: '/media/drone-hero.png',
  lecture:
    'https://images.pexels.com/photos/8197558/pexels-photo-8197558.jpeg?cs=srgb&dl=pexels-yankrukov-8197558.jpg&fm=jpg',
  professor:
    'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?cs=srgb&dl=pexels-yankrukov-8199562.jpg&fm=jpg',
  mentor:
    'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?cs=srgb&dl=pexels-max-fischer-5212345.jpg&fm=jpg',
  coordinator:
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?cs=srgb&dl=pexels-fauxels-3184292.jpg&fm=jpg',
  battlebots:
    'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=900',
} as const;

export const programModules = [
  {
    id: 'overview',
    eyebrow: '미국 네바다',
    title: 'AI STEM 글로벌 윈터 캠프',
    description:
      'DRI 미국 사막연구소와 UNLV/UNR 네트워크에서 실전 연구와 AI 프로젝트를 경험합니다.',
    imageUrl: '/media/hero-ai-stem-campus.png',
    href: '/program/overview',
    points: ['오프라인 7박 9일 집중 프로그램', '초5~중3 10명 한정', 'DRI 공식 수료증 제공'],
  },
  {
    id: 'dri-stem-lab',
    eyebrow: 'DRI STEM LAB',
    title: '연구소 실습 중심 STEM Lab',
    description:
      '전기회로, Micro:bit, 사막 생태, 현미경, AI 데이터 분석을 3일 동안 집중 실습합니다.',
    imageUrl: imageUrls.lab,
    href: '/program/dri-stem-lab',
    points: ['전기회로와 센서 데이터 수집', 'Micro:bit 기반 코딩 실험', '현미경 관찰과 AI 데이터 분석'],
  },
  {
    id: 'hoover-grand-canyon',
    eyebrow: 'FIELD TRIP',
    title: '후버댐 + 그랜드캐년 견학',
    description:
      '후버댐 공학 구조와 그랜드캐년 자연 지질을 하루 동안 연결해서 관찰합니다.',
    imageUrl: imageUrls.canyon,
    href: '/program/hoover-grand-canyon',
    points: ['댐 공학과 수력발전 현장 학습', '그랜드캐년 자연 지질 관찰', 'STEM vlog 제작'],
  },
  {
    id: 'drone-ai-workshop',
    eyebrow: 'DRONE & AI',
    title: 'Drone AI 워크숍',
    description:
      'UAV 자율비행, AI 알고리즘, 실전 문제 해결을 연결하는 토요일 집중 워크숍입니다.',
    imageUrl: imageUrls.drone,
    href: '/program/drone-ai-workshop',
    points: ['UAV 자율비행 개념', 'AI 알고리즘 입문', '팀별 실습과 피드백'],
  },
  {
    id: 'professor-lecture',
    eyebrow: 'SPECIAL LECTURE',
    title: '교수님 특강',
    description:
      '교수진과 게스트 강사가 STEM 진로와 AI 트렌드를 다룹니다.',
    imageUrl: imageUrls.lecture,
    href: '/program/professor-lecture',
    points: ['AI/ML 특강', 'STEM 진로 특강', '실리콘밸리 AI와 항공우주 게스트 세션'],
  },
] as const;

export const detailPages = [
  ...programModules.filter((module) => module.id !== 'overview'),
  {
    id: 'tuition',
    eyebrow: 'CAMP FEE',
    title: '참가비 세부사항',
    description:
      '$4,800 / ₩7,200,000 기준이며 항공권은 별도 구매입니다. 포함 내역과 할인 조건은 최종 안내서 기준으로 업데이트됩니다.',
    imageUrl: '/media/tuition-stem-hero.png',
    href: '/program/tuition',
    points: [
      'DRI STEM Lab 3일 집중 과정 포함',
      '후버댐 + 그랜드캐년 종일 견학 포함',
      '현지 식사, 이동, 입장료, 재료비 포함',
      'DRI 공식 수료증과 귀국 후 진로 피드백 포함',
      '항공권은 별도 구매',
    ],
  },
] as const;

export const missionContent = {
  mission:
    '미국 연구기관 현장에서 AI·STEM 실전 경험을 제공해 학생의 탐구력과 글로벌 진로 역량을 키웁니다.',
  vision: '좋은 대학을 넘어, 스스로 연구 질문을 만들고 해결하는 글로벌 STEM 리더로 성장합니다.',
  values: [
    { title: '도전', english: 'Challenge', description: '낯선 연구 환경에서 직접 실험하고 질문합니다.' },
    { title: '탐구', english: 'Inquiry', description: '데이터와 관찰을 바탕으로 문제를 해석합니다.' },
    { title: '존중', english: 'Respect', description: '다양한 배경의 멘토와 동료를 존중합니다.' },
    { title: '협력', english: 'Collaboration', description: '팀 프로젝트로 리더십과 소통을 연습합니다.' },
    { title: '성장', english: 'Growth', description: '귀국 후 진로 로드맵까지 이어갑니다.' },
  ],
} as const;

export const homeCoreValues = [
  {
    number: '①',
    title: '현직 과학자 1:1 멘토링',
    description:
      'DRI 박사진과 UNLV 이공계 멘토 5명이 7박 9일 내내 학생 10명과 직접 함께합니다.',
  },
  {
    number: '②',
    title: 'DRI 공식 수료증',
    description:
      '미국 연구기관 공식 인증 수료증을 진학 포트폴리오 자료로 활용할 수 있습니다.',
  },
  {
    number: '③',
    title: '1:1 진로 로드맵',
    description:
      '귀국 후 2주 내 개별 포트폴리오 피드백과 진로 상담 연 2회 제공.',
  },
] as const;

export const activityHighlights = [
  {
    id: 'dri-stem-lab-highlight',
    eyebrow: 'DRI STEM Lab',
    title: '3일 집중 실험 과정',
    description:
      '전기회로, Micro:bit, 사막 생태, 현미경, AI 데이터 분석까지 실제 연구실 흐름으로 경험합니다.',
    imageUrl: imageUrls.lab,
    href: '/program/dri-stem-lab',
    points: ['전기회로', 'Micro:bit', 'AI 데이터 분석'],
  },
  {
    id: 'hoover-grand-canyon-highlight',
    eyebrow: 'DAY 5',
    title: '후버댐 + 그랜드캐년 종일 견학',
    description:
      '댐 공학·수력발전과 자연·지질 학습을 하루 안에 연결하는 현장 수업입니다.',
    imageUrl: imageUrls.canyon,
    href: '/program/hoover-grand-canyon',
    points: ['댐 공학', '수력발전', '자연·지질 학습'],
  },
  {
    id: 'drone-ai-highlight',
    eyebrow: 'DAY 6',
    title: 'Advanced Drone & AI Workshop',
    description: 'UAV 자율비행과 AI 알고리즘을 직접 다루는 고급 워크숍입니다.',
    imageUrl: imageUrls.drone,
    href: '/program/drone-ai-workshop',
    points: ['UAV 자율비행', 'AI 알고리즘', '팀별 실습'],
  },
  {
    id: 'lecture-highlight',
    eyebrow: 'Special Lecture',
    title: '교수진 3인 + 게스트 강사 2인 특강',
    description: '교수진과 실리콘밸리 AI, 항공우주 특강을 만납니다.',
    imageUrl: imageUrls.lecture,
    href: '/program/professor-lecture',
    points: ['AI/ML', 'STEM 진로', '게스트 특강'],
  },
  {
    id: 'battlebots-highlight',
    eyebrow: 'DAY 7',
    title: 'BattleBots Destruct-A-Thon 현장 관람',
    description: '로봇 공학, 설계, 전략이 실제 경기에서 작동하는 장면을 관람합니다.',
    imageUrl: imageUrls.battlebots,
    href: '/program/schedule',
    points: ['로봇 공학', '설계 전략', '현장 관람'],
  },
  {
    id: 'mentoring-highlight',
    eyebrow: 'Mentoring',
    title: '1:1 수준 밀착 관리',
    description:
      '학생 10명 : 멘토 5명, 운영진 9명 동행으로 성인 대 학생 약 1:1 케어를 제공합니다.',
    imageUrl: imageUrls.mentor,
    href: '/team',
    points: ['2:1 멘토 비율', '운영진 9명 동행', '안전 관리'],
  },
] as const;

export const noticeItems = [
  {
    label: '모집',
    title: '2027 Winter Camp 정원 10명 선착순 접수',
    description: '소수정예 운영을 위해 정원 마감 후 대기자 명단으로 전환됩니다.',
  },
  {
    label: '일정',
    title: '1월 11일 출국, 1월 19일 인천 도착',
    description: '항공편 확정 후 보호자에게 세부 체크인 안내를 개별 전달합니다.',
  },
  {
    label: '준비',
    title: '여권, ESTA, 여행자보험 확인 안내',
    description: '출국 전 필수 서류와 준비물 체크리스트는 등록 확정 후 발송됩니다.',
  },
] as const;

export const galleryItems = [
  {
    title: 'DRI STEM Lab',
    description: '연구소 실험과 데이터 분석 중심 실습',
    imageUrl: imageUrls.lab,
  },
  {
    title: 'Drone & AI Workshop',
    description: 'UAV 자율비행과 AI 알고리즘 워크숍',
    imageUrl: imageUrls.drone,
  },
  {
    title: 'Hoover Dam + Grand Canyon',
    description: '공학과 지질을 연결하는 현장 견학',
    imageUrl: imageUrls.canyon,
  },
  {
    title: 'Mentoring',
    description: '소수정예 학생을 위한 밀착 멘토링',
    imageUrl: imageUrls.mentor,
  },
] as const;

export const leadershipGroups = [
  {
    title: '대표 교수',
    members: [
      {
        name: '한정훈 대표',
        role: 'K-Nevada-Stem Camp 대표',
        imageUrl: imageUrls.professor,
        bio: '현지 총괄 및 안전 책임자로 DRI STEM Lab 전 과정을 이끌고 학생 연구 활동을 밀착 지원합니다.',
        quote: '학생이 직접 질문하고 실험하는 순간, 진짜 진로 탐색이 시작됩니다.',
      },
    ],
  },
  {
    title: '교수진',
    members: [
      {
        name: '강민곤 교수',
        role: 'UNLV Computer Science / DataX Lab Director',
        imageUrl: imageUrls.lecture,
        bio: 'UNLV 시설 및 멘토 연계, AI/ML 특강, 드론·AI 워크숍 자문을 담당합니다.',
        quote: 'AI는 외우는 과목이 아니라 문제를 새롭게 보는 도구입니다.',
      },
      {
        name: '박정원 교수',
        role: '네바다주립대 STEM 교육·진학 전문',
        imageUrl: imageUrls.mentor,
        bio: '캡스톤 프로젝트 심사와 STEM 진로 특강을 통해 학생별 성장 방향을 제시합니다.',
        quote: '좋은 포트폴리오는 결과보다 과정의 깊이를 보여줍니다.',
      },
    ],
  },
  {
    title: '운영진',
    members: [
      {
        name: 'DRI 운영팀',
        role: 'Desert Research Institute Program Team',
        imageUrl: imageUrls.lab,
        bio: 'DRI 공식 STEM 프로그램 운영, 연구소 실습 동선, 수료증 발급 과정을 관리합니다.',
        quote: '안전한 현장 운영 속에서 연구기관의 실제 분위기를 경험하게 합니다.',
      },
      {
        name: 'K-EnterTech Hub',
        role: '프로그램 기획·학부모 커뮤니케이션',
        imageUrl: imageUrls.coordinator,
        bio: '출국 전 안내, 현장 일정 관리, 학부모 소통, 귀국 후 피드백 흐름을 담당합니다.',
        quote: '짧은 캠프가 긴 성장의 출발점이 되도록 설계합니다.',
      },
    ],
  },
] as const;

export const journeyDays = [
  {
    day: 'DAY 1',
    date: '1/11(월)',
    title: '도착 · 오리엔테이션',
    summary: '인천에서 한국 인솔팀과 함께 출국하여 UNLV 기숙사 체크인과 팀 배정을 진행합니다.',
    details: [
      '한국 인솔팀과 함께 인천공항 집결',
      '인천공항 출발 및 라스베가스 도착',
      'UNLV 기숙사 체크인과 생활 안전 안내',
      '프로그램 오리엔테이션, 팀 배정, 캡스톤 프로젝트 개요 설명',
      '사진 추가 예정'
    ],
  },
  {
    day: 'DAY 2',
    date: '1/12(화)',
    title: 'DRI Day 1 - 전기회로',
    summary: '전압, 전류, 저항을 배우고 LED 회로와 계측 장비를 직접 다룹니다.',
    details: [
      'DRI STEM Lab 입소',
      '전기회로 기초와 브레드보드 실습',
      'LED 회로 제작, 멀티미터 측정, 팀별 실험 기록',

    ],
  },
  {
    day: 'DAY 3',
    date: '1/13(수)',
    title: 'DRI Day 2 - 코딩 + 사막 생태',
    summary: 'Micro:bit 센서 실험과 사막 생태 견학을 연결합니다.',
    details: [
      'Micro:bit 기반 코딩과 센서 데이터 수집',
      'Springs Preserve 사막 생태계 견학',
      'STEM vlog 제작과 현장 관찰 노트 작성',
    ],
  },
  {
    day: 'DAY 4',
    date: '1/14(목)',
    title: 'DRI Day 3 - AI & 데이터',
    summary: '현미경 관찰, 과학 데이터 시각화, AI 데이터 분석 입문을 진행합니다.',
    details: [
      '현미경 관찰 실습',
      'Art in Science 과학 데이터 시각화',
      'AI 데이터 분석 입문과 캡스톤 프로젝트 작업',
    ],
  },
  {
    day: 'DAY 5',
    date: '1/15(금)',
    title: '후버댐 + 그랜드캐년',
    summary: '댐 공학과 자연 지질을 하루 동안 현장에서 학습합니다.',
    details: [
      '후버댐 구조, 수력발전, 공학적 설계 관찰',
      '그랜드캐년 이동 및 자연 지질 학습',
      '현장 기록, 사진·영상 기반 STEM vlog 제작',
    ],
  },
  {
    day: 'DAY 6',
    date: '1/16(토)',
    title: 'AI 특강 데이',
    summary: 'Advanced Drone & AI Workshop과 교수진 특강을 집중 배치합니다.',
    details: [
      'UAV 자율비행과 AI 알고리즘 워크숍',
      '강민곤 교수 AI/ML 특강',
      '교수진 및 게스트 강사 특강',
    ],
  },
  {
    day: 'DAY 7',
    date: '1/17(일)',
    title: '캡스톤 발표 + BattleBots',
    summary: '팀별 발표, 피드백, DRI 공식 수료증 수여 후 현장 관람을 진행합니다.',
    details: [
      '팀별 캡스톤 발표와 교수진 피드백',
      'DRI 공식 수료증 수여',
      'BattleBots Destruct-A-Thon 관람 및 수료 축하 디너',
    ],
  },
  {
    day: 'DAY 8',
    date: '1/18(월)',
    title: '귀국길',
    summary: 'LAS에서 출발해 인천행 항공편으로 이동합니다.',
    details: ['기숙사 체크아웃', 'LAS 공항 이동', '인천행 항공편 탑승'],
  },
  {
    day: 'DAY 9',
    date: '1/19(화)',
    title: '인천 도착',
    summary: '인천공항 도착 후 해산합니다.',
    details: ['인천공항 도착', '보호자 인계 및 해산', '귀국 후 피드백 일정 안내'],
  },
] as const;

export const campContent = {
  title: '2027 네바다 AI STEM 글로벌 윈터 캠프',
  heroImage,
  heroKicker: '미국 네바다에서 만나는',
  heroTitleLine1: 'AI STEM',
  heroTitleLine2: '글로벌 캠프',
  heroCopy:
    '네바다 주립대학 UNR · UNLV · 네바다 주립연구소 DRI와 함께 진짜 과학자처럼 연구하고, 드론을 날리고, AI를 만듭니다.',
  applicationNotice:
    '정원 10명. 접수 순서대로 마감됩니다. 마감 후 대기자 명단으로 전환됩니다.',
  period: {
    label: '캠프 기간',
    date: '2027년 1월 11일(월) ~ 1월 19일(화)',
    note: '7박 9일 · 미국 네바다 라스베가스 현지에서 진행 ',
  },
  quickFacts: [
    { label: '과정', value: '7일', note: '집중 과정' },
    { label: '정원', value: '10명', note: '소수정예' },
    { label: '멘토', value: '1:1', note: '밀착 관리' },
  ],
  activities: activityHighlights,
  schedule: [
    { day: 'DAY 1', title: '도착 · OT', detail: 'LAS 도착, UNLV 기숙사 체크인, 팀 배정' },
    { day: 'DAY 2', title: '전기회로', detail: 'LED 회로, 브레드보드, 멀티미터 실습' },
    { day: 'DAY 3', title: '코딩 + 사막 생태', detail: 'Micro:bit 센서 실험, Springs Preserve 견학' },
    { day: 'DAY 4', title: 'AI & 데이터', detail: '현미경 관찰, 과학 데이터 시각화, 캡스톤' },
    { day: 'DAY 5', title: '후버댐 + 그랜드캐년', detail: '공학 견학과 자연 지질 학습' },
    { day: 'DAY 6', title: 'AI 특강 데이', detail: '드론 AI 워크숍, 교수진 3인 특강' },
    { day: 'DAY 7', title: '캡스톤 + BattleBots', detail: '팀 발표, DRI 공식 수료증, 현장 관람' },
  ],
  inclusions: [
    'DRI STEM Lab 3일 집중 과정',
    '후버댐 + 그랜드캐년 종일 견학',
    'Advanced Drone & AI Workshop',
    '교수진 3인 + 게스트 강사 2인 특강',
    '현지 식사, 이동, 입장료, 재료비',
    'DRI 공식 수료증과 귀국 후 진로 피드백',
  ],
} as const;
