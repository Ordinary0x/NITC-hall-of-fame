import Link from "next/link";
import type { ProjectRecord } from "@/lib/project-utils";

type AuthorCardProps = {
  authors: ProjectRecord["authors"];
};

export function AuthorCard({ authors }: AuthorCardProps) {
  if (authors.length === 1) {
    const author = authors[0];
    return (
      <div className="flex flex-col items-center text-center gap-3">
        <img
          src={author.avatarUrl}
          alt={`${author.name} avatar`}
          className="h-16 w-16 rounded-full object-cover ring-1 ring-white/10"
        />
        <div className="min-w-0 w-full space-y-2">
          <div>
            <p className="font-[var(--font-display)] text-lg font-semibold text-[var(--text)] truncate">
              {author.name}
            </p>
            <p className="text-xs text-white/55 truncate">@{author.login}</p>
          </div>

          {author.bio && (
            <p className="text-xs leading-relaxed text-[var(--muted)] line-clamp-3">
              {author.bio}
            </p>
          )}

          <Link
            href={author.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full justify-center items-center rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-white transition hover:border-white/20"
          >
            View GitHub Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {authors.map((author) => (
        <Link
          key={author.login}
          href={author.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1.5 group"
        >
          <img
            src={author.avatarUrl}
            alt={`${author.name} avatar`}
            className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10 transition group-hover:ring-white/30"
          />
          <span className="text-[10px] text-white/40 group-hover:text-white/70 truncate max-w-16 text-center">
            @{author.login}
          </span>
        </Link>
      ))}
    </div>
  );
}
