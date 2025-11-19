import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDemo from "./navbar-demo";

interface ResourceItem {
  id: string;
  type: "PDF" | "PPTX" | "DOCX";
  title: string;
  size: string;
}

interface ResourceSectionProps {
  title: string;
  description?: string;
  iconLabel: string;
  resources: ResourceItem[];
}

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface FeaturedResource {
  id: string;
  title: string;
  type: ResourceItem["type"];
  description: string;
  status: string;
  size: string;
}

const resourceTypeClass: Record<ResourceItem["type"], string> = {
  PDF: "pill--pdf",
  PPTX: "pill--pptx",
  DOCX: "pill--docx",
};

const quickActions: QuickAction[] = [
  {
    id: "qa-all",
    label: "Browse everything",
    description: "Search the full asset library",
    icon: "🗂️",
  },
  {
    id: "qa-templates",
    label: "Download templates",
    description: "Townhall, newsletter & posters",
    icon: "📑",
  },
  {
    id: "qa-ask",
    label: "Ask a strategist",
    description: "Get guidance in <10 min",
    icon: "⚡",
  },
  {
    id: "qa-share",
    label: "Share success",
    description: "Submit your local win",
    icon: "🏆",
  },
];

const featuredResources: FeaturedResource[] = [
  {
    id: "feat-1",
    title: "2025 Transformation Narrative",
    type: "PDF",
    description: "Executive-ready storyline with key proof points.",
    status: "Updated this week",
    size: "2.3 MB",
  },
  {
    id: "feat-2",
    title: "Leadership Briefing Mega Deck",
    type: "PPTX",
    description: "80+ slides, modular sections, plug & play visuals.",
    status: "Slides refreshed",
    size: "6.8 MB",
  },
  {
    id: "feat-3",
    title: "Manager Talking Points",
    type: "DOCX",
    description: "Short-form Q&A to cover top employee questions.",
    status: "Vetted by People Ops",
    size: "1.1 MB",
  },
];

const resourceSections: ResourceSectionProps[] = [
  {
    title: "Key Messages",
    description: "Core narrative, elevator pitch, and briefing notes.",
    iconLabel: "KM",
    resources: [
      { id: "key-1", type: "PDF", title: "Executive Summary Narrative", size: "2.3 MB" },
      { id: "key-2", type: "PPTX", title: "Leadership Briefing Deck", size: "6.8 MB" },
      { id: "key-3", type: "DOCX", title: "Talking Points & Q&A", size: "1.1 MB" },
    ],
  },
  {
    title: "FAQs",
    description: "Pre-approved responses and quick answers.",
    iconLabel: "FAQ",
    resources: [
      { id: "faq-1", type: "PDF", title: "Global FAQs Pack", size: "1.5 MB" },
      { id: "faq-2", type: "PDF", title: "Regional Extension (EMEA)", size: "1.2 MB" },
      { id: "faq-3", type: "PDF", title: "People Manager FAQs", size: "1.9 MB" },
    ],
  },
  {
    title: "Ready-to-use Slides",
    description: "Plug-and-play decks for townhalls and market updates.",
    iconLabel: "SL",
    resources: [
      { id: "slides-1", type: "PPTX", title: "Executive Townhall Slides", size: "12.4 MB" },
      { id: "slides-2", type: "PPTX", title: "Market Rollout Deck", size: "8.1 MB" },
      { id: "slides-3", type: "PPTX", title: "Field Enablement Pack", size: "9.7 MB" },
    ],
  },
  {
    title: "Culture Adaptation Guide",
    description: "Guides to localize stories while staying on-message.",
    iconLabel: "CG",
    resources: [
      { id: "guide-1", type: "PDF", title: "Global Cultural Playbook", size: "4.2 MB" },
      { id: "guide-2", type: "PDF", title: "Asia-Pacific Localization Kit", size: "3.4 MB" },
      { id: "guide-3", type: "PDF", title: "Latin America Story Starters", size: "3.1 MB" },
    ],
  },
];

const ResourceSection = ({ title, description, iconLabel, resources }: ResourceSectionProps) => (
  <section className="resource-section" aria-label={title}>
    <header className="resource-section__header">
      <div className="resource-section__icon" aria-hidden="true">
        {iconLabel}
      </div>
      <div>
        <p className="resource-section__eyebrow">Collection</p>
        <h3 className="resource-section__title">{title}</h3>
        {description && <p className="resource-section__description">{description}</p>}
      </div>
    </header>

    <div className="resource-list">
      {resources.map((resource) => (
        <article key={resource.id} className="resource-card">
          <div className="resource-card__meta">
            <span className={`resource-pill ${resourceTypeClass[resource.type]}`}>{resource.type}</span>
            <div>
              <p className="resource-card__title">{resource.title}</p>
              <p className="resource-card__size">{resource.size}</p>
            </div>
          </div>
          <div className="resource-card__actions">
            <button className="ghost-btn" aria-label={`Open ${resource.title}`}>
              <span>Open</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="ghost-btn" aria-label={`Download ${resource.title}`}>
              <span>Download</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 5v10m0 0 3.5-3.5M12 15l-3.5-3.5M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default function ChangeResourcesHub() {
  const navigate = useNavigate();
  const [, startTransition] = useTransition();

  const handleNavigate = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <>
      <style>{`
        :root {
          --resources-bg: #01060d;
          --resources-panel: rgba(10, 16, 25, 0.92);
          --resources-card: rgba(4, 12, 20, 0.85);
          --resources-border: rgba(6, 240, 224, 0.2);
          --resources-muted: rgba(255, 255, 255, 0.65);
          --resources-accent: #06f0e0;
          --resources-accent-soft: rgba(6, 240, 224, 0.12);
          --resources-pill: rgba(6, 240, 224, 0.15);
        }

        .resources-page {
          min-height: 100vh;
          background: radial-gradient(circle at 20% 20%, rgba(6, 240, 224, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 80% 10%, rgba(16, 105, 255, 0.15) 0%, transparent 45%),
            var(--resources-bg);
          color: #f8fbff;
          padding: 2rem 1rem 4rem;
        }

        .resources-shell {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .resources-hero {
          background: var(--resources-panel);
          border: 1px solid var(--resources-border);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.45),
            0 0 0 1px rgba(6, 240, 224, 0.08) inset;
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 2rem;
        }

        .resources-hero__heading {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .resources-hero__eyebrow {
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--resources-muted);
        }

        .resources-hero__title {
          font-size: clamp(2rem, 3vw, 2.75rem);
          font-weight: 700;
          line-height: 1.2;
          background: linear-gradient(90deg, var(--resources-accent), #4fd1ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .resources-hero__summary {
          font-size: 1rem;
          color: var(--resources-muted);
          max-width: 520px;
          line-height: 1.7;
        }

        .resources-hero__cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .primary-btn {
          padding: 0.85rem 1.5rem;
          border-radius: 999px;
          border: none;
          background: linear-gradient(120deg, var(--resources-accent), #34ffe4);
          color: #041019;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          font-family: inherit;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(6, 240, 224, 0.4);
        }

        .secondary-btn {
          padding: 0.85rem 1.3rem;
          border-radius: 999px;
          border: 1px solid var(--resources-border);
          background: transparent;
          color: var(--resources-accent);
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
          font-family: inherit;
        }

        .secondary-btn:hover {
          background: rgba(6, 240, 224, 0.08);
          transform: translateY(-2px);
        }

        .hero-status {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.75rem;
          border-radius: 20px;
          border: 1px solid rgba(6, 240, 224, 0.08);
          background: linear-gradient(160deg, rgba(6, 240, 224, 0.08), rgba(4, 8, 18, 0.9));
        }

        .hero-status__label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--resources-muted);
        }

        .hero-status__metric {
          font-size: 2.25rem;
          font-weight: 600;
          color: var(--resources-accent);
        }

        .hero-status__caption {
          font-size: 0.95rem;
          color: var(--resources-muted);
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
        }

        .quick-action {
          border-radius: 16px;
          border: 1px solid rgba(6, 240, 224, 0.12);
          background: var(--resources-card);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          text-align: left;
        }

        .quick-action:hover {
          transform: translateY(-4px);
          border-color: var(--resources-accent);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
        }

        .quick-action__icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: var(--resources-pill);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .quick-action__label {
          font-weight: 600;
          color: #fff;
        }

        .quick-action__description {
          font-size: 0.9rem;
          color: var(--resources-muted);
        }

        .panel {
          border-radius: 24px;
          border: 1px solid rgba(6, 240, 224, 0.12);
          background: var(--resources-panel);
          padding: 2rem;
          box-shadow:
            0 30px 60px rgba(0, 0, 0, 0.45),
            0 0 0 1px rgba(6, 240, 224, 0.05) inset;
        }

        .panel__title {
          font-size: 1.35rem;
          font-weight: 600;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .panel__title::before {
          content: "";
          width: 32px;
          height: 1px;
          background: var(--resources-accent);
          opacity: 0.8;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .featured-card {
          border-radius: 18px;
          border: 1px solid rgba(6, 240, 224, 0.15);
          background: var(--resources-card);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          position: relative;
          overflow: hidden;
        }

        .featured-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 1px solid transparent;
          background: linear-gradient(130deg, rgba(6, 240, 224, 0.2), transparent);
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .featured-card:hover::after {
          opacity: 1;
        }

        .featured-card__status {
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--resources-accent);
        }

        .resource-section {
          border-radius: 24px;
          background: var(--resources-panel);
          border: 1px solid rgba(6, 240, 224, 0.08);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .resource-section__header {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .resource-section__icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: var(--resources-pill);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: var(--resources-accent);
          font-size: 1rem;
        }

        .resource-section__eyebrow {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--resources-muted);
        }

        .resource-section__title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #fff;
        }

        .resource-section__description {
          font-size: 0.95rem;
          color: var(--resources-muted);
        }

        .resource-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .resource-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.1rem 1.25rem;
          border-radius: 16px;
          border: 1px solid rgba(6, 240, 224, 0.08);
          background: rgba(4, 10, 19, 0.9);
          transition: border-color 0.2s ease, transform 0.2s ease;
          flex-wrap: wrap;
        }

        .resource-card:hover {
          border-color: var(--resources-accent);
          transform: translateY(-2px);
        }

        .resource-card__meta {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }

        .resource-pill {
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: var(--resources-pill);
          color: #fff;
        }

        .pill--pdf {
          border-color: rgba(255, 99, 132, 0.5);
          color: #ff8ea5;
        }

        .pill--pptx {
          border-color: rgba(6, 240, 224, 0.6);
          color: var(--resources-accent);
        }

        .pill--docx {
          border-color: rgba(80, 156, 255, 0.5);
          color: #6cb0ff;
        }

        .resource-card__title {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
        }

        .resource-card__size {
          font-size: 0.85rem;
          color: var(--resources-muted);
        }

        .resource-card__actions {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .ghost-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.45rem 0.95rem;
          color: #fff;
          background: transparent;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease;
        }

        .ghost-btn svg {
          width: 16px;
          height: 16px;
        }

        .ghost-btn:hover {
          border-color: var(--resources-accent);
          color: var(--resources-accent);
        }

        @media (max-width: 1024px) {
          .resources-hero {
            grid-template-columns: 1fr;
          }

          .quick-actions {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .featured-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .resources-page {
            padding: 1.5rem 0.75rem 3rem;
          }

          .resources-hero,
          .panel,
          .resource-section {
            padding: 1.5rem;
          }

          .quick-actions {
            grid-template-columns: 1fr;
          }

          .featured-grid {
            grid-template-columns: 1fr;
          }

          .resource-card {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="resources-page">
        <NavbarDemo />

        <div className="resources-shell">
          <header className="resources-hero">
            <div className="resources-hero__heading">
              <div>
                <p className="resources-hero__eyebrow">Change resources hub</p>
                <h1 className="resources-hero__title">Library of pre-approved stories & visuals</h1>
                <p className="resources-hero__summary">
                  Every document below is vetted, versioned, and ready for rollout. Adapt to your market in minutes,
                  then share the same hero narrative across the globe.
                </p>
              </div>
              <div className="resources-hero__cta">
                <button className="primary-btn" onClick={() => handleNavigate("/leaderboard")}>
                  Browse champions
                </button>
                <button className="secondary-btn" onClick={() => handleNavigate("/dashboard")}>
                  Back to dashboard
                </button>
              </div>
            </div>

            <aside className="hero-status">
              <p className="hero-status__label">Live collections</p>
              <p className="hero-status__metric">148 files</p>
              <p className="hero-status__caption">Updated nightly · Auto-tagged by audience & campaign moment</p>
            </aside>
          </header>

          <section className="panel" aria-label="Quick actions">
            <h2 className="panel__title">Your shortcuts</h2>
            <div className="quick-actions">
              {quickActions.map((action) => (
                <button key={action.id} className="quick-action">
                  <div className="quick-action__icon" aria-hidden="true">
                    {action.icon}
                  </div>
                  <div>
                    <p className="quick-action__label">{action.label}</p>
                    <p className="quick-action__description">{action.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="panel" aria-label="Featured resources">
            <h2 className="panel__title">Featured this week</h2>
            <div className="featured-grid">
              {featuredResources.map((resource) => (
                <article key={resource.id} className="featured-card">
                  <span className="featured-card__status">{resource.status}</span>
                  <p className="resource-card__title">{resource.title}</p>
                  <p className="resource-card__size">{resource.description}</p>
                  <div className="resource-card__actions">
                    <span className={`resource-pill ${resourceTypeClass[resource.type]}`}>{resource.type}</span>
                    <span className="resource-card__size">{resource.size}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {resourceSections.map((section) => (
            <ResourceSection key={section.title} {...section} />
          ))}
        </div>
      </div>
    </>
  );
}