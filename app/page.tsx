import type { Metadata } from "next";
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
      <section className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg bg-maroon-600/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-maroon-200">
            NIT Calicut student showcase
          </div>
          <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-tight tracking-[-0.03em] text-[var(--text)] sm:text-5xl lg:text-6xl">
            NITC Hall of Fame
          </h1>
          <p className="text-base leading-7 text-[var(--muted)] sm:text-lg">
            Projects built by students of NIT Calicut, frozen into a static
            showcase at build time and refreshed from GitHub metadata whenever
            the site is rebuilt.
          </p>
        </div>

        <div className="panel-strong rounded-xl p-5 w-full lg:w-96">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-[var(--bg)] px-3 py-4">
              <p className="font-[var(--font-mono)] text-2xl text-[var(--text)]">
                {stats.count}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
                Projects
              </p>
            </div>
            <div className="rounded-lg bg-[var(--bg)] px-3 py-4">
              <p className="font-[var(--font-mono)] text-2xl text-[var(--text)]">
                {stats.stars}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
                Stars
              </p>
            </div>
            <div className="rounded-lg bg-[var(--bg)] px-2 py-4">
              <p className="font-[var(--font-mono)] text-2xl text-[var(--text)]">
                {stats.contributors}
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[var(--muted)] truncate">
                Contributors
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProjectBrowser projects={projects} />
    </div>
  );
}
