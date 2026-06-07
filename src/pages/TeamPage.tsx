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

const operationsMembers = [
  {
    role: '학생 멘토 5명',
    title: 'UNLV 이공계 재학생',
    description: '한국어 소통이 가능하며 학생 10명 대비 2:1 비율로 배정되어 실습과 생활 적응을 밀착 지원합니다.',
  },
  {
    role: '운영 스태프 3명',
    title: '현장 운영 전담',
    description: '프로그램 코디네이터, 현장 안전관리자, 미디어·학부모 소통 담당으로 나뉘어 캠프 전 과정을 관리합니다.',
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

      <section className="team-operations-section">
        <div className="section-title">
          <p className="eyebrow">K-Nevada-School Staff</p>
          <h2>K-Nevada-School 운영진</h2>
        </div>
        <div className="team-card-grid-simple team-card-grid-simple--two">
          {operationsMembers.map((member) => (
            <article className="team-card-simple" key={member.role}>
              <span>{member.role}</span>
              <h2>{member.title}</h2>
              <p>{member.description}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
