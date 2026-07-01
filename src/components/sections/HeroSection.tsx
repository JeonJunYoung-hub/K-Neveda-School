import type { CSSProperties, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const heroSlides = [
  {
    id: 'overview',
    eyebrow: '미국 네바다',
    title: 'AI STEM 글로벌 윈터 캠프',
    description: 'DRI 미국 사막연구소와 UNLV/UNR 네트워크에서 실전 연구와 AI 프로젝트를 경험합니다.',
    imageUrl: '/media/hero-ai-stem-campus.png',
    href: '/program/overview',
  },
  {
    id: 'dri-stem-lab',
    eyebrow: 'DRI STEM LAB',
    title: '연구소 실습 중심 STEM Lab',
    description: '전기회로, Micro:bit, 사막 생태, 현미경, AI 데이터 분석을 3일 동안 집중 실습합니다.',
    imageUrl:
      'https://images.pexels.com/photos/6208709/pexels-photo-6208709.jpeg?cs=srgb&dl=pexels-cottonbro-6208709.jpg&fm=jpg',
    href: '/program/dri-stem-lab',
  },
  {
    id: 'hoover-grand-canyon',
    eyebrow: 'FIELD TRIP',
    title: '후버댐 + 그랜드캐년 견학',
    description: '댐 공학, 수력발전, 자연 지질 학습을 하루 일정으로 연결합니다.',
    imageUrl: '/media/hoover-hero.png',
    href: '/program/hoover-grand-canyon',
  },
  {
    id: 'drone-ai-workshop',
    eyebrow: 'DRONE & AI',
    title: 'Drone AI 워크숍',
    description: 'UAV 자율비행, AI 알고리즘, 실전 문제 해결을 연결하는 토요일 집중 워크숍입니다.',
    imageUrl: '/media/drone-hero.png',
    href: '/program/drone-ai-workshop',
  },
  {
    id: 'professor-lecture',
    eyebrow: 'SPECIAL LECTURE',
    title: '교수진 + 외부 전문가 특강',
    description: 'AI, STEM 진로, 항공우주 분야 특강으로 프로젝트의 방향을 넓힙니다.',
    imageUrl:
      'https://images.pexels.com/photos/8197558/pexels-photo-8197558.jpeg?cs=srgb&dl=pexels-yankrukov-8197558.jpg&fm=jpg',
    href: '/program/professor-lecture',
  },
  {
    id: 'battlebots-banner',
    eyebrow: 'DAY 7',
    title: 'BattleBots Destruct-A-Thon 현장 관람',
    description: '로봇 공학, 설계, 전략이 실제 경기장에서 작동하는 장면을 현장에서 관람합니다.',
    imageUrl: '/media/battlebots-hero.png',
    href: '/program/schedule',
  },
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setActiveIndex((index) => (index - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    setActiveIndex((index) => (index + 1) % heroSlides.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const distance = touchStartX.current - (event.changedTouches[0]?.clientX ?? touchStartX.current);

    if (Math.abs(distance) > 45) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    touchStartX.current = null;
  };

  return (
    <section
      className="hero-section hero-section--poster"
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
      style={
        {
          '--hero-image': `url(${activeSlide.imageUrl})`,
        } as CSSProperties
      }
    >
      <div className="poster-copy">
        <p className="poster-kicker">2027 K-Nevada-StemCamp 1기</p>
        <p className="poster-subtitle">AI 시대와 글로벌 STEM의 미래</p>
        <h1>
          <span>{activeSlide.eyebrow}</span>
          {activeSlide.title}
        </h1>
        <p className="hero-description">{activeSlide.description}</p>
      </div>

      <a className="poster-info-band" href="/program/schedule" aria-label="일정표 페이지로 이동">
        <strong>2027년 1월 11일(월) ~ 1월 19일(화)</strong>
        <p className="poster-info-line">
          <span>장소</span>
          <b>미국 네바다 라스베가스</b>
        </p>
        <p className="poster-info-line">
          <span>대상</span>
          <b>초5~중3 10명 소수정예</b>
        </p>
        <p className="poster-info-line">
          <span aria-hidden="true" />
          <b>현지 UNLV 이공계 재학생과 한국 인솔교사가 한국에서부터 미국까지 동행하며 케어합니다.</b>
        </p>
        <p className="poster-info-line">
          <span>문의</span>
          <b>카카오톡채널 [K-NV-Stem]</b>
        </p>
      </a>

      <span className="poster-count">
        {String(activeIndex + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
      </span>

      <button className="hero-arrow hero-arrow--left" onClick={goToPrevious} type="button" aria-label="이전 배너">
        <ChevronLeft aria-hidden="true" />
      </button>
      <button className="hero-arrow hero-arrow--right" onClick={goToNext} type="button" aria-label="다음 배너">
        <ChevronRight aria-hidden="true" />
      </button>
    </section>
  );
}
