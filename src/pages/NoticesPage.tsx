import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { ArrowLeft, PenLine } from 'lucide-react';
import { createDocument, isFirebaseConfigured, listDocuments } from '../lib/firebaseRest';

type NoticeItem = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  date: string;
};

const defaultNoticeItems: NoticeItem[] = [
  {
    id: 'notice-13',
    number: '13',
    label: '모집',
    title: '2027 Winter Camp 정원 10명 선착순 접수',
    description: '소수정예 운영을 위해 정원 마감 후 대기자 명단으로 전환됩니다.',
    date: '2026-06-05',
  },
  {
    id: 'notice-12',
    number: '12',
    label: '일정',
    title: '1월 11일 출국, 1월 19일 인천 도착',
    description: '항공편 확정 후 보호자에게 세부 체크인 안내를 개별 전달합니다.',
    date: '2026-06-05',
  },
  {
    id: 'notice-11',
    number: '11',
    label: '준비',
    title: '여권, ESTA, 여행자보험 확인 안내',
    description: '출국 전 필수 서류와 준비물 체크리스트는 등록 확정 후 발송됩니다.',
    date: '2026-06-04',
  },
  {
    id: 'notice-10',
    number: '10',
    label: '학습',
    title: 'DRI STEM Lab 3일 집중 과정 안내',
    description: '전기회로, Micro:bit, 사막 생태, 현미경, AI 데이터 분석으로 구성됩니다.',
    date: '2026-06-04',
  },
  {
    id: 'notice-09',
    number: '09',
    label: '견학',
    title: '후버댐 + 그랜드캐년 필드러닝 안내',
    description: '댐 공학, 수력발전, 자연 지질 학습을 하루 일정으로 연결합니다.',
    date: '2026-06-03',
  },
];

const noticeStorageKey = 'k-nevada-notice-posts';

export function NoticesPage() {
  const [isWriting, setIsWriting] = useState(false);
  const [customNoticeItems, setCustomNoticeItems] = useState<NoticeItem[]>([]);
  const [remoteNoticeItems, setRemoteNoticeItems] = useState<NoticeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem(noticeStorageKey);
    if (saved) {
      try {
        setCustomNoticeItems(JSON.parse(saved) as NoticeItem[]);
      } catch {
        setCustomNoticeItems([]);
      }
    }

    if (!isFirebaseConfigured()) {
      return;
    }

    listDocuments<NoticeItem>('notices')
      .then((items) => setRemoteNoticeItems(items.sort((a, b) => b.date.localeCompare(a.date))))
      .catch(() => undefined);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextItem: NoticeItem = {
      id: `notice-${Date.now()}`,
      number: String(defaultNoticeItems.length + customNoticeItems.length + 1).padStart(2, '0'),
      label: String(formData.get('label') || '공지'),
      title: String(formData.get('title') || ''),
      description: String(formData.get('description') || ''),
      date: new Date().toISOString().slice(0, 10),
    };

    if (isFirebaseConfigured()) {
      try {
        const savedItem = await createDocument('notices', nextItem);
        setRemoteNoticeItems((items) => [savedItem as NoticeItem, ...items]);
        setSaveMessage('공지사항이 등록되었습니다.');
      } catch {
        setSaveMessage('Firebase 저장에 실패해 현재 브라우저에 임시 저장했습니다.');
        const nextItems = [nextItem, ...customNoticeItems];
        setCustomNoticeItems(nextItems);
        window.localStorage.setItem(noticeStorageKey, JSON.stringify(nextItems));
      }
    } else {
      const nextItems = [nextItem, ...customNoticeItems];
      setCustomNoticeItems(nextItems);
      window.localStorage.setItem(noticeStorageKey, JSON.stringify(nextItems));
      setSaveMessage('Firebase 설정 전이라 현재 브라우저에 임시 저장했습니다.');
    }

    form.reset();
    setIsWriting(false);
  };

  const noticeItems = [...remoteNoticeItems, ...customNoticeItems, ...defaultNoticeItems].filter((notice) => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) {
      return true;
    }

    return `${notice.label} ${notice.title} ${notice.description}`.toLowerCase().includes(keyword);
  });

  return (
    <section className="camp-intro-page board-page">
      <a className="back-link" href="/">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <div className="board-hero">
        <p className="eyebrow">Notice Board</p>
        <h1>공지사항</h1>
        <p>캠프 모집, 일정, 준비사항 등 최신 안내를 확인하세요.</p>
      </div>

      <div className="board-toolbar">
        <div className="board-search">
          <input
            aria-label="공지사항 검색"
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
            <span>구분</span>
            <input name="label" placeholder="공지" type="text" />
          </label>
          <label>
            <span>제목</span>
            <input name="title" required type="text" />
          </label>
          <label className="board-write-form__wide">
            <span>내용</span>
            <textarea name="description" required rows={5} />
          </label>
          <button type="submit">등록하기</button>
        </form>
      )}
      {saveMessage && <p className="board-save-message">{saveMessage}</p>}

      <div className="board-table">
        <div className="board-table__head">
          <span>번호</span>
          <span>구분</span>
          <span>제목</span>
          <span>등록일</span>
        </div>
        {noticeItems.map((notice) => (
          <details className="board-table__row board-table__row--expandable" key={notice.id}>
            <summary>
              <span>{notice.number}</span>
              <span>{notice.label}</span>
              <strong>{notice.title}</strong>
              <time>{notice.date}</time>
            </summary>
            <div className="board-row-detail">
              <p>{notice.description}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
