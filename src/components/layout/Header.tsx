import { Menu, MessageCircle, Search, X } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';

type HeaderProps = {
  currentPath: string;
};

export function Header({ currentPath }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = currentPath === '/';

  return (
    <header className="site-header" id="top">
      <button
        aria-expanded={isMenuOpen}
        aria-label="메뉴 열기"
        className="icon-button"
        onClick={() => setIsMenuOpen((value) => !value)}
        type="button"
      >
        {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <div className="desktop-brand-zone">
        <a className="brand-mark" href="/" aria-label={`${siteConfig.name} home`}>
          <strong>{siteConfig.logoTitle}</strong>
          <span>{siteConfig.logoSubtitle}</span>
        </a>
      </div>

      <div className="desktop-search" aria-label="검색">
        <span>캠프 정보를 검색하세요!</span>
        <Search aria-hidden="true" />
      </div>

      <a className="desktop-kakao-cta" href="/consult">
        <MessageCircle aria-hidden="true" />
        <span>카카오톡 상담</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {siteConfig.navigation.map((item) => (
          <a
            className={item.href === '/apply' ? 'desktop-nav__apply' : undefined}
            href={item.href.startsWith('#') && !isHomePage ? `/${item.href}` : item.href}
            key={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {isMenuOpen && (
        <nav className="mobile-menu" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => (
            <a
              href={item.href.startsWith('#') && !isHomePage ? `/${item.href}` : item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
