import type { TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { programModules } from '../../data/campContent';
import { ButtonLink } from '../ui/ButtonLink';

const heroSlides = [
  ...programModules.slice(0, 4),
  {
    ...programModules[4],
    title: '교수진 3인 + 외부 전문가 특강',
    description: '강민곤·손영권·박정원 교수와 실리콘밸리 AI, 항공우주 외부 전문가 특강을 만납니다.',
  },
  {
    id: 'battlebots-banner',
    eyebrow: 'DAY 7',
    title: 'BattleBots Destruct-A-Thon 현장 관람',
    description: '로봇 공학, 설계, 전략이 실제 경기에서 작동하는 장면을 현장에서 관람합니다.',
    imageUrl: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=900',
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
    <section className="hero-section" onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart}>
      <img alt="" className="hero-image" src={activeSlide.imageUrl} />
      <div className="hero-overlay" />

      <div className="hero-copy">
        <p>{activeSlide.eyebrow}</p>
        <h1>{activeSlide.title}</h1>
        <p className="hero-description">{activeSlide.description}</p>
        <ButtonLink href={activeSlide.href} variant="secondary">
          자세히 보기
          <ChevronRight aria-hidden="true" />
        </ButtonLink>
      </div>

      <button className="hero-arrow hero-arrow--left" onClick={goToPrevious} type="button">
        <ChevronLeft aria-hidden="true" />
        <span className="sr-only">이전 배너</span>
      </button>
      <button className="hero-arrow hero-arrow--right" onClick={goToNext} type="button">
        <ChevronRight aria-hidden="true" />
        <span className="sr-only">다음 배너</span>
      </button>

      <div className="hero-dots" aria-label="배너 선택">
        {heroSlides.map((slide, index) => (
          <button
            aria-label={`${slide.title} 보기`}
            className={index === activeIndex ? 'is-active' : ''}
            key={slide.id}
            onClick={() => setActiveIndex(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
