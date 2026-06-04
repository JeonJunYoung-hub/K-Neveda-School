import { ArrowLeft } from 'lucide-react';

const noticeItems = [
  {
    label: '모집',
    title: '2027 Winter Camp 정원 10명 선착순 접수',
    description: '소수정예 운영을 위해 정원 마감 후 대기자 명단으로 전환됩니다.',
  },
  {
    label: '일정',
    title: '1월 11일 출국, 1월 19일 인천 도착',
    description: '항공편 확정 후 보호자에게 세부 체크인 안내를 개별 전달합니다.',
  },
  {
    label: '준비',
    title: '여권, ESTA, 여행자보험 확인 안내',
    description: '출국 전 필수 서류와 준비물 체크리스트는 등록 확정 후 발송됩니다.',
  },
] as const;

export function NoticesPage() {
  return (
    <section className="camp-intro-page">
      <a className="back-link" href="/">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <div className="intro-hero">
        <p className="eyebrow">Notice Board</p>
        <h1>공지사항</h1>
        <p>캠프 모집, 일정, 준비사항 등 최신 안내를 확인하세요.</p>
      </div>

      <div className="notice-list">
        {noticeItems.map((notice) => (
          <article className="notice-card" key={notice.title}>
            <span>{notice.label}</span>
            <h2>{notice.title}</h2>
            <p>{notice.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
