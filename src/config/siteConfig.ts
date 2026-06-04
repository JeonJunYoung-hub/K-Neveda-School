export const siteConfig = {
  name: 'K-Nevada-School',
  logoTitle: 'K-Nevada Camp School',
  logoSubtitle: '주립대학 UNR · UNLV, 주립연구소 DRI Collaboration',
  primaryAction: {
    label: '캠프 신청하기',
    href: '/apply',
  },
  navigation: [
    { label: '캠프소개', href: '/program/overview' },
    { label: '일정표', href: '/program/schedule' },
    { label: '참가비', href: '/program/tuition' },
    { label: '상담문의', href: '#contact' },
  ],
  contact: {
    phoneHref: 'tel:+821000000000',
    phoneDisplay: '010-0000-0000',
    kakaoHref: 'https://open.kakao.com/o/REPLACE_WITH_KAKAO_CHAT_CODE',
    kakaoDisplay: 'Kakao ID 준비중',
    applicationEmail: 'apply@k-nevada-camp.com',
  },
  footerNote: 'DRI × UNLV / UNR 기반 캠프 안내 사이트 초안',
} as const;
