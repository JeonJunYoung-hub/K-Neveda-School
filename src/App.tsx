import { DefaultLayout } from './components/layout/DefaultLayout';
import { ApplyPage } from './pages/ApplyPage';
import { HomePage } from './pages/HomePage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';

export function App() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const programMatch = currentPath.match(/^\/program\/([^/]+)$/);
  const page = programMatch ? (
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
