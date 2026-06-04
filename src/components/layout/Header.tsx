import { Menu, X } from 'lucide-react';
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

      <a className="brand-mark" href="/" aria-label={`${siteConfig.name} home`}>
        <strong>{siteConfig.logoTitle}</strong>
        <span>{siteConfig.logoSubtitle}</span>
      </a>

      <span aria-label="United States program" className="flag-us" role="img" />

      {isMenuOpen && (
        <nav className="mobile-menu" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => (
            <a href={isHomePage ? item.href : `/${item.href}`} key={item.href}>
              {item.label}
            </a>
          ))}
          <a href="/apply">캠프신청</a>
        </nav>
      )}
    </header>
  );
}
