import type { CSSProperties } from 'react';
import { ArrowLeft } from 'lucide-react';
import { campContent, journeyDays } from '../data/campContent';

const weeklySchedule = [
  {
    week: '1주차',
    days: ['1/11 월', '1/12 화', '1/13 수', '1/14 목', '1/15 금', '1/16 토', '1/17 일'],
    rows: [
      [
        'LAS 도착 · 숙소\n체크인',
        'DRI 전기회로\n특강',
        'Micro:bit\n코딩',
        '현미경 · AI\n데이터',
        '후버댐 ·\n그랜드캐년',
        'Drone & AI\n워크숍',
        '캡스톤\n발표',
      ],
      [
        '오리엔테이션 ·\n팀 배정',
        'LED 회로 ·\n멀티미터',
        '사막 생태\n관찰',
        '과학 데이터\n시각화',
        'STEM vlog\n기록',
        '교수진\n특강',
        'DRI 수료증 ·\nBattleBots',
      ],
    ],
  },
  {
    week: '귀국',
    days: ['1/18 월', '1/19 화'],
    rows: [
      ['LAS 출발 · 인천행\n항공편', '인천 도착 ·\n보호자 연계'],
      ['귀국 후 피드백\n안내', '포트폴리오 상담\n일정 안내'],
    ],
  },
];

export function SchedulePage() {
  return (
    <section className="schedule-page">
      <a className="back-link" href="/#schedule">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <div className="schedule-photo-hero">
        <img alt="" src="/media/schedule-stem-hero.png" />
        <div>
          <p className="eyebrow">Schedule</p>
          <h1>7일 집중 과정 일정표</h1>
          <p>{campContent.period.date}</p>
          <span>{campContent.period.note}</span>
        </div>
      </div>

      <div className="schedule-timetable" aria-label="캠프 시간표">
        {weeklySchedule.map((week) => (
          <div className="timetable-week" key={week.week}>
            <div className="timetable-week__label">{week.week}</div>
            <div className="timetable-grid" style={{ '--day-count': week.days.length } as CSSProperties}>
              {week.days.map((day) => (
                <strong key={day}>{day}</strong>
              ))}
              <span>09:00~15:00</span>
              {week.rows[0].map((item) => (
                <p key={item}>{item}</p>
              ))}
              <span>15:00~17:00</span>
              {week.rows[1].map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
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
