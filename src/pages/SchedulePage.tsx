import { ArrowLeft, CalendarDays } from 'lucide-react';
import { campContent, journeyDays } from '../data/campContent';

export function SchedulePage() {
  return (
    <section className="schedule-page">
      <a className="back-link" href="/#schedule">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <div className="schedule-hero">
        <CalendarDays aria-hidden="true" />
        <p className="eyebrow">7 nights 9 days</p>
        <h1>7박 9일 여정</h1>
        <p>{campContent.period.date}</p>
        <span>{campContent.period.note}</span>
      </div>

      <div className="journey-calendar" aria-label="7박 9일 달력">
        {journeyDays.map((item) => (
          <article className="journey-calendar__day" key={item.day}>
            <span>{item.day}</span>
            <strong>{item.date}</strong>
            <p>{item.title}</p>
          </article>
        ))}
      </div>

      <div className="journey-list">
        {journeyDays.map((item, index) => (
          <details className="journey-day" key={item.day} open={index === 0}>
            <summary>
              <span>{item.day}</span>
              <div>
                <strong>
                  {item.title}
                  <small>{item.date}</small>
                </strong>
                <p>{item.summary}</p>
              </div>
            </summary>
            <ul>
              {item.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
