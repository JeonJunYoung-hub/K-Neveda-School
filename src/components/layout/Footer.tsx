import { siteConfig } from '../../config/siteConfig';

export function Footer() {
  return (
    <footer className="site-footer">
      <p>{siteConfig.name}</p>
      <p>{siteConfig.footerNote}</p>
    </footer>
  );
}
