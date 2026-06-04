import { DefaultLayout } from './components/layout/DefaultLayout';
import { ApplyPage } from './pages/ApplyPage';
import { CampIntroPage } from './pages/CampIntroPage';
import { HomePage } from './pages/HomePage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';
import { SchedulePage } from './pages/SchedulePage';

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
    ) : (
      <HomePage />
    );

  return (
    <DefaultLayout currentPath={currentPath}>
      {page}
    </DefaultLayout>
  );
}
