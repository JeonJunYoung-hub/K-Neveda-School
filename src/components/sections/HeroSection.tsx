import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { programModules } from '../../data/campContent';
import { ButtonLink } from '../ui/ButtonLink';

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = programModules[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % programModules.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setActiveIndex((index) => (index - 1 + programModules.length) % programModules.length);
  };

  const goToNext = () => {
    setActiveIndex((index) => (index + 1) % programModules.length);
  };

  return (
    <section className="hero-section">
      <img alt="" className="hero-image" src={activeSlide.imageUrl} />
      <div className="hero-overlay" />

      <div className="hero-copy">
        <p>{activeSlide.eyebrow}</p>
        <h1>
          {activeSlide.title}
        </h1>
        <p className="hero-description">{activeSlide.description}</p>
        <ButtonLink href={activeSlide.href} variant="secondary">
          캠프 소개 보기
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
        {programModules.map((slide, index) => (
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
