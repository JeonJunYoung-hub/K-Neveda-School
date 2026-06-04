import { ArrowLeft, ClipboardPenLine } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { leadershipGroups } from '../data/campContent';

export function TeamPage() {
  return (
    <section className="camp-intro-page">
      <a className="back-link" href="/">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <div className="intro-hero">
        <p className="eyebrow">Operating Team</p>
        <h1>운영팀 · 주요 경영진 소개</h1>
        <p>
          교수진, DRI 운영팀, K-EnterTech Hub 운영진이 학습 품질과 현장 안전을 함께
          관리합니다.
        </p>
      </div>

      <section className="leadership-section">
        {leadershipGroups.map((group) => (
          <div className="leadership-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="leader-list">
              {group.members.map((member) => (
                <article className="leader-card" key={member.name}>
                  <img alt="" src={member.imageUrl} />
                  <div>
                    <span>{member.role}</span>
                    <h4>{member.name}</h4>
                    <p>{member.bio}</p>
                    <blockquote>{member.quote}</blockquote>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <ButtonLink className="apply-cta detail-apply-cta" href="/apply" variant="primary">
        <ClipboardPenLine aria-hidden="true" />
        <span>캠프 신청하기</span>
      </ButtonLink>
    </section>
  );
}
