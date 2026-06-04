import { ArrowLeft, ClipboardPenLine } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { campContent } from '../data/campContent';

export function CampIntroPage() {
  return (
    <section className="camp-intro-page">
      <a className="back-link" href="/#program">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <div className="intro-hero">
        <p className="eyebrow">K-Nevada Camp School</p>
        <h1>캠프 소개</h1>
        <p>
          {campContent.title}는 DRI 미국 사막연구소와 UNLV/UNR 네트워크를 기반으로 학생들이
          연구기관의 실험, 데이터 분석, AI 워크숍, 현장 견학을 압축적으로 경험하도록 설계한
          7박 9일 집중 프로그램입니다.
        </p>
      </div>

      <section className="intro-focus-grid">
        <article>
          <span>01</span>
          <h2>연구기관 현장 중심</h2>
          <p>DRI STEM Lab에서 전기회로, Micro:bit, 사막 생태, AI 데이터 분석을 직접 경험합니다.</p>
        </article>
        <article>
          <span>02</span>
          <h2>소수정예 밀착 관리</h2>
          <p>학생 10명 규모로 멘토와 운영진이 학습, 생활, 안전을 촘촘하게 관리합니다.</p>
        </article>
        <article>
          <span>03</span>
          <h2>진로 포트폴리오 연결</h2>
          <p>DRI 공식 수료증, 캡스톤 발표, 귀국 후 피드백을 진학 자료로 이어갑니다.</p>
        </article>
      </section>

      <section className="intro-program-summary">
        <div className="section-title">
          <h2>캠프 운영 방식</h2>
          <p>
            라스베가스 현지 연구소와 대학 캠퍼스, 필드 트립을 연결해 학생이 직접 질문하고
            실험하고 발표하는 흐름으로 설계했습니다.
          </p>
        </div>
        <ul className="intro-check-list">
          {campContent.inclusions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <ButtonLink className="apply-cta detail-apply-cta" href="/apply" variant="primary">
        <ClipboardPenLine aria-hidden="true" />
        <span>캠프 신청하기</span>
      </ButtonLink>
    </section>
  );
}
