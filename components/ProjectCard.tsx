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
      className="h-4 w-4"
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
      className="h-4 w-4"
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
      className="group glass-panel flex h-full flex-col overflow-hidden rounded-[1.75rem] transition duration-300 hover:-translate-y-1 hover:border-maroon-300/30 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-300/60"
    >
      <div className="relative overflow-hidden bg-black/40">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-xs backdrop-blur-md">
          <span
            className={`h-2.5 w-2.5 rounded-full ${languageDot(project.language)}`}
          />
          <span>{project.language || "Unknown"}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="clamp-2 font-[var(--font-display)] text-2xl font-semibold leading-tight text-[var(--text)]">
            {project.title}
          </h3>
          <p className="clamp-3 text-sm leading-6 text-[var(--muted)]">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {visibleTopics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70"
            >
              {topic}
            </span>
          ))}
          {extraTopics > 0 ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
              +{extraTopics} more
            </span>
          ) : null}
        </div>
        <div className="grid gap-3 border-t border-white/10 pt-4 text-sm text-[var(--muted)] sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <StarIcon />
            <span className="font-[var(--font-mono)] text-[var(--text)]">
              {project.stars.toLocaleString()}
            </span>
            <span>stars</span>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <ForkIcon />
            <span className="font-[var(--font-mono)] text-[var(--text)]">
              {project.forks.toLocaleString()}
            </span>
            <span>forks</span>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
          <img
            src={project.author.avatarUrl}
            alt={`${project.author.name} avatar`}
            className="h-6 w-6 rounded-full object-cover ring-1 ring-white/15"
            loading="lazy"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[var(--text)]">
              {project.author.name}
            </p>
            <p className="truncate text-xs text-white/45">
              @{project.author.login}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
