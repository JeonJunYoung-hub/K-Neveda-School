import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

type SavedApplication = {
  id: string;
  submittedAt: string;
  studentName: string;
  grade: string;
  schoolName: string;
  studentPhone: string;
  parentPhone: string;
  email: string;
  message: string;
};

const grades = ['초5', '초6', '중1', '중2', '중3', '고1'];
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
      grade: String(formData.get('grade') || ''),
      schoolName: String(formData.get('schoolName') || ''),
      studentPhone: String(formData.get('studentPhone') || ''),
      parentPhone: String(formData.get('parentPhone') || ''),
      email: String(formData.get('email') || ''),
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
        className="application-form"
        data-netlify="true"
        name={formName}
        onSubmit={handleSubmit}
      >
        <input name="form-name" type="hidden" value={formName} />

        <label>
          <span>학생 이름 *</span>
          <input name="studentName" placeholder="홍길동" required type="text" />
        </label>

        <label>
          <span>학년 *</span>
          <select defaultValue="" name="grade" required>
            <option disabled value="">
              선택하세요
            </option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>학교명</span>
          <input name="schoolName" placeholder="OO초등학교 / OO중학교" type="text" />
        </label>

        <label>
          <span>학생 연락처 *</span>
          <input
            autoComplete="tel"
            inputMode="tel"
            name="studentPhone"
            placeholder="010-0000-0000"
            required
            type="tel"
          />
        </label>

        <label>
          <span>보호자 연락처 *</span>
          <input
            autoComplete="tel"
            inputMode="tel"
            name="parentPhone"
            placeholder="010-0000-0000"
            required
            type="tel"
          />
        </label>

        <label>
          <span>이메일 *</span>
          <input
            autoComplete="email"
            inputMode="email"
            name="email"
            placeholder="parent@email.com"
            required
            type="email"
          />
        </label>

        <label>
          <span>문의사항 (선택)</span>
          <textarea
            name="message"
            placeholder="지원 동기나 궁금한 점을 남겨주세요."
            rows={5}
          />
        </label>

        <button className="submit-button" type="submit">
          신청서 제출하기
        </button>

        {submitted && <p className="form-success">신청 완료! 입력하신 정보가 저장되었습니다.</p>}
      </form>

      <details className="application-vault">
        <summary>저장된 신청 정보 보기</summary>
        {savedApplications.length === 0 ? (
          <p>아직 저장된 신청 정보가 없습니다.</p>
        ) : (
          <div className="application-vault__list">
            {savedApplications.map((application) => (
              <article key={application.id}>
                <strong>
                  {application.studentName} · {application.grade}
                </strong>
                <span>{application.submittedAt}</span>
                <p>학교명: {application.schoolName || '미입력'}</p>
                <p>학생 연락처: {application.studentPhone}</p>
                <p>보호자 연락처: {application.parentPhone}</p>
                <p>이메일: {application.email}</p>
                {application.message && <p>문의사항: {application.message}</p>}
              </article>
            ))}
          </div>
        )}
      </details>
    </>
  );
}
