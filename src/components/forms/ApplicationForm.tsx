import type { FormEvent } from 'react';
import { useState } from 'react';
import { createDocument, isFirebaseConfigured } from '../../lib/firebaseRest';

type ApplicationStep = 1 | 2 | 3;

type SavedApplication = {
  id: string;
  submittedAt: string;
  studentName: string;
  englishName: string;
  birthDate: string;
  gender: string;
  grade: string;
  camp: string;
  fatherName: string;
  motherName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  allergyStatus: string;
  allergyMemo: string;
  personalNeedsStatus: string;
  personalNeedsMemo: string;
  healthStatus: string;
  healthMemo: string;
  residence: string;
  referral: string;
};

const storageKey = 'k-nevada-camp-applications';
const years = Array.from({ length: 12 }, (_, index) => String(2009 + index));
const months = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));
const days = Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0'));

const privacyText = [
  '1) 개인 정보 수집 및 이용 동의서',
  '수집하는 개인정보 항목: 학생 및 보호자 성명, 연락처, 생년월일, 학년, 주소, 건강 관련 확인 사항, 참가 신청 관련 문의 내용.',
  '개인정보 수집 및 이용 목적: 캠프 신청 접수, 참가자 확인, 안전 관리, 출국 준비 안내, 보호자 연락, 프로그램 운영 안내.',
  '보유 및 이용 기간: 캠프 종료 후 5년 또는 관계 법령에서 정한 기간까지 보관 후 파기합니다.',
  '동의를 거부할 권리가 있으며, 필수 정보 제공에 동의하지 않을 경우 캠프 신청이 제한될 수 있습니다.',
].join('\n\n');

const campTermsText = [
  '제 1조 목적',
  '본 약관은 K-Nevada-School AI STEM 글로벌 캠프 참가와 관련하여 신청, 참가, 안전 수칙, 환불 및 운영 기준을 정합니다.',
  '제 2조 참가자의 의무',
  '참가자는 현지 인솔자와 운영진의 안전 지도를 따라야 하며, 정해진 프로그램 일정과 생활 규칙을 준수해야 합니다.',
  '제 3조 포함 사항',
  'DRI STEM Lab, 현지 이동, 주요 견학, 워크숍, 멘토링, 수료증 및 캠프 운영에 필요한 기본 프로그램이 포함됩니다.',
  '항공권, 개인 용돈, 개인 사유로 발생한 추가 비용 등은 별도 안내 기준을 따릅니다.',
].join('\n\n');

const safetyText = [
  '1) 안전, 건강, 폭력 예방 등에 관한 동의서',
  '참가자는 캠프 기간 중 안전 수칙과 인솔자의 안내를 준수해야 합니다.',
  '보호자는 참가자의 알레르기, 개인 특이사항, 건강상 문제를 사전에 정확히 알려야 합니다.',
  '운영진은 긴급 상황 발생 시 보호자에게 연락하고 현지 의료기관 또는 관계 기관과 협력해 조치할 수 있습니다.',
  '폭력, 따돌림, 차별, 위험 행동 등 공동체 안전을 해치는 행동은 즉시 제재될 수 있습니다.',
].join('\n\n');

export function ApplicationForm() {
  const [step, setStep] = useState<ApplicationStep>(1);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState<SavedApplication | null>(null);
  const [saveMessage, setSaveMessage] = useState('');

  const handleAgreement = () => {
    setHasAgreed(true);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const birthDate = [
      formData.get('birthYear'),
      formData.get('birthMonth'),
      formData.get('birthDay'),
    ]
      .filter(Boolean)
      .join('-');

    const application: SavedApplication = {
      id: `application-${Date.now()}`,
      submittedAt: new Date().toLocaleString('ko-KR'),
      studentName: String(formData.get('studentName') || ''),
      englishName: String(formData.get('englishName') || ''),
      birthDate,
      gender: String(formData.get('gender') || ''),
      grade: String(formData.get('grade') || ''),
      camp: String(formData.get('camp') || ''),
      fatherName: String(formData.get('fatherName') || ''),
      motherName: String(formData.get('motherName') || ''),
      parentPhone: String(formData.get('parentPhone') || ''),
      parentEmail: String(formData.get('parentEmail') || ''),
      address: String(formData.get('address') || ''),
      allergyStatus: String(formData.get('allergyStatus') || ''),
      allergyMemo: String(formData.get('allergyMemo') || ''),
      personalNeedsStatus: String(formData.get('personalNeedsStatus') || ''),
      personalNeedsMemo: String(formData.get('personalNeedsMemo') || ''),
      healthStatus: String(formData.get('healthStatus') || ''),
      healthMemo: String(formData.get('healthMemo') || ''),
      residence: String(formData.get('residence') || ''),
      referral: String(formData.get('referral') || ''),
    };

    const saveLocal = () => {
      const saved = window.localStorage.getItem(storageKey);
      const savedApplications = saved ? (JSON.parse(saved) as SavedApplication[]) : [];
      window.localStorage.setItem(storageKey, JSON.stringify([application, ...savedApplications]));
    };

    if (isFirebaseConfigured()) {
      try {
        await createDocument('applications', application);
        setSaveMessage('신청 정보가 접수되었습니다.');
      } catch (error) {
        saveLocal();
        const message = error instanceof Error ? error.message : '알 수 없는 Firebase 오류입니다.';
        setSaveMessage(`Firebase 저장 실패: ${message}`);
      }
    } else {
      saveLocal();
      setSaveMessage('Firebase 설정 전이라 현재 브라우저에 임시 저장했습니다.');
    }

    setSubmittedApplication(application);
    setStep(3);

    form.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="application-flow">
      <div className="application-flow__titlebar">
        <strong>캠프 참가신청</strong>
        <span>홈 - 캠프신청 - 캠프 참가신청</span>
      </div>

      <ol className="application-steps" aria-label="신청 단계">
        <li className={step >= 1 ? 'is-active' : undefined}>
          <span />
          <b>STEP.01</b>
          약관동의
        </li>
        <li className={step >= 2 ? 'is-active' : undefined}>
          <span />
          <b>STEP.02</b>
          참가 신청서 작성
        </li>
        <li className={step >= 3 ? 'is-active' : undefined}>
          <span />
          <b>STEP.03</b>
          신청 완료
        </li>
      </ol>

      {step === 1 && (
        <section className="application-agreement">
          <AgreementBox title="1. 개인정보수집 및 이용동의서" content={privacyText} />
          <AgreementBox title="2. 캠프신청 약관" content={campTermsText} />
          <AgreementBox title="3. 안전, 건강, 폭력예방 등에 관한 동의서" content={safetyText} />

          <div className="application-actions">
            <button onClick={handleAgreement} type="button">
              네, 동의합니다.
            </button>
            <a href="/">아니오, 동의하지 않습니다.</a>
          </div>
        </section>
      )}

      {step === 2 && (
        <form className="application-detail-form" onSubmit={handleSubmit}>
          <input name="agreement" type="hidden" value={hasAgreed ? '동의' : '미동의'} />

          <h2>학생정보</h2>
          <div className="form-table">
            <label>
              <span>이름 *</span>
              <input name="studentName" required type="text" />
            </label>
            <label>
              <span>여권상영문 *</span>
              <input name="englishName" required type="text" />
            </label>
            <label>
              <span>생년월일</span>
              <div className="inline-fields">
                <select name="birthYear">
                  <option value="">년</option>
                  {years.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
                <select name="birthMonth">
                  <option value="">월</option>
                  {months.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>
                <select name="birthDay">
                  <option value="">일</option>
                  {days.map((day) => (
                    <option key={day}>{day}</option>
                  ))}
                </select>
              </div>
            </label>
            <fieldset>
              <legend>성별</legend>
              <label>
                <input name="gender" type="radio" value="남자" /> 남자
              </label>
              <label>
                <input name="gender" type="radio" value="여자" /> 여자
              </label>
            </fieldset>
            <label>
              <span>학년</span>
              <select name="grade">
                <option>초등학교 5학년</option>
                <option>초등학교 6학년</option>
                <option>중학교 1학년</option>
                <option>중학교 2학년</option>
                <option>중학교 3학년</option>
              </select>
            </label>
            <label>
              <span>참가캠프</span>
              <select name="camp">
                <option>01. 미국 네바다 AI STEM 1기</option>
              </select>
            </label>
          </div>

          <h2>보호자정보</h2>
          <div className="form-table">
            <label>
              <span>아버지성함</span>
              <input name="fatherName" type="text" />
            </label>
            <label>
              <span>어머니성함</span>
              <input name="motherName" type="text" />
            </label>
            <label>
              <span>연락처 *</span>
              <input name="parentPhone" required type="tel" />
            </label>
            <label>
              <span>이메일</span>
              <input name="parentEmail" type="email" />
            </label>
            <label className="form-table__wide">
              <span>주소</span>
              <input name="address" type="text" />
            </label>
          </div>

          <h2>건강 및 확인사항</h2>
          <div className="form-table form-table--memo">
            <MemoField label="알레르기 유무 *" memoName="allergyMemo" radioName="allergyStatus" />
            <MemoField label="개인 특이사항 *" memoName="personalNeedsMemo" radioName="personalNeedsStatus" />
            <MemoField label="건강상 문제 *" memoName="healthMemo" radioName="healthStatus" />
            <label className="form-table__wide application-check">
              <span>동의사항</span>
              <label>
                <input required type="checkbox" /> 캠프 관련 사진, 동영상 촬영 및 이미지 활용에 동의합니다.
              </label>
            </label>
          </div>

          <h2>기타정보</h2>
          <div className="form-table">
            <label>
              <span>거주지역</span>
              <select name="residence">
                <option>서울</option>
                <option>경기</option>
                <option>인천</option>
                <option>대전</option>
                <option>대구</option>
                <option>부산</option>
                <option>기타</option>
              </select>
            </label>
            <label>
              <span>신청경로</span>
              <select name="referral">
                <option>지인소개</option>
                <option>SMS/문자</option>
                <option>검색</option>
                <option>홈페이지</option>
                <option>기타</option>
              </select>
            </label>
          </div>

          <div className="application-actions">
            <button type="submit">신청서 제출</button>
            <button onClick={() => setStep(1)} type="button">
              이전 단계
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <section className="application-complete">
          <b>STEP.03</b>
          <h2>신청이 완료되었습니다.</h2>
          <p>
            {submittedApplication?.studentName || '학생'}님의 신청 정보가 저장되었습니다. 운영팀 확인 후 안내드리겠습니다.
          </p>
          {saveMessage && <p className="application-complete__note">{saveMessage}</p>}
          <a href="/">홈으로 이동</a>
        </section>
      )}
    </div>
  );
}

function AgreementBox({ title, content }: { title: string; content: string }) {
  return (
    <article className="agreement-box">
      <h2>{title}</h2>
      <div tabIndex={0}>{content}</div>
    </article>
  );
}

function MemoField({ label, memoName, radioName }: { label: string; memoName: string; radioName: string }) {
  return (
    <fieldset className="memo-field">
      <legend>{label}</legend>
      <label>
        <input name={radioName} type="radio" value="유" /> 유
      </label>
      <label>
        <input defaultChecked name={radioName} type="radio" value="무" /> 무
      </label>
      <textarea name={memoName} rows={3} />
    </fieldset>
  );
}
