import heroImage from '../assets/hero-nevada-stem.png';

const imageUrls = {
  lab:
    'https://images.pexels.com/photos/6208709/pexels-photo-6208709.jpeg?cs=srgb&dl=pexels-cottonbro-6208709.jpg&fm=jpg',
  canyon:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg/1280px-Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg',
  drone:
    'https://images.pexels.com/photos/5734963/pexels-photo-5734963.jpeg?cs=srgb&dl=pexels-ramazannatass-5734963.jpg&fm=jpg',
  lecture:
    'https://images.pexels.com/photos/8197558/pexels-photo-8197558.jpeg?cs=srgb&dl=pexels-yankrukov-8197558.jpg&fm=jpg',
} as const;

export const programModules = [
  {
    id: 'overview',
    eyebrow: '미국 네바다',
    title: 'AI STEM 글로벌 윈터 캠프',
    description:
      'DRI 미국 사막연구소와 UNLV/UNR 네트워크에서 실전 연구와 AI 프로젝트를 경험합니다.',
    imageUrl: heroImage,
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
      '강민곤, 손영권, 박정원 교수진과 게스트 강사가 STEM 진로와 AI 트렌드를 다룹니다.',
    imageUrl: imageUrls.lecture,
    href: '/program/professor-lecture',
    points: ['AI/ML 특강', 'STEM 진로 특강', '실리콘밸리 AI와 항공우주 게스트 세션'],
  },
] as const;

export const detailPages = [
  ...programModules,
  {
    id: 'tuition',
    eyebrow: 'CAMP FEE',
    title: '참가비 세부사항',
    description:
      '$4,800 / ₩7,200,000 기준이며 항공권은 별도 구매입니다. 포함 내역과 할인 조건은 최종 안내서 기준으로 업데이트됩니다.',
    imageUrl: heroImage,
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

export const campContent = {
  title: '2027 네바다 AI STEM 글로벌 윈터 캠프',
  heroImage,
  heroKicker: '미국 네바다',
  heroTitleLine1: 'AI STEM',
  heroTitleLine2: '글로벌 윈터 캠프',
  heroCopy: 'DRI 미국 사막연구소와 UNLV/UNR 네트워크에서 실전 연구와 AI 프로젝트를 경험합니다.',
  applicationNotice:
    '정원 10명. 접수 순서대로 마감됩니다. 마감 후 대기자 명단으로 전환됩니다.',
  period: {
    label: '캠프 기간',
    date: '2027년 1월 11일(월) ~ 1월 19일(화)',
    note: '7박 9일 · 미국 네바다 라스베가스 · DRI × UNLV / UNR',
  },
  quickFacts: [
    { label: '대상', value: '초5~중3', note: '만 11~16세' },
    { label: '정원', value: '10명', note: '오프라인 한정' },
    { label: '참가비', value: '$4,800', note: '₩7,200,000 · 항공권 별도' },
  ],
  activities: [
    programModules[1],
    programModules[2],
    programModules[3],
    programModules[4],
  ],
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
