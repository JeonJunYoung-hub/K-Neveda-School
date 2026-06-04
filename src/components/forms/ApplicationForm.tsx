import type { FormEvent } from 'react';
import { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { campContent } from '../../data/campContent';

const grades = ['초5', '초6', '중1', '중2', '중3'];

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const lines = [
      `[${campContent.title} 신청]`,
      '',
      `학생 이름: ${formData.get('studentName')}`,
      `학년: ${formData.get('grade')}`,
      `학교명: ${formData.get('schoolName') || '-'}`,
      `보호자 연락처: ${formData.get('parentPhone')}`,
      `이메일: ${formData.get('email')}`,
      `문의사항: ${formData.get('message') || '-'}`,
    ];

    const subject = encodeURIComponent(`${campContent.title} 캠프 신청`);
    const body = encodeURIComponent(lines.join('\n'));

    setSubmitted(true);
    window.location.href = `mailto:${siteConfig.contact.applicationEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="application-form" onSubmit={handleSubmit}>
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

      <p className="form-footnote">
        제출 후 24시간 내 담당자가 연락드립니다.
        {submitted ? ' 이메일 작성 창이 열리지 않으면 상담 버튼으로 문의해주세요.' : ''}
      </p>
    </form>
  );
}
