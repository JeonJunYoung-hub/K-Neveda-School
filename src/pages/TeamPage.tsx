import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const facultyMembers = [
  {
    role: '대표',
    name: '한정훈 대표',
    title: 'K-Nevada-Stem Camp 대표',
    imageUrl:
      'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?cs=srgb&dl=pexels-yankrukov-8199562.jpg&fm=jpg',
    description:
      'K-Nevada-Stem Camp의 프로그램 방향과 현장 운영 흐름을 총괄하며 학생 프로젝트와 진로 로드맵이 자연스럽게 연결되도록 관리합니다.',
    profile: ['K-Nevada-Stem Camp 대표', '프로그램 기획 및 운영 총괄', '학생 진로 로드맵 운영 관리'],
  },
  {
    role: '교수진',
    name: '추후 업데이트 예정',
    title: '교수진 정보 업데이트 예정',
    imageUrl:
      'https://images.pexels.com/photos/8197558/pexels-photo-8197558.jpeg?cs=srgb&dl=pexels-yankrukov-8197558.jpg&fm=jpg',
    description: '교수진 세부 프로필과 담당 특강 내용은 확정되는 대로 업데이트 예정입니다.',
    profile: ['담당 특강 업데이트 예정', '연구 분야 업데이트 예정', '학생 프로젝트 자문 업데이트 예정'],
  },
  {
    role: '교수진',
    name: '추후 업데이트 예정',
    title: '교수진 정보 업데이트 예정',
    imageUrl:
      'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?cs=srgb&dl=pexels-max-fischer-5212345.jpg&fm=jpg',
    description: '교수진 세부 프로필과 담당 진로 자문 내용은 확정되는 대로 업데이트 예정입니다.',
    profile: ['담당 세션 업데이트 예정', '진로 자문 업데이트 예정', '포트폴리오 피드백 업데이트 예정'],
  },
] as const;

const operationsMembers = [
  {
    role: '학생 멘토 5명',
    name: 'UNLV 이공계 재학생',
    title: '학생 10명 대비 2:1 멘토 배정',
    imageUrl:
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=900',
    description:
      '한국어 소통이 가능하며 학생 10명 대비 2:1 비율로 배정되어 실습과 생활 적응을 밀착 지원합니다.',
    profile: ['한국어 가능 멘토', '실습 보조 및 생활 적응 지원', '학생별 프로젝트 피드백'],
  },
  {
    role: '전준영 멘토',
    name: '전준영 운영진',
    title: '현장 운영 담당',
    imageUrl:
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=900',
    description:
      '현장 운영 담당 운영진으로 캠프 일정, 학생 케어, 학부모 소통 흐름을 함께 관리합니다.',
    profile: ['현장 운영 담당', '학생 케어 지원', '학부모 소통 지원'],
  },
] as const;

export function TeamPage() {
  const [activeFacultyIndex, setActiveFacultyIndex] = useState(0);
  const [activeStaffIndex, setActiveStaffIndex] = useState(0);
  const activeFaculty = facultyMembers[activeFacultyIndex];
  const activeStaff = operationsMembers[activeStaffIndex];

  return (
    <section className="camp-intro-page team-page-simple">
      <a className="back-link" href="/">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <div className="board-hero team-hero-simple">
        <p className="eyebrow">Operating Team</p>
        <h1>운영팀</h1>
        <p>대표, 교수진, 멘토진, K-EnterTech Hub 운영진이 학습 품질과 현장 안전을 함께 관리합니다.</p>
      </div>

      <section className="team-profile-section" aria-label="교수진 소개">
        <p className="team-profile-section__label">교수진</p>
        <div className="team-profile-feature">
          <figure className="team-profile-feature__image">
            <img alt={`${activeFaculty.name} 프로필`} src={activeFaculty.imageUrl} />
          </figure>
          <div className="team-profile-feature__copy">
            <header>
              <h2>{activeFaculty.name}</h2>
              <span>{activeFaculty.title}</span>
            </header>
            <p>{activeFaculty.description}</p>
            <ul>
              {activeFaculty.profile.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="team-profile-thumbs" aria-label="교수진 목록">
          {facultyMembers.map((member, index) => (
            <button
              aria-pressed={activeFacultyIndex === index}
              className={`team-profile-thumb ${activeFacultyIndex === index ? 'is-active' : ''}`}
              key={member.name}
              onClick={() => setActiveFacultyIndex(index)}
              type="button"
            >
              <img alt={`${member.name} 프로필`} src={member.imageUrl} />
              <strong>{member.name}</strong>
              <span>{member.role}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="team-profile-section team-profile-section--staff" aria-label="K-Nevada-Stem Camp 운영진">
        <p className="team-profile-section__label">K-Nevada-Stem Camp Staff</p>
        <h2 className="team-profile-section__title">K-Nevada-Stem Camp 운영진</h2>
        <div className="team-profile-feature">
          <figure className="team-profile-feature__image">
            <img alt={`${activeStaff.name} 운영 이미지`} src={activeStaff.imageUrl} />
          </figure>
          <div className="team-profile-feature__copy">
            <header>
              <h2>{activeStaff.role}</h2>
              <span>{activeStaff.title}</span>
            </header>
            <p>{activeStaff.description}</p>
            <ul>
              {activeStaff.profile.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="team-profile-thumbs team-profile-thumbs--two" aria-label="운영진 목록">
          {operationsMembers.map((member, index) => (
            <button
              aria-pressed={activeStaffIndex === index}
              className={`team-profile-thumb ${activeStaffIndex === index ? 'is-active' : ''}`}
              key={member.name}
              onClick={() => setActiveStaffIndex(index)}
              type="button"
            >
              <img alt={`${member.name} 운영 이미지`} src={member.imageUrl} />
              <strong>{member.role}</strong>
              <span>{member.name}</span>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}
