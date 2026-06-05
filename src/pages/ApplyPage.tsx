import { ApplicationForm } from '../components/forms/ApplicationForm';

export function ApplyPage() {
  return (
    <section className="apply-page apply-page--plain">
      <div className="apply-hero apply-hero--center">
        <p className="eyebrow">Apply Now</p>
        <h1>캠프 신청</h1>
        <p>학생 연락처와 보호자 연락처를 남기면 로컬 신청 목록에 저장됩니다.</p>
      </div>

      <ApplicationForm />
    </section>
  );
}
