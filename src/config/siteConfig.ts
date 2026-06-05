export const siteConfig = {
  name: 'K-Nevada-School',
  logoTitle: 'K-Nevada-School',
  logoSubtitle: 'UNR & DRI Collaboration 1기',
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
    kakaoHref: 'https://open.kakao.com/o/REPLACE_WITH_KAKAO_CHAT_CODE',
    kakaoDisplay: 'Kakao ID 준비중',
    applicationEmail: 'apply@k-nevada-camp.com',
  },
  footerNote: '네바다 주립대학 UNR · UNLV · 네바다 주립연구소 DRI 기반 캠프 안내',
} as const;
