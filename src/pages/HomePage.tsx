import { CalendarDays, ChevronRight, ClipboardPenLine, Sparkles } from 'lucide-react';
import { HeroSection } from '../components/sections/HeroSection';
import { ButtonLink } from '../components/ui/ButtonLink';
import { campContent } from '../data/campContent';

const homeCoreValues = [
  {
    number: '①',
    title: '현직 과학자 1:1 멘토링',
    description:
      'DRI 박사진과 UNLV 이공계 멘토 5명이 7박 9일 내내 학생 10명과 직접 함께합니다.',
  },
  {
    number: '②',
    title: 'DRI 공식 수료증',
    description:
      '미국 연구기관 공식 인증 수료증을 진학 포트폴리오 자료로 활용할 수 있습니다.',
  },
  {
    number: '③',
    title: '1:1 진로 로드맵',
    description: '귀국 후 2주 내 개별 포트폴리오 피드백과 진로 상담 연 2회 제공.',
  },
] as const;

const highlightCards = [
  {
    id: 'dri-lab',
    title: 'DRI STEM Lab 3일 집중',
    description:
      '전기회로, Micro:bit, 사막 생태, 현미경, AI 데이터 분석까지 실제 연구실 흐름으로 경험합니다.',
    imageUrl:
      'https://images.pexels.com/photos/6208709/pexels-photo-6208709.jpeg?cs=srgb&dl=pexels-cottonbro-6208709.jpg&fm=jpg',
    href: '/program/dri-stem-lab',
  },
  {
    id: 'hoover-grand-canyon',
    title: '후버댐 + 그랜드캐년 종일 견학',
    description: '댐 공학·수력발전과 자연·지질 학습을 연결하는 DAY 5 현장 수업입니다.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg/1280px-Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg',
    href: '/program/hoover-grand-canyon',
  },
  {
    id: 'drone-ai',
    title: 'Advanced Drone & AI Workshop',
    description: 'UAV 자율비행과 AI 알고리즘을 직접 다루는 DAY 6 고급 워크숍입니다.',
    imageUrl:
      'https://images.pexels.com/photos/5734963/pexels-photo-5734963.jpeg?cs=srgb&dl=pexels-ramazannatass-5734963.jpg&fm=jpg',
    href: '/program/drone-ai-workshop',
  },
  {
    id: 'lectures',
    title: '교수진 3인 + 게스트 강사 2인 특강',
    description: '강민곤·손영권·박정원 교수와 실리콘밸리 AI, 항공우주 특강을 만납니다.',
    imageUrl:
      'https://images.pexels.com/photos/8197558/pexels-photo-8197558.jpeg?cs=srgb&dl=pexels-yankrukov-8197558.jpg&fm=jpg',
    href: '/program/professor-lecture',
  },
  {
    id: 'battlebots',
    title: 'BattleBots Destruct-A-Thon 현장 관람',
    description: '로봇 공학, 설계, 전략이 실제 경기에서 작동하는 장면을 관람합니다.',
    imageUrl: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=900',
    href: '/program/schedule',
  },
  {
    id: 'mentoring',
    title: '1:1 수준 밀착 관리',
    description: '학생 10명 : 멘토 5명, 운영진 9명 동행으로 성인 대 학생 약 1:1 케어를 제공합니다.',
    imageUrl:
      'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?cs=srgb&dl=pexels-max-fischer-5212345.jpg&fm=jpg',
    href: '/team',
  },
] as const;

const factItems = [
  { label: '과정', value: '7일', note: '집중 과정' },
  { label: '정원', value: '10명', note: '소수정예' },
  { label: '멘토', value: '1:1', note: '밀착 관리' },
] as const;

export function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="content-section values-section" id="program">
        <div className="home-program-card">
          <p className="eyebrow">AI STEM Global Camp</p>
          <h2>미국 네바다에서 만나는 AI STEM 글로벌 캠프</h2>
          <p>
            7일 집중과정, 10명 소수정예, 멘토 비율 1:1 수준의 밀착 케어,
            DRI 수료증까지 연결되는 글로벌 STEM 몰입 프로그램입니다.
          </p>
        </div>

        <div className="home-program-info">
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
            {factItems.map((fact) => (
              <article className="fact-card" key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
                <p>{fact.note}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="home-value-section">
          <h2>K-Nevada-School Camp의 핵심 가치 3가지!!</h2>
          <div className="home-value-list">
            {homeCoreValues.map((value) => (
              <article className="home-value-card" key={value.title}>
                <span>{value.number}</span>
                <strong>{value.title}</strong>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-title">
          <h2>K-Nevada-School의 하이라이트</h2>
          <p>터치로 옆으로 넘기며 핵심 활동을 확인할 수 있습니다.</p>
        </div>

        <div className="activity-scroll">
          {highlightCards.map((activity, index) => (
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
