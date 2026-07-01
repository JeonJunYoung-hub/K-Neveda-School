export const siteConfig = {
  name: 'K-Nevada-Stem Camp 국내 최초, 전 과정 영어로 진행되는 AI 사고력 준비 캠프',
  logoTitle: 'K-Nevada-Stem Camp',
  logoSubtitle: ' 국내 최초, 전 과정 영어로 진행되는 AI 사고력 준비 캠프',
  primaryAction: {
    label: '캠프 신청하기',
    href: '/apply',
  },
  navigation: [
    { label: '캠프소개', href: '/program/overview' },
    { label: '일정표', href: '/program/schedule' },
    { label: '공지사항', href: '/notices' },
    { label: '영상 및 갤러리', href: '/media' },
    { label: '운영팀', href: '/team' },
    { label: '참가비', href: '/program/tuition' },
    { label: '상담문의', href: '/consult' },
    { label: '캠프 신청', href: '/apply' },
  ],
  contact: {
    phoneHref: 'tel:+821000000000',
    phoneDisplay: '010-0000-0000',
    kakaoHref: 'https://pf.kakao.com/_yuZXX',
    kakaoDisplay: 'K-NV-Stem',
    applicationEmail: 'apply@k-nevada-camp.com',
  },
  footerNote: '2026 네바다 AI STEM 글로벌 캠프',
} as const;
