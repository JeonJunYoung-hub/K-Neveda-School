import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { ArrowLeft, PenLine } from 'lucide-react';
import { createDocument, isFirebaseConfigured, listDocuments } from '../lib/firebaseRest';

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'gallery-dri',
    title: 'DRI STEM Lab',
    description: '연구소 실험과 데이터 분석 중심 실습',
    imageUrl:
      'https://images.pexels.com/photos/6208709/pexels-photo-6208709.jpeg?cs=srgb&dl=pexels-cottonbro-6208709.jpg&fm=jpg',
  },
  {
    id: 'gallery-drone',
    title: 'Drone & AI Workshop',
    description: 'UAV 자율비행과 AI 알고리즘 워크숍',
    imageUrl:
      'https://images.pexels.com/photos/5734963/pexels-photo-5734963.jpeg?cs=srgb&dl=pexels-ramazannatass-5734963.jpg&fm=jpg',
  },
  {
    id: 'gallery-canyon',
    title: 'Hoover Dam + Grand Canyon',
    description: '공학과 지질을 연결하는 현장 견학',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg/1280px-Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg',
  },
  {
    id: 'gallery-mentoring',
    title: 'Mentoring',
    description: '소수정예 학생을 위한 밀착 멘토링',
    imageUrl:
      'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?cs=srgb&dl=pexels-max-fischer-5212345.jpg&fm=jpg',
  },
];

const galleryStorageKey = 'k-nevada-gallery-posts';

export function MediaPage() {
  const [isWriting, setIsWriting] = useState(false);
  const [customGalleryItems, setCustomGalleryItems] = useState<GalleryItem[]>([]);
  const [remoteGalleryItems, setRemoteGalleryItems] = useState<GalleryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem(galleryStorageKey);
    if (saved) {
      try {
        setCustomGalleryItems(JSON.parse(saved) as GalleryItem[]);
      } catch {
        setCustomGalleryItems([]);
      }
    }

    if (!isFirebaseConfigured()) {
      return;
    }

    listDocuments<GalleryItem>('media')
      .then((items) => setRemoteGalleryItems(items.reverse()))
      .catch(() => undefined);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextItem: GalleryItem = {
      id: `gallery-${Date.now()}`,
      title: String(formData.get('title') || ''),
      description: String(formData.get('description') || ''),
      imageUrl:
        String(formData.get('imageUrl') || '') ||
        'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?cs=srgb&dl=pexels-max-fischer-5212345.jpg&fm=jpg',
    };

    if (isFirebaseConfigured()) {
      try {
        const savedItem = await createDocument('media', nextItem);
        setRemoteGalleryItems((items) => [savedItem as GalleryItem, ...items]);
        setSaveMessage('영상 및 갤러리 글이 등록되었습니다.');
      } catch {
        const nextItems = [nextItem, ...customGalleryItems];
        setCustomGalleryItems(nextItems);
        window.localStorage.setItem(galleryStorageKey, JSON.stringify(nextItems));
        setSaveMessage('Firebase 저장에 실패해 현재 브라우저에 임시 저장했습니다.');
      }
    } else {
      const nextItems = [nextItem, ...customGalleryItems];
      setCustomGalleryItems(nextItems);
      window.localStorage.setItem(galleryStorageKey, JSON.stringify(nextItems));
      setSaveMessage('Firebase 설정 전이라 현재 브라우저에 임시 저장했습니다.');
    }

    form.reset();
    setIsWriting(false);
  };

  const galleryItems = [...remoteGalleryItems, ...customGalleryItems, ...defaultGalleryItems].filter((item) => {
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
        <p>영상과 사진 게시글을 등록해 캠프 현장 분위기를 공유하는 공간입니다.</p>
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
        <button className="board-write-button" onClick={() => setIsWriting((value) => !value)} type="button">
          <PenLine aria-hidden="true" />
          글쓰기
        </button>
      </div>

      {isWriting && (
        <form className="board-write-form" onSubmit={handleSubmit}>
          <label>
            <span>제목</span>
            <input name="title" required type="text" />
          </label>
          <label>
            <span>이미지 주소</span>
            <input name="imageUrl" placeholder="https://..." type="url" />
          </label>
          <label className="board-write-form__wide">
            <span>설명</span>
            <textarea name="description" required rows={4} />
          </label>
          <button type="submit">등록하기</button>
        </form>
      )}
      {saveMessage && <p className="board-save-message">{saveMessage}</p>}

      <div className="media-video">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          src="https://www.youtube.com/embed/u0qFC3z4IKI"
          title="K-Nevada Camp 소개 영상"
        />
      </div>

      <div className="gallery-list gallery-board-grid">
        {galleryItems.map((item) => (
          <figure className="gallery-card" key={item.id}>
            <img alt="" src={item.imageUrl} />
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
