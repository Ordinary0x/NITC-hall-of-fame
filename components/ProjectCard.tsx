"use client";

import Link from "next/link";
import { resolveProjectPath, type ProjectRecord } from "@/lib/project-utils";

type ProjectCardProps = {
  project: ProjectRecord;
};

function StarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path d="M10 1.75l2.7 5.47 6.04.88-4.37 4.26 1.03 6.01L10 15.51 4.6 18.37l1.03-6.01L1.26 8.1l6.04-.88L10 1.75z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path d="M6 3a2 2 0 10-1.73-1A2 2 0 006 3zm8 0a2 2 0 10-1.73-1A2 2 0 0014 3zM6 7.5a3.5 3.5 0 003.25 3.48V13a2.75 2.75 0 11-1.5 0v-2.02A3.5 3.5 0 106 7.5zm8 0a3.5 3.5 0 00-3.25 3.48V13a2.75 2.75 0 101.5 0v-2.02A3.5 3.5 0 0014 7.5z" />
    </svg>
  );
}

function languageDot(language: string) {
  const palette: Record<string, string> = {
    TypeScript: "bg-sky-400",
    JavaScript: "bg-amber-300",
    Python: "bg-emerald-300",
    Java: "bg-orange-300",
    Go: "bg-cyan-300",
    CSS: "bg-fuchsia-300",
    HTML: "bg-red-300",
  };

  return palette[language] ?? "bg-maroon-300";
}

export function ProjectCard({ project }: ProjectCardProps) {
  const path = resolveProjectPath(project.repoUrl);
  const visibleTopics = project.topics.slice(0, 3);
  const extraTopics = Math.max(project.topics.length - visibleTopics.length, 0);

  if (!path) {
    return null;
  }

  return (
    <Link
      href={path}
      className="group panel flex h-full flex-col overflow-hidden rounded-xl transition hover:-translate-y-0.5 hover:border-maroon-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500/60"
    >
      <div className="relative overflow-hidden bg-[#111]">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-[var(--bg)] px-2 py-1 text-[10px]">
          <span
            className={`h-2 w-2 rounded-full ${languageDot(project.language)}`}
          />
          <span>{project.language || "Unknown"}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1.5">
          <h3 className="clamp-2 font-[var(--font-display)] text-xl font-semibold leading-tight text-[var(--text)]">
            {project.title}
          </h3>
          <p className="clamp-3 text-sm leading-6 text-[var(--muted)]">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {visibleTopics.map((topic) => (
            <span
              key={topic}
              className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/60"
            >
              {topic}
            </span>
          ))}
          {extraTopics > 0 ? (
            <span className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/60">
              +{extraTopics} more
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-4 border-t border-[var(--border)] pt-3 text-xs text-[var(--muted)]">
          <div className="flex items-center gap-1.5">
            <StarIcon />
            <span className="font-[var(--font-mono)] text-[var(--text)]">
              {project.stars.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ForkIcon />
            <span className="font-[var(--font-mono)] text-[var(--text)]">
              {project.forks.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2.5 border-t border-[var(--border)] pt-3">
          {project.authors.length === 1 ? (
            <>
              <img
                src={project.authors[0].avatarUrl}
                alt={`${project.authors[0].name} avatar`}
                className="h-6 w-6 rounded-full object-cover ring-1 ring-white/10"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[var(--text)]">
                  {project.authors[0].name}
                </p>
                <p className="truncate text-xs text-white/45">
                  @{project.authors[0].login}
                </p>
              </div>
            </>
          ) : (
            <div className="flex -space-x-2">
              {project.authors.slice(0, 4).map((author) => (
                <img
                  key={author.login}
                  src={author.avatarUrl}
                  alt={`${author.name} avatar`}
                  className="h-6 w-6 rounded-full object-cover ring-2 ring-[var(--bg)]"
                  loading="lazy"
                />
              ))}
              {project.authors.length > 4 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#222] text-[10px] text-white/50 ring-2 ring-[var(--bg)]">
                  +{project.authors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
