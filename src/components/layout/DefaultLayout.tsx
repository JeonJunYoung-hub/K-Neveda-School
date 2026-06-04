import type { PropsWithChildren } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { Footer } from './Footer';
import { Header } from './Header';

type DefaultLayoutProps = PropsWithChildren<{
  currentPath: string;
}>;

export function DefaultLayout({ children, currentPath }: DefaultLayoutProps) {
  return (
    <div className="app-shell">
      <Header currentPath={currentPath} />
      <main>{children}</main>
      <Footer />
      <BottomNavigation currentPath={currentPath} />
    </div>
  );
}
