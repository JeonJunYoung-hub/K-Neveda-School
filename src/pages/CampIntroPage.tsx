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

      <div className="partnership-hero">
        <div>
          <p className="eyebrow">Program Introduction</p>
          <h1>
            K-Nevada-School은
            <br />
            연구기관 현장과 학생의 진로를
            <br />
            함께 연결하는 캠프입니다.
          </h1>
          <p>
            K-Nevada-School은 미국 네바다 DRI(Desert Research Institute, 사막연구소)의 연구 현장과 UNR, UNLV 대학 캠퍼스 경험을 연결해 학생들이 현직 과학자 멘토링, 실험, 데이터 분석, 발표를 하나의 흐름으로 경험하는 7박 9일 집중 프로그램입니다.
          </p>
          <p>
            DRI STEM Lab 3일 집중 과정, 후버댐과 그랜드캐년 필드러닝, Drone AI 워크숍, BattleBots Destruct-A-Thon 현장 관람까지 학생의 질문이 연구자의 피드백과 글로벌 진로 로드맵으로 이어지도록 설계했습니다.
          </p>
        </div>
        <aside className="partner-logo-card" aria-label="K-Nevada 파트너십">
          <strong>네바다 주립 연구기관 및 대학이 함께 합니다.</strong>
          <div className="partner-logo-grid">
            <span className="partner-logo partner-logo--unr">N</span>
            <span className="partner-logo partner-logo--unlv">UNLV</span>
            <span className="partner-logo partner-logo--dri">
              <img alt="DRI Desert Research Institute" src="https://www.dri.edu/wp-content/uploads/DRI-logo-taglineWEB2.png" />
            </span>
          </div>
          <p>UNR x UNLV x DRI</p>
        </aside>
      </div>

      <section className="intro-focus-grid">
        <article>
          <span>01</span>
          <h2>현직 과학자 1:1 멘토링</h2>
          <p>DRI 박사진과 UNLV 이공계 멘토가 학생 10명과 직접 함께하며 질문과 실험을 이끕니다.</p>
        </article>
        <article>
          <span>02</span>
          <h2>DRI 공식 수료증</h2>
          <p>미국 연구기관 공식 인증 수료증을 진학 포트폴리오 자료로 활용할 수 있습니다.</p>
        </article>
        <article>
          <span>03</span>
          <h2>1:1 진로 로드맵</h2>
          <p>귀국 후 2주 내 개별 포트폴리오 피드백과 연 2회 진로 상담으로 성장을 이어갑니다.</p>
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
