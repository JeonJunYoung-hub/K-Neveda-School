import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { isFirebaseConfigured, listDocuments } from '../lib/firebaseRest';

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date?: string;
};

const officialMediaReferences = [
  {
    title: 'DRI STEM Education Program',
    description: 'DRI의 STEM 교육 프로그램과 연구기관 기반 교육 흐름',
    href: 'https://www.dri.edu/stem-education-program/',
    imageUrl: 'https://www.dri.edu/wp-content/uploads/Intro-to-Aviation-STEM.jpg',
  },
  {
    title: 'BattleBots Destruct-A-Thon',
    description: '로봇 공학과 설계 전략을 현장에서 보는 라스베가스 프로그램',
    href: 'https://battlebots.com/tickets/',
    imageUrl: '/media/battlebots-destruct.png',
  },
  {
    title: 'Grand Canyon Field Learning',
    description: '네바다·애리조나 자연 지형 관찰 자료',
    href: 'https://www.nps.gov/grca/',
    imageUrl: '/media/grand-canyon-field.png',
  },
  {
    title: 'Hoover Dam Engineering',
    description: '구조물과 에너지 시스템을 연결하는 STEM 필드러닝',
    href: 'https://www.usbr.gov/lc/hooverdam/',
    imageUrl: '/media/hoover-dam-field.png',
  },
  {
    title: 'SEDS UNLV',
    description: 'UNLV 항공우주·공학 학생 활동 참고',
    href: 'https://sedsunlv.org/',
    imageUrl: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

export function MediaPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      return;
    }

    listDocuments<GalleryItem>('media')
      .then((items) => setGalleryItems(items.sort((a, b) => (b.date || '').localeCompare(a.date || ''))))
      .catch(() => setGalleryItems([]));
  }, []);

  const filteredItems = galleryItems.filter((item) => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) {
      return true;
    }

    return `${item.title} ${item.description}`.toLowerCase().includes(keyword);
  });

  return (
    <section className="camp-intro-page board-page">
      <a className="back-link" href="/">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <div className="board-hero">
        <p className="eyebrow">Video & Gallery</p>
        <h1>영상 및 갤러리</h1>
        <p>영상과 사진 게시글로 캠프 현장 분위기를 확인할 수 있습니다.</p>
      </div>

      <div className="board-toolbar">
        <div className="board-search">
          <input
            aria-label="영상 및 갤러리 검색"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="키워드를 입력해 주세요"
            type="search"
            value={searchQuery}
          />
          <button type="button">검색</button>
        </div>
      </div>

      <div className="media-video">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          src="https://www.youtube.com/embed/u0qFC3z4IKI"
          title="K-Nevada Camp 소개 영상"
        />
      </div>

      <section className="official-media-section">
        <div className="section-title">
          <p className="eyebrow">Official References</p>
          <h2>공식 참고 자료</h2>
          <p>DRI STEM Program, BattleBots, Grand Canyon, Hoover Dam, SEDS UNLV 자료를 한 항목씩 정리했습니다.</p>
        </div>
        <div className="gallery-list gallery-board-grid">
          {officialMediaReferences.map((item) => (
            <a className="gallery-card official-media-card" href={item.href} key={item.title} rel="noreferrer" target="_blank">
              <img alt="" src={item.imageUrl} />
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
            </a>
          ))}
        </div>
      </section>

      {filteredItems.length > 0 ? (
        <div className="gallery-list gallery-board-grid">
          {filteredItems.map((item) => (
            <figure className="gallery-card" key={item.id}>
              {item.imageUrl && <img alt="" src={item.imageUrl} />}
              <figcaption>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <p className="admin-empty">등록된 영상 및 갤러리 글이 없습니다.</p>
      )}
    </section>
  );
}
