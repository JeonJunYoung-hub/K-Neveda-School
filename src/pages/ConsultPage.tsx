import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { ArrowLeft, MessageCircle, PenLine } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { siteConfig } from '../config/siteConfig';
import { createDocument, isFirebaseConfigured, listDocuments } from '../lib/firebaseRest';

type FaqItem = {
  id: string;
  title: string;
  content?: string;
  answer: string;
  date?: string;
};

export function ConsultPage() {
  const [isWriting, setIsWriting] = useState(false);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      return;
    }

    listDocuments<FaqItem>('faqs')
      .then((items) => setFaqItems(items.sort((a, b) => (b.date || '').localeCompare(a.date || ''))))
      .catch(() => setFaqItems([]));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextItem: FaqItem = {
      answer: '',
      content: String(formData.get('content') || ''),
      date: new Date().toISOString().slice(0, 10),
      id: '',
      title: String(formData.get('title') || ''),
    };

    if (!isFirebaseConfigured()) {
      setSaveMessage('Firebase 설정 전이라 문의를 저장할 수 없습니다.');
      return;
    }

    try {
      const savedItem = await createDocument('faqs', nextItem);
      setFaqItems((items) => [savedItem as FaqItem, ...items]);
      setSaveMessage('상담문의가 등록되었습니다. 운영팀 확인 후 답변드리겠습니다.');
      form.reset();
      setIsWriting(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : '알 수 없는 Firebase 오류입니다.';
      setSaveMessage(`Firebase 저장 실패: ${message}`);
    }
  };

  const filteredItems = faqItems.filter((item) => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) {
      return true;
    }

    return `${item.title} ${item.content || ''} ${item.answer}`.toLowerCase().includes(keyword);
  });

  return (
    <section className="camp-intro-page board-page">
      <a className="back-link" href="/">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <div className="board-hero">
        <p className="eyebrow">Consultation</p>
        <h1>상담 문의 · FAQ</h1>
        <p>캠프 등록 전 자주 묻는 질문과 카카오톡 상담 안내를 확인하세요.</p>
      </div>

      <div className="consult-card-row consult-card-row--two">
        <article>
          <strong>카카오톡 상담</strong>
          <p>카카오톡채널 [{siteConfig.contact.kakaoDisplay}]로 학생 학년, 희망 상담 시간, 문의 내용을 보내주세요.</p>
          <ButtonLink
            className="kakao-chat-button"
            href={siteConfig.contact.kakaoHref}
            rel="noreferrer"
            target="_blank"
            variant="primary"
          >
            <MessageCircle aria-hidden="true" />
            <span>카카오톡 상담하기</span>
          </ButtonLink>
        </article>
        <article>
          <strong>상담 가능 시간</strong>
          <p>모집 기간 중 순차적으로 응답합니다. 남겨주신 문의는 운영팀 확인 후 안내드립니다.</p>
          <span>카카오톡채널 [{siteConfig.contact.kakaoDisplay}]</span>
        </article>
      </div>

      <div className="board-toolbar">
        <div className="board-search">
          <input
            aria-label="FAQ 검색"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="FAQ 키워드를 입력해 주세요"
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
          <label className="board-write-form__wide">
            <span>내용</span>
            <textarea name="content" required rows={5} />
          </label>
          <button type="submit">등록하기</button>
        </form>
      )}
      {saveMessage && <p className="board-save-message">{saveMessage}</p>}

      <div className="board-table faq-table">
        <div className="board-table__head">
          <span>번호</span>
          <span>질문</span>
          <span>답변</span>
        </div>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <details className="board-table__row board-table__row--expandable" key={item.id}>
              <summary>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
                <span className="board-row-toggle">{item.answer ? '답변 완료' : '답변 대기'}</span>
              </summary>
              <div className="board-row-detail">
                <article className="board-detail-card board-detail-card--qa">
                  <section>
                    <b>문의 내용</b>
                    <p>{item.content || item.title}</p>
                  </section>
                  <section>
                    <b>답변</b>
                    <p>{item.answer || '아직 답변이 등록되지 않았습니다.'}</p>
                  </section>
                </article>
              </div>
            </details>
          ))
        ) : (
          <p className="admin-empty">등록된 상담문의가 없습니다.</p>
        )}
      </div>
    </section>
  );
}
