import { ArrowLeft, CheckCircle2, ClipboardPenLine } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { detailPages } from '../data/campContent';

type ProgramDetailPageProps = {
  slug: string;
};

export function ProgramDetailPage({ slug }: ProgramDetailPageProps) {
  const detail = detailPages.find((item) => item.id === slug) ?? detailPages[0];

  return (
    <section className="program-detail-page">
      <a className="back-link" href="/#program">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <article className={`program-detail-hero${detail.id === 'tuition' ? ' program-detail-hero--banner' : ''}`}>
        <img alt="" src={detail.imageUrl} />
        <div className="program-detail-hero__copy">
          <p className="eyebrow">{detail.eyebrow}</p>
          <h1>{detail.title}</h1>
          <p>{detail.description}</p>
        </div>
      </article>

      <div className="detail-panel">
        <h2>세부사항</h2>
        <ul>
          {detail.points.map((point) => (
            <li key={point}>
              <CheckCircle2 aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {detail.id === 'tuition' && <TuitionDetail />}

      <ButtonLink className="apply-cta detail-apply-cta" href="/apply" variant="primary">
        <ClipboardPenLine aria-hidden="true" />
        <span>캠프 신청하기</span>
      </ButtonLink>
    </section>
  );
}

function TuitionDetail() {
  return (
    <section className="tuition-detail-box">
      <div className="tuition-detail-box__title">4. 참가비</div>
      <div className="tuition-price-banner">
        <span>오프라인 7박 9일 집중 캠프</span>
        <strong>$4,800 / ₩7,200,000</strong>
      </div>

      <div className="tuition-inclusion">
        <h2>포함 내역</h2>
        <ul>
          <li>DRI STEM Lab 3일 집중 과정 (전기회로 · Micro:bit · 사막 생태 · 현미경 · AI 데이터 분석)</li>
          <li>후버댐 + 그랜드캐년 종일 견학</li>
          <li>Advanced Drone & AI Workshop + BattleBots Destruct-A-Thon 관람</li>
          <li>교수진 3인 + 게스트 강사 2인 특강</li>
          <li>현지 식사 · 이동 · 입장료 · 재료비 · 미디어 일일 리포트</li>
          <li>DRI 공식 수료증 + 귀국 후 포트폴리오 피드백 + 진로 상담 연 2회</li>
        </ul>
        <p>항공권은 별도 구매입니다. 출발 약 2개월 전 가이드가 발송됩니다.</p>
      </div>

      <div className="tuition-discount">
        <h2>추가 할인 프로그램 <span>중복 적용 가능, 합산 최대 $500</span></h2>
        <table>
          <thead>
            <tr>
              <th>구분</th>
              <th>조건</th>
              <th>혜택</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>형제자매 동반</td>
              <td>형제자매 2인 이상 동시 등록 시 2인째부터</td>
              <td>$300 할인</td>
            </tr>
            <tr>
              <td>2027 서머 캠프 번들</td>
              <td>2027 윈터 + 2027 서머 동시 등록</td>
              <td>서머 $200 할인</td>
            </tr>
            <tr>
              <td>K-Nevada 참가자</td>
              <td>K-Nevada Gateway 2025/26 참가자 및 자녀</td>
              <td>$150 할인</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
