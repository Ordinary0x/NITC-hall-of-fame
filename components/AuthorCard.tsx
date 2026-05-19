import Link from "next/link";
import type { ProjectRecord } from "@/lib/project-utils";

type AuthorCardProps = {
  author: ProjectRecord["author"];
};

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <img
        src={author.avatarUrl}
        alt={`${author.name} avatar`}
        className="h-20 w-20 rounded-full object-cover ring-1 ring-white/15"
      />
      <div className="min-w-0 w-full space-y-3">
        <div>
          <p className="font-[var(--font-display)] text-xl font-semibold text-[var(--text)] truncate">
            {author.name}
          </p>
          <p className="text-sm text-white/55 truncate">@{author.login}</p>
        </div>

        {author.bio && (
          <p className="text-sm leading-relaxed text-[var(--muted)] line-clamp-3">
            {author.bio}
          </p>
        )}

        <Link
          href={author.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full justify-center items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
        >
          View GitHub Profile
        </Link>
      </div>
    </div>
  );
}
