import { CalendarDays, ChevronRight, ClipboardPenLine, Microscope, ShieldCheck, Sparkles } from 'lucide-react';
import { HeroSection } from '../components/sections/HeroSection';
import { ButtonLink } from '../components/ui/ButtonLink';
import { campContent } from '../data/campContent';

// 홈페이지 배너 사진들

const imageUrls = {
  lab:
    'https://images.pexels.com/photos/6208709/pexels-photo-6208709.jpeg?cs=srgb&dl=pexels-cottonbro-6208709.jpg&fm=jpg',
  canyon:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg/1280px-Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg',
  drone: '/media/drone-hero.png',
  lecture:
    'https://images.pexels.com/photos/8197558/pexels-photo-8197558.jpeg?cs=srgb&dl=pexels-yankrukov-8197558.jpg&fm=jpg',
  mentoring:
    'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?cs=srgb&dl=pexels-max-fischer-5212345.jpg&fm=jpg',
  battlebots:
    'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=1200',
  desert:
    'https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=1400',
} as const;

const factItems = [
  { label: '과정', value: '7일', note: '집중 과정' },
  { label: '정원', value: '10명', note: '소수정예' },
  { label: '멘토', value: '1:1', note: '밀착 관리' },
] as const;

const programTiles = [
  {
    title: 'DRI STEM 캠프',
    description: '전기회로, Micro:bit, 현미경, AI 데이터 분석을 연구실 흐름으로 실습합니다.',
    imageUrl: imageUrls.lab,
    tone: 'blue',
  },
  {
    title: '후버댐 + 그랜드캐년',
    description: '댐 공학, 수력발전, 자연 지질 학습을 하루 일정으로 연결합니다.',
    imageUrl: imageUrls.canyon,
    tone: 'image',
  },
  {
    title: 'BattleBots 현장 관람',
    description: '로봇 공학과 설계 전략이 경기장에서 작동하는 장면을 직접 봅니다.',
    imageUrl: imageUrls.battlebots,
    tone: 'navy',
  },
  {
    title: '코딩 + 사막 생태',
    description: 'Micro:bit 센서 실험과 사막 생태 관찰을 STEM 프로젝트로 확장합니다.',
    imageUrl: imageUrls.desert,
    tone: 'image',
  },
  {
    title: 'Drone & AI 워크숍',
    description: 'UAV 자율비행과 AI 알고리즘을 직접 다루는 고급 워크숍입니다.',
    imageUrl: imageUrls.drone,
    tone: 'light',
  },
  {
    title: '교수진 + 외부 전문가 특강',
    description: '교수진과 게스트 강사가 AI와 STEM 진로를 다룹니다.',
    imageUrl: imageUrls.lecture,
    tone: 'image',
  },
] as const;

const valueBlocks = [
  {
    icon: Microscope,
    title: '현직 과학자 1:1 멘토링',
    description:
      'DRI 박사진과 UNLV 이공계 멘토가 학생 10명과 직접 프로젝트를 진행하며 질문과 실험을 이끕니다.',
    bullets: ['DRI 연구 환경 경험', '소수정예 프로젝트 피드백', '멘토와 함께하는 STEM 진로 탐색'],
    imageUrl: imageUrls.mentoring,
  },
  {
    icon: ShieldCheck,
    title: 'DRI 수료증 + 진로 로드맵',
    description:
      '공식 수료증, 귀국 후 포트폴리오 피드백, 연 2회 진로 상담으로 캠프 이후까지 이어집니다.',
    bullets: ['DRI 공식 수료증', '귀국 후 2주 내 개별 피드백', '진학 포트폴리오 활용 가능'],
    imageUrl: imageUrls.lab,
  },
] as const;

// 홈페이지 배너

export function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="pc-intro-section" id="program">
        <div className="pc-section-heading">
          <p className="eyebrow">AI STEM Global Camp</p>
          <h2>미국 네바다에서 만나는 AI STEM 글로벌 캠프</h2>
          <p>
            DRI 사막연구소, UNR, UNLV 네트워크를 기반으로 연구실 실습, AI 데이터 분석,
            드론 워크숍, 현장 견학을 연결하는 7일 집중형 글로벌 STEM 캠프입니다.
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
      </section>

      <section className="pc-academics-section">
        <div className="pc-section-heading">
          <p className="eyebrow">Program Highlights</p>
          <h2>K-Nevada-School에서 경험하는 핵심 활동</h2>
          <p>배틀봇 관람, DRI STEM 캠프, 드론 AI, 사막 생태, 후버댐과 그랜드캐년까지 한 흐름으로 설계했습니다.</p>
        </div>

        <div className="pc-program-grid">
          {programTiles.map((tile) => (
            <article className={`pc-program-tile pc-program-tile--${tile.tone}`} key={tile.title}>
              {tile.tone === 'image' ? (
                <>
                  <img alt="" src={tile.imageUrl} />
                  <div>
                    <h3>{tile.title}</h3>
                    <p>{tile.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <Sparkles aria-hidden="true" />
                  <h3>{tile.title}</h3>
                  <p>{tile.description}</p>
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="pc-values-section">
        <div className="pc-section-heading">
          <p className="eyebrow">Why K-Nevada?</p>
          <h2>K-Nevada-School Camp의 핵심 가치 3가지!!</h2>
        </div>

        <div className="pc-value-layout">
          {valueBlocks.map((block) => {
            const Icon = block.icon;

            return (
              <article className="pc-value-block" key={block.title}>
                <img alt="" src={block.imageUrl} />
                <div>
                  <Icon aria-hidden="true" />
                  <h3>{block.title}</h3>
                  <p>{block.description}</p>
                  <ul>
                    {block.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="pc-video-section" id="media-preview">
        <div className="media-video pc-video-frame">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            src="https://www.youtube.com/embed/u0qFC3z4IKI"
            title="K-Nevada Camp 소개 영상"
          />
        </div>
        <div className="pc-video-copy">
          <p className="eyebrow">Campus Tour</p>
          <h2>영상으로 먼저 만나는 네바다 STEM 캠프</h2>
          <p>
            현지 연구실, 대학 캠퍼스, 실습 중심 프로그램의 분위기를 영상과 갤러리로 확인할 수 있습니다.
            실제 캠프는 소수정예 운영과 멘토링을 중심으로 진행됩니다.
          </p>
          <ButtonLink href="/media" variant="secondary">
            영상 및 갤러리 보기
            <ChevronRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>

      <section className="pc-adventure-band">
        <img alt="" src={imageUrls.canyon} />
        <div>
          <p className="eyebrow">Field Learning</p>
          <h2>후버댐 + 그랜드캐년, 코딩 + 사막 생태까지</h2>
          <p>
            네바다의 자연과 공학 현장을 배경으로 관찰, 데이터 수집, AI 분석, STEM vlog 제작까지 연결합니다.
          </p>
          <ButtonLink href="/program/schedule" variant="secondary">
            일정표 보기
            <ChevronRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>

      <section className="pc-final-cta" id="contact">
        <div>
          <p className="eyebrow">Apply now</p>
          <h2 className="pc-final-cta__title">
            <span>K-Nevada-Stem Camp</span>
            <span>1기 모집</span>
          </h2>
          <p>정원 10명 소수정예로 운영되며, 접수 순서에 따라 마감됩니다.</p>
        </div>
        <ButtonLink className="apply-cta" href="/apply" variant="primary">
          <ClipboardPenLine aria-hidden="true" />
          <span>캠프 신청하기</span>
          <ChevronRight aria-hidden="true" />
        </ButtonLink>
      </section>
    </>
  );
}
