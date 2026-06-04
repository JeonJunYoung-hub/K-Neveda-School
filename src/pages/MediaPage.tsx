import { ArrowLeft } from 'lucide-react';

const galleryItems = [
  {
    title: 'DRI STEM Lab',
    description: '연구소 실험과 데이터 분석 중심 실습',
    imageUrl:
      'https://images.pexels.com/photos/6208709/pexels-photo-6208709.jpeg?cs=srgb&dl=pexels-cottonbro-6208709.jpg&fm=jpg',
  },
  {
    title: 'Drone & AI Workshop',
    description: 'UAV 자율비행과 AI 알고리즘 워크숍',
    imageUrl:
      'https://images.pexels.com/photos/5734963/pexels-photo-5734963.jpeg?cs=srgb&dl=pexels-ramazannatass-5734963.jpg&fm=jpg',
  },
  {
    title: 'Hoover Dam + Grand Canyon',
    description: '공학과 지질을 연결하는 현장 견학',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg/1280px-Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6042.jpg',
  },
  {
    title: 'Mentoring',
    description: '소수정예 학생을 위한 밀착 멘토링',
    imageUrl:
      'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?cs=srgb&dl=pexels-max-fischer-5212345.jpg&fm=jpg',
  },
] as const;

export function MediaPage() {
  return (
    <section className="camp-intro-page">
      <a className="back-link" href="/">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <div className="intro-hero">
        <p className="eyebrow">Video & Gallery</p>
        <h1>영상 및 갤러리</h1>
        <p>연구실 실습, 드론 워크숍, 네바다 현장 견학 분위기를 미리 확인하세요.</p>
      </div>

      <div className="media-video">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          src="https://www.youtube.com/embed/u0qFC3z4IKI"
          title="K-Nevada Camp 소개 영상"
        />
      </div>

      <div className="gallery-list">
        {galleryItems.map((item) => (
          <figure className="gallery-card" key={item.title}>
            <img alt="" src={item.imageUrl} />
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
