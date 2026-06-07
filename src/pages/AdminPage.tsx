import type { FormEvent, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, LogOut, PenLine, RefreshCw, Trash2 } from 'lucide-react';
import {
  createDocument,
  deleteDocument,
  getFirebaseSetupStatus,
  isFirebaseConfigured,
  listDocuments,
  signInAdmin,
  updateDocument,
} from '../lib/firebaseRest';

type AdminTab = 'notices' | 'faqs' | 'media' | 'applications';

type NoticeItem = { id: string; number?: string; label: string; title: string; description: string; date: string };
type FaqItem = { id: string; number?: string; content?: string; title: string; answer: string; date?: string };
type GalleryItem = { id: string; title: string; description: string; imageUrl: string; date?: string };
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
  status?: string;
};

type AdminSession = { email: string; expiresAt: number; idToken: string };

const adminSessionKey = 'k-nevada-firebase-admin-session';
const statusOptions = ['접수', '확인 중', '연락 완료', '등록 확정', '보류'];

function readAdminSession(): AdminSession | null {
  const saved = window.sessionStorage.getItem(adminSessionKey);
  if (!saved) return null;
  try {
    const session = JSON.parse(saved) as AdminSession;
    return session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
}

function formatDate(value?: string) {
  return value ? value.slice(0, 10) : new Date().toISOString().slice(0, 10);
}

function rowNumber(index: number) {
  return String(index + 1).padStart(2, '0');
}

function sortByDate<T extends { date?: string; submittedAt?: string }>(items: T[]) {
  return [...items].sort((a, b) => (b.date || b.submittedAt || '').localeCompare(a.date || a.submittedAt || ''));
}

export function AdminPage() {
  const setup = getFirebaseSetupStatus();
  const [activeTab, setActiveTab] = useState<AdminTab>('notices');
  const [applications, setApplications] = useState<SavedApplication[]>([]);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [feedback, setFeedback] = useState('');
  const [loginError, setLoginError] = useState('');
  const [mediaItems, setMediaItems] = useState<GalleryItem[]>([]);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [session, setSession] = useState<AdminSession | null>(() => readAdminSession());
  const idToken = session?.idToken || '';

  const refreshData = async (token = idToken) => {
    if (!token || !isFirebaseConfigured()) return;
    const [noticeItems, faqItems, galleryItems, applicationItems] = await Promise.all([
      listDocuments<NoticeItem>('notices', token),
      listDocuments<FaqItem>('faqs', token),
      listDocuments<GalleryItem>('media', token),
      listDocuments<SavedApplication>('applications', token),
    ]);
    setNotices(sortByDate(noticeItems));
    setFaqs(sortByDate(faqItems));
    setMediaItems(sortByDate(galleryItems));
    setApplications(
      sortByDate(applicationItems.filter((item) => item.id !== 'diagnostic-delete-me' && item.studentName !== 'diagnostic')),
    );
  };

  useEffect(() => {
    if (!session) return;
    refreshData(session.idToken).catch((error) => {
      const message = error instanceof Error ? error.message : '알 수 없는 오류입니다.';
      setFeedback(`관리 데이터를 불러오지 못했습니다: ${message}`);
    });
  }, [session]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '').trim();
    try {
      const response = await signInAdmin(email, password);
      if (setup.adminEmail && response.email !== setup.adminEmail) {
        setLoginError('등록된 관리자 이메일 계정만 로그인할 수 있습니다.');
        return;
      }
      const nextSession = { email: response.email, expiresAt: Date.now() + Number(response.expiresIn) * 1000, idToken: response.idToken };
      window.sessionStorage.setItem(adminSessionKey, JSON.stringify(nextSession));
      setSession(nextSession);
      setLoginError('');
      setFeedback('관리자 로그인이 완료되었습니다.');
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : '로그인에 실패했습니다.');
    }
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(adminSessionKey);
    setSession(null);
  };

  const handleNoticeCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const item = {
      date: new Date().toISOString().slice(0, 10),
      description: String(formData.get('description') || ''),
      id: '',
      label: String(formData.get('label') || '공지'),
      title: String(formData.get('title') || ''),
    };
    const saved = await createDocument('notices', item, idToken);
    setNotices((items) => sortByDate([saved as NoticeItem, ...items]));
    form.reset();
    setFeedback('공지사항을 등록했습니다.');
  };

  const handleNoticeUpdate = async (event: FormEvent<HTMLFormElement>, id: string) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const patch = { description: String(formData.get('description') || ''), label: String(formData.get('label') || '공지'), title: String(formData.get('title') || '') };
    await updateDocument('notices', id, patch, idToken);
    setNotices((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    setEditingNoticeId(null);
    setFeedback('공지사항을 수정했습니다.');
  };

  const handleFaqCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const item = {
      answer: String(formData.get('answer') || ''),
      content: String(formData.get('content') || ''),
      date: new Date().toISOString().slice(0, 10),
      id: '',
      title: String(formData.get('title') || ''),
    };
    const saved = await createDocument('faqs', item, idToken);
    setFaqs((items) => sortByDate([saved as FaqItem, ...items]));
    form.reset();
    setFeedback('상담문의 글을 등록했습니다.');
  };

  const handleFaqUpdate = async (event: FormEvent<HTMLFormElement>, id: string) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const patch = { answer: String(formData.get('answer') || ''), content: String(formData.get('content') || ''), title: String(formData.get('title') || '') };
    await updateDocument('faqs', id, patch, idToken);
    setFaqs((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    setEditingFaqId(null);
    setFeedback('상담문의 답변을 저장했습니다.');
  };

  const handleMediaCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const item = { date: new Date().toISOString().slice(0, 10), description: String(formData.get('description') || ''), id: '', imageUrl: String(formData.get('imageUrl') || ''), title: String(formData.get('title') || '') };
    const saved = await createDocument('media', item, idToken);
    setMediaItems((items) => sortByDate([saved as GalleryItem, ...items]));
    form.reset();
    setFeedback('영상 및 갤러리 글을 등록했습니다.');
  };

  const handleMediaUpdate = async (event: FormEvent<HTMLFormElement>, id: string) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const patch = { description: String(formData.get('description') || ''), imageUrl: String(formData.get('imageUrl') || ''), title: String(formData.get('title') || '') };
    await updateDocument('media', id, patch, idToken);
    setMediaItems((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    setEditingMediaId(null);
    setFeedback('영상 및 갤러리 글을 수정했습니다.');
  };

  const handleApplicationStatus = async (event: FormEvent<HTMLFormElement>, id: string) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const status = String(formData.get('status') || '접수');
    await updateDocument('applications', id, { status }, idToken);
    setApplications((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
    setFeedback('신청 상태를 수정했습니다.');
  };

  const handleDelete = async (collection: AdminTab, id: string) => {
    await deleteDocument(collection, id, idToken);
    if (collection === 'notices') setNotices((items) => items.filter((item) => item.id !== id));
    if (collection === 'faqs') setFaqs((items) => items.filter((item) => item.id !== id));
    if (collection === 'media') setMediaItems((items) => items.filter((item) => item.id !== id));
    if (collection === 'applications') setApplications((items) => items.filter((item) => item.id !== id));
    setFeedback('삭제했습니다.');
  };

  if (!isFirebaseConfigured()) return <AdminSetupNotice />;
  if (!session) {
    return (
      <section className="admin-page">
        <a className="back-link" href="/"><ArrowLeft aria-hidden="true" />홈으로</a>
        <div className="admin-login">
          <p className="eyebrow">Admin</p>
          <h1>관리자 로그인</h1>
          <p>Firebase Authentication에 등록한 관리자 이메일과 비밀번호로 로그인합니다.</p>
          <form onSubmit={handleLogin}>
            <label><span>관리자 이메일</span><input defaultValue={setup.adminEmail} name="email" placeholder="admin@example.com" required type="email" /></label>
            <label><span>비밀번호</span><input name="password" required type="password" /></label>
            {loginError && <strong>{loginError}</strong>}
            <button type="submit">로그인</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page admin-page--dashboard">
      <div className="admin-top">
        <a className="back-link" href="/"><ArrowLeft aria-hidden="true" />홈으로</a>
        <div className="admin-top__actions">
          <button onClick={() => refreshData()} type="button"><RefreshCw aria-hidden="true" />새로고침</button>
          <button onClick={handleLogout} type="button"><LogOut aria-hidden="true" />로그아웃</button>
        </div>
      </div>
      <div className="board-hero"><p className="eyebrow">Admin Center</p><h1>관리자 페이지</h1><p>공지사항, 상담문의, 영상 및 갤러리, 캠프 신청자를 한곳에서 관리합니다.</p></div>
      {feedback && <div className="admin-notice">{feedback}</div>}
      <nav className="admin-tabs" aria-label="관리 메뉴">
        <button className={activeTab === 'notices' ? 'is-active' : undefined} onClick={() => setActiveTab('notices')} type="button">공지사항</button>
        <button className={activeTab === 'faqs' ? 'is-active' : undefined} onClick={() => setActiveTab('faqs')} type="button">상담문의</button>
        <button className={activeTab === 'media' ? 'is-active' : undefined} onClick={() => setActiveTab('media')} type="button">영상 및 갤러리</button>
        <button className={activeTab === 'applications' ? 'is-active' : undefined} onClick={() => setActiveTab('applications')} type="button">신청관리</button>
      </nav>

      {activeTab === 'notices' && <AdminBoard emptyText="등록된 공지사항이 없습니다." form={<NoticeCreateForm onSubmit={handleNoticeCreate} />} head={['번호', '구분', '제목', '등록일']} title="공지사항 관리">{notices.map((notice, index) => <details className="board-table__row board-table__row--expandable admin-board-row" key={notice.id}><summary><span>{rowNumber(index)}</span><span>{notice.label || '공지'}</span><strong>{notice.title}</strong><time>{formatDate(notice.date)}</time></summary><div className="board-row-detail">{editingNoticeId === notice.id ? <form className="admin-board-edit-form" onSubmit={(event) => handleNoticeUpdate(event, notice.id)}><input defaultValue={notice.label} name="label" placeholder="구분" /><input defaultValue={notice.title} name="title" placeholder="제목" /><textarea defaultValue={notice.description} name="description" rows={6} /><div className="admin-board-actions"><button type="submit">수정 저장</button><button onClick={() => setEditingNoticeId(null)} type="button">취소</button></div></form> : <><p className="admin-board-detail-text">{notice.description}</p><div className="admin-board-actions"><button onClick={() => setEditingNoticeId(notice.id)} type="button">수정</button><button onClick={() => handleDelete('notices', notice.id)} type="button"><Trash2 aria-hidden="true" />삭제</button></div></>}</div></details>)}</AdminBoard>}

      {activeTab === 'faqs' && <AdminBoard emptyText="등록된 상담문의 글이 없습니다." form={<FaqCreateForm onSubmit={handleFaqCreate} />} head={['번호', '구분', '제목', '상태']} title="상담문의 관리">{faqs.map((item, index) => <details className="board-table__row board-table__row--expandable admin-board-row" key={item.id}><summary><span>{rowNumber(index)}</span><span>상담</span><strong>{item.title}</strong><time>{item.answer ? '답변 완료' : '답변 대기'}</time></summary><div className="board-row-detail">{editingFaqId === item.id ? <form className="admin-board-edit-form" onSubmit={(event) => handleFaqUpdate(event, item.id)}><input defaultValue={item.title} name="title" placeholder="질문" /><textarea defaultValue={item.content} name="content" placeholder="문의 내용" rows={5} /><textarea defaultValue={item.answer} name="answer" placeholder="답변을 입력하세요." rows={7} /><div className="admin-board-actions"><button type="submit">답변 저장</button><button onClick={() => setEditingFaqId(null)} type="button">취소</button></div></form> : <><div className="admin-answer-box"><b>질문</b><p>{item.title}</p></div><div className="admin-answer-box"><b>문의 내용</b><p>{item.content || '-'}</p></div><div className="admin-answer-box"><b>답변</b><p>{item.answer || '아직 답변이 등록되지 않았습니다.'}</p></div><div className="admin-board-actions"><button onClick={() => setEditingFaqId(item.id)} type="button">{item.answer ? '답변 수정' : '답변 등록'}</button><button onClick={() => handleDelete('faqs', item.id)} type="button"><Trash2 aria-hidden="true" />삭제</button></div></>}</div></details>)}</AdminBoard>}

      {activeTab === 'media' && <AdminBoard emptyText="등록된 영상 및 갤러리 글이 없습니다." form={<MediaCreateForm onSubmit={handleMediaCreate} />} head={['번호', '구분', '제목', '등록일']} title="영상 및 갤러리 관리">{mediaItems.map((item, index) => <details className="board-table__row board-table__row--expandable admin-board-row" key={item.id}><summary><span>{rowNumber(index)}</span><span>갤러리</span><strong>{item.title}</strong><time>{formatDate(item.date)}</time></summary><div className="board-row-detail">{editingMediaId === item.id ? <form className="admin-board-edit-form" onSubmit={(event) => handleMediaUpdate(event, item.id)}><input defaultValue={item.title} name="title" placeholder="제목" /><input defaultValue={item.imageUrl} name="imageUrl" placeholder="이미지 주소" type="url" /><textarea defaultValue={item.description} name="description" rows={6} /><div className="admin-board-actions"><button type="submit">수정 저장</button><button onClick={() => setEditingMediaId(null)} type="button">취소</button></div></form> : <>{item.imageUrl && <img alt="" className="admin-media-preview" src={item.imageUrl} />}<p className="admin-board-detail-text">{item.description}</p><div className="admin-board-actions"><button onClick={() => setEditingMediaId(item.id)} type="button">수정</button><button onClick={() => handleDelete('media', item.id)} type="button"><Trash2 aria-hidden="true" />삭제</button></div></>}</div></details>)}</AdminBoard>}

      {activeTab === 'applications' && <section className="admin-panel"><h2>캠프 신청 관리</h2><div className="admin-list">{applications.length > 0 ? applications.map((application, index) => <article className="admin-list-item admin-list-item--application" key={application.id}><div><span>{rowNumber(index)} · {formatDate(application.submittedAt)} · {application.status || '접수'}</span><strong>신청 K-Nevada-School {application.studentName || '이름 미입력'}</strong><ApplicationDetail application={application} /><form className="admin-status-form" onSubmit={(event) => handleApplicationStatus(event, application.id)}><select defaultValue={application.status || '접수'} name="status">{statusOptions.map((status) => <option key={status}>{status}</option>)}</select><button type="submit">상태 저장</button></form></div><div className="admin-list-item__actions"><button onClick={() => handleDelete('applications', application.id)} type="button"><Trash2 aria-hidden="true" />삭제</button></div></article>) : <p className="admin-empty">저장된 캠프 신청이 아직 없습니다.</p>}</div></section>}
    </section>
  );
}

function AdminSetupNotice() {
  return <section className="admin-page"><a className="back-link" href="/"><ArrowLeft aria-hidden="true" />홈으로</a><div className="admin-login"><p className="eyebrow">Firebase Setup</p><h1>Firebase 설정 필요</h1><p>Netlify 환경변수에 Firebase 프로젝트 정보를 넣으면 관리자 로그인이 활성화됩니다.</p><div className="admin-notice">필요한 환경변수: VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_ADMIN_EMAIL</div></div></section>;
}

function AdminBoard({ children, emptyText, form, head, title }: { children: ReactNode; emptyText: string; form?: ReactNode; head: string[]; title: string }) {
  const rows = useMemo(() => (Array.isArray(children) ? children.filter(Boolean) : children ? [children] : []), [children]);
  return <section className="admin-panel admin-board-shell"><h2>{title}</h2>{form}<div className="board-table admin-board-table"><div className="board-table__head">{head.map((item) => <span key={item}>{item}</span>)}</div>{rows.length > 0 ? rows : <p className="admin-empty">{emptyText}</p>}</div></section>;
}

function NoticeCreateForm({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <form className="admin-write-form" onSubmit={onSubmit}><label><span>구분</span><input name="label" placeholder="공지" type="text" /></label><label><span>제목</span><input name="title" required type="text" /></label><label className="admin-write-form__wide"><span>내용</span><textarea name="description" required rows={5} /></label><button type="submit"><PenLine aria-hidden="true" />공지 등록</button></form>;
}

function FaqCreateForm({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <form className="admin-write-form" onSubmit={onSubmit}><label><span>질문</span><input name="title" required type="text" /></label><label className="admin-write-form__wide"><span>문의 내용</span><textarea name="content" placeholder="사용자 문의 내용 또는 FAQ 설명을 입력하세요." rows={4} /></label><label className="admin-write-form__wide"><span>답변</span><textarea name="answer" placeholder="관리자 답변을 입력하세요." rows={5} /></label><button type="submit"><PenLine aria-hidden="true" />상담문의 등록</button></form>;
}

function MediaCreateForm({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <form className="admin-write-form" onSubmit={onSubmit}><label><span>제목</span><input name="title" required type="text" /></label><label><span>이미지 주소</span><input name="imageUrl" placeholder="https://..." required type="url" /></label><label className="admin-write-form__wide"><span>설명</span><textarea name="description" required rows={5} /></label><button type="submit"><PenLine aria-hidden="true" />갤러리 등록</button></form>;
}

function ApplicationDetail({ application }: { application: SavedApplication }) {
  return <div className="admin-application-detail"><ApplicationSection rows={[["이름", application.studentName], ["여권상영문", application.englishName], ["생년월일", application.birthDate], ["성별", application.gender], ["학년", application.grade], ["참가캠프", application.camp]]} title="학생정보" /><ApplicationSection rows={[["아버지성함", application.fatherName], ["어머니성함", application.motherName], ["연락처", application.parentPhone], ["이메일", application.parentEmail], ["주소", application.address]]} title="보호자정보" /><ApplicationSection rows={[["알레르기 유무", `${application.allergyStatus || '-'} ${application.allergyMemo || ''}`], ["개인 특이사항", `${application.personalNeedsStatus || '-'} ${application.personalNeedsMemo || ''}`], ["건강상 문제", `${application.healthStatus || '-'} ${application.healthMemo || ''}`]]} title="건강 및 확인사항" /><ApplicationSection rows={[["거주지", application.residence], ["신청경로", application.referral], ["신청상태", application.status || '접수']]} title="기타정보" /></div>;
}

function ApplicationSection({ rows, title }: { rows: Array<[string, string | undefined]>; title: string }) {
  return <section className="admin-application-section"><h3>{title}</h3><div className="admin-application-grid">{rows.map(([label, value]) => <div className={label === '주소' ? 'admin-application-row admin-application-row--wide' : 'admin-application-row'} key={label}><b>{label}</b><span>{value || '-'}</span></div>)}</div></section>;
}
