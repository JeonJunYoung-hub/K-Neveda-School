import { ApplicationForm } from '../components/forms/ApplicationForm';

export function ApplyPage() {
  return (
    <section className="apply-page apply-page--plain">
      <div className="apply-hero apply-hero--center">
        <p className="eyebrow">Apply Now</p>
        <h1>캠프 신청</h1>
        <p>약관 동의 후 학생 정보와 보호자 정보를 입력하면 신청이 완료됩니다.</p>
      </div>

      <ApplicationForm />
    </section>
  );
}
