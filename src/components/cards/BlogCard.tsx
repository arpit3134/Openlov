import Link from "next/link";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured";
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="card-hover block p-6 rounded-sm group"
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-xs font-mono-custom tracking-widest uppercase px-2 py-1 rounded-sm"
            style={{ background: "var(--accent)", color: "white" }}
          >
            Featured
          </span>
          <span className="text-xs font-mono-custom" style={{ color: "var(--muted)" }}>
            {post.readingTime} min read
          </span>
        </div>

        <h2
          className="font-display font-bold text-2xl leading-tight mb-3 group-hover:opacity-80 transition-opacity"
          style={{ color: "var(--paper)" }}
        >
          {post.title}
        </h2>

        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem" }}>
          <div>
            <span className="text-xs font-medium" style={{ color: "var(--paper)" }}>
              {post.author}
            </span>
            <span className="text-xs mx-2" style={{ color: "var(--muted)" }}>·</span>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {formatDate(post.createdAt)}
            </span>
          </div>
          <span className="text-sm" style={{ color: "var(--accent-light)" }}>
            Read →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-hover flex flex-col p-5 rounded-sm group"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-sm font-mono-custom"
            style={{
              background: "var(--paper)",
              color: "var(--muted)",
              border: "1px solid var(--border)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold text-xl leading-snug mb-2 flex-1 group-hover:opacity-70 transition-opacity"
        style={{ color: "var(--ink)" }}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
        {post.excerpt}
      </p>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-3 mt-auto"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium" style={{ color: "var(--ink)" }}>
            {post.author}
          </span>
          <span className="text-xs mx-1" style={{ color: "var(--muted)" }}>·</span>
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {formatDate(post.createdAt)}
          </span>
        </div>
        <span className="text-xs font-mono-custom" style={{ color: "var(--muted)" }}>
          {post.readingTime}m
        </span>
      </div>
    </Link>
  );
}
