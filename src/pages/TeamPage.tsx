import { ArrowLeft } from 'lucide-react';

const teamMembers = [
  {
    role: '대표 교수',
    name: '손영권 박사',
    description:
      'UNR Associate Research Professor. 현지 총괄 및 안전 책임자로 DRI STEM Lab 전 과정을 이끕니다.',
  },
  {
    role: '교수진',
    name: '강민곤 교수',
    description:
      'UNLV Computer Science / DataX Lab Director. AI/ML 특강과 드론·AI 워크숍 자문을 담당합니다.',
  },
  {
    role: '교수진',
    name: '박정원 교수',
    description:
      '캡스톤 프로젝트 심사와 STEM 진로 특강을 통해 학생별 성장 방향을 제시합니다.',
  },
] as const;

export function TeamPage() {
  return (
    <section className="camp-intro-page team-page-simple">
      <a className="back-link" href="/">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <div className="board-hero team-hero-simple">
        <p className="eyebrow">Operating Team</p>
        <h1>운영팀</h1>
        <p>교수진, DRI 운영팀, K-EnterTech Hub 운영진이 학습 품질과 현장 안전을 함께 관리합니다.</p>
      </div>

      <div className="team-card-grid-simple">
        {teamMembers.map((member) => (
          <article className="team-card-simple" key={member.name}>
            <span>{member.role}</span>
            <h2>{member.name}</h2>
            <p>{member.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
