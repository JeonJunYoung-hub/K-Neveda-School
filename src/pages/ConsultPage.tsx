import { ArrowLeft, MessageCircle } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';

const faqItems = [
  {
    number: '01',
    title: '대상 학년은 어떻게 되나요?',
    answer: '초등학교 5학년부터 중학교 3학년까지 10명 소수정예로 운영합니다.',
  },
  {
    number: '02',
    title: '멘토 비율은 어떻게 운영되나요?',
    answer: '학생 10명 기준 멘토 5명과 운영진 9명이 동행해 학습과 생활을 함께 관리합니다.',
  },
  {
    number: '03',
    title: '항공권과 서류 준비는 언제 안내되나요?',
    answer: '등록 확정 후 항공권, ESTA, 여행자보험, 준비물 체크리스트를 순차 안내합니다.',
  },
  {
    number: '04',
    title: '귀국 후 피드백도 제공되나요?',
    answer: '귀국 후 2주 내 포트폴리오 피드백과 개별 진로 로드맵 안내를 제공합니다.',
  },
];

export function ConsultPage() {
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

      <div className="consult-card-row">
        <article>
          <strong>카카오톡 상담</strong>
          <p>카카오톡채널 [K-Nevada-School]로 학생 학년, 희망 상담 시간, 문의 내용을 보내주세요.</p>
          <ButtonLink href="https://open.kakao.com/o/REPLACE_WITH_KAKAO_CHAT_CODE" variant="primary">
            <MessageCircle aria-hidden="true" />
            <span>카카오톡 상담하기</span>
          </ButtonLink>
        </article>
        <article>
          <strong>전화 상담</strong>
          <p>상담 가능 시간과 상세 모집 안내는 공지사항에 업데이트됩니다.</p>
          <span>02-302-8560</span>
        </article>
      </div>

      <div className="board-table faq-table">
        <div className="board-table__head">
          <span>번호</span>
          <span>질문</span>
          <span>답변</span>
        </div>
        {faqItems.map((item) => (
          <article className="board-table__row" key={item.number}>
            <span>{item.number}</span>
            <strong>{item.title}</strong>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
