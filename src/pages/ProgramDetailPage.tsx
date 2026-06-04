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

      <article className="program-detail-hero">
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

      <ButtonLink className="apply-cta detail-apply-cta" href="/apply" variant="primary">
        <ClipboardPenLine aria-hidden="true" />
        <span>캠프 신청하기</span>
      </ButtonLink>
    </section>
  );
}
