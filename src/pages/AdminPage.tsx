import type { FormEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
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

type NoticeItem = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  date: string;
};

type FaqItem = {
  id: string;
  number: string;
  title: string;
  answer: string;
};

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

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

type AdminSession = {
  email: string;
  expiresAt: number;
  idToken: string;
};

const adminSessionKey = 'k-nevada-firebase-admin-session';

function readAdminSession(): AdminSession | null {
  const saved = window.sessionStorage.getItem(adminSessionKey);
  if (!saved) {
    return null;
  }

  try {
    const session = JSON.parse(saved) as AdminSession;
    return session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
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
    if (!token || !isFirebaseConfigured()) {
      return;
    }

    const [noticeItems, faqItems, galleryItems, applicationItems] = await Promise.all([
      listDocuments<NoticeItem>('notices', token),
      listDocuments<FaqItem>('faqs', token),
      listDocuments<GalleryItem>('media', token),
      listDocuments<SavedApplication>('applications', token),
    ]);

    setNotices(noticeItems.sort((a, b) => (b.date || '').localeCompare(a.date || '')));
    setFaqs(faqItems.sort((a, b) => (b.number || '').localeCompare(a.number || '')));
    setMediaItems(galleryItems.reverse());
    setApplications(applicationItems.sort((a, b) => (b.submittedAt || '').localeCompare(a.submittedAt || '')));
  };

  useEffect(() => {
    if (!session) {
      return;
    }

    refreshData(session.idToken).catch((error) => setFeedback(error instanceof Error ? error.message : '관리 데이터를 불러오지 못했습니다.'));
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

      const nextSession: AdminSession = {
        email: response.email,
        expiresAt: Date.now() + Number(response.expiresIn) * 1000,
        idToken: response.idToken,
      };
      window.sessionStorage.setItem(adminSessionKey, JSON.stringify(nextSession));
      setSession(nextSession);
      setLoginError('');
      setFeedback('관리자 로그인이 완료되었습니다.');
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : '이메일 또는 비밀번호를 확인해 주세요.');
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
    const item: NoticeItem = {
      date: new Date().toISOString().slice(0, 10),
      description: String(formData.get('description') || ''),
      id: '',
      label: String(formData.get('label') || '공지'),
      number: String(notices.length + 1).padStart(2, '0'),
      title: String(formData.get('title') || ''),
    };
    const saved = await createDocument('notices', item, idToken);
    setNotices((items) => [saved as NoticeItem, ...items]);
    form.reset();
    setFeedback('공지사항이 등록되었습니다.');
  };

  const handleNoticeUpdate = async (event: FormEvent<HTMLFormElement>, id: string) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const patch = {
      description: String(formData.get('description') || ''),
      label: String(formData.get('label') || '공지'),
      title: String(formData.get('title') || ''),
    };
    await updateDocument('notices', id, patch, idToken);
    setNotices((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    setEditingNoticeId(null);
    setFeedback('공지사항이 수정되었습니다.');
  };

  const handleFaqCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const item: FaqItem = {
      answer: String(formData.get('answer') || ''),
      id: '',
      number: String(faqs.length + 1).padStart(2, '0'),
      title: String(formData.get('title') || ''),
    };
    const saved = await createDocument('faqs', item, idToken);
    setFaqs((items) => [saved as FaqItem, ...items]);
    form.reset();
    setFeedback('상담문의 글이 등록되었습니다.');
  };

  const handleFaqUpdate = async (event: FormEvent<HTMLFormElement>, id: string) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const patch = {
      answer: String(formData.get('answer') || ''),
      title: String(formData.get('title') || ''),
    };
    await updateDocument('faqs', id, patch, idToken);
    setFaqs((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    setEditingFaqId(null);
    setFeedback('상담문의 글이 수정되었습니다.');
  };

  const handleMediaCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const item: GalleryItem = {
      description: String(formData.get('description') || ''),
      id: '',
      imageUrl: String(formData.get('imageUrl') || ''),
      title: String(formData.get('title') || ''),
    };
    const saved = await createDocument('media', item, idToken);
    setMediaItems((items) => [saved as GalleryItem, ...items]);
    form.reset();
    setFeedback('영상 및 갤러리 글이 등록되었습니다.');
  };

  const handleMediaUpdate = async (event: FormEvent<HTMLFormElement>, id: string) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const patch = {
      description: String(formData.get('description') || ''),
      imageUrl: String(formData.get('imageUrl') || ''),
      title: String(formData.get('title') || ''),
    };
    await updateDocument('media', id, patch, idToken);
    setMediaItems((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    setEditingMediaId(null);
    setFeedback('영상 및 갤러리 글이 수정되었습니다.');
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
    if (collection === 'notices') {
      setNotices((items) => items.filter((item) => item.id !== id));
    }
    if (collection === 'faqs') {
      setFaqs((items) => items.filter((item) => item.id !== id));
    }
    if (collection === 'media') {
      setMediaItems((items) => items.filter((item) => item.id !== id));
    }
    if (collection === 'applications') {
      setApplications((items) => items.filter((item) => item.id !== id));
    }
    setFeedback('삭제했습니다.');
  };

  if (!isFirebaseConfigured()) {
    return <AdminSetupNotice />;
  }

  if (!session) {
    return (
      <section className="admin-page">
        <a className="back-link" href="/">
          <ArrowLeft aria-hidden="true" />
          홈으로
        </a>

        <div className="admin-login">
          <p className="eyebrow">Admin</p>
          <h1>관리자 로그인</h1>
          <p>Firebase Authentication에 등록한 관리자 이메일과 비밀번호로 로그인합니다.</p>
          <form onSubmit={handleLogin}>
            <label>
              <span>관리자 이메일</span>
              <input defaultValue={setup.adminEmail} name="email" placeholder="admin@example.com" required type="email" />
            </label>
            <label>
              <span>비밀번호</span>
              <input name="password" required type="password" />
            </label>
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
        <a className="back-link" href="/">
          <ArrowLeft aria-hidden="true" />
          홈으로
        </a>
        <div className="admin-top__actions">
          <button onClick={() => refreshData()} type="button">
            <RefreshCw aria-hidden="true" />
            새로고침
          </button>
          <button onClick={handleLogout} type="button">
            <LogOut aria-hidden="true" />
            로그아웃
          </button>
        </div>
      </div>

      <div className="board-hero">
        <p className="eyebrow">Admin Center</p>
        <h1>관리자 페이지</h1>
        <p>공지사항, 상담문의, 영상 및 갤러리, 캠프 신청자를 한곳에서 관리합니다.</p>
      </div>

      {feedback && <div className="admin-notice">{feedback}</div>}

      <nav className="admin-tabs" aria-label="관리 메뉴">
        <button className={activeTab === 'notices' ? 'is-active' : undefined} onClick={() => setActiveTab('notices')} type="button">
          공지사항
        </button>
        <button className={activeTab === 'faqs' ? 'is-active' : undefined} onClick={() => setActiveTab('faqs')} type="button">
          상담문의
        </button>
        <button className={activeTab === 'media' ? 'is-active' : undefined} onClick={() => setActiveTab('media')} type="button">
          영상 및 갤러리
        </button>
        <button
          className={activeTab === 'applications' ? 'is-active' : undefined}
          onClick={() => setActiveTab('applications')}
          type="button"
        >
          신청 관리
        </button>
      </nav>

      {activeTab === 'notices' && (
        <AdminPanel
          emptyText="등록된 공지사항이 없습니다."
          form={
            <form className="admin-write-form" onSubmit={handleNoticeCreate}>
              <label>
                <span>구분</span>
                <input name="label" placeholder="공지" type="text" />
              </label>
              <label>
                <span>제목</span>
                <input name="title" required type="text" />
              </label>
              <label className="admin-write-form__wide">
                <span>내용</span>
                <textarea name="description" required rows={5} />
              </label>
              <button type="submit">
                <PenLine aria-hidden="true" />
                공지 등록
              </button>
            </form>
          }
          items={notices.map((notice) => (
            <article className="admin-list-item" key={notice.id}>
              {editingNoticeId === notice.id ? (
                <form className="admin-inline-form" onSubmit={(event) => handleNoticeUpdate(event, notice.id)}>
                  <input defaultValue={notice.label} name="label" />
                  <input defaultValue={notice.title} name="title" />
                  <textarea defaultValue={notice.description} name="description" rows={4} />
                  <button type="submit">수정 저장</button>
                  <button onClick={() => setEditingNoticeId(null)} type="button">취소</button>
                </form>
              ) : (
                <div>
                  <span>{notice.label} · {notice.date}</span>
                  <strong>{notice.title}</strong>
                  <p>{notice.description}</p>
                </div>
              )}
              <div className="admin-list-item__actions">
                <button onClick={() => setEditingNoticeId(notice.id)} type="button">수정</button>
                <button onClick={() => handleDelete('notices', notice.id)} type="button">
                  <Trash2 aria-hidden="true" />
                  삭제
                </button>
              </div>
            </article>
          ))}
          title="공지사항 관리"
        />
      )}

      {activeTab === 'faqs' && (
        <AdminPanel
          emptyText="등록된 상담문의 글이 없습니다."
          form={
            <form className="admin-write-form" onSubmit={handleFaqCreate}>
              <label>
                <span>질문</span>
                <input name="title" required type="text" />
              </label>
              <label>
                <span>답변</span>
                <textarea name="answer" required rows={5} />
              </label>
              <button type="submit">
                <PenLine aria-hidden="true" />
                FAQ 등록
              </button>
            </form>
          }
          items={faqs.map((item) => (
            <article className="admin-list-item" key={item.id}>
              {editingFaqId === item.id ? (
                <form className="admin-inline-form" onSubmit={(event) => handleFaqUpdate(event, item.id)}>
                  <input defaultValue={item.title} name="title" />
                  <textarea defaultValue={item.answer} name="answer" rows={4} />
                  <button type="submit">수정 저장</button>
                  <button onClick={() => setEditingFaqId(null)} type="button">취소</button>
                </form>
              ) : (
                <div>
                  <span>FAQ {item.number}</span>
                  <strong>{item.title}</strong>
                  <p>{item.answer}</p>
                </div>
              )}
              <div className="admin-list-item__actions">
                <button onClick={() => setEditingFaqId(item.id)} type="button">수정</button>
                <button onClick={() => handleDelete('faqs', item.id)} type="button">
                  <Trash2 aria-hidden="true" />
                  삭제
                </button>
              </div>
            </article>
          ))}
          title="상담문의 관리"
        />
      )}

      {activeTab === 'media' && (
        <AdminPanel
          emptyText="등록된 영상 및 갤러리 글이 없습니다."
          form={
            <form className="admin-write-form" onSubmit={handleMediaCreate}>
              <label>
                <span>제목</span>
                <input name="title" required type="text" />
              </label>
              <label>
                <span>이미지 주소</span>
                <input name="imageUrl" placeholder="https://..." required type="url" />
              </label>
              <label className="admin-write-form__wide">
                <span>설명</span>
                <textarea name="description" required rows={5} />
              </label>
              <button type="submit">
                <PenLine aria-hidden="true" />
                갤러리 등록
              </button>
            </form>
          }
          items={mediaItems.map((item) => (
            <article className="admin-list-item admin-list-item--media" key={item.id}>
              <img alt="" src={item.imageUrl} />
              {editingMediaId === item.id ? (
                <form className="admin-inline-form" onSubmit={(event) => handleMediaUpdate(event, item.id)}>
                  <input defaultValue={item.title} name="title" />
                  <input defaultValue={item.imageUrl} name="imageUrl" type="url" />
                  <textarea defaultValue={item.description} name="description" rows={4} />
                  <button type="submit">수정 저장</button>
                  <button onClick={() => setEditingMediaId(null)} type="button">취소</button>
                </form>
              ) : (
                <div>
                  <span>Gallery</span>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              )}
              <div className="admin-list-item__actions">
                <button onClick={() => setEditingMediaId(item.id)} type="button">수정</button>
                <button onClick={() => handleDelete('media', item.id)} type="button">
                  <Trash2 aria-hidden="true" />
                  삭제
                </button>
              </div>
            </article>
          ))}
          title="영상 및 갤러리 관리"
        />
      )}

      {activeTab === 'applications' && (
        <AdminPanel
          emptyText="저장된 캠프 신청이 아직 없습니다."
          items={applications.map((application) => (
            <article className="admin-list-item admin-list-item--application" key={application.id}>
              <div>
                <span>{application.submittedAt} · {application.status || '접수'}</span>
                <strong>{application.studentName || '이름 미입력'} · {application.grade}</strong>
                <dl>
                  <div><dt>영문명</dt><dd>{application.englishName || '-'}</dd></div>
                  <div><dt>생년월일</dt><dd>{application.birthDate || '-'}</dd></div>
                  <div><dt>성별</dt><dd>{application.gender || '-'}</dd></div>
                  <div><dt>보호자</dt><dd>{application.fatherName || application.motherName || '-'}</dd></div>
                  <div><dt>연락처</dt><dd>{application.parentPhone || '-'}</dd></div>
                  <div><dt>이메일</dt><dd>{application.parentEmail || '-'}</dd></div>
                  <div><dt>주소</dt><dd>{application.address || '-'}</dd></div>
                  <div><dt>알레르기</dt><dd>{application.allergyStatus} {application.allergyMemo}</dd></div>
                  <div><dt>개인 특이사항</dt><dd>{application.personalNeedsStatus} {application.personalNeedsMemo}</dd></div>
                  <div><dt>건강</dt><dd>{application.healthStatus} {application.healthMemo}</dd></div>
                  <div><dt>신청경로</dt><dd>{application.referral || '-'}</dd></div>
                </dl>
                <form className="admin-status-form" onSubmit={(event) => handleApplicationStatus(event, application.id)}>
                  <select defaultValue={application.status || '접수'} name="status">
                    <option>접수</option>
                    <option>확인 중</option>
                    <option>연락 완료</option>
                    <option>등록 확정</option>
                    <option>보류</option>
                  </select>
                  <button type="submit">상태 저장</button>
                </form>
              </div>
              <div className="admin-list-item__actions">
                <button onClick={() => handleDelete('applications', application.id)} type="button">
                  <Trash2 aria-hidden="true" />
                  삭제
                </button>
              </div>
            </article>
          ))}
          title="캠프 신청 관리"
        />
      )}
    </section>
  );
}

function AdminSetupNotice() {
  return (
    <section className="admin-page">
      <a className="back-link" href="/">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <div className="admin-login">
        <p className="eyebrow">Firebase Setup</p>
        <h1>Firebase 설정 필요</h1>
        <p>Netlify 환경변수에 Firebase 프로젝트 정보를 넣으면 관리자 로그인이 활성화됩니다.</p>
        <div className="admin-notice">
          필요한 환경변수: VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_ADMIN_EMAIL
        </div>
      </div>
    </section>
  );
}

function AdminPanel({
  emptyText,
  form,
  items,
  title,
}: {
  emptyText: string;
  form?: ReactNode;
  items: ReactNode[];
  title: string;
}) {
  return (
    <section className="admin-panel">
      <h2>{title}</h2>
      {form}
      <div className="admin-list">
        {items.length > 0 ? items : <p className="admin-empty">{emptyText}</p>}
      </div>
    </section>
  );
}
