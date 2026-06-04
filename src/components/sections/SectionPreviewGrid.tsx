import type { SiteSection } from '../../data/siteSections';

type SectionPreviewGridProps = {
  sections: SiteSection[];
};

export function SectionPreviewGrid({ sections }: SectionPreviewGridProps) {
  return (
    <section className="section-preview" id="sections">
      <div className="section-heading">
        <p className="eyebrow">Prepared modules</p>
        <h2>Ready for future camp content</h2>
      </div>

      <div className="preview-grid">
        {sections.map((section) => (
          <article className="preview-card" id={section.id} key={section.id}>
            <span className="card-index">{section.order.toString().padStart(2, '0')}</span>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
