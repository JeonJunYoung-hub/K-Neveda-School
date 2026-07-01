import { siteConfig } from '../../config/siteConfig';

export function Footer() {
  return (
    <footer className="site-footer">
      <p>{siteConfig.name}</p>
      <p>{siteConfig.footerNote}</p>
      <p>© 2026 K-EnterTech Hub. 본 사이트의 이미지는 각 출처의 저작권을 따릅니다.</p>
    </footer>
  );
}
