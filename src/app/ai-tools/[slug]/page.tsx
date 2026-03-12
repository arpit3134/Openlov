import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { tools, getToolById, getRelatedTools } from "@/data/tools";
import { ToolCard } from "@/components/cards/ToolCard";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolById(params.slug);
  if (!tool) return { title: "Tool Not Found — OpenLov" };
  return {
    title: `${tool.name} — OpenLov`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} — OpenLov`,
      description: tool.description,
      type: "website",
    },
  };
}

const pricingLabel: Record<string, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

const pricingColors: Record<string, { bg: string; color: string }> = {
  free: { bg: "#dcf0e8", color: "#1a6b43" },
  freemium: { bg: "#fef3dc", color: "#7a4f00" },
  paid: { bg: "#fde8e8", color: "#7a1a1a" },
};

const categoryIcons: Record<string, string> = {
  productivity: "⚡",
  writing: "✍️",
  image: "🎨",
  video: "🎬",
  audio: "🎵",
  code: "💻",
  research: "🔬",
  marketing: "📈",
  design: "🖌️",
  data: "📊",
};

export default function ToolDetailPage({ params }: Props) {
  const tool = getToolById(params.slug);

  if (!tool) notFound();

  const related = getRelatedTools(tool);
  const pricing = pricingColors[tool.pricing] ?? pricingColors.free;

  return (
    <>
      {/* ── Breadcrumb ── */}
      <div
        style={{ borderBottom: "1px solid var(--border)", background: "var(--paper)" }}
        className="py-3"
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-2 text-xs font-mono-custom"
          style={{ color: "var(--muted)" }}>
          <Link href="/" className="hover:underline" style={{ color: "var(--muted)" }}>Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:underline" style={{ color: "var(--muted)" }}>Tools</Link>
          <span>/</span>
          <Link
            href={`/categories#${tool.category}`}
            className="hover:underline capitalize"
            style={{ color: "var(--muted)" }}
          >
            {tool.category}
          </Link>
          <span>/</span>
          <span style={{ color: "var(--ink)" }}>{tool.name}</span>
        </div>
      </div>

      {/* ── Hero block ── */}
      <section
        style={{ background: "var(--ink)", color: "var(--paper)" }}
        className="relative overflow-hidden"
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--paper) 1px, transparent 1px), linear-gradient(90deg, var(--paper) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Logo */}
            <div
              className="w-20 h-20 rounded-sm flex items-center justify-center flex-shrink-0 font-display font-black text-4xl"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "var(--accent-light)",
              }}
            >
              {tool.logo ? (
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-full h-full object-contain rounded-sm"
                />
              ) : (
                tool.name[0]
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="text-xs font-mono-custom px-2.5 py-1 rounded-sm"
                  style={{ background: pricing.bg, color: pricing.color }}
                >
                  {pricingLabel[tool.pricing]}
                </span>
                <span
                  className="text-xs font-mono-custom px-2.5 py-1 rounded-sm capitalize"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "var(--paper)",
                  }}
                >
                  {categoryIcons[tool.category] ?? "✦"} {tool.category}
                </span>
                {tool.trending && (
                  <span
                    className="text-xs font-mono-custom px-2.5 py-1 rounded-sm"
                    style={{ background: "var(--accent)", color: "white" }}
                  >
                    🔥 Trending
                  </span>
                )}
                {tool.featured && (
                  <span
                    className="text-xs font-mono-custom px-2.5 py-1 rounded-sm"
                    style={{ background: "var(--gold)", color: "var(--ink)" }}
                  >
                    ★ Featured
                  </span>
                )}
              </div>

              {/* Name */}
              <h1
                className="font-display font-black text-4xl md:text-5xl leading-none mb-4"
                style={{ color: "var(--paper)" }}
              >
                {tool.name}
              </h1>

              {/* Description */}
              <p
                className="text-base md:text-lg leading-relaxed max-w-2xl"
                style={{ color: "rgba(245,242,235,0.65)" }}
              >
                {tool.description}
              </p>

              {/* Rating + date */}
              <div
                className="flex items-center gap-6 mt-6 pt-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                {tool.rating && (
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          color:
                            star <= Math.round(tool.rating!)
                              ? "var(--gold)"
                              : "rgba(255,255,255,0.15)",
                          fontSize: "1rem",
                        }}
                      >
                        ★
                      </span>
                    ))}
                    <span
                      className="text-sm font-mono-custom ml-1"
                      style={{ color: "rgba(245,242,235,0.5)" }}
                    >
                      {tool.rating.toFixed(1)}
                    </span>
                  </div>
                )}
                <span
                  className="text-xs font-mono-custom tracking-wider"
                  style={{ color: "rgba(245,242,235,0.35)" }}
                >
                  ADDED {formatDate(tool.addedAt).toUpperCase()}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0 flex flex-col gap-3">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold rounded-sm text-sm transition-all whitespace-nowrap"
                style={{ background: "var(--accent)", color: "white" }}
              >
                Visit {tool.name} →
              </a>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-sm text-sm transition-all"
                style={{
                  background: "transparent",
                  color: "rgba(245,242,235,0.55)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                ← Back to Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left / main */}
        <div className="lg:col-span-2 space-y-10">

          {/* Tags */}
          <section>
            <h2
              className="font-mono-custom text-xs tracking-widest uppercase mb-4"
              style={{ color: "var(--muted)" }}
            >
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1.5 rounded-sm font-medium"
                  style={{
                    background: "var(--paper)",
                    color: "var(--ink)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Divider */}
          <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

          {/* About section (placeholder for extended content) */}
          <section>
            <h2
              className="font-display font-bold text-2xl mb-4"
              style={{ color: "var(--ink)" }}
            >
              About {tool.name}
            </h2>
            <div
              className="rounded-sm p-6"
              style={{
                background: "var(--paper)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {tool.description}
              </p>
              <p
                className="text-xs mt-4 italic"
                style={{ color: "var(--border)" }}
              >
                Extended description can be added by editing{" "}
                <code
                  className="font-mono-custom not-italic px-1 py-0.5 rounded"
                  style={{ background: "var(--cream)", color: "var(--accent)" }}
                >
                  src/data/tools.ts
                </code>{" "}
                — add a{" "}
                <code
                  className="font-mono-custom not-italic px-1 py-0.5 rounded"
                  style={{ background: "var(--cream)", color: "var(--accent)" }}
                >
                  longDescription
                </code>{" "}
                field to the Tool type.
              </p>
            </div>
          </section>

          {/* Divider */}
          <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

          {/* Related tools */}
          {related.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="font-display font-bold text-2xl"
                  style={{ color: "var(--ink)" }}
                >
                  Related Tools
                </h2>
                <Link
                  href={`/categories#${tool.category}`}
                  className="text-sm font-medium hover-line"
                  style={{ color: "var(--accent)" }}
                >
                  See all {tool.category} →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right / sidebar */}
        <aside className="space-y-6">
          {/* Quick info card */}
          <div
            className="rounded-sm overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            <div
              className="px-5 py-3"
              style={{ background: "var(--ink)" }}
            >
              <span
                className="font-mono-custom text-xs tracking-widest uppercase"
                style={{ color: "rgba(245,242,235,0.5)" }}
              >
                Quick Info
              </span>
            </div>
            <div style={{ background: "var(--card-bg)" }}>
              {[
                {
                  label: "Category",
                  value: (
                    <Link
                      href={`/categories#${tool.category}`}
                      className="capitalize hover:underline"
                      style={{ color: "var(--accent)" }}
                    >
                      {categoryIcons[tool.category] ?? "✦"} {tool.category}
                    </Link>
                  ),
                },
                {
                  label: "Pricing",
                  value: (
                    <span
                      className="text-xs px-2 py-0.5 rounded-sm font-mono-custom"
                      style={{ background: pricing.bg, color: pricing.color }}
                    >
                      {pricingLabel[tool.pricing]}
                    </span>
                  ),
                },
                {
                  label: "Rating",
                  value: tool.rating ? (
                    <span className="flex items-center gap-1">
                      <span style={{ color: "var(--gold)" }}>★</span>
                      <span className="font-mono-custom text-sm">
                        {tool.rating.toFixed(1)} / 5.0
                      </span>
                    </span>
                  ) : (
                    <span style={{ color: "var(--muted)" }}>—</span>
                  ),
                },
                {
                  label: "Added",
                  value: (
                    <span className="font-mono-custom text-xs">
                      {formatDate(tool.addedAt)}
                    </span>
                  ),
                },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-5 py-3 text-sm"
                  style={{
                    borderBottom:
                      i < arr.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <span
                    className="font-mono-custom text-xs tracking-wider"
                    style={{ color: "var(--muted)" }}
                  >
                    {row.label.toUpperCase()}
                  </span>
                  <span style={{ color: "var(--ink)" }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visit CTA */}
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-5 py-4 rounded-sm font-semibold text-sm transition-all group"
            style={{
              background: "var(--accent)",
              color: "white",
            }}
          >
            <span>Visit {tool.name}</span>
            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
          </a>

          {/* All tags in sidebar */}
          <div
            className="rounded-sm p-5"
            style={{ background: "var(--paper)", border: "1px solid var(--border)" }}
          >
            <h3
              className="font-mono-custom text-xs tracking-widest uppercase mb-3"
              style={{ color: "var(--muted)" }}
            >
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-sm"
                  style={{
                    background: "var(--cream)",
                    color: "var(--ink)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Suggest edit */}
          <div
            className="rounded-sm p-5 text-center"
            style={{ background: "var(--paper)", border: "1px dashed var(--border)" }}
          >
            <p
              className="text-xs leading-relaxed mb-3"
              style={{ color: "var(--muted)" }}
            >
              Is something wrong or outdated?
            </p>
            <a
              href="#"
              className="text-xs font-semibold"
              style={{ color: "var(--accent)" }}
            >
              Suggest an edit →
            </a>
          </div>
        </aside>
      </div>

      {/* ── Bottom CTA ── */}
      <section
        className="py-14"
        style={{
          background: "var(--paper)",
          borderTop: "3px double var(--border)",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p
            className="font-mono-custom text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--muted)" }}
          >
            Know a tool like this?
          </p>
          <h2
            className="font-display font-bold text-3xl mb-4"
            style={{ color: "var(--ink)" }}
          >
            Submit it to OpenLov
          </h2>
          <p className="text-sm mb-7" style={{ color: "var(--muted)" }}>
            Help others discover great AI tools. Submissions are reviewed
            and listed within 48 hours.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-sm text-sm"
            style={{ background: "var(--ink)", color: "var(--paper)" }}
          >
            Submit a Tool →
          </a>
        </div>
      </section>
    </>
  );
}
