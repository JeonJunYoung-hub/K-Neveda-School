import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { isFirebaseConfigured, listDocuments } from '../lib/firebaseRest';

type NoticeItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  date: string;
};

export function NoticesPage() {
  const [noticeItems, setNoticeItems] = useState<NoticeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      return;
    }

    listDocuments<NoticeItem>('notices')
      .then((items) => setNoticeItems(items.sort((a, b) => (b.date || '').localeCompare(a.date || ''))))
      .catch(() => setNoticeItems([]));
  }, []);

  const filteredItems = noticeItems.filter((notice) => {
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
      </div>

      <div className="board-table">
        <div className="board-table__head">
          <span>번호</span>
          <span>구분</span>
          <span>제목</span>
          <span>등록일</span>
        </div>
        {filteredItems.length > 0 ? (
          filteredItems.map((notice, index) => (
            <details className="board-table__row board-table__row--expandable" key={notice.id}>
              <summary>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{notice.label || '공지'}</span>
                <strong>{notice.title}</strong>
                <time>{notice.date}</time>
              </summary>
              <div className="board-row-detail">
                <article className="board-detail-card">
                  <header>
                    <span>{notice.label || '공지'}</span>
                    <strong>{notice.title}</strong>
                    <time>{notice.date}</time>
                  </header>
                  <p>{notice.description}</p>
                </article>
              </div>
            </details>
          ))
        ) : (
          <p className="admin-empty">등록된 공지사항이 없습니다.</p>
        )}
      </div>
    </section>
  );
}
