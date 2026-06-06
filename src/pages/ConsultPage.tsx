import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { ArrowLeft, MessageCircle, PenLine } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { createDocument, isFirebaseConfigured, listDocuments } from '../lib/firebaseRest';

type FaqItem = {
  id: string;
  number: string;
  title: string;
  answer: string;
};

const defaultFaqItems: FaqItem[] = [
  {
    id: 'faq-01',
    number: '01',
    title: '대상 학년은 어떻게 되나요?',
    answer: '초등학교 5학년부터 중학교 3학년까지 10명 소수정예로 운영합니다.',
  },
  {
    id: 'faq-02',
    number: '02',
    title: '멘토 비율은 어떻게 운영되나요?',
    answer: '학생 10명 기준 멘토 5명과 운영진 9명이 동행해 학습과 생활을 함께 관리합니다.',
  },
  {
    id: 'faq-03',
    number: '03',
    title: '항공권과 서류 준비는 언제 안내되나요?',
    answer: '등록 확정 후 항공권, ESTA, 여행자보험, 준비물 체크리스트를 순차 안내합니다.',
  },
  {
    id: 'faq-04',
    number: '04',
    title: '귀국 후 피드백도 제공되나요?',
    answer: '귀국 후 2주 내 포트폴리오 피드백과 개별 진로 로드맵 안내를 제공합니다.',
  },
];

const faqStorageKey = 'k-nevada-faq-posts';

export function ConsultPage() {
  const [isWriting, setIsWriting] = useState(false);
  const [customFaqItems, setCustomFaqItems] = useState<FaqItem[]>([]);
  const [remoteFaqItems, setRemoteFaqItems] = useState<FaqItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem(faqStorageKey);
    if (saved) {
      try {
        setCustomFaqItems(JSON.parse(saved) as FaqItem[]);
      } catch {
        setCustomFaqItems([]);
      }
    }

    if (!isFirebaseConfigured()) {
      return;
    }

    listDocuments<FaqItem>('faqs')
      .then((items) => setRemoteFaqItems(items.sort((a, b) => b.number.localeCompare(a.number))))
      .catch(() => undefined);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextItem: FaqItem = {
      id: `faq-${Date.now()}`,
      number: String(customFaqItems.length + defaultFaqItems.length + 1).padStart(2, '0'),
      title: String(formData.get('title') || ''),
      answer: String(formData.get('answer') || ''),
    };

    if (isFirebaseConfigured()) {
      try {
        const savedItem = await createDocument('faqs', nextItem);
        setRemoteFaqItems((items) => [savedItem as FaqItem, ...items]);
        setSaveMessage('상담문의 글이 등록되었습니다.');
      } catch {
        setSaveMessage('Firebase 저장에 실패해 현재 브라우저에 임시 저장했습니다.');
        const nextItems = [nextItem, ...customFaqItems];
        setCustomFaqItems(nextItems);
        window.localStorage.setItem(faqStorageKey, JSON.stringify(nextItems));
      }
    } else {
      const nextItems = [nextItem, ...customFaqItems];
      setCustomFaqItems(nextItems);
      window.localStorage.setItem(faqStorageKey, JSON.stringify(nextItems));
      setSaveMessage('Firebase 설정 전이라 현재 브라우저에 임시 저장했습니다.');
    }

    form.reset();
    setIsWriting(false);
  };

  const faqItems = [...remoteFaqItems, ...customFaqItems, ...defaultFaqItems].filter((item) => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) {
      return true;
    }

    return `${item.title} ${item.answer}`.toLowerCase().includes(keyword);
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
          <p>카카오톡채널 [K-Nevada-School]로 학생 학년, 희망 상담 시간, 문의 내용을 보내주세요.</p>
          <ButtonLink href="https://open.kakao.com/o/REPLACE_WITH_KAKAO_CHAT_CODE" variant="primary">
            <MessageCircle aria-hidden="true" />
            <span>카카오톡 상담하기</span>
          </ButtonLink>
        </article>
        <article>
          <strong>상담 가능 시간</strong>
          <p>모집 기간 중 순차적으로 응대합니다. 남겨주신 문의는 운영팀 확인 후 안내드립니다.</p>
          <span>카카오톡채널 [K-Nevada-School]</span>
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
            <span>질문</span>
            <input name="title" required type="text" />
          </label>
          <label>
            <span>답변</span>
            <textarea name="answer" required rows={4} />
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
        {faqItems.map((item) => (
          <details className="board-table__row board-table__row--expandable" key={item.id}>
            <summary>
              <span>{item.number}</span>
              <strong>{item.title}</strong>
              <span className="board-row-toggle">답변 보기</span>
            </summary>
            <div className="board-row-detail">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
