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
    title: 'DRI Robotics & STEM',
    description: '로봇, 드론, STEM 실습 자료 참고',
    href: 'https://www.dri.edu/stem-education-program/',
    imageUrl: 'https://www.dri.edu/wp-content/uploads/NVRoboticsHappenings1230x628-Web.jpg',
  },
  {
    title: 'BattleBots Destruct-A-Thon',
    description: '로봇 공학과 설계 전략을 현장에서 보는 라스베가스 프로그램',
    href: 'https://battlebots.com/tickets/',
    imageUrl: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Grand Canyon National Park',
    description: '그랜드캐년 자연 지질과 필드러닝 참고',
    href: 'https://www.nps.gov/grca/',
    imageUrl: 'https://www.nps.gov/common/uploads/grid_builder/grca/crop16_9/6407EF55-1DD8-B71B-0B01519F6E2B6D08.jpg',
  },
  {
    title: 'Grand Canyon Field Learning',
    description: '네바다·애리조나 자연 지형 관찰 자료',
    href: 'https://www.nps.gov/grca/',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg/1280px-Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg',
  },
  {
    title: 'Hoover Dam',
    description: '댐 공학, 수력발전, 현장 견학 참고',
    href: 'https://www.usbr.gov/lc/hooverdam/',
    imageUrl: 'https://www.usbr.gov/lc/hooverdam/images/hoover-dam-aerial.jpg',
  },
  {
    title: 'Hoover Dam Engineering',
    description: '구조물과 에너지 시스템을 연결하는 STEM 필드러닝',
    href: 'https://www.usbr.gov/lc/hooverdam/',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Hoover_Dam_from_air_2012.jpg/1280px-Hoover_Dam_from_air_2012.jpg',
  },
  {
    title: 'SEDS UNLV',
    description: 'UNLV 항공우주·공학 학생 활동 참고',
    href: 'https://sedsunlv.org/',
    imageUrl: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Drone & AI Workshop',
    description: 'UAV 자율비행과 AI 알고리즘 실습 이미지',
    href: 'https://sedsunlv.org/',
    imageUrl: 'https://images.pexels.com/photos/5734963/pexels-photo-5734963.jpeg?cs=srgb&dl=pexels-ramazannatass-5734963.jpg&fm=jpg',
  },
  {
    title: 'STEM Mentoring',
    description: '소수정예 멘토링과 팀 프로젝트 분위기',
    href: 'https://www.dri.edu/stem-education-program/',
    imageUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?cs=srgb&dl=pexels-max-fischer-5212345.jpg&fm=jpg',
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
          <p>DRI STEM Program, BattleBots, Grand Canyon, Hoover Dam, SEDS UNLV 자료를 참고한 이미지 카드입니다.</p>
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
