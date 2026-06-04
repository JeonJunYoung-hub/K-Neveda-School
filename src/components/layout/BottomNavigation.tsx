import { ClipboardPenLine, Headphones, Home, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

type BottomNavigationProps = {
  currentPath: string;
};

export function BottomNavigation({ currentPath }: BottomNavigationProps) {
  const items = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: currentPath !== '/apply',
    },
    {
      label: '전화상담',
      href: siteConfig.contact.phoneHref,
      icon: Headphones,
      isActive: false,
    },
    {
      label: '카톡상담',
      href: siteConfig.contact.kakaoHref,
      icon: MessageCircle,
      isActive: false,
      isExternal: true,
    },
    {
      label: '캠프신청',
      href: '/apply',
      icon: ClipboardPenLine,
      isActive: currentPath === '/apply',
      isApply: true,
    },
  ];

  return (
    <nav className="bottom-nav" aria-label="Quick actions">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <a
            className={`bottom-nav__item${item.isActive ? ' is-active' : ''}${
              item.isApply ? ' is-apply' : ''
            }`}
            href={item.href}
            key={item.label}
            rel={item.isExternal ? 'noreferrer' : undefined}
            target={item.isExternal ? '_blank' : undefined}
          >
            <Icon aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
