import { ArrowLeft } from 'lucide-react';

const representativePortrait =
  'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?cs=srgb&dl=pexels-yankrukov-8199562.jpg&fm=jpg';

export function CampIntroPage() {
  return (
    <section className="camp-intro-page">
      <a className="back-link" href="/#program">
        <ArrowLeft aria-hidden="true" />
        홈으로
      </a>

      <section className="professor-welcome" aria-label="한정훈 대표 환영 인사">
        <div className="professor-welcome__heading">
          <p>한정훈 대표</p>
          <h2>K-Nevada-Stem Camp의 방문을 환영합니다.</h2>
        </div>
        <div className="professor-welcome__body">
          <figure className="professor-welcome__portrait">
            <img alt="한정훈 대표" src={representativePortrait} />
          </figure>
          <div className="professor-welcome__message">
            <p>
              K-Nevada-Stem Camp는 학생들이 미국 네바다의 연구 현장 안에서 직접 질문하고,
              관찰하고, 실험하며 스스로 진로의 방향을 발견하도록 설계된 집중 프로그램입니다.
            </p>
            <p>
              DRI STEM Lab 실습과 대학 캠퍼스 경험, 후버댐과 그랜드캐년 필드러닝,
              Drone AI 워크숍을 하나의 흐름으로 연결해 학생들이 과학자의 사고방식을 몸으로
              경험할 수 있도록 돕겠습니다.
            </p>
            <p>
              이번 여정이 단순한 해외 캠프를 넘어, 학생 각자의 질문이 진로 로드맵과 포트폴리오로
              이어지는 의미 있는 출발점이 되기를 기대합니다.
            </p>
            <div className="professor-welcome__signature">
              <span>K-Nevada-Stem Camp</span>
              <strong>한정훈 대표</strong>
            </div>
            <dl className="professor-welcome__profile">
              <div>
                <dt>소속</dt>
                <dd>K-Nevada-Stem Camp</dd>
              </div>
              <div>
                <dt>역할</dt>
                <dd>프로그램 총괄 및 운영 대표</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="partnership-hero">
        <div className="partnership-hero__copy">
          <p className="eyebrow">Program Introduction</p>
          <h1 className="camp-intro-title">
            <span>K-Nevada-Stem Camp는 현지</span>
            <span>연구기관에서 진행되는 캠프입니다</span>
          </h1>
          <p>
            미국 네바다 DRI(Desert Research Institute, 사막연구소)에서 첨단 장비와 현직 과학자들과 함께
            실전 연구를 경험하는 7박 9일 집중 프로그램입니다.
          </p>
          <p>
            UNLV 기숙사 숙박, DRI STEM Lab 3일 집중, 후버댐 + 그랜드캐년 종일 견학,
            드론·AI 워크숍, BattleBots Destruct-A-Thon 현장 관람까지 7박 9일 안에 압축적으로
            진행하며, 귀국 후 DRI 공식 수료증과 1:1 맞춤형 STEM 진로 로드맵을 받습니다.
          </p>
          <figure className="camp-intro-poster">
            <img alt="STEM CAMP 캠프 소개 이미지" src="/media/stem-camp-intro.png" />
          </figure>
        </div>
      </div>
    </section>
  );
}
