import { ArrowLeft, ClipboardPenLine } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { campContent, leadershipGroups, missionContent } from '../data/campContent';

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

      <section className="intro-values">
        <div className="mission-band">
          <h2>MISSION</h2>
          <p>{missionContent.mission}</p>
        </div>

        <div className="vision-box">
          <h2>VISION</h2>
          <p>{missionContent.vision}</p>
        </div>
      </section>

      <section className="leadership-section">
        <div className="section-title">
          <h2>주요 경영진</h2>
          <p>대표 교수, 교수진, 운영진을 중심으로 현장 안전과 학습 품질을 함께 관리합니다.</p>
        </div>

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
