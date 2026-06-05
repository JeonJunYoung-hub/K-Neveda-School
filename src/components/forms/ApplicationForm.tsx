import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

type SavedApplication = {
  id: string;
  submittedAt: string;
  studentName: string;
  studentPhone: string;
  parentName: string;
  parentPhone: string;
  message: string;
};

const storageKey = 'k-nevada-camp-applications';
const formName = 'k-nevada-camp-application';

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [savedApplications, setSavedApplications] = useState<SavedApplication[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      return;
    }

    try {
      setSavedApplications(JSON.parse(saved) as SavedApplication[]);
    } catch {
      setSavedApplications([]);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const application: SavedApplication = {
      id: `application-${Date.now()}`,
      submittedAt: new Date().toLocaleString('ko-KR'),
      studentName: String(formData.get('studentName') || ''),
      studentPhone: String(formData.get('studentPhone') || ''),
      parentName: String(formData.get('parentName') || ''),
      parentPhone: String(formData.get('parentPhone') || ''),
      message: String(formData.get('message') || ''),
    };

    const nextApplications = [application, ...savedApplications];
    setSavedApplications(nextApplications);
    window.localStorage.setItem(storageKey, JSON.stringify(nextApplications));
    setSubmitted(true);

    const payload = new URLSearchParams();
    payload.set('form-name', formName);
    formData.forEach((value, key) => payload.set(key, String(value)));

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString(),
    }).catch(() => undefined);

    form.reset();
  };

  return (
    <>
      <form
        className="application-form application-form--plain"
        data-netlify="true"
        name={formName}
        onSubmit={handleSubmit}
      >
        <input name="form-name" type="hidden" value={formName} />

        <label>
          <span>학생 이름</span>
          <input name="studentName" required type="text" />
        </label>

        <label>
          <span>학생 연락처</span>
          <input autoComplete="tel" inputMode="tel" name="studentPhone" required type="tel" />
        </label>

        <label>
          <span>보호자 이름</span>
          <input name="parentName" required type="text" />
        </label>

        <label>
          <span>보호자 연락처</span>
          <input autoComplete="tel" inputMode="tel" name="parentPhone" required type="tel" />
        </label>

        <label className="application-form__wide">
          <span className="sr-only">문의 내용</span>
          <textarea name="message" placeholder="문의 내용" rows={5} />
        </label>

        <button className="submit-button" type="submit">
          신청서 제출
        </button>

        {submitted && <p className="form-success">신청 완료! 입력하신 정보가 저장되었습니다.</p>}
      </form>

      <details className="application-vault application-vault--plain">
        <summary>저장된 신청 정보 보기</summary>
        {savedApplications.length === 0 ? (
          <p>아직 저장된 신청 정보가 없습니다.</p>
        ) : (
          <div className="application-vault__list">
            {savedApplications.map((application) => (
              <article key={application.id}>
                <strong>{application.studentName}</strong>
                <span>{application.submittedAt}</span>
                <p>학생 연락처: {application.studentPhone}</p>
                <p>보호자: {application.parentName}</p>
                <p>보호자 연락처: {application.parentPhone}</p>
                {application.message && <p>문의 내용: {application.message}</p>}
              </article>
            ))}
          </div>
        )}
      </details>
    </>
  );
}
