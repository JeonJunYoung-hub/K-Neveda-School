import { CalendarDays, ChevronRight, ClipboardPenLine, Sparkles } from 'lucide-react';
import { HeroSection } from '../components/sections/HeroSection';
import { ButtonLink } from '../components/ui/ButtonLink';
import { campContent, missionContent } from '../data/campContent';

export function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="content-section values-section">
        <div className="mission-band mission-band--home">
          <h2>MISSION</h2>
          <p>{missionContent.mission}</p>
        </div>

        <div className="vision-box vision-box--home">
          <h2>VISION</h2>
          <p>{missionContent.vision}</p>
        </div>

        <div className="core-values">
          <span>핵심가치</span>
          <div className="core-value-row">
            {missionContent.values.map((value) => (
              <article className="core-value" key={value.title}>
                <strong>{value.title}</strong>
                <small>{value.english}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section--lifted" id="program">
        <a className="period-card" href="/program/schedule">
          <CalendarDays aria-hidden="true" />
          <div>
            <span>{campContent.period.label}</span>
            <strong>{campContent.period.date}</strong>
            <p>{campContent.period.note}</p>
          </div>
          <ChevronRight aria-hidden="true" className="period-card__arrow" />
        </a>

        <div className="fact-grid" aria-label="캠프 핵심 정보">
          {campContent.quickFacts.map((fact) => (
            <article className="fact-card" key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
              <p>{fact.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-title">
          <h2>우리가 하는 것</h2>
          <p>PDF 내용을 기준으로 핵심 프로그램만 먼저 정리했습니다.</p>
        </div>

        <div className="activity-scroll">
          {campContent.activities.map((activity, index) => (
            <a className="activity-card" href={activity.href} key={activity.id}>
              <img alt="" className="activity-card__image" src={activity.imageUrl} />
              <div className="activity-card__body">
                <Sparkles aria-hidden="true" />
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
              </div>
              <span className="activity-card__index">{String(index + 1).padStart(2, '0')}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="content-section" id="schedule">
        <div className="section-title">
          <h2>7박 9일 일정</h2>
          <p>라스베가스 현지 연구소, 대학, 필드 트립을 압축한 집중형 프로그램입니다.</p>
        </div>

        <div className="schedule-list">
          {campContent.schedule.map((item) => (
            <article className="schedule-item" key={item.day}>
              <span>{item.day}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <ButtonLink className="section-detail-link" href="/program/schedule" variant="secondary">
          일정 자세히 보기
          <ChevronRight aria-hidden="true" />
        </ButtonLink>
      </section>

      <section className="content-section" id="tuition">
        <div className="tuition-card">
          <p className="eyebrow">Camp fee</p>
          <h2>$4,800 / ₩7,200,000</h2>
          <p>항공권은 별도 구매이며, 출발 약 2개월 전 가이드가 발송됩니다.</p>
          <ul>
            {campContent.inclusions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ButtonLink className="tuition-detail-link" href="/program/tuition" variant="primary">
            자세히 보기
            <ChevronRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>

      <section className="content-section content-section--cta" id="contact">
        <ButtonLink className="apply-cta" href="/apply" variant="primary">
          <ClipboardPenLine aria-hidden="true" />
          <span>캠프 신청하기</span>
          <ChevronRight aria-hidden="true" />
        </ButtonLink>
      </section>
    </>
  );
}
