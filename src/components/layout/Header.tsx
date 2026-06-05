import { Headphones, Menu, Search, X } from 'lucide-react';
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

      <div className="desktop-support">
        <span>
          고객센터 이용안내
          <Headphones aria-hidden="true" />
        </span>
        <strong>02-302-8560</strong>
      </div>

      <div className="flag-stack" aria-label="미국과 대한민국 협력 프로그램 안내">
        <span aria-label="미국 국기" className="flag-us" role="img" />
        <img alt="대한민국 국기" className="flag-kr-image" src="/korea-flag.svg" />
      </div>

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

      <div className="desktop-subnav" aria-label="보조 메뉴">
        <a href="/consult">카카오톡 상담</a>
        <span aria-hidden="true">▾</span>
        <i />
        <a href="#contact">고객센터</a>
      </div>

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
