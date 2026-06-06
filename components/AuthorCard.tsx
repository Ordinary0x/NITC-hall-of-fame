import Link from "next/link";
import type { ProjectRecord } from "@/lib/project-utils";

type AuthorCardProps = {
  author: ProjectRecord["author"];
};

export function AuthorCard({ author }: AuthorCardProps) {
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
