import { DefaultLayout } from './components/layout/DefaultLayout';
import { ApplyPage } from './pages/ApplyPage';
import { CampIntroPage } from './pages/CampIntroPage';
import { HomePage } from './pages/HomePage';
import { MediaPage } from './pages/MediaPage';
import { NoticesPage } from './pages/NoticesPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';
import { SchedulePage } from './pages/SchedulePage';
import { TeamPage } from './pages/TeamPage';

export function App() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const programMatch = currentPath.match(/^\/program\/([^/]+)$/);
  const page =
    currentPath === '/program/overview' ? (
      <CampIntroPage />
    ) : currentPath === '/program/schedule' ? (
      <SchedulePage />
    ) : programMatch ? (
      <ProgramDetailPage slug={programMatch[1]} />
    ) : currentPath === '/apply' ? (
      <ApplyPage />
    ) : currentPath === '/notices' ? (
      <NoticesPage />
    ) : currentPath === '/media' ? (
      <MediaPage />
    ) : currentPath === '/team' ? (
      <TeamPage />
    ) : (
      <HomePage />
    );

  return (
    <DefaultLayout currentPath={currentPath}>
      {page}
    </DefaultLayout>
  );
}
