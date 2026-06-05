import type { FormEvent } from 'react';
import { Menu, MessageCircle, Search, X } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';

type HeaderProps = {
  currentPath: string;
};

export function Header({ currentPath }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isHomePage = currentPath === '/';

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return;
    }

    const destination =
      query.includes('일정') || query.includes('schedule')
        ? '/program/schedule'
        : query.includes('참가비') || query.includes('비용') || query.includes('tuition')
          ? '/program/tuition'
          : query.includes('상담') || query.includes('faq')
            ? '/consult'
            : query.includes('신청') || query.includes('apply')
              ? '/apply'
              : query.includes('공지') || query.includes('notice')
                ? '/notices'
                : query.includes('영상') || query.includes('갤러리') || query.includes('media')
                  ? '/media'
                  : query.includes('운영') || query.includes('team')
                    ? '/team'
                    : '/program/overview';

    window.location.href = destination;
  };

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

      <form className="desktop-search" aria-label="검색" onSubmit={handleSearch} role="search">
        <input
          aria-label="캠프 정보 검색"
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="캠프 정보를 검색하세요!"
          type="search"
          value={searchQuery}
        />
        <button aria-label="검색" type="submit">
          <Search aria-hidden="true" />
        </button>
      </form>

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
