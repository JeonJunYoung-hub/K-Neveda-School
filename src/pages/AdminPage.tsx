import { ArrowLeft } from 'lucide-react';

export function AdminPage() {
  return (
    <section className="admin-page">
      <a className="back-link" href="/">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <div className="admin-login">
        <p className="eyebrow">Admin Center</p>
        <h1>관리자 페이지 준비 중</h1>
        <p>
          공지사항, 영상 및 갤러리, 상담문의, 캠프 신청 내역을 안전하게 관리하려면 관리자 로그인과 데이터베이스
          연결이 필요합니다.
        </p>
        <div className="admin-notice">
          학생 및 보호자 개인정보와 건강 관련 정보는 브라우저 비밀번호나 로컬 저장소만으로 보호하면 안전하지 않습니다.
          실제 운영 전 Supabase, Firebase, Netlify Identity 중 하나로 관리자 인증과 DB 저장을 연결하는 것을 권장합니다.
        </div>
      </div>
    </section>
  );
}
