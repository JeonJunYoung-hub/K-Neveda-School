import { ApplicationForm } from '../components/forms/ApplicationForm';
import { campContent } from '../data/campContent';

export function ApplyPage() {
  return (
    <section className="apply-page">
      <div className="apply-hero">
        <p className="eyebrow">Apply now</p>
        <h1>신청하기</h1>
        <p>{campContent.applicationNotice}</p>
      </div>

      <ApplicationForm />
    </section>
  );
}
