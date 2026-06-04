import { CalendarDays, ChevronRight } from 'lucide-react';
import { campContent } from '../../data/campContent';
import { ButtonLink } from '../ui/ButtonLink';

export function HeroSection() {
  return (
    <section className="hero-section hero-section--static">
      <div className="hero-overlay" />

      <div className="hero-copy">
        <p>미국 네바다에서 만나는</p>
        <h1>
          AI STEM
          <span>글로벌 캠프</span>
        </h1>
        <p className="hero-description">
          네바다 주립대학 UNR · UNLV · 네바다 주립연구소 DRI와 함께 진짜 과학자처럼
          연구하고, 드론을 날리고, AI를 만듭니다.
        </p>

        <a className="hero-period-card" href="/program/schedule">
          <CalendarDays aria-hidden="true" />
          <div>
            <span>{campContent.period.label}</span>
            <strong>{campContent.period.date}</strong>
            <small>{campContent.period.note}</small>
          </div>
          <ChevronRight aria-hidden="true" />
        </a>

        <div className="hero-actions">
          <ButtonLink href="/apply" variant="primary">
            지금 신청하기
            <ChevronRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/program/schedule" variant="secondary">
            커리큘럼 보기
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
