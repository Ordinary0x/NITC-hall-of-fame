import type { Metadata } from "next";
import Link from "next/link";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { getProjectsData } from "@/lib/projects";
import { collectCatalogStats } from "@/lib/project-utils";

export const metadata: Metadata = {
  title: "NITC Hall of Fame",
  description: "Projects built by students of NIT Calicut.",
};

export default async function HomePage() {
  const projects = await getProjectsData();
  const stats = collectCatalogStats(projects);

  return (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-maroon-300/20 bg-maroon-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-maroon-100/90">
            NIT Calicut student showcase
          </div>
          <div className="space-y-4">
            <h1 className="font-[var(--font-display)] text-5xl font-semibold leading-none tracking-[-0.04em] text-[var(--text)] sm:text-7xl">
              NITC Hall of Fame
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              Projects built by students of NIT Calicut, frozen into a static
              showcase at build time and refreshed from GitHub metadata whenever
              the site is rebuilt.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/submit/"
              className="inline-flex items-center rounded-full bg-maroon-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-maroon-400"
            >
              Submit Your Project
            </Link>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-maroon-300/30 hover:bg-maroon-500/15"
            >
              GitHub PR Guide
            </a>
          </div>
        </div>

        <div className="glass-panel-strong rounded-[2rem] p-6 shadow-glow">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-5">
              <p className="font-[var(--font-mono)] text-3xl text-[var(--text)]">
                {stats.count}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Projects
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-5">
              <p className="font-[var(--font-mono)] text-3xl text-[var(--text)]">
                {stats.stars}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Stars
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-5">
              <p className="font-[var(--font-mono)] text-3xl text-[var(--text)]">
                {stats.contributors}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Contributors
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-maroon-300/20 bg-maroon-500/10 p-4 text-sm leading-6 text-[var(--muted)]">
            Submit via pull request only. The build pipeline fetches live GitHub
            metadata and publishes a fully static site.
          </div>
        </div>
      </section>

      <ProjectBrowser projects={projects} />
    </div>
  );
}
