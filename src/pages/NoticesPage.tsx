import { ArrowLeft } from 'lucide-react';

const noticeItems = [
  {
    number: '13',
    label: '모집',
    title: '2027 Winter Camp 정원 10명 선착순 접수',
    description: '소수정예 운영을 위해 정원 마감 후 대기자 명단으로 전환됩니다.',
    date: '2026-06-05',
  },
  {
    number: '12',
    label: '일정',
    title: '1월 11일 출국, 1월 19일 인천 도착',
    description: '항공편 확정 후 보호자에게 세부 체크인 안내를 개별 전달합니다.',
    date: '2026-06-05',
  },
  {
    number: '11',
    label: '준비',
    title: '여권, ESTA, 여행자보험 확인 안내',
    description: '출국 전 필수 서류와 준비물 체크리스트는 등록 확정 후 발송됩니다.',
    date: '2026-06-04',
  },
  {
    number: '10',
    label: '학습',
    title: 'DRI STEM Lab 3일 집중 과정 안내',
    description: '전기회로, Micro:bit, 사막 생태, 현미경, AI 데이터 분석으로 구성됩니다.',
    date: '2026-06-04',
  },
  {
    number: '09',
    label: '견학',
    title: '후버댐 + 그랜드캐년 필드러닝 안내',
    description: '댐 공학, 수력발전, 자연 지질 학습을 하루 일정으로 연결합니다.',
    date: '2026-06-03',
  },
] as const;

export function NoticesPage() {
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

      <div className="board-search">
        <span>키워드를 입력해 주세요</span>
        <button type="button">검색</button>
      </div>

      <div className="board-table">
        <div className="board-table__head">
          <span>번호</span>
          <span>구분</span>
          <span>제목</span>
          <span>등록일</span>
        </div>
        {noticeItems.map((notice) => (
          <article className="board-table__row" key={notice.title}>
            <span>{notice.number}</span>
            <span>{notice.label}</span>
            <strong>{notice.title}</strong>
            <time>{notice.date}</time>
            <p>{notice.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
